// src/api/apiClient.ts
import { useAuthStore } from '@/store/authStore';
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

// 토큰 갱신 중복 요청 방지
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// 공통 axios 인스턴스
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 공통 요청 처리
axiosInstance.interceptors.request.use(
  (config) => {
    const { access_token } = useAuthStore.getState();

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 공통 응답 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    const status = error.response?.status;

    // 401 에러 & 재시도하지 않은 요청인 경우
    if (status === 401 && !originalRequest._retry) {
      // refresh 요청 자체가 실패한 경우 로그아웃
      if (originalRequest.url?.includes('/accounts/refresh')) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      // 이미 토큰 갱신 중인 경우 대기열에 추가
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // refresh token으로 새 access token 발급
        const response = await axios.post<{ access_token: string }>(
          `${BASE_URL}accounts/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.access_token;
        useAuthStore.getState().setToken(newAccessToken);

        processQueue(null, newAccessToken);

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// HTTP 메서드 래퍼
export const apiClient = {
  get: <T>(url: string, config?: Omit<AxiosRequestConfig, 'url'>) =>
    axiosInstance.get<T>(url, config).then((res) => res.data),

  post: <T>(
    url: string,
    data?: unknown,
    config?: Omit<AxiosRequestConfig, 'url' | 'data'>
  ) => axiosInstance.post<T>(url, data, config).then((res) => res.data),

  put: <T>(
    url: string,
    data?: unknown,
    config?: Omit<AxiosRequestConfig, 'url' | 'data'>
  ) => axiosInstance.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(
    url: string,
    data?: unknown,
    config?: Omit<AxiosRequestConfig, 'url' | 'data'>
  ) => axiosInstance.put<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: Omit<AxiosRequestConfig, 'url'>) =>
    axiosInstance.delete<T>(url, config).then((res) => res.data),
} as const;

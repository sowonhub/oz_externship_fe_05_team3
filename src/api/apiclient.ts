import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api/v1', // 실제 프로젝트 설정에 맞게 수정
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    /* TODO: 공통 에러 처리 */
    return Promise.reject(error);
  }
);

export interface PostListResponseDTO {
  count: number;
  next: string | null;
  previous: string | null;
  results: PostDTO[];
}

export interface PostDTO {
  id: number;
  author: UserDTO;
  title: string;
  category: string;
  thumbnail_img_url: string;
  content_preview: string;
  comment_count: number;
  view_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
}

export interface UserDTO {
  id: number;
  nickname: string;
  profile_img_url: string;
}

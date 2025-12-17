export interface Post {
  id: number
  title: string
  content: string
  imageUrl?: string
  category?: string
  createdAt?: string
  updatedAt?: string
}

export interface PostFormData {
  title: string
  content: string
  imageUrl?: string
  category?: string
}

export type PostCategory = 'general' | 'question' | 'info' | ''

export interface IComment {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
}
export interface IFormData {
  name: string;
  email: string;
  body: string;
  postId: number;
  id: number;
}
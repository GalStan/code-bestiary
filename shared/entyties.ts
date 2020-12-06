export interface Comment {
  id: number;
  author: string;
  rating: number;
  content: string;
}

export interface Article {
  id: number;
  author: string;
  rating: number;
  content: string;
  tags: string[];
  comments: Comment[];
}

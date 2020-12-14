export type HTML = string;
export type UUID = string;

export interface Comment {
  id: UUID;
  author: string;
  rating: number;
  content: string;
}

export interface Article {
  id: UUID;
  author: string;
  rating: number;
  content: HTML;
  tags: string[];
  comments: Comment[];
}

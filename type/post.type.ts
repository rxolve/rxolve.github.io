export interface PostMetaData {
  id: string;
  title: string;
  date: string;
  tags: string[];
}

export interface PostData extends PostMetaData {
  content: string;
}

export interface PostParams {
  date: string;
  isEn?: boolean;
}

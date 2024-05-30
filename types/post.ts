export interface PostMetaData {
  id: string;
  title: string;
  date: string;
  tags: string[];
}

export interface PostData extends PostMetaData {
  id: string;
  content: string;
}

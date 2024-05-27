export interface PostMetaData {
  title: string;
  date: string;
}

export interface PostData extends PostMetaData {
  id: string;
  content: string;
}

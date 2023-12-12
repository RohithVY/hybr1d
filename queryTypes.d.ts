type Post = {
  objectID: string;
  created_at: string;
  author: string;
  title?: string;
  url?: string;
  text: string | null;
  points?: number;
  parent_id: number | null;
  updated_at: string;
  num_comments: number;
  _tags: string[];
  children: number[];
};

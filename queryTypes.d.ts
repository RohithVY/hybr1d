type Post = {
  id: number;
  created_at: string;
  author: string;
  title?: string;
  url?: string;
  text: string | null;
  points?: number;
  parent_id: number | null;
  children: Post[];
};

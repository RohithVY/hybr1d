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

type NewsCommentsType = {
  author: string;
  children: NewsCommentsType[];
  created_at: string;
  created_at_i: number;
  id: number;
  options: [];
  text?: string | null;
  parent_id: number | null;
  points: number | null;
  story_id: number;
  text: null;
  title: string | null;
  type: string;
  url: string | null;
};

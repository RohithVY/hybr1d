import React, { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type NewsContextType = {
  newsList: Post | null;
};

export const NewsContext = createContext<NewsContextType | undefined>(
  undefined
);

const NewsContextProvider = ({ children }: Props) => {
  const [newsList, setNewsList] = useState<Post | null>(null);

  const contextValue = {
    newsList,
  };

  return (
    <NewsContext.Provider value={contextValue}>{children}</NewsContext.Provider>
  );
};

export default NewsContextProvider;

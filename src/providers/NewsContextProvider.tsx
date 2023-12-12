"use client";

import React, { createContext, useEffect, useState } from "react";
import { NEWS_URL } from "@/miscellaneous/constants";
import { useQuery } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

type NewsContextType = {
  searchText: string;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  queryData: any;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
};

export const NewsContext = createContext<NewsContextType | undefined>(
  undefined
);

const NewsContextProvider = ({ children }: Props) => {
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const queryData = useQuery({
    queryKey: ["news"],
    queryFn: () =>
      fetch(`${NEWS_URL}/search?query=${searchText}&page=${currentPage}`).then(
        (res) => res.json()
      ),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    searchText && (await queryData.refetch());
  };

  useEffect(() => {
    queryData.refetch();
  }, [currentPage]);

  const contextValue = {
    handleSearchInputChange,
    searchText,
    handleSubmit,
    queryData,
    setCurrentPage,
    currentPage,
  };

  return (
    <NewsContext.Provider value={contextValue}>{children}</NewsContext.Provider>
  );
};

export default NewsContextProvider;

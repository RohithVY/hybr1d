"use client";

import { NewsContext } from "@/providers/NewsContextProvider";
import React, { useContext } from "react";
import { LoadingPage } from "./LoadingPage";
import { ErrorPage } from "./ErrorPage";
import NewsCard from "./NewsCard";

type Props = {};

const NewsList = (props: Props) => {
  const newsContext = useContext(NewsContext);

  if (newsContext === undefined) {
    throw new Error("SearchInput must be used within a NewsContextProvider");
  }

  const { queryData } = newsContext;
  if (queryData.isLoading) return <LoadingPage />;
  if (queryData.isError) return <ErrorPage />;
  return (
    <div className="flex flex-wrap justify-around align-top mt-4"> 
      {queryData.data.hits &&
        queryData.data.hits.map((item: Post) => {
          return <NewsCard post={item} key={item.objectID} />;
        })}
    </div>
  );
};

export default NewsList;

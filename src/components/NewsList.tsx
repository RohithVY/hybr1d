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

  const { queryData, setCurrentPage, currentPage } = newsContext;
  if (queryData.isLoading) return <LoadingPage />;
  if (queryData.isError) return <ErrorPage />;
  return (
    <div className="flex flex-wrap justify-around align-top mt-4">
      {queryData.data.hits &&
        queryData.data.hits.map((item: Post) => {
          return <NewsCard post={item} key={item.objectID} />;
        })}
      {queryData.data.hits && (
        <div className="w-full mt-4 flex justify-between items-center">
          <button
            className={`btn btn-secondary ${
              currentPage === 1 ? "btn-disabled" : ""
            }`}
            onClick={() => {
              currentPage === 1
                ? setCurrentPage(1)
                : setCurrentPage(currentPage - 1);
            }}
          >
            Previous
          </button>
          <div className="text-md flex justify-center items-center">
            Page{" "}
            <span className="rounded-full ml-3 p-3 bg-secondary w-10 h-10 flex items-center justify-center text-[#0E1939] font-bold">
              {currentPage}
            </span>{" "}
          </div>
          <button
            className={`btn btn-secondary`}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsList;

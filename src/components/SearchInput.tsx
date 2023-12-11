"use client";

import { NewsContext } from "@/providers/NewsContextProvider";
import React, { useContext } from "react";

type Props = {};

const SearchInput = (props: Props) => {
  const newsContext = useContext(NewsContext);

  if (newsContext === undefined) {
    throw new Error("SearchInput must be used within a NewsContextProvider");
  }

  const { handleSearchInputChange, searchText, handleSubmit } = newsContext;

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center">
      <input
        type="text"
        name="search"
        autoComplete="off"
        placeholder="Type Your prefered news here..."
        className="input input-bordered input-secondary w-[20rem]"
        value={searchText}
        onChange={handleSearchInputChange}
      />
      <button
        className="btn btn-circle btn-secondary ml-4 flex items-center justify-center"
        type="submit"
      >
        <svg
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" x2="16.65" y1="21" y2="16.65" />
        </svg>
      </button>
    </form>
  );
};

export default SearchInput;

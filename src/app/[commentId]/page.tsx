"use client";

import { ErrorPage } from "@/components/ErrorPage";
import { LoadingPage } from "@/components/LoadingPage";
import NewsCardComments from "@/components/NewsCardComments";
import { NEWS_URL } from "@/miscellaneous/constants";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceStrict } from "date-fns";
import Link from "next/link";

import React from "react";

type Props = {
  params: {
    commentId: number;
  };
};

const Comments = ({ params: { commentId } }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comment", commentId],
    queryFn: () =>
      fetch(`${NEWS_URL}/items/${commentId}`).then((res) => res.json()),
  });

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  const today = new Date();
  const postDate = new Date(data.created_at);
  const distance = formatDistanceStrict(postDate, today);
  return (
    <>
      <section className="flex flex-col py-4 px-4 max-w-95vw justify-center items-center bg-[rgb(18,28,59)]">
        <Link
          className="rounded-full text-bg-secondary px-4 py-2 border-bg-secondary border-[2px] opacity-30 hover:opacity-100 cursor-pointer mr-auto mb-4 flex items-center gap-4"
          href={"/"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="14"
            viewBox="0 0 448 512"
          >
            <path
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
              fill="currentColor"
            />
          </svg>
          <p> Home</p>
        </Link>
        <Link
          className="w-full flex gap-4 items-center text-xl ml-7"
          href={data.url ? data.url : `https://www.google.com/`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 512 512"
          >
            <path
              d="M96 96c0-35.3 28.7-64 64-64H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H80c-44.2 0-80-35.8-80-80V128c0-17.7 14.3-32 32-32s32 14.3 32 32V400c0 8.8 7.2 16 16 16s16-7.2 16-16V96zm64 24v80c0 13.3 10.7 24 24 24H296c13.3 0 24-10.7 24-24V120c0-13.3-10.7-24-24-24H184c-13.3 0-24 10.7-24 24zm208-8c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H384c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H384c-8.8 0-16 7.2-16 16zM160 304c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z"
              fill="currentColor"
            />
          </svg>{" "}
          <p className="hover:underline">{data.title}</p>
          <span className="ml-auto mr-6 text-xs text-[#818df887] py-2 px-4 border-[#818df887] border-2 rounded-full">
            {distance && `${distance} ago`}
          </span>
        </Link>
        <div className="flex justify-between w-full ml-4 mt-5 items-center text-[#0F172A]">
          {data.points && (
            <span className="flex gap-4 items-center bg-secondary px-4 py-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                viewBox="0 0 512 512"
              >
                <path
                  d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
                  fill="currentColor"
                />
              </svg>
              <p>{data.points}</p>
            </span>
          )}
          <span></span>
        </div>
      </section>
      <NewsCardComments comments={data.children} />
    </>
  );
};

export default Comments;

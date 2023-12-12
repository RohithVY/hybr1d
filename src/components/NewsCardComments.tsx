import React, { useState } from "react";
import Markdown from "markdown-to-jsx";

type Props = {
  comments: NewsCommentsType[];
};

const NewsCardComments = ({ comments }: Props) => {
  const [visibleComments, setVisibleComments] = useState(comments.slice(0, 10));
  const [hasMoreComments, setHasMoreComments] = useState(comments.length > 10);

  const loadMoreComments = () => {
    setVisibleComments((prevComments) => {
      const newComments = [
        ...prevComments,
        ...comments.slice(prevComments.length, prevComments.length + 10),
      ];
      setHasMoreComments(newComments.length < comments.length);
      return newComments;
    });
  };
  return (
    <div className="flex flex-col ml-4 gap-2">
      {visibleComments.length > 0 &&
        visibleComments.map((eachComment: NewsCommentsType, index: number) => {
          return (
            <section key={eachComment.id}>
              <div className="flex flex-col border-[1px] border-[#262f42] rounded-lg px-3 py-4 mt-4">
                {/* @ts-ignore */}
                <Markdown
                  options={{ forceBlock: true }}
                  key={eachComment.id + eachComment.created_at}
                  className="flex flex-col gap-2 text-sm  text-[#acadb0] px-4 py-2 "
                >
                  {eachComment.text}
                </Markdown>
                <div className="flex justify-start gap-[4rem] mt-5">
                  <span className="flex gap-3 ml-4">
                    <div className="bg-secondary rounded-full w-6 h-6 flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        width="14"
                        viewBox="0 0 448 512"
                        fill="currentColor"
                      >
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                      </svg>
                    </div>
                    <p>{eachComment.author}</p>
                  </span>
                  <span className="flex gap-2 items-center rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="20"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"
                        fill="currentColor"
                      />
                    </svg>
                    <p>{eachComment.children.length}</p>
                  </span>
                </div>
              </div>

              {eachComment.children.length > 0 && (
                <>
                  {eachComment.children.length && (
                    <NewsCardComments comments={eachComment.children} />
                  )}
                </>
              )}
            </section>
          );
        })}
      {hasMoreComments && (
        <div className="w-full py-4">

          <button className="text-secondary text-md btn btn-outline" onClick={loadMoreComments}>Load More...</button>
        </div>
      )}
    </div>
  );
};

export default NewsCardComments;

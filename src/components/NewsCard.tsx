import React from "react";
import { formatDistanceStrict } from "date-fns";
import Link from "next/link";

type NewsCardProps = {
  post: Post;
};

const NewsCard = ({ post }: NewsCardProps) => {
  const today = new Date();
  const prevThreeDays = new Date(today.setDate(today.getDate() - 3));
  const postDate = new Date(post.updated_at);
  const showNewBadge = postDate >= prevThreeDays;
  const distance = formatDistanceStrict(postDate, today);
  return (
    <Link
      className="relative card w-96 bg-[rgb(14,25,57)] rounded-lg mt-4 bg-gradient-to-r from-[rgba(2,0,36,1)] to-[] cursor-pointer border-[rgb(15,23,42)] border-[2px] hover:border-spacing-1 hover:border-secondary shadow-secondary shadow-sm"
      href={`/${post.objectID}`}
    >
      <div className="card-body justify-around">
        <h2 className="card-title">
          {post.title || "New Post"}
          {showNewBadge && (
            <div className="badge badge-secondary text-sm ml-auto">NEW</div>
          )}
        </h2>
        <div className="flex gap-2">
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
          <p>{post.author && post.author}</p>
        </div>
        <div className="card-actions justify-end">
          {post._tags.length &&
            post._tags.map((eachtag, index) => {
              if (index < 3)
                return (
                  <div
                    key={eachtag}
                    className="badge badge-outline cursor-pointer"
                  >
                    {eachtag}
                  </div>
                );
            })}
        </div>
        <span className="text-xs text-slate-500">
          {distance && `${distance} ago`}
        </span>
      </div>
    </Link>
  );
};

export default NewsCard;

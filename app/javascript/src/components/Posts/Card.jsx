import React from "react";

const Card = ({ element: post, showPost }) => {
  const isoDate = post.created_at;
  const date = new Date(isoDate);
  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex w-full flex-col gap-2 px-1 py-3 shadow-md">
      <p
        className="cursor-pointer text-lg font-semibold"
        onClick={() => showPost(post.slug)}
      >
        {post.title}
      </p>
      <p className="text-bb-gray-600">{post.description}</p>
      <p className="text-bb-gray-600">{formatted}</p>
    </div>
  );
};

export default Card;

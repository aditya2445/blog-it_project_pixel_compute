import React from "react";

import Categories from "../commons/Categories";

const Card = ({ element: post, showPost }) => {
  const isoDate = post.created_at;
  const date = new Date(isoDate);
  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-slate-100 px-2 py-3 shadow-md">
      <p
        className="cursor-pointer text-lg font-semibold"
        onClick={() => showPost(post.slug)}
      >
        {post.title}
      </p>
      <Categories categories={post.categories} />
      <div>
        <p className="font-semibold text-bb-gray-600">{post.user.name}</p>
        <p className="text-bb-gray-600">{formatted}</p>
      </div>
    </div>
  );
};

export default Card;

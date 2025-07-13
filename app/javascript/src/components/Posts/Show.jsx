import React from "react";

import { Edit } from "@bigbinary/neeto-icons";
import { Tooltip, Typography } from "@bigbinary/neetoui";
import { Container, PageLoader, PageTitle } from "components/commons";
import Categories from "components/commons/Categories";
import { useFetchPostBySlug } from "hooks/usePostsApi";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Show = () => {
  const { slug } = useParams();
  const history = useHistory();
  const { data, isLoading } = useFetchPostBySlug(slug);
  if (isLoading) {
    return <PageLoader />;
  }
  const { post, user, categories } = data.data;
  const isoDate = post.created_at;
  const date = new Date(isoDate);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Container>
      <div className="flex flex-col p-4">
        <div className="flex flex-col">
          <Categories categories={categories} />
          <div className="flex justify-between">
            <div className="flex items-center justify-center">
              <PageTitle title={post?.title} />
              {post?.status === "draft" && (
                <span className="text-Red-800 ml-2 mt-8 rounded-xl border border-red-600 px-2 py-1 text-xs font-semibold text-red-700">
                  Draft
                </span>
              )}
            </div>
            <Tooltip content="Edit" followCursor="horizontal" position="top">
              <Edit
                className="cursor-pointer"
                onClick={() => history.push(`/posts/${slug}/edit`)}
              />
            </Tooltip>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <div>
              <img
                alt=""
                className="h-10 w-10 rounded-lg"
                src="https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg"
              />
            </div>
            <div>
              <Typography style="body2" weight="bold">
                {user.name}
              </Typography>
              <Typography className="text-slate-500" style="body2">
                {formattedDate}
              </Typography>
            </div>
          </div>
          <Typography className="leading-2 text-justify" style="body2">
            {post?.description}
          </Typography>
          {/* <div className="leading-2 space-y-4 text-justify">
            {post?.description?.split("\n").map((para, index) => (
              <Typography key={index} style="body2">
                {para}
              </Typography>
            ))}
          </div> */}
        </div>
      </div>
    </Container>
  );
};

export default Show;

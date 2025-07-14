import React from "react";

import { PageTitle, PageLoader, Container } from "components/commons";
import {
  useShowMyPosts,
  useDeletePost,
  useUpdatePost,
} from "hooks/usePostsApi";

import PostTable from "./PostTable";

const MyPosts = () => {
  const { data, isLoading } = useShowMyPosts();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: updatePost } = useUpdatePost();
  if (isLoading) return <PageLoader />;
  const handleDelete = slug => {
    deletePost(slug);
  };

  const handleOnToggleStatus = (slug, status) => {
    updatePost({
      slug,
      payload: {
        status,
      },
    });
  };
  const posts = data?.data?.posts;

  return (
    <Container>
      <PageTitle title="My Blog Posts" />
      <PostTable
        posts={posts}
        onDelete={handleDelete}
        onToggleStatus={handleOnToggleStatus}
      />
    </Container>
  );
};

export default MyPosts;

import React from "react";

import { PageTitle, PageLoader, Container } from "components/commons";
import {
  useShowMyPosts,
  useDeletePost,
  useTogglePostStatus,
} from "hooks/usePostsApi";

import PostTable from "./PostTable";

const MyPosts = () => {
  const { data, isLoading } = useShowMyPosts();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: toggleStatus } = useTogglePostStatus();

  const posts = data?.data?.posts;

  const handleDelete = slug => {
    deletePost(slug);
  };

  const handleToggleStatus = slug => {
    toggleStatus(slug);
  };

  if (isLoading) return <PageLoader />;

  return (
    <Container>
      <PageTitle title="My Blog Posts" />
      <PostTable
        posts={posts}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />
    </Container>
  );
};

export default MyPosts;

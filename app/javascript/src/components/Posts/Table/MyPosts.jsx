// components/Posts/MyPosts.jsx

import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import { PageTitle, PageLoader, Container } from "components/commons";
import { toast } from "react-toastify";

import PostTable from "./PostTable";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    try {
      const response = await postsApi.myPosts();
      setPosts(response.data.posts);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async slug => {
    try {
      await postsApi.destroy(slug);
      toast.success("Post deleted");
      fetchMyPosts(); // refresh
    } catch (error) {
      logger.error(error);
    }
  };

  const handleToggleStatus = async (slug, newStatus) => {
    try {
      await postsApi.toggleStatus(slug);
      toast.success(
        `Post ${newStatus === "draft" ? "unpublished" : "published"}`
      );
      fetchMyPosts(); // refresh
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  if (loading) return <PageLoader />;

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

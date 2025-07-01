import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import { PageLoader, PageTitle, Container } from "components/commons";
import List from "components/Posts/List";
import Logger from "js-logger";
import { isNil, isEmpty, either } from "ramda";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
      setLoading(false);
    } catch (error) {
      Logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(posts)) {
    return (
      <Container className="mt-10 flex w-full flex-col items-center">
        <p className="text-lg font-bold">No posts to show.</p>
      </Container>
    );
  }

  return (
    <Container className="h-screen w-full">
      <div className="flex flex-col gap-y-8 overflow-y-auto">
        <PageTitle title="Blog Posts" />
        <List postList={posts} />
      </div>
    </Container>
  );
};

export default Dashboard;

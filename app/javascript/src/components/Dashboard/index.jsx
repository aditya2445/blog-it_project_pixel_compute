import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import { PageLoader, PageTitle, Container, Button } from "components/commons";
import List from "components/Posts/List";
import Logger from "js-logger";
import { isNil, isEmpty, either } from "ramda";

const Dashboard = ({ history }) => {
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

  const clickHandler = () => {
    history.push("post/create");
  };

  const showPost = slug => {
    history.push(`/posts/${slug}/show`);
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
      <Container className="mt-10 flex w-full justify-between">
        <p className="text-lg font-bold">No posts to show.</p>
        <Button
          buttonText="Add Post"
          className="self-start bg-slate-700"
          onClick={clickHandler}
        />
      </Container>
    );
  }

  return (
    <Container className="h-screen w-full">
      <div className="flex flex-col gap-y-8 overflow-y-auto">
        <div className="flex items-center justify-between">
          <PageTitle title="Add new Post" />
          <Button
            buttonText="Add Post"
            className="bg-slate-700"
            onClick={clickHandler}
          />
        </div>
        <List postList={posts} showPost={showPost} />
      </div>
    </Container>
  );
};

export default Dashboard;

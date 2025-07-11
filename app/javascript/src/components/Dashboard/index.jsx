import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import { PageLoader, PageTitle, Container, Button } from "components/commons";
import List from "components/Posts/List";
import Logger from "js-logger";
import { isNil, isEmpty, either } from "ramda";
import useCategoryStore from "stores/categoryStore";
// import { element } from "prop-types";

const Dashboard = ({ history }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedCategories } = useCategoryStore();

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

  const allPosts = posts.map(parentElement =>
    parentElement.categories.map(element => element.name)
  );

  const filterPosts = allPosts.map(element => {
    const arr = element;
    let flag = false;
    arr.forEach(cate => {
      if (selectedCategories.includes(cate)) flag = true;
    });

    return flag;
  });

  const appendIncludeFlag = posts.map((post, idx) => {
    post.include = filterPosts[idx];

    return post;
  });

  const filteredPosts = isEmpty(selectedCategories)
    ? posts
    : appendIncludeFlag.filter(ele => ele.include);

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
        <List postList={filteredPosts} showPost={showPost} />
      </div>
    </Container>
  );
};

export default Dashboard;

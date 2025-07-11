import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import postsApi from "apis/posts";
import { Container, PageLoader, PageTitle } from "components/commons";
import Categories from "components/commons/Categories";
import { useHistory, useParams } from "react-router-dom";

const Show = () => {
  const [post, setPost] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const isoDate = post.created_at;
  const date = new Date(isoDate);

  const fetchPostDetails = async () => {
    try {
      const {
        data: { post, user, categories },
      } = await postsApi.show(slug);
      setPost(post);
      setUser(user);
      setCategories(categories);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      history.push("/");
    }
  };

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex flex-col p-4">
        <div className="flex flex-col">
          <Categories categories={categories} />
          <PageTitle title={post?.title} />
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

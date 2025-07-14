import React, { useEffect, useState } from "react";

import { ExternalLink, MenuHorizontal } from "@bigbinary/neeto-icons";
import { Button, ActionDropdown } from "@bigbinary/neetoui";
import { Container, PageTitle, PageLoader } from "components/commons";
import {
  useUpdatePost,
  useFetchPostBySlug,
  useDeletePost,
} from "hooks/usePostsApi";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Form from "./Form";

const Edit = () => {
  const { slug } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");
  const [publishedTime, setPublishedTime] = useState("");
  const [statusToShow, setStatusToShow] = useState("");

  const { Menu, MenuItem } = ActionDropdown;
  const { mutate } = useUpdatePost();
  const history = useHistory();
  const { mutate: deletePost } = useDeletePost();

  const { data, isLoading } = useFetchPostBySlug(slug);

  useEffect(() => {
    if (data) {
      const { post, categories } = data.data;
      setTitle(post.title);
      setDescription(post.description);
      setSelectedCategoryIds(categories.map(cat => cat.id));
      setStatus(post.status);
      setStatusToShow(post.status);
      setPublishedTime(post.published_at);
    }
  }, [data]);

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    mutate(
      {
        slug,
        payload: {
          title,
          description,
          status,
          category_ids: selectedCategoryIds,
        },
      },
      {
        onSuccess: () => {
          setLoading(false);
          history.push("/");
        },
        onError: error => {
          setLoading(false);
          logger.error(error);
        },
      }
    );
  };

  const deleteHandler = async slug => {
    deletePost(slug);
    history.push("/");
  };

  if (isLoading) return <PageLoader />;

  return (
    <Container>
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <PageTitle title="Edit blog post" />
          <div className="flex items-center gap-2">
            <span>
              {statusToShow === "published" ? "Published on " : "Drafted at "}
              {new Date(publishedTime).toLocaleString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <ExternalLink
              className="cursor-pointer"
              onClick={() => history.push(`/posts/${slug}/show`)}
            />
            <Button
              label="Cancel"
              style="secondary"
              onClick={() => history.push("/")}
            />
            <ActionDropdown
              buttonStyle="primary"
              className="z-50"
              label={status === "draft" ? "Draft" : "Publish"}
            >
              <Menu>
                <MenuItem.Button onClick={() => setStatus("published")}>
                  Publish
                </MenuItem.Button>
                <MenuItem.Button onClick={() => setStatus("draft")}>
                  Save as draft
                </MenuItem.Button>
              </Menu>
            </ActionDropdown>
            <div className="relative">
              <MenuHorizontal
                className="cursor-pointer"
                onClick={() => setShow(prev => !prev)}
              />
              {show && (
                <Button
                  className="absolute right-0 top-9 text-red-600"
                  style="secondary"
                  onClick={() => deleteHandler(slug)}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
        <Form
          description={description}
          handleSubmit={handleSubmit}
          loading={loading}
          selectedCategoryIds={selectedCategoryIds}
          setDescription={setDescription}
          setSelectedCategoryIds={setSelectedCategoryIds}
          setTitle={setTitle}
          title={title}
          type="Edit"
        />
      </div>
    </Container>
  );
};

export default Edit;

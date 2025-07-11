import React, { useState } from "react";

import { Container, PageTitle } from "components/commons";
import { useCreatePost } from "hooks/usePostsApi";
import { useHistory } from "react-router-dom";
import { getFromLocalStorage } from "utils/storage";

import Form from "./Form";

const Create = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const authUserId = getFromLocalStorage("authUserId");

  const { mutate } = useCreatePost();

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    mutate(
      {
        title,
        description,
        category_ids: selectedCategoryIds,
        user_id: authUserId,
      },
      {
        onSuccess: () => {
          setLoading(false);
          history.push("/dashboard");
        },
        onError: error => {
          setLoading(false);
          logger.error(error);
        },
      }
    );
  };

  return (
    <Container>
      <div className="flex h-full flex-col gap-4">
        <PageTitle title="Add new blog" />
        <Form
          description={description}
          handleSubmit={handleSubmit}
          loading={loading}
          selectedCategoryIds={selectedCategoryIds}
          setDescription={setDescription}
          setSelectedCategoryIds={setSelectedCategoryIds}
          setTitle={setTitle}
          title={title}
        />
      </div>
    </Container>
  );
};

export default Create;

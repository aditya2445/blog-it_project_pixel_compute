import React, { useState } from "react";

import { ActionDropdown, Button } from "@bigbinary/neetoui";
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
  const [status, setStatus] = useState("draft");
  const { Menu, MenuItem } = ActionDropdown;

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    mutate(
      {
        title,
        description,
        category_ids: selectedCategoryIds,
        user_id: authUserId,
        status,
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

  return (
    <Container>
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <PageTitle title="Add new blog" />
          <div className="flex items-center gap-2">
            <Button
              label="Cancel"
              style="secondary"
              onClick={() => history.back()}
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
        />
      </div>
    </Container>
  );
};

export default Create;

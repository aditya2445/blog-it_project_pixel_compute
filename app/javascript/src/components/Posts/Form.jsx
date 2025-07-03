import React from "react";

import { Input, Button, TextArea } from "components/commons";
import { Link } from "react-router-dom";

const Form = ({
  description,
  type = "create",
  title,
  setTitle,
  loading,
  handleSubmit,
  setDescription,
}) => (
  <form
    className="mb-4 flex h-[70vh] min-h-fit w-full flex-col justify-between space-y-2 rounded-lg border-2 border-gray-200 p-4"
    onSubmit={handleSubmit}
  >
    <div className="flex flex-col gap-4">
      <Input
        label="Title"
        placeholder="Enter title"
        value={title}
        onChange={e => setTitle(e.target.value.slice(0, 50))}
      />
      <TextArea
        label="Description"
        placeholder="Enter description"
        rows={4}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
    </div>
    <div className="flex gap-2 self-end">
      <Link className="border px-4 py-2" to="/dashboard">
        Cancel
      </Link>
      <Button
        buttonText={type === "create" ? "Create Post" : "Update Post"}
        className="bg-slate-950"
        loading={loading}
        type="submit"
      />
    </div>
  </form>
);

export default Form;

import React, { useEffect, useState } from "react";

import categoriesApi from "apis/categories";
import { Button, Input } from "components/commons";
import Select from "react-select";

const Form = ({
  type = "Create",
  title,
  setTitle,
  description,
  setDescription,
  selectedCategoryIds,
  setSelectedCategoryIds,
  handleSubmit,
  loading,
}) => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

  const selectedOptions = categoryOptions.filter(option =>
    selectedCategoryIds.includes(option.value)
  );

  const handleCategoryChange = selectedOptions => {
    const ids = selectedOptions.map(option => option.value);
    setSelectedCategoryIds(ids);
  };

  return (
    <form className="h-full w-full" onSubmit={handleSubmit}>
      <div className="flex h-full flex-col justify-between rounded-md border p-6 shadow">
        <div className="flex flex-col gap-4">
          <Input
            label="Title"
            placeholder="Enter title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-800">
              Categories
            </label>
            <Select
              isMulti
              className="text-sm"
              classNamePrefix="react-select"
              options={categoryOptions}
              value={selectedOptions}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">
              Description
            </label>
            <textarea
              required
              className="mt-1 rounded-md border border-gray-300 p-2 text-sm"
              placeholder="Enter description"
              rows="5"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4 self-end">
          <Button
            buttonText="Cancel"
            className={`${type === "Create" ? "block" : "hidden"}`}
            style="secondary"
            onClick={() => history.back()}
          />
          <Button
            buttonText={`${type === "Create" ? "Submit" : "Edit"}`}
            loading={loading}
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default Form;

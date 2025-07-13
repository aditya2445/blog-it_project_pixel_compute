import React, { useEffect, useState } from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Typography, Input, Button, Modal } from "@bigbinary/neetoui";
import classNames from "classnames";
import { useFetchCategories, useCreateCategory } from "hooks/useCategoryApi";
import { isEmpty } from "ramda";
import { Link } from "react-router-dom/cjs/react-router-dom";
import useCategoryStore from "stores/categoryStore";

const List = ({ show }) => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { selectedCategories, toggleCategory } = useCategoryStore();
  const { data, isLoading } = useFetchCategories();
  const { mutate } = useCreateCategory();
  const categories = data?.data?.categories;

  useEffect(() => {
    if (!isLoading && categories) {
      setFilteredCategories(categories);
    }
  }, [isLoading, categories]);

  const handleSelectedCategories = category => {
    toggleCategory(category.name);
  };

  const handleAddCategory = async event => {
    event.preventDefault();
    mutate(
      {
        name: categoryName,
      },
      {
        onSuccess: () => {
          history.push("/");
        },
        onError: error => {
          logger.error(error);
        },
      }
    );
  };

  const handleOnChange = event => {
    setSearchInput(event.target.value);
    const filteredCategoriesResult = categories.filter(cat =>
      cat.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCategories(filteredCategoriesResult);
  };

  return (
    <div
      className={classNames("w-1/2 bg-slate-200 px-4 py-10 md:w-1/5", {
        block: show,
        hidden: !show,
      })}
    >
      <div className="flex flex-col items-center justify-between gap-4">
        <div className="flex w-full items-center justify-between gap-3">
          <Typography className="font-bold">CATEGORIES</Typography>
          <div className="flex items-center justify-between">
            <Search
              className="cursor-pointer text-sm text-slate-400"
              onClick={() => setToggleSearch(prev => !prev)}
            />
            <Button
              className="text-slate-400"
              component={Link}
              icon={Plus}
              iconPosition="left"
              style="text"
              onClick={() => setIsModalOpen(prev => !prev)}
            />
          </div>
        </div>
        {toggleSearch && (
          <Input
            placeholder="search for category"
            value={searchInput}
            onChange={handleOnChange}
          />
        )}
        <div className="flex w-full flex-col gap-2">
          {isEmpty(categories) ? (
            <Typography>Add categories!</Typography>
          ) : (
            filteredCategories.map(category => (
              <div
                key={category.id}
                className={`${
                  selectedCategories.includes(category.name) ? "bg-white" : ""
                } ${"cursor-pointer border border-gray-300 px-3 py-1 font-semibold"}`}
                onClick={() => handleSelectedCategories(category)}
              >
                {category.name}
              </div>
            ))
          )}
        </div>
      </div>
      <Modal
        closeButton
        isOpen={isModalOpen}
        size="small"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col gap-3 px-2 py-5">
          <div>
            <Typography style="h2" weight="bold">
              New category
            </Typography>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              label="Category Name"
              placeholder="Enter name"
              value={categoryName}
              onChange={e => setCategoryName(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                className="bg-black"
                disabled={!categoryName.trim()}
                label="Add"
                onClick={handleAddCategory}
              />
              <Button
                label="Cancel"
                style="text"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default List;

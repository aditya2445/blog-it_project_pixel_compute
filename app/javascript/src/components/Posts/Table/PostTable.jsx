import React from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Dropdown, Tooltip, Typography } from "@bigbinary/neetoui";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PostTable = ({ posts, onToggleStatus, onDelete }) => (
  <div className="overflow-x-auto rounded">
    <div className="mb-2 mt-4">
      <Typography weight="bold">{posts.length} articles</Typography>
    </div>
    <table className="min-w-full table-fixed">
      <thead>
        <tr className="bg-gray-100 text-xs uppercase text-gray-800">
          <th className="w-1/3 px-4 py-2 text-left">Title</th>
          <th className="px-4 py-2 text-left">Categories</th>
          <th className="px-4 py-2 text-left">Last Published At</th>
          <th className="px-4 py-2 text-left">Status</th>
          <th className="w-12 px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => {
          const isDraft = post?.status === "draft";
          const dropdownOptions = isDraft
            ? ["Publish", "Delete"]
            : ["Unpublish", "Delete"];

          return (
            <tr
              key={post.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-slate-300"
              } border-t`}
            >
              <td className="max-w-xs truncate px-4 py-2 font-medium text-indigo-600">
                <Tooltip tooltipContent={post.title}>
                  <Link
                    className="block truncate"
                    to={`/posts/${post.slug}/edit`}
                  >
                    {post.title}
                  </Link>
                </Tooltip>
              </td>
              <td
                className="p
              x-4 py-2 text-sm text-gray-800"
              >
                {post.categories.map(c => c.name).join(", ")}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {post.updated_at
                  ? dayjs(post.updated_at).format("DD MMM YYYY, hh:mm A")
                  : "—"}
              </td>
              <td className="px-4 py-2 text-sm capitalize">{post.status}</td>
              <td className="px-4 py-2 text-center">
                <Dropdown
                  buttonStyle="text"
                  className="z-50"
                  position="bottom-end"
                  buttonIcon={() => (
                    <MenuHorizontal className="text-gray-600" />
                  )}
                >
                  <Dropdown.Menu>
                    {dropdownOptions.includes("Publish") && (
                      <Dropdown.MenuItem.Button
                        onClick={() => onToggleStatus(post.slug)}
                      >
                        Publish
                      </Dropdown.MenuItem.Button>
                    )}
                    {dropdownOptions.includes("Unpublish") && (
                      <Dropdown.MenuItem.Button
                        onClick={() => onToggleStatus(post.slug)}
                      >
                        Unpublish
                      </Dropdown.MenuItem.Button>
                    )}
                    <Dropdown.MenuItem.Button
                      style="danger"
                      onClick={() => onDelete(post.slug)}
                    >
                      Delete
                    </Dropdown.MenuItem.Button>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

PostTable.propTypes = {
  posts: PropTypes.array.isRequired,
  onToggleStatus: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostTable;

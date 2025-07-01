import React from "react";

import Card from "./Card";

const List = ({ postList }) =>
  postList.map(post => <Card element={post} key={post.id} />);

export default List;

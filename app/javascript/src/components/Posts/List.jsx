import React from "react";

import Card from "./Card";

const List = ({ postList, showPost }) =>
  postList.map(post => (
    <Card element={post} key={post.id} showPost={showPost} />
  ));

export default List;

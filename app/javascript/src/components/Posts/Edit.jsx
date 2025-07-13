// import React, { useEffect, useState } from "react";

// import { MenuHorizontal } from "@bigbinary/neeto-icons";
// import { Dropdown, Button } from "@bigbinary/neetoui";
// import { Container, PageTitle, PageLoader } from "components/commons";
// import { useCreatePost, useFetchPostBySlug } from "hooks/usePostsApi";
// import { useParams } from "react-router-dom";
// import { getFromLocalStorage } from "utils/storage";

// import Form from "./Form";

// const Edit = () => {
//   const { slug } = useParams();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const authUserId = getFromLocalStorage("authUserId");
//   const { Menu, MenuItem } = Dropdown;
//   const { mutate } = useCreatePost();
//   const [show, setShow] = useState(false);

//   const { data, isLoading } = useFetchPostBySlug(slug);

//   useEffect(() => {
//     if (data) {
//       const { post, categories } = data.data;
//       setTitle(post.title);
//       setDescription(post.description);
//       setSelectedCategoryIds(categories.map(cat => cat.id));
//     }
//   }, [data]);

//   const handleSubmit = async event => {
//     event.preventDefault();
//     setLoading(true);
//     mutate(
//       {
//         title,
//         description,
//         category_ids: selectedCategoryIds,
//         user_id: authUserId,
//       },
//       {
//         onSuccess: () => {
//           setLoading(false);
//           // history.push("/dashboard");
//         },
//         onError: error => {
//           setLoading(false);
//           logger.error(error);
//         },
//       }
//     );
//   };

//   const deleteHandler = () => {
//     alert("we will soon delete the post");
//     setShow(false);
//   };

//   return (
//     <Container>
//       <div className="flex h-full flex-col gap-4">
//         <div className="flex items-center justify-between">
//           <PageTitle title="Edit blog post" />
//           <div className="flex items-center gap-2">
//             <Button
//               label="Cancel"
//               style="secondary"
//               onClick={() => history.back()}
//             />
//             <Dropdown buttonStyle="primary" className="z-50" label="Publish">
//               <Menu>
//                 <MenuItem.Button onClick={() => alert("Published as draft")}>
//                   Publish
//                 </MenuItem.Button>
//                 <MenuItem.Button
//                   onClick={() => alert("Published successfully")}
//                 >
//                   Save as draft
//                 </MenuItem.Button>
//               </Menu>
//             </Dropdown>
//             <div className="relative">
//               <MenuHorizontal
//                 className="cursor-pointer"
//                 onClick={() => setShow(prev => !prev)}
//               />
//               {show && (
//                 <Button
//                   className="absolute right-0 top-9 text-red-600"
//                   style="secondary"
//                   onClick={deleteHandler}
//                 >
//                   Delete
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//         <Form
//           description={description}
//           handleSubmit={handleSubmit}
//           loading={loading}
//           selectedCategoryIds={selectedCategoryIds}
//           setDescription={setDescription}
//           setSelectedCategoryIds={setSelectedCategoryIds}
//           setTitle={setTitle}
//           title={title}
//         />
//       </div>
//     </Container>
//   );
// };

// export default Edit;

import React, { useEffect, useState } from "react";

import { ExternalLink, MenuHorizontal } from "@bigbinary/neeto-icons";
import { Dropdown, Button } from "@bigbinary/neetoui";
import postsApi from "apis/posts";
import { Container, PageTitle, PageLoader } from "components/commons";
import { useUpdatePost, useFetchPostBySlug } from "hooks/usePostsApi";
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

  const { Menu, MenuItem } = Dropdown;
  const { mutate } = useUpdatePost();
  const history = useHistory();

  const { data, isLoading } = useFetchPostBySlug(slug);

  useEffect(() => {
    if (data) {
      const { post, categories } = data.data;
      setTitle(post.title);
      setDescription(post.description);
      setSelectedCategoryIds(categories.map(cat => cat.id));
      setStatus(post.status);
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
    try {
      await postsApi.destroy(slug);
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <Container>
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <PageTitle title="Edit blog post" />
          <div className="flex items-center gap-2">
            <ExternalLink
              className="cursor-pointer"
              onClick={() => history.push(`/posts/${slug}/show`)}
            />
            <Button
              label="Cancel"
              style="secondary"
              onClick={() => history.push("/")}
            />
            <Dropdown
              buttonStyle="primary"
              className="z-50"
              label={status === "draft" ? "Daft" : "Published"}
            >
              <Menu>
                <MenuItem.Button onClick={() => alert("Published as draft")}>
                  Publish
                </MenuItem.Button>
                <MenuItem.Button onClick={() => alert("Saved as draft")}>
                  Save as draft
                </MenuItem.Button>
              </Menu>
            </Dropdown>
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

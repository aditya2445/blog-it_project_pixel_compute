import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useShowPosts = () =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: () => postsApi.fetch(),
  });

export const useFetchPostBySlug = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.POST, slug],
    queryFn: () => postsApi.show(slug),
    enabled: !!slug,
  });

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payload => postsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, payload }) => postsApi.update(slug, payload),
    onSuccess: ({ slug }) => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS, slug]);
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.POST]);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: slug => postsApi.destroy(slug),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.POST]);
    },
  });
};

export const useShowMyPosts = () =>
  useQuery({
    queryKey: [QUERY_KEYS.MY_POSTS],
    queryFn: postsApi.myPosts,
  });

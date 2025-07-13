import organizationsApi from "apis/organization";
import { useQuery } from "react-query";

export const useFetchOrganizations = () =>
  useQuery({
    queryKey: ["organizations"],
    queryFn: () => organizationsApi.fetch(),
  });

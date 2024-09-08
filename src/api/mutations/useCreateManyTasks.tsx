import { graphqlClient } from "@/gqlClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";

const CREATE_MANY_TASKS = gql`
  mutation Mutation {
    createManyTasks
  }
`;

const gqlRequest = async () => {
  await graphqlClient.request(CREATE_MANY_TASKS);
  return "success";
};

const useCreateManyTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-many-taks"],
    mutationFn: gqlRequest,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["all-tasks"] });
      queryClient.refetchQueries({ queryKey: ["tasks-stats"] });
    },
    onError: () => {
      alert("Ocurrio un error. Intenta nuevamente");
    },
  });
};

export default useCreateManyTasks;

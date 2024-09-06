import { graphqlClient } from "@/gqlClient";
import { TasksStatsResponse } from "@/vite-env";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

const GET_STATS = gql`
  query GetStats {
    getStats {
      shortestTask {
        id
        name
        description
        defined_time
        remaining_time
        completed_at
      }
      longestTask {
        id
        name
        description
        defined_time
        remaining_time
        completed_at
      }
      averageCompletionTime
      taskCategories {
        short
        medium
        long
      }
      tasksCompletedByWeek {
        weekStart
        days {
          count
          date
        }
      }
    }
  }
`;

const gqlRequest = async () => {
  const data = await graphqlClient.request<TasksStatsResponse>(GET_STATS);
  return data.getStats;
};

const useGetStats = () => {
  return useQuery({
    queryKey: ["tasks-stats"],
    queryFn: gqlRequest,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetStats;

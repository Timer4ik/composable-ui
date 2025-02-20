import useFetcher from "~/utils/base/fetcher";

const collections = {
  getAll: ({ id, params }) => useFetcher().get(`/collections`, params),
  get: async ({ id, params }) => useFetcher().get(`/collections/${id}`, params),
  getMain: async ({ params }) => useFetcher().get(`/collections/main`, params),
  getNotifications: async () => useFetcher().get(`/collections/notification`),
};

export default collections;

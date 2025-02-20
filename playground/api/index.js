import seo from "./base/seo.js";
import collections from "./base/collections.js";
import auth from "./base/auth.js";
import me from "./base/me.js";
import useFetcher from "~/utils/base/fetcher.js";

export function register() {
  return {
    seo,
    me,
    auth,
    collections,
    todos: {
      getAll({params}) {
        
        return useFetcher().get(`https://etp2.rdbx.dev/api/lots`, {
          params:params.params,
        });
      },
    },
  };
}
const api = register();

export default api;

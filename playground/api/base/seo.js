import useFetcher from "~/utils/base/fetcher";

export default {
  getMetadataBy: async ( { key, id, params } ) =>
    useFetcher().get( `/_service_:seo_module/metadata/${ key }:${ id }`, params )
};
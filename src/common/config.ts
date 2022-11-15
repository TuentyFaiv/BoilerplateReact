const envs = import.meta.env;

export default {
  brand: "",
  auth_pages: ["/auth/signin", "/auth/signup", "/auth/forgot"],
  i18n_langs: ["es", "en-US"],
  i18n_fallback_lang: "es",
  i18n_debug: envs.PUB_DEBUG_I18NEXT,
  api: envs.PUB_API || "http://localhost:5000",
  api_local: envs.PUB_API_LOCAL || `http://localhost:${envs.PUB_PORT || "3000"}`,
  landing: envs.PUB_LANDING || "http://localhost:8000",
  ipregistry_key: envs.PUB_IPREGISTRY_KEY,
  ipregistry_url: envs.PUB_IPREGISTRY_URL
};

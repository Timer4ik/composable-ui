import useFetcher from "~/utils/base/fetcher";

const auth = {
  getUrl: async (data) => await useFetcher().post(`/api/auth/get-url`, data),
  register: async (data) => useFetcher().post(`/auth/registration`, data),
  recovery: async (data) => useFetcher().post(`/auth/recovery`, data),
  recoveryConfirm: async (data) =>
    useFetcher().post(`/auth/recovery-password`, data),

  getAppLogin: async (data) => useFetcher().get("/auth/get-app-login", data),
  registration: async (data) => useFetcher().post("/auth/registration", data),
  login: async (data) => useFetcher().post("/auth/login", data),
  logout: async (data) => useFetcher().post("/auth/logout", data),
  exchangeCode: async (data) => useFetcher().get("/auth/exchange-code", data),
  getCaptcha: async (data) => useFetcher().get("/auth/tool/get-captcha", data),
  sendVerificationCode: async (data) =>
    useFetcher().post("/auth/tool/send-verification-code", data),
  getEmailAndPhone: async (data) =>
    useFetcher().post("/auth/tool/get-email-and-phone", data),
  verifyCode: async (data) => useFetcher().post("/auth/tool/verify-code", data),
  setPassword: async (data) =>
    useFetcher().post("/auth/recovery/set-password", data),
};

export default auth;

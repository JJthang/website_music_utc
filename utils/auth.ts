import { useCookie } from "nuxt/app";

export const getAuthToken = (skipAuth?: boolean, optionToken?: string) => {
  if (skipAuth) return null;
  if (optionToken) return optionToken;
  const token = useCookie("auth_token");
  return token.value || null;
};

export const buildHeaders = (authToken?: string): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;
  return headers;
};

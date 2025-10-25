import { buildHeaders, getAuthToken } from "../../../utils/auth";
import {
  useQuery,
  useMutation,
  type UseQueryOptions,
  type UseMutationOptions,
} from "@tanstack/vue-query";
import { ofetch } from "ofetch";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiOptions {
  method?: HttpMethod;
  token?: string;
  skipAuth?: boolean;
  body?: any;
  queryKey?: string[] | [string, ...any[]];
}

const buildUrl = (endpoint: string) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.ROOT_API || "http://localhost:3000/";
  return endpoint.startsWith("http")
    ? endpoint
    : `${baseUrl}${endpoint.startsWith("/") ? endpoint.slice(1) : endpoint}`;
};

// ✅ Hàm gọi API thô bằng ofetch
const apiRequest = async <T = any>(
  endpoint: string,
  { method = "GET", token, skipAuth, body }: ApiOptions = {}
): Promise<T> => {
  const url = buildUrl(endpoint);
  const authToken = getAuthToken(skipAuth, token);
  const headers = buildHeaders(authToken as string);

  return await ofetch<T>(url, { method, body, headers });
};

// ======================
// ✅ useApiQuery (GET)
// ======================
export const useApiQuery = <T = any>(
  endpoint: string,
  options: ApiOptions = {},
  queryOptions?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
) => {
  const queryKey = options.queryKey || [endpoint, options.body];
  return useQuery<T>({
    queryKey,
    queryFn: () => apiRequest<T>(endpoint, { ...options, method: "GET" }),
    ...queryOptions,
  });
};

// ======================
// ✅ useApiMutation (POST, PUT, PATCH, DELETE)
// ======================
export const useApiMutation = <T = any>(
  method: HttpMethod,
  endpoint: string,
  options?: ApiOptions,
  mutationOptions?: UseMutationOptions<T, unknown, any>
) => {
  return useMutation<T>({
    mutationFn: (body) => apiRequest<T>(endpoint, { ...options, method, body }),
    ...mutationOptions,
  });
};

// ======================
// ✅ Các helper methods
// ======================
export const useApiGet = useApiQuery;
export const useApiPost = <T = any>(
  endpoint: string,
  options?: ApiOptions,
  mutationOptions?: UseMutationOptions<T, unknown, any>
) => useApiMutation<T>("POST", endpoint, options, mutationOptions);

export const useApiPut = <T = any>(
  endpoint: string,
  options?: ApiOptions,
  mutationOptions?: UseMutationOptions<T, unknown, any>
) => useApiMutation<T>("PUT", endpoint, options, mutationOptions);

export const useApiPatch = <T = any>(
  endpoint: string,
  options?: ApiOptions,
  mutationOptions?: UseMutationOptions<T, unknown, any>
) => useApiMutation<T>("PATCH", endpoint, options, mutationOptions);

export const useApiDelete = <T = any>(
  endpoint: string,
  options?: ApiOptions,
  mutationOptions?: UseMutationOptions<T, unknown, any>
) => useApiMutation<T>("DELETE", endpoint, options, mutationOptions);

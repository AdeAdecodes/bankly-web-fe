import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
  CancelToken,
} from 'axios';
import config from '~/config';

type ApiInstance = AxiosInstance & {
  makeCancelToken: (executor: (cancel: Canceler) => void) => CancelToken;
};

const api = axios.create({
  baseURL: `${config.cms.url}/api`,
  timeout: 60000,
  timeoutErrorMessage: 'Request timeout',
}) as ApiInstance;

api.makeCancelToken = function (executor) {
  return new axios.CancelToken(executor);
};

api.interceptors.request.use(onRequestFulfilled);
api.interceptors.response.use(onResponseFulfilled, onResponseRejected);

function onRequestFulfilled<T>(config: AxiosRequestConfig<T>) {
  return config as any;
}

function onResponseFulfilled(response: AxiosResponse<any, any>) {
  if (!response.data) {
    return Promise.reject(response.data || { code: 'EMPTY_DATA' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return response;
}

export type ApiError = AxiosError & {
  cancelled: boolean;
  retryable: boolean;
  [key: string]: any;
  retry?: () => Promise<void>;
};

async function onResponseRejected(error: AxiosError) {
  const error__ = error as ApiError;

  // request got to the backend but an error status code was returned
  if (error__.response) {
    // populate error with fields in response's data
    const data = error__.response.data as Record<string, any>;

    for (const key in data) {
      error__[key] = data[key];
    }
  }

  error__.cancelled = axios.isCancel(error__);
  error__.retryable =
    !error__.cancelled && (!error__.response || !error__.response.status);

  return Promise.reject(error__);
}

export default api;

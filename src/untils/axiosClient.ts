import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import localStorage, { KeyStorage } from 'helpers/localStorage';
import statusCode from 'http-status-codes';
import queryString from 'query-string';

interface IResponse {
  statusCode: number;
  message?: string;
  data?: any;
  error?: any;
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: (params) => queryString.stringify(params)
});

instance.interceptors.request.use((request: AxiosRequestConfig) => {
  return requestHandler(request);
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return successHandler(response);
  },
  (error: any) => {
    return errorHandler(error);
  }
);

const requestHandler = (request: AxiosRequestConfig) => {
  console.log(
    `>>> Request API: ${request.url}`,
    request.params || '',
    request.data || ''
  );
  return request;
};

const successHandler = (response: AxiosResponse) => {
  console.log(`<<< Response API: ${response.config.url}`, response.data);
  return response.data;
};

const errorHandler = (error: any) => {
  throw error;
};

function getHeader(customHeaders: any = {}): any {
  // const userSession = localStorage.getObject(KeyStorage.USER_SESSION);
  // if (userSession) {
  //   const token = userSession.token;
  //   if (token) {
  //     return {
  //       ...customHeaders,
  //       Authorization: Bearer ${token}
  //     };
  //   }
  // }

  return { ...customHeaders };
}

const axiosClient = {
  get: async <ReqType, ResType extends IResponse>(
    url: string,
    params?: ReqType,
    customHeaders: any = {}
  ): Promise<ResType> => {
    const headers = getHeader(customHeaders);
    return instance.get(url, { params, headers });
  },
  post: async <ReqType, ResType extends IResponse>(
    url: string,
    data?: ReqType,
    customHeaders: any = {}
  ): Promise<ResType> => {
    const headers = getHeader(customHeaders);
    return instance.post(url, { ...data }, { headers });
  },
  put: async <ReqType, ResType extends IResponse>(
    url: string,
    data?: ReqType,
    customHeaders: any = {}
  ): Promise<ResType> => {
    const headers = getHeader(customHeaders);
    return instance.put(url, { ...data }, { headers });
  },
  delete: async <ReqType, ResType extends IResponse>(
    url: string,
    params?: ReqType,
    customHeaders: any = {}
  ): Promise<ResType> => {
    const headers = getHeader(customHeaders);
    return instance.delete(url, { params, headers });
  },
  statusCode: statusCode
};
export default axiosClient;
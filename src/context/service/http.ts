import swal from "sweetalert";
import { HTTPContentType, HTTPMetod } from "@typing/enums";
import { ServiceError } from "@utils";
import globalConfig from "@config";

import type {
  HTTPBodyFiles,
  HTTPConfigConnection,
  HTTPConfigGet,
  HTTPConfigMethods,
  HTTPConnectionReturn,
  HTTPLog,
  HTTPRequestConfig
} from "@typing/contexts";

export default class Http {
  static instance: Http | null = null;

  #api: string;
  #api_local: string;
  #api_punkaso: string;
  #token?: string;

  private constructor(token?: string) {
    this.#api = globalConfig.api;
    this.#api_local = globalConfig.api_local;
    this.#api_punkaso = globalConfig.api_punkaso;
    this.#token = token;

    Object.freeze(this);
  }

  static create(token?: string) {
    if (Http.instance === null) {
      Http.instance = new Http(token);
    }

    return Http.instance;
  }

  async #connection<T, R>(config: HTTPConfigConnection<T>): Promise<HTTPConnectionReturn<R>> {
    try {
      const contentType = config.contentType ?? HTTPContentType.JSON;
      const headers = {
        ...(contentType !== HTTPContentType.FILES && config.method !== HTTPMetod.GET ? {
          "Content-Type": contentType
        } : {}),
        ...(config.secure ? {
          Authorization: `Bearer ${this.#token}`
        } : {})
      };
      let body: string | FormData;

      switch (contentType) {
        case HTTPContentType.FILES:
          const { files = [], file, ...addToFormData } = config.body as HTTPBodyFiles<T>;
          body = new FormData();
          files.forEach((fileItem, index) => {
            (body as FormData).append(`file${index}`, fileItem, fileItem.name);
          });

          if (file) body.append("file", file, file.name);

          Object.keys(addToFormData).forEach((key) => {
            (body as FormData).append(key, addToFormData[key]);
          });
          break;
        default:
          body = JSON.stringify(config.body);
          break;
      }

      const requestConfig: HTTPRequestConfig = {
        method: config.method,
        headers,
        ...(config.method === HTTPMetod.GET ? {} : {
          body
        }),
        ...(config.signal ? { signal: config.signal } : {})
      };

      let api = this.#api;

      if (config.local) api = this.#api_local;
      if (config.punkaso) api = this.#api_punkaso;

      const url = `${api}/${config.endpoint}${config.query}`;

      if (config.log) this.#log({ url, request: requestConfig });

      const request = await fetch(url, requestConfig);

      switch (contentType) {
        default:
          const response = await request.json();

          if (config.log) this.#log({ response });
          if (response.errors || response.error || request.status !== 200) {
            throw new ServiceError({
              message: config.errorMessage ?? response.message ?? response.error,
              code: response?.code ?? "",
              status: response.status,
              errors: response.errors ?? response.error ?? ""
            });
          }

          const payload = response.payload ?? response.data ?? response;

          return {
            success: response.success,
            message: response.message,
            payload
          };
      }
    } catch (error) {
      let message = "¡Oh no!";
      let name = "Error";
      if (error instanceof Error) {
        message = error.message;
        name = error.name;
      }
      if (error instanceof ServiceError) {
        message = error.message;
        name = error.name;

        throw new ServiceError(error.viewData());
      }

      if (!name.includes("AbortError")) {
        swal("Error!", message, "error");
      }

      throw new Error(message);
    }
  }

  getToken() {
    return this.#token;
  }

  #log(httpLog: HTTPLog) {
    // eslint-disable-next-line no-console
    console.log({
      ...httpLog,
      apis: {
        cloud: this.#api,
        local: this.#api_local
      }
    });
  }

  async get<R>({ endpoint, query = "", secure = true, ...config }: HTTPConfigGet) {

    return this.#connection<never, R>({
      method: HTTPMetod.GET,
      secure,
      endpoint,
      query,
      ...config
    });
  }

  async put<T, R>({ endpoint, query = "", secure = true, ...config }: HTTPConfigMethods<T>) {

    return this.#connection<T, R>({
      method: HTTPMetod.PUT,
      secure,
      endpoint,
      query,
      ...config
    });
  }

  async post<T, R>({ endpoint, query = "", secure = true, ...config }: HTTPConfigMethods<T>) {

    return this.#connection<T, R>({
      method: HTTPMetod.POST,
      secure,
      endpoint,
      query,
      ...config
    });
  }

  async delete<T, R>({ endpoint, query = "", secure = true, ...config }: HTTPConfigMethods<T>) {

    return this.#connection<T, R>({
      method: HTTPMetod.DELETE,
      secure,
      endpoint,
      query,
      ...config
    });
  }
}

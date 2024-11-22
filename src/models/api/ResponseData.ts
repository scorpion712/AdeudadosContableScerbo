import { ResponseBase } from "./ResponseBase";

export type ResponseData<T> = ResponseBase & {
    data: T;
}
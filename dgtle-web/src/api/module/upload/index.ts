import { request } from "../../request";
import { OssSignDataType } from "./types";

export function getOssSign() {
  return request<OssSignDataType>({
    url: "/upload/ossSign",
    method: "get"
  });
}

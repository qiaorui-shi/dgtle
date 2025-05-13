import { request } from "../../request";
import type { PublishDynamicType } from "./type";

export function publishDynamic(data: PublishDynamicType) {
  return request<PublishDynamicType>({
    url: "/dynamic/publish",
    method: "post",
    data
  });
}

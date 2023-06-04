import request from "@/utils/request";

export function getDetail(params: any) {
  return request({
    url: "/detail/getDetail",
    method: "get",
    params
  });
}

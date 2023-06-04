import request from "@/utils/request";

export function getList(params: any) {
  return request({
    url: "/list/getList",
    method: "get",
    params
  });
}

export function doEdit(data: any) {
  return request({
    url: "/list/doEdit",
    method: "post",
    data
  });
}

export function doDelete(data: any) {
  return request({
    url: "/list/doDelete",
    method: "post",
    data
  });
}

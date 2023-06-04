/*
 * @Author: minchao920917 499790879@qq.com
 * @Date: 2023-06-04 10:22:14
 * @LastEditors: Do not edit
 * @Description:
 */
import { RouteRecordRaw } from "vue-router";
import { HOME_URL, LOGIN_URL, GUIDE_URL } from "@/config";

/**
 * staticRouter (静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: HOME_URL
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: GUIDE_URL,
    name: "guide",
    component: () => import("@/views/guide/index.vue"),
    meta: {
      title: "引导页"
    }
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/layouts/index.vue"),
    // component: () => import("@/layouts/indexAsync.vue"),
    redirect: HOME_URL,
    children: []
  }
];

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/ErrorMessage/403.vue"),
    meta: {
      title: "403页面"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/ErrorMessage/404.vue"),
    meta: {
      title: "404页面"
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/ErrorMessage/500.vue"),
    meta: {
      title: "500页面"
    }
  }
  // Resolve refresh page, route warnings
  // {
  //   path: "/:pathMatch(.*)*",
  //   component: () => import("@/components/ErrorMessage/404.vue")
  // }
];

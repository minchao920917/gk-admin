import type { DirectiveBinding } from "vue";
import { hasPermission } from "@/utils/permission";

export function setup(app: any) {
  /**
   * @description 自定义指令v-permissions
   */
  app.directive("permissions", {
    mounted(el: any, binding: DirectiveBinding) {
      const { value } = binding;
      if (value) if (!hasPermission(value)) el.parentNode && el.parentNode.removeChild(el);
    }
  });
}

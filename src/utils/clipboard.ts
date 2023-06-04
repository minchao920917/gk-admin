/*
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-06-06 09:30:38
 * @LastEditors: Do not edit
 * @Description:
 */
import { gp } from "@gp";

function clipboardSuccess(text: any) {
  gp.$baseMessage(`拷贝${text}成功`, "success", "mc-hey-message-success", false);
}

function clipboardError(text: any) {
  gp.$baseMessage(`拷贝${text}失败`, "error", "mc-hey-message-success", false);
}

/**
 * @description 复制数据
 * @param text
 */
export default function handleClipboard(text: string) {
  const { isSupported, copy } = useClipboard();
  if (!isSupported) {
    usePermission("clipboard-write");
  }
  copy(text)
    .then(() => {
      clipboardSuccess(text);
    })
    .catch(err => {
      console.log(err);
      clipboardError(text);
    });
}

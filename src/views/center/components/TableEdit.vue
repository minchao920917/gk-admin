<!--
 * @Author: minchao920917 499790879@qq.com
 * @Date: 2023-06-04 23:52:16
 * @LastEditors: Do not edit
 * @Description: 
-->
<script lang="ts">
import { doEdit } from "@/api/table";

export default defineComponent({
  name: "TableEdit",
  emits: ["fetchData"],
  setup(props, { emit }) {
    const $baseMessage: any = inject("$baseMessage");

    const state = reactive({
      formRef: null as any,
      form: {
        title: "",
        author: ""
      },
      rules: {
        title: [{ required: true, trigger: "blur", message: "请输入标题" }],
        author: [{ required: true, trigger: "blur", message: "请输入作者" }]
      },
      title: "",
      dialogFormVisible: false
    });

    const showEdit = (row: any) => {
      if (!row) {
        state.title = "添加";
      } else {
        state.title = "编辑";
        state.form = JSON.parse(JSON.stringify(row));
      }
      state.dialogFormVisible = true;
    };
    const close = () => {
      state.formRef.resetFields();
      state.form = {
        title: "",
        author: ""
      };
      state.dialogFormVisible = false;
    };
    const save = () => {
      state.formRef.validate(async (valid: any) => {
        if (valid) {
          const res: any = await doEdit(state.form);
          $baseMessage(res.msg, "success", "mc-hey-message-success");
          emit("fetchData");
          close();
        }
      });
    };

    return {
      ...toRefs(state),
      showEdit,
      close,
      save
    };
  }
});
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="title" width="500px" @close="close">
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model.trim="form.title" />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model.trim="form.author" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

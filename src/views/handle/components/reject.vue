<script lang="ts">
import { doEdit } from '@/api/table'

export default defineComponent({
  name: 'Reject',
  emits: ['fetch-data'],
  setup(props, { emit }) {
    const $baseMessage: any = inject('$baseMessage')

    const state = reactive({
      formRef: null as any,
      form: {
        reson: '',

      },
      rules: {
        reson: [{ required: true, trigger: 'blur', message: '请输入标题' }],
      },
      title: '拒绝',
      dialogFormVisible: false,
    })

    const showDialog = (row: any) => {
      state.dialogFormVisible = true
    }
    const close = () => {
      state.formRef.resetFields()
      state.form = {
        reson: '',
      }
      state.dialogFormVisible = false
    }
    const save = () => {
      state.formRef.validate(async (valid: any) => {
        if (valid) {
          const res: any = await doEdit(state.form)
          $baseMessage(res.msg, 'success', 'mc-hey-message-success')
          emit('fetch-data')
          close()
        }
      })
    }

    return {
      ...toRefs(state),
      showDialog,
      close,
      save,
    }
  },
})
</script>
<template>
  <el-dialog v-model="dialogFormVisible" :title="title" width="500px" @close="close">
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="原因" prop="reson">
        <el-input v-model.trim="form.reson" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>



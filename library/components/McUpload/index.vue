<!-- eslint-disable vue/no-mutating-props -->
<!--
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-10-31 16:43:00
 * @LastEditors: Do not edit
 * @Description: 手动上传
-->

<template>
    <el-dialog class="mc-hand-upload" :destroy-on-close="true" :model-value="props.dialogUploadVisible"
        :title="props.dialogTitle" width="40%" @close="close">
        <el-upload ref="uploadRef" v-bind="$attrs" v-model:file-list="fileList" :action="props.action" :auto-upload="false"
            :before-upload="beforeUploadFile" class="upload-box" :limit="limit" :on-change="handleChange"
            :on-exceed="handleExceed">
            <template #trigger>
                <el-button size="small" type="primary">选择上传的文件</el-button>
            </template>

            <el-button class="ml-2" size="small" type="success" @click="submitUpload">
                上传到服务器
            </el-button>
        </el-upload>
        <div v-if="$slots['tip']" class="el-upload__tip">
            <slot name="tip"></slot>
        </div>
        <div v-if="$slots['downTemplate']" class="down">
            <slot name="downTemplate"></slot>
        </div>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import type {
    UploadInstance,
    UploadUserFile,
    UploadProps,
    UploadRawFile,
} from 'element-plus'
const uploadRef = ref<UploadInstance>()
const $baseMessage: any = inject('$baseMessage')
const emit = defineEmits(['closeUpload', 'toUpload'])
const fileList = ref<UploadUserFile[]>([])
const props = defineProps({
    // 是否显示上传弹框
    dialogUploadVisible: {
        type: Boolean,
        default: false,
    },
    // 弹框标题
    dialogTitle: {
        type: String,
        default: '上传弹框',
    },
    // 上传地址
    action: {
        type: String,
        default: '',
    },
    // 上传地址
    limit: {
        type: Number,
        default: 1,
    },
})

const handleExceed: UploadProps['onExceed'] = (files) => {
    uploadRef.value?.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    uploadRef.value?.handleStart(file)
}

const handleChange = (file: any) => {
    console.log('file', file)
}
const submitUpload = () => {
    if (fileList.value) {
        emit('toUpload', fileList.value)
    }
}
const beforeUploadFile = (file: any) => {
    const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
    const size = file.size / 1024 / 1024
    if (extension !== '.xls') {
        $baseMessage.warning('只能上传excel的文件')
    } else if (extension !== '.xlsx') {
        $baseMessage.warning('只能上传excel的文件')
    }
    if (size > 10) {
        $baseMessage.warning('文件大小不得超过10M')
    }
}
const close = () => {
    emit('closeUpload')
}
watch(
    () => props.dialogUploadVisible,
    (newValue) => {
        if (!newValue) {
            uploadRef.value?.clearFiles()
        }
    }
)
</script>
  
<style lang="scss">
.mc-hand-upload {
    text-align: left;

    .upload-box {
        display: flex;
        flex-wrap: wrap;

        .ml-2 {
            margin-left: 20px;
        }

        :deep() {
            .el-upload-list {
                display: block;
                width: 100%;
            }
        }
    }

    .el-upload__tip {
        color: var(--el-color-danger);
        margin-top: 20px;
    }

    .down {
        margin-top: 20px;
    }
}
</style>
  
<script lang="ts" setup>
import weixinUrl from "@/assets/erweima/weixin.jpeg"
import alipayUrl from "@/assets/erweima/ali_pay.jpeg"
import weixinpayUrl from "@/assets/erweima/weixin_pay.jpeg"
const $sub: any = inject('$sub')
const state = reactive({
  dialogVisible: false,
  activeName: 'first',
  weixinUrl: weixinUrl,
  alipayUrl: alipayUrl,
  weixinpayUrl: weixinpayUrl,
})

onBeforeMount(() => {
  $sub('mc-donate', (tab: string) => {
    state.dialogVisible = true
    state.activeName = tab ? tab : 'first'
  })
})

const close = () => {
  state.dialogVisible = false
}
</script>

<template>
  <el-dialog v-model="state.dialogVisible" append-to-body class="mc-donate" width="410px" @close="close">
    <div class="mc-donate-icon">
      <mc-icon icon="money-cny-circle-fill" />
    </div>
    <mc-icon class="mc-donate-cup" icon="wallet-2-fill" />
    <el-tabs v-model="state.activeName">
      <el-tab-pane label="打赏作者" name="first">
        <mc-flipper direction="row" trigger="click">
          <template #cz>
            <el-image :src="state.weixinpayUrl" style="width: 200px" />
          </template>
          <template #cf>
            <el-image :src="state.alipayUrl" style="width: 200px" />
          </template>
        </mc-flipper>
        <p>点击切换支付方式</p>
      </el-tab-pane>
      <el-tab-pane label="加好友" name="two">
        <el-image :src="state.weixinUrl" style="width: 200px" />
        <p>扫描二维码添加好友,记得备注来意</p>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<style lang="scss" scoped>
.mc-donate {
  position: relative;

  &-icon {
    position: absolute;
    top: -50px;
    left: 50%;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background: linear-gradient(50deg,
        var(--el-color-primary),
        var(--el-color-primary-light-7));
    border-radius: 50%;
    transform: translateX(-50%);

    i {
      font-size: 50px;
      color: #fff;
    }
  }

  &-cup {
    position: absolute;
    right: 20px;
    bottom: 70px;
    font-size: 80px;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(var(--el-color-primary-light-7),
        var(--el-color-primary-light-9));
    background-clip: text;
  }
}
</style>

<style lang="scss">
.mc-donate {
  &.el-dialog {
    margin-top: 30vh !important;
    border-radius: 15px;

    .el-dialog__body {
      margin: 0 40px 0 40px;
    }

    .el-dialog__footer {
      text-align: center !important;

      .el-button {
        width: 200px;
        margin-bottom: 20px;
        background: linear-gradient(50deg,
            var(--el-color-primary-light-3),
            var(--el-color-primary));
        border: 0;
        border-radius: 20px;
      }
    }
  }
}
</style>

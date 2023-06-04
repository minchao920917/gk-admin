<script lang="ts" setup>
  import { useSettingsStore } from '@/store/modules/settings'
  import { translateTitle } from '@/utils/i18n'
  import { getList } from '@/api/notice'

  const $baseMessage: any = inject('$baseMessage')

  const settingsStore = useSettingsStore()
  const { theme } = storeToRefs(settingsStore)

  const activeName = ref('notice')
  const notices: any = ref([])
  const messages: any = ref([])
  const list: any = ref([])
  const badge = ref(undefined)

  const fetchData = async () => {
    const {
      data: { notices, messages, list },
    } = await getList()
    notices.value = notices
    messages.value = messages
    list.value = list
    const total = notices.length + messages.length + list.length
    badge.value = total === 0 ? undefined : total
  }

  nextTick(() => {
    if (theme.value.showNotice) fetchData()
  })

  const handleClick = () => {
    fetchData()
  }

  const handleClearNotice = () => {
    badge.value = undefined
    notices.value = []
    $baseMessage('清空消息成功', 'success', 'mc-hey-message-success')
  }
</script>

<template>
  <el-badge v-if="theme.showNotice" type="danger" :value="badge">
    <el-popover placement="bottom" trigger="hover" :width="300">
      <template #reference>
        <mc-icon icon="notification-line" />
      </template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="translateTitle('通知')" name="notice">
          <div class="notice-list">
            <el-scrollbar>
              <ul>
                <li v-for="(item, index) in notices" :key="index">
                  <el-avatar :size="45" :src="item.image" />
                  <span v-html="item.notice" />
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="translateTitle('消息')" name="email">
          <div class="notice-list">
            <el-scrollbar>
              <ul>
                <li v-for="(item, index) in messages" :key="index">
                  <el-avatar :size="45" :src="item.image" />
                  <span>{{ item.email }}</span>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="translateTitle('代办')" name="doList">
          <div class="notice-list">
            <el-scrollbar>
              <ul>
                <li v-for="(item, index) in list" :key="index">
                  <el-avatar :size="45" :src="item.image" />
                  <span>{{ item.email }}</span>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="notice-clear" @click="handleClearNotice">
        <el-button text type="primary">
          <mc-icon icon="close-circle-line" />
          <span>{{ translateTitle('清空消息') }}</span>
        </el-button>
      </div>
    </el-popover>
  </el-badge>
</template>

<style lang="scss" scoped>
  :deep() {
    .el-tabs__active-bar {
      min-width: 28px;
    }
  }

  .notice-list {
    height: 29vh;

    ul {
      padding: 0 15px 0 0;
      margin: 0;

      li {
        display: flex;
        align-items: center;
        padding: 10px 0 10px 0;

        :deep() {
          .el-avatar {
            flex-shrink: 0;
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }

        span {
          margin-left: 10px;
        }
      }
    }
  }

  .notice-clear {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0 0 0;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    border-top: 1px solid #e8eaec;

    i {
      margin-right: 3px;
    }
  }
</style>

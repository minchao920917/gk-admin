<!--
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-06-06 09:30:38
 * @LastEditors: Do not edit
 * @Description: 
-->
<script lang="ts" setup>

// import i18n from '@/locales'
// const locale = toRef(i18n.global, 'locale')
// const messages = toRef(i18n.global, 'messages')
</script>

<template>
    <el-config-provider :button="{
        autoInsertSpace: true,
    }">
        <!-- :locale="messages[locale]" -->
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </el-config-provider>
</template>

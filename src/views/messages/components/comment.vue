<!--消息模块-->
<script lang="ts" setup>
defineProps({
  comments: {
    type: Array as any,
    required: true
  }
});

const inputComment = ref("");
const showItemId = ref("");
/**
 * 点击取消按钮
 */
const cancel = () => {
  showItemId.value = "";
};

/**
 * 提交评论
 */
const commitComment = () => {
  console.log(inputComment);
};

/**
 * 点击评论按钮显示输入框
 * item: 当前大评论
 * reply: 当前回复的评论
 */
const showCommentInput = (item: any, reply: any) => {
  if (reply) {
    inputComment.value = "@" + reply.fromName + " ";
  } else {
    inputComment.value = "";
  }
  showItemId.value = item.id;
};
</script>
<template>
  <div class="container" style="text-align: left">
    <div class="comment" v-for="(item, index) in comments" :key="index">
      <div class="info">
        <img class="avatar" :src="item.fromAvatar" width="36" height="36" />
        <div class="right">
          <div class="name">{{ item.fromName }}</div>
          <div class="date">{{ item.date }}</div>
        </div>
      </div>
      <div class="content">{{ item.content }}</div>
      <div class="control">
        <!-- <span class="like" :class="{active: item.isLike}" @click="likeClick(item)">
          <i class="iconfont icon-like"></i>
          <span class="like-num">{{item.likeNum > 0 ? item.likeNum + '人赞' : '赞'}}</span>
        </span> -->
        <span class="comment-reply" @click="showCommentInput(item, null)">
          <i class="iconfont icon-comment"></i>
          <span>回复</span>
        </span>
      </div>
      <div class="reply">
        <div class="item" v-for="(reply, index) in item.reply" :key="index">
          <div class="reply-content">
            <span class="from-name">{{ reply.fromName }} </span><span>: </span>
            <span class="to-name">@{{ reply.toName }}</span>
            <span>{{ reply.content }}</span>
          </div>
          <div class="reply-bottom">
            <span>{{ reply.date }}</span>
            <span class="reply-text" @click="showCommentInput(item, reply)">
              <i class="iconfont icon-comment"></i>
              <span>回复</span>
            </span>
          </div>
        </div>
        <div class="write-reply" v-if="item.reply.length > 0" @click="showCommentInput(item, null)">
          <i class="el-icon-edit"></i>
          <span class="add-comment">添加新评论</span>
        </div>
        <transition name="fade">
          <div class="input-wrapper" v-if="showItemId === item.id">
            <el-input class="gray-bg-input" v-model="inputComment" type="textarea" :rows="3" autofocus placeholder="写下你的评论">
            </el-input>
            <div class="btn-control">
              <span class="cancel" @click="cancel">取消</span>
              <el-button class="btn" type="success" round @click="commitComment">确定</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$color-main: #409eff;
$color-success: #67c23a;
$color-warning: #e6a23c;
$color-danger: #f56c6c;
$color-info: #909399;
$text-main: #303133;
$text-normal: #606266;
$text-minor: #909399;
$text-placeholder: #c0c4cc;
$text-333: #333333;
$border-first: #dcdfe6;
$border-second: #e4e7ed;
$border-third: #ebeef5;
$border-fourth: #f2f6fc;
$content-bg-color: #ffffff;
.container {
  box-sizing: border-box;
  padding: 0 10px;
  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid $border-fourth;
    .info {
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 50%;
      }
      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .name {
          margin-bottom: 5px;
          font-size: 16px;
          font-weight: 500;
          color: $text-main;
        }
        .date {
          font-size: 12px;
          color: $text-minor;
        }
      }
    }
    .content {
      padding: 10px 0;
      font-size: 16px;
      line-height: 20px;
      color: $text-main;
    }
    .control {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $text-minor;
      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        &.active,
        &:hover {
          color: $color-main;
        }
        .iconfont {
          margin-right: 5px;
          font-size: 14px;
        }
      }
      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: $text-333;
        }
        .iconfont {
          margin-right: 5px;
          font-size: 16px;
        }
      }
    }
    .reply {
      margin: 10px 0;
      border-left: 2px solid $border-first;
      .item {
        padding: 10px 0;
        margin: 0 10px;
        border-bottom: 1px dashed $border-third;
        .reply-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $text-main;
          .from-name {
            color: $color-main;
          }
          .to-name {
            margin-right: 5px;
            margin-left: 5px;
            color: $color-main;
          }
        }
        .reply-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
          font-size: 12px;
          color: $text-minor;
          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;
            &:hover {
              color: $text-333;
            }
            .icon-comment {
              margin-right: 5px;
            }
          }
        }
      }
      .write-reply {
        display: flex;
        align-items: center;
        padding: 10px;
        font-size: 14px;
        color: $text-minor;
        cursor: pointer;
        &:hover {
          color: $text-main;
        }
        .el-icon-edit {
          margin-right: 5px;
        }
      }
      .fade-enter-active,
      fade-leave-active {
        transition: opacity 0.5s;
      }
      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }
      .input-wrapper {
        padding: 10px;
        .gray-bg-input,
        .el-input__inner {
          background-color: #67c23a;
        }
        .btn-control {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-top: 10px;
          .cancel {
            margin-right: 20px;
            font-size: 16px;
            color: $text-normal;
            cursor: pointer;
            &:hover {
              color: $text-333;
            }
          }
          .confirm {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>

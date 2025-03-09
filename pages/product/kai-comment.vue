<template>
  <view class="comment-list">
    <scroll-view scroll-y class="comment-scroll" :style="{ height: scrollViewHeight }">
      <view v-for="comment in comments" :key="comment.id" class="comment-item">
        <view class="user-info">
          <image :src="comment.avatar" class="avatar"></image>
          <view class="user-details">
            <text class="username">{{ comment.username }}</text>
            <text class="time">{{ comment.time }}</text>
          </view>
        </view>
        <view class="comment-content">{{ comment.content }}</view>
        <view class="comment-actions">
          <view class="action" @tap="likeComment(comment)">
            <text class="iconfont icon-like" :class="{ 'liked': comment.isLiked }"></text>
            <text class="count">{{ comment.likes }}</text>
          </view>
          <view class="action" @tap="replyComment(comment)">
            <text class="iconfont icon-comment"></text>
            <text class="count">回复</text>
          </view>
        </view>
        
        <view v-if="comment.replies && comment.replies.length" class="reply-list">
          <view v-for="reply in comment.replies" :key="reply.id" class="reply-item">
            <view class="user-info">
              <image :src="reply.avatar" class="avatar"></image>
              <view class="user-details">
                <text class="username">{{ reply.username }}</text>
                <text class="time">{{ reply.time }}</text>
              </view>
            </view>
            <view class="reply-content">
              <text class="reply-to">回复 @{{ reply.replyTo }}：</text>
              {{ reply.content }}
            </view>
            <view class="reply-actions">
              <view class="action" @tap="likeReply(reply)">
                <text class="iconfont icon-like" :class="{ 'liked': reply.isLiked }"></text>
                <text class="count">{{ reply.likes }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="reply-input-container" :style="{ bottom: keyboardHeight + 'px' }">
      <input
        class="reply-input"
        v-model="replyContent"
        :placeholder="replyPlaceholder"
        @focus="onInputFocus"
        @blur="onInputBlur"
        :adjust-position="false"
        cursor-spacing="10"
      />
      <button class="send-button" @tap="sendReply" :disabled="!replyContent.trim()">发送</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      comments: [
        {
          id: 1,
          username: '抖音达人',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
          content: '这个视频太有意思了，我笑得停不下来！😂',
          likes: 1234,
          isLiked: false,
          time: '2小时前',
          replies: [
            {
              id: 101,
              username: '评论小能手',
              avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
              content: '我也是，这个创意太棒了',
              likes: 56,
              isLiked: false,
              time: '1小时前',
              replyTo: '抖音达人'
            },
            {
              id: 102,
              username: '路过的网友',
              avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
              content: '确实很有趣，希望能看到更多这样的内容',
              likes: 23,
              isLiked: false,
              time: '30分钟前',
              replyTo: '抖音达人'
            }
          ]
        },
        {
          id: 2,
          username: '创意君',
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
          content: '这个视频的创意真不错，值得学习！👍',
          likes: 876,
          isLiked: true,
          time: '3小时前',
          replies: []
        },
        {
          id: 3,
          username: '音乐爱好者',
          avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
          content: '背景音乐很带感，有人知道这首歌叫什么名字吗？🎵',
          likes: 543,
          isLiked: false,
          time: '4小时前',
          replies: [
            {
              id: 301,
              username: '音乐达人',
              avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
              content: '这首歌叫《Dynamite》，是BTS的歌哦',
              likes: 89,
              isLiked: true,
              time: '2小时前',
              replyTo: '音乐爱好者'
            }
          ]
        }
      ],
      replyContent: '',
      replyPlaceholder: '说点什么...',
      currentReplyTo: null,
      isReplyInputFocused: false,
      keyboardHeight: 0,
      scrollViewHeight: '100vh'
    }
  },
  methods: {
    likeComment(comment) {
      comment.isLiked = !comment.isLiked;
      comment.likes += comment.isLiked ? 1 : -1;
    },
    replyComment(comment) {
      this.currentReplyTo = comment;
      this.replyPlaceholder = `回复 @${comment.username}：`;
      this.focusReplyInput();
    },
    likeReply(reply) {
      reply.isLiked = !reply.isLiked;
      reply.likes += reply.isLiked ? 1 : -1;
    },
    focusReplyInput() {
      this.$nextTick(() => {
        const inputElement = uni.createSelectorQuery().select('.reply-input');
        inputElement.boundingClientRect(rect => {
          uni.pageScrollTo({
            scrollTop: rect.top,
            duration: 300
          });
        }).exec();
      });
    },
    sendReply() {
      if (!this.replyContent.trim()) return;

      const newReply = {
        id: Date.now(),
        username: '当前用户',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        content: this.replyContent,
        likes: 0,
        isLiked: false,
        time: '刚刚',
        replyTo: this.currentReplyTo ? this.currentReplyTo.username : null
      };

      if (this.currentReplyTo) {
        if (!this.currentReplyTo.replies) {
          this.currentReplyTo.replies = [];
        }
        this.currentReplyTo.replies.push(newReply);
      } else {
        this.comments.unshift({
          ...newReply,
          replies: []
        });
      }

      this.replyContent = '';
      this.replyPlaceholder = '说点什么...';
      this.currentReplyTo = null;
    },
    onInputFocus(e) {
      this.isReplyInputFocused = true;
      this.keyboardHeight = e.detail.height || 0;
      this.adjustScrollViewHeight();
    },
    onInputBlur() {
      this.isReplyInputFocused = false;
      this.keyboardHeight = 0;
      this.adjustScrollViewHeight();
    },
    adjustScrollViewHeight() {
      const query = uni.createSelectorQuery().in(this);
      query.select('.reply-input-container').boundingClientRect(data => {
        const inputHeight = data.height;
        const windowHeight = uni.getSystemInfoSync().windowHeight;
        this.scrollViewHeight = `${windowHeight - inputHeight - this.keyboardHeight}px`;
      }).exec();
    }
  },
  mounted() {
    this.adjustScrollViewHeight();
  }
}
</script>

<style scoped>
.comment-list {
  display: flex;
  flex-direction: column;
  height: 100vh;
  
  
}

.comment-scroll {
  flex: 1;
  background-color: #f8f8f8;
}

.comment-item {
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin: 30rpx;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
  font-size: 14px;
  color: #333;
}

.time {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}

.comment-content, .reply-content {
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.4;
}

.comment-actions, .reply-actions {
  display: flex;
  justify-content: flex-end;
}

.action {
  display: flex;
  align-items: center;
  margin-left: 15px;
}

.iconfont {
  font-size: 16px;
  color: #999;
}

.icon-like.liked {
  color: #ff2c55;
}

.count {
  font-size: 12px;
  color: #999;
  margin-left: 4px;
}

.reply-list {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.reply-item {
  margin-bottom: 15px;
}

.reply-to {
  color: #576b95;
  font-weight: bold;
}

.reply-input-container {
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #f8f8f8;
  border-top: 1px solid #e0e0e0;
}

.reply-input {
  flex: 1;
  height: 36px;
  background-color: #fff;
  border-radius: 18px;
  padding: 0 15px;
  font-size: 14px;
}

.send-button {
  margin-left: 10px;
  background-color: #ff2c55;
  color: #fff;
  border: none;
  border-radius: 18px;
  padding: 0 15px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
}

.send-button:disabled {
  background-color: #ffa5b5;
}
</style>
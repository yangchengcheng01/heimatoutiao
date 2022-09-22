<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
           round
           fit="cover"
            class="avatar"
            :src="userInfo.photo"
/>
<span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
          <div class="data-item">
            <span class="cont">{{ userInfo.art_count}}</span>
            <span class="text">头条</span>
          </div>
           <div class="data-item">
            <span class="cont">{{userInfo.follow_count }}</span>
            <span class="text">关注</span>
          </div> <div class="data-item">
            <span class="cont">{{ userInfo.fans_count }}</span>
            <span class="text">粉丝</span>
          </div> <div class="data-item">
            <span class="cont">{{ userInfo.like_count }}</span>
            <span class="text">获赞</span>
          </div>
      </div>
    </div>
<!-- 未登录 -->
     <div  v-else class="header not-login" @click="$router.push('/login')">
      <div class="login-btn">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
<!-- 导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
         <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
       
</van-grid>

<!-- 消息通知 -->
 <van-cell title="消息通知" is-link />
  <van-cell title="小智同学" is-link class="mb-9" />
  <van-cell v-if="user" clickable title="退出登录" class="lgout-cell" 
  @click="onLogout"
  />

  </div>
</template>

<script>
import {getUserInfo} from '@/api/user'
import {mapState} from 'vuex'
export default {
  name: 'MyIndex',

  data() {
    return {
      userInfo: {
      
      }
    };
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    if(this.user) {
      this.loadUserInfo()
    }
},
  mounted() {
    
  },

  methods: {
    onLogout() {
            this.$dialog.confirm({
        title: '确认退出吗',
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserInfo() {
      try{
        const { data } = await getUserInfo() 
        this.userInfo = data.data
        } catch(err) {
          this.$toast('获取数据失败，请稍后重试')
      }
      
    }
  },
};
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
    }
  }
  .user-info {
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 231px;
     
      padding: 76px 32px 23px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .name {
          font-size: 30px;
          color: #fff;
        }
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 130px;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
            font-size: 36px;
        }
        .text {
            font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
        .toutiao-lishi {
          color: #ff9d19;
        }

      span.text {
        font-size: 28px;
      }
    }
  }
  .lgout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-9 {
    margin-bottom: 9px;
  }
}

</style>
<template>
  <div class="home-container">
     <van-nav-bar class="page-nav-bar" fixed="">
     <van-button 
     class="search-btn"
     slot="title"
     type="info"
     size="small"
     round
     icon="search"
     to="/search"
     >搜索</van-button> />
    </van-nav-bar>
    <!-- 导航栏 -->
<van-tabs class="channel-tabs" v-model="active" animated swipeable>
        <van-tab 
        v-for="obj in channels" :key="obj.id"
        :title="obj.name">
        <!-- 文章列表 -->
      <article-list :obj="obj" />
        </van-tab>
       
        <div slot="nav-right" class="placeholder"></div>
       <div slot="nav-right" 
       @click="ischannelEditshow = true"
       class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
       </div>
</van-tabs>
<!-- 频道列表 -->

<!-- 频道编辑弹出层 -->
<van-popup
  v-model="ischannelEditshow"
   close-icon-position="top-left"
  closeable
  position="bottom"
  :style="{ height: '100%' }"
>
<channel-edit :myChannels="channels" :active="active" 
@update-active="onUpdateActive"/>
</van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import {mapState} from 'vuex'
import {getItem} from '@/utils/storage'
export default {
  name: 'HomeIndex',

  data() {
    return {
       active: 0,
       channels: [],
       ischannelEditshow: false
    };
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.loadChannels()
  },

  mounted() {
    
  },
  components :{
    ArticleList,
    ChannelEdit
  },

  methods: {
    //获取频道列表
    async loadChannels() {
       
    try {
     let channels = []
      if(this.user) {
        //已登录
        const { data } = await getUserChannels()
        channels = data.data.channels
      }else {
        //未登录
        const loadChannels = getItem('TOUTIAO_CHANNELS')
        if(loadChannels) {
          channels = loadChannels
        }else {
          const { data } = await getUserChannels()
        channels = data.data.channels
        }

      }
      // const { data } = await getUserChannels()
      this.channels = channels
      // console.log(data)
    }catch(err) {
      this.$toast('获取频道数据失败')
      console.log(err)
    }
    },
    onUpdateActive(index, ischannelEditshow = true) {
      // console.log(index)
      this.active = index
      this.ischannelEditshow = ischannelEditshow
    }
  },
};
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 87px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
    .search-btn {
width: 555px;
height: 64px;
background-color: #5babfb;
border: none;
font-size: 28px;
.van-icon {
  font-size: 32px;
}
}

 /deep/ .channel-tabs {
  .van-tab_wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  .van-tab {
    min-width: 200px;
    font-size: 30px;
    color: #777777;
    border-right: 1px solid #edeff3;
  }
  
  .van-tab-active {
    color: #333333;
  }
  .van-tabs__nav {
    padding-bottom: 0;
  }
  .van-tabs__line {
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
    bottom: 8px;

  }
  .placeholder {
    width: 66px;
    height: 82px;
    flex-shrink: 0;
  }

  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url('~@/assets/gradient-gray-line.png');
      background-size: contain;
    }
  }
}
}


</style>
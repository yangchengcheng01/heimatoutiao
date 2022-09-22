<template>
  <div class="article-list">
    <van-pull-refresh 
    success-duration="1500"
    v-model="isreFreshLoading" @refresh="onRefresh"  :success-text="refreshSuccessText">
 

   <van-list
        v-model="loading"
         :error.sync="error"
          error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <article-item 
      v-for="(article, index) in list" :key="index" 
      :article="article"
      />
        <!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.title" /> -->
</van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
components: {
  ArticleItem
},
  data() {
    return {
      list: [],
       error: false,
      loading: false,
      finished: false,
      timestamp: null,
      isreFreshLoading: false,
      refreshSuccessText:'刷新成功'
    };
  },

  mounted() {
    
  },

  methods: {
      async onLoad() {
        try{
          const { data } = await getArticles({
            channel_id: this.obj.id,
            timestamp: this.timestamp || Date.now()
            
          })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if(results.length){
            this.timestamp = data.data.pre_timestamp
        }else {
          this.finished = true
        }

        }catch(err) {
          this.error = true
          this.loading = false
        }
      
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 加载状态结
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
     },
    //  下拉刷新调用的函数
   async  onRefresh() {
    try {
       const { data } = await getArticles({
            channel_id: this.obj.id,
            timestamp: Date.now()
             }) 
             const {results} = data.data
             this.list.unshift(...results)
             this.isreFreshLoading = false
             this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
    }catch(err) {
      this.isreFreshLoading = false
        this.refreshSuccessText = '刷新失败'
    }
      

      
     },
     
    
  },
};
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;

}

</style>
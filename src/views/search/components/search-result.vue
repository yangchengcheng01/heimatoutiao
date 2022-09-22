<template>
  <div class="search-result">
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="(obj, index) in list" 
  :key="index" 
  :title="obj.title" />
</van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
     searchText: {
      type: String,
      required: true
    }
  },

  data() {
    return {
       list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    };
  },

  mounted() {
    
  },

  methods: {
    async onLoad() {
      try {
        const { data } =await getSearchResult({
            page: this.page,
            per_page: this.perPage,
            q: this.searchText
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if(results.length){
          this.page++
        }else{
          this.finished = true
        }
        // console.log(data)
      } catch (error) {
        this.$toast('数据获取失败')
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
    
  },
};
</script>

<style lang="less" scoped>

</style>
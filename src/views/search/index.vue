<template>
  <div class="search-container">
    <!-- 搜索-->
    <form class="search-form" action="/">
  <van-search
    v-model="searchText"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
    background="#3296fa"
    @focus="isResultShow = false"
  />
</form>
 <!-- 搜索栏-->

  <!-- 搜索结果-->
<search-result v-if="isResultShow"
:search-text="searchText"
/>


 <!-- 联想建议-->
<search-suggest v-else-if="searchText"
  :search-text="searchText"
  @search="onSearch"
/>


  <!-- 搜索历史记录-->
<search-history v-else
@clear-search-histories="searchHistorys = []"
:searchHistorys="searchHistorys"
@search="onSearch"
/>
   


   


   

  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggest from './components/search-suggest.vue'
import SearchResult from './components/search-result.vue'
import { setItem,getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',

  data() {
    return {
       searchText: '',
       isResultShow: false,
       searchHistorys: getItem('TOUTIAO_SEARCH_HISTORES') || []
    };
  },

  watch: {
    searchHistorys (value) {
      setItem('TOUTIAO_SEARCH_HISTORES', value)

    }
    // searchHistorys: {
    //   handler () {

    //   }
    // }
    
  },
  components: {
      SearchHistory,
      SearchSuggest,
      SearchResult
  },

  methods: {
     onSearch(val) {
      //更新文本框内容
      // console.log(val);
      this.searchText = val

      //存储搜索记录
      //要求：不要有重复历史记录，最新的排在最前面
      const index = this.searchHistorys.indexOf(val)
      if(index !== -1) {
        this.searchHistorys.splice(index,1)
      }
      this.searchHistorys.unshift(val)

      //渲染搜索结果
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    },
    
  },
};
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}

</style>
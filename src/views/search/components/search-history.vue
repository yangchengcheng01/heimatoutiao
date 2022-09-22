<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      
      <div v-if="isDeleteShow">
      <span @click="$emit('clear-search-histories')">全部删除</span>
      &nbsp;&nbsp;
      <span @click="isDeleteShow = false">完成</span>
      </div>
     
      <van-icon
      @click="isDeleteShow = true"
       v-else name="delete"></van-icon>
    </van-cell>
    <van-cell
     :title="item" v-for="(item,index) in searchHistorys"
    :key="index"
    @click="onSearchItemClick(item,index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
   
   
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistorys:{
      type:Array,
      required: true
    }
  },

  data() {
    return {
      isDeleteShow: false
    };
  },

  mounted() {
    
  },

  methods: {
    onSearchItemClick(item, index) {
      if(this.isDeleteShow) {
        //删除状态
        this.searchHistorys.splice(index,1)

      }else {
        //进入搜索详情
        this.$emit('search', item)
      }
    }    
  },
};
</script>

<style lang="less" scoped>

</style>
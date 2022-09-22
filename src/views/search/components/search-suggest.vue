<template>
  <div class="search-Suggest">
    <van-cell 
    v-for="(text, index) in suggeations" 
    :key="index"
   @click="$emit('search', text)"
    icon="search">
    <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
   
    </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from "lodash"
export default {
  name: 'SearchSuggest',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      suggeations: [],
      htmlStr: 'Hello <span style="color: red">World</span>'
    };
  },

  mounted() {
    
  },
  watch: {
searchText: {
      handler: debounce(function (value){
        // console.log(value)
        this.loadSarchSuggestions(value)
      },1000),
      immediate: true
    }

  },

  methods: {
   async loadSarchSuggestions(q) {
    try {
      const { data } = await getSearchSuggestions(q)
      // console.log(data)
      this.suggeations = data.data.options

    }catch(err) {
      this.$toast('获取失败')
    }

    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
    
  },
};
</script>

<style lang="less" scoped>
.search-Suggest {
 /deep/ span.active {
    color: #3296fa;
  }
}

</style>
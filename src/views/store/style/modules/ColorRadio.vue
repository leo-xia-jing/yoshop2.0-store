<template>
  <a-spin :spinning="isLoading">
    <a-select v-model="selectedId" @change="onChange">
      <a-select-option :value="-1">全部</a-select-option>
      <a-select-option
        v-for="(item, index) in categoryList"
        :key="index"
        :value="item.category_id"
      >{{ item.name }}</a-select-option>
    </a-select>
  </a-spin>
</template>

<script>
import PropTypes from 'ant-design-vue/es/_util/vue-types'
import * as CategoryApi from '@/api/content/article/category'

// 文章分类选择器组件
export default {
  name: 'SArticleCate',
  components: {
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: PropTypes.integer.def(-1)
  },
  data () {
    return {
      // 正在加载
      isLoading: false,
      // 分类列表
      categoryList: [],
      // 选择的分类ID
      selectedId: -1
    }
  },
  watch: {
    value: {
      // 首次加载的时候执行函数
      immediate: true,
      handler (val) {
        this.selectedId = val
      }
    }
  },
  created () {
    // 获取分类列表
    this.getCategoryList()
  },
  methods: {

    // 获取分类列表
    getCategoryList () {
      this.isLoading = true
      CategoryApi.list()
        .then(result => {
          this.categoryList = result.data.list
        })
        .finally(() => this.isLoading = false)
    },

    // 触发change事件
    onChange (value) {
      this.$emit('change', value)
    }

  }
}
</script>

<style lang="less" scoped>
.ant-select {
  width: 220px;
}
</style>

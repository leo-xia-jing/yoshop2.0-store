<template>
  <a-card :bordered="false">
    <div class="card-title">{{ $route.meta.title }}</div>
    <a-spin :spinning="isLoading">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item class="mt-30" label="是否开启访问" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-radio-group v-decorator="['enabled', { rules: [{ required: true }] }]">
            <a-radio :value="true">开启</a-radio>
            <a-radio :value="false">关闭</a-radio>
          </a-radio-group>
          <div class="form-item-help">
            <small>注：如关闭，用户则无法通过H5端访问商城</small>
          </div>
        </a-form-item>
        <a-form-item label="H5站点地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['baseUrl', { rules: [{ required: true, message: '请输入H5站点地址' }] }]"
          />
          <div class="form-item-help">
            <p class="extra">
              <span>请填写H5端实际的访问地址，以</span>
              <a-tag class="mlr-5">https://</a-tag>开头； 斜杠
              <a-tag class="mlr-5">/</a-tag>
              <span>结尾</span>
            </p>
            <p class="extra">
              <span>例如：https://www.你的域名.com/</span>
              <span class="ml-8">https://shop10001.你的域名.com/</span>
            </p>
          </div>
        </a-form-item>
        <a-form-item :wrapperCol="{ span: wrapperCol.span, offset: labelCol.span }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-card>
</template>

<script>
import pick from 'lodash.pick'
import { isEmpty } from '@/utils/util'
import * as Api from '@/api/client/h5/setting'

export default {
  data () {
    return {
      // 标签布局属性
      labelCol: { span: 4 },
      // 输入框布局属性
      wrapperCol: { span: 10 },
      // loading状态
      isLoading: false,
      // 当前表单元素
      form: this.$form.createForm(this),
      // 当前设置项key
      key: 'basic',
      // 当前记录详情
      record: {}
    }
  },
  // 初始化数据
  created () {
    // 获取当前详情记录
    this.getDetail()
  },
  methods: {

    // 获取当前详情记录
    getDetail () {
      this.isLoading = true
      Api.detail(this.key)
        .then(result => {
          // 当前记录
          this.record = result.data.detail
          // 设置默认值
          this.setFieldsValue()
        })
        .finally(() => this.isLoading = false)
    },

    // 设置默认值
    setFieldsValue () {
      const { record, $nextTick, form } = this
      !isEmpty(form.getFieldsValue()) && $nextTick(() => {
        form.setFieldsValue(pick(record, ['enabled', 'baseUrl']))
      })
    },

    // 确认按钮
    handleSubmit (e) {
      e.preventDefault()
      // 表单验证
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        // 提交到后端api
        !errors && this.onFormSubmit(values)
      })
    },

    // 提交到后端api
    onFormSubmit (values) {
      this.isLoading = true
      Api.update(this.key, { form: values })
        .then(result => this.$message.success(result.message, 1.5))
        .finally(() => this.isLoading = false)
    }

  }
}
</script>
<style lang="less" scoped>
.ant-form-item {
  margin-bottom: 24px;
}
/deep/.ant-form-item-control {
  padding-left: 10px;

  .ant-form-item-control {
    padding-left: 0;
  }
}
.ant-divider {
  margin-top: 60px !important;
}
</style>

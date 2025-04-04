<template>
  <a-modal
    :title="title"
    :width="720"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="物流公司名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['express_name', { rules: [{ required: true, min: 2, message: '请输入至少2个字符' }] }]"
          />
        </a-form-item>
        <a-form-item label="公司编码（快递100）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['kuaidi100_code', { rules: [{ required: true, min: 2, message: '请输入至少2个字符' }] }]"
            placeholder="用于快递100查询物流信息API"
          />
          <p class="form-item-help">
            <small>
              <span>请参照</span>
              <a href="https://api.kuaidi100.com/manager/page/document/kdbm" target="_blank">物流公司编码表</a>
            </small>
          </p>
        </a-form-item>
        <a-form-item label="公司编码（快递鸟）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['kdniao_code', { rules: [{ required: true, min: 2, message: '请输入至少2个字符' }] }]"
            placeholder="用于快递鸟打印电子面单API"
          />
          <p class="form-item-help">
            <small>
              <span>请参照</span>
              <a href="http://www.kdniao.com/documents" target="_blank">快递鸟接口支持快递公司编码.xlsx</a>
            </small>
          </p>
        </a-form-item>
        <a-form-item label="排序" :labelCol="labelCol" :wrapperCol="wrapperCol" extra="数字越小越靠前">
          <a-input-number
            :min="0"
            v-decorator="['sort', { initialValue: 100, rules: [{ required: true, message: '请输入排序值' }] }]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import * as Api from '@/api/setting/express'

export default {
  data () {
    return {
      // 对话框标题
      title: '新增物流公司',
      // 标签布局属性
      labelCol: { span: 7 },
      // 输入框布局属性
      wrapperCol: { span: 13 },
      // modal(对话框)是否可见
      visible: false,
      // modal(对话框)确定按钮 loading
      confirmLoading: false,
      // 当前表单元素
      form: this.$form.createForm(this)
    }
  },
  methods: {

    // 显示对话框
    add () {
      // 显示窗口
      this.visible = true
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

    // 关闭对话框事件
    handleCancel () {
      this.visible = false
      this.form.resetFields()
    },

    // 提交到后端api
    onFormSubmit (values) {
      this.confirmLoading = true
      Api.add({ form: values })
        .then(result => {
          // 显示成功
          this.$message.success(result.message, 1.5)
          // 关闭对话框事件
          this.handleCancel()
          // 通知父端组件提交完成了
          this.$emit('handleSubmit', values)
        })
        .finally(() => this.confirmLoading = false)
    }

  }
}
</script>

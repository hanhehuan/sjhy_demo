
<template>
  <div class="login_container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!--登录表单-->
    <!--基于Vant的表单验证：
    1、使用van-form组件包裹所有表单项van-field
    2、给form绑定提交事件
    3、使用field的rules属性校验规则
    -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      @submit="onLogin"
      @failed="onFailed"
      validate-first
      ref="loginForm">
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        center
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        center
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            :time="1000*60"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            size="mini"
            round
            class="send-btn"
            @click.prevent="onSendSms"
            :loading="isSendSmsLoading">
            发送验证码
          </van-button>
        </template>
      </van-field>

      <div class="login-btn-wrap">
        <van-button
          type="info"
          block
          class="login-btn">
          登录
        </van-button>
      </div>
    </van-form>

    <!--/登录表单-->
  </div>
</template>

<script>
import { login,sendSms } from '../../api/user'

export default {
  name: 'LoginIndex',
  data  () {
    return {
      user: {
        mobile: '', //  手机号
        code: '' //  验证码
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow:false,
      isSendSmsLoading:false
    }
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时长，0代表不消失
      })
      try {
        const { data } = await login(this.user)
        console.log(res)
        this.$toast.success('登录成功！')
        this.$store.commit('setUser',data.data)
        this.$router.back()
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败，手机号或验证码错误！')
      }
    },
    onFailed(error){
      console.log('验证失败',error)
      if (error.errors[0]){
        this.$toast({
          message:error.errors[0].message,//提示消息
          position:'top'//防止手机键盘太高看不见提示
        })
      }
    },
    async onSendSms(){
      console.log('onSendSms')
      try {
       await this.$refs['loginForm'].validate('mobile');
       this.isSendSmsLoading = true;//  防止多次点击
       const  res = await sendSms(this.user.mobile);
       console.log(res);
       this.isCountDownShow = true;



      } catch (err) {
        console.log(err)
        let message = '';
        if (err && err.response && err.response.status === 429){
          message = '短信发送太频繁了，请稍后重试';
        } else if (err.name === 'mobile') {
          message = err.message;
        } else {
          message = '发送失败，请稍后重试';
        }
        this.$toast({
          message,//提示消息
          position:'top'//防止手机键盘太高看不见提示
        })
      }

      this.isSendSmsLoading = false;

    }
  }
}
</script>

<style scoped lang="less">
.login_container{
  .send-btn{
    width: 90px;
    height: 23px;
    background-color: #ededed;

    .van-button__text{
      font-size: 11px;
      color: #666666;
    }

  }
  .login-btn-wrap{
    padding: 26px 16px;

    .login-btn{
      background-color: #6db4fb;
      border: none;
      .van-button__text{
        font-size: 15px;
      }
    }
  }
}
</style>

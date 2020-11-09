<template>
  <div class="login_container">
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!--登录表单-->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        label="文本"
        left-icon="smile-o"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        clearable
        label="文本"
        left-icon="music-o"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button size="small" round>
            发送验证码
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
    <van-button type="info" block>登录</van-button>
    <!--/登录表单-->
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data  () {
    return {
      user: {
        mobile: '', //  手机号
        code: '' //  验证码
      }
    }
  }
}
</script>

<style scoped>

</style>

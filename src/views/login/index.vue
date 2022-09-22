
<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" 
      @click="$router.back()"
      />
    </van-nav-bar>
    <!-- 表单组件 -->
    <van-form ref="loginForm" @submit="onSubmit">
  <van-field
       v-model ="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
       v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
         type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down 
          v-if="isCountDownShow"
          :time="1000 * 60" 
          format="ss s"
          @finish="isCountDownShow=false"
          />
          <van-button 
          v-else
          class="send-sms-btn"
          @click="onSendSms"
          native-type="button"
           round size="small" type="default">发送验证码</van-button>
        </template>
      </van-field>
  <div class="login-btn-wrap">
    <van-button block type="info" native-type="submit">登录</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      isCountDownShow: false,
      user: {
        mobile:'',
        code:''
      },
      userFormRules: {
        mobile: [{ 
          required: true,
         message: '手机号不能为空',
          },{
            pattern: /1[3|5|7|8]\d{9}/,
            message: '手机号格式错误'
          }
          
          ],
        code: [{
           required: true, 
        message: '请填写用户名' 
        },
        {
          pattern: /\d{6}$/,
          message: '验证格式错误'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSendSms() {
      try {
       await this.$refs.loginForm.validate('mobile')
       console.log('验证通过')
      }catch (err){
    return console.log('验证失败', err)
      }
      this.isCountDownShow = true

      try{
     await sendSms(this.user.mobile)
       this.$toast('发送成功')
      } catch(err) {
         this.isCountDownShow = false
        if(err.response.status === 429){
          this.$toast('发送太频繁了')
        }else {
 console.log('发送失败', err)
        }
       
      }
      
    },
   async  onSubmit () {
      const user = this.user

      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
})

      try {
           
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        // console.log('登录成功', res)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        if(err.response.status === 400 ){
          console.log('手机号或者验证码错误')
          this.$toast.fail('手机号或验证码错误')
        } else {
           this.$toast.fail('登录失败')
        }
        
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 10px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}</style>


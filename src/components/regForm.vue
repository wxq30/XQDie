<template>
  <div class="regfo-form">
    <div class="g-form">
    <div class="g-form-line">
        <span class="g-form-label">电话号码：</span>
        <div class="g-form-input">
          <input type="text" 
          v-model="useriphonnameModel" placeholder="请输入电话号码">
        </div>
        <span class="g-form-error">{{ iphoneErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" 
          v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" 
          v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">确认密码：</span>
        <div class="g-form-input">
          <input type="password" 
          v-model="newpasswordModel" placeholder="请重新输入密码">
        </div>
        <span class="g-form-error">{{ newpasswordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="regform">注册</a>
          <a class="button" @click="logClick">登陆</a>
        </div>

      </div>
      <p>{{ errorText }}</p>
    </div>
    <my-dialog :is-show="isShowAboutDialog" 
   @on-close="closeDialog('isShowAboutDialog')">
     <p class="shipai">注册成功</p>
   </my-dialog>
   <my-dialog :is-show="isShowLogDialog" 
    @on-close="closeDialog('isShowLogDialog')">
     <log-form @has-log="onSuccessLog"></log-form>
   </my-dialog>
   <my-dialog :is-show="isShowRegDialog" 
    @on-close="closeDialog('isShowRegDialog')">
     <reg-form></reg-form>
   </my-dialog>
  </div>
</template>

<script>
import Dialog from './dialog'
import LogForm from './logForm'
export default {
components:{
    MyDialog:Dialog,
    LogForm,
  },
  data () {
    return {
      isShowAboutDialog:false,
      isShowLogDialog:false,
      isShowRegDialog:false,
      useriphonnameModel:'',
      usernameModel: '',
      passwordModel: '',
      newpasswordModel:'',
      errorText: ''
    }
  },
  computed: {
    iphoneErrors () {
      let errorText, status
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/g.test(this.useriphonnameModel)) {
        status = false
        errorText = '电话号码必须是11位'
      }
      else {
        status = true
        errorText = ''
      }
      if (!this.passwordFlag) {
        errorText = ''
        this.passwordFlag = true
      }
      return {
        status,
        errorText
      }
      },
    userErrors () {
      let errorText, status
      if (!/@/g.test(this.usernameModel)) {
        status = false
        errorText = '不包含@'
      }
      else {
        status = true
        errorText = ''
      }
      if (!this.userFlag) {
        errorText = ''
        this.userFlag = true
      }
      return {
        status,
        errorText
      }
    },
    passwordErrors () {
      let errorText, status
      if (!/^\w{1,6}$/g.test(this.passwordModel)) {
        status = false
        errorText = '密码不是1-6位'
      }
      else {
        status = true
        errorText = ''
      }
      if (!this.passwordFlag) {
        errorText = ''
        this.passwordFlag = true
      }
      return {
        status,
        errorText
      }
    },
     newpasswordErrors () {
      let errorText, status
      if ((this.passwordModel)!==(this.newpasswordModel)) {
        status = false
        errorText = '密码不一致'
      }
      else {
        status = true
        errorText = ''
      }
      if (!this.passwordFlag) {
        errorText = ''
        this.passwordFlag = true
      }
      return {
        status,
        errorText
      }
    }
  },
  methods: {
    regform () {
      if (!this.userErrors.status || 
      !this.passwordErrors.status||!this.iphoneErrors.status ||!this.newpasswordErrors.status) {
        this.errorText = '部分选项未通过'
      }
      else {
        this.errorText = ''
        this.$http.get('api/login')
        .then((res) => {
        console.log(res.data.userId)
          if(this.usernameModel===res.data.username && this.passwordModel===res.data.userId){
          this.$emit('has-log', res.data)
          }
          else{
            this.isShowAboutDialog=true
          }
        }, (error) => {
          console.log(error)
        })
      }
    },
    closeDialog(attr){
  this[attr]=false
  },
  logClick(){
   this.isShowLogDialog=true
  },
  onSuccessLog(data){
    this.closeDialog('isShowLogDialog')
    this.username=data.username

  },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shipai{
  background: red;
  color: #fff;
}
</style>
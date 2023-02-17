<template>
  <div class="login-main">
    <div class="title-all">
      <h3 class="title">{{ $t('common.login') }}</h3>
    </div>
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      status-icon
    >
      <el-form-item prop="account">
        <el-input
          v-model.trim="dataForm.account"
          clearable
          :placeholder="$t('common.accountLimitTips')"
        >
          <div class="input-pre-text" slot="prepend">{{ $t('common.account') }}</div>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model.trim="dataForm.password"
          type="password"
          clearable
          show-password
          :placeholder="$t('common.passwordLimitTips')"
        >
          <div class="input-pre-text" slot="prepend">{{ $t('common.password') }}</div>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="btn-wrap">
          <el-button
            class="btn"
            type="primary"
            :loading="loading"
            @click="dataFormSubmit()"
          >{{ $t('common.login') }}</el-button>
          <el-button
            class="btn"
            :loading="loading"
            @click="$router.push('/register')"
          >{{ $t('common.register') }}</el-button>
        </div>
      </el-form-item>
      <el-form-item class="rememb">
        <el-checkbox v-model="isRememb">{{ $t('login.rememb') }}</el-checkbox>
        <div class="forget-btn">
          <el-button type="text" @click="$router.push('/forget')">{{ $t('common.forget') }} >></el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { loginIn } from '@/api/account'
import { isUserName, isPassWord } from '@/utils/validate'
export default {
  data () {
    let validateAccount = (rule, value, callback) => {
      if (!isUserName(value)) {
        callback(new Error(this.$t('common.accountLimitTips')))
      } else {
        callback()
      }
    }
    let validatePassword = (rule, value, callback) => {
      if (!isPassWord(value)) {
        callback(new Error(this.$t('common.passwordLimitTips')))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      dataForm: {
        account: '',
        password: ''
      },
      isRememb: false,
      dataRule: {
        account: [
          { required: true, message: this.$t('common.ruleLimitTips'), trigger: 'blur' },
          { validator: validateAccount, trigger: 'blur', min: 8, max: 20 }
        ],
        password: [
          { required: true, message: this.$t('common.ruleLimitTips'), trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur', min: 8, max: 20 }
        ]
      }
    }
  },
  methods: {
    // 提交表单
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$cookie.set('token', 'token')
          this.$cookie.set('userId', 'userId')
          this.$cookie.set('account', this.dataForm.account)
          this.$router.replace({ name: 'home' })
          // const params = { ...this.dataForm }
          // this.loading = true
          // loginIn(params).then(({ data }) => {
          //   this.loading = false
          //   if (data && data.success === true) {
          //     let cookieDate = new Date(2038, 8, 8)
          //     if (this.isRememb) {
          //       this.$cookie.set('token', data.data.token, { expires: cookieDate })
          //       this.$cookie.set('userId', data.data.employeeId, { expires: cookieDate })
          //       this.$cookie.set('account', this.dataForm.account, { expires: cookieDate })
          //     }
          //     this.$router.replace({ name: 'home' })
          //   } else {
          //     this.$message.error(data.message)
          //   }
          // })
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
.login-main {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 30px 60px 20px;
  width: 500px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.3) !important;
  border-radius: 5px;
  input::-webkit-input-placeholder{
    color:#909399;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#909399;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#909399;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#909399;
  }
  .rememb{
    margin-top: -8px;
    margin-bottom: -5px;
    & .el-checkbox__input+.el-checkbox__label {
      color: #eee3e3;
      font-size: 12px;
    }
  }
  .forget-btn {
    float: right;
    span {
      color: rgb(244, 220, 1);
    }
    &:hover {
      transform: scale(1.2, 1.2);
    }
  }
  .title-all {
    color: rgb(244, 220, 1);
    .title {
      text-align: center;
      margin: 10px 0 20px;
      font-size: 26px;
      font-weight: 400;
      text-transform: uppercase;
    }
  }
  .btn-wrap {
    display: flex;
    justify-content: space-between;
    .btn {
      width: 45%;
      margin-top: 10px;
    }
  }
  .el-input-group__prepend {
    padding: 0 10px;
  }
  .input-pre-text {
    width: 60px;
    text-align: justify;
    text-align-last: justify;
  }
}
</style>

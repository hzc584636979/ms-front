<template>
  <div class="forget-main">
    <div class="title-all">
      <h3 class="title">{{ $t('common.retrievePassword') }}</h3>
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
          <div class="input-pre-text" slot="prepend">{{ $t('forget.newPassword') }}</div>
        </el-input>
      </el-form-item>
      <el-form-item prop="agePassword">
        <el-input
          v-model.trim="dataForm.agePassword"
          type="password"
          clearable
          show-password
          :placeholder="$t('common.passwordLimitTips')"
        >
          <div class="input-pre-text" slot="prepend">{{ $t('forget.confirmPassword') }}</div>
        </el-input>
      </el-form-item>
      <el-form-item prop="captchaKey">
        <el-input
          class="captcha-wrap"
          v-model="dataForm.captchaKey"
          readonly
        >
          <div class="input-pre-text" slot="prepend">{{ $t('forget.emailCode') }}</div>
          <div slot="append">
            <el-button
              :class="{ 'captcha-btn': !isDisable }"
              :loading="authLoading"
              :disabled="isDisable"
              @click="getCaptcha()"
            >
              {{ isDisable ? `${ captchaTime } s` : $t('forget.getCode') }}
            </el-button>
          </div>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="btn-wrap">
          <el-button
            class="btn"
            type="primary"
            :loading="loading"
            @click="dataFormSubmit()"
          >{{ $t('common.confirm') }}</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { getEmailCaptcha, forget } from '@/api/account'
import { isUserName, isPassWord } from '@/utils/validate'
export default {
  data () {
    let validateAccount = (rule, value, callback) => {
      if (!isUserName(value)) {
        callback(new Error(this.$t('common.passwordLimitTips')))
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
    let validateAgePassword = (rule, value, callback) => {
      if (value !== this.dataForm.password) {
        callback(new Error(this.$t('forget.confirmPasswordLimitTips')))
      } else {
        callback()
      }
    }
    let validateEmailCaptcha = (rule, value, callback) => {
      if (value !== this.captchaKey) {
        callback(new Error(this.$t('forget.emailCodeLimitTips')))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      authLoading: false,
      dataForm: {
        account: '',
        password: '',
        agePassword: '',
        captchaKey: ''
      },
      isDisable: false,
      captchaKey: '',
      captchaTime: 30,
      dataRule: {
        account: [
          { required: true, message: this.$t('common.ruleLimitTips'), trigger: 'blur' },
          { validator: validateAccount, trigger: 'blur', min: 8, max: 20 }
        ],
        password: [
          { required: true, message: this.$t('common.ruleLimitTips'), trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur', min: 8, max: 20 }
        ],
        agePassword: [
          { required: true, message: this.$t('common.ruleLimitTips'), trigger: 'blur' },
          { validator: validateAgePassword, trigger: 'blur', min: 8, max: 20 }
        ],
        captchaKey: [
          { required: true, message: this.$t('common.ruleLimitTips'), trigger: 'blur' },
          { validator: validateEmailCaptcha }
        ]
      }
    }
  },
  methods: {
    // 获取授权码
    getCaptcha () {
      if (this.isDisable) return
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.isDisable = true
          this.captchaTime = 30
          this.captchaKey = 'asdsadadsadsad'
          let timeFlag = setInterval(() => {
            this.captchaTime--
            if (this.captchaTime === 0) {
              this.captchaTime = 30
              this.isDisable = false
              window.clearInterval(timeFlag)
            }
          }, 1000)
          // this.authLoading = true
          // getEmailCaptcha().then(({ data }) => {
          //   this.authLoading = false
          //   if (data && data.success === true) {
          //     this.isDisable = true
          //     this.captchaKey = data.data.key
          //     this.captchaTime = 30
          //     let timeFlag = setInterval(() => {
          //       this.captchaTime--
          //       if (this.captchaTime === 0) {
          //         this.captchaTime = 30
          //         this.isDisable = false
          //         window.clearInterval(timeFlag)
          //       }
          //     }, 1000)
          //   } else {
          //     this.$message.error(data.message)
          //   }
          // })
        }
      })
    },
    // 提交表单
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$router.replace({ name: 'login' })
          // const params = { ...this.dataForm }
          // this.loading = true
          // forget(params).then(({ data }) => {
          //   this.loading = false
          //   if (data && data.success === true) {
          //     this.$router.replace({ name: 'login' })
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
.forget-main {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 30px 60px 20px;
  width: 550px;
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
  .captcha-wrap {
    .el-input-group__append {
      border-right: 0;
    }
    .captcha-btn {
      border: 0!important;
      background-color: #3a8ee6!important;
      color: #fff!important;
    }
  }
  .btn-wrap {
    display: flex;
    justify-content: space-between;
    .btn {
      width: 100%;
      margin-top: 10px;
    }
  }
  .el-input-group__prepend {
    padding: 0 10px;
  }
  .input-pre-text {
    width: 80px;
    text-align: justify;
    text-align-last: justify;
  }
}
</style>

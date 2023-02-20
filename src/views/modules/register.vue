<template>
  <div class="reg-main">
    <div class="title-all">
      <h3 class="title">{{ $t('common.register') }}</h3>
    </div>
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      status-icon
    >
      <el-form-item prop="username">
        <el-input
          v-model.trim="dataForm.username"
          clearable
          :placeholder="$t('common.accountLimitTips')"
        >
          <div class="input-pre-text" slot="prepend">{{ $t('common.account') }}</div>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          v-model.trim="dataForm.pwd"
          type="password"
          clearable
          show-password
          :placeholder="$t('common.passwordLimitTips')"
        >
          <div class="input-pre-text" slot="prepend">{{ $t('common.password') }}</div>
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
          <div class="input-pre-text" slot="prepend">{{ $t('register.confirmPassword') }}</div>
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          v-model.trim="dataForm.email"
          clearable
          :placeholder="$t('common.emailLimitTips')"
        >
          <div class="input-pre-text" slot="prepend">{{ $t('register.email') }}</div>
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
import { register } from '@/api/account'
import { isUserName, isPassWord, isEmail } from '@/utils/validate'
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
    let validateAgePassword = (rule, value, callback) => {
      if (value !== this.dataForm.pwd) {
        callback(new Error(this.$t('register.confirmPasswordLimitTips')))
      } else {
        callback()
      }
    }
    let validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error(this.$t('common.emailLimitTips')))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      dataForm: {
        username: '',
        pwd: '',
        agePassword: '',
        email: ''
      },
      dataRule: {
        username: [
          { validator: validateAccount, trigger: 'blur', min: 8, max: 20 }
        ],
        pwd: [
          { validator: validatePassword, trigger: 'blur', min: 8, max: 20 }
        ],
        agePassword: [
          { validator: validateAgePassword, trigger: 'blur', min: 8, max: 20 }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交表单
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const params = { ...this.dataForm }
          this.loading = true
          register(params).then(({ data }) => {
            this.loading = false
            if (data.code == 8) {
              this.$message.success(this.$t('common.success'))
              this.$router.replace({ name: 'login' })
            } else {
              this.$message.error(this.$t(`serverErrorMsg.${data.code}`))
            }
          })
        }
      })
    }
  },
  watch: {
    '$store.state.common.language' () {
      this.$refs['dataForm'].fields.forEach(item => {
        if (item.validateState === 'error') {
          this.$refs['dataForm'].validateField(item.labelFor)
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
.reg-main {
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

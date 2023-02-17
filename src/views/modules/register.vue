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
    let validateAgePassword = (rule, value, callback) => {
      if (value !== this.dataForm.password) {
        callback(new Error(this.$t('register.confirmPasswordLimitTips')))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      dataForm: {
        account: '',
        password: '',
        agePassword: ''
      },
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
            if (data && data.success === true) {
              this.$router.replace({ name: 'login' })
            } else {
              this.loading = false
              this.$message.error(data.message)
            }
          })
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

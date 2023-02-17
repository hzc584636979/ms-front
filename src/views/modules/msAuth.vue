<template>
  <div class="msAuth-main">
    <div class="title-all">
      <h3 class="title">{{ msAuthStep === 1 ? $t('msAuth.inkAuthorization') : $t('msAuth.registerVip') }}</h3>
    </div>
    <el-form
      v-show="msAuthStep === 1"
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      status-icon
    >
      <el-form-item prop="boardNo">
        <el-input
          v-model.trim="dataForm.boardNo"
          clearable
        >
          <div class="input-pre-text input-pre-text-150" slot="prepend">{{ $t('msAuth.boardNumber') }}</div>
        </el-input>
      </el-form-item>
      <el-form-item prop="inkNo">
        <el-input
          v-model.trim="dataForm.inkNo"
          type="password"
          clearable
        >
          <div class="input-pre-text input-pre-text-150" slot="prepend">{{ $t('msAuth.inkNumber') }}</div>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div style="display: flex;justify-content: flex-end;">
          <el-button
            style="width: 309px;"
            type="primary"
            :loading="authLoading"
            :disabled="isDisable"
            @click="getCaptcha()"
          >
            {{ isDisable ? `${ captchaTime } s` : $t('msAuth.getCode') }}
          </el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="captchaKey"
          readonly
        >
          <div class="input-pre-text input-pre-text-150" slot="prepend">{{ $t('msAuth.inkAuthorizationNumber') }}</div>
        </el-input>
      </el-form-item>
      <el-form-item class="tips-wrap">
        <span class="tips">*{{ $t('msAuth.tips_1') }}</span>
        <div class="forget-btn">
          <el-button type="text" @click="msAuthStep = 2">{{ $t('msAuth.registerVip') }} >></el-button>
        </div>
      </el-form-item>
    </el-form>
    <el-form
      v-show="msAuthStep === 2"
      :model="vipDataForm"
      :rules="vipDataRule"
      ref="vipDataForm"
      @keyup.enter.native="vipDataFormSubmit()"
      status-icon
    >
      <el-form-item prop="company">
        <el-input
          v-model.trim="vipDataForm.company"
          clearable
          :placeholder="$t('common.companyLimitTips')"
        >
          <div class="input-pre-text" slot="prepend">{{ $t('msAuth.companyName') }}</div>
        </el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model.trim="vipDataForm.name"
          clearable
          :placeholder="$t('common.userNameLimitTips')"
        >
          <div class="input-pre-text" slot="prepend">{{ $t('msAuth.userName') }}</div>
        </el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          v-model.trim="vipDataForm.phone"
          clearable
        >
          <div class="input-pre-text" slot="prepend">{{ $t('msAuth.telephone') }}</div>
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          v-model.trim="vipDataForm.email"
          clearable
        >
          <div class="input-pre-text" slot="prepend">{{ $t('msAuth.email') }}</div>
        </el-input>
      </el-form-item>
      <el-form-item prop="countryId">
        <div class="flex-row">
          <div class="el-input-group__prepend"><div class="input-pre-text">{{ $t('msAuth.country') }}</div></div>
          <el-select style="width: 100%;" v-model="vipDataForm.countryId" @change="countryHandle">
            <el-option
              v-for="item in countryList"
              :key="item.id"
              :value="item.id"
              :label="item.Chinese"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item prop="region">
        <el-input
          v-model.trim="vipDataForm.region"
          clearable
        >
          <div class="input-pre-text" slot="prepend">{{ $t('msAuth.region') }}</div>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="btn-wrap btn-wrap-2">
          <el-button
            class="btn"
            @click="msAuthStep = 1"
          >{{ $t('msAuth.return') }}</el-button>
          <el-button
            class="btn"
            type="primary"
            :loading="vipLoading"
            @click="vipDataFormSubmit()"
          >{{ $t('common.confirm') }}</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { getMsCaptcha, vipRegister, getUserInfo } from '@/api/account'
import { isEmpty } from '@/utils'
import countryList from '@/utils/country'
export default {
  data () {
    let validateEmpty = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error(this.$t('common.ruleLimitTips')))
      } else {
        callback()
      }
    }
    return {
      msAuthStep: 1,
      authLoading: false,
      dataForm: {
        boardNo: '',
        inkNo: ''
      },
      isDisable: false,
      captchaKey: '',
      captchaTime: 30,
      dataRule: {
        boardNo: [
          { validator: validateEmpty, trigger: 'blur' }
        ],
        inkNo: [
          { validator: validateEmpty, trigger: 'blur' }
        ]
      },
      vipLoading: false,
      countryList: countryList,
      vipDataForm: {
        company: '',
        name: '',
        phone: '',
        email: '',
        countryId: '',
        countryName: '',
        region: ''
      },
      vipDataRule: {
        company: [
          { validator: validateEmpty, trigger: 'blur', min: 8, max: 30 }
        ],
        name: [
          { validator: validateEmpty, trigger: 'blur', min: 4, max: 26 }
        ],
        phone: [
          { validator: validateEmpty, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmpty, trigger: 'blur' }
        ],
        countryId: [
          { validator: validateEmpty, trigger: 'change' }
        ],
        region: [
          { validator: validateEmpty, trigger: 'blur' }
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
          this.captchaKey = 'asdsadadsadsad'
          this.captchaTime = 30
          let timeFlag = setInterval(() => {
            this.captchaTime--
            if (this.captchaTime === 0) {
              this.captchaTime = 30
              this.isDisable = false
              window.clearInterval(timeFlag)
            }
          }, 1000)
          // this.authLoading = true
          // getMsCaptcha().then(({ data }) => {
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
    // 选择国家
    countryHandle (val) {
      this.countryList.map(item => {
        if (item.id == val) {
          this.vipDataForm.countryId = item.id
          this.vipDataForm.countryName = item.Chinese
        }
      })
    },
    // 提交表单
    vipDataFormSubmit () {
      this.$refs['vipDataForm'].validate((valid) => {
        if (valid) {
          this.msAuthStep = 1
          // const params = { ...this.dataForm }
          // this.vipLoading = true
          // vipRegister(params).then(({ data }) => {
          //   this.vipLoading = false
          //   if (data && data.success === true) {
          //     this.msAuthStep = 1
          //   } else {
          //     this.$message.error(data.message)
          //   }
          // })
        }
      })
    }
  },
  watch: {
    msAuthStep (val) {
      this.$refs['dataForm'].clearValidate()
      this.$refs['vipDataForm'].clearValidate()
      if (val == 1) {
        this.vipDataForm = {
          company: '',
          name: '',
          phone: '',
          email: '',
          countryId: '',
          countryName: '',
          region: ''
        }
      } else {
        this.vipDataForm = {
          company: 12321313,
          name: 123213,
          phone: 123213,
          email: 123213,
          countryId: 12323,
          countryName: 123213,
          region: 1232131
        }
        // const loading = this.$loading({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // })
        // getUserInfo().then(({ data }) => {
        //   loading.close()
        //   if (data && data.success === true) {
        //     this.vipDataForm = {
        //       company: data.data.company,
        //       name: data.data.name,
        //       phone: data.data.phone,
        //       email: data.data.email,
        //       countryId: data.data.countryId,
        //       countryName: data.data.countryName,
        //       region: data.data.region
        //     }
        //   } else {
        //     this.$message.error(data.message)
        //   }
        // })
      }
    },
    '$store.state.common.language' () {
      this.$refs['dataForm'].fields.forEach(item => {
        if (item.validateState === 'error') {
          this.$refs['dataForm'].validateField(item.labelFor)
        }
      })
      this.$refs['vipDataForm'].fields.forEach(item => {
        if (item.validateState === 'error') {
          this.$refs['vipDataForm'].validateField(item.labelFor)
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
.msAuth-main {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 30px 60px 20px;
  width: 600px;
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
  .tips-wrap {
    margin-top: -8px;
    margin-bottom: -5px;
    .tips{
      color: #d2d2d2;
      font-size: 12px;
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
    &-2 {
      .btn {
        width: 45%;
      }
    }
  }
  .el-input-group__prepend {
    padding: 0 10px;
  }
  .input-pre-text {
    width: 90px;
    text-align: justify;
    text-align-last: justify;
  }
  .input-pre-text-150 {
    width: 150px;
  }
  .flex-row {
    display: flex;
    .el-input-group__prepend {
      width: 111px;
    }
    .el-input__inner {
      border-radius: 0 4px 4px 0;
      height: 34px;
    }
  }
}
</style>

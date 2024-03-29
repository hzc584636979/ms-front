<template>
  <div
    class="site-wrapper"
    :class="{
      'site-wrapper--nc': processEnv.BASE_NAME == 'nc',
      'site-wrapper--nc--login': processEnv.BASE_NAME == 'nc' && $route.name === 'login',
      'site-wrapper--mt': processEnv.BASE_NAME == 'mt',
      'site-wrapper--mt--nologin--home': processEnv.BASE_NAME == 'mt' && $route.name === 'home' && !token
    }"
    v-if="$store.state.common.language"
  >
    <div class="login-out">
      <el-select v-model="language" @change="languageHandle" style="width: 100px;">
        <el-option
          v-for="item in languageList"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        ></el-option>
      </el-select>
      <template v-if="token">
        {{ account }}, <span class="pointer danger-color" @click="loginOut()">{{ $t('common.logout') }}</span>
      </template>
    </div>
    <div class="site-content__wrapper">
      <div class="site-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { clearLoginInfo } from '@/utils'
export default {
  provide () {
    return {
      processEnv: this.processEnv
    }
  },
  data () {
    return {
      resetViews: true,
      language: this.$store.state.common.language,
      languageList: [
        { id: 'cn', name: '中文' },
        { id: 'en', name: 'English' }
      ]
    }
  },
  mounted () {
    this.$store.commit('common/updateProcessEnv', process.env)
    this.removeLoading()
  },
  methods: {
    removeLoading () {
      // 移除登录页之前的loading
      var loadingMask = document.getElementById('loadingMark')
      var loadingCss = document.getElementById('loadCss')
      if (loadingMask != null && loadingCss != null) {
        document.getElementsByTagName('head')[0].removeChild(loadingCss)
        loadingMask.parentNode.removeChild(loadingMask)
      }
    },
    loginOut () {
      clearLoginInfo()
      window.location.reload()
    },
    languageHandle (val) {
      this.$i18n.locale = val
      this.$store.commit('common/updateLanguage', val)
    }
  },
  computed: {
    processEnv: {
      get () {
        return process.env
      }
    },
    token () {
      return this.$store.state.user.token
    },
    account () {
      return this.$store.state.user.account
    }
  }
}
</script>

<style lang="scss" scope>
.login-out {
  position: absolute;
  right: 40px;
  top: 10px;
  z-index: 1;
}
.site-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(38, 50, 56, 0.6);
  overflow: hidden;
  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url(~@/assets/img/global_bg.jpg);
    background-size: cover;
  }
  &--nc {
    &--login {
      &:before {
        background-image: url(~@/assets/img/login_bg.jpg);
      }
    }
  }
  &--mt {
    &:before {
      background-image: url(~@/assets/img/global_bg_mt.jpg);
    }
    &--nologin--home {
      &:before {
        background-image: url(~@/assets/img/home_nologin_bg_mt.jpg);
        background-position: center center;
        background-size: auto;
      }
    }
  }
  .site-content__wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: transparent;
  }
  .site-content {
    min-height: 100%;
  }
}
</style>

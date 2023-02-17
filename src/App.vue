<template>
  <div class="site-wrapper" :class="{ 'site-wrapper--login': $route.name === 'login' }" v-if="$store.state.common.language">
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
        {{ $cookie.get('account') }}, <span class="pointer danger-color" @click="loginOut()">{{ $t('logout') }}</span>
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
  data () {
    return {
      resetViews: true,
      token: this.$cookie.get('token'),
      language: this.$store.state.common.language,
      languageList: [
        { id: 'cn', name: '中文' },
        { id: 'en', name: 'English' }
      ]
    }
  },
  mounted () {
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
  &--login {
    &:before {
      background-image: url(~@/assets/img/login_bg.jpg);
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

<template>
  <div>
    <div class="home-main" v-if="!token">
      <div class="home-area">
        <img class="msImg" src="~@/assets/img/login_i1.png" alt="">
        <div class="desc">
          <div class="title">{{ $t('home.serveName') }}</div>
          <el-button
            class="login-btn"
            type="primary"
            @click="$router.push('/login')"
          >{{ $t('home.signOrReg') }}</el-button>
        </div>
      </div>
    </div>
    <ms-auth v-else />
  </div>
</template>

<script>
import msAuth from './msAuth'
export default {
  components: {
    msAuth
  },
  data () {
    return {
      token: this.$cookie.get('token')
    }
  }
}
</script>

<style lang="scss" scope>
.home-main {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 30px 60px 20px;
  width: 800px;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  .home-area {
    display: flex;
    justify-content: center;
    align-items: center;
    .msImg {
      width: 240px;
      flex-shrink: 0;
      transform: translateY(60px);
    }
    .desc {
      text-align: center;
      .title {
        font-size: 30px;
      }
      .login-btn {
        min-width: 120px;
        margin-top: 20px;
      }
    }
  }
}
</style>

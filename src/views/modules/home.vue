<template>
  <div>
    <div v-if="!token">
      <template v-if="$store.state.common.processEnv.BASE_NAME == 'nc'">
        <div class="home-main">
          <div class="home-area" >
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
      </template>
      <template v-if="$store.state.common.processEnv.BASE_NAME == 'mt'">
        <div class="home-main-mt">
          <div class="home-area">
            <div class="desc">
              <div class="title">{{ $t('home.serveNameMt') }}</div>
              <el-button
                  class="login-btn"
                  type="primary"
                  @click="$router.push('/login')"
              >{{ $t('home.signOrReg') }}</el-button>
            </div>
          </div>
        </div>
      </template>
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
    }
  },
  computed: {
    token () {
      return this.$store.state.user.token
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
        min-width: 200px;
        height: 50px;
        margin-top: 20px;
        font-size: 18px;
      }
    }
  }
}
.home-main-mt {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-110%, -128%);
  .home-area {
    .desc {
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0));
      width: 500px;
      padding: 10px 0 20px 40px;
      .title {
        font-size: 56px;
      }
      .login-btn {
        min-width: 200px;
        height: 50px;
        margin-top: 20px;
        font-size: 18px;
      }
    }
  }
}
</style>

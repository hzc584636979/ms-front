<template>
  <div class="site-wrapper site-page--not-found">
    <div class="site-content__wrapper">
      <div class="site-content">
        <svg viewBox="0 0 600 300" class="not-found-title">
            <!-- Symbol -->
            <symbol id="notFoundTitleText">
              <text text-anchor="middle" x="50%" y="50%" dy=".35em" font-size="300"> 4 0 4 </text>
            </symbol>
            <!-- Duplicate symbols -->
            <use xlink:href="#notFoundTitleText" class="not-found-title-text"></use>
            <use xlink:href="#notFoundTitleText" class="not-found-title-text"></use>
            <use xlink:href="#notFoundTitleText" class="not-found-title-text"></use>
            <use xlink:href="#notFoundTitleText" class="not-found-title-text"></use>
            <use xlink:href="#notFoundTitleText" class="not-found-title-text"></use>
        </svg>
        <p class="not-found-desc">抱歉！您访问的页面<em>失联</em>啦 ...</p>
        <el-button icon="el-icon-back" @click="$router.go(-1)">返回上一页</el-button>
        <el-button type="primary" class="not-found-btn-gohome" icon="el-icon-s-promotion" @click="$router.push({ name: 'home' })">进入首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created () {
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
      }
    }
  }
</script>

<style lang="scss">
.site-wrapper.site-page--not-found {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  .site-content__wrapper {
    padding: 0;
    margin: 0;
    background-color: #fff;
  }
  .site-content {
    position: fixed;
    top: 15%;
    left: 50%;
    z-index: 2;
    padding: 30px;
    text-align: center;
    transform: translate(-50%, 0);
  }
  .not-found-title {
    margin: 20px 0 15px;
    width: 340px;
    height: 160px;
    font-family: Sans, Impact;
    &-text {
      fill: none;
      stroke-width: 4;
      stroke-linejoin: round;
      stroke-dasharray: 70 330;
      stroke-dashoffset: 0;
      -webkit-animation: stroke 6s infinite linear;
      animation: stroke 6s infinite linear;
      &:nth-child(5n + 1) {
        stroke: #F2385A;
        -webkit-animation-delay: -1.2s;
        animation-delay: -1.2s;
      }
      &:nth-child(5n + 2) {
        stroke: #F5A503;
        -webkit-animation-delay: -2.4s;
        animation-delay: -2.4s;
      }
      &:nth-child(5n + 3) {
        stroke: #E9F1DF;
        -webkit-animation-delay: -3.6s;
        animation-delay: -3.6s;
      }
      &:nth-child(5n + 4) {
        stroke: #56D9CD;
        -webkit-animation-delay: -4.8s;
        animation-delay: -4.8s;
      }
      &:nth-child(5n + 5) {
        stroke: #3AA1BF;
        -webkit-animation-delay: -6s;
        animation-delay: -6s;
      }
    }
  }
  .not-found-desc {
    margin: 0 0 30px;
    font-size: 26px;
    text-transform: uppercase;
    color: rgb(118, 131, 143);
    > em {
      font-style: normal;
      color: #ee8145;
    }
  }
  .not-found-btn-gohome {
    margin-left: 30px;
  }
}

  @-webkit-keyframes stroke {
    100% {
      stroke-dashoffset: -400;
    }
  }
  @keyframes stroke {
    100% {
      stroke-dashoffset: -400;
    }
  }
</style>

<template>
  <div class="nav-bar">
    <div class=" nav-bar__content">
      <nuxt-link to="/">
      <img  class="nav-bar__logo" src="/images/icon.png" />
      </nuxt-link>

      <div class="nav-bar__actions">
        <img class="button" src="/icons/twitter-logo.svg" alt="" />
        <img class="button" src="/icons/dribble-logo.svg" alt="" />
        <img class="button" src="/icons/figma-logo.svg" alt="" />
        <img class="button" src="/icons/github-logo.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.nav-bar {
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0 1px 0 0 #e5e5e5;
  height: pxToRem(70);
  position: fixed;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 999999;

  &__content {
    height: 100%;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 pxToRem(10);

    .nav-bar__logo {
      height: pxToRem(50);
      width: pxToRem(50);
      border-radius: pxToRem(5);
    }

    .nav-bar__actions {
      flex: 1;
      display: flex;
      justify-content: end;
      gap: pxToRem(15);

      img {
        width: pxToRem(21);
        height: pxToRem(21);
        object-fit: cover;
      }
    }
  }

  @include media-breakpoint-up(sm) {
      height: pxToRem(80);
    &__content {
      max-width: 90%;
      margin: auto;
       padding: 0 ;
      .nav-bar__logo {
        height: pxToRem(60);
        width: pxToRem(60);
      }
      .nav-bar__actions {
        flex: 1;
        display: flex;
        justify-content: end;
        gap: pxToRem(20);

        img {
          width: pxToRem(24);
          height: pxToRem(24);
          object-fit: cover;
        }
      }
    }
  }
}
</style>

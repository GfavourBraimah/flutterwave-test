<template>
  <div class="dot-divider">l
      <div class="dot-divider__dot"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.dot-divider{
    display:  inline-flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
     margin: 0 pxToRem(5);
     color: #fff;
     height: 16px;
  
  &__dot{
      width: 3px;
  height: 3px;
  border-radius: pxToRem(9999);
  background-color: #2C2C2C;
  display: inline-block;
 
  }
}




</style>
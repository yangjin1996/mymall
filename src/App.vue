<template>
  <div id="app">
    <keep-alive include="" exclude="GoodsList,UserAddress,AddAddress,Footprient,Order,Cart,UserOrder">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
  // document.addEventListener('DOMContentLoaded', () => {
  //   const html = document.querySelector('html')
  //   const fontSize = window.innerWidth / 7.5
  //   html.style.fontSize = fontSize + 'px'
  // })

  function init(doc,win){
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function(){
        var clientWidth = docEl.clientWidth;
        if(!clientWidth) return;
        docEl.style.fontSize = clientWidth / 7.5 + 'px';
      };
      if(!doc.addEventListener) return;
        win.addEventListener(resizeEvt,recalc, false);
        doc.addEventListener('DOMContentLoaded',recalc,false);
  }
  
  init(document,window)

  export default {}
</script>
<style lang="scss">
@import "./assets/scss/reset";
@import "./assets/scss/border";
@import "./assets/scss/global";
@import "../fonts/iconfont.css";
</style>

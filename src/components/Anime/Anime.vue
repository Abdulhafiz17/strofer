<template>
  <div class="content2" v-if="isLoading">
    <div class="img-content2">
      <center>
        <img class="img1" src="../../assets/Qora.png" alt="Qora" />
        <img class="img2" src="../../assets/qizil.png" alt="Qizil" />
      </center>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: Boolean,
  },
};
</script>

<style>
.content2 {
  background: rgba(205, 205, 239, 0.4);
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;
}

.img-content2 {
  position: fixed;
  top: 35%;
  left: 45%;
}

.img1 {
  width: 90px;
  margin-top: 60px;
  position: fixed;
  animation: qora 1700ms infinite ease-in alternate;
}

.img2 {
  width: 160px;
  position: fixed;
  animation: qizil 1700ms infinite ease-in;
}

@media screen and (max-width: 660px) {
  .img-content2 {
    position: fixed;
    left: 43%;
  }
}
@media screen and (max-width: 550px) {
  .img-content2 {
    position: fixed;
    left: 41.8%;
  }
}
@media screen and (max-width: 480px) {
  .img-content2 {
    position: fixed;
    left: 41%;
  }
}
@media screen and (max-width: 390px) {
  .img-content2 {
    position: fixed;
    left: 35%;
  }
}

@keyframes qizil {
  0% {
    transform: scale(1.3);
  }
  25% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  75% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.3);
  }
}
@keyframes qora {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.15);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}
</style>
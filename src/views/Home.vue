<template class="overflow-hidden">
  <img src="../assets/background.webp" class=" rounded shadow-lg" style="position: absolute; left: 0; top: 0;height: 99%; width: 100%; z-index: 1"  alt="">
  <div  style="background-color:black;position: absolute; left: 0; top: 0;height: 99%; width: 100%; opacity:0.7;z-index: 1"></div>
  <div class="row container-fluid">
    <div class="" style="z-index: 2;">
      <div class="row pt-5 text-white">
        <div class="col-6">
          <img src="../assets/Logo.png" class="mt-4 rounded shadow-lg" style=""  alt="">
<!--          <h4 class="m-0 mb-3" style="margin-left:20px; color: #e8ede9; font-weight: bold; font-family: 'Ceviche One', cursive; font-size: 60px">Smile Game<br></h4>-->
          <p class="text-white"><br>This is a mini game that aims to increase your knowledge by presenting you with a series of questions and multiple choice answers. As a player, you will be given the opportunity to select the correct answer from the available options. The game is designed to be both fun and educational, allowing you to learn new facts and test your knowledge at the same time. With each correct answer, you will earn points and progress through the levels, unlocking more challenging questions as you go.
            <br><br>So, get ready to exercise your brain and expand your knowledge with this fun and engaging mini game!</p>
          <h5 class="mt-4 mb-4 text-white"> Let's Play....! <br><br><br></h5>
          <router-link class="" to="/login" active-class="active">
            <button type="button" class="btn btn-danger btn-lg" style="font-weight: bold">Start Game</button>
          </router-link>
        </div>
        <div class="col-6"></div>

      </div>

    </div>
  </div>


</template>

<script>
import vuex from "vuex";

export default {
  name: "Home",
  data() {
    return {
      errorMessage: "",
      infoMessage: "",

    };
  },
  computed: {
    ...vuex.mapGetters(["currentUser"])
  },
  mounted() {

  },
  methods: {

  }
};

</script>

<style scoped>
.background-set{
  /*height: vh;*/
  /*background-image: url("../assets/main.png");*/
}

.device-icon {
  font-size: 100px;
  color: darkblue;
}

.color-item {
  width: 28px;
  height: 28px;
  border-radius: 14px;
  cursor: pointer;
  position: relative;
}

.color-item.active:after {
  content: "";
  position: absolute;
  width: 36px;
  height: 36px;
  left: -4px;
  top: -4px;
  border-radius: 50%;
  border: 2px solid #8888;
}
</style>
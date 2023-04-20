<template>
  <div class="row pt-4 mt-4">
    <p><br><br><br><br></p>
    <div class=" col-7 text-center d-block m-auto mt-4" style="cursor: pointer" @click="goToDifficultyMenuFunc">
      <div class="card bg-dark text-white">
        <img class="card-img" src="../assets/background.webp" style="height: 100px" alt="Card image">
        <div  style="background-color:black;position: absolute; left: 0; top: 0;height: 99%; width: 100%; opacity:0.7;"></div>
        <div class="card-img-overlay">
          <h2 class="fw-bold card-title">Change Difficulty Level</h2>
          <p class="card-text">Select the difficulty level to play the game.
          </p>
        </div>
      </div>
    </div>
    <div class="col-7 mt-4 text-center d-block m-auto mt-4" style="cursor: pointer;"  @click="goToLeaderboardMenuFunc">
      <div class="card bg-dark text-white">
        <img class="card-img" src="../assets/Levels.png" style="height: 100px" alt="Card image">
        <div  style="background-color:black;position: absolute; left: 0; top: 0;height: 99%; width: 100%; opacity:0.5;"></div>
        <div class="card-img-overlay">
          <h2 class="fw-bold card-title">Go to the Leaderboard</h2>
          <p>View the top players and the Ranks</p>
        </div>
      </div>
    </div>
    <div class="col-6 mt-4 text-center d-block m-auto mt-4" style="cursor: pointer" @click="startGame">
      <div class="card bg-danger text-white">
        <img  style="height: 100px" >
        <div  style="background-color:black;position: absolute; left: 0; top: 0;height: 99%; width: 100%; opacity:0.7;"></div>
        <div class="card-img-overlay">
          <h2 class="fw-bold card-title">Start The Game</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {onMounted} from 'vue'
import DifficultyType from "@/models/DifficultyType";

export default {
  name: "Menu",
  computed: {
    DifficultyType() {
      return DifficultyType
    }
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const {currentUser} = store.getters;

    const startGame = () => {
      router.push("play-game")
    }

    const goToDifficultyMenuFunc = () => {
      router.push("difficulty-menu")
    }

    const goToLeaderboardMenuFunc = () => {
      router.push("leaderboard")
    }


    onMounted(() => {

    })

    return {
      currentUser,
      startGame,
      goToDifficultyMenuFunc,
      goToLeaderboardMenuFunc
    };
  }
}
</script>

<style scoped>

</style>
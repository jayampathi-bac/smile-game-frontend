<template>
  <div class="container text-white">
    <div class="row">

    </div>
    <br><br><br><br><br><br>
    <div class="col-6 p-5 card text-center d-block m-auto mt-4 align-middle"  style="background-color: rgba(0,0,0,0.2)">
      <div class="card-body ">
        <h5>Select Difficulty Level</h5>
        <button
          :class="difficultyLevel === DifficultyType.EASY ? `btn-danger text-white` : null"
          class="long mt-4 btn btn-outline-danger " @click="selectDifficulty(DifficultyType.EASY)" style="width: 400px; font-weight: bold">Easy</button>
        <button
          :class="difficultyLevel === DifficultyType.MEDIUM ? `btn-danger text-white` : null"
          class="long mt-4 btn btn-outline-danger"  @click="selectDifficulty(DifficultyType.MEDIUM)" style="width: 400px; font-weight: bold">Medium</button>
        <button
          :class="difficultyLevel === DifficultyType.HARD ? `btn-danger text-white` : null"
          class="long mt-4 btn btn-outline-danger"  @click="selectDifficulty(DifficultyType.HARD)" style="width: 400px; font-weight: bold">Hard</button>
        <button class="btn btn-secondary mt-4 d-block m-auto" style="width: 200px" @click="goToMenuFunc">Go to menu</button>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {computed, onMounted} from "vue";
import DifficultyType from "@/models/DifficultyType";

export default {
  name: "DifficultyMenu",
  computed: {
    DifficultyType() {
      return DifficultyType
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const {currentUser} = store.getters;

    const difficultyLevel = computed(() => store.getters.difficultyLevel)

    const startGame = () => {
      router.push("play-game")
    }

    const goToMenuFunc = () => {
      router.push("menu")
    }

    const selectDifficulty = (difficultyLvl) => {
      console.log("difficulty level : ", difficultyLvl, difficultyLevel.value)
      store.dispatch("updateDifficultyLevel", difficultyLvl);
    }

    onMounted(() => {
      console.log("difficulty Level onMounted ", difficultyLevel.value)
      if (difficultyLevel.value === null) {
        store.dispatch("updateDifficultyLevel", DifficultyType.EASY);
      }
    })

    return {
      currentUser,
      difficultyLevel,
      startGame,
      selectDifficulty,
      goToMenuFunc
    };
  }
}
</script>

<style scoped>

</style>
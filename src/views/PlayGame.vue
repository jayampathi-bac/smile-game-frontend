<template>
  <div style="">
    <div class="container-fluid row mt-5">
      <div class="col-12 game-div">
        <img style="margin: auto; display: block" :src="imageUrl" alt="">
      </div>

      <div class="card col-2 d-block m-auto p-2 mt-2" style="position: absolute; right: 100px">
          <h3 class="text-center">Total Score : <span>{{ currentUserScore }}</span></h3>
        </div>
      <div class="col-4 mt-0 game-input form-group card d-block m-auto text-center">
        <div class="card-body">
          <h6>Time Counter</h6>
          <h2 class="text-center">{{ original.count }}</h2>
          <!--      <input-->
          <!--        class="m-2 form-control"-->
          <!--        type="number"-->
          <!--        v-model="userAnswer"-->
          <!--      >-->

          <div class="row">
            <div class="text-white col-3">
              <button
                  @click="submitAnswer(firstAnswer)"
                  class="btn-lg bg-dark text-white ">{{ firstAnswer }}
              </button>
            </div>
            <div class="text-white col-3">
              <button
                  @click="submitAnswer(secondAnswer)"
                  class="btn-lg bg-dark text-white ">{{ secondAnswer }}
              </button>
            </div>
            <div class="text-white col-3">
              <button
                  @click="submitAnswer(thirdAnswer)"
                  class="btn-lg bg-dark text-white ">{{ thirdAnswer }}
              </button>
            </div>
            <div class="text-white col-3">
              <button
                  @click="submitAnswer(forthAnswer)"
                  class="btn-lg bg-dark text-white ">{{ forthAnswer }}
              </button>
            </div>


            <button class="btn btn-danger mt-4 d-block m-auto" style="width: 200px" @click="goToMenuFunc">Go to menu</button>

          </div>


          <!--      <button-->
          <!--        class="btn btn-danger btn-lg  text-center"-->
          <!--        @click="submitAnswer"-->
          <!--      >Submit-->
          <!--      </button>-->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {computed, onMounted, reactive, readonly, ref, watchEffect} from "vue";
import GameService from "@/services/game.service";
import Swal from "sweetalert2";
import {useStore} from "vuex";
import difficultyType from "@/models/DifficultyType";
import DifficultyType from "@/models/DifficultyType";
import {useRouter} from "vue-router";

export default {
  name: "PlayGame",

  setup() {
    const store = useStore();
    const router = useRouter();
    const {currentUser} = store.getters;
    const imageUrl = ref("");
    const correctAnswer = ref(null);
    const userAnswer = ref(null);
    const countDown = ref(0)
    const firstAnswer = ref(0)
    const secondAnswer = ref(0)
    const thirdAnswer = ref(0)
    const forthAnswer = ref(0)
    const currentUserScore = ref(0)

    const difficultyLevel = computed(() => store.getters.difficultyLevel)

    const original = reactive({count: 0})

    const copy = readonly(original)

    watchEffect(() => {
      // works for reactivity tracking
      console.log(copy.count)
    })

    const saveAnswerFunc = () => {
      let score = 10;
      if (difficultyLevel.value === DifficultyType.EASY) score = 10;
      if (difficultyLevel.value === DifficultyType.MEDIUM) score = 20;
      if (difficultyLevel.value === DifficultyType.HARD) score = 30;

      console.log("saveAnswerFunc : ", currentUser?.id, score)
      GameService.setScore(currentUser?.id, score)
    }

    const submitAnswer = (answer) => {
      userAnswer.value = answer;
      console.log("answer submitted : ", userAnswer.value);
      if (userAnswer.value === correctAnswer.value) {
        Swal.fire(
            "You won",
            "You have won the level",
            "success"
        );
        saveAnswerFunc()

      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You are lost!"
        });

      }

      setTimeout(function () {
        window.location.reload();
      }, 2000);

    };

    const startCountdown = seconds => {
      let counter = seconds;
      countDown.value = seconds;
      original.count = seconds;
      const interval = setInterval(() => {
        console.log(counter);
        counter--;
        original.count--
        if (counter < 1) {
          clearInterval(interval);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Time over!',
            confirmButtonText: 'Menu',
            denyButtonText: "retry",
            showDenyButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("menu")
            }
                // else if(result.dismiss === Swal.DismissReason.cancel){
                //
            // }
            else if (result.isDenied) {
              window.location.reload();
            }
          })
        }
      }, 1000);
    };

    const setCountDownOnDifficulty = () => {
      if (difficultyLevel.value === difficultyType.EASY) {
        startCountdown(30)
      } else if (difficultyLevel.value === difficultyType.MEDIUM) {
        startCountdown(20)
      } else if (difficultyLevel.value === difficultyType.HARD) {
        startCountdown(10)
      }
    }

    const getRandomInt = max => Math.floor(Math.random() * max);

    const setAnswers = () => {
      const x = new Date().getSeconds();
      console.log("x ", x % 4)
      if (x % 4 === 3) {
        firstAnswer.value = correctAnswer.value;
        secondAnswer.value = getRandomInt(10)
        thirdAnswer.value = getRandomInt(10)
        forthAnswer.value = getRandomInt(10)
      }
      if (x % 4 === 2) {
        secondAnswer.value = correctAnswer.value;

        firstAnswer.value = getRandomInt(10)
        thirdAnswer.value = getRandomInt(10)
        forthAnswer.value = getRandomInt(10)
      }
      if (x % 4 === 1) {
        thirdAnswer.value = correctAnswer.value;

        firstAnswer.value = getRandomInt(10)
        secondAnswer.value = getRandomInt(10)
        forthAnswer.value = getRandomInt(10)
      }
      if (x % 4 === 0) {
        forthAnswer.value = correctAnswer.value;

        firstAnswer.value = getRandomInt(10)
        secondAnswer.value = getRandomInt(10)
        thirdAnswer.value = getRandomInt(10)
      }
    }

    const getCurrentUserScore = () => {
      GameService.getScore(currentUser.id).then((resp) => {
        console.log("current score", resp.data)
        currentUserScore.value = resp.data;
      })
    }

    const goToMenuFunc = () => {
      router.push("menu")
    }

    onMounted(async () => {
      let gameResp = await GameService.callSmileAPI();
      imageUrl.value = gameResp.data["question"];
      correctAnswer.value = gameResp.data["solution"];
      setAnswers()
      setCountDownOnDifficulty()
      getCurrentUserScore()
    });

    return {
      imageUrl,
      userAnswer,
      countDown,
      original,
      firstAnswer,
      secondAnswer,
      thirdAnswer,
      forthAnswer,
      currentUserScore,
      submitAnswer,
      goToMenuFunc
    };
  }
};


</script>

<style scoped>
.game-div {
  height: 450px;
}

.game-input {
  height: 250px;
  /*background-color: red;*/
}

.background-set {

  background-color: red;
}
</style>
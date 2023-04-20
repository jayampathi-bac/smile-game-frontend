<template>
  <h2 class="text-center mt-4 text-white" style="font-weight: bold"> Leaderboard</h2>
  <div class="row mt-4">
    <div class="col-6 d-block m-auto mt-4 ">
      <div class="row">
        <div class="col-4"  v-for="(score, index) in topScores">
          <div class="card"  style="height: 100px">
            <div class="card-body row">
              <div class="col-3" >
                <img class="text-center d-block m-auto" style="width: 45px; padding-top: 10px;"
                     :src="checkBadge(index)" alt="">
              </div>
              <div class="col-9">
                <h4 style="font-weight: bold; margin-left: 10px" class="card-title">{{ score.username }}</h4>
                <p style="margin-left: 10px;">score<span style="font-weight: bold; margin-left: 10px; font-size: 20px">{{ score.score }}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-4">
    <div class="col-7 d-block m-auto" v-for="(score, index) in normalScores">
      <div class="card text-white" style="background-color: rgba(255,255,255,0.1)">
        <div class="card-body row">
          <h5 class="col-1 p-1"> {{index + 4}}</h5>
          <img class="col-2" style="width: 60px;padding-top: 10px;"
               :src="bestAward" alt="">
          <h5 style="font-weight: bold" class="col-3"> <span>{{score.username}}</span></h5>
          <p class="col-2">{{score.name}}</p>
          <h3 style="font-weight: bold; position: absolute; right: 0px" class="col-2">{{score.score}}</h3>

        </div>
      </div>
    </div>

  </div>
  <button class="btn btn-danger mt-4 d-block m-auto" style="width: 200px" @click="goToMenuFunc">Go to menu</button>

</template>

<script>

import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import GameService from "@/services/game.service";

export default {
  name: "LeaderBoard",
  setup() {
    const store = useStore();
    const router = useRouter();
    const scores = ref([]);
    const topScores = ref([]);
    const normalScores = ref([]);
    const gold = ref("https://i.ibb.co/TmV9K23/gold.png")
    const silver = ref("https://i.ibb.co/74P2WF7/silver.png")
    const bronze = ref("https://i.ibb.co/pvj5gnG/bronze.png")
    const bestAward = ref("https://i.ibb.co/SvysNB0/best.png")

    const goToMenuFunc = () => {
      router.push("menu")
    }

    const checkBadge = (index) => {
      return index === 0 ? gold.value : index === 1 ? silver.value : index === 2 ? bronze.value : bestAward.value;
    }


    onMounted(async () => {
      let resp = await GameService.getAllUsersWithScores();
      console.log("resp : ", resp.data)
      scores.value = resp.data;

      topScores.value = resp.data.slice(0, 3)
      normalScores.value = resp.data.slice(3, scores.value.length)

      console.log("normalScores : ", normalScores.value)
    })

    return {
      goToMenuFunc,
      checkBadge,
      scores,
      topScores,
      normalScores,
      bestAward
    };
  }
}
</script>

<style scoped>

</style>
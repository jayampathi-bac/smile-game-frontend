<template style="">
  <div :style="cssProps" class="height-set">
    <nav class="navbar navbar-expand navbar-dark bg-dark shadow-lg ">
      <router-link class="navbar-brand ms-1" to="/">
        <img src="./assets/LogoHeader.png" style="padding-left: 10px" height="" alt="">
      </router-link>


      <div class="navbar-nav ms-auto" v-if="!currentUser" style="margin-right:100px;font-weight: bold">
        <li class="nav-item">
          <router-link class="nav-link text-white-50" to="/register" active-class="active">
            Sign Up
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link text-white-50" to="/login" active-class="active">
            Sign In
          </router-link>
        </li>
      </div>
      <div class="navbar-nav ms-auto" v-if="currentUser" style="margin-right:100px;font-weight: bold">
        <li class="nav-item ">
          <router-link class="nav-link text-white-50" to="/profile" active-class="active">
            {{ currentUser.name }}
          </router-link>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link text-white-50" @click="handleLogOut">
            Sign Out
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>

import vuex from "vuex";
import router from "@/router";

export default {
  data() {
    return {
      cssProps: {

        backgroundImage: "linear-gradient(to right, #202020 , #202020)"
      }
    };
  },
  computed: {
    ...vuex.mapGetters(["currentUser"])
  },

  methods: {
    ...vuex.mapActions(["clearUser"]),

    handleLogOut() {
      this.clearUser();
      router.push("/login");
    }
  }
};
</script>

<style>
.height-set {
  height: 960px;
}
</style>

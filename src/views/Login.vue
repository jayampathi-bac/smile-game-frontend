<template>
  <br><br><br><br>
  <div class="container-fluid row mt-5" style="z-index: 2">
    <div class="col-6">
      <img src="../assets/main.png" style="width:500px;padding-left: 10px" alt="">

    </div>
    <div class="col-6 d-block m-auto">
      <div style="margin:auto; padding-top: 50px !important; padding-bottom: 60px !important; background-color: rgba(0,0,0,0.5)" class="card ms-auto me-auto p-3 shadow-lg custom-card">
<!--        <img src="../assets/smile-yana.gif" class="d-block m-auto" style="text-align:center;width: 50px" alt="">-->
        <h4 class="mt-4 text-center text-white">Login</h4>

        <font-awesome-icon icon="" class="ms-auto me-auto user-icon" />
        <div v-if="errorMessage" class="alert alert-danger mt-2">
          {{ errorMessage }}
        </div>

        <form
            @submit.prevent="handleLogin"
            novalidate
            :class="submitted ? 'was-validated' : ''">

          <div class="text-white form-group">
            <label for="username">Username</label>
            <input
                v-model="formData.username"
                type="text"
                id="username"
                class="form-control"
                name="username"
                placeholder="Username"
                required>
            <div class="invalid-feedback">
              Username is required.
            </div>
          </div>

          <div class="text-white form-group">
            <label for="password">Password</label>
            <input
                v-model="formData.password"
                type="password"
                id="password"
                class="form-control"
                name="password"
                placeholder="Password"
                required>
            <div class="invalid-feedback">
              Password is required.
            </div>
          </div>

          <button
              class="btn btn-danger w-100 mt-3"
              @click="submitted = true"
              :disabled="loading"
          >
            Sign In
          </button>
        </form>

        <router-link
            to="/register"
            class="btn btn-link"
            style="color: #e8ede9;"
        >
          Create a new Account?
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
// COMPOSITION API IMPORTS
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AuthenticationService from "@/services/authentication.service";
import User from "@/models/user";

// OPTION API IMPORTS
// import User from "@/models/user";
// import vuex from "vuex";
// import router from "@/router";
// import AuthenticationService from "@/services/authentication.service";
export default {
  name: "Login",

  setup() {
    const formData = ref(new User());
    const loading = ref(false);
    const submitted = ref(false);
    const errorMessage = ref("");

    const store = useStore();

    const router = useRouter();
    const { currentUser } = store.getters;



    const handleLogin = () => {
      if (!formData.value.username || !formData.value.password) {
        return;
      }

      loading.value = true;

      AuthenticationService.login(formData.value).then((response) => {
        store.dispatch("updateUser", response.data);

        router.push("/menu");
      }).catch((err) => {
        console.log(err);
        errorMessage.value = "Unexpected Error occurred.!!";
      }).then(() => {
        loading.value = false;
      });
    };

    return {
      formData,
      loading,
      submitted,
      errorMessage,
      currentUser,
      handleLogin
    };
  }

};
</script>

<style scoped>

</style>
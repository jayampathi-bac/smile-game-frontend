import { createStore } from "vuex";

export default createStore({
  state: {
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
    difficultyLevel: localStorage.getItem('difficultyLevel'),
  },

  getters: {
    currentUser:state => state.currentUser,
    difficultyLevel:state => state.difficultyLevel
  },

  mutations: {
    updateUserInMutation(state, user){
      state.currentUser = user;
      localStorage.setItem('currentUser',JSON.stringify(user));
    },
    updateDifficultyLevelInMutation(state, difficultyLevel){
      state.difficultyLevel = difficultyLevel;
      localStorage.setItem('difficultyLevel',difficultyLevel);
    },

    clearUserInMutation(state){
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    }
  },

  actions: {
    updateUser(state, user){
      state.commit('updateUserInMutation', user);
    },
    updateDifficultyLevel(state, difficultyLevel){
      state.commit('updateDifficultyLevelInMutation', difficultyLevel);
    },

    clearUser(state){
      state.commit('clearUserInMutation');
    }
  },
  modules: {},
});

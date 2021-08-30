import axios from "axios";
import router from "../router/index";
import { createStore } from "vuex";

export default createStore({
  state: {
    posts: [],
    users: {},
    isFetching: false,
    authError: null,
    auth: false,
    userQuery: {}
  },
  mutations: {
    getPosts(state, payload) {
      state.posts = payload;
    },
    getUsers(state, payload) {
      state.users = payload;
    },
    getUserQuery(state, payload) {
      state.userQuery = payload;
    },
    login(state, payload) {
      state.users = payload;
      console.log('state', state.users);
    },
    followings(state, payload){
      state.users.followings = [...state.users.followings, payload]
    },
    unFollow(state,payload){
      state.users.followings = state.users.followings.filter(following => following !== payload) 
    },
    errors(state, payload) {
      console.log("errors", payload);
      state.authError = payload;
    }
  },
  actions: {
    async asyncGetPosts(context, payload) {
      const state = context.state;
      const res = payload
        ? await axios.get("/posts/profile/" + payload)
        : await axios.get("posts/timeline/" + state.users.id);
      console.log("posts", res);
      context.commit("getPosts", res.data);
    },
    async asyncGetUsers(context, payload) {
      const res = await axios.get(`/users/?userId=${payload}`);
      context.commit("getUsers", res.data);
    },
    async asyncGetUsersQuery(context, payload) {
      console.log("yeeyeyeyey");
      const res = await axios.get(`/users?username=${payload}`);
      console.log("res", res);
      context.commit("getUsers", res.data);
    },
    async login({ commit, state }, payload) {
      try {
        const res = await axios.post("auth/login", payload);
        commit("getUsers", res.data);
        state.isFetching = false;
        router.push("/");
      } catch (error) {
        const { response } = error;
        commit("errors", {
          status: response.status,
          message: response.data.message
        });
        state.isFetching = false;
      }
    },
    async registration({ commit }, payload) {
      try {
        const res = await axios.post("auth/registration", payload);
        commit("getUsers", res.data);
        router.replace("/");
      } catch (error) {
        const { response } = error;
        commit("errors", {
          status: response.status,
          message: response.data.message
        });
      }
    }
  },
  modules: {}
});

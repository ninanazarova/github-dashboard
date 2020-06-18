import axios from 'axios';

export const state = () => ({
  repositories: [],
  repository: {},
});

export const mutations = {
  setState: (state, { name, value }) => {
    state[name] = value;
  },

  setRepository: (state, { repository }) => {
    state.repository = repository;
  },
};

export const actions = {
  fetchRepositories(state, { page }) {
    return axios
      .get(
        `https://api.github.com/search/repositories?q=stars:>0&sort=stars&type=Repositories&page=${page}&per_page=4`
      )
      .then(res => {
        return state.commit('setState', {
          name: 'repositories',
          value: res.data,
        });
      })
      .catch(err => console.log(err));
  },

  fetchRepository({ commit }, { fullName }) {
    return axios
      .get(`https://api.github.com/repos${fullName}`)
      .then(res => {
        return commit('setRepository', {
          repository: res.data,
        });
      })
      .catch(err => console.log(err));
  },
};

export const getters = {
  getRepositories(state) {
    return state.repositories;
  },

  getRepository(state) {
    console.log(state.repository);
    return state.repository;
  },
};

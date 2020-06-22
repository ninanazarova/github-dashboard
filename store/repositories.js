import axios from 'axios';

export const state = () => ({
  repositories: [],
  repository: {},
});

export const mutations = {
  setState: (state, { name, value }) => {
    state[name] = value;

    state.repositories.items.forEach(repo => {
      const re = /-/g;
      repo.pushed_at = repo.pushed_at.slice(0, 10).replace(re, '.');

      let count =
        (Math.floor(repo.stargazers_count / 1000) * 1000) / 1000 + 'K';
      repo.stargazers_count = count;
      console.log(repo);
      // repo.full_name = re
    });
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
    return state.repository;
  },
};

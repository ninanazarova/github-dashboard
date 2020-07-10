import axios from 'axios';
import { formatTimeString, formatStarCount } from '@/store/utils';

export const state = () => ({
  repositories: [],
  repository: {},
  query: '',
});

export const mutations = {
  setState: (state, { name, value }) => {
    state[name] = value;

    state.repositories.items.forEach(repo => {
      repo.pushed_at = formatTimeString(repo.pushed_at);
      repo.stargazers_count = formatStarCount(repo.stargazers_count);
    });
  },

  setRepository: (state, { repository }) => {
    state.repository = repository;

    state.repository.pushed_at = formatTimeString(state.repository.pushed_at);
    state.repository.stargazers_count = formatStarCount(
      state.repository.stargazers_count
    );
  },
};

export const actions = {
  fetchRepositories(state, { page, search }) {
    let url = '';
    if (search) {
      url = `https://api.github.com/search/repositories?q=stars:>0&sort=stars&q=${search}&type=Repositories&page=${page}&per_page=4`;
    } else {
      url = `https://api.github.com/search/repositories?q=stars:>0&sort=stars&type=Repositories&page=${page}&per_page=4`;
    }
    return axios
      .get(url)
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

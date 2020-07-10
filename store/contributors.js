import axios from 'axios';

export const state = () => ({
  contributors: [],
});

export const mutations = {
  setState: (state, { contributors }) => {
    state.contributors = contributors.slice(0, 10);
  },
};

export const actions = {
  fetchContributors(state, { fullName }) {
    return axios
      .get(`https://api.github.com/repos/${fullName}/contributors`)
      .then(res => {
        return state.commit('setState', { contributors: res.data });
      })
      .catch(err => console.log(err));
  },
};

export const getters = {
  getContributors(state) {
    return state.contributors;
  },
};

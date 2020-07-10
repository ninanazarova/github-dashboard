import axios from 'axios';
import yaml from 'yaml';

export const state = () => ({
  fullName: '',
  languages: [],
  colorsOfLanguages: {},
});

export const mutations = {
  setState: (state, { languages }) => {
    languages = Object.keys(languages);

    state.languages = languages.length > 5 ? languages.slice(0, 5) : languages;
  },

  setColors: (state, { data }) => {
    const obj = yaml.parse(data);
    state.colorsOfLanguages = obj;
  },
};

export const actions = {
  fetchLanguages(state, { fullName }) {
    return axios
      .get(`https://api.github.com/repos/${fullName}/languages`)
      .then(res => {
        return state.commit('setState', { languages: res.data });
      })
      .catch(err => console.log(err));
  },

  fetchcColorsOfLanguages(state) {
    return axios
      .get(
        'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml'
      )
      .then(res => {
        return state.commit('setColors', { data: res.data });
      });
  },
};

export const getters = {
  getLanguages(state) {
    return state.languages;
  },

  getColors(state) {
    return state.colorsOfLanguages;
  },
};

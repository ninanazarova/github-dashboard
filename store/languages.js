// import axios from 'axios';

// export const state = () => ({
//   fullName: '',
//   languages: [],
// });

// export const mutations = () => ({
//   setState: (state, { languages }) => {
//     return (state.languages = languages);
//   },
// });

// export const actions = () => ({
//   fetchLanguages(state, { fullName }) {
//     return axios
//       .get(`https://api.github.com/repos/${fullName}/languages`)
//       .then(res => {
//         return state.commit('setState', { languages: res.data });
//       });
//   },
// });

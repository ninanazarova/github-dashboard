import yaml from 'yaml';

export const useLanguagesStore = defineStore('languages', {
  state: () => ({
    fullName: '',
    languages: [],
    colors: {},
    loading: false,
    error: null,
  }),
  actions: {
    async fetchLanguages(fullName) {
      try {
        this.loading = true;
        const response = await fetch(
          `https://api.github.com/repos/${fullName}/languages`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch Languages');
        }
        const data = await response.json();

        this.languages = data.length > 5 ? data.slice(0, 5) : data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchColors() {
      try {
        this.loading = true;
        const response = await fetch(
          'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch Language Colors');
        }
        const data = await response.json();
        const obj = yaml.parse(data);
        this.colors = obj;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    getLanguages: (state) => state.languages,
    getColors: (state) => state.colors,
  },
});

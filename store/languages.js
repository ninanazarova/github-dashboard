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
          throw new Error(
            `Failed to fetch Languages. Error: ${response.status}`
          );
        }
        const data = await response.json();

        this.languages =
          Object.keys(data).length > 5
            ? Object.fromEntries(Object.entries(data).slice(0, 5))
            : data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchColors() {
      if (Object.keys(this.colors).length !== 0) {
        return;
      }
      try {
        this.loading = true;
        const response = await fetch(
          'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml'
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch Language Colors. Error: ${response.status}`
          );
        }

        const data = await response.text();

        this.colors = yaml.parse(data);
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

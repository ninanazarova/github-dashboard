export const useContributorsStore = defineStore('contributors', {
  state: () => ({
    contributors: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchContributors(fullName) {
      try {
        this.loading = true;
        const response = await fetch(
          `https://api.github.com/repos/${fullName}/contributors`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch Contributors');
        }
        const data = await response.json();
        this.contributors = data.slice(0, 10);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    getContributors: state => state.contributors,
  },
});

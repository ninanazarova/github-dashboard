import { formatTimeString, formatStarCount } from '@/store/utils';

export const useRepositoriesStore = defineStore('repositories', {
  state: () => ({
    repositories: [],
    repository: {},
    query: '',
    loading: false,
    error: null,
  }),
  actions: {
    async fetchRepositories({ page, search = '' }) {
      const url = new URL('https://api.github.com/search/repositories');

      const params = new URLSearchParams({
        type: 'Repositories',
        q: 'stars:>0',
        sort: 'stars',
        page: page || 1,
        per_page: 4,
      });
      if (search) params.append('q', search);

      url.search = params.toString();

      try {
        this.loading = true;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch Repositories');
        }
        const data = await response.json();

        //TODO remove 'repositories.items'
        this.repositories = data;
        this.repositories.items.forEach((repo) => {
          repo.pushed_at = formatTimeString(repo.pushed_at);
          repo.stargazers_count = formatStarCount(repo.stargazers_count);
        });
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchRepository(fullName) {
      try {
        this.loading = true;
        const response = await fetch(`https://api.github.com/repos${fullName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Repository');
        }
        const data = await response.json();
        this.repository = data;

        this.repository.pushed_at = formatTimeString(this.repository.pushed_at);
        this.repository.stargazers_count = formatStarCount(
          this.repository.stargazers_count
        );
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    getRepositories: (state) => state.repositories,
    getRepository: (state) => state.repository,
  },
});

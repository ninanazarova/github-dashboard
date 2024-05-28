import {
  useRepositoriesStore,
  useContributorsStore,
  useLanguagesStore,
} from '~/store';

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: [
        useRepositoriesStore($pinia),
        useContributorsStore($pinia),
        useLanguagesStore($pinia),
      ],
    },
  };
});

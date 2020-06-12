<template>
  <main class="repository">
    <panel class="repository__panel">
      <h1 class="repository__name">Repository Name</h1>

      <ul class="repository__lang-list lang-list">
        <li class="lang-list__item">Vue</li>
        <li class="lang-list__item">JS</li>
        <li class="lang-list__item">Go</li>
      </ul>

      <div class="repository__information">
        <div class="repository__data-container">
          <star-counter class="repository__star-counter" />
          <commit-date class="repository__commit-date" />
        </div>
        <p class="repository__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

      <div class="repository__owner">
        <h2 class="repository__owner-title">Owner:</h2>
        <img
          class="repository__owner-photo"
          src="https://avatars2.githubusercontent.com/u/64554655?s=400&u=f389bb072d735467e297cbca33dcc0f91c380059&v=4"
        />
        <p class="repository__owner-name">Nina Nazarova</p>
        <a class="repository__owner-link" href="https://github.com">GitHub</a>
      </div>
    </panel>

    <ul class="repository__contributors">
      <li class="repository__contributor">
        <a href="https://github.com/">Contributor 1</a>
      </li>
      <li class="repository__contributor">
        <a href="https://github.com/">Contributor 2</a>
      </li>
      <li class="repository__contributor">
        <a href="https://github.com/">Contributor 3</a>
      </li>
      <li class="repository__contributor">
        <a href="https://github.com/">Contributor 4</a>
      </li>
      <li class="repository__contributor">
        <a href="https://github.com/">Contributor 5</a>
      </li>
      <li class="repository__contributor">
        <a href="https://github.com/">Contributor 6</a>
      </li>
      <li class="repository__contributor">
        <a href="https://github.com/">Contributor 7</a>
      </li>
      <li class="repository__contributor">
        <a href="https://github.com/">Contributor 8</a>
      </li>
      <li class="repository__contributor">
        <a href="https://github.com/">Contributor 9</a>
      </li>
      <li class="repository__contributor">
        <a href="https://github.com/">Contributor 10</a>
      </li>
    </ul>
  </main>
</template>

<script>
import Panel from '@/components/Panel';
import StarCounter from '@/components/ui/StarCounter';
import CommitDate from '@/components/ui/CommitDate';
export default {
  components: {
    panel: Panel,
    'star-counter': StarCounter,
    'commit-date': CommitDate,
  },
};
</script>

<style scoped>
.repository__panel {
  max-width: 984px;
  margin: 80px auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 40px;
}

.repository__name {
}

.repository__lang-list {
  display: flex;
  align-items: center;
}

.lang-list {
  list-style: none;
  padding: 0;
}

.lang-list__item {
  margin-right: 8px;
}

.repository__data-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.repository__star-counter {
  padding-right: 8px;
  font-size: 20px;
  line-height: 1.5;
}

.repository__commit-date {
  padding: 0 8px;
  font-size: 20px;
  line-height: 1.5;
}

.repository__information {
  display: flex;
  flex-direction: column;
}

.repository__owner {
  display: flex;
  flex-direction: column;
}

.repository__owner-title {
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 10px;
}
.repository__owner-photo {
  width: 300px;
  max-height: auto;
}
</style>

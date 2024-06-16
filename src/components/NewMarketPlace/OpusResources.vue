<template>
  <div class="col-xs-12 content-padding mb-30">
    <div class="col-xs-12 header-main">Check out OPUS resources</div>
    <div class="col-xs-12 mb-30">
      Leverage our tools, training, and documents to create an organization-wide
      understanding of why HFE is required, how to effectively plan for HFE, and
      how to perform specific HFE activities.
    </div>
    <div
      class="d-flex justify-content-between xs-flex-column col-xs-12 pl-30 col-gap-10p"
    >
      <div
        v-for="resource in resources"
        :key="resource.id"
        class="d-flex flex-direction-column flex-item"
      >
        <h2>{{ resource.title }}</h2>
        <img
          :src="`/static/images/marketplace/${resource.title}.svg`"
          class="card-image mb-10"
        />
        <ul class="pl-30 mb-20">
          <li
            class="fw-300 font-18 text-secondary"
            v-for="info in resource.info"
            :key="info"
          >
            {{ info }}
          </li>
        </ul>
        <div class="align-self-start pl-30">
          <BaseButton @click="navigateToResource(resource.id)" size="lg">{{
            resource.button_text
          }}</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '../UIComponents/BaseButton.vue';

export default {
  name: 'OpusResources',
  components: {
    BaseButton
  },
  props: {
    resources: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    navigateToResource(id) {
      let link;
      if (id === 1) link = 'tool';
      else if (id === 2) link = 'training';
      else if (id === 3) link = 'document';
      this.$router.push({
        name: 'Resources',
        params: {
          name: link,
          id
        }
      });
    },
  }
};
</script>

<style scoped>
.col-gap-10p {
  column-gap: 1%;
}

.content-padding {
  padding: 30px 30px 24px 40px;
}

img {
  width: 100%;
}

.align-self-start {
  margin-top: auto;
  align-self: flex-start;
}

.flex-item {
  flex: 0 0 30%;
}

.card-image {
  min-width: 245px;
}

@media only screen and (max-width: 800px) {
  .xs-flex-column {
    flex-direction: column;
    row-gap: 40px;
  }
}
</style>

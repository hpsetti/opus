<template>
  <div class="col-xs-12 p-0">
    <template v-if="resourceName === 'tool'">
      <tools :userId="userId"></tools>
    </template>
    <template v-else-if="resourceName === 'training'">
      <trainings :userId="userId"></trainings>
    </template>
    <template v-else-if="resourceName === 'document'">
      <documents :userId="userId"></documents>
    </template>
    <template v-else-if="resourceName === 'consulting'">
      <consultings :userId="userId"></consultings>
    </template>
  </div>
</template>

<script>
import Tools from './Tools/Tools.vue';
import Trainings from './Trainings/Trainings.vue';
import Documents from './Documents/Documents.vue';
import Consultings from './Consultings/Consultings.vue';

export default {
  props: ['userId'],
  data() {
    return {
      resourceName: null
    };
  },
  components: {
    Consultings,
    Documents,
    Trainings,
    Tools
  },
  created() {
    this.resourceName = this.$route.params.name;
  }
};
</script>

<style scoped></style>

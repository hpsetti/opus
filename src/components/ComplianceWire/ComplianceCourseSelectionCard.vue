<template>
  <div
    class="selection-card d-flex flex-direction-column align-items-center"
    :class="{
      selected: selected,
      'has-shadow': hasShadow,
    }"
    @click="$emit('selected', type)"
  >
    <img
      class="icon-container"
      :src="content[type].path"
      alt="Course Selection Card Header Image"
    />
    <div class="text-subtitle-3 blue-1">{{ content[type].title }}</div>
    <div class="text-body-light black-2 mt-20 margin-bottom-auto text-center">
      {{ content[type].desc }}
    </div>
    <div class="text-button-label-2 blue-1">{{ `$${price}` }}</div>
  </div>
</template>

<script>
export default {
  name: 'CourseSelectionCard',
  props: {
    /**
     * Select course type
     */
    type: {
      type: String,
      required: true,
      validator: (t) => ['live', 'prerec', 'bundle'].includes(t),
    },
    /**
     * Set the price of the course
     */
    price: {
      type: Number,
      required: true,
    },
    /**
     * show selected border around the card?
     */
    selected: {
      type: Boolean,
      default: false,
    },
    /**
     * show shadow around the card?
     */
    hasShadow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      content: {
        live: {
          title: 'Instructor-Led Training',
          path: '/static/images/icons/ilt/live.svg',
          desc: 'Includes access to one live instructor-led training course at your selected time',
        },
        prerec: {
          title: 'Pre-recorded Course',
          path: '/static/images/icons/ilt/pre-recorded.svg',
          desc: 'Includes access to a pre-recorded selected course for 60 days',
        },
        bundle: {
          title: 'Bundle',
          path: '/static/images/icons/ilt/live.svg',
          desc: 'Includes access to 1 live instructor-led training course as well as a selected course',
        },
      },
    };
  },
};
</script>

<style>
.selection-card {
  width: 228px;
  height: 324px;
  padding: 20px;
  border: 1px solid #d3d6d9;
  border-radius: 5px;
}
.selection-card.has-shadow {
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
}
.selection-card.selected {
  border: 3px solid #4c9e45;
}
.selection-card .icon-container {
  margin-top: 24px;
  margin-bottom: 54px;
}
</style>

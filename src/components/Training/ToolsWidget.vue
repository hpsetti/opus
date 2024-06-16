<template>
  <div class="RL_tile RL_mt-10 RL_mb-20">
    <div class="RL_text">
      Tool
      <span class="RL_flt-rt"
        ><img
          class="RL_mr-4"
          :src="`/static/images/icons/${projectPlan}_icon.svg`"
        />{{ projectPlan }}</span
      >
    </div>
    <div class="RL_wrkflw_wrapper">
      <div
        class="col-lg-2 col-sm-2 col-xs-2 col-md-2 RL_user-related RL_background_img"
      ></div>
      <div class="col-lg-10 col-sm-10 col-xs-10 col-md-10 RL_wrkflw_txt">
        <div class="RL_tile_header RL_mb-8">
          Use-Related Risk Analysis Table Wizard
        </div>
        <div class="RL_tile_text RL_mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin
          etiam nec, scelerisque nulla. Consequat, nunc neque id sed. Augue diam
          luctus nec dictum eget lacus nullam enim. Sit dui amet nunc id
          interdum faucibus hac faucibus.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['projectPlan'],
  data() {
    return {};
  }
};
</script>
<style scoped></style>

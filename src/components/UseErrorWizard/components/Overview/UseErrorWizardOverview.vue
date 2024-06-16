<template>
  <div class="UseErrorWizardOverview">
    <div class="intro">
      <div class="intro__header text-subtitle-1">Intro</div>
      <div class="intro__content content text-regular-large mt-5">
        The goal of use-related risk analysis is to identify use errors (aka
        mistakes) that could occur when a user interacts the product. The FDA
        and other regulators require manufacturers to complete a comprehensive
        analysis of use-related risks. Regulators expect manufacturers to
        identify potential use errors, determine which use errors can lead to
        serious harm, and then implement design-based mitigations to prevent (or
        reduce the likelihood of) use errors. Each organization has its own Risk
        Management process. As such, there is a need to ensure your use-related
        risk analysis satisfies both your internal processes and the FDA without
        requiring much additional work. This OPUS tool helps you ensure your
        use-related risk analysis includes content that aligns with ISO 14971 as
        well as FDA’s expectations.
      </div>
    </div>
    <div class="full-opus-urra-template mt-25">
      <div class="full-opus-urra-template__header text-subtitle-1">
        Full OPUS URRA template
      </div>
      <div
        class="full-opus-urra-template__content content text-regular-large mt-5"
      >
        This is a template for documenting a thorough use-related risk analysis
        that meets both the content requirements of ISO 14971 as well as the
        FDA. We suggest using this template for completing your use-related risk
        analysis.
      </div>
    </div>

    <div class="fda-template">
      <div class="fda-template__content content text-regular-large mt-25">
        <div class="fda-template__header text-subtitle-1">
          2022 FDA template
        </div>
        This is a template for documenting the use-related risk analysis content
        required by FDA, as described in their draft guidance released in
        December 2022. When submitting to the FDA, we suggest presenting your
        use-related risk information following this template.
      </div>
      <img
        src="/static/images/icons/useErrorWizardTool/2022_FDA_Template_Table_2.svg"
        class="mt-15"
      />
    </div>
    <div class="purchase-complete-opus-urras mt-25">
      <div class="purchase-complete-opus-urras__header">
        <div class="text-subtitle-1 mb-10">Purchase complete OPUS URRAs</div>
      </div>
      <div class="overviewCards">
        <OverviewCard :userInfo="userInfo" />
      </div>
    </div>
  </div>
</template>
<script>
import OverviewCard from './components/OverviewCard.vue';

export default {
  name: 'Overview',
  props: ['userInfo'],
  components: {
    OverviewCard
  }
};
</script>
<style scoped>
.UseErrorWizardOverview {
  padding-left: 57px;
  padding-right: 57px;
  padding-top: 25px;
}

.intro__content {
  width: 493px;
}

.content {
  width: 750px;
}
</style>

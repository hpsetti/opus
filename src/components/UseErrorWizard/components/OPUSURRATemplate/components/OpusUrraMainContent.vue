<template>
  <div class="tab-section">
    <UrraOpusTabs
      :tabs="
        Object.keys(content).includes('Practice') ? tabTypes : [tabTypes[0]]
      "
      @tabClickedEvent="urraOpusTabClicked"
    />
    <UseErrorPaymentMsg
      v-if="
        paid !== true &&
        subTabName !== 'Risk ID' &&
        subTabName !== 'Use scenarios'
      "
    />
    <div v-else>
      <div
        v-if="selectedTab === 'Instructions + Tips'"
        class="tab-section--content__container"
      >
        <div class="tab-section--content__definition">
          <h3 class="text-subtitle-1">Definition</h3>
          <p class="text-regular-large definition--content">
            {{ content.Definition }}
          </p>
          <h3 v-if="content.SampleUseNumbers" class="text-subtitle-1">
            Sample
            {{
              subTabName === 'Risk ID'
                ? 'risk numbers'
                : subTabName.toLowerCase()
            }}:
          </h3>
          <ul class="pl-30">
            <li v-for="(item, i) in content.SampleUseNumbers" :key="i">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="tab-section--content__tips">
          <h3 class="text-subtitle-1">Tips</h3>
          <p v-if="content.Tips" class="text-regular-large tips--content">
            {{ content.Tips }}
          </p>
          <div
            class="tips--content"
            v-else-if="content.Tipscontent"
            v-html="content.Tipscontent[0]"
          ></div>
        </div>
        <div
          v-if="content.Tablecontent"
          v-html="content.Tablecontent[0]"
          class="useError--content"
        ></div>
      </div>
      <div
        v-if="
          Object.keys(content).includes('Practice') &&
          selectedTab === 'Practice'
        "
      >
        <UseErrorPracticeTemplate
          :practice="content.Practice"
          :urraName="subTabName"
          :key="subTabName"
        />
      </div>
    </div>
  </div>
</template>
<script>
import UseErrorPaymentMsg from '../../UseErrorPaymentMsg.vue';
import UseErrorPracticeTemplate from '../../UseErrorPracticeTemplate.vue';
import UrraOpusTabs from './UIComponents/UrraOpusTabs.vue';

export default {
  name: 'OpusUrraMainContent',
  props: ['subTabName', 'paid', 'activeParentTab', 'useErrorContent'],
  components: {
    // OpusTabs,
    UseErrorPaymentMsg,
    UseErrorPracticeTemplate,
    UrraOpusTabs
  },
  data() {
    return {
      selectedTab: 'Instructions + Tips',
      tabTypes: ['Instructions + Tips', 'Practice'],
      content: {}
    };
  },

  watch: {
    useErrorContent(e) {
      this.useErrorContent = e;
    },
    activeParentTab(e) {
      this.activeParentTab = e;

      if (e !== 'Overview') {
        this.content =
          this.useErrorContent[this.activeParentTab][this.subTabName];
      }
    },
    subTabName(e) {
      if (this.activeParentTab !== 'Overview') {
        this.content = this.useErrorContent[this.activeParentTab][e];
      }
    }
  },
  mounted() {
    if (this.activeParentTab !== 'Overview') {
      this.content =
        this.useErrorContent[this.activeParentTab][this.subTabName];
    }
  },
  methods: {
    urraOpusTabClicked(e) {
      this.selectedTab = e;
    }
  }
};
</script>
<style scoped>
.tab-section {
  padding-top: 30px;
  padding-left: 58px;
  padding-right: 24px;
  padding-bottom: 85px;
}

.definition--content,
.tips--content,
.useError--content >>> .table-container--content,
.useError--content >>> .table-text {
  max-width: 750px;
}

.useError--content >>> .table_container {
  margin-top: 32px;
}

.useError--content >>> table,
.useError--content >>> th,
.useError--content >>> td {
  border: 1px solid grey;
  padding: 7.5px 16px 7.5px 16px;
}

.useError--content >>> table tr th {
  background-color: #000000;
  color: #ffffff;
  padding: 7.5px 16px 7.5px 16px;
}
.useError--content >>> table.subTable {
  border: none;
}

.useError--content >>> table.subTable td.sub-custom-label-1 {
  border-top: none;
  border-right: none;
  border-left: none;
}

.useError--content >>> table.subTable td.sub-custom-label-2 {
  border: none;
}

.useError--content >>> table.subTable td.sub-custom-label-3 {
  border-left: none;
  border-right: none;
  border-bottom: none;
}
.mb-25 {
  margin-bottom: 25px;
}
</style>

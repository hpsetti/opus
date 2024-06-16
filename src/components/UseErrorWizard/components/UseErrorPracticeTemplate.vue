<template>
  <div class="UseErrorPracticeTemplate">
    <div class="useErrorPractice--selectProduct">
      <h3>{{ practice.dropdownContent.heading }}</h3>
      <opus-select
        v-if="urraName !== 'Hazardous situations'"
        style="width: 100%"
        v-model="activeItemList"
        :options="practice.dropdownContent.dropdownOptions"
        trackBy="id"
        :custom-label="customLabel"
        :placeholder="practice.dropdownContent.placeholder"
      >
      </opus-select>

      <multiselect
        v-if="urraName === 'Hazardous situations'"
        v-model="activeItemList"
        :placeholder="practice.dropdownContent.placeholder"
        :options="practice.dropdownContent.dropdownOptions"
        :option-height="104"
        :custom-label="customLabel"
        :show-labels="false"
        class="opus-multiselect"
      >
        <template slot="caret" slot-scope="{ toggle }">
          <img
            v-show="!$attrs.loading"
            @mousedown.prevent.stop="toggle()"
            class="icon"
            src="/static/images/icons/chevron_down_new.svg"
          />
        </template>
        <template slot="singleLabel">
          <p class="itemName--heading">{{ activeItemList.itemName }}</p>
          <ul
            v-if="activeItemList.itemName !== 'Select use errors and hazards'"
            class="itemName--list"
            style="padding-left: 30px"
          >
            <li>
              <b>Use error :</b> {{ activeItemList.subItemNames.useError }}
            </li>
            <li><b>Hazard :</b> {{ activeItemList.subItemNames.hazard }}</li>
          </ul>
        </template>
        <template slot="option" slot-scope="props">
          <p class="text-subtitle-1">{{ props.option.itemName }}</p>
          <ul
            v-if="props.option.itemName !== 'Select use errors and hazards'"
            class="itemName--list"
            style="padding-left: 30px"
          >
            <li><b>Use error :</b> {{ props.option.subItemNames.useError }}</li>
            <li><b>Hazard :</b> {{ props.option.subItemNames.hazard }}</li>
          </ul>
        </template>
      </multiselect>
    </div>
    <div class="useErrorPractice--quiz">
      <h3>{{ practice.textFieldContent.heading }}</h3>
      <div class="d-flex">
        <div class="useErrorPractice--exercise__quiz">
          <div class="excercise--content">
            <p>
              {{ practice.textFieldContent.subtitle }}
            </p>
          </div>
          <div
            v-if="urraName !== 'Hazardous situations'"
            class="excercise--text-fields opus-form"
          >
            <input
              type="text"
              class="form-control mt-30"
              v-model="answers.answerOne"
              :placeholder="practice.textFieldContent.placeholder"
            />
            <input
              type="text"
              class="form-control mt-25"
              v-model="answers.answerTwo"
              :placeholder="practice.textFieldContent.placeholder"
            />
            <input
              type="text"
              class="form-control mt-25"
              v-model="answers.answerThree"
              :placeholder="practice.textFieldContent.placeholder"
            />
          </div>
          <div
            v-if="urraName === 'Hazardous situations'"
            class="excercise--text-fields opus-form"
          >
            <textarea
              class="textarea form-control mt-25"
              :placeholder="practice.textFieldContent.placeholder"
            ></textarea>
          </div>
        </div>
        <div class="useErrorPractice--answers__quiz">
          <div
            class="answers--content d-flex justify-content-between align-items-center"
          >
            <p>
              Click View to compare your practice with examples from Emergo (not
              an exhaustive list).
            </p>
            <BaseButton
              variant="primary"
              @click="viewAnswers"
              :disabled="viewAnswersClicked"
              >View</BaseButton
            >
          </div>
          <div v-if="!viewAnswersClicked" class="answers--hide"></div>
          <div v-else class="answers--show">
            <ul
              v-for="(practiceItem, i) in practice.answersContent[
                activeItemList.itemName
              ]"
              :key="i"
            >
              <li>{{ practiceItem }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect';
import OpusSelect from '@/components/UIComponents/OpusSelect.vue';
import BaseButton from '@/components/UIComponents/BaseButton.vue';

export default {
  name: 'UseErrorPracticeTemplate',
  props: ['practice', 'urraName'],
  components: {
    OpusSelect,
    BaseButton,
    Multiselect
  },
  data() {
    return {
      activeItemList: {},
      viewAnswersClicked: false,
      answers: {}
    };
  },
  created() {
    [this.activeItemList] = this.practice.dropdownContent.dropdownOptions;
    this.viewAnswersClicked = false;
  },
  watch: {
    activeItemList(e) {
      if (e.id === 0) {
        this.viewAnswersClicked = true;
      } else {
        this.viewAnswersClicked = false;
      }
      this.answers = {};
    }
  },
  methods: {
    customLabel(option) {
      return `${option.itemName}`;
    },
    viewAnswers() {
      this.viewAnswersClicked = true;
    }
  }
};
</script>
<style scoped>
.opus-form {
  margin-top: 50px;
}
.form-control {
  width: 426px;
  height: 36px;
}

.useErrorPractice--exercise__quiz {
  margin-right: 24px;
  border-right: 1px solid black;
  width: 50%;
}

.useErrorPractice--answers__quiz {
  margin-right: 24px;
  margin-left: 24px;
  width: 50%;
}

.answers--content p {
  margin: 0;
  max-width: 255px;
}

.answers--hide {
  height: 165px;
  background-color: #f2f2f2;
  border-radius: 3px;
  margin-top: 25px;
}

.answers--show ul {
  list-style: none;
  padding-top: 20px;
}

.answers--show ul li {
  margin-bottom: 16px;
}

/* deep css styles */
.opus-multiselect.multiselect {
  height: auto !important;
}

.itemName--heading,
.itemName--list {
  font-size: 18px;
}

.textarea.form-control {
  resize: none;
  height: 150px;
}

.UseErrorPracticeTemplate >>> .opus-multiselect.sm .multiselect__tags {
  height: auto;
}
</style>

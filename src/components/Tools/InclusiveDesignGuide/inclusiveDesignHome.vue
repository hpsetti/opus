<template>
  <div class="content-wrappper">
    <div class="row welcome-banner mr-0">
      <div class="col-xs-12 p-0">
        <div class="col-xs-12 p-0 d-flex align-items-cemter mb-10">
          <img
            @click="navigateBack"
            class="cursor-pointer"
            src="/static/images/icons/chevron_left_white.svg"
            alt=""
          />
          <div class="welcome-common-header pl-25 fw-300">
            Inclusive Design Guide
          </div>
        </div>
        <div class="col-xs-12 pl-40">
          <div class="col-xs-12 col-md-10 col-lg-10 pl-0 font-18 fw-700 mb-5">
            Empower users in their product user journey
          </div>
          <div class="col-xs-12 pl-0 col-md-10 col-lg-7 font-14">
            This quick guide can help you create effective products for all types of users while considering educational level, race, gender, physical ability, and more.
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 pt-20 mt-20 pl-25">
      <div class="panel-group" id="plans-accordion1">
        <div class="panel wrapper-panel">
          <div class="panel-heading">
            <div
              class="panel-title cursor-pointer collapsed warning-title-heading"
              data-toggle="collapse"
              data-parent="#plans-accordion1"
              data-target="#inclusiveDesign"
            >
              <div class="d-flex align-items-center justify-content-between">
                <span class="text-h3">What is inclusive design?</span>
                <img
                  src="/static/images/icons/chevron_down_new.svg"
                  :class="!showCard['inclusiveDesign'] ? 'show-card' : 'hide-card'"
                />
              </div>
            </div>
          </div>
          <div id="inclusiveDesign" class="panel-collapse collapse">
            <div class="panel-body d-flex xs-direction-column">
              <div class=" d-flex flex-direction-column card-content pl-25">
                <p>Inclusive design considers ways to design user interfaces to ensure that 
                  they encompass the most complete set of potential user characteristics and circumstances. Design requirements can sometimes be based only on the most common, or average, attributes of the target users in an attempt to satisfy a large percentage of the population. Products can be made more inclusive through principles of accessibility, typically associated with accommodating common physical and cognitive disabilities. However, even designs that accommodate a wide swath of “average” users and those with known disabilities could still leave some intended users with unique characteristics and circumstances less likely or able to have a safe, effective, and satisfying user experience. Not only could entire groups of people be excluded from using a product, even a so called “average” user could be excluded from certain interactions due to their unique characteristics relative to specific scenarios.</p>
                <p>Inclusive design aims to understand those unique combinations of capabilities, perspectives, and circumstances that often cannot be captured in averages or common descriptions of user populations. When incorporated into a design, the goal is to enable the most potential users to equally recognize, understand, navigate, and work successfully with your design. The following are some key factors to consider when striving to make a more usable, accessible, and inclusive product.</p>
              </div>
              <div class=" image-section">
                <img src="/static/images/tools/inclusiveDesignGuideTool/inclusiveDesign-1.svg" alt="interactive-design-1"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 pl-25"><h2 class="text-h3">What to consider when designing inclusively</h2></div>
    <div class="col-xs-12  mt-10 pl-25">
      <div class="panel-group" id="plans-accordion2">
        <div class="panel wrapper-panel">
          <div class="panel-heading">
            <div
              class="panel-title cursor-pointer collapsed warning-title-heading"
              data-toggle="collapse"
              data-parent="#plans-accordion2"
              data-target="#accessibilityPrinciples"
            >
              <div class="d-flex align-items-center justify-content-between">
                <span class="text-h4">Accessibility principles</span>
                <img
                  src="/static/images/icons/chevron_down_new.svg"
                  :class="!showCard['accessibilityPrinciples'] ? 'show-card' : 'hide-card'"
                />
              </div>
            </div>
          </div>
          <div id="accessibilityPrinciples" class="panel-collapse collapse">
            <div class="panel-body d-flex xs-direction-column">
              <div class=" d-flex flex-direction-column card-content pl-25">
                <p>Accessibility is essential for ensuring that people with disabilities can access and use a system. It focuses on specific design accommodations and mitigations for those disabilities. The United States government provides design guidelines under the Americans with Disabilities Act (ADA) covering many aspects of facilities and fixtures that can be made to accommodate disabilities. For graphical user interfaces, the World Wide Web Consortium (W3C) provide guidelines that are widely regarded as the standard for web accessibility. Because accessibility focuses on disabilities, it subsequently encourages research and development on the specific needs of people with disabilities and optimizes solutions to meet those needs.</p>
                <p>Consider a user with a dexterity-related disability that is considered a comorbidity of their disease condition, attempting to administer their medication. If the medication is only administered via a pre-filled syringe, the user might not be physically capable of self-administering. The manufacturer will need to consider whether a different type of device (e.g., autoinjector) could be provided that is easier to manipulate with this condition, or if the medication could be taken in a different way (e.g., orally) to accommodate those individuals. That said, selecting an appropriate device (e.g., autoinjector) isn’t the only opportunity to create an inclusive product. Consider further opportunities to meet these users’ needs, such as ensuring the device is sufficiently light weight and limiting the activation button’s force such that even a user with limited hand strength can hold and interact with the device safely, confidently, and comfortably.</p>
              </div>
              <div class=" image-section">
                <img src="/static/images/tools/inclusiveDesignGuideTool/inclusiveDesign-2.svg" alt="interactive-design-1"/>
              </div>
            </div>
            <div class="panel-body d-flex xs-direction-column">
              <div class="tips-container">
            <div class="warning-card emergo-lightgreen-bg">
                <h3 class="warning-tip-text">Quick tips:</h3>
                <div class="ml-20">
                  <ul>
                    <li>For users with physical impairments, consider ways to make products light weight and easy to hold. This might include larger grip areas and wrist straps.</li>
<li>In general, try to avoid requiring interactions that require very fine motor skills and large forces, especially from the fingers.</li>
<li>Consider providing alternate ways to use the device or alternate treatment options.</li>
<li>For users with visual impairment (Level AAA under accessibility guidelines), legibility requires a contrast ratio of 7:1 for normal text and 4.5:1 for large text.</li>
<li>Provide captions, audio descriptions, or text transcript for media.</li>
<li>Allow for screen adjustments, determine the positions and ways in which a device is mounted and used, and ensure the display can be easily and correctly read.</li>
                  </ul>
                </div>
              </div>
              </div>
              <div class=" image-section">
                <img src="/static/images/tools/inclusiveDesignGuideTool/inclusiveDesignChart.svg" alt="interactive-design-1"/>
              </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12  mt-15 pl-25">
      <div class="panel-group" id="plans-accordion3">
        <div class="panel wrapper-panel">
          <div class="panel-heading">
            <div
              class="panel-title cursor-pointer collapsed warning-title-heading"
              data-toggle="collapse"
              data-parent="#plans-accordion3"
              data-target="#age"
            >
              <div class="d-flex align-items-center justify-content-between">
                <span class="text-h4">Advanced age</span>
                <img
                  src="/static/images/icons/chevron_down_new.svg"
                  :class="!showCard['age'] ? 'show-card' : 'hide-card'"
                />
              </div>
            </div>
          </div>
          <div id="age" class="panel-collapse collapse">
            <div class="panel-body d-flex xs-direction-column">
              <div class=" d-flex flex-direction-column card-content pl-25">
                <p>The conditions and circumstances of aging elderly populations vary widely, and like any user group, should be 
                  researched in detail when designing products for them. However, there are certain trends and natural processes that can be considered at a baseline level. As elderly further age, there can be natural declines in physical strength, dexterity, eyesight, hearing, and cognitive ability, all of which can inhibit effective interactions with a user interface. From a societal standpoint, the increased use of technology in healthcare might force older patients to use products they are unfamiliar with or in ways they are novel to them. Given that smartphone apps, connected devices, or wearables might be designed by people one to several generations younger than the end users, this could result in designs that bias towards a younger person’s (e.g., a “digital native’s”) technological understanding and comfort level. Care must be taken to ensure that designer’s do not overestimate an elderly user’s capabilities or familiarity with technology.</p>
              </div>
              <div class=" image-section">
                <img src="/static/images/tools/inclusiveDesignGuideTool/inclusiveDesign-3.svg" alt="interactive-design-1"/>
              </div>
            </div>
            <div class="panel-body d-flex xs-direction-column">
              <div class="tips-container">
            <div class="warning-card emergo-lightgreen-bg">
                <h3 class="warning-tip-text">Quick tips:</h3>
                <div class="ml-20">
                  <ul>
                    <li>Consider limiting the number of complex actions a user needs to take in order to better accommodate potential declines in memory and physical capability.</li>
<li>Limit a screen’s information density to both reduce the user’s cognitive load and limit the strain associated with visual searching and targeting.</li>
<li>Incorporate visual, tactile, and/or audible feedback to enhance user confidence during interactions with a device.</li>
<li>Packaging design should provide cues to help users recognize how to open the package, and the package should be easy to open.</li>
<li>Allow text to be enlarged on screen without the use of any special assistive technology.</li>
                  </ul>
                </div>
              </div>
              </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12  mt-15 pl-25">
      <div class="panel-group" id="plans-accordion4">
        <div class="panel wrapper-panel">
          <div class="panel-heading">
            <div
              class="panel-title cursor-pointer collapsed warning-title-heading"
              data-toggle="collapse"
              data-parent="#plans-accordion4"
              data-target="#healthLiteracy"
            >
              <div class="d-flex align-items-center justify-content-between">
                <span class="text-h4">Health literacy</span>
                <img
                  src="/static/images/icons/chevron_down_new.svg"
                  :class="!showCard['healthLiteracy'] ? 'show-card' : 'hide-card'"
                />
              </div>
            </div>
          </div>
          <div id="healthLiteracy" class="panel-collapse collapse ">
            <div class="d-flex xs-direction-column health-content-container">
              <div class="panel-body d-flex xs-direction-column flex-direction-column">
              <div class=" d-flex flex-direction-column card-content pl-25">
                <p>The range of medical competency varies from patient to patient. In design, consider limiting the use of medical jargon and accommodating multiple reading levels by firstly aiming to be as precise and concise as possible, then utilizing the FDA suggested reading level for instructions and medical device labeling of no greater than an 8th grade reading level, and possibly 4th to 5th grade reading level for medical information.</p>
              </div>
              <div class="tips-container-health">
            <div class="warning-card emergo-lightgreen-bg">
                <h3 class="warning-tip-text">Quick tips:</h3>
                <div class="ml-20">
                  <ul>
                    <li>Avoid use of jargon</li>
<li>Provide context-sensitive help</li>
<li>Make instructions easy to locate and identify</li>
<li>Provide feedback for interactions (i.e., confirming entries)</li>
                  </ul>
                </div>
              </div>
              </div>
            </div>
            <div class=" image-section">
                <img src="/static/images/tools/inclusiveDesignGuideTool/inclusiveDesign-4.svg" alt="interactive-design-1"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12  mt-15 pl-25">
      <div class="panel-group" id="plans-accordion5">
        <div class="panel wrapper-panel">
          <div class="panel-heading">
            <div
              class="panel-title cursor-pointer collapsed warning-title-heading"
              data-toggle="collapse"
              data-parent="#plans-accordion5"
              data-target="#culture"
            >
              <div class="d-flex align-items-center justify-content-between">
                <span class="text-h4">Culture</span>
                <img
                  src="/static/images/icons/chevron_down_new.svg"
                  :class="!showCard['culture'] ? 'show-card' : 'hide-card'"
                />
              </div>
            </div>
          </div>
          <div id="culture" class="panel-collapse collapse">
            <div class="panel-body d-flex xs-direction-column">
              <div class=" d-flex flex-direction-column card-content pl-25">
                <p>In considering your device’s audience, consider the numerous languages and backgrounds these users come from and are familiar with. Include the ability to change languages while still maintaining a well formatted and balanced user interface once that language changes.</p>
                <div class="tips-container-health">
            <div class="warning-card emergo-lightgreen-bg" style="margin-left:0px">
                <h3 class="warning-tip-text">Quick tips:</h3>
                <div class="ml-20">
                  <ul>
                    <li>Ensure that there is representation of all types of people by including racially diverse images</li>
<li>Provide access to language options</li>
<li>Ensure name entry fields do not exclude users with very short or long names (e.g., allow one-character name entries)</li>
<li>Include diverse individuals at every stage of the design process to ensure that you are considering all ideas and perspectives</li>
                  </ul>
                </div>
              </div>
              </div>
              </div>
              <div class="image-section">
                <img src="/static/images/tools/inclusiveDesignGuideTool/inclusiveDesign-5.svg" alt="interactive-design-5"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 mt-15 pl-25">
      <div class="panel-group" id="plans-accordion6">
        <div class="panel wrapper-panel">
          <div class="panel-heading">
            <div
              class="panel-title cursor-pointer collapsed warning-title-heading"
              data-toggle="collapse"
              data-parent="#plans-accordion6"
              data-target="#gender"
            >
              <div class="d-flex align-items-center justify-content-between">
                <span class="text-h4">Gender</span>
                <img
                  src="/static/images/icons/chevron_down_new.svg"
                  :class="!showCard['gender'] ? 'show-card' : 'hide-card'"
                />
              </div>
            </div>
          </div>
          <div id="gender" class="panel-collapse collapse">
            <div class="panel-body d-flex xs-direction-column">
              <div class=" d-flex flex-direction-column card-content pl-25">
                <p>Gender is a social construct and is generally based on the norms, behaviors, and societal roles expected of individuals based primarily on their sex. Sex is the biological difference between male, female, and intersex people. If a user interface is providing a choice for users, ensure to understand the difference between gender verses sex, gender expression, and understand the reason this information is needed. Avoid “othering” in multiple choice questionnaires (i.e., “male,” “female,” and “other”) and allows users to self-identify.</p>
                <div class="tips-container-health">
            <div class="warning-card emergo-lightgreen-bg" style="margin-left:0px">
                <h3 class="warning-tip-text">Quick tips:</h3>
                <div class="ml-20">
                  <ul>
                    <li>Use gender-inclusive and gender-neutral language</li>
<li>Allow users to select their pronouns</li>
<li>Avoid using gendered avatars or profile illustrations</li>
                  </ul>
                </div>
              </div>
              </div>
              </div>
              <div class="image-section">
                <img src="/static/images/tools/inclusiveDesignGuideTool/inclusiveDesign-6.svg" alt="interactive-design-6"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 mt-0 mb-20 pl-25">
      <!-- <div class="quick-tips">
        <h2 class="text-h4">Other quick tips in applying inclusive practices</h2>
        <div class="pl-15 pr-15">
        <p class="references-heading text-button-label">User interface</p>
        <ul class="references-list">
          <li class="references-list-item text-regular-large">
            Ensure color is not the only way of conveying information
          </li>
          <li class="references-list-item text-regular-large">
            Use of color is provided in adequate color contrast for majority of users
          </li>
          <li class="references-list-item text-regular-large">
            Provide full audio controls to pause, stop, or adjust volume
          </li>
          <li class="references-list-item text-regular-large">
            Ensure users can easily navigate, find content, and determine where they are
          </li>
        </ul>
      </div>
      <div class="pl-15 pr-15">
        <p class="references-heading text-button-label">Readability</p>
        <ul class="references-list">
          <li class="references-list-item text-regular-large">
            Pages have clear headings, make content easier to see and hear
          </li>
          <li class="references-list-item text-regular-large">
            Users are informed of current location within site or software
          </li>
          <li class="references-list-item text-regular-large">
            Avoid use of jargon
          </li>
        </ul>
      </div>
      </div> -->
      <div class="opusRecommendationLibraryCard--container">
        <h2 class="text-h4">Explore more tips and design considerations in the OPUS Design Recommendation Library</h2>
        <div><MarketPlaceTools :userId="userId" :toolName="'Design Recommendation Library'"/></div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import MarketPlaceTools from '../marketPlaceTools.vue';

export default {
  components: {
    MarketPlaceTools
  },
  data() {
    return {
      showCard: {
        inclusiveDesign: false,
        accessibilityPrinciples: false,
        age: false,
        healthLiteracy: false,
        culture:false,
        gender:false
      },
      userId:''
    };
  },
  created() {
    const userId = JSON.parse(localStorage.getItem('userId'));
    this.userId = userId
  },
  mounted() {
    Object.keys(this.showCard).forEach((key) => {
      $(`#${key}`).on('show.bs.collapse', () => {
        this.showCard[key] = true;
      });
      $(`#${key}`).on('hide.bs.collapse', () => {
        this.showCard[key] = false;
      });
    });
  },
  methods: {
    navigateBack() {
      this.$router.push('/tools');
    }
  }
};
</script>

<style scoped>
.font-14 {
  font-size: 14px;
}

.font-18 {
  font-size: 18px;
}
.fw-600 {
  font-weight: 600;
}

.warning-card {
  padding: 16px 24px 24px 24px;
  margin-left: 20px;
  margin-top: 10px;
  background: rgba(252, 226, 22, 0.15);
}
.safety-symbol-variations-standard {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: #333333;
}
.warning-tip-text {
  font-size: 18px;
  font-weight: 600;
}


.sub-heading {
  font-weight: 700;
  font-size: 18px;
}

.panel-heading .show-card {
  transform: rotate(0deg);
  transition: 0.5s;
}
.panel-heading .hide-card {
  transform: rotate(-180deg);
  transition: 0.5s;
}

/* Panel */

.panel.wrapper-panel {
  box-shadow: 0px 2px 7px rgb(0 0 0 / 25%);
  border-radius: 10px;
  margin-bottom: 10px;
}

.panel-group .panel {
  margin-bottom: 10px;
}

.panel-group {
  margin-bottom: 0px;
}

.panel-heading {
  padding-left: 24px;
}

.panel-title {
  width: 100%;
  font-size: 18px;
  /* color: #00518a; */
  padding: 0px;
}

.panel-body:before, .panel-title:after {
  content: unset;
}

.opusRecommendationLibraryCard--container h2 {
  max-width: 600px;
}
/* .panel-title:after {
  content: '\e6e0';
  font-family: 'element-icons';
  float: right;
  display: block;
  -webkit-transform: rotate(270deg);
  transform: rotate(270deg);
  color: black;
  font-weight: bolder;
} */

/* .panel-title.collapsed:after {
  content: '\e6e0';
  font-family: 'element-icons';
  display: block;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  color: black;
  font-weight: bolder;
} */
.panel-group .panel-heading + .panel-collapse > .panel-body {
  border-top: 0px !important;
}
.panel-body {
  padding: 15px 15px 15px 0px !important;
  column-gap: 60px;
}

.card-content {
  max-width: 830px;
}
.warning-title-heading {
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  /* color: #0b3c61; */
}

/* Panel */
.warning-img {
  width: 100%;
}
.warning-img-symbol {
  width: 90%;
}
.references-heading {
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #333333;
}

.tips-container {
  width: 830px;
  max-width: 100%;
}

.health-content-container {
  column-gap: 60px;
}

.tips-container-health {
  width: 100%;
}
.references-list {
  list-style-position: inside;
}
.references-list-item {
  color: #333333;
}

@media screen and (max-width: 767px) {
  .xs-direction-column {
    flex-direction: column;
    align-items: center;
  }
}
</style>

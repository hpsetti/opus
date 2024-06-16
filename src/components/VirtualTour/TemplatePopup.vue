<template>
  <div>
    <span @click="openWelcomePopup()" class="cursor-pointer"></span>
    <welcome-popup :currentTour="currentTour"></welcome-popup>
    <render-popup
      :roleId="roleId"
      :displayRep="displayRep"
      :playNextTour="playNextTour"
      :previousTour="previousTour"
      :currentTour="currentTour"
      :showSElink="showSElink"
      :tourObjectLength="tourObject.length"
      :tourIndex="tourIndex"
    ></render-popup>
    <success-popup></success-popup>
  </div>
</template>
<script>
import $ from 'jquery';
import WelcomePopup from './WelcomePopup.vue';
import RenderPopup from './RenderPopup.vue';
import { getOpusTour } from '../../apis/dashboard';
import SuccessPopup from './SuccessPopup.vue';
import EventBus from '../../utils/event-bus';

export default {
  components: {
    WelcomePopup,
    RenderPopup,
    SuccessPopup
  },
  props: ['displayRep', 'showSElink'],
  data() {
    return {
      roleId: 0,
      tourIndex: 0,
      displayTour: false,
      currentTour: {},
      tourObject: [
        {
          key: 0,
          type: 'Dashboard',
          title: 'Central hub to access top resources',
          content:
            '<ul class="item-container"><li>View the latest HFE news and insights</li>' +
            '<li>View your progress on Training courses and certificate </li><li>Jump to a specific step in the HFE Process</li></ul>',
          url: '/home',
          image: '/static/images/icons/side-bar/dashboard.svg',
          clickValue: 12
        },
        {
          key: 1,
          type: 'HFE Process',
          title: 'Your guide through the six steps of the HFE process',
          content:
            '<ul><li>View an overview of each step and an explanation of why the step is required by regulators </li>' +
            '<li>Explore a list of all recommended tasks and deliverables for each step </li><li>Access resources that help you complete each task, including training, tools, documents, and readings</li></ul>',
          url: '/opusprocess',
          clickValue: 67,
          image: '/static/images/icons/side-bar/hfe_process.svg'
        },
        {
          key: 2,
          type: 'Project Plans',
          title: 'Track your progress on projects you’ve added to OPUS',
          content:
            '<ul><li>Check off completed tasks and deliverables (see Example Project to give it a try)</li>' +
            '<li>View a summary of your progress or download a PDF to share with your project team </li><li>Access guidance on how to complete each task and deliverable expected by regulators </li></ul>',
          url: '/projectplans',
          clickValue: 125,
          image: '/static/images/icons/side-bar/project_plans.svg'
        },
        {
          key: 3,
          type: 'Training',
          title: 'Deepen knowledge on essential HFE activities',
          content:
            '<ul>' +
            '<li>Take 8 courses on foundational topics, like use-related risk analysis and usability testing</li>' +
            '<li>Earn a Certificate in Applying HFE to Medical Technology</li>' +
            '<li>Take 10 courses on advanced HFE methods</li>' +
            '</ul>',
          url: '/trainings',
          clickValue: 182,
          image: '/static/images/icons/side-bar/training.svg'
        },
        {
          key: 4,
          type: 'Documents',
          title: 'Produce high-quality HFE documentation efficiently',
          content:
            '<ul><li>Access templates for pivotal HFE documents, such as the HF Validation Test Protocol and HFE Report </li>' +
            '<li>Access complete user profiles, use environment descriptions, URRAs, KPAs, and IFUs </li><li>Ensure your documentation aligns with the latest regulatory expectations and industry best practices </li></ul>',
          url: '/documents',
          clickValue: 240,
          image: '/static/images/icons/side-bar/documents.svg'
        },
        {
          key: 5,
          type: 'Tools',
          title: 'Accelerate HFE decisions with productivity tools',
          content:
            '<ul>' +
            '<li>Identify and document a root cause</li>' +
            '<li>Determine the right scope for an HFE project or usability test</li>' +
            '<li>Evaluate a user interface and discover design recommendations</li>' +
            '</ul>',
          url: '/tools',
          clickValue: 298,
          image: '/static/images/icons/side-bar/tools.svg'
        },
        {
          key: 6,
          type: 'Consulting',
          title: 'Learn about consulting and coaching services',
          content:
            '<ul>' +
            '<li>Access coaching on specific HFE activities, like moderating usability tests and analyzing root causes</li>' +
            '<li>Solve a design challenge with our user interface designers</li>' +
            '<li>Identify opportunities to improve the application of HFE across your organization </li>' +
            '</ul>',
          url: '/consulting',
          clickValue: 353,
          image: '/static/images/icons/side-bar/consultings.svg'
        },
        {
          key: 7,
          type: 'Notifications',
          title: 'View messages about your activity',
          content:
            '<ul>' +
            '<li>Receive confirmation when a purchase is processed</li>' +
            '<li>Receive confirmation when a project is created</li>' +
            '<li>Receive messages about changes to your account</li>' +
            '</ul>',
          url: '/notifications',
          clickValue: 410,
          image: '/static/images/icons/side-bar/notification.svg'
        },
        {
          key: 8,
          type: 'Marketplace',
          title: 'Purchase premium resources and subscriptions',
          content:
            '<ul>' +
            '<li>Request a quote for an individual, team, or enterprise subscription</li>' +
            '<li>Purchase premium training courses</li>' +
            '<li>Purchase premium tools and documents</li>' +
            '</ul>',
          url: '/market-place/add-service/0',
          clickValue: 468,
          image: '/static/images/newMarketplace/basket.svg'
        },
        {
          key: 9,
          type: 'Contact Us',
          title: 'Get in touch with our team. We’re eager to hear from you!',
          content:
            '<ul><li>Let us know if you encounter a problem using OPUS or to share feedback on your experience </li>' +
            '<li>Ask us questions about HFE and applying it to your company’s product development efforts </li><li>Learn more about how our HFE consulting team can support you </li></ul>',
          url: '/contact',
          clickValue: 526,
          image: '/static/images/icons/side-bar/contact.svg'
        }
      ]
    };
  },
  methods: {
    openWelcomePopup() {
      this.tourIndex = 0;
      $('#modal_welcome').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      });
      this.currentTour = this.tourObject[this.tourIndex];
    },
    endTour() {
      $('#modal_accounts').modal('hide');
      this.emitter.emit('closeDrpDwnAccount');
      $('#modal_endtour').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    playNextTour() {
      if (this.tourIndex === this.tourObject.length - 1) {
        $('#modal_dashboard').modal('hide');
        this.currentTour = {};
        this.emitter.emit('openDrpDwnAccount');
        $('#modal_accounts').modal({
          backdrop: 'static',
          keyboard: false
        });
        this.endTour();
      } else {
        this.tourIndex += 1;
        this.currentTour = this.tourObject[this.tourIndex];
        this.emitter.emit('highlightNav', this.currentTour.url);
      }
    },
    previousTour() {
      if (this.tourIndex === 0 || this.tourIndex === -1) {
        $('#modal_dashboard').modal('hide');
        this.currentTour = {};
        this.emitter.emit('closeMobileSideBar');
        this.openWelcomePopup();
      } else if (this.tourIndex === this.tourObject.length) {
        $('#modal_dashboard').modal({
          backdrop: 'static',
          keyboard: false
        });
        $('#modal_accounts').modal('hide');
        this.emitter.emit('closeDrpDwnAccount');
      } else {
        this.tourIndex -= 1;
        this.currentTour = this.tourObject[this.tourIndex];
        this.emitter.emit('highlightNav', this.currentTour.url);
      }
    }
  },
  async mounted() {
    this.roleId = JSON.parse(localStorage.getItem('roleId'));
    const userId = JSON.parse(localStorage.getItem('userId'));
    const response = await getOpusTour(userId);
    if (response) {
      localStorage.setItem('tourId', JSON.stringify(response.id));
      if (response.new_user === true) {
        this.displayTour = true;
      } else {
        this.displayTour = false;
      }
    }
    this.emitter.on('displayTour', () => {
      this.openWelcomePopup();
    });
    if (this.displayTour) this.openWelcomePopup();
    this.emitter.on('openRender', () => {
      this.tourIndex = this.tourObject.length - 1;
      this.currentTour = this.tourObject[this.tourIndex];
      $('#modal_dashboard').modal({
        backdrop: 'static',
        keyboard: false
      });
      $('#modal_accounts').modal('hide');
      this.emitter.emit('closeDrpDwnAccount');
    });
  }
};
</script>

<style scoped></style>

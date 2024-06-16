<template>
  <div class="content-wrappper">
    <div class="row m-0">
      <div class="mt-20 pr-20 pl-20">
        <div
          class="col-xs-12 mb-10 d-flex align-items-center col-gap-10 mb-20 p-0"
        >
          <img
            @click="navigateToLaunchPad"
            class="back-img cursor-pointer"
            src="/static/images/icons/back_arrow.svg"
            alt=""
          />
          <router-link class="text-subtitle-2 blue-1" to="/launchpad"
            >Launchpad</router-link
          >
        </div>
        <div class="text-h3">Blocked Emails Domains</div>
      </div>
      <div class="d-flex justify-content-end col-gap-15 row-gap-10 flex-wrap pr-20">
        <BaseButton variant="secondary" has-icon @click="blockEmail">
          <img
            src="/static/images/icons/plus_icon_blue.svg"
            alt="Add Subcategory"
            class="preview-svg"
          />
          <span>Email Domains</span>
        </BaseButton>
      </div>
      <div class="text-subtitle-2 text-secondary mt-10 mb-10 ml-20">
        {{ items.length }} Mail Domains
      </div>
      <OpusTable
        id="manage-docs"
        class="docs-table"
        :items="items"
        :fields="fields"
        :currentPage="currentPage"
        :perPage="perPage"
      >
        <template #empty="">
          <span>No Mails found!</span>
        </template>
        <template #cell(path)="data">
          <img
            v-show="!isEmptyDoc(data.item)"
            src="/static/images/documents/doc_preview.svg"
            @click="downloadDoc(data.item.path, 'documents')"
          />
        </template>
        <template #cell(preview)="data">
          <img
            v-show="!isEmptyPreviewDoc(data.item)"
            src="/static/images/documents/doc_preview.svg"
            @click="downloadDoc(data.item.preview, 'preview')"
          />
        </template>
      </OpusTable>
      <div class="docs-pagination pt-20">
        <OpusPagination
          :total="items.length"
          :perPage.sync="perPage"
          :currentPage.sync="currentPage"
        ></OpusPagination>
      </div>
      <AddEmail></AddEmail>
      <loader :loadingStatus="loaderStatus"></loader>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import OpusTable from '../../UIComponents/OpusTable.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';
import Loader from '../../UIComponents/Loader.vue';
import OpusPagination from '../../UIComponents/OpusPagination.vue';
import AddEmail from './AddEmailPopup.vue'
import {
  getBlockedEmails
} from '../../../apis/emailBlock';
import EventBus from '../../../utils/event-bus';

export default {
  name: 'AdminEmailBlock',
  components: {
    OpusTable,
    OpusPagination,
    Loader,
    BaseButton,
    AddEmail
  },
  async created() {
    this.loaderStatus = true;
    this.emitter.on('getAllBlockedEmailList', () => {
      this.getBlockedList();
    });
    this.getBlockedList();
    this.loaderStatus = false;
  },
  data() {
    return {
      loaderStatus: false,
      items: [],
      /* eslint-disable object-curly-newline */
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'active', label: 'Status', sortable: true },
      ],
      menuOptions: [
        {
          key: 'replace-doc',
          icon: '/static/images/icons/edit_icon_new.svg',
          name: 'Edit',
          fn: this.openDocModal
        },
      ],
      perPage: 10,
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
    };
  },
  methods: {
    async getBlockedList() {
      this.items = await getBlockedEmails();
    },
    navigateToLaunchPad() {
      this.$router.push('/launchpad');
    },
    blockEmail() {
      this.type = 'new_role';
      this.header = 'Category';
      $('#block-email-popup').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
  }
};
</script>
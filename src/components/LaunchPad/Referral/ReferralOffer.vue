<template>
  <div class="content-wrappper">
    <div class="row m-0">
      <div>
        <OpusBreadCrumb class="mb-10" variant="sm" @click="navigateToLaunchPad"
          >Launchpad</OpusBreadCrumb
        >
        <div class="ml-20 text-h3">Referral Details</div>
      </div>
      <div class="text-subtitle-2 text-secondary mt-10 mb-10 ml-20">
        {{ items.length }} items
      </div>
      <OpusTable
        id="referral-list"
        :items="paginatedItems"
        :fields="fields"
      ></OpusTable>
      <Pagination
        :totalPages="totalPages"
        v-if="items.length"
        :total="items.length"
        :perPage="perPage"
        :currentPage="currentPage"
        @pagechanged="onPageChanged"
      ></Pagination>
      <loader :loadingStatus="loaderStatus"></loader>
    </div>
  </div>
</template>

<script>
import OpusBreadCrumb from '../../UIComponents/OpusBreadCrumb.vue';
import OpusTable from '../../UIComponents/OpusTable.vue';
import Loader from '../../UIComponents/Loader.vue';
import Pagination from '../Pagination.vue';
import { getReferTeamMember } from '../../../apis/team';

export default {
  name: 'ReferralOffer',
  components: {
    OpusTable,
    OpusBreadCrumb,
    Pagination,
    Loader
  },
  async created() {
    await this.getReferTeamMembers();
    this.paginateTeamMembers();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.perPage);
    }
  },
  data() {
    return {
      loaderStatus: false,
      items: [],
      paginatedItems: [],
      /* eslint-disable object-curly-newline */
      fields: [
        { key: 'id', name: 'User ID', label: 'User ID' },
        { key: 'name', name: 'Name', label: 'Name' },
        { key: 'email', name: 'Email', label: 'Email' },
        { key: 'company', name: 'Company', label: 'Company' },
        { key: 'account_id', name: 'Account ID', label: 'Accound ID' },
        { key: 'count', name: 'Active Count', label: 'Referral Count' }
      ],
      perPage: 10,
      currentPage: 1
    };
  },
  methods: {
    navigateToLaunchPad() {
      this.$router.push('/launchpad');
    },
    async getReferTeamMembers() {
      this.loaderStatus = true;
      this.items = await getReferTeamMember();
      this.loaderStatus = false;
    },
    onPageChanged(page) {
      this.currentPage = page;
      this.paginateTeamMembers();
    },
    paginateTeamMembers() {
      this.paginatedItems = this.items
        .slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        )
        .map((member) => ({
          id: member.refer_user_id,
          name: `${member.first_name} ${member.last_name}${
            !member.is_active ? ' (Deactivated)' : ''
          }`,
          email: member.email,
          company: member.company,
          count: member.active_count,
          account_id: member.account_id,
          trClass: `${!member.is_active ? 'text-italic text-disabled' : ''}`
        }));
    }
  }
};
</script>

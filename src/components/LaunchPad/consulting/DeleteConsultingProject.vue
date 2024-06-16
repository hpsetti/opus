<template>
  <div class="delete-project-container">
    <img
      src="/static/images/icons/close_icon.svg"
      class="cursor-pointer close-action"
    />
    <div class="">
      <p class="title">Are you sure you want to delete this project?</p>
      <p class="project-info mt-25 mb-0">Project name A</p>
      <p class="project-info mt-0 mb-0">useremail@company.com</p>
      <p class="project-info mt-0 mb-0">device type xx</p>
      <p class="delete-message mt-30">
        Deleting this project will remove it permanently from the database.
      </p>
      <div class="mt-40">
        <span class="cancel pt-10 pb-10 pl-20 pr-20">No, Cancel</span>
        <span class="ml-30 delete pt-10 pb-10 pl-20 pr-20">Yes, delete</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DeleteConsultingProject',
  props: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.delete-project-container {
  padding: 60px 60px 40px 60px;
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  position: relative;
  text-align: center;
}
.close-action {
  position: absolute;
  top: 20px;
  right: 20px;
}
.title {
  font-weight: 300;
  font-size: 24px;
  line-height: 33px;
  color: #333333;
}
.project-info {
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #333333;
}
.delete-message {
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: #333333;
}
.cancel {
  border: 1px solid #0b3c61;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #0b3c61;
}
.delete {
  background: #b00505;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #ffffff;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
}
</style>

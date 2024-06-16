import axios from 'axios';

/* eslint-disable comma-dangle */
export async function getInstructorTrainingList() {
  let data = [];
  const userId = JSON.parse(localStorage.getItem('userId'));
  const params = {
    userId
  };
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/ilt/online/courseList`, {
      params
    })
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Training dashboard api', err);
    });
  return data;
}
export async function getInstructorTrainingMarketList() {
  let data = [];
  const userId = JSON.parse(localStorage.getItem('userId'));
  const params = {
    userId
  };
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/instructorTraining/market/place/getAvailableTrainings`,
      { params }
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Training dashboard api', err);
    });
  return data;
}
/* export async function getInstructorCourseDetails(courseId) {
  let data = [];
  const userId = JSON.parse(localStorage.getItem('userId'));
  const params = {
    userId,
    courseId,
  };
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/instructorTraining/courseDetailsList`,
      { params }
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Course Detail api error', err);
    });
  return data;
} */
export async function getInstructorCourseDetails(planId, userId) {
  let data = [];
  // const userId = JSON.parse(localStorage.getItem('userId'));
  const params = {
    planId,
    userId
  };
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/ilt/courseDetailsList`, {
      params
    })
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Course Detail api error', err);
    });
  return data;
}

export async function getTimeSlortForCourseId(courseId) {
  let data = [];
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/instructorTraining/admin/timeSlot/byCourse/${courseId}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('TimeSlots For Selected courseId api error', err);
    });
  return data;
}

export async function getTimeSlotByCourseIdForUser(courseId) {
  let data = [];
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/instructorTraining/user/timeSlot/byCourse/${courseId}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('TimeSlots For users by course Id api error', err);
    });
  return data;
}

export async function getILTtrainingLatestActivity() {
  let data = [];
  const userId = JSON.parse(localStorage.getItem('userId'));
  const params = {
    userId
  };
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/ilt/getIltProgress`, { params })
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((error) => {
      console.log('ILT Latest Activity Api error', error);
    });
  return data;
}

export async function addNewTimeSlotForSelectedCourseId(body) {
  let data = [];
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/instructorTraining/add/timeSlot`,
      body
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      data = err.response.data;
      console.log('ILT Latest Activity Api error', err);
    });
  return data;
}

export async function deleteILTSlotBySlotId(slotId) {
  let data = [];
  await axios
    .delete(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/instructorTraining/delete/timeSlot/${slotId}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      data = err.response.data;
      console.log('ILT Delete Slot Api error', err);
    });
  return data;
}

export async function addToBookmark(courseId) {
  let data = {};
  const params = {
    courseId
  };
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/instructorTraining/bookmark`, {
      params
    })
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((error) => {
      data = error.response.data;
      console.log('ILT Latest Activity Api error', error);
    });
  return data;
}

export async function updateTimeSlot(body) {
  let data = {};
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/instructorTraining/updateCartTimeSlot`,
      body
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((error) => {
      data = error.response.data;
      console.log('ILT Update Time slot API error', error);
    });
  return data;
}

// NEW APIs
export async function getAllILTCourses(userId) {
  let result = {};
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/ilt/courseList?userId=${userId}`)
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get courses api error', err);
    });
  return result;
}

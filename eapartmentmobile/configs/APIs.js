import axios from "axios";

const BASE_URL = 'http://192.168.2.5:8000/';

// const BASE_URL = 'http://192.168.1.8:8000/';

// const BASE_URL = 'http://10.17.65.72:8000/';

export const endpoints = {
    'complaints': '/complaints/',
    'complaint-detail': (complaintId) => `/complaints/${complaintId}/`,
    'add_complaint': '/addcomplaints/',
    'upd_image': '/addcomplaints/upd_image/',
    'comments': (complaintId) => `/complaints/${complaintId}/comments/`,
    'update_comment': '/comments/',
    'ecabinet': "/users/ecabinets/",
    'items': (ecabinetId) => `/ecabinets/${ecabinetId}/items/`,
    'surveys': '/surveys/',
    'login': '/o/token/',
    'current_user': "/users/current_user/",
    'liked': (complaintId) => `/complaints/${complaintId}/like/`,
    'get_likes': (complaintId) => `/complaints/${complaintId}/get_likes/`, 
    'add_comment': (complaintId) => `/complaints/${complaintId}/add_comment/`,
    'tags': '/tags/',
    'carcards': '/users/carcards/',
    'carcard-detail': (carCardId) => `/carcards/${carCardId}/`
};

export const authAPI = (accessToken) =>
    axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `bearer ${
          accessToken === null
            ? AsyncStorage.getItem("access-token")
            : accessToken
        }`,
      },
    });
  

export default axios.create({
    baseURL: BASE_URL
});
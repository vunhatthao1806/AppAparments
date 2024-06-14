import axios from "axios";

const BASE_URL = 'http://192.168.2.8:8000/';

// const BASE_URL = 'http://192.168.1.8:8000/';

// const BASE_URL = 'http://10.17.65.72:8000/';

export const endpoints = {
    'get_user': '/users/',
    'user-detail': (userId) => `/admins/${userId}`,
    'lock': (userId) => `/admins/${userId}/update_active/`,
    'complaints': '/complaints/',
    'complaint-detail': (complaintId) => `/complaints/${complaintId}/`,
    'add_complaint': '/addcomplaints/',
    'upd_image': '/addcomplaints/upd_image/',
    'comments': (complaintId) => `/complaints/${complaintId}/comments/`,
    'update_comment': (commentId) => `/comments/${commentId}/`,
    'delete_comment': (commentId) => `/comments/${commentId}/`,
    'ecabinet': "/users/ecabinets/",
    'ecabinets': '/ecabinets/',
    'add_item': '/additem/',
    'phone_number': '/phonenumbers/',
    'items': (ecabinetId) => `/ecabinets/${ecabinetId}/items/`,
    'get_items': '/items/',
    'update_item': (itemId) => `/additem/${itemId}/`,
    'surveys': '/surveys/',
    'create_surveys': '/createsurveys/',
    'create_questions': (surveyId) => `/surveys/${surveyId}/create_questions/`,
    'choices': '/choices/',
    'login': '/o/token/',
    'current_user': '/users/current_user/',
    'liked': (complaintId) => `/complaints/${complaintId}/like/`,
    'get_likes': (complaintId) => `/complaints/${complaintId}/get_likes/`, 
    'add_comment': (complaintId) => `/complaints/${complaintId}/add_comment/`,
    'tags': '/tags/',
    'carcard': '/users/carcards/',
    'carcard-detail': (carCardId) => `/carcards/${carCardId}/`,
    'carcards': '/carcards/',
    'receipts': "/receipts/",
    'receipt-detail': (receiptid) => `/receipts/${receiptid}/`,
    "create-payment": "/payments/create-payment/",
    'tranferpayment': "/paymentdetails/",
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
import axios from "axios";

const BASE_URL = 'http://192.168.2.8:8000/';

// const BASE_URL = 'http://192.168.1.8:8000/';

// const BASE_URL = 'http://10.17.65.72:8000/';

export const endpoints = {
  'login': '/o/token/',

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
  'current_user': '/users/current_user/',
  'carcard': '/users/carcards/',

  'phone_number': '/phonenumbers/',

  'ecabinets': '/ecabinets/',
  'items': (ecabinetId) => `/ecabinets/${ecabinetId}/items/`,

  'get_items': '/items/',
  'update_item': (itemId) => `/additem/${itemId}/`,
  'add_item': '/additem/',

  'surveys': '/surveys/',
  'questions':(surveyId) => `/surveys/${surveyId}/questions/`,
  'get_choices':(questionId) => `/questions/${questionId}/choices/`,
  'create_surveys': '/createsurveys/',
  'create_questions': (surveyId) => `/surveys/${surveyId}/create_questions/`,
  'choices': '/choices/',
  'answers': '/answers/',
  'delete_answers': (answerId) => `/answers/${answerId}/`,


  'liked': (complaintId) => `/complaints/${complaintId}/like/`,
  'get_likes': (complaintId) => `/complaints/${complaintId}/get_likes/`, 
  'add_comment': (complaintId) => `/complaints/${complaintId}/add_comment/`,

  'tags': '/tags/',

  'carcards': '/carcards/',
  'carcard-detail': (carCardId) => `/carcards/${carCardId}/`,

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
import axios from "axios";

// const BASE_URL = 'http://192.168.2.5:8000/';

const BASE_URL = 'http://192.168.1.8:8000/';

// const BASE_URL = 'http://10.17.64.107:8000/';

export const endpoints = {
    'complaints': '/complaints/',
    'complaint-detail': (complaintId) => `/complaints/${complaintId}/`,
    'comments': (complaintId) => `/complaints/${complaintId}/comments/`,
    'ecabinets': (ecabinetId) => `/ecabinets/${ecabinetId}/`,
    'items': (ecabinetId) => `/ecabinets/${ecabinetId}/items/`,
    'surveys': '/surveys/',
    'login': '/o/token/'
};

export default axios.create({
    baseURL: BASE_URL
});
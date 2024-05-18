import axios from "axios";

const BASE_URL = 'http://192.168.2.5:8000/';

export const endpoints = {
    'complaints': '/complaints/',
    'complaint-detail': (complaintId) => `/complaints/${complaintId}/`,
    'comments': (complaintId) => `/complaints/${complaintId}/comments/`
};

export default axios.create({
    baseURL: BASE_URL
});
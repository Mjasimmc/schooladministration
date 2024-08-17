import { apiCall } from "../api";


export const fetchSchoolTeachers = async (params = null) => apiCall.get('school/list-teachers', params)
export const createTeacherService = async (data = null) => apiCall.post('school/create-teacher', data)
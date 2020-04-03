import axios from 'axios';
import cookie from 'js-cookie'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'http://' + location.hostname +':80/api'
  : 'http://localhost:8080/api';

export const searchable = () =>{
  return axios.get('/searchable').then(res => res.data);
};
export const getPaper = (id) =>{
  return axios.get('/paperDetail/'+ id).then(res => res.data);
};

export const search = (text, mode, pageNumber, sortMode, perPage) =>{
  return axios.get('/search/' + transfer(text) + '/' + mode + '?pageNumber=' + pageNumber + '&sortMode=' + sortMode + '&perPage=' + perPage).then(res => res.data);
};

export const getRank = (mode, pageNumber, descend, startYear, endYear) =>{
  return axios.get('/rank/' + mode + '?pageNumber=' + pageNumber + '&descend=' + descend + '&startYear=' + startYear + '&endYear=' + endYear).then(res => res.data);
};

export const login = (username, password, remember_me) =>{
  let data = {};
  return axios.post('/login?remember-me='+remember_me,{username:username,password:password}).then(res=>res.data);
};

export const logout = () => {
  return axios.post('/logout').then(res=>res.data);
};

export const getConfusedAlias = () => {
  let authorize = cookie.get('Authorization');
    return axios.get('/admin/getConfusedAlias', (authorize===undefined?'':{headers:{'Authorization': 'Bearer '+authorize}})).then(res=>res.data);
};

export const getAcademicEntity = (id, type) =>{
  return axios.get('/academic/'+ id + '?type=' + type).then(res=>res.data);
};


function transfer(text) {
  // if('/+/'.test(text)){
    text = text.replace(/%/g, '%25');
  // }
  // if('/ /'.test(text)){
    text = text.replace(/ /g, '%20');
  // }
  // if('/\//'.test(text)){
    text = text.replace(/\//g, '%2F');
  // }
  // if('/?/'.test(text)){
    text = text.replace(/\?/g, '%3F');
  // }
  // if('/%/'.test(text)){
    text = text.replace(/\+/g, '%2B');
  // }
  // if('/#/'.test(text)){
    text = text.replace(/#/g, '%23');
  // }
  // if('/&/'.test(text)){
    text = text.replace(/&/g, '%26');
  // }
  // if('/=/'.test(text)){
    text = text.replace(/=/g, '%3D');
  // }
  return text;
}

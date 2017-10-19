import { observable, action } from 'mobx';
import { createFetch } from '../utils/fetch-creator';
import Cookies from 'js-cookie';

class Store {
  @observable userInfo = { data: [] };
  @observable userList = [];
  @observable userFile = [];
  @observable curFileParents = [];
  @observable selected = [];

  @action
  getUserInfo = () => {
      return createFetch({
          url: 'user'
      })
          .then(data => {
              this.userInfo = data;
          })
          .catch(() => {
              Cookies.set('ct', '');
              process.env.NODE_ENV !== 'development' &&
          (window.location = '/login.html');
          });
  };
  @action
  getUserList = params => {
      return createFetch({
          url: 'users',
          params
      }).then(data => {
          if (data && data.data.users.length > 0) {
              this.userList = data.data.users;
          } else {
              this.userList = [];
          }
      });
  };
  @action
  getUserFile = (fi = '') => {
      return createFetch({
          url: 'files',
          method: 'get',
          params: {
              fc: 'personal',
              fi: fi,
              offset: 0,
              limit: 200
          }
      }).then(data => {
          this.userFile = data.data.files;
          if (data.data.parents) {
              this.setCurFileParents(data.data.parents);
          }
      });
  };
  @action
  setUserFile = data => {
      this.userFile = data;
  };
  @action
  setCurFileParents = data => {
      this.curFileParents = data;
  };
  @action
  setSelected = data => {
      this.selected = data;
  };
  @action
  viewFile = params => {
      return createFetch({
          url: '/file/view',
          params: {
              fc: 'personal',
              fi: params.fileid,
              fv: params.fileversion
          }
      });
  };
}

export default new Store();

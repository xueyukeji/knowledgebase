import { observable, action } from 'mobx';
import { createFetch } from '../utils/fetch-creator';

class Store {
  @observable knowledgeObj = { librarys: [] };
  @observable permissions = [];
  @observable knowledgeInfo = {};
  @observable curKnowledge = {};
  @observable isUserDialog = false;

  @action
  setCurLibrary = params => {
      this.curKnowledge = params;
  };

  @action
  getKnowledgeList = params => {
      createFetch({
          url: '/pub/librarys/v2',
          params
      }).then(data => {
          if (data.data) {
              this.setKnowledgeObj(data.data);
          } else {
              this.setKnowledgeObj(null);
          }
      });
  };

  @action
  getAdminKnowledgeList = params => {
      createFetch({
          url: 'pub/librarys/admin',
          params
      }).then(data => {
          if (data.data) {
              this.setKnowledgeObj(data.data);
          } else {
              this.setKnowledgeObj(null);
          }
      });
  };

  @action
  setKnowledgeObj = obj => {
      this.knowledgeObj = obj;
  };

  @action
  getKnowledgeInfo = params => {
      createFetch({
          url: 'pub/librarys',
          params: params
      }).then(data => {
          if (data.data && data.data.items.length) {
              this.setKnowledgeInfo(data.data.items);
          } else {
              this.setKnowledgeInfo(null);
          }
      });
  };

  @action
  setKnowledgeInfo = knowledge => {
      this.knowledgeInfo = knowledge;
  };

  @action
  creatKnowledge = params => {
      return createFetch({
          url: 'pub/librarys',
          method: 'post',
          body: params
      });
  };

  @action
  removeKnowledge = params => {
      return createFetch({
          url: 'pub/librarys/' + params + '/del',
          method: 'post'
      });
  };

  @action
  modifyKnowledge = params => {
      return createFetch({
          url: 'pub/librarys/' + params.id,
          method: 'post',
          body: params
      });
  };

  @action
  setUsers = params => {
      return createFetch({
          url: 'pub/librarys/' + params.id + '/users',
          method: 'post',
          body: {
              userIds: params.userIds
          }
      });
  };

  @action
  setExpert = params => {
      return createFetch({
          url: 'pub/librarys/' + params.id + '/professors',
          method: 'post',
          body: {
              professorIds: params.professorIds
          }
      });
  };

  @action
  setIsUserDiloag = params => {
      this.isUserDialog = params;
  };

  // 获取知识库的专家标签权限列表
  @action
  getPermissions = params => {
      createFetch({
          url: 'pub/librarys/' + params.id + '/permissions',
      }).then(data => {
          if (data.data) {
              this.permissions = data.data.permissions
          } else {
              this.permissions = []
          }
      });
  }

  // 管理员添加权限
  @action
  addPermission = params => {
      return createFetch({
          url: 'pub/librarys/' + params.id + '/add-permission',
          method: 'post',
          body: {
              professorId: params.professorId,
              tagId: params.tagId
          }
      })
  }
  // 管理员编辑权限
  @action
  editPermission = params => {
      return createFetch({
          url: 'pub/librarys/' + params.id + '/edit-permission',
          method: 'post',
          body: {
              professorId: params.professorId,
              tagId: params.tagId
          }
      })
  }
  // 管理员删除权限
  @action
  delPermission = params => {
      return createFetch({
          url: 'pub/librarys/' + params.id + '/del-permission',
          method: 'post',
          body: {
              professorId: params.professorId,
              tagId: params.tagId
          }
      })
  }
}

export default new Store();

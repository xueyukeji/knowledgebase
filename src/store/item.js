import { observable, action } from 'mobx';
import { createFetch } from '../utils/fetch-creator';

class Store {
  @observable itemListObj = { items: [] };
  @observable myConItemObj = { items: [] };
  @observable myAuditItem = { items: [] };
  @observable itemDetails = false; // 知识条目详情
  @observable searchInput = ''; // 知识条目搜索用到
  @observable searchTagIds = [];

  @action
  setSearchInput = str => {
      this.searchInput = str;
  };
  @action
  setSearchTagIds = arr => {
      this.searchTagIds = arr;
  };
  @action
  setItemList = obj => {
      this.itemListObj = obj;
  };
  @action
  getItemList = params => {
      createFetch({
          url: 'pub/items',
          params: params
      }).then(data => {
          if (data && data.data) {
              this.setItemList(data.data);
          } else {
              this.setItemList({ items: [] });
          }
      });
  };

  @action
  getUserItems = params => {
      createFetch({
          url: 'pub/users/items',
          params: params
      }).then(data => {
          if (data && data.data) {
              this.setUserItemList(data.data);
          } else {
              this.setUserItemList({ items: [] });
          }
      });
  };

  @action
  setUserItemList = obj => {
      this.myConItemObj = obj;
  };

  @action
  getItemDetail = itemId => {
      return createFetch({
          url: 'pub/items/' + itemId
      }).then(data => {
          if (data.data && data.data.item) {
              this.itemDetails = data.data.item;
          }
      });
  };

  @action
  createItem = params => {
      return createFetch({
          url: 'pub/items',
          method: 'post',
          body: params
      });
  };

  @action
  removeItem = params => {
      return createFetch({
          url: `pub/item/${params}/del`,
          method: 'post'
      });
  };

  @action
  modifyItem = params => {
      return createFetch({
          url: `pub/items/${params.id}`,
          method: 'post',
          body: params
      });
  };

  @action
  getAuditItem = params => {
      return createFetch({
          url: 'pub/items/audit',
          params: params
      }).then(data => {
          if (data && data.data) {
              this.setAuditItem(data.data);
          } else {
              this.setAuditItem({ items: [] });
          }
      });
  };

  @action
  setAuditItem = obj => {
      this.myAuditItem = obj;
  };
  // 条目增加浏览数/下载数
  // router.post('/pub/items/:id/downNum/update', item.updateItemNum);

  // :id => item的id
  // :field => viewNum or downNum
  @action
  updateItemNum = params => {
      return createFetch({
          url: 'pub/items/' + params.id + '/' + params.field + '/update',
          method: 'post',
          body: {
              id: params.id,
              field: params.field
          }
      })
  }

  @action
  downFile = fileId => {
      return createFetch({
          url: 'file/down',
          params: {
              fc: 'personal',
              fi: fileId
          }
      })
  }


}

export default new Store();

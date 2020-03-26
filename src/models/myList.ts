import { Reducer } from 'redux';
import { Effect } from 'dva';
import * as api from '@/services/myList';
export interface stateType {
  listData?: Array<any>;
  total?: number | string;
  errtext?: string | React.ReactNode;
}
export interface myListModelType {
  namespace: string;
  state: stateType;
  effects: {
    fetchMyList: Effect;
  };
  reducers: {
    listResource: Reducer<stateType>;
    fetcherror: Reducer<stateType>;
  };
  subscriptions: {};
}

const myListModel: myListModelType = {
  namespace: 'myList',

  subscriptions: {},

  state: {
    listData: [],
    total: 0,
    errtext: '',
  },

  effects: {
    *fetchMyList({ payload }, { call, put }) {
      const { success, total, data } = yield call(api.queryRule, payload) as any;
      if (success) {
        yield put({
          type: 'listResource',
          payload: {
            listData: data,
            total,
          },
        });
      } else {
        yield put({
          type: 'fetcherror',
          payload: {
            errtext: '获取失败',
          },
        });
      }
    },
  },

  reducers: {
    listResource(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    // 获取失败
    fetcherror(state, { payload }) {
      return {
        ...state,
        errtext: payload.errtext,
      };
    },
  },
};
export default myListModel;

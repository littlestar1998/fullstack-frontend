import { routerRedux } from 'dva/router';
import { Reducer } from 'redux';
import { Effect,Subscription } from 'dva';
import { message } from 'antd';
import {
  index,
  destroy,
  changeStatus,
  create,
  store,
  edit,
  save,
} from '@/services/action';
import { recharge } from '@/services/api';

export interface ModelType {
  namespace: string;
  state: {};
  subscriptions:{ setup: Subscription };
  effects: {
    index: Effect;
    destroy: Effect;
    changeStatus: Effect;
    create: Effect;
    store: Effect;
    edit: Effect;
    save: Effect;
    recharge: Effect;
  };
  reducers: {
    updateState: Reducer<{}>;
  };
}

const User: ModelType = {
  namespace: 'user',

  state: {
    msg : '',
    url : '',
    data : [],
    pagination : [],
    status : '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        //打开页面时，进行操作
        console.log('subscriptions');
      });
    },
  },

  effects: {
    *index({ payload, callback}, { put, call }) {
      const response = yield call(index,payload);
      if (response.status === 'success') {
        yield put({
          type: 'updateState',
          payload: response,
        });

        if (callback && typeof callback === 'function') {
          callback(response); // 返回结果
        }
      }
    },
    *destroy({ type, payload }, { put, call, select }) {
      const response = yield call(destroy,payload);
      // 操作成功
      if(response.status ==='success') {
        // 提示信息
        message.success(response.msg, 3);
      } else {
        message.error(response.msg, 3);
      }
    },
    *changeStatus({ type, payload }, { put, call, select }) {
      const response = yield call(changeStatus,payload);
      // 操作成功
      if(response.status ==='success') {
        // 提示信息
        message.success(response.msg, 3);
        // 页面状态
        yield put({
          type: 'updateState',
          payload: response,
        });
      } else {
        message.error(response.msg, 3);
      }
    },
    *create({ payload, callback }, { put, call, select }) {
      const response = yield call(create,payload);
      if (response.status === 'success') {
        yield put({
          type: 'updateState',
          payload: response,
        });

        if (callback && typeof callback === 'function') {
          callback(response); // 返回结果
        }
      }
    },
    *store({ type, payload }, { put, call, select }) {
      const response = yield call(store,payload);
      // 操作成功
      if(response.status ==='success') {
        // 提示信息
        message.success(response.msg, 3);
        // 页面跳转
        yield put(
          routerRedux.push({
            pathname: response.url
          })
        );

      } else {
        message.error(response.msg, 3);
      }
    },
    *edit({ payload, callback }, { put, call, select }) {
      const response = yield call(edit,payload);
      if (response.status === 'success') {
        yield put({
          type: 'updateState',
          payload: response,
        });

        if (callback && typeof callback === 'function') {
          callback(response); // 返回结果
        }
      }
    },
    *save({ type, payload }, { put, call, select }) {
      const response = yield call(save,payload);
      // 操作成功
      if(response.status ==='success') {
        // 提示信息
        message.success(response.msg, 3);
        // 页面跳转
        yield put(
          routerRedux.push({
            pathname: response.url
          })
        );

      } else {
        message.error(response.msg, 3);
      }
    },
    *recharge({ type, payload }, { put, call, select }) {
      const response = yield call(recharge,payload);
      // 操作成功
      if(response.status ==='success') {
        // 提示信息
        message.success(response.msg, 3);
        // 页面跳转
        yield put(
          routerRedux.push({
            pathname: response.url
          })
        );

      } else {
        message.error(response.msg, 3);
      }
    },
  },

  reducers: {
    updateState(state, action) {
      return {
        ...action.payload,
      };
    },
  },
};

export default User;

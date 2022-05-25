import Types from './types';

const addUserAction = (payload) => ({
  type: Types.ADD_USER,
  payload,
});

const fetchAllUsersAction = () => ({
  type: Types.FETCH_ALL_USERS,
});

const processAction = (type: string, payload: any) => ({
  type,
  payload,
});

export default{
  addUserAction,
  processAction,
  fetchAllUsersAction,
};

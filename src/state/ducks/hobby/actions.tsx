import Types from './types';

const addUserAction = (payload) => ({
  type: Types.ADD_HOBBY,
  payload,
});

export default{
  addUserAction,
};

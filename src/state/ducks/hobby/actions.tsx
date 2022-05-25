import Types from './types';

const fetchHobbyByUserId = (payload) => ({
  type: Types.GET_HOBBY,
  payload,
});

export default{
  fetchHobbyByUserId,
};

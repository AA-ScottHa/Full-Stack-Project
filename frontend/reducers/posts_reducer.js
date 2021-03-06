import { RECEIVE_SINGLE_USER } from '../actions/users_actions.js';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions.js';
import { DELETE_POST, CREATE_POST, UPDATE_POST, RECEIVE_POST } from '../actions/posts_actions.js';
import { CREATE_LIKE, DELETE_LIKE, RECEIVE_LIKES } from '../actions/likes_actions.js';

const initialState = {

};

const postsReducer = (state = initialState, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  let like;

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign(nextState, action.currentUser.posts);

    case RECEIVE_SINGLE_USER:
      return Object.assign(nextState, action.payload.posts);

    case CREATE_POST:
      return Object.assign(nextState, action.payload.posts);

    case UPDATE_POST:
      let postId = Object.keys(action.payload.posts)[0]
      nextState[postId] = action.payload.posts[postId];
      return nextState;

    case DELETE_POST:
      delete nextState[Object.keys(action.payload.posts)[0]];
      return nextState;

    case RECEIVE_POST:
      return Object.assign(nextState, action.payload.posts);

    case CREATE_LIKE:
      like = Object.values(action.payload)[0];
      nextState[like.post_id].likes.push(like.id);
      nextState[like.post_id].likers.push(like.liker_id);
      return nextState;

    case DELETE_LIKE:
      like = Object.values(action.payload)[0];
      nextState[like.post_id].likes = nextState[like.post_id].likes.filter(like_id => like_id !== like.id);
      nextState[like.post_id].likers = nextState[like.post_id].likers.filter(liker_id => liker_id !== like.liker_id);
      return nextState;

    case RECEIVE_LIKES:
      return Object.assign(nextState, action.payload.posts);
      
    default:
      return state;
  }
};

export default postsReducer;
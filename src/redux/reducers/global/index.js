const initialState = {
  categories: [],
  tags: [],
  posts: [],
  comments: [],
  rpcomments: [],
  likes: [],
};

//To Store the Actions
const global = (state = initialState, action) => {
  switch (action.type) {
    case "CATEGORY":
      return Object.assign({}, state, { categories: action.payload });
    case "TAG":
      return Object.assign({}, state, { tags: action.payload });
    case "POST":
      return Object.assign({}, state, { posts: action.payload });
    case "COMMENTS":
      return Object.assign({}, state, { comments: action.payload });
    case "RPCOMMENTS":
      return Object.assign({}, state, { rpcomments: action.payload });
    case "LIKES":
      return Object.assign({}, state, { likes: action.payload });
    default:
      return state;
  }
};

export default global;

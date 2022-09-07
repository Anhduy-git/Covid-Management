const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
		priority: null,
		token: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS_ADMIN":
		return {
			user: action.payload,
			priority: 0,
			token: action.token,
			isFetching: false,
			error: false,
		};
	case "LOGIN_SUCCESS_MANAGER":
		return {
			user: action.payload,
			priority: 1,
			token: action.token,
			isFetching: false,
			error: false,
		};
	case "LOGIN_SUCCESS_USER":
		return {
			user: action.payload,
			priority: 2,
			token: action.token,
			isFetching: false,
			error: false,
		};
    case "LOGIN_FAILURE":
      return {
        user: null,
		priority: null,
		token: null,
        isFetching: false,
        error: true,
      };	
    case "LOGOUT":
      return {
        user: null,
		priority: null,
		token: null,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default Reducer;

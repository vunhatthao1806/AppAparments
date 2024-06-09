const MyUserReducer = (currenState, action) => {
    switch (action.type) {
        case "login":
            return action.payload;
        case "logout":
            return null;
        case "updateFirstLogin":
            return {...currenState ,'first_login': false };
    }
    
    return currenState;
}

export default MyUserReducer;
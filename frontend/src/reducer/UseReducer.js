// export const initialState = null;

// export const reducer = (state, action) =>{
//     if (action.type === "USER") {
//         return action.payload;
//     }

//     return state;
// }

// retrieve the stored value
const storedUser = localStorage.getItem("user");

// set the initial state to the stored value, or to null if no value is found
export const initialState = storedUser ? JSON.parse(storedUser) : null;

export const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      // store the user information in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};
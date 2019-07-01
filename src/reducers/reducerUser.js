import { ADD_USER } from "../action/actionUser"

const initialState = {
    ListUser: []
  };

const reducerUser = (state=initialState, actionUser) => {
      switch (actionUser.type){
          case ADD_USER:
              console.log(actionUser.text)
              return Object.assign({}, state, {
                ListUser: state.ListUser.concat(actionUser.text)
              })
      }
      return state
  }

  export default reducerUser
export const reducer=(state,action)=>{
    switch (action.type){
        case "LOGIN_START":
            return{
               user:null,
               isfetching:true,
               error:false 
            }
        case "LOGIN_SUCCESS":
            return{
                user:action.payload,
                isfetching:false,
                error:false
            }
        case "LOGIN_FAILER":
            return{
               user:null,
               isfetching:false,
               error:true
            }
        case "FOLLOW":
            return{
               ...state,
               user:{
                ...state.user,
                 following:[...state.user.following,action.payload]
               }
            }
        case "UNFOLLOW":
            return{
                ...state,
                user:{
                  ...state.user,
                  following:state.user.following.filter((id)=>id!==action.payload)
                }
            }
       default:{
         return state
       }
        
    }
}
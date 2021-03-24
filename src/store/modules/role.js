import { getRole } from "../../request/role";
export default {
    namespaced:true,
    state(){
        return{
            roleList:[]
        }
    },
    mutations:{
        //初始化角色列表
        roleInit(state,data){
            state.roleList = data
            
        }
    },
    getters:{

    },
    actions:{
        //请求角色数据
        getRoleList({commit}){
            getRole().then(res=>{
                commit('roleInit',res.list)
            })
        }
    }
}
import { getUser,getTotal } from "../../request/user";
export default {
    namespaced:true,
    state(){
        return{
            userList:[],
            //管理员总数
            userTotal:0
        }
    },
    mutations:{
        //初始化管理员列表
        userInit(state,data){
            state.userList = data
        },
        //修改管理员总数
        setUserTotal(state,data){
            state.userTotal = data
        }
    },
    getters:{

    },
    actions:{
        //请求管理员数据
        getUserList({commit,dispatch},params){
            getUser(params).then(res=>{
                commit('userInit',res.list)
                dispatch('getUserTotal')
            })
        },
        //请求管理总数
        getUserTotal({commit}){
            getTotal().then(res=>{
                commit('setUserTotal',res.list[0].total)
            })
        }
    }
}
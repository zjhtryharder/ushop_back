import { getMenu } from "../../request/menu";
export default {
    namespaced:true,
    state(){
        return{
            menuList:[]
        }
    },
    mutations:{
        //初始化菜单列表
        menuInit(state,data){
            state.menuList = data
            
        }
    },
    getters:{

    },
    actions:{
        //请求菜单数据
        getMenuList({commit}){
            getMenu().then(res=>{
            // console.log(res.list);
                commit('menuInit',res.list)
            })
        }
    }
}
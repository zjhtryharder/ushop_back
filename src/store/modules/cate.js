import { getCate } from "../../request/cate";
export default {
    namespaced:true,
    state(){
        return{
            cateList:[]
        }
    },
    mutations:{
        //初始化分类列表
        cateInit(state,data){
            state.cateList = data
            
        }
    },
    getters:{

    },
    actions:{
        //请求分类数据
        getCateList({commit}){
            getCate().then(res=>{
                commit('cateInit',res.list)
            })
        }
    }
}
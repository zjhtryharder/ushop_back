import { getSpecs,getTotal,getAllSpecs} from "../../request/specs";
export default {
    namespaced:true,
    state(){
        return{
            specsList:[],
            //管理员总数
            specsTotal:0,
            specsAllList:[]
        }
    },
    mutations:{
        //初始化规格列表
        specsInit(state,data){
            state.specsList = data
        },
        //修改规格总数
        setSpecsTotal(state,data){
            state.specsTotal = data
        },
        specsAllList(state,data){
            state.specsAllList = data
        }
    },
    getters:{

    },
    actions:{
        //请求规格数据
        getSpecsList({commit,dispatch},params){
            getSpecs(params).then(res=>{
                commit('specsInit',res.list)
                dispatch('getSpecsTotal')
            })
        },
        //请求规格总数
        getSpecsTotal({commit}){
            getTotal().then(res=>{
                commit('setSpecsTotal',res.list[0].total)
                getAllSpecs(res.list[0].total).then(res=>{
                    commit('specsAllList',res.list)
                })
            })
        }
    }
}
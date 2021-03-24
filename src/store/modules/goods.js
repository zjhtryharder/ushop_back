import { getGoods,getTotal } from "../../request/goods";
export default {
    namespaced:true,
    state(){
        return{
            goodsList:[],
            //商品总数
            goodsTotal:0
        }
    },
    mutations:{
        //初始化商品列表
        goodsInit(state,data){
            state.goodsList = data
        },
        //修改商品总数
        setGoodsTotal(state,data){
            state.goodsTotal = data
        }
    },
    getters:{

    },
    actions:{
        //请求商品数据
        getGoodsList({commit,dispatch},params){
            getGoods(params).then(res=>{
                commit('goodsInit',res.list)
                dispatch('getGoodsTotal')
            })
        },
        //请求管理总数
        getGoodsTotal({commit}){
            getTotal().then(res=>{
                commit('setGoodsTotal',res.list[0].total)
            })
        }
    }
}
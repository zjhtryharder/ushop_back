import axios from '../utils/http'


//请求商品 列表
export function getGoods(params){
    let res = axios.get('/goodslist',{params:params})
    return res
}
//请求商品 列表总条目
export function getTotal(){
    let res = axios.get('/goodscount')
    return res
}
//添加商品 
export function addGoods(data){
    let res = axios.post('/goodsadd',data)
    return res
}

//编辑商品 
export function editGoods(data){
    let res = axios.post('/goodsedit',data)
    return res
}

//删除商品 
export function delGoods(id){
    let res = axios.post('/goodsdelete',{id:id}) //data是个对象 ，所以这里要用对象里的属性
    return res
}
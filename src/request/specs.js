import axios from '../utils/http'

//请求规格 列表
export function getSpecs(params){
    let res = axios.get('/specslist',{params:params})
    return res
}

export function getAllSpecs(total){
    let res = axios.get('/specslist',{params:{page:1,size:total}})
    return res
}

//请求规格 总条目
export function getTotal(){
    let res = axios.get('/specscount')
    return res
}
//添加规格 
export function addSpecs(data){
    let res = axios.post('/specsadd',data)
    return res
}

//编辑规格 
export function editSpecs(data){
    let res = axios.post('/specsedit',data)
    return res
}

//删除规格 
export function delSpecs(id){
    let res = axios.post('/specsdelete',{id:id}) //data是个对象 ，所以这里要用对象里的属性
    return res
}
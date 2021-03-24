import axios from '../utils/http'


//请求分类 列表
export function getCate(){
    let res = axios.get('/catelist?istree=1')
    return res
}

//添加分类 
export function addCate(data){
    let res = axios.post('/cateadd',data)
    return res
}

//编辑分类 
export function editCate(data){
    let res = axios.post('/cateedit',data)
    return res
}

//删除分类 
export function delCate(id){
    let res = axios.post('/catedelete',{id:id}) //data是个对象 ，所以这里要用对象里的属性
    return res
}
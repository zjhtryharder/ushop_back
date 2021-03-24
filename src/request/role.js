import axios from '../utils/http'
//请求角色 列表
export function getRole(){
    let res = axios.get('/rolelist')
    return res
}

//添加角色 
export function addRole(data){
    let res = axios.post('/roleadd',data)
    return res
}

//编辑角色 
export function editRole(data){
    let res = axios.post('/roleedit',data)
    return res
}

//删除角色 
export function delRole(id){
    let res = axios.post('/roledelete',{id:id}) //data是个对象 ，所以这里要用对象里的属性
    return res
}

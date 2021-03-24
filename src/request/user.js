import axios from '../utils/http'
//管理员登陆
export function userLogin (data){
    let res = axios.post('/userlogin',data)
    // console.log(res);
    return res
}

//请求管理员 列表
export function getUser(params){
    let res = axios.get('/userlist',{params:params})
    return res
}
//请求管理员 列表总条目
export function getTotal(){
    let res = axios.get('/usercount')
    return res
}
//添加管理员 
export function addUser(data){
    let res = axios.post('/useradd',data)
    return res
}

//编辑管理员 
export function editUser(data){
    let res = axios.post('/useredit',data)
    return res
}

//删除管理员 
export function delUser(uid){
    let res = axios.post('/userdelete',{uid:uid}) //data是个对象 ，所以这里要用对象里的属性
    return res
}
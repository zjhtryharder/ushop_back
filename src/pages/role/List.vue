<template>
 <el-table
    :data="roleList"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    default-expand-all
  >
    <el-table-column prop="id" label="ID"></el-table-column>
    <el-table-column prop="rolename" label="角色名称"></el-table-column>
    
    
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-tag type="success" v-show="scope.row.status == 1">正常</el-tag>
        <el-tag type="warning" v-show="scope.row.status == 2">禁用</el-tag>
      </template>
    </el-table-column>
    <el-table-column  label="操作">
      <template slot-scope="scope">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="small"
          circle
          @click="edit(scope.row)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
          circle
          @click="del(scope.row.id)"
        >
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {mapActions,mapState} from 'vuex';
import {delRole} from '../../request/role'
export default {
    props:['info'],
 data(){
 return{}
 },
 computed:{
     ...mapState({roleList:state=>state.role.roleList})
 },
 created(){
     this.getRoleList()
 },
 methods:{
     ...mapActions('role',['getRoleList']),
     edit(row){
         //弹框显示
         this.info.isShow = true
         this.info.isAdd = false
         //传到父组件
         this.$emit('setFormInfo',row)
     },
     del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除操作
          delRole(id).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //刷新列表
              this.getRoleList();
            } else {
              this.$message({
                type: "success",
                message: res.msg,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
     }
 },
 components:{}
}

</script>
<style scoped>
</style>
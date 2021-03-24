<template>
  <el-table
    :data="menuList"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    default-expand-all
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="id" label="序号"></el-table-column>
    <el-table-column prop="title" label="菜单名称"></el-table-column>
    <el-table-column prop="icon" label="图标">
      <template slot-scope="scope">
        <i :class="scope.row.icon"></i>
      </template>
    </el-table-column>
    <el-table-column prop="url" label="地址"> </el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-tag type="success" v-show="scope.row.status == 1">正常</el-tag>
        <el-tag type="warning" v-show="scope.row.status == 2">禁用</el-tag>
        <!-- <button @click="get(scope)">hk</button> -->
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
import { mapActions, mapState } from "vuex";
import {  delMenu } from "../../request/menu";
export default {
  props: ["info"],
  data() {
    return {};
  },
  computed: {
    ...mapState({ menuList: (state) => state.menu.menuList }),
  },
  created() {
    //获取后台数据
    this.getMenuList();
  },
  methods: {
    ...mapActions("menu", ["getMenuList"]),
    //  get(val){
    //    console.log(val);    //测试scope中的属性
    //  }
    edit(row) {
      //先打开弹框
      this.info.isAdd = false;
      this.info.isShow = true;
      //1通过自定义方法把数据传给index，再传给Model
      this.$emit("setFormInfo", row);
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除操作
          delMenu(id).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //刷新列表
              this.getMenuList();
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
    },
  },
  components: {},
};
</script>
<style scoped>
</style>
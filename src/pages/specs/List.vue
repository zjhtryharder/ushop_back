<template>
  <div>
    <el-table
    :data="specsList"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    default-expand-all
  >
    <el-table-column prop="id" label="ID"></el-table-column>
    <el-table-column prop="specsname" label="规格名称"></el-table-column>
    <el-table-column prop="" label="规格可选值" width="300px">
      <template slot-scope="scope">
        <el-tag class="specs_tag" type="success" effect="dark" v-for="(item,index) in scope.row.attrs" :key="index" >{{item}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-tag type="success" v-show="scope.row.status == 1">正常</el-tag>
        <el-tag type="warning" v-show="scope.row.status == 2">禁用</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
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
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[1, 2, 3, 4]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="specsTotal">
    </el-pagination>
  </div>
  
</template>

<script>
import { mapActions, mapState } from "vuex";
import { delSpecs} from "../../request/specs";
export default {
  props: ["info", "params"],
  data() {
    return {};
  },
  computed: {
    ...mapState({ specsList: (state) => state.specs.specsList ,specsTotal:state=>state.specs.specsTotal }),
  },
  created() {
    this.getSpecsList(this.params);
  },
  methods: {
    ...mapActions("specs", ["getSpecsList"]),
    edit(row) {
      //弹框显示
      this.info.isShow = true;
      this.info.isAdd = false;
      //传到父组件
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
          delSpecs(id).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //刷新列表
              this.getSpecsList(this.params);
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
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.params.size = val
      this.getSpecsList(this.params);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.params.page = val
      this.getSpecsList(this.params);
    },
  },
  components: {},
};
</script>
<style scoped>
.specs_tag{
  margin-right: 5px;
}
</style>
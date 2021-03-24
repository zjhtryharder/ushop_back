<template>
  <div>
    <el-table
    :data="goodsList"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    default-expand-all
  >
    <el-table-column prop="id" label="ID"></el-table-column>
    <el-table-column prop="firstcatename" label="一级分类"></el-table-column>
    <el-table-column prop="secondcatename" label="二级分类"></el-table-column>
    <el-table-column prop="goodsname" label="商品名称"></el-table-column>
    <el-table-column prop="img" label="商品图片">
      <template slot-scope="scope">
        <img :src="$imgBaseUrl + scope.row.img" alt="" class="gimg">
      </template>
    </el-table-column>
    <el-table-column prop="price" label="零售价格">
      <template slot-scope="scope">
        &yen;{{scope.row.price}}
      </template>
    </el-table-column>
    <el-table-column prop="market_price" label="市场价格">
      <template slot-scope="scope">
        &yen;{{scope.row.market_price}}
      </template>
    </el-table-column>
    <el-table-column prop="isnew" label="是否新品"></el-table-column>

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
      :total="goodsTotal">
    </el-pagination>
  </div>
  
</template>

<script>
import { mapActions, mapState } from "vuex";
import { delGoods} from "../../request/goods";
export default {
  props: ["info", "params"],
  data() {
    return {};
  },
  computed: {
    ...mapState({ goodsList: (state) => state.goods.goodsList ,goodsTotal:state=>state.goods.goodsTotal }),
  },
  created() {
    this.getGoodsList(this.params);
  },
  methods: {
    ...mapActions("goods", ["getGoodsList"]),

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
          delGoods(id).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //刷新列表
              this.getGoodsList(this.params);
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
      this.params.page = 1
      this.params.size = val
      this.getGoodsList(this.params);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.params.page = val
      this.getGoodsList(this.params);
    },
  },
  components: {},
};
</script>
<style scoped>
.gimg{
  width: 100px;
  margin-left: -10px;
}
</style>
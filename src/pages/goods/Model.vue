<template>
  <el-dialog
    class="dialog_button"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
    @close="reset()"
  >
    <el-tabs v-model="activeName" >
      <el-tab-pane label="基本信息" name="first">
        <el-form
          :model="formInfo"
          label-width="100px "
          :rules="rules"
          ref="formInfo"
        >
          <el-form-item label="一级分类" prop="first_cateid">
            <el-select
              v-model="formInfo.first_cateid"
              placeholder="请选择"
              @change="firstCateChange"
            >
              <el-option
                v-for="item in cateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类" prop="second_cateid">
            <el-select v-model="formInfo.second_cateid" placeholder="请选择">
              <el-option
                v-for="item in secondCateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsname">
            <el-input v-model="formInfo.goodsname"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" prop="img">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :auto-upload="false"
              :on-change="change"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="formInfo.price"></el-input>
          </el-form-item>
          <el-form-item label="市场价格" prop="market_price">
            <el-input v-model="formInfo.market_price"></el-input>
          </el-form-item>

          <el-form-item label="商品规格 " prop="specsid">
            <el-select
              v-model="formInfo.specsid"
              placeholder="请选择"
              @change="firstSpecsid"
            >
              <el-option
                v-for="item in specsAllList"
                :key="item.id"
                :label="item.specsname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格属性值" prop="specsattr">
            <el-select v-model="formInfo.specsattr" placeholder="请选择">
              <el-option
                v-for="(item, index) in secondSpecsList"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否新品" prop="isnew">
            <el-radio-group v-model="formInfo.isnew">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否热卖" prop="ishot">
            <el-radio-group v-model="formInfo.ishot">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formInfo.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品详情" >
        <!-- 富文本编辑器 -->
        <vueWangeditor ref="editor" id="editor"  />
      </el-tab-pane>
    </el-tabs>

    <div slot="footer" class="dialog-footer">
      <el-button @click="info.isShow = false">取 消</el-button>
      <el-button type="primary" @click="submitForm()">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { addGoods, editGoods } from "../../request/goods";
import vueWangeditor from "vue-wangeditor";
export default {
  props: ["info", "params"],
  data() {
    return {
      activeName: 'first',
      imageUrl: "",
      secondCateList: [],
      secondSpecsList: [],
      formInfo: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      rules: {
        goodsname: [{ required: true, message: "商品名称", trigger: "blur" }],
        first_cateid: [{ required: true, message: "请选择", trigger: "blur" }],
        second_cateid: [{ required: true, message: "请选择", trigger: "blur" }],
        price: [{ required: true, message: "商品价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "市场价格", trigger: "blur" },
        ],
        specsid: [{ required: true, message: "市场规格", trigger: "blur" }],
        specsattr: [
          { required: true, message: "规格属性值 ", trigger: "blur" },
        ],
        isnew: [{ required: true, message: "是否新品 ", trigger: "blur" }],
        ishot: [{ required: true, message: "是否热卖 ", trigger: "blur" }],
        status: [{ required: true, message: "状态 ", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getCateList(this.params);
    this.getSpecsTotal();
  },
  computed: {
    ...mapState({
      cateList: (state) => state.cate.cateList,
      specsAllList: (state) => state.specs.specsAllList,
    }),
  },
  methods: {
    ...mapActions("cate", ["getCateList"]),
    ...mapActions("goods", ["getGoodsList"]),
    ...mapActions("specs", ["getSpecsTotal"]),
    submitForm() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          //单独获取富文本编辑器内容
          this.formInfo.description = this.$refs.editor.getHtml()
          //删除两个字段，
          this.$delete(this.formInfo, "firstcatename");
          this.$delete(this.formInfo, "secondcatename");
          //提交使用formdata文件一起上传
          let fd = new FormData();
          for (let k in this.formInfo) {
            fd.append(k, this.formInfo[k]);
          }
          //提交新增
          if (this.info.isAdd) {
            //新增
            addGoods(fd).then((res) => {
              if (res.code == 200) {
                //弹框成功
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getGoodsList(this.params);
                this.info.isShow = false;
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            //编辑
            editGoods(fd).then((res) => {
              if (res.code == 200) {
                //弹框成功
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getGoodsList(this.params);
                this.info.isShow = false;
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset() {
      this.formInfo = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imageUrl = "";
      this.activeName = 'first'
      this.$refs.editor.setHtml('')
    },
    setFormInfo(row) {
      this.formInfo = { ...row };
      this.imageUrl = this.$imgBaseUrl + this.formInfo.img;
      let index = this.cateList.findIndex(
        (item) => item.id == this.formInfo.first_cateid
      );
      console.log(index);
      this.secondCateList = this.cateList[index].children;
      
      this.$nextTick(()=>{
        //单独设置文本编辑器
        this.$refs.editor.setHtml(this.formInfo.description)
      })
      
    },
    change(res, file) {
      this.imageUrl = URL.createObjectURL(res.raw);
      this.formInfo.img = res.raw; //用来 上传
    },
    //一级分类改变时，获取一级分类的下标，获取下标下的二级分类
    firstCateChange() {
      let index = this.cateList.findIndex(
        (item) => item.id == this.formInfo.first_cateid
      );
      console.log(index);
      this.secondCateList = this.cateList[index].children;
      this.formInfo.second_cateid = "";

      let index1 = this.specsAllList.findIndex(
        (item) => item.id == this.formInfo.specsid
      );
      this.secondSpecsList = this.specsAllList[index1].attrs;
    },
    firstSpecsid() {
      // console.log('走到这里了嘛');
      let index = this.specsAllList.findIndex(
        (item) => item.id == this.formInfo.specsid
      );
      this.secondSpecsList = this.specsAllList[index].attrs;
      // console.log(this.secondSpecsList);
      this.formInfo.specsattr = "";
    },
    
  },
  components: {
    vueWangeditor,
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #000;
  border-radius: 5px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
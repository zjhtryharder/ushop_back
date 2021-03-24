<template>
  <el-dialog
    class="dialog_button"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
    @close="reset()"
  >
    <!-- <hr> -->
    <el-form
      :model="formInfo"
      label-width="100px "
      :rules="rules"
      ref="formInfo"
    >
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="formInfo.pid" placeholder="顶级分类">
          <el-option label="顶级分类 " :value="0"></el-option>
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="catename">
        <el-input v-model="formInfo.catename"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="img" v-if="formInfo.pid != 0">
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

      <el-form-item label="分类状态" prop="status">
        <el-radio-group v-model="formInfo.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="info.isShow = false">取 消</el-button>
      <el-button type="primary" @click="submitForm()">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { addCate, editCate } from "../../request/cate";
export default {
  props: ["info"],
  data() {
    return {
      imageUrl:'',
      formInfo: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      rules: {
        pid: [{ required: true, message: "请选择分类", trigger: "blur" }],
        catename: [{ required: true, message: "请输入名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState({ cateList: (state) => state.cate.cateList }),
  },
  created() {},
  methods: {
    ...mapActions("cate", ["getCateList"]),
    submitForm() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          //此处需要用formData来打包文件和图片一起上传
          let fd = new FormData()
          for(let k in  this.formInfo){
            fd.append(k,this.formInfo[k])
          }
          if (this.info.isAdd) {
            addCate(fd).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getCateList();
                //关闭弹框
                // console.log(关闭);
                this.info.isShow = false;
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            console.log("走到了编辑");
            editCate(fd).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getCateList();
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
    //重置对话框
    reset() {
      this.formInfo = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.imageUrl = ''
    },
    setFormInfo(row) {
      //将收到的数据赋值给formInfo
      this.formInfo = { ...row }; //此处用来做拷贝，避免数据堆改变
      this.imageUrl =this.$imgBaseUrl + this.formInfo.img
    },
    change(res, file) {
        this.imageUrl = URL.createObjectURL(res.raw);    //用来给图片一个地址，显示 在页面上
        this.formInfo.img = res.raw    //用来 上传
      },
      
    
  },
  components: {},
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
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #8c939d;
    border-radius: 5px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  
</style>
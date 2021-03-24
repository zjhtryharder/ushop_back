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
      
      <el-form-item label="属性名" prop="specsname" placeholder="请输入属性名">
        <el-input v-model="formInfo.specsname"></el-input>
      </el-form-item>
      <el-form-item label="属性值" prop="attrs">
        <div class="addflex" v-for="(item,index) in list" :key="index">
          <el-input type="text" v-model="list[index] "  ></el-input>
          <el-button type="success" effect="dark" size="small" @click="increase" v-if="index == 0">添加</el-button>
          <el-button type="danger" effect="dark" size="small" @click="decrease(index)" v-else>删除</el-button>
        </div>
      </el-form-item>
      <el-form-item label="状态" prop="status">
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
import { addSpecs, editSpecs } from "../../request/specs";
export default {
  props: ["info", "params"],
  data() {
    return {
      list:[''],
      formInfo: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      rules: {
        specsname: [{ required: true, message: "请输入属性名", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
    };
  },
  created() {
    
  },
  computed: {
    ...mapState({ specsList: (state) => state.specs.specsList }),
  },
  methods: {
    ...mapActions("specs", ["getSpecsList"]),
    submitForm() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          this.formInfo.attrs = this.list.join(',')
          //提交新增
          if (this.info.isAdd) {
            //新增
            addSpecs(this.formInfo).then((res) => {
              if (res.code == 200) {
                //弹框成功
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getSpecsList(this.params);
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
            editSpecs(this.formInfo).then((res) => {
              if (res.code == 200) {
                //弹框成功
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getSpecsList(this.params);
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
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.list = ['']
    },
    setFormInfo(row) {
      this.formInfo = { ...row };
      //利用深拷贝解决数据双向联通的问题，避免值被一起修改
      this.list = JSON.parse(JSON.stringify(this.formInfo.attrs))
    },
    increase(){
      this.list.push('')
    },
    decrease(index){
      this.list.splice(index,1)
    }
  },
  components: {},
};
</script>
<style scoped>
.addflex{
  display: flex;
  margin-bottom: 5px;
}
.el-button{
  margin-left: 10px;
}
</style>

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
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="formInfo.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
        <el-form-item class="top_el" label="上级" v-show="formInfo.type == 2">
          <el-select v-model="formInfo.pid" placeholder="顶级菜单">
            <el-option label="顶级菜单 " :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item label="名称" prop="title">
        <el-input v-model="formInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="地址" v-show="formInfo.type == 2">
        <el-input v-model="formInfo.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标" v-show="formInfo.type == 1">
        <el-input v-model="formInfo.icon" autocomplete="off"></el-input>
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
import { addMenu, editMenu } from "../../request/menu";
export default {
  props: ["info"],
  data() {
    return {
      formInfo: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      rules: {
        type: [{ required: true, message: "请选择状态", trigger: "blur" }],
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState({ menuList: (state) => state.menu.menuList }),
  },
  created() {},
  methods: {
    ...mapActions("menu", ["getMenuList"]),
    submitForm() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          if (this.info.isAdd) {
            addMenu(this.formInfo).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getMenuList();
                //关闭弹框
                this.info.isShow = false;
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            // console.log('走到了编辑');
            editMenu(this.formInfo).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getMenuList();
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
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    setFormInfo(row) {
      //将收到的数据赋值给formInfo
      this.formInfo = { ...row }; //此处用来做拷贝，避免数据堆改变
    },
  },
  components: {},
};
</script>
<style scoped>
.top_el {
  /* text-align: left; */
  margin-left: -100px;
}
</style>
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
    <el-form-item  label="角色" >
          <el-select v-model="formInfo.roleid" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="帐号" prop="username">
        <el-input v-model="formInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :placeholder="info.isAdd?'请输入密码':'密码为空表示不修改' ">
        <el-input type="password" v-model="formInfo.password"></el-input>
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
import { addUser, editUser } from "../../request/user";
export default {
  props: ["info",'params'],
  data() {
    return {
      formInfo: {
        roleid: "",
        username: "",
        password:'',
        status: 1,
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        roleid: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },

      
    };
  },
  created() {
    this.getRoleList(this.params);
  },
  computed: {
    ...mapState({ roleList: (state) => state.role.roleList}),
  },
  methods: {
    ...mapActions("role", ["getRoleList"]),
    ...mapActions("user", ["getUserList"]),
    submitForm() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
         
          //提交新增
          if (this.info.isAdd) {
            //新增
            addUser(this.formInfo).then((res) => {
              if (res.code == 200) {
                //弹框成功
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getUserList(this.params);
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
            editUser(this.formInfo).then((res) => {
              if (res.code == 200) {
                //弹框成功
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getUserList(this.params);
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
        username: "",
        menus: "",
        status: 1,
      };
      
    },
    setFormInfo(row) {
      this.formInfo = { ...row };
     this.formInfo.password = ''
    },
  },
  components: {},
};
</script>
<style scoped>
</style>
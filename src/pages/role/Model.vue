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
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="formInfo.rolename"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" prop="menus">
        <el-tree
          :data="menuList"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
        >
        </el-tree>
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
import { addRole, editRole } from "../../request/role";
export default {
  props: ["info"],
  data() {
    return {
      formInfo: {
        rolename: "",
        menus: "",
        status: 1,
      },
      rules: {
        rolename: [{ required: true, message: "请输入名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },

      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  created() {
    this.getMenuList();
  },
  computed: {
    ...mapState({ menuList: (state) => state.menu.menuList }),
    //   ...mapState({roleList:state=>state.role.roleList})
  },
  methods: {
    ...mapActions("menu", ["getMenuList"]),
    ...mapActions("role", ["getRoleList"]),
    submitForm() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          //   this.$refs.tree.getCheckedKeys() 单独设置   获取树形结构菜单被选中的id
          this.formInfo.menus = this.$refs.tree.getCheckedKeys().join(",");
          //提交新增
          if (this.info.isAdd) {
            //新增
            addRole(this.formInfo).then((res) => {
              if (res.code == 200) {
                //弹框成功
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getRoleList();
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
            editRole(this.formInfo).then((res) => {
              if (res.code == 200) {
                //弹框成功
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getRoleList();
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
        rolename: "",
        menus: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    setFormInfo(row) {
      this.formInfo = { ...row };
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.formInfo.menus.split(","));
      });
    },
  },
  components: {},
};
</script>
<style scoped>
</style>
<template>
  <fullscreen ref="fullscreen">
      <el-container>
    <el-aside :width="isCollapse ? '64px' : '226px'">
      <h3>小U商城后台</h3>
      <el-col :span="12">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#333"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">管理中心</span>
          </el-menu-item>

          <div v-for="(item, index) in menus" :key="item.id">
            <el-submenu :index="String(index)" v-if="item.type == 1">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="key in item.children"
                :key="key.id"
                :index="key.url"
              >
                <span slot="title">{{ key.title }}</span>
              </el-menu-item>
            </el-submenu>

            <el-menu-item :index="item.url" v-else>
              <i class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </div>

          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/menu">
              <span slot="title">菜单管理</span>
            </el-menu-item> -->
          <!-- <el-menu-item index="/role">
              <span slot="title">角色管理</span>
            </el-menu-item>
            <el-menu-item index="/user">
              <span slot="title">管理员管理</span>
            </el-menu-item> -->
          <!-- </el-submenu> -->
          <!-- <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item index="/cate">
              <span slot="title">商品分类</span>
            </el-menu-item>
            <el-menu-item index="/specs">
              <span slot="title">商品规格</span>
            </el-menu-item>
            <el-menu-item index="5-3">
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="5-4">
              <span slot="title">会员管理</span>
            </el-menu-item>
            <el-menu-item index="5-5">
              <span slot="title">轮播图管理</span>
            </el-menu-item>
            <el-menu-item index="5-6">
              <span slot="title">秒杀活动</span>
            </el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header>
        <div class="left">
          <el-button
            class="left_btn"
            type="primary"
            @click="isCollapse = !isCollapse"
            icon="el-icon-s-fold"
            size="mini"
          ></el-button>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }"
              >管理中心</el-breadcrumb-item
            >
            <el-breadcrumb-item><a href="/">{{$route.meta.title}}</a></el-breadcrumb-item>
          </el-breadcrumb>
          <el-button
            class="btn_ileft"
            size="mini"
            icon="el-icon-back"
            circle
            @click="quit"
          ></el-button>
        </div>
        <div class="rigth">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-full-screen">
                <span @click="fullscreen">全屏预览</span></el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-switch-button"
                ><span @click="quit">安全退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </fullscreen>

</template>

<script>
//导入全屏组件注册
  import Vue from 'vue'
  import fullscreen from 'vue-fullscreen';
  Vue.use(fullscreen)
export default {
  data() {
    return {
      isCollapse: false,
      menus: [],
      username:''
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo" || "{}"));
    this.menus = userInfo.menus;
    // console.log(userInfo);
    this.username = userInfo.username
  },
  methods: {
    quit() {
      //1  清除本地存储
      localStorage.removeItem("userInfo");
      //2   弹出成功框
      this.$message({
        type: "success",
        message: "退出成功",
      });
      //3    跳转到登陆页
      this.$router.push("/login");
    },
    fullscreen(){
      this.$refs.fullscreen.toggle()
    }
  },
  components: {},
};
</script>
<style scoped>
.el-container {
  width: 100%;
  height: 100vh;
}
.el-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 5px #000;
  z-index: 1;
}

.el-aside {
  background-color: #333;
  color: #fff;
  line-height: 60px;
  letter-spacing: 4px;
  font-size: 16px;
}

.el-main {
  background-color: #e9eef3;
}
h3 {
  height: 60px;
  background-color: #444;
  font-weight: normal;
  text-align: center;
}
.el-menu {
  border: none;
}
.left {
  display: flex;
  align-items: center;
}
.left_btn {
  margin-right: 5px;
}
.btn_ileft {
  margin-left: 10px;
}
.el-col-12 {
  width: 100%;
}
.is-active {
  background: #409eff !important;
  /* color: #fff !important; */
}
</style>
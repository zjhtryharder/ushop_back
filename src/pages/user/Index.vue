<template>
  <div>
    <el-card>
      <el-button type="primary" @click="showModel()" icon="el-icon-circle-plus-outline">新增</el-button>
      <el-divider></el-divider>

      <List :info="info" :params="params" @setFormInfo='setFormInfo'/>
      <Model :info="info"  :params="params" ref= "model"/>  
      <!-- 此时可以通过ref获取Model里的方法和数据 -->
    </el-card>
  </div>
</template>

<script>
import List from './List'
import Model from './Model'
export default {
  data() {
    return {
        info:{
          isShow:false,
          isAdd:true
        },
        params:{
            page:1,
            size:1
        }
    };
  },
  created() {},
  methods: {
      showModel(){
        this.info.isShow = true
        this.info.isAdd = true
      },
      //触发自定义方法再触发这个方法，再利用ref获取modl里的方法，将数据传到model
      setFormInfo(row){
        this.$refs.model.setFormInfo(row)
    }
  },
  components: {
      List,Model
  },
};
</script>
<style scoped>
</style>
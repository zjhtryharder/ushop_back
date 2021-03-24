<template>
 <el-card>
     <el-button type="primary" @click="showModel" icon="el-icon-circle-plus-outline">新增</el-button>
     <el-divider></el-divider>
     <List :info="info" @setFormInfo='setFormInfo'/>
     <Model :info="info" ref="model"/>
 </el-card>
</template>

<script>
import List from './List'
import Model from './Model'
export default {
 data(){
 return{
     info:{
         isShow:false,
         isAdd:true
     }
 }
 },
 created(){},
 methods:{
     showModel(){
         this.info.isShow = true
         this.info.isAdd = true
     },
     setFormInfo(row){
         this.$refs.model.setFormInfo(row)
     }
 },
 components:{
     List,Model
 }
}

</script>
<style scoped>
</style>
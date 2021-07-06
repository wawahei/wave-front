<template>

  <div class="app-container">

    <el-form :inline="true">
      <el-form-item label="用户姓名/工号">
        <el-input v-model="keyword"></el-input>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">
              查询
      </el-button>
      <el-button type="default" @click="resetData()">清空</el-button>

      <el-button type="text" class="search-button v-link highlight clickable selected" @click="saveShow()">
        新增
      </el-button>
    </el-form>

    <el-table :data="list" border stripe>
      <el-table-column type="index" width="50"/>
      <el-table-column prop="userNo" label="工号"/>
      <el-table-column prop="userName" label="用户姓名"/>
      <el-table-column prop="userLoginAccount" label="登录账号"/>
      <el-table-column prop="userMobile" label="手机号"/>
      <el-table-column prop="isDeleted" label="用户状态"/>

      <el-table-column  label="操作">
        <template slot-scope="scope">
        <router-link
                    :to="'/system/user/save/' + scope.row.userId"
                    style="margin-right:5px;"
                  >
                    <el-button type="primary" size="mini" icon="el-icon-edit">
                      修改
                    </el-button>
                  </router-link>

                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click="removeById(scope.row.userId)"
                  >
                    删除
                  </el-button>
                  </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import user from '@/api/user'

  export default{
    data(){
      return {
        list:[],
        total: 0,
        page: 1, // 默认页码
        limit: 5, // 每页记录数
        keyword: '',
      }
    },

    created(){
      this.fetchData()
    },

    methods:{
      fetchData(page = 1){
        this.page = page
        user.list(this.page, this.limit, this.keyword).then(response =>{
          this.list = response.data.pageModel.records
          this.total = response.data.pageModel.total
        })
      },

      removeById(userId){
        console.log(userId);
      }
    }


  }


</script>

<style>
</style>

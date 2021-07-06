<template>
  <div class="app-container">
    <el-form ref="user" :model="user" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="工号">
            <el-input v-model="user.userNo" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户姓名">
            <el-input v-model="user.userName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号">
            <el-input v-model="user.userMobile" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户性别">
              <el-radio v-model="user.userGender" :label="0">男</el-radio>
              <el-radio v-model="user.userGender" :label="1">女</el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="用户邮箱">
            <el-input v-model="user.userEmail" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="用户生日">
            <el-date-picker v-model="user.userBirthday" type="date" placeholder="Pick a date" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
    <el-row>
          <el-col :span="12">
            <el-form-item label="用户地址">
              <el-input v-model="user.userAddr" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="登录账号">
              <el-input v-model="user.userLoginAccount" />
            </el-form-item>
          </el-col>
    </el-row>

      <el-form-item label="用户描述">
        <el-input v-model="user.userDesc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate" >保存</el-button>
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import user from '@/api/user'

export default {
  data() {
    return {
      user: {}
    }
  },

  created() {
    if (this.$route.params.userId) {
       this.fetchById(this.$route.params.userId)
    }
  },

  methods: {
    saveOrUpdate() {
      if (!this.user.userId) {
        //调用新增
        this.saveData()
      } else {
        this.updateData()
      }

    },

    fetchById(userId){
      if(userId>0){
        user.fetchById(userId).then(response =>{
          this.user = response.data.user
          this.user.createTime = null
          this.user.updateTime = null
        })
      }
    },


    saveData() {
      user.save(this.user).then(response => {
        // this.$message({
        //   type: 'success',
        //   message: response.message
        // })
        this.$message.success("保存成功")
        this.$router.push('/system/user/list')
      })
    },

    updateData() {
      user.updateById(this.user).then(response => {
        this.$message.success("修改成功")
        this.$router.push('/system/user/list')
      })
    },


    onCancel() {
      // this.$message({
      //   message: 'cancel!',
      //   type: 'warning'
      // })
      this.$router.push('/system/user/list')
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

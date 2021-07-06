<template>
  <div class="app-container">

    <el-form :inline="true">
      <el-form-item label="字典类型编号/名称">
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

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="字典类型编号">
        <template slot-scope="scope">
          {{ scope.row.typeCode }}
        </template>
      </el-table-column>
      <el-table-column label="字典类型名称" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.typeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="500" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"  icon="el-icon-edit"  @click="updateShow(scope.row)">
            修改
          </el-button>

          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteById(scope.row.typeId)">
            删除
          </el-button>

		  <el-button type="primary" size="mini" icon="el-icon-delete" @click="viewDictValue(scope.row.typeCode)">
		    查看字典值
		  </el-button>

        </template>


      </el-table-column>

    </el-table>

    <el-pagination
      class="pagination"
      layout="prev, pager, next"
      :current-page="page"
      :total="total"
      :page-size="limit"
      @current-change="fetchData">
    </el-pagination>


    <el-dialog title="字典值管理" :visible.sync="dicvValueDialog" width="600px">
        <el-table :data="dictValuelist" class="tb-edit" style="width: 100%" highlight-current-row @row-click="handleCurrentChange">
          <el-table-column label="字典值名称" width="200">
              <template scope="scope">
                  <el-input size="small" v-model="scope.row.valueCode" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
                  <!-- <span>{{scope.row.valueCode}}</span> -->
              </template>
          </el-table-column>
          <el-table-column label="字典值编号" width="200">
              <template scope="scope">
                  <el-input size="small" v-model="scope.row.valueName" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
                  <!-- <span>{{scope.row.valueName}}</span> -->
              </template>
          </el-table-column>

          <el-table-column label="操作">
              <template scope="scope">
                  <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                  <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
          </el-table-column>


      </el-table>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addLine">
            新增字典值
          </el-button>
          <el-button @click="dicvValueDialog = false">
            取消
          </el-button>
          <el-button type="primary" @click="saveDictValueList">
            确定
          </el-button>
        </div>


    </el-dialog>


    <el-dialog title="更新字典类型" :visible.sync="dialogVisible" width="490px">
          <el-form label-position="right" label-width="100px">

            <el-form-item  label="字典类型编号">
              <el-input v-model="dictType.typeCode" />
            </el-form-item>

            <el-form-item  label="字典类型名称">
              <el-input v-model="dictType.typeName" />
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dicvValueDialog = false">
              取消
            </el-button>
            <el-button type="primary" @click="action">
              确定
            </el-button>
          </div>
        </el-dialog>
  </div>




</template>

<script>
import { getPageList,updateDictType,saveDictType,deleteById ,listByParentId,saveList} from '@/api/dictType'

export default {
  data() {
    return {
      list: [],
      total: 0,
      page: 1, // 默认页码
      limit: 5, // 每页记录数
      keyword: '',

      insert:true,
      dialogVisible: false,
      dictType:{},

      dicvValueDialog:false,
      dictValuelist:[],
      typeCode:''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(page = 1) {
      this.page = page
      this.listLoading = true
      getPageList(this.page, this.limit, this.keyword).then(response => {
        this.list = response.data.pageModel.records
        this.total = response.data.pageModel.total
        this.listLoading = false
      })
    },

    updateShow(row){
      this.dictType = row
      this.dialogVisible = true
      this.insert = false
    },

    saveShow(){
      this.dictType = {}
      this.dialogVisible = true
      this.insert = true
    },

    action(){
      if(this.insert){
        this.save()
      }else{
        this.update()
      }
    },

    save(){
      let obj = {};
      obj.typeCode = this.dictType.typeCode;
      obj.typeName = this.dictType.typeName;
       saveDictType(obj).then(response =>{
         this.$message({
                     message: "保存成功",
                     type: 'success'
                   })
         this.dialogVisible = false
         this.fetchData()
       })
    },

    update(){
      let obj = {};
      obj.typeId = this.dictType.typeId;
      obj.typeCode = this.dictType.typeCode;
      obj.typeName = this.dictType.typeName;
      updateDictType(obj).then(response =>{
        this.$message({
                    message: "修改成功",
                    type: 'success'
                  })
        this.dialogVisible = false
        this.fetchData()
      })
    },

    deleteById(typeId){

      this.$confirm('确定删除？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>
          deleteById(typeId)
      ).then(response =>{
          this.$message({
                      message: "删除成功",
                      type: 'success'
                    })
          this.fetchData()
        }).catch(error => {
          console.log('catch的error', error)
          if (error === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        })
    },

    viewDictValue(typeCode){
      this.dicvValueDialog = true
      this.typeCode = typeCode
      listByParentId(typeCode).then(response => {
        this.dictValuelist = response.data.pageModel.records
      })
    },

    handleCurrentChange(row, event, column) {
        console.log(row, event, column, event.currentTarget)
    },
    handleEdit(index, row) {
        console.log(index, row);
    },
    handleDelete(index, row) {
        console.log(index, row);
        this.dictValuelist.splice(index,1)
    },

    addLine(){
      this.dictValuelist.push({
        "valueCode":'',
        "valueName":''
      });
    },

    saveDictValueList(){

      let list = this.dictValuelist.map(item => {
          return {
              typeCode:this.typeCode,
              valueCode: item.valueCode,
              valueName: item.valueName
          }
      })

      saveList(list).then(response =>{
        this.$message({
                    message: "保存成功",
                    type: 'success'
                  })
        this.dicvValueDialog = false;
      });


    },

    resetData() {
          //还原表单
          this.keyword = ''
          //重新查询
          this.fetchData()
        }
  }
}
</script>

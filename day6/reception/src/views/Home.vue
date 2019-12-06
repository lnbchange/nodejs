<template>
  <div class="home">
     <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="用户名"
      prop="username">
    </el-table-column>
    <el-table-column
      label="密码"
      prop="password">
    </el-table-column>
    <el-table-column
      label="手机号"
      prop="phone">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          @click="handleAdd">Add</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>          
      </template>
    </el-table-column>
  </el-table>

  <el-dialog :title="form.id?'修改':'添加'" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号" :label-width="formLabelWidth">
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogedit">确 定</el-button>
  </div>
</el-dialog>
  
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        search: '',
        pageNum:1,
        limit:3,
        dialogFormVisible: false,
        form: {
          username: '',
          password: '',
          phone: ''
        },
        formLabelWidth: '120px'
      }
    },
    created(){
     this.getData()
    },
    methods: {
      getData(){//查询
         this.$axios.get('/api/list',{params:{pageNum:this.pageNum,limit:this.limit}}).then(res=>{
          // console.log(res.data);
          this.tableData=res.data.data;
        })
      },
      handleEdit(index, row) {//修改
        // console.log(index, row);
        this.dialogFormVisible=true;
        this.form={...row};        
      },
      handleDelete(index, row) {//删除
        // console.log(index, row);
        this.$axios.get('/api/delete',{params:{id:row.id}}).then(res=>{
         if(res.data.code===0){
           alert(res.data.msg);
            this.getData()
         }else{
            alert(res.data.msg);
         }
        })
      },
      dialogedit(){//弹框里点击确定 修改
        let url='';
        if(this.form.id||this.form.id===0){
          url='/api/edit'
        }else{
          url='/api/add'
        }
        this.$axios.post(url,{...this.form}).then(res=>{
          if(res.data.code===0){
            alert(res.data.msg);
            this.form={
              username: '',
              password: '',
              phone: '',
              id:''
            };       
          this.getData();   
          this.dialogFormVisible=false;           
          }
        })
      },
      handleAdd(){//添加
        this.dialogFormVisible=true;        
      }
    },
  }
</script>

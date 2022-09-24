<template>
 <div>
  <div style="padding: 10px 0; margin-bottom: 5px;">
    <el-input v-model="inputUserName" style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-user"></el-input>
    <el-input v-model="inputEmail" style="width: 200px; margin-left: 10px;" placeholder="请输入邮箱" suffix-icon="el-icon-message"></el-input>
    <el-input v-model="inputPhone" style="width: 200px; margin-left: 10px;" placeholder="请输入电话号码" suffix-icon="el-icon-mobile-phone"></el-input>
    <el-button @click="resetInput" class="el-icon-refresh-right" circle style="margin-left: 5px; font-size: 13px; font-weight: 700;"></el-button>
    <el-button @click="getPageOfUsers" type="primary"  style="margin-left: 5px">搜索</el-button>
  </div>

  <div style="margin: 10px 0">
    <el-button type="primary" @click="addUser">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
    <el-popconfirm
          confirm-button-text='确定'
          cancel-button-text='取消'
          icon="el-icon-info"
          icon-color="red"
          title="确定删除选中的所有用户？"
          style="margin: 0 5px"
          @confirm="confirmDeleteBatchUsers"
        >
    <el-button type="danger" slot="reference">批量删除 <i class="el-icon-delete"></i></el-button>
    </el-popconfirm>
    <el-button type="warning">导入 <i class="el-icon-upload2"></i></el-button>
    <el-button type="success">导出 <i class="el-icon-download"></i></el-button>
  </div>
  <el-table :data="tableData" stripe border header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column prop="id" label="用户ID" width="300">
    </el-table-column>
    <el-table-column prop="userName" label="用户名" width="140">
    </el-table-column>
    <el-table-column prop="nickname" label="昵称" width="120">
    </el-table-column>
    <el-table-column prop="address" label="地址">
    </el-table-column>
    <el-table-column prop="emailAddress" label="电子邮箱">
    </el-table-column>
    <el-table-column prop="phoneNumber" label="电话号码">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="success" @click="editUser(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
        <el-popconfirm
          confirm-button-text='确定'
          cancel-button-text='不用了'
          icon="el-icon-info"
          icon-color="red"
          title="确定删除该用户？"
          style="margin-left: 5px"
          @confirm="confirmDeleteUser(scope.row.id)"
        >
        <el-button type="danger" slot="reference">删除 <i class="el-icon-remove"></i></el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  
  <!-- 修改、新增弹窗 -->
  <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
    <el-form>
      <el-form-item v-if="actionType===1" label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.emailAddress" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" :label-width="formLabelWidth">
        <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>

  <!-- 分页插件 -->
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.pageNum"
      :page-sizes="pageSizes"
      :page-size="this.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
 </div>
</template>

<script>
export default {
    name: 'User',
    data() {
        return {
          //侧边栏折叠
          collapseButtonIcon: "el-icon-s-fold",
          isCollapse: true,
          sideWidth: 64,
          //分页查询
          tableData: [],
          total: 0,
          pageSizes: [5, 10, 15, 20],
          pageSize: 5,
          pageNum: 1,
          //输入查询
          inputUserName: "",
          inputEmail: "",
          inputPhone: "",
          //新增、编辑操作
          dialogFormVisible: false,
          form: {},
          actionType: 0,//添加为1，修改为0
          formLabelWidth: "120px",
          //多选操作
          multipleSelection: []
        }
    },
    created() {
        //请求分页查询数据
        this.getPageOfUsers();
    },
    methods: {
        //分页查询用户
        getPageOfUsers() {
            // this.axios.get(`/user/page?page=${this.pageNum}&pageSize=${this.pageSize}&userName=${this.inputUserName}&emailAddress=&this.inputEmail&phoneNumber=this.inputPhone`)
            let requestUrl = `/user/page?page=${this.pageNum}&pageSize=${this.pageSize}`;
            if (this.inputUserName.trim() !== "") {
                requestUrl += "&userName=" + this.inputUserName;
            }
            if (this.inputEmail.trim() !== "") {
                requestUrl += "&emailAddress=" + this.inputEmail;
            }
            if (this.inputPhone.trim() !== "") {
                requestUrl += "&phoneNumber=" + this.inputPhone;
            }
            this.axios.get(requestUrl).then(res => {
                this.tableData = res.data.data.records;
                this.total = res.data.data.total;
            });
        },
        handleSizeChange(newPageSize) {
            this.pageSize = newPageSize;
            this.getPageOfUsers();
        },
        handleCurrentChange(newCurrentPage) {
            this.pageNum = newCurrentPage;
            this.getPageOfUsers();
        },
        //重置输入
        resetInput() {
            this.inputUserName = this.inputEmail = this.inputPhone = "";
            this.getPageOfUsers();
        },
        addUser() {
            this.dialogFormVisible = true;
            this.form = {};
            this.actionType = 1;
        },
        editUser(row) {
            this.dialogFormVisible = true;
            this.form = row;
            this.actionType = 0;
        },
        //新增、编辑用户
        save() {
            if (this.actionType === 0) {
                this.axios.put("/user", this.form).then(res => {
                    if (res.data.code == 1) {
                        this.$message.success("保存成功!");
                    }
                    else {
                        this.$message.error(res.data.msg);
                    }
                    this.getPageOfUsers();
                });
            } else {
                this.axios.post("/user", this.form).then(res => {
                    if (res.data.code == 1) {
                      this.$message.success("添加成功!");
                    }
                    else {
                        this.$message.error(res.data.msg);
                    }
                    this.getPageOfUsers();
                });
            }
            this.dialogFormVisible = false;
        },
        //删除单个用户
        confirmDeleteUser(id) {
            this.axios.delete(`/user/del?id=${id}`).then(res => {
                if (res.data.code == 1) {
                    this.$message.success("删除成功!");
                    this.getPageOfUsers();
                }
                else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        //选择用户
        handleSelectionChange(users) {
            this.multipleSelection = users;
        },
        //批量删除用户
        confirmDeleteBatchUsers() {
            let ids = this.multipleSelection.map(v => v.id);
            if (ids.length == 0) {
                this.$message.warning("当前未选中任何用户！");
                return;
            }
            console.log({ data: ids });
            this.axios.delete("user/del/batch", { data: ids }).then(res => {
                if (res.data.code == 1) {
                    this.$message.success("批量删除成功!");
                    this.getPageOfUsers();
                }
                else {
                    this.$message.error(res.data.msg);
                }
            });
        }
    }
}
</script>
<style scoped>
  .headerBg {
    background-color: #d7e1ec !important;
  }
</style>

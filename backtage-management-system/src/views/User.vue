<template>
  <div class="manage">
    <div class="flexBox">
      <el-button class="addButton" type="primary" @click="addUser"
        >+ 新增</el-button
      >
      <!-- 搜索区域 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input
            v-model="formInline.userName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchName">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 对话框 -->
    <el-dialog
      :title="modelType === 0 ? '新增用户' : '编辑用户'"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form
        :rules="rules"
        :inline="true"
        label-position="right"
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="tableBox">
      <el-table :data="tableData" style="width: 100%" stripe height="100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex == "1" ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button @click="editUser(scope.row)">编辑</el-button>
            <el-button type="danger" @click="deleteUser(scope.row)"
              >删除</el-button
            >
          </template></el-table-column
        >
      </el-table>
    </div>

    <!-- 分页 -->
    <el-pagination
      @current-change="pageChange"
      layout="prev, pager, next"
      :total="totalPage"
      :page-size="pageSize"
    >
    </el-pagination>
  </div>
</template>

<script>
import {
  getUserList,
  createUser,
  updateUser,
  deleteUser,
} from "../api/request";
export default {
  name: "User",
  props: {},
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
          },
        ],
        age: [
          {
            required: true,
            message: "请输入年龄",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
          },
        ],
        birth: [
          {
            required: true,
            message: "请输入日期",
          },
        ],
        addr: [
          {
            required: true,
            message: "请输入地址",
          },
        ],
      },
      formInline: {
        userName: "",
      },
      tableData: [],
      modelType: 0, //0表示新增用户弹窗 1表示编辑用户弹窗
      totalPage: 0,
      pageSize: 10,
      curPage: 1,
    };
  },
  mounted() {
    this.getUserList(this.curPage);
  },
  methods: {
    // 获取用户列表
    getUserList(page, limit, name) {
      getUserList({ name, page, limit: limit || 10 }).then((res) => {
        if (name) {
          if (res.list.length === 0) {
            this.$message({
              type: "warning",
              message: "查无此人",
            });
          } else {
            this.$message({
              type: "success",
              message: "查询成功",
            });
          }
        }

        console.log(res);
        this.tableData = res.list;
        this.totalPage = res.count;
      });
    },
    // 新增用户按钮
    addUser() {
      this.dialogVisible = true;
      this.modelType = 0;
    },
    // 姓名查询
    searchName() {
      this.getUserList(null, null, this.formInline.userName);
    },
    // 提交新增用户
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modelType === 0) {
            // 增加用户
            createUser(this.form).then((res) => {
              //添加成功
              if (res.code === 20000) {
                this.$message({
                  type: "success",
                  message: "添加成功!",
                });
              }
              // 重新获取用户列表
              this.getUserList(this.curPage);
            });
          } else {
            const newInfo = this.form;
            // 编辑用户
            updateUser(newInfo).then((res) => {
              if (res.code === 20000) {
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
                // 重新获取用户列表
                this.getUserList(curPage);
              }
            });
          }

          // 重置表单
          this.$refs.form.resetFields();
          // 关闭弹窗
          this.dialogVisible = false;
        }
      });
    },
    // 编辑用户按钮
    editUser(row) {
      this.modelType = 1;
      this.dialogVisible = true;
      const userInfo = JSON.parse(JSON.stringify(row));
      this.form = userInfo;
    },
    // 删除用户按钮
    deleteUser(info) {
      const id = info.id;
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除用户
          deleteUser({ id }).then((res) => {
            if (res.code === 20000) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              //更新用户
              this.getUserList(this.curPage);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击'x'关闭弹窗
    handleClose(done) {
      done();
    },
    // 改变页数
    pageChange(page) {
      this.curPage = page;
      this.getUserList(page, this.pageSize);
    },
  },
};
</script>

<style scoped>
.manage {
  .flexBox {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tableBox {
    height: 77vh;
  }
  .el-pagination {
    text-align: right;
  }
}
</style>

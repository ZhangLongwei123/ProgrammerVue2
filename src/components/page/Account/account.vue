<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-button type="primary" @click="visible = true">添加课程类型</el-button>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                    :data="nowTableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="t_user_id" label="账号ID" width="55" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="nickname" label="昵称"></el-table-column>
                <el-table-column prop="user_sex" label="性别"></el-table-column>
                <el-table-column prop="true_name" label="真实姓名"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="aliPay" label="支付宝账号"></el-table-column>
                <el-table-column prop="tscore" label="讲师评分"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                @click="handleDel(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="tableData.length"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" label-width="100px">
                <el-form-item label="课程类型名">
                    <el-input v-model="editDname"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 类型管理弹出框     -->
        <el-dialog v-dialogDrag title="课程类型添加" center :visible.sync="visible" width="30%">
            <el-form ref="form" label-width="150px">
                <el-form-item label="课程类型名">
                    <el-input v-model="AddCname" style="width: 200px;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="AddCourset">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import { fetchData } from '../../../api';
    import axios from 'axios'
    import qs from 'qs'
    import Vue from 'vue'
    Vue.prototype.$axios = axios
    // axios.defaults.baseURL = '/personnel'
    // Vue.use(axios)
    Vue.prototype.$qs = qs
    export default {
        name: 'basetable',
        data() {
            return {
                editDname: '',
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 5
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                visible: false,
                AddCname: '',
                pageTotal: 0,
                idx: -1,
                id: -1
            };
        },
        mounted() {
            this.getData();
        },
        computed:{
            nowTableData(){
                return this.tableData.slice((this.query.pageIndex-1)*this.query.pageSize,this.query.pageIndex*this.query.pageSize);
            }
        },
        methods: {
            handleDel(row){
                this.$axios2.post('/course/delOneCourseType', {course_type_id:row.course_type_id}).then(res => {
                    if (res == 1) {
                        this.$message.success(`删除成功`);
                        this.getData();
                    }else{
                        this.$message.warning("删除失败");
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //添加课程类型操作
            AddCourset(){
                this.$axios2.post('/course/addOneCourseType',{course_type_name:this.AddCname}).then(res => {
                    if(res == 1){
                        this.$message.success('添加成功！');
                        this.visible = false;
                        this.getData();
                    }else{
                        this.$message.warning('添加失败！')
                    }
                })
            },
            // 获取到课程类型
            getData() {
                this.$axios2.get('/UserAccountController/QueryUserAccount').then(res => {
                    this.tableData = res
                })
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'pageIndex', 1);
                this.getData();
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 编辑操作
            handleEdit(row) {
                this.idx = row.course_type_id;
                this.editDname = row.course_type_name;
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.$axios2.post('/course/updateOneCourseType', {course_type_id:this.idx,course_type_name:this.editDname}).then(res => {
                    if (res == 1) {
                        this.$message.success(`修改第 ${this.idx } 行成功`);
                        this.editVisible = false;
                        this.getData();
                    }else{
                        this.$message.warning("修改失败");
                    }
                }).catch(err => {
                    console.log(err)
                })

            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>

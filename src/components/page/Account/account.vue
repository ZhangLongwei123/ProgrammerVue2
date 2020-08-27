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
                <el-table-column prop="isenabled" label="是否可用"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.row)"
                        >禁用</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                @click="handleDel(scope.row)"
                        >解封</el-button>
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
        <el-dialog title="" :visible.sync="editVisible" width="30%">
            <el-form ref="form" label-width="100px">
                <el-form-item label="封禁原因">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 3, maxRows: 5}"
                            placeholder="请输入封禁原因"
                            v-model="baninfo">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
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
                baninfo: '',
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
            // 获取
            getData() {
                this.$axios2.get('UserAccountController/QueryUserAccount').then(res => {
                    this.tableData = res
                })
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'pageIndex', 1);
                this.getData();
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 编辑操作
            handleEdit(row) {
                this.idx = row.t_user_id;
                this.editVisible = true;
            },
            // 保存编辑ban_teacher:0,bandate:new Date(),ban_result:this.baninfo
            saveEdit() {
                this.$axios2.post('/UserAccountController/EditUserAccountPwdOrIsenable', {t_user_id:this.idx,isenabled:0}).then(res => {
                    if(res == 1){
                        this.$message.success("禁用成功")
                    }else{
                        this.$message.warning(("操作失败"))
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

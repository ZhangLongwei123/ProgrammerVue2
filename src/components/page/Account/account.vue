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
                <el-input v-model="query.username" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-input v-model="query.phone" placeholder="手机号" class="handle-input mr10"></el-input>
                <el-input v-model="query.true_name" placeholder="真实姓名" class="handle-input mr10"></el-input>
                <el-input v-model="query.email" placeholder="邮箱" class="handle-input mr10"></el-input>
                <el-checkbox label="讲师" v-model="query.is_teacher"></el-checkbox>
                <el-checkbox label="用户" v-model="query.is_user"></el-checkbox>
                <el-button type="primary" style="margin-left: 20px;" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
                                @click="disableAccount(scope.row)"
                        >禁用</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                @click="enableAccount(scope.row)"
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
                    pageIndex: 1,
                    pageSize: 5,
                    username:'',
                    phone:'',
                    true_name:'',
                    email:'',
                    is_teacher:'',
                    is_user:''
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
                let ist = -1;
                if (this.query.is_teacher==true && this.query.is_user==""){
                    ist = 1;
                }else if (this.query.is_teacher=="" && this.query.is_user==true){
                    ist = 0;
                }
                this.$axios2.post('UserAccountController/queryByLike',{username:this.query.username,phone:this.query.phone, true_name:this.query.true_name, email:this.query.email,is_teacher:ist}).then(res => {
                    this.tableData = res;

                }).catch(err=>console.log(err));
                // this.getData();
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 编辑操作
            disableAccount(row) {
                if(row.isenabled==0){
                    this.$message({ duration:1500,message:"已经禁用了呢",type:"info" });
                    return;
                }
                // TODO 弹框确认
                this.$axios2.post('UserAccountController/EditUserAccountPwdOrIsenable',{t_user_id:row.t_user_id,isenabled:0}).then(data2=>{
                    if (data2==1){
                        this.$message({ duration:1500,message:"禁用成功",type:"success" });
                    }else {
                        this.$message({ duration:1500,message:"操作失败",type:"warning" });
                    }
                    this.getData();
                }).catch(err=>console.log(err));
            },
            // 保存编辑
            enableAccount(row) {
                if(row.isenabled==1){
                    this.$message({ duration:1500,message:"已经解封了呢",type:"info" });
                    return;
                }
                // TODO 弹框确认
                this.$axios2.post('UserAccountController/EditUserAccountPwdOrIsenable',{t_user_id:row.t_user_id,isenabled:1}).then(data2=>{
                    if (data2==1){
                        this.$message({ duration:1500,message:"解封成功",type:"success" });
                    }else {
                        this.$message({ duration:1500,message:"操作失败",type:"warning" });
                    }
                    this.getData();
                }).catch(err=>console.log(err));
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
        margin-left: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 200px;
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

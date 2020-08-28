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
                <el-input v-model="query.username" placeholder="讲师名" class="handle-input mr10"></el-input>
                <el-input v-model="query.phone" placeholder="手机号" class="handle-input mr10"></el-input>
                <el-input v-model="query.true_name" placeholder="真实姓名" class="handle-input mr10"></el-input>
                <el-input v-model="query.email" placeholder="邮箱" class="handle-input mr10"></el-input>
                <el-checkbox label="讲师" v-model="query.is_teacher"></el-checkbox>
                <el-checkbox label="用户" v-model="query.is_user"></el-checkbox>
                <el-button type="primary" style="margin-left: 20px;" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" style="margin-left: 20px;" icon="el-icon-search" @click="editTeacher">设置推荐讲师</el-button>
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
                <el-table-column prop="t_user_id" label="讲师编号" width="55" align="center"></el-table-column>
                <el-table-column prop="true_name" label="讲师名"></el-table-column>
                <el-table-column label="头像">
                    <template slot-scope="scope">
                        <img :src="scope.row.pic" width="60" height="60"/>
                    </template>
                </el-table-column>
                <el-table-column prop="user_sex" label="性别"></el-table-column>
                <el-table-column prop="course_type_name" label="所教专业"></el-table-column>
                <el-table-column prop="teach_age" label="教龄"></el-table-column>
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="60%">
            <el-table
                    :data="TeacherData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
<!--                <el-table-column  width="55" align="center"  >-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-checkbox  :key="scope.row.t_user_id"></el-checkbox>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="t_user_id" label="讲师编号" width="55" align="center"></el-table-column>
                <el-table-column prop="true_name" label="讲师名"></el-table-column>
                <el-table-column label="头像">
                    <template slot-scope="scope">
                        <img :src="scope.row.head_protrait" width="50" height="50"/>
                    </template>
                </el-table-column>
                <el-table-column prop="score" label="所教专业"></el-table-column>
                <el-table-column prop="tscore" label="讲师评分"></el-table-column>
                <el-table-column prop="diploma" label="文凭"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="disableAccount">确 定</el-button>
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
    Vue.prototype.$qs = qs
    export default {
        name: 'basetable',
        data() {
            return {
                thisinfo:{},
                baninfo: '',
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
                selectData:'',
                tableData: [],
                TeacherData:[],
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
            editTeacher(){
                this.editVisible = true;
                this.$axios2.get('TeacherEnterController/queryByTscore').then(res => {
                    this.TeacherData = res
                })
            },
            test(){
                alert("你好啊!")
            },
            // 获取
            getData() {
                this.$axios2.get('TbRecommendTeacherController/QueryUserRecommendTeacher').then(res => {
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
                // this.selectData.map( item => {
                //     this.selectData.push(item);
                // });
                // console.log()
                let objfa  = val.map(x =>
                {
                    // arr.push(x.course_type_id)
                    // arr.push(x.head_protrait)
                    // arr.push(5)
                    // arr.push("这是一个非常和蔼的老师")
                    // arr.push(x.diploma)
                    let obj = {
                        'teacherName':x.t_user_id,
                        'typeId':x.course_type_id,
                        'pic':x.head_protrait,
                        'teachAge':30,
                        'teacheriItroduction':"我们可牛逼了",
                        'educationBackgroud':x.diploma,
                        'userAccountList':null
                    }
                    return obj;
                })
                this.selectData = JSON.stringify(objfa);
                console.log(this.selectData)

            },
            // 添加推荐讲师操作
            disableAccount() {
                this.$axios2.post('TbRecommendTeacherController/Teacher',{'ReTeacherArr':this.selectData}).then(data2=>{
                    if(data2 == 1){
                        this.$message({ duration:1500,message:"推荐成功！",type:"success" })
                        this.editVisible = false
                        getData()
                    }else{
                        this.$message({ duration:1500,message:"操作失败！",type:"warning" })
                    }
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

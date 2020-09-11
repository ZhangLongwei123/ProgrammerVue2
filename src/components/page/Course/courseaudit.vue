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
            <el-table
                    :data="nowTableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="course_name" label="课程名" align="center"></el-table-column>
                <el-table-column prop="course_type" label="课程类型"></el-table-column>
                <el-table-column prop="true_name" label="讲师名"></el-table-column>
                <el-table-column prop="createdate" label="发布时间"></el-table-column>
                <el-table-column label="课程状态">待审核</el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="open(scope.row)"
                        >通过</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                @click="unopen(scope.row)"
                        >不通过</el-button>
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="60%">
            <el-table
                    :data="ReCourseData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >

            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="disableAccount">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
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
                ReCourseData:[],
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
            this.handlePageChange(1);
        },
        computed:{
            nowTableData(){
                return this.tableData.slice((this.query.pageIndex-1)*this.query.pageSize,this.query.pageIndex*this.query.pageSize);
            }
        },
        methods: {
            //审核通过操作
            PassCourse(row) {
                this.$axios2.post('course/passCourse',{course_flag:1,teacherId:row.teacher_id,courseId:row.course_id,approveFlag:1,approver:1}).then(data2=>{
                    if (data2==1){
                        this.$message({ duration:1500,message:"操作成功",type:"success" });
                        this.handlePageChange(1);
                    }else {
                        this.$message({ duration:1500,message:"操作失败",type:"warning" });
                    }
                    this.handleSearch();
                }).catch(err=>console.log(err));
            },
            //审核不通过操作
            UnPassCourse(row) {
                this.$axios2.post('course/passCourse',{course_flag:-1,teacherId:row.teacher_id,courseId:row.course_id,approveFlag:0,approver:1}).then(data2=>{
                    if (data2==1){
                        this.$message({ duration:1500,message:"操作成功",type:"success" });
                        this.handlePageChange(1);
                    }else {
                        this.$message({ duration:1500,message:"操作失败",type:"warning" });
                    }
                    this.handleSearch();
                }).catch(err=>console.log(err));
            },
            //确认审核是否通过
            open(row) {
                this.$confirm('确定通过该课程吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() => {
                    this.PassCourse(row);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            unopen(row) {
                this.$confirm('确定不通过该课程吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.UnPassCourse(row);
                    this.getData();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            setRecomCourse(){
                this.editVisible = true;
                this.$axios2.get('course/queryWithCourseTypeAndTea').then(res => {
                    this.ReCourseData = res

                })
            },
            // 获取
            getData() {
                this.$axios2.get('course/queryNewCourse').then(res => {
                    this.tableData = res
                })
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
                let objfa  = val.map(x =>
                {
                    let obj = {
                        'remcommendId':0,
                        'courseName':x.course_name,
                        'courseBrief':x.course_introduce,
                        'teacherId':x.teacher_id,
                        'teacherBrief':"我们是专业团队",
                        'startDate':x.createdate,
                        'count':1000,
                        'courseId':x.course_id
                    }
                    return obj;
                })
                this.selectData = JSON.stringify(objfa);
            },
            //
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

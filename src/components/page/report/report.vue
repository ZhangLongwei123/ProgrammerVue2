<template>
    <div>
        <div class="handle-box">
            <template>
                <el-radio v-model="radio1" :label="0">讲师</el-radio>
                <el-radio v-model="radio1"  :label="1">课程</el-radio>
            </template>
            <template>
                <el-select v-model="radio2" placeholder="请选择">
                    <el-option label="未处理" :value="0"></el-option>
                    <el-option label="举报有效" :value="1"></el-option>
                    <el-option label="举报无效" :value="2"></el-option>
                </el-select>
            </template>
            <el-button type="primary" style="margin-left: 20px;" icon="el-icon-search" @click="getData">搜索</el-button>
        </div>
        <el-table
                :data="nowTableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
        >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="userId" label="编号" width="55" align="center"></el-table-column>
            <el-table-column prop="reportType" label="举报类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.reportType=='0'">讲师</span>
                    <span v-if="scope.row.reportType=='1'">课程</span>
                </template>
            </el-table-column>
            <el-table-column prop="content" label="举报原因"></el-table-column>
            <el-table-column prop="reported" label="被举报对象"></el-table-column>
            <el-table-column prop="reportedate" label="举报时间"></el-table-column>
            <el-table-column prop="dealFlag" label="处理状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.dealFlag=='0'">未处理</span>
                    <span v-if="scope.row.dealFlag=='1'">有效举报</span>
                    <span v-if="scope.row.dealFlag=='2'">无效举报</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="open(scope.row)"
                    >处理</el-button>
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
</template>
<script>
    export default {
        name: 'dept',
        data:function(){
            return {
                tableData:[],
                deptName:'',
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 5
                },
                editVisible: false,
                radio1:1,
                radio2:0,
                editDept:{
                    did:'',
                    dname:''
                }
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
        methods:{
            handleEdit(row){
                this.editDept = Object.assign({},row);
                this.editVisible = true;
            },
            handleDel(row){
                this.$axios2.post('personnel/removeDep.do',{id:row.did}).then(res => {
                    if (res==1){
                        this.$message({ duration:2000,message:"删除成功",type:"success" });
                        this.getData();
                    }else {
                        this.$message({ duration:2000,message:"删除失败",type:"warning" });
                    }
                }).catch(err=>console.log(err));
            },
            eidtDeptName(){
                this.$axios2.post('personnel/updateDep',this.editDept).then(res => {
                    if (res==1){
                        this.$message({ duration:2000,message:"修改成功",type:"success" });
                        this.editVisible = false;
                        this.getData();
                    }else {
                        this.$message({ duration:2000,message:"修改失败,可能这个名字已经存在了",type:"warning" });
                    }
                }).catch(err=>console.log(err));
            },
            getData() {
                console.log(this.radio1)
                this.$axios2.post('TbReportController/queryTbReport',{reportType:this.radio1,dealFlag:this.radio2}).then(res => {
                    this.tableData = res;
                    if (this.tableData.length % this.query.pageSize==0 &&  this.query.pageIndex!=1){
                        this.$set(this.query, 'pageIndex',this.query.pageIndex-1);
                    }
                }).catch(err=>console.log(err));
            },
            addDept(){
                if (this.deptName==""){
                    this.$message({ duration:2000,message:"名字不能为空",type:"info" });
                    return;
                }
                this.$axios2.post('personnel/addDep.do',{dname:this.deptName}).then(res => {
                    if (res==1){
                        this.$message({ duration:2000,message:"添加成功",type:"success" });
                        this.getData();
                    }else {
                        this.$message({ duration:2000,message:"添加失败,可能这个名字已经存在了",type:"warning" });
                    }
                }).catch(err=>console.log(err));
            },
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            },
            open(row,flag) {
                console.log(row)
                this.$confirm(`是否封禁该${this.radio1==0?'课程':'讲师'}, 是否继续?`, '提示', {
                    confirmButtonText: '封禁',
                    cancelButtonText: '忽略',
                    type: 'warning',
                    center: true
                }).then(() => {
                    //TODO 访问数据库
                    this.$axios2.post('TbReportController/editTbReport',{userId:row.userId,
                        reportType:row.reportType,content:row.content,reported:row.reported,dealFlag:1
                    }).then(data2=>{
                            console.log("hello22222222"+","+data2);
                            if (data2==1){
                                this.$message.success('已封禁');
                            }
                        }).catch(err=>console.log(err))
                }).catch(() => {
                    this.$axios2.post('TbReportController/editTbReport',{userId:row.userId,
                        reportType:row.reportType,content:row.content,reported:row.reported,dealFlag:0
                    }).then(data2=>{
                        console.log("hello22222222"+","+data2);
                        if (data2==1){
                            this.$message.success('已忽略');
                        }
                    }).catch(err=>console.log(err))
                });
            }
        }
    };
</script>

<style scoped>
    #header{
        margin-left:10px;
        margin-top:10px;
        margin-right:10px;
        padding-top:18px;
        padding-left:370px;
        padding-bottom:14px;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .el-table{
        margin: 0 auto;
    }
    .handle-box{
        text-align: center;
    }
</style>

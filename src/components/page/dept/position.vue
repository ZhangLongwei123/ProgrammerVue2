<template>
    <div>
        <div id="header">
            <div class="handle-box">
                <el-input v-model="deptName" placeholder="新部门名称" class="handle-input mr10"></el-input>
                <el-input v-model="deptName" placeholder="新部门名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-commit" @click="addDept">添加</el-button>
            </div>
        </div>
        <el-table
                :data="nowTableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
        >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="did" label="编号" width="55" align="center"></el-table-column>
            <el-table-column prop="dname" label="部门名称"></el-table-column>
            <el-table-column prop="dname" label="部门名称"></el-table-column>
            <el-table-column prop="dname" label="部门名称"></el-table-column>
            <el-table-column prop="dname" label="部门名称"></el-table-column>

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
        <el-dialog v-dialogDrag title="部门名称修改" center :visible.sync="editVisible" width="30%">
            <el-form ref="form" label-width="150px">
                <el-form-item label="课程类型名">
                    <el-input v-model="editDept.did" readonly style="width: 200px;"></el-input>
                    <el-input v-model="editDept.dname" style="width: 200px;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="eidtDeptName">确 定</el-button>
            </span>
        </el-dialog>
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
                this.$axios2.post('personnel/queryDep').then(res => {
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
            getDep() {
                this.$axios2.post('personnel/queryDep').then(res => {
                    this.tableData = res;
                    if (this.tableData.length % this.query.pageSize==0 &&  this.query.pageIndex!=1){
                        this.$set(this.query, 'pageIndex',this.query.pageIndex-1);
                    }
                }).catch(err=>console.log(err));
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
        width: 150px;
        display: inline-block;
    }
    .el-table{
        margin: 0 auto;
    }
</style>

<template>
    <div>
        <div id="header">
            <div class="handle-box">
                <el-input v-model="deptName" placeholder="新部门名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-commit" @click="tipShow">提交</el-button>
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
            <el-table-column prop="course_type_id" label="ID" width="55" align="center"></el-table-column>
            <el-table-column prop="course_type_name" label="用户名"></el-table-column>

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
    </div>
</template>

<script>
    export default {
        name: 'dept',
        data:function(){
            return {
                deptName:'',
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 5
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
            tipShow(){
                console.log(this.deptName);
            },
            handleEdit(row){
                console.log(row)
            },
            handleDel(row){
                console.log("del id:"+row);
            },
            getData() {
                this.$axios2.get('/personnel/queryDept').then(res => {
                    console.log(res);
                    this.tableData = res
                }).catch(err=>console.log(err));
            },
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
</style>

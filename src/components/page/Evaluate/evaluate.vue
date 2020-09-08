<template>
    <div>
        <el-input v-model="allName" placeholder="编号 用户编号 " style="width: 50%" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-commit" @click="QueryEvaluateTeacherId()">搜索</el-button>
        <el-table :data="nowTableData">
            <el-table-column label="编号" prop="evalute_id"></el-table-column>
            <el-table-column label="用户编号" prop="user_id"></el-table-column>
            <el-table-column label="被评论讲师" prop="teacher_id"></el-table-column>
            <el-table-column label="评论内容" prop="content"></el-table-column>
            <el-table-column label="星级点评(1-5)" prop="comment"></el-table-column>
            <el-table-column label="回复目标编号" prop="parent_id"></el-table-column>
            <el-table-column label="评价时间" prop="commentdate"></el-table-column>
            <el-table-column lable="操作">
                <template slot-scope="scope">
                    <el-button round size="mini" type="warning" @click="del(scope.row)">删除</el-button>
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
        name: 'evaluate',
        data: function () {
            return {
                tableData:[],
                title: '',
                evaluateTeacher: '',
                allName:'',
                query: {
                    pageIndex: 1,
                    pageSize: 5

                }
            }

        },
        mounted(){
            this.getData()
        },
        computed:{
            nowTableData(){
                return this.tableData.slice((this.query.pageIndex-1)*this.query.pageSize,this.query.pageIndex*this.query.pageSize);
            }
        },
        methods: {
            getData() {
                this.$axios2.post('TbEvaluateTeacherController/QueryTbEvaluateTeacher').then(res => {
                    this.tableData = res
                })
            },
            QueryEvaluateTeacherId() {
                console.log(this.allName)
                this.$axios2.post('TbEvaluateTeacherController/QueryEvaluateTeacherId',{allLikeName:this.allName}).then(res => {
                    this.tableData = res
                })
            },
            del: function (row) {

                this.$axios2.post('TbEvaluateTeacherController/DelTbEvaluateTeacher',{evalute_id:row.evalute_id}).then(data2=>{
                    console.log(data2)
                    if (data2==1){
                        this.$message({ duration:1500,message:"删除成功",type:"success" });
                    }else {
                        this.$message({ duration:1500,message:"操作失败",type:"warning" });
                    }
                    this.getData();
                }).catch(err=>console.log(err));
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
            }
        },

    };
</script>

<style scoped>

</style>

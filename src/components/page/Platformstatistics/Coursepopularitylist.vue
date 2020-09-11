<template>
    <div>
        <el-input v-model="allName" placeholder="编号 课程名称 " style="width: 50%" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-commit" @click="getData2()">搜索</el-button>
        <el-table :data="nowTableData">
            <el-table-column label="编号" prop="course_id"></el-table-column>
            <el-table-column label="课程名称" prop="course_name"></el-table-column>
            <el-table-column label="课程评分" prop="course_score"></el-table-column>
            <el-table-column label="课程状态" prop="course_flag">
                <template slot-scope="scope">
                    <span v-if="scope.row.course_flag=='-1'">下架</span>
                    <span v-if="scope.row.course_flag=='0'">即将下架</span>
                    <span v-if="scope.row.course_flag=='1'">上架</span>
                </template>
            </el-table-column>
            <el-table-column label="讲师" prop="teacher_id"></el-table-column>
            <el-table-column label="课程类别" prop="course_type"></el-table-column>



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
        name: 'Coursepopularitylist',
        data: function () {
            return {
                dialogFormVisible: false,
                tableData:[],
                Order: {},
                title: '',
                query: {
                    pageIndex: 1,
                    pageSize: 5

                },
                allName:''


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
                this.$axios2.post('course/Coursepopularitylist').then(res => {
                    this.tableData = res
                })
            },
            getData2() {
                this.$axios2.post('course/SerachBycourse_id',{allLikeName:this.allName}).then(res => {
                    this.tableData = res
                })
            }
            ,
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
            }
        },

    };


</script>

<style scoped>

</style>

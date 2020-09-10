<template>
    <div>
        <el-input v-model="allName" placeholder="用户编号 课程编号 " style="width: 50%" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-commit" @click="getData2()">搜索</el-button>
        <el-table :data="nowTableData">
            <el-table-column label="编号" prop="collection_id"></el-table-column>
            <el-table-column label="用户" prop="user_id"></el-table-column>
            <el-table-column label="课程编号" prop="course_id"></el-table-column>
            <el-table-column label="收藏时间" prop="collectiondate"></el-table-column>
            <el-table-column label="视频来源(老师名)" prop="video_source"></el-table-column>
            <el-table-column label="收藏量" prop="cou"></el-table-column>
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
        name: 'collectionCourse',
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
                this.$axios2.post('TbCollectionController/SearchCourseCollection').then(res => {
                    this.tableData = res
                })
            },
            getData2() {
                this.$axios2.post('TbCollectionController/SerachCollectionBycollection_id',{allLikeName:this.allName}).then(res => {
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

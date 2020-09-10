<template>
    <div>
        <el-input v-model="allName" placeholder="用户名 编号 手机号" style="width: 50%" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-commit" @click="getData2()">搜索</el-button>
        <el-table :data="nowTableData" :row-class-name="rowClassName">
            <el-table-column label="编号" prop="t_user_id"></el-table-column>
            <el-table-column label="用户名" prop="username"></el-table-column>
            <el-table-column label="性别" prop="user_sex"></el-table-column>
            <el-table-column label="头像" prop="head_protrait"></el-table-column>
            <el-table-column label="真实姓名" prop="true_name"></el-table-column>
            <el-table-column label="手机号" prop="phone"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="评分" prop="tscore"></el-table-column>
            <el-table-column label="名次" prop="xh"></el-table-column>
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
        name: 'teacherTop',
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
                this.$axios2.post('course/TeacherTop').then(res => {
                    this.tableData = res
                })
            },
            getData2() {
                this.$axios2.post('course/Qtb_user_teacherByt_user_id',{allLikeName:this.allName}).then(res => {
                    this.tableData = res
                })
            }
            ,
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
            } ,
            rowClassName({ row, rowIndex }) {
                row.xh = parseInt(rowIndex + 1)+parseInt((this.query.pageIndex-1)*this.query.pageSize);
            },

        },

    };

</script>

<style scoped>

</style>

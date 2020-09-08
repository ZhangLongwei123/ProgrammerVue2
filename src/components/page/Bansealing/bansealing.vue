<template>
    <div>
    <el-input v-model="allName" placeholder="订单编号" style="width: 50%" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-commit" @click="QuerybanId()">搜索</el-button>
        <el-table :data="nowTableData">
        <el-table-column label="编号" prop="ban_id"></el-table-column>
        <el-table-column label="禁封状态" prop="ban_teacher">
        <template slot-scope="scope">
        <span v-if="scope.row.ban_teacher=='0'">禁封</span>
        <span v-if="scope.row.ban_teacher=='1'">解封</span>
        </template>
        </el-table-column>
        <el-table-column label="禁封时间" prop="bandate"></el-table-column>
        <el-table-column label="禁封原因" prop="ban_result"></el-table-column>

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
        name: 'bansealing',
        data: function () {
            return {
                tableData:[],
                Order: {},
                title: '',
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
                this.$axios2.post('TbForbiddenController/QueryTbForbidden').then(res => {
                    this.tableData = res
                })
            },
            QuerybanId() {
                console.log(this.allName)
                this.$axios2.post('TbForbiddenController/QuerybanId',{banId:this.allName}).then(res => {
                    this.tableData = res
                })
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

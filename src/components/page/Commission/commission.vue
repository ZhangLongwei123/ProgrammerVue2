<template>
    <div>
        <el-input v-model="allName" placeholder="订单编号 讲师编号 " style="width: 50%" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-commit" @click="getData()">搜索</el-button>
        <el-table :data="nowTableData">
            <el-table-column label="订单编号" prop="orderId"></el-table-column>
            <el-table-column label="交易完成时间 " prop="finishTime"></el-table-column>
            <el-table-column label="课程定价" prop="coursePrice"></el-table-column>
            <el-table-column label="平台盈利" prop="platformProfit"></el-table-column>
            <el-table-column label="讲师编号 " prop="teacherId"></el-table-column>
            <el-table-column label="讲师收益 " prop="teacherBalance"></el-table-column>

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
        name: 'commission',
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
                this.$axios2.post('TbCommissionController/QueryQueryOrderId',{allLikeName:this.allName}).then(res => {
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

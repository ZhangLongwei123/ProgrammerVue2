<template>

    <div>
        <el-input v-model="QueryorderId" placeholder="订单编号" style="width: 40%" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-commit" @click="getData1()">搜索</el-button>
        <el-input v-model="QueryOrderCourseNameOver" placeholder="课程名称" style="width: 40%" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-commit" @click="getDataQueryOrderCourseNameOver()">搜索</el-button>

        <el-table :data="nowTableData">
            <el-table-column label="订单编号" prop="orderId"></el-table-column>
            <el-table-column label="课程名称" prop="tbCourse.courseName"></el-table-column>
            <el-table-column label="课程价格" prop="coursePrice"></el-table-column>
            <el-table-column label="下单时间" prop="startDate"></el-table-column>
            <el-table-column label="支付完成时间" prop="payTime"></el-table-column>
            <el-table-column label="用户名称" prop="userName"></el-table-column>
            <el-table-column label="支付方式" prop="payMethod">
                <template slot-scope="scope">
                    <span v-if="scope.row.payMethod=='0'">支付宝</span>
                </template>
            </el-table-column>
            <el-table-column label="支付流水号" prop="serialNum"></el-table-column>
            <el-table-column label="支付状态" prop="payFlag">
                <template slot-scope="scope">
                    <span v-if="scope.row.payFlag=='0'">未支付</span>
                    <span v-if="scope.row.payFlag=='1'">已支付</span>
                    <span v-if="scope.row.payFlag=='2'">已退款</span>
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
        name: 'financial',
        data: function () {
            return {
                tableData:[],
                Order: {},
                title: '',
                query: {
                    pageIndex: 1,
                    pageSize: 5

                },
                QueryorderId: '',
                QueryOrderCourseNameOver:''

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
                this.$axios2.post('TbOrderController/QueryOrderOver').then(res => {
                    this.tableData = res
                })
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
            },getData1() {
                console.log(this.QorderId);
                this.$axios2.post('TbOrderController/QorderId',{orderId:this.QueryorderId}).then(res => {
                    this.tableData = res
                })
            },
            getDataQueryOrderCourseNameOver(){
                console.log(this.QueryOrderCourseNameOver);
                this.$axios2.post('TbOrderController/QueryOrderCourseNameOver',{CourseName:this.QueryOrderCourseNameOver}).then(res => {
                    this.tableData = res
                })
            }
        },

    };

</script>

<style scoped>

</style>

<template>
    <div>
        <el-table :data="nowTableData">
            <el-table-column label="订单编号" prop="orderId"></el-table-column>
            <el-table-column label="课程编号" prop="courseId"></el-table-column>
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
                </template>
            </el-table-column>
            <el-table-column lable="操作">
                <template slot-scope="scope">
                    <el-button round size="mini" type="success" @click="show(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form label-width="100px">
                <el-form-item label="订单编号" >
                    <el-input v-model="Order.orderId"></el-input>
                </el-form-item>
                <el-form-item label="支付状态" >
                    <template>
                        <el-select v-model="Order.payFlag" placeholder="请选择" style="width:520px">
                            <el-option label="未支付" :value="0"></el-option>
                            <el-option label="已支付" :value="1"></el-option>
                        </el-select>
                    </template>
                </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="edit(),dialogFormVisible=false">确 定</el-button>
            </div>
        </el-dialog>
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
        name: 'order',
        data: function () {
            return {
                dialogFormVisible: false,
                tableData:[],
                Order: {},
                title: '',
                query: {
                    pageIndex: 1,
                    pageSize: 3,

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
                this.$axios2.post('TbOrderController/QueryTbOrder').then(res => {
                    this.tableData = res
                })
            },
            show: function (row) {

                    this.title === '修改';
                    this.dialogFormVisible = true
                    this.Order = Object.assign({}, row)

            },
            edit:function(){
                this.$axios2.post('TbOrderController/EditTbOrder',{orderId:this.Order.orderId,payFlag:this.Order.payFlag})
                    .then(response => {
                        if (response==1){
                            this.getData()
                        }
                    }).catch(err => {
                    this.$message.error('修改失败')
                });

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

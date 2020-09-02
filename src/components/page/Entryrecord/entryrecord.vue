<template>
    <div>
        <el-input v-model="allName" placeholder="讲师编号 身份证号 入驻结果 " style="width: 50%" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-commit" @click="getData()">搜索</el-button>
        <el-table :data="nowTableData">
            <el-table-column label="讲师入驻编号" prop="registerId"></el-table-column>
            <el-table-column label="入驻时间" prop="createdate"></el-table-column>
            <el-table-column label="文凭证书" prop="diploma"></el-table-column>
            <el-table-column label="身份证号" prop="idcard"></el-table-column>
            <el-table-column label="入驻结果" prop="is_success">
                <template slot-scope="scope">
                    <span v-if="scope.row.is_success=='0'">未通过</span>
                    <span v-if="scope.row.is_success=='1'">通过</span>
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
        name: 'entryrecord',
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
                this.$axios2.post('TeacherEnterController/queryByTscore',{allLikeName:this.allName}).then(res => {
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

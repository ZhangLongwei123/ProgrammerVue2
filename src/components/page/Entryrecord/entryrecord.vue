<template>
    <div>
        <el-input v-model="allName" placeholder="讲师编号 身份证号 入驻结果(-1未通过 0审核中 1通过)" style="width: 50%" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-commit" @click="getData()">搜索</el-button>
        <el-table :data="nowTableData">
            <el-table-column label="讲师入驻编号" prop="register_id"></el-table-column>
            <el-table-column label="入驻时间" prop="createdate"></el-table-column>
            <el-table-column label="文凭证书" prop="diploma">
                <template slot-scope="scope">
                    <span  @click="showPic(scope.row)" style="color: #409EFF;">查看证书</span>
                </template>
            </el-table-column>
            <el-table-column label="身份证号" prop="idcard"></el-table-column>
            <el-table-column label="入驻结果" prop="is_success">
                <template slot-scope="scope">
                    <span v-if="scope.row.is_success=='-1'">未通过</span>
                    <span v-if="scope.row.is_success=='0'">审核中</span>
                    <span v-if="scope.row.is_success=='1'">通过</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="letPass(scope.row)"
                    >通过</el-button>
                    <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="unPass(scope.row)"
                    >不通过</el-button>
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
            },
            showPic(row){
                let url = 'http://localhost:8066/course/getVideo2?fileContent='+row.diploma;
                console.log(url);
                window.open(url,'_blank');
            },
            letPass(row){
                if (row.is_success==1){
                    this.$message.info('已经通过了');
                    return;
                }
                this.$axios2.post('TeacherEnterController/editIs_SuccessById',{enterId:row.enter_id,is_success:1,registerId:row.register_id}).then(res=>{
                    if (res>0){
                        this.$message.success('操作成功');
                        this.getData();
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },
            unPass(row){
                if (row.is_success==-1){
                    this.$message.info('已经是不通过了');
                    return;
                }
                this.$axios2.post('TeacherEnterController/editIs_SuccessById',{enterId:row.enter_id,is_success:-1,registerId:row.register_id}).then(res=>{
                    if (res>0){
                        this.$message.success('操作成功');
                        this.getData();
                    }
                }).catch(err=>{
                    console.log(err);
                });
            }
        },

    };
</script>

<style scoped>

</style>

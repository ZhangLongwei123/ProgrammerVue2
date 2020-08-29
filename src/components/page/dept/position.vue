<template>
    <div>
        <div id="header">
            <div class="handle-box">
                <el-button type="primary" @click="addVisible = true">添加职位</el-button>
                <template>
                    <el-select v-model="deptValue" placeholder="请选择部门">
                        <el-option
                                v-for="item in deptData"
                                :label="item.dname"
                                :value="item.did">
                        </el-option>
                    </el-select>
                </template>
                <el-input v-model="PositionName" placeholder="职位名称片段" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-commit" @click="getData()">搜索</el-button>
            </div>
        </div>
        <el-table
                :data="nowTableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
        >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="pid" label="编号" width="55" align="center"></el-table-column>
            <el-table-column prop="pname" label="职位名称"></el-table-column>
            <el-table-column prop="did" label="部门"></el-table-column>

            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.row)"
                    >编辑</el-button>
                    <el-button
                            type="text"
                            icon="el-icon-delete"
                            @click="handleDel(scope.row)"
                    >删除</el-button>
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
        <el-dialog v-dialogDrag title="职位添加" center :visible.sync="addVisible" width="30%">
            <el-form ref="form" label-width="150px">
                <el-form-item label="职位名">
                    <el-select v-model="addPosition.did" placeholder="请选择部门">
                        <el-option
                                v-for="item in deptData"
                                :label="item.dname"
                                :value="item.did">
                        </el-option>
                    </el-select>
                    <el-input v-model="addPosition.pname" style="width: 200px;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="doAddPostion">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog v-dialogDrag title="职位修改" center :visible.sync="editVisible" width="30%">
            <el-form ref="form" label-width="150px">
                <el-form-item label="职位名">
                    <el-select v-model="editPosition.did" placeholder="请选择部门">
                        <el-option
                                v-for="item in deptData"
                                :label="item.dname"
                                :value="item.did">
                        </el-option>
                    </el-select>
                    <el-input v-model="addPosition.pname" style="width: 200px;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="eidtPositionName">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'dept',
        data:function(){
            return {
                tableData:[],
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 5
                },
                addVisible: false,
                editVisible:false,
                deptData:[],
                PositionName:'',
                deptValue:'',
                addPosition:{
                    did:'',
                    pname:''
                },
                editPosition:{
                    did:'',
                    pname:''
                },
            };
        },
        mounted() {
            this.getDep();
        },
        computed:{
            nowTableData(){
                return this.tableData.slice((this.query.pageIndex-1)*this.query.pageSize,this.query.pageIndex*this.query.pageSize);
            }
        },
        methods:{
            handleEdit(row){
                this.editPosition = Object.assign({},row);
                this.editVisible = true;
            },
            handleDel(row){
                this.$axios2.post('personnel/removePostion',{pId:row.pid}).then(res => {
                    if (res==1){
                        this.$message({ duration:2000,message:"删除成功",type:"success" });
                        this.getData();
                    }else {
                        this.$message({ duration:2000,message:"删除失败",type:"warning" });
                    }
                }).catch(err=>console.log(err));
            },
            eidtPositionName(){
                this.$axios2.post('personnel/updateDep',this.editPosition).then(res => {
                    if (res==1){
                        this.$message({ duration:2000,message:"修改成功",type:"success" });
                        this.editVisible = false;
                        this.getData();
                    }else {
                        this.$message({ duration:2000,message:"修改失败,可能这个名字已经存在了",type:"warning" });
                    }
                }).catch(err=>console.log(err));
            },
            getData() {
                console.log(this.deptValue);

                this.$axios2.post('personnel/queryPostionByLike',{did:this.deptValue,pname:this.PositionName}).then(res => {
                    this.tableData = res;
                    if (this.tableData.length % this.query.pageSize==0 &&  this.query.pageIndex!=1){
                        this.$set(this.query, 'pageIndex',this.query.pageIndex-1);
                    }
                }).catch(err=>console.log(err));
            },
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            },
            getDep() {
                this.$axios2.post('personnel/queryDep').then(res => {
                    this.deptData = res;//Object.assign({},obj);
                    if (res.length != 0){
                        this.deptValue = res[0].did;
                        this.addPosition.did = this.deptValue;
                        this.getData();
                    }
                }).catch(err=>console.log(err));
            },
            doAddPostion(){
                console.log(this.addPosition);
                this.$axios2.post('personnel/addPostion',this.addPosition).then(res => {
                    if (res==1){
                        this.$message({ duration:2000,message:"职位添加成功",type:"success" });
                    }
                }).catch(err=>console.log(err));;
            }
        },
        created() {
            this.getDep();
        }
    };
</script>

<style scoped>
    #header{
        margin-left:10px;
        margin-top:10px;
        margin-right:10px;
        padding-top:18px;
        padding-left:370px;
        padding-bottom:14px;
    }
    .handle-input {
        width: 150px;
        display: inline-block;
    }
    .el-table{
        margin: 0 auto;
    }
</style>

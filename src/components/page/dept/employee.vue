<template>
    <div>
        <div id="header">
            <div class="handle-box">
                <el-button type="primary" @click="showDia" style="margin-right: 20px;">添加员工</el-button>
                <template>
                    <el-select v-model="query.deptValue" placeholder="请选择部门" @change="deptChange" :title="dtitle">
                        <el-option
                                v-for="item in deptData"
                                :label="item.dname"
                                :value="item.did"
                        >
                        </el-option>
                    </el-select>
                    <el-select v-model="query.postValue" placeholder="请选择职位" :title="ptitle">
                        <el-option
                                v-for="item in postData"
                                :label="item.pname"
                                :value="item.pid"
                        >
                        </el-option>
                    </el-select>
                    <el-input v-model="query.ename" style="width: 150px;" placeholder="根据员工姓名查询"></el-input>
                    <el-radio v-model="query.radio1" :label="0" style="margin-left: 20px;">在职</el-radio>
                    <el-radio v-model="query.radio1"  :label="1">离职</el-radio>
                </template>
                <el-button type="primary" icon="el-icon-commit" @click="getData()">搜索</el-button>
            </div>
        </div>
        <el-table
                :data="empTableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
        >
            <el-table-column prop="trueName" label="真实姓名" width="55" align="center"></el-table-column>
            <el-table-column prop="idCard" label="身份证号"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="userSex" label="用户性别">
                <template slot-scope="scope">
                    <span v-if="scope.row.userSex=='0'">女</span>
                    <span v-if="scope.row.userSex=='1'">男</span>
                </template>
            </el-table-column>
            <el-table-column prop="entryTime" label="入职时间">
                <template slot-scope="scope">
                    <div class="date">{{scope.row.entryTime | formatDate}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="leaveTime" label="离职时间">
                <template slot-scope="scope">
                    <div class="date">{{scope.row.leaveTime | formatDate}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="leaveFlag" label="操作">
                <template slot-scope="scope">
                    <span v-if="scope.row.leaveFlag=='0'">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="doLeave(scope.row)"
                        >使离职</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="showDia(scope.row)"
                        >修改信息</el-button>
                    </span>
                    <span v-if="scope.row.leaveFlag=='1'">
                         <el-button
                                 type="text"
                                 icon="el-icon-edit"
                                 @click="doLeave(scope.row)"
                         >使复职</el-button>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-dialogDrag :title="etitle" center :visible.sync="diaVisible" width="30%">
            <el-form ref="form" label-width="150px">
                <el-form-item label="真实姓名">
                    <el-input v-model="emp.trueName" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="emp.idCard" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="emp.phone" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="emp.userSex" :label="0" style="margin-left: 20px;">女</el-radio>
                    <el-radio v-model="emp.userSex"  :label="1">男</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="diaVisible = false">取 消</el-button>
                <el-button type="primary" @click="eidtEmp">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {formatDate} from '@/utils/date'
    export default {
        name: 'dept',
        data:function(){
            return {
                empTableData:[],
                deptData:[],
                postAllData:[],
                postData:[],
                query:{
                    deptValue:1,
                    postValue:1,
                    radio1:0,
                    ename:''
                },
                emp:{
                    eid:'',
                    trueName:'',
                    idCard:'',
                    phone:'',
                    userSex:'',
                    entryTime:'',
                    leaveTime:'',
                    leaveFlag:''
                },
                diaVisible:false,
                dtitle:'根据部门查询',
                ptitle:'根据职位查询',
                etitle:'添加'
            };
        },
        mounted() {
            this.getDep();
        },
        computed:{
        },
        methods:{
            getData() {
                this.$axios2.post('personnel/queryEmp',{did:this.query.deptValue,pid:this.query.postValue,ename:this.query.ename,eflag:this.query.radio1}).then(res => {
                    this.empTableData = res[0];
                }).catch(err=>console.log(err));
            },
            getDep() {
                this.$axios2.post('personnel/queryDep').then(res => {
                    this.deptData = res;//Object.assign({},obj);
                    if (res.length != 0){
                        this.deptValue = res[0].did;
                        this.getPost();
                    }
                }).catch(err=>console.log(err));
            },
            getPost(){
                this.$axios2.post('personnel/queryAllPosition').then(data2=>{
                    this.postAllData = data2;
                    this.deptChange(this.deptValue);
                });
            },
            deptChange(val){
                console.log(val);
                this.postData = [];
                for (let ob of this.postAllData){
                    if (ob.did == val){
                        this.postData.push(ob);
                    }
                }
                this.postValue = this.postData[0].pid;
            },
            doLeave(row){
                let doflag = 0;
                if (row.leaveFlag==0){
                    doflag = 1;
                }
                this.$axios2.post('/personnel/editEmp.do',{eid:row.eid,leaveFlag:doflag}).then(res=>{
                    if(res>0){
                        this.$message.success("操作成功");
                        this.getData();
                    }else {
                        this.$message.warning("操作失败");
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            showDia(row){
                if (row.eid!=undefined){
                    this.emp = Object.assign({},row);
                    console.log(JSON.stringify(this.emp));
                    this.etitle = '修改';
                }else {
                    this.emp = {
                        eid:'',
                        trueName:'',
                        idCard:'',
                        phone:'',
                        userSex:'',
                        entryTime:'',
                        leaveTime:'',
                        leaveFlag:''
                    }
                    this.etitle = '添加';
                }
                this.diaVisible =true;
            },
            eidtEmp(){
                console.log(JSON.parse(JSON.stringify(this.emp)));
                if (this.etitle=='添加'){
                    this.$axios2.post('/personnel/addEmp.do',JSON.parse(JSON.stringify(this.emp))).then(res=>{
                        if(res>0){
                            this.$message.success("添加成功");
                            this.getData();
                            this.diaVisible =false;
                        }else {
                            this.$message.warning("添加失败");
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                }else {
                    this.$axios2.post('/personnel/editEmp.do',JSON.parse(JSON.stringify(this.emp))).then(res=>{
                        if(res>0){
                            this.$message.success("修改成功");
                            this.getData();
                            this.diaVisible =false;
                        }else {
                            this.$message.warning("修改失败");
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                }

            }
        },
        filters: {
            formatDate(time) {
               // time = time * 1000
                let date = new Date(time)
                console.log(new Date(time))
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            }
        },
        created() {
            this.getData();
        }
    };
</script>

<style scoped>
    #header{
        margin-left:10px;
        margin-top:10px;
        margin-right:10px;
        padding-top:18px;
        padding-left:170px;
        padding-bottom:14px;
    }
    .handle-input {
        width: 120px;
        display: inline-block;
    }
    .el-table{
        margin: 0 auto;
    }
</style>

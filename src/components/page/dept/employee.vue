<template>
    <div>
        <div id="header">
            <div class="handle-box">
                <el-button type="primary" @click="addVisible = true" style="margin-right: 20px;">添加员工</el-button>
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
            <el-table-column prop="userSex" label="用户性别"></el-table-column>
            <el-table-column prop="entryTime" label="入职时间"></el-table-column>
            <el-table-column prop="leaveTime" label="离职时间"></el-table-column>

        </el-table>
    </div>
</template>

<script>
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
                addVisible:false,
                dtitle:'根据部门查询',
                ptitle:'根据职位查询'
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

<template>
    <div class="moduleInfo" v-loading="this.loading">

        <el-form :inline="true" class="demo-form-inline search-style" size="small">

            <el-form-item label="项目名称" labelWidth="110px">
                <el-select v-model="form.projectName" placeholder="请选择项目" @change="initProjectChoice(form.projectName)">
                    <el-option
                            v-for="(item) in proAndIdData"
                            :key="item.name"
                            :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
<!--                <el-button type="primary" icon="el-icon-search" @click.native="proHandleCurrentChange(1)">-->
<!--                    搜索-->
<!--                </el-button>-->
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click.native="initProjectData()">添加接口分类
                </el-button>
            </el-form-item>

        </el-form>
        <el-tabs value="first" style="padding-left: 10px">
            <el-tab-pane label="接口分类列表" name="first" class="table_padding">

                <el-table :data="tableData" stripe max-height="745">
                    <el-table-column
                            prop="num"
                            type="index"
                            label="编号"
                            width="80"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="接口分类名称"
                            width="200">
                    </el-table-column>
                    <el-table-column label="当前环境" width="300">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.choice" placeholder="" size="mini"
                                       @change="changeEnvironmentChoice(scope.row.choice,scope.row.moduleId)">
                                <el-option
                                        v-for="(item) in environmentOption"
                                        :key="item.value"
                                        :value="item.value"
                                        :label="item.label">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                    >
                        <template slot-scope="scope">

                            <el-button type="primary" icon="el-icon-s-tools" size="mini"  v-if="false"
                                       @click.native="runModule(tableData[scope.$index]['moduleId'])">运行
                            </el-button>
                            <el-button type="primary" icon="el-icon-edit" size="mini"
                                       @click.native="editModule(tableData[scope.$index]['moduleId'],tableData[scope.$index]['name'])">编辑
                            </el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                       @click.native="sureView(delModule,tableData[scope.$index]['moduleId'],tableData[scope.$index]['name'])">
                                删除
                            </el-button>
                            <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini"
                                       @click.native="addApiInfo(tableData[scope.$index]['moduleId'],tableData[scope.$index]['name'])">添加接口
                            </el-button>
                            <el-button type="primary" icon="el-icon-view" size="mini" v-if="false"
                                       @click.native="viewModuleResult(tableData[scope.$index]['moduleId'])">查看结果
                            </el-button>
<!--                            v-if="tableData[scope.$index]['is_execute'] == 1"-->
                        </template>
                    </el-table-column>
                </el-table>

                <div class="pagination">
                    <el-pagination
                            @current-change="proHandleCurrentChange"
                            @size-change="proHandleSizeChange"
                            :current-page="currentPage"
                            :page-size="sizePage"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="this.total">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
<!--        模块名称编辑-->
        <el-dialog title="接口分类配置" :visible.sync="moduleData.viewStatus" width="30%">
            <el-form>
                <el-form-item :required="true" label="接口分类名称" label-width="110px">
                    <el-input :maxlength="20" v-model="moduleData.name">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="moduleData.viewStatus = false">取 消</el-button>
                <el-button type="primary" size="small" @click.native="addModule()">确 定</el-button>
            </div>
        </el-dialog>

        <moduleEdit
                :projectName="form.projectName"
                :setTempData="setTempData"
                ref="moduleEditFunc">

        </moduleEdit>



    </div>
</template>

<script>
    import moduleEdit from './moduleEdit.vue'

    export default {
        components: {
            moduleEdit: moduleEdit,
        },
        name: 'moduleInfo',
        data() {
            return {

                choice: '',
                moduleId: '',
                environmentOption: [{
                    value: 'first',
                    label: '测试环境'
                }, {
                    value: 'second',
                    label: '开发环境'
                }, {
                    value: 'third',
                    label: '线上环境'
                }, {
                    value: 'fourth',
                    label: '备用环境'
                }],
                // tableData: Array(),
                tableData: [],
                funcAddress: '',
                userData: [],
                proAndIdData: '',
                loading: false,
                total: 1,
                currentPage: 1,
                sizePage: 10,
                form: {
                    projectName: null,
                    projectId: null,
                    user: {
                        user_name: null,
                        user_id: null,
                    },
                },
                moduleData: {
                    viewStatus: false,
                    id: '',
                    num: '',
                    name: '',
                },
                setTempData: {
                    name: null,
                    setId: null,
                },
                projectData: {
                    host: null,
                    hostTwo: null,
                    hostThree: null,
                    hostFour: null,
                    id: null,
                    modelFormVisible: false,
                    projectName: null,
                    principal: null,
                    formLabelWidth: '80px',
                    funcFile: '',
                    header: Array(),
                    variable: Array(),
                },
            }
        },
        methods: {

            initProjectChoice(value) {
                //  当项目选择项改变时，初始化模块和配置的数据
                this.form.projectName = value;
                this.currentPage = 1;
                // this.findSet();
                this.findModule();
            },
            //运行模块
            runModule(id){
                this.loading = true;
                this.$axios.post(this.$api.runModuleApi, {
                    'id': id,
                    'projectName': this.form.projectName,
                    // 'configId':configId,
                }).then((response) => {
                    if (response.data['status'] === 0) {
                        this.$message({
                            showClose: true,
                            message: response.data['msg'],
                            type: 'success',
                        });
                    }
                    if (response.data['status'] === 1) {
                        if (response.data['msg']){
                            this.loading = false;
                            this.$message({
                                showClose: true,
                                message: response.data['msg'],
                                type: 'warning',
                            });
                        }
                        if (response.data['error']) {
                            this.$message({
                                showClose: true,
                                message: response.data['error'],
                                type: 'error',
                            });
                            this.loading = false;
                        }
                    }
                    this.loading = false;
                    }
                )
            },
            //查看运行结果
            viewModuleResult(id){
            },
            //编辑
            editModule(id,name) {
                //  编辑模块
                this.moduleData.name = name;
                this.moduleData.id = id;
                // this.moduleData.num = this.form.module.num;
                this.moduleData.viewStatus = true;
            },
            //编辑保存
            addModule(){
                if(!this.moduleData.name.replace(/(^\s*)|(\s*$)/g, "")){
                    this.$message({
                        showClose: true,
                        message: '接口分类名称不能为空',
                        type: 'warning',
                    });
                    return
                }
                this.$axios.post(this.$api.addModuleApi, {
                    'projectName': this.form.projectName,
                    'name': this.moduleData.name,
                    'id': this.moduleData.id,
                }).then((response) => {
                        if (this.messageShow(this, response)) {
                            this.findModule();
                            this.moduleData.viewStatus = false;
                        }
                    }
                )
            },
            //删除模块 ,会将模块下的接口信息一并删除
            delModule(id){
                //  删除模块
                this.$axios.post(this.$api.delModuleApi, {
                    'id': id,
                }).then((response) => {
                        this.messageShow(this, response);
                        this.moduleData.name = '';
                        if ((this.currentPage - 1) * this.sizePage + 1 === this.total) {
                            this.currentPage = this.currentPage - 1
                        }
                        this.findModule();
                    }
                )
            },
            //添加 接口信息
            addApiInfo(id,name){
                this.$router.push({path: 'moduleInfoView', query: {
                    moduleId:id,
                    projectName:this.form.projectName,
                    moduleName:name
                }})
                // this.$refs.caseFunc.findCase();
            },
            //查找模块
            findModule() {
                //  查询接口模块
                this.$axios.post(this.$api.findModuleApi, {
                    'projectName': this.form.projectName,
                    'page': this.currentPage,
                    'sizePage': this.sizePage,
                }).then((response) => {
                        if (this.messageShow(this, response)) {
                            // this.moduleDataList = response.data['data'];
                            this.tableData = response.data['data'];
                            // this.tableData = response.data['all_module'];
                            // this.proModelData[this.form.projectName] = response.data['all_module'];
                            this.total = response.data['total'];
                            // this.form.module = this.moduleDataList[0];
                        }
                    }
                )
            },
            // #查找项目
            findProject() {
                this.$axios.post(this.$api.findProApi, {
                    'projectName': this.form.projectName,
                    'page': this.currentPage,
                    'sizePage': this.sizePage,
                }).then((response) => {
                        if (this.messageShow(this, response)) {
                            // this.tableData = response.data['data'];
                            this.proAndIdData = response.data['data'];
                            this.form.projectName = this.proAndIdData[0].name;
                            this.form.projectId = this.proAndIdData[0].id;
                            // this.total = response.data['total'];
                            this.userData = response.data['userData'];
                            this.findModule();
                        }
                    }
                )
            },
            //切换环境
            changeEnvironmentChoice(value,id){
                this.loading = true;
                this.$axios.post(this.$api.addModuleEnvironment, {
                    'choice': value,
                    'moduleId': id,
                }).then((response) => {
                        //失败
                        if (response.data['status'] === 0) {
                            this.loading = false;
                            this.$message({
                                showClose: true,
                                message: response.data['msg'],
                                type: 'warning',
                            });
                        }
                        //成功
                        if (response.data['status'] === 1) {
                            this.loading = false;
                            this.$message({
                                showClose: true,
                                message: response.data['msg'],
                                type: 'success',
                            });
                        }
                    this.loading = false;
                    }
                )
            },
            findSet() {
                this.$axios.post(this.$api.findCaseSetApi, {
                    'projectName': this.form.projectName,
                    'page': this.currentPage,
                    'sizePage': this.sizePage,
                }).then((response) => {
                        this.setDataList = response.data['data'];
                        this.allSetList[this.form.projectName] = response.data['all_set'];
                        this.setPage.total = response.data['total'];
                        if (this.setDataList[0]) {
                            this.setTempData.setId = this.setDataList[0]['id'];
                            this.setTempData.name = this.setDataList[0]['label'];
                            // this.$nextTick(function () {
                            //     this.$refs.testTree.setCurrentKey(this.setTempData.setId);  //"vuetree"是你自己在树形控件上设置的 ref="vuetree" 的名称
                            //     this.findCase();
                            // });
                        }
                    }
                );
            },
            proHandleCurrentChange(val) {
                this.currentPage = val;
                // this.findPageProject()
                this.findModule();
            },
            proHandleSizeChange(val) {
                this.sizePage = val;
                // this.findPageProject()
                this.findModule();
            },

            findFuncAddress() {
                this.$axios.post(this.$api.getFuncAddressApi).then((response) => {
                        this.funcAddress = response['data']['data'];
                    }
                )
            },
            initProjectData() {
                this.$refs.moduleEditFunc.initModule()
            },
            getUserData() {
                this.$axios({
                    method: 'post',
                    url:'http://mapi-devops.yiche.com/devopsapi/account/get_select_data',
                    // headers:{
                    //     'Authorization':JSON.parse(window.localStorage.getItem('userData')).jwt
                    //     //'Authorization':"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0cnVlTmFtZSI6IuWUkOa2myjmtYvor5XnoJTlj5Hpg6gpIiwic3ViIjoidGFuZ3RhbzEiLCJpc3MiOiJvcC11Yy1qd3QiLCJuYW1lIjoidGFuZ3RhbzEiLCJleHAiOjE1NjM4NDQ0NzQsImlhdCI6MTU2Mzc1ODA3NCwidXNlcklkIjo4MDk5fQ.dgnAYhU5xPMGANXCGU49EcWgMxjepf_gIoS7kXAB2Yw"
                    // },
                }).then((response)=>{

                    this.userData = []
                    var tmpUserData = response.data.data
                    tmpUserData.forEach((item,key)=>{
                        this.userData.push({"user_id":item['id'], "user_name":item['name']});
                    })
                    console.log( tmpUserData);
                })
            },
            dealHostList(data) {
                // 把[{value:xxx1},{value:xxx2}] 转为 [xxx1,xxx2]111
                let host = Array();
                for (let i = 0; i < data.length; i++) {
                    if (data[i].value) {
                        host.push(data[i].value);
                    }
                }
                return host
            },
            dealHostDict(data) {
                // 把[xxx1,xxx2] 转为 [{value:xxx1},{value:xxx2}]
                let host = Array();
                if (!data) {
                    return host
                }
                for (let i = 0; i < data.length; i++) {
                    host.push({value: data[i]});
                }
                return host
            },
            addProjectBtn() {
                let test_length = this.environment.environmentTest.length;
                let currentEnvironment;
                if (this.environmentChoice === 'second') {
                    currentEnvironment = this.environment.environmentDevelop.length;
                } else if (this.environmentChoice === 'third') {
                    currentEnvironment = this.environment.environmentProduction.length;
                } else if (this.environmentChoice === 'fourth') {
                    currentEnvironment = this.environment.environmentStandby.length;
                } else {
                    currentEnvironment = test_length
                }

                if (currentEnvironment !== test_length) {
                    this.$message({
                        showClose: true,
                        message: '当前所选环境的url数量和测试环境不一致,会影响到接口测试',
                        type: 'warning',
                    });
                } else {
                    this.addProject()
                }
            },
            addProject() {
                this.$axios.post(this.$api.addProApi, {
                    'projectName': this.projectData.projectName,
                    'principal': this.projectData.principal,
                    'funcFile': this.projectData.funcFile,
                    'environmentChoice': this.environmentChoice,
                    'host': this.dealHostList(this.environment.environmentTest),
                    'hostTwo': this.dealHostList(this.environment.environmentDevelop),
                    'hostThree': this.dealHostList(this.environment.environmentProduction),
                    'hostFour': this.dealHostList(this.environment.environmentStandby),
                    'id': this.projectData.id,
                    'header': JSON.stringify(this.projectData.header),
                    'userId': this.form.user.user_id,
                    'variable': JSON.stringify(this.projectData.variable),
                }).then((response) => {
                        if (this.messageShow(this, response)) {
                            this.projectData.modelFormVisible = false;
                            this.findProject();
                        }
                    }
                )
            },
            editProject(id) {
                this.$axios.post(this.$api.editProApi, {'id': id}).then((response) => {
                        let index = this.userData.map(item => item.user_id).indexOf(response.data['data']['user_id']);
                        this.form.user = this.userData[index];
                        this.projectData.projectName = response.data['data']['pro_name'];
                        this.projectData.principal = response.data['data']['principal'];
                        this.environmentChoice = response.data['data']['environment_choice'];
                        this.environment.environmentTest = this.dealHostDict(response.data['data']['host']);
                        this.environment.environmentDevelop = this.dealHostDict(response.data['data']['host_two']);
                        this.environment.environmentProduction = this.dealHostDict(response.data['data']['host_three']);
                        this.environment.environmentStandby = this.dealHostDict(response.data['data']['host_four']);
                        this.projectData.header = response.data['data']['headers'];
                        this.projectData.variable = response.data['data']['variables'];
                        this.projectData.id = id;
                        this.projectData.funcFile = response.data['data']['func_file'];
                        this.projectData.modelFormVisible = true;
                    }
                )
            },
            //运行项目
            runProject(id){
                this.loading = true;
                this.$axios.post(this.$api.runProjectApi, {'id': id,'reportStatus':true}).then((response) => {
                        if (response.data['status'] === 0) {
                            this.$message({
                                showClose: true,
                                message: response.data['msg'],
                                type: 'success',
                            });
                        }
                        if (response.data['status'] === 1) {
                            if (response.data['msg']){
                                this.loading = false;
                                this.$message({
                                    showClose: true,
                                    message: response.data['msg'],
                                    type: 'warning',
                                });
                            }
                            if (response.data['error']) {
                                // this.$refs.errorViewFunc.showData(response.data['error']);
                                this.$message({
                                    showClose: true,
                                    message: response.data['error'],
                                    type: 'error',
                                });
                                this.loading = false;
                            }
                        }
                        this.loading = false;
                    }
                )
            },

            delProject(id) {
                this.$axios.post(this.$api.delProApi, {'id': id}).then((response) => {
                        this.messageShow(this, response);

                        // 分页数量判断，当删除了某一页的最后一条数据后，分页数量-1
                        if ((this.currentPage - 1) * this.sizePage + 1 === this.total) {
                            this.currentPage = this.currentPage - 1
                        }
                        this.findProject();
                    }
                )
            },
            addProjectVariable() {
                this.projectData.variable.push({key: null, value: null, remark: null});
            },
            delProjectVariable(i) {
                this.projectData.variable.splice(i, 1);
            },
            addProjectHeader() {
                this.projectData.header.push({key: null, value: null});
            },
            delProjectHeader(i) {
                this.projectData.header.splice(i, 1);
            },
            environmentShow(choice) {
                if (choice === 'first') {
                    return '测试环境'
                } else if (choice === 'second') {
                    return '开发环境'
                } else if (choice === 'third') {
                    return '线上环境'
                } else if (choice === 'fourth') {
                    return '备用环境'
                }
            },

        },
        mounted() {
            this.findProject();
            this.findFuncAddress();
            //this.getUserData();
        },
    }
</script>
<style>
</style>

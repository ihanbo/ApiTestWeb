<template>
    <div class="uiCaseManager" v-loading="this.loading">

        <el-form :inline="true" class="demo-form-inline search-style" size="small">
            <el-form-item label="项目" labelWidth="80px">
                <el-select v-model="form.projectName"
                           placeholder="请选择项目"
                           clearable
                           @change="initProjectChoice"
                           style="width: 150px;padding-right:5px">
                    <el-option
                            v-for="(item) in proAndIdData"
                            :key="item.name"
                            :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="应用平台" v-if="numTab !== 'third'">
                <el-select v-model="form.platformId"
                           placeholder="请选择平台"
                           clearable
                           ref="platform"
                           @change="initPlatformChoice"
                           style="width: 150px;padding-right:5px">
                    <el-option
                            v-for="(item) in this.platformData"
                            :label="item.name"
                            :key="item.id"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="case名称" v-if="numTab !== 'third'">
                <el-input placeholder="请输入" v-model="form.caseName" clearable style="width: 150px">
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click.native="handleCurrentChange(1)">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click.native="initData()">添加case信息</el-button>
                <el-button type="primary" icon="el-icon-d-arrow-right" @click.native="getDevicesInfo(apiMsgList)">批量运行</el-button>
                <el-button style="display: none" type="primary" @click.native="initImportData()">添加step信息</el-button>
                <!-- <el-button type="primary" @click.native="$refs.importApiFunc.initData()">批量导入</el-button> -->
            </el-form-item>
        </el-form>
        <el-tabs v-model="numTab" class="table_padding"  @tab-click="tabChange" @tab-remove="removeTab">
            <el-tab-pane label="case信息" name="first" id="tabclick" >
                <el-row>
                    <!--
                    <el-col :span="3"
                            style="border:1px solid;border-color: #ffffff rgb(234, 234, 234) #ffffff #ffffff;">
                        <el-row>
                            <el-col style="border:1px solid;border-color: #ffffff #ffffff rgb(234, 234, 234) #ffffff;padding:2px">
                                <el-dropdown @command="moduleCommand" style="float:right;">
                                      <span class="el-dropdown-link" style="color: #4ae2d5">
                                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                                      </span>
                              
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="add">添加</el-dropdown-item>
                                        <el-dropdown-item command="edit">编辑</el-dropdown-item>
                                        <el-dropdown-item command="stick">置顶</el-dropdown-item>
                                        <el-dropdown-item command="del">删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                               
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-scrollbar wrapStyle="height:740px;">
                                <el-tree
                                        ref="testTree"
                                        @node-click="treeClick"
                                        class="filter-tree"
                                        highlight-current
                                        node-key="moduleId"
                                        :data="moduleDataList"
                                        :props="defaultProps"
                                >
                                </el-tree>
                            </el-scrollbar>
                            <el-pagination
                                    small
                                    @current-change="handleModuleCurrentChange"
                                    :current-page="modulePage.currentPage"
                                    :page-size="30"
                                    layout="prev, pager, next"
                                    :total="modulePage.total">
                            </el-pagination>
                        </el-row>
                    </el-col>
                    -->
                    <el-col :span="21" style="padding-left: 5px;">
                        <el-table
                                ref="apiMultipleTable"
                                @selection-change="handleApiMsgSelection"
                                :data="ApiMsgTableData"
                                stripe
                                max-height="745">
                            <el-table-column
                                    type="selection"
                                    width="45">
                            </el-table-column>
                            <el-table-column
                                    type="index"
                                    label="编号"
                                    width="60">
                            </el-table-column>
                            <el-table-column
                                    :show-overflow-tooltip=true
                                    prop="name"
                                    label="case名称"
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    :show-overflow-tooltip=true
                                    prop="desc"
                                    label="case描述">
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    width="380">
                                <template slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-edit" size="mini"
                                               @click.native="editCopyApi(ApiMsgTableData[scope.$index]['id'],ApiMsgTableData[scope.$index]['type'],'edit')">
                                        编辑
                                    </el-button>
                                    <!-- <el-button type="primary" icon="el-icon-tickets" size="mini" -->
                                               <!-- @click.native="editCopyApi(ApiMsgTableData[scope.$index]['id'],'copy')"> -->
                                        <!-- 复制 -->
                                    <!-- </el-button> -->
                                    <el-button type="danger" icon="el-icon-delete" size="mini"
                                               @click.native="sureView(delApi,ApiMsgTableData[scope.$index]['id'],ApiMsgTableData[scope.$index]['name'])">
                                        删除
                                    </el-button>

                                    <el-button type="primary" icon="el-icon-caret-right" size="mini" ref="runBtn"
                                               @click.native="getDevices(scope.row)">
                                        运行
                                    </el-button>
                                    <el-button type="primary" icon="el-icon-caret-right" size="mini" ref="runBtn"
                                               @click.native="runUiCaseWithConfig(scope.row)">
                                        {{scope.row.isStop ? '停止':"yaml文件运行"}}
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>

<!--                        <el-button @click="cancelSelection()" size="mini" style="position: absolute;margin-top: 2px;">-->
<!--                            取消选择-->
<!--                        </el-button>-->
                        <div class="pagination">
                            <el-pagination
                                    @current-change="handleCurrentChange"
                                    @size-change="handleSizeChange"
                                    :current-page="apiMsgPage.currentPage"
                                    :page-size="apiMsgPage.sizePage"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="apiMsgPage.total">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-row>

            </el-tab-pane>

            <el-tab-pane label="添加case信息" name="second" v-if="apiEditViewStatus"
                         style="background-color: rgb(250, 250, 250);min-height: 780px">
                <apiEdit
                        :projectName="form.projectName"
                        :modules="form.module"
                        :configData="form.config"
                        :platformId="form.platformId"
                        :proModelData="proModelData"
                        :caseSortData="caseSortData"
                        :proUrlData="proUrlData"
                        @findCases="findCases"
                        ref="apiFunc">
                </apiEdit>
            </el-tab-pane>

            <el-tab-pane label="添加step信息" :closable="true"  name="three" v-if="apiImportEditViewStatus"
                         style="background-color: rgb(250, 250, 250);min-height: 780px">
                <apiImportEdit
                        :projectName="form.projectName"
                        :module="form.module"
                        :configData="form.config"
                        :platformId="form.platformId"
                        :proModelData="proModelData"
                        :caseSortData="caseSortData"
                        :proUrlData="proUrlData"
                        @findCases="findCases"
                        ref="apiImportFunc">
                </apiImportEdit>
            </el-tab-pane>
        </el-tabs>

        <el-dialog title="模块配置" :visible.sync="moduleData.viewStatus" width="30%">
            <el-form>
                <el-form-item :required="true" label="模块名称" label-width="100px">
                    <el-input v-model="moduleData.name"
                              style="width:250px"
                              :maxlength="20">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="moduleData.viewStatus = false">取 消</el-button>
                <el-button type="primary" size="small" @click.native="addModule()">确 定</el-button>
            </div>
        </el-dialog>

        <errorView ref="errorViewFunc"></errorView>
        <importApi
                :projectName="form.projectName"
                :moduleData="form.module"
                ref="importApiFunc">

        </importApi>

        <configEdit
                :proModelData="proModelData"
                :projectName="form.projectName"
                :funcAddress="funcAddress"
                ref="configEditFunc">
        </configEdit>

        <!-- 运行按钮的弹出层 -->
        <el-dialog title="设备信息" :visible.sync="dialogTableVisible" center="">
            <el-table :data="deviceData">
                <el-table-column property="device" label="设备ID" width="150"></el-table-column>
                <el-table-column property="name" label="设备名称" width="200"></el-table-column>
                <el-table-column label="运行">
                    <template slot-scope="scopeTwo">
                        <!-- 弹出层的运行按钮 -->
                        <el-button type="primary" size="small"
                                   @click.native="runApi(scopeTwo.row)"
                        >运行</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" plain size="small" @click="dialogTableVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 运行按钮的弹出层 end -->
    </div>
</template>

<script>
    import importApi from './importCases.vue'
    import apiImportEdit from './caseImportEdit.vue' //导入case信息
    import apiEdit from './caseEdit.vue'
    import errorView from '../common/errorView.vue'
    import configEdit from '../config/configEdit.vue'

    // import { runMain } from 'module';

    export default {
        name: "uiCaseManager",
        components: {
            // result: result,
            importApi: importApi,
            apiEdit: apiEdit,
            apiImportEdit:apiImportEdit,
            errorView: errorView,
            configEdit: configEdit,

        },
        data() {
            return {
                apiEditViewStatus: false,// 编辑组件显示控制
                apiImportEditViewStatus:false,//导入case信息显示控制
                numTab: 'first',
                loading: false,  //  页面加载状态开关
                dialogTableVisible: false,//控制运行按钮弹出层的显示隐藏
                deviceData: [],//设备信息列表
                type:null,
                isStop:false,
                popup_case_id:null,
                popup_cases:[],
                run_type:0,
                proModelData: '',
                caseSortData: '',
                proAndIdData: '',
                configData: '',
                proUrlData: null,
                ApiMsgTableData: Array(),//  接口表单数据
                apiMsgList: Array(),//  临时存储接口数据
                funcAddress: null,
                moduleDataList: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                apiMsgPage: {
                    total: 1,
                    currentPage: 1,
                    sizePage: 10,
                },
                modulePage: {
                    total: 1,
                    currentPage: 1,
                    sizePage: 30,
                },
                platformData:[],
                moduleData: {
                    viewStatus: false,
                    id: '',
                    num: '',
                    name: '',
                },
                form: {
                    module: {
                        name: '',
                        moduleId: '',
                        num: '',
                    },
                    platformId:null,
                    projectName: null,
                    projectId: null,
                    suiteName: null,
                    apiName: null,
                    caseName:null,

                },
            }
        },

        methods: {
            //  初始化页面所需要的数据
            initBaseData() {
                this.$axios.get(this.$api.baseUIDataApi).then((response) => {
                        this.proModelData = response.data['pro'];
                        this.caseSortData = response.data['casesort'];
                        this.proAndIdData = response.data['pro_and_id'];
                        if (response.data['user_pro']) {
                            this.form.projectName = response.data['user_pro']['pro_name'];
                            this.findModule()
                            // this.findCases();
                        }
                        this.$axios.post(this.$api.getFuncAddressApi).then((response) => {
                                this.funcAddress = response['data']['data'];
                            })
                    })
                this.findPlatform();
            },
            //批量运行
            batchRun(val){
                let caseIds = [];
                if (val.length === 0) {
                    this.$message({
                        showClose: true,
                        message: '请选择测试case',
                        type: 'warning',
                    });
                    return
                }
                for (let i = 0; i < val.length; i++) {
                    caseIds.push(val[i].id);
                }
                this.loading = true;
                this.$axios.post(this.$api.batchRunUiCaseApi, {
                    'caseIds': caseIds,
                }).then((response) => {
                    this.messageShow(this, response);
                    this.loading = false;
                })
                this.loading = false;



            },
            //关闭标签
            removeTab(targetName){
                if(targetName === 'second'){
                    this.apiEditViewStatus = false;
                }else if (targetName === 'three'){
                    this.apiImportEditViewStatus = false;
                }else{
                    this.$message({
                        showClose: true,
                        message: '删除参数错误',
                        type: 'warning',
                    });
                    return
                }
            },
            // 查询平台
            findPlatform(){
                this.$axios.get(this.$api.findPlatformApi).then((response) => {
                        this.platformData = response.data['data'];
                        this.form.platformId =  this.platformData[0]['id']
                    }
                )
            },
            //  模块处理函数，根据命令执行不同操作
            moduleCommand(command) {
                if (command === 'add') {
                    this.initModuleData()
                } else if (command === 'edit') {
                    this.editModule()
                } else if (command === 'stick') {
                    this.stickModule()
                } else if (command === 'del') {
                    this.sureView(this.delModule, null, this.form.module.name)
                }
            },
            // 当选择项发生变化时会触发该事件
            handleApiMsgSelection(val) {
                this.apiMsgList = val;
            },
            //当前页改变时会触发该事件
            handleCurrentChange(val) {
                this.apiMsgPage.currentPage = val;
                this.findCases();
            },
            //每页显示条数改变时会触发该事件
            handleSizeChange(val) {
                this.apiMsgPage.sizePage = val;
                this.findCases();
            },
            //  查询用例信息
            findCases() {
                if (this.form.module === null) {
                    this.$message({
                        showClose: true,
                        message: '请选择模块',
                        type: 'warning',
                    });
                    return
                }
                // if (this.form.platformId === null) {
                //     this.$message({
                //         showClose: true,
                //         message: '请选择平台',
                //         type: 'warning',
                //     });
                //     return
                // }
                this.$axios.post(this.$api.findUIcaseApi, {
                    'platform': this.form.platformId,
                    'projectName': this.form.projectName,
                    'caseName': this.form.caseName,
                    // 'moduleId': this.form.module.moduleId,
                    'page': this.apiMsgPage.currentPage,
                    'sizePage': this.apiMsgPage.sizePage,
                }).then((response) => {
                        // console.log(1111111,response.data)
                        if (this.messageShow(this, response)) {
                            this.ApiMsgTableData = response.data['data'];
                            this.apiMsgPage.total = response.data['total'];
                        }
                    }
                )
            },
            //初始化数据并进入导入tab
            initImportData(){
                // if (!this.form.module) {
                //     this.$message({
                //         showClose: true,
                //         message: '请先选择业务模块',
                //         type: 'warning',
                //     });
                //     return
                // }
                this.apiImportEditViewStatus = true;
                this.numTab = 'three';
                setTimeout(() => {
                    this.$refs.apiImportFunc.initApiMsgData();
                }, 0)
            },
            //  初始化数据并进入编辑tab
            initData() {
                // if (!this.form.module) {
                //     this.$message({
                //         showClose: true,
                //         message: '请先创建业务模块',
                //         type: 'warning',
                //     });
                //     return
                // }
                this.apiEditViewStatus = true;
                this.numTab = 'second';
                setTimeout(() => {
                    this.$refs.apiFunc.initApiMsgData();
                }, 0)
            },
            //  编辑或者复制信息
            editCopyApi(apiMsgId, type, status) {
                if(type == 0){
                    this.apiEditViewStatus = true;
                    this.numTab = 'second';
                    setTimeout(() => {
                        this.$refs.apiFunc.editCopyApiMsg(apiMsgId, type, status);
                    }, 0)
                }
                else if(type == 1){
                    this.apiImportEditViewStatus = true;
                    this.numTab = 'three';
                    setTimeout(() => {
                        this.$refs.apiImportFunc.editCopyApiMsg(apiMsgId, type, status);
                    }, 0)
                }else{
                    this.$message({
                        showClose: true,
                        message: '参数错误，请联系管理员查看解决',
                        type: 'warning',
                    });
                    return
                }
            },
            //  测试
            runApi(row) {
                this.dialogTableVisible = !this.dialogTableVisible;
                this.loading = true;

                if(this.run_type === 0){
                    this.$axios.post(this.$api.runUIcaseApi, {
                        'type': this.type,
                        'id': this.popup_case_id,
                        'udid':row.device,
                        'device_name':row.name,
                    }).then((response) => {
                        this.loading = false;
                        this.messageShow(this, response);
                    })
                }else if(this.run_type === 1){
                    let caseIds = [];
                    for (let i = 0; i < this.popup_cases.length; i++) {
                        caseIds.push(this.popup_cases[i].id);
                    }
                    this.loading = true;
                    this.$axios.post(this.$api.batchRunUiCaseApi, {
                        'caseIds': caseIds,
                        'type': this.type,
                        'udid':row.device,
                        'device_name':row.name,
                    }).then((response) => {
                        this.messageShow(this, response);
                        this.loading = false;
                    })
                }
                this.loading = false;

            },
            //  删除接口信息
            delApi(apiMsgId) {
                this.$axios.post(this.$api.delUIcaseApi, {'id': apiMsgId}).then((response) => {
                        this.messageShow(this, response);
                        this.form.apiName = null;
                        if ((this.apiMsgPage.currentPage - 1) * this.apiMsgPage.sizePage + 1 === this.apiMsgPage.total) {
                            this.apiMsgPage.currentPage = this.apiMsgPage.currentPage - 1
                        }
                        this.findCases();
                    }
                )
            },
            //  清除选择
            cancelSelection() {
                this.$refs.apiMultipleTable.clearSelection();
            },
            //  当项目选择项改变时，初始化模块和配置的数据
            initProjectChoice() {
                this.form.config = {name: null, configId: null,};
                this.form.module = {name: null, moduleId: null,};
                this.modulePage.currentPage = 1;
                this.apiMsgPage.currentPage = 1;
                // this.form.platformId = "";
                this.findModule()
                // this.findCases();
                this.findPlatform();
            },
            //  当平台选择项改变时，初始化模块和配置的数据
            initPlatformChoice(id) {
                this.findCases()
            },   
            //  查询接口模块
            findModule() {
                this.$axios.post(this.$api.findUICaseSortApi, {
                    'projectName': this.form.projectName,
                    'page': this.modulePage.currentPage,
                    'sizePage': this.modulePage.sizePage,
                }).then((response) => {
                        this.findCases();
                        if (this.messageShow(this, response)) {
                            this.moduleDataList = response.data['data'];
                            // this.proModelData[this.form.projectName] = response.data['all_module'];
                            this.caseSortData[this.form.projectName] = response.data['all_module'];
                            this.modulePage.total = response.data['total'];
                            this.form.module = this.moduleDataList[0];
                            if (this.form.module) {
                                // this.$nextTick(function () {
                                //     this.$refs.testTree.setCurrentKey(this.form.module.moduleId);  //"vuetree"是你自己在树形控件上设置的 ref="vuetree" 的名称
                                // });
                                this.findCases();
                            } else {
                                this.ApiMsgTableData = []
                            }

                        }
                    }
                )
            },
            //  当tab切换到接口信息时，刷新列表
            tabChange(tab) {
                if (tab.label === 'case信息') {
                    this.findModule()
                    // this.findCases()
                }

            },
            //  点击节点时，初始化数据并获取对应的接口信息
            treeClick(data) {
                let index = this.moduleDataList.map(item => item.moduleId).indexOf(data['moduleId']);  //  获取当前节点的下标
                this.form.module = this.moduleDataList[index];
                this.apiMsgPage.currentPage = 1;
                this.findCases();
            },
            handleModuleCurrentChange(val) {
                this.modulePage.currentPage = val;
                this.findModule()
            },
            //  打开窗口时，初始化模块窗口数据
            initModuleData() {
                this.moduleData.name = '';
                this.moduleData.id = '';
                this.moduleData.num = '';
                this.moduleData.viewStatus = true;
            },
            //  编辑模块
            editModule() {
                if (!this.form.module) {
                    this.$message({
                        showClose: true,
                        message: '请先创建业务模块',
                        type: 'warning',
                    });
                    return
                }
                this.moduleData.name = this.form.module.name;
                this.moduleData.id = this.form.module.moduleId;
                this.moduleData.num = this.form.module.num;
                this.moduleData.viewStatus = true;
            },
            //  添加模块
            addModule() {
                this.$axios.post(this.$api.addUICaseSortApi, {
                    'projectName': this.form.projectName,
                    'name': this.moduleData.name,
                    'id': this.moduleData.id,
                    'num': this.moduleData.num,
                }).then((response) => {
                        if (this.messageShow(this, response)) {
                            this.moduleData.viewStatus = false;
                            this.findModule();
                        }
                    }
                )
            },
            //  删除模块
            delModule() {
                this.$axios.post(this.$api.delUICaseSortApi, {'id': this.form.module.moduleId}).then((response) => {
                        this.messageShow(this, response);
                        this.moduleData.name = '';
                        if ((this.modulePage.currentPage - 1) * this.modulePage.sizePage + 1 === this.modulePage.total) {
                            this.modulePage.currentPage = this.modulePage.currentPage - 1
                        }
                        this.findModule();
                    }
                )
            },
            //  置顶模块
            stickModule() {
                this.$axios.post(this.$api.stickUICaseSortApi, {
                    'id': this.form.module.moduleId,
                    'projectName': this.form.projectName,
                }).then((response) => {
                        this.messageShow(this, response);
                        this.findModule();
                    }
                )
            },
            //生成yaml文件运行
            runUiCaseWithConfig(row){
                if(!row.isStop){//运行
                    alert("生成yaml文件运行")
                    return
                    row.isStop = true;
                    alert('id@@@@'+row.id)
                    this.$axios.post(this.$api.runWithConfigApi,{
                        id : row.id
                    }).then((response)=>{
                        //把得到的数据push进定义的空数组内
                        if(response.data['status']) {
                            this.deviceData=response.data['data'];
                        } else {
                            this.$message.error('网络连接中断');
                        }
                    })
                }else{//停止
                    row.isStop = false;
                    alert("停止yaml文件运行")
                    return
                }

            },
            getDevicesInfo(list_datas){
                if (list_datas.length === 0) {
                    this.$message({
                        showClose: true,
                        message: '请选择测试case',
                        type: 'warning',
                    });
                    return
                }
                this.popup_cases = list_datas;
                this.dialogTableVisible = !this.dialogTableVisible;
                this.$axios.post(this.$api.getDevices,{
                    platform: this.form.platformId,
                    is_free: true,
                }).then(({data})=>{
                    //把得到的数据push进定义的空数组内
                    if(data.status) {
                        this.deviceData=data.data;
                        this.run_type = 1
                    } else this.$message.error('网络连接中断');
                })
            },
            //调取设备信息接口----弹出层
            getDevices(row){
                localStorage.id = row.id;
                this.popup_case_id = row.id;
                this.type = row.type;
                this.dialogTableVisible = !this.dialogTableVisible;
                this.$axios.post(this.$api.getDevices,{
                    platform: this.form.platformId,
                    is_free: true,
                }).then(({data})=>{
                    //把得到的数据push进定义的空数组内
                    if(data.status) {
                        this.deviceData=data.data;
                        this.run_type = 0
                    } else this.$message.error('网络连接中断');
                })
            }
        },
        created() {
            // 数据生成之后先初始化数据
            this.initBaseData();
        },
    }
</script>
<style scoped>

    .cm-s-default .cm-property {
        color: rgb(183, 40, 135);
        /*color: rgb(137, 21, 99);*/
    }

    .cm-s-default .cm-string {
        /*color: rgb(116,88,255);*/
        color: rgb(71, 35, 255);
    }

    .cm-s-default .cm-atom {
        color: #000000;
    }

    .h-b-e-a-style {
        background-color: rgb(250, 250, 250);
        /*min-height: 430px;*/
    }

</style>

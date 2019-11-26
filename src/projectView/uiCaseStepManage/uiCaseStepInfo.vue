<template>
    <div class="uiCaseStepManager" v-loading="this.loading">

        <el-form :inline="true" class="demo-form-inline search-style" size="small">
            <el-form-item label="项目" labelWidth="80px">
                <el-select v-model="form.projectName"
                           placeholder="请选择项目"
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
                           @change="initPlatformChoice"
                           style="width: 150px;padding-right:5px">
                    <el-option
                            v-for="(item) in platformData"
                            :label="item.name"
                            :key="item.id"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="步骤名称" v-if="numTab !== 'third'">
                <el-input placeholder="请输入" v-model="form.caseStepName" clearable style="width: 150px">
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click.native="handleCurrentChange(1)">搜索</el-button>
                <el-button type="primary" style="display: none" icon="el-icon-circle-plus-outline" @click.native="initData()">添加case步骤信息</el-button>
            </el-form-item>
        </el-form>
        <el-tabs v-model="numTab" class="table_padding"  @tab-click="tabChange">
            <el-tab-pane label="步骤信息" name="first">
                <el-row>
                    <el-col :span="3"
                            style="border:1px solid;border-color: #ffffff rgb(234, 234, 234) #ffffff #ffffff;">
                        <el-row>
                            <el-col style="border:1px solid;border-color: #ffffff #ffffff rgb(234, 234, 234) #ffffff;padding:2px">
                                <el-dropdown @command="moduleCommand" style="float:right;">
                                      <span class="el-dropdown-link" style="color: #4ae2d5">
                                        业务线操作<i class="el-icon-arrow-down el-icon--right"></i>
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
                            <el-scrollbar wrapStyle="height:340px;">
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
<!--修改开始-->
                    <el-col :span="21" style="padding-left: 5px;">
                        <el-table
                                ref="apiMultipleTable"
                                @selection-change="handleApiMsgSelection"
                                :data="caseStepData"
                                stripe
                                max-height="745"
                                :row-style="{height:'30px'}"
                                :cell-style="{padding:'2px'}">
                            <!--
                            <el-table-column
                                    type="selection"
                                    width="45">
                            </el-table-column>
                            -->
                            <el-table-column
                                    type="index"
                                    label="编号"
                                    width="50"
                                    size="small">
                            </el-table-column>
                            <el-table-column v-for="(v,i) in caseStepData_columns.columns" :prop="v.field" :label="v.title" :width="v.width">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.isSet">
                                        <el-input size="mini" aria-placeholder="请输入内容" v-model="caseStepData_columns.sel[v.field]"></el-input>
                                    </span>
                                    <span v-else>{{scope.row[v.field]}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="150">
                                <template slot-scope="scope">
                                    <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;margin-right:10px;" @click="CaseStepData(scope.row,scope.$index,1)">
                                        {{scope.row.isSet?'保存':"修改"}}
                                    </span>
                                    <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;;margin-right:10px;" @click="CaseStepData(scope.row,scope.$index,2)">
                                        删除
                                    </span>
                                    <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;;margin-right:10px;" @click="CaseStepData(scope.row,scope.$index,3)">
                                        取消
                                    </span>
                                </template>
                            </el-table-column>
                        </el-table>

                        <div class="el-table-add-row" style="width: 99.2%;" @click="addCaseStepData()"><span>+ 添加</span></div>

                        <!--                        <el-tableel-button @click="cancelSelection()" size="mini" style="position: absolute;margin-top: 2px;">-->
                        <!--                            取消选择-->
                        <!--                        </el-tableel-button>-->
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

<!--修改结束-->
                </el-row>

            </el-tab-pane>
            <el-tab-pane label="编辑" name="second" v-if="apiEditViewStatus"
                         style="background-color: rgb(250, 250, 250);min-height: 780px">
                <apiEdit
                        :projectName="form.projectName"
                        :module="form.module"
                        :configData="form.config"
                        :proModelData="proModelData"
                        :proUrlData="proUrlData"
                        @findCases="findCases"
                        ref="apiFunc">
                </apiEdit>

            </el-tab-pane>
        </el-tabs>


        <el-dialog title="模块配置" :visible.sync="moduleData.viewStatus" width="30%">
            <el-form>
                <el-form-item :required="true" label="模块名称" label-width="100px">
                    <el-input v-model="moduleData.name"
                              style="width:250px"
                              :maxlength="20"
                              >
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="moduleData.viewStatus = false">取 消</el-button>
                <el-button type="primary" size="small" @click.native="addModule()">确 定</el-button>
            </div>
        </el-dialog>


        <!-- <result ref="resultFunc"></result> -->
        <errorView ref="errorViewFunc"></errorView>
        <configEdit
                :proModelData="proModelData"
                :projectName="form.projectName"
                :funcAddress="funcAddress"
                ref="configEditFunc">
        </configEdit>
    </div>
</template>

<script>
    // import result from './result.vue'
    import apiEdit from './apiEdit.vue'
    import errorView from '../common/errorView.vue'
    import configEdit from '../config/configEdit.vue'

    export default {
        components: {
            // result: result,
            apiEdit: apiEdit,
            errorView: errorView,
            configEdit: configEdit,
        },
        name: 'uiCaseStepManager',
        data() {
            return {
                apiEditViewStatus: false,// 编辑组件显示控制
                numTab: 'first',
                loading: false,  //  页面加载状态开关
                proModelData: '',
                proAndIdData: '',
                configData: '',
                proUrlData: null,
                ApiMsgTableData: Array(),//  接口表单数据
                caseStepData:Array(),
                caseStepData_columns:{
                  sel:null,//选中行
                  columns:[
                      { field: "name", title: "步骤名称", width: 150 },
                      { field: "xpath", title: "定位元素", width: 200 },
                      { field: "action", title: "操作动作", width: 120 },
                      { field: "extraParam", title: "参数", width: 150 },
                      { field: "expected_value", title: "预期值",width: 200}
                  ],
                  data:[],
                },
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
                action: [],
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
                    caseStepName:null,
                },
                caseStepInfoData: {
                    id: null,
                    name: null,
                    num: null,
                    platform: null,
                    xpath:null,
                    action:null,
                    extraParam:null,
                    expected_value:null,
                },
            }
        },

        methods: {
            //  初始化页面所需要的数据
            initBaseData() {
                this.$axios.get(this.$api.baseUIDataApi).then((response) => {
                        this.proModelData = response.data['data'];
                        this.proAndIdData = response.data['pro_and_id'];
                        if (response.data['user_pro']) {
                            this.form.projectName = response.data['user_pro']['pro_name'];
                            this.findModule()
                        }
                        this.$axios.post(this.$api.getFuncAddressApi).then((response) => {
                                this.funcAddress = response['data']['data'];
                        })
                        this.$axios.get(this.$api.findActionsApi).then((response) => {
                                this.action = response.data['data'];
                            }
                        )
                    })
                this.findPlatform();
            },
            //查询平台
            findPlatform(){
                this.$axios.get(this.$api.findPlatformApi).then((response) => {
                        this.platformData = response.data['data'];
                        this.form.platformId =  this.platformData[0]['id']
                    }
                )
            },
            //修改步骤信息
            CaseStepData(row,index,type){
                //保存操作
                if(type === 1){
                    if(row.isSet){  //保存
                        if (this.isEmptyState(this.caseStepData_columns.sel.name.trim())){
                            this.$message.warning("请填写步骤名称");
                            return
                        }
                        if (this.isEmptyState(this.caseStepData_columns.sel.xpath.trim())){
                            this.$message.warning("请填写定位元素");
                            return
                        }
                        if (this.isEmptyState(this.caseStepData_columns.sel.action.trim())){
                            this.$message.warning("请填写操作动作");
                            return
                        }
                        let action = this.caseStepData_columns.sel.action
                        if(!(action.trim() === '点击' || action.trim() === '输入')){
                            this.$message.warning("操作动作请填写【输入】或【点击】");
                            return
                        }
                        var extraParam = "";
                        if(!this.isEmptyState(this.caseStepData_columns.sel.extraParam)){
                            extraParam = this.caseStepData_columns.sel.extraParam.trim()
                        }
                        var expected_value = "";
                        if(!this.isEmptyState(this.caseStepData_columns.sel.expected_value)){
                            expected_value = this.caseStepData_columns.sel.expected_value.trim()
                        }
                        this.$axios.post(this.$api.addCaseStepApi, {
                            'id' : row.id,
                            'name' : this.caseStepData_columns.sel.name.trim(),
                            'xpath' : this.caseStepData_columns.sel.xpath.trim(),
                            'action' : this.caseStepData_columns.sel.action.trim(),
                            'extraParam': extraParam,
                            'expected_value': expected_value,
                            'moduleId': this.form.module.moduleId,
                            'projectName': this.form.projectName,
                            'platformId': this.form.platformId,
                        }).then((response) => {
                            if (this.messageShow(this, response)) {
                                this.findCaseStep();
                                row.isSet = false;
                            }
                        });
                    }
                    else { //修改
                        for (let i of this.caseStepData) {
                            if (i.isSet)
                                return this.$message.warning("请先保存当前编辑项");
                        }
                        this.caseStepData_columns.sel = JSON.parse(JSON.stringify(row));
                        row.isSet = true;
                    }
                }
                //删除
                if(type === 2){
                    for (let i of this.caseStepData) {
                        if (i.isSet)
                            return this.$message.warning("请先保存当前编辑项");
                    }
                    this.$confirm('确定要删除当前步骤信息？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$axios.post(this.$api.deleteCaseStepApi, {
                            'moduleId': this.form.module.moduleId,
                            'projectName': this.form.projectName,
                            'platformId': this.form.platformId,
                            'caseStepId': row['id'],
                        }).then((response) => {
                            if (this.messageShow(this, response)) {
                                this.findCaseStep()
                            }
                        });
                    }).catch(() => {
                        this.$message.warning("删除步骤信息异常")
                    });
                }
                //是否是取消操作
                if (type === 3) {
                    if (!this.caseStepData_columns.sel.id)
                        this.caseStepData.splice(index, 1);
                    return row.isSet = !row.isSet;
                }
            },
            //判断字符是否为空的方法
            isEmptyState(obj){
                if(typeof obj == "undefined" || obj == null || obj == ""){
                    return true;
                }else{
                    return false;
                }
            },
            //添加新的步骤信息
            addCaseStepData(){
                for (let i of this.caseStepData) {
                    if (i.isSet) return this.$message.warning("请先保存当前编辑项");
                }
                let j = { id: 0, "name": "", "xpath": "", "action": "", "extraParam": "", "expected_value": "", "isSet": true, "_temporary": true };
                this.caseStepData.push(j);
                this.caseStepData_columns.sel = JSON.parse(JSON.stringify(j));
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
            // 当前页改变时会触发该事件
            handleCurrentChange(val) {
                this.apiMsgPage.currentPage = val;
                // this.findCases();
                this.findCaseStep()
            },
            //每页显示条数改变时会触发该事件
            handleSizeChange(val) {
                this.apiMsgPage.sizePage = val;
                // this.findCases();
                this.findCaseStep();
            },
            //  查询用例信息
            findCases() {
                if (this.form.module === null) {
                    this.$message({
                        showClose: true,
                        message: '请选择模块',
                        type: 'warning',
                    });
                    this.platformData = null;
                }else if (this.form.platformId === null) {
                    this.$message({
                        showClose: true,
                        message: '请选择平台',
                        type: 'warning',
                    });
                    return
                }
                this.$axios.post(this.$api.findUIcaseStepApi, {
                    'platform': this.form.platformId,
                    'projectName': this.form.projectName,
                    'caseStepName': this.form.caseStepName,
                    'moduleId': this.form.module.moduleId,
                    'page': this.apiMsgPage.currentPage,
                    'sizePage': this.apiMsgPage.sizePage,
                }).then((response) => {
                        if (this.messageShow(this, response)) {
                            this.ApiMsgTableData = response.data['data'];
                            this.apiMsgPage.total = response.data['total'];
                        }
                    }
                )
            },
            //  初始化数据并进入编辑tab
            initData() {
                if (!this.form.module) {
                    this.$message({
                        showClose: true,
                        message: '请先创建业务模块',
                        type: 'warning',
                    });
                    return
                }
                this.apiEditViewStatus = true;
                this.numTab = 'second';
                setTimeout(() => {
                    this.$refs.apiFunc.initApiMsgData();
                }, 0)
            },
            //  编辑或者复制信息
            editCopyApi(apiMsgId, status) {
                this.apiEditViewStatus = true;
                this.numTab = 'second';
                setTimeout(() => {
                    this.$refs.apiFunc.editCopyApiMsg(apiMsgId, status);
                }, 0)
            },
            //  删除接口信息
            delApi(apiMsgId) {
                this.$axios.post(this.$api.delUIcaseStepApi, {'id': apiMsgId}).then((response) => {
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
                // this.form.platformId = null;
                this.findModule()
                this.findPlatform();
            },
            //  当平台选择项改变时，初始化模块和配置的数据
            initPlatformChoice() {
                this.findCases()
            },   
            //  查询接口模块
            findModule() {
                this.$axios.post(this.$api.findUIModuleApi, {
                    'projectName': this.form.projectName,
                    'page': this.modulePage.currentPage,
                    'sizePage': this.modulePage.sizePage,
                }).then((response) => {
                        if (this.messageShow(this, response)) {
                            this.moduleDataList = response.data['data'];
                            this.proModelData[this.form.projectName] = response.data['all_module'];
                            this.modulePage.total = response.data['total'];
                            this.form.module = this.moduleDataList[0];
                            if (this.form.module) {
                                this.$nextTick(function () {
                                    this.$refs.testTree.setCurrentKey(this.form.module.moduleId);  //"vuetree"是你自己在树形控件上设置的 ref="vuetree" 的名称
                                });
                                // this.findCases();
                                this.findCaseStep();
                            } else {
                                this.ApiMsgTableData = []
                            }

                        }
                    }
                )
            },

/**
            editCopyApiMsg(apiMsgId, status) {
                this.$axios.post(this.$api.editUIcaseStepApi, {'id': apiMsgId}).then((response) => {
                        this.caseStepData.name = response.data['data']['name'];
                        if (status === 'edit') {
                            this.caseStepData.num = response.data['data']['num'];
                            this.caseStepData.id = apiMsgId;
                        } else {
                            this.caseStepData.num = '';
                            this.caseStepData.id = '';
                        }

                        this.caseStepData.desc = response.data['data']['desc'];
                        this.caseStepData.platform = response.data['data']['platform'];
                        this.caseStepData.action = response.data['data']['action'];
                        this.caseStepData.xpath = response.data['data']['xpath'];
                        this.caseStepData.text = response.data['data']['text'];
                        this.caseStepData.set_up_hooks = response.data['data']['set_up'];
                        this.caseStepData.set_down_hooks = response.data['data']['tear_down'];
                        this.caseStepData.resourceid = response.data['data']['resourceid'];
                        this.caseStepData.extraParam = response.data['data']['extraParam'];
                        this.caseStepData.ui_selector = response.data['data']['ui_selector'];
                        this.form.projectName = this.projectName;
                        this.form.module = this.module;
                    }
                );
            },
 **/
            //  当tab切换到接口信息时，刷新列表
            tabChange(tab) {
                if (tab.label === 'case步骤') {
                    this.findCases()
                }
            },
            //  点击节点时，初始化数据并获取对应的接口信息
            treeClick(data) {
                let index = this.moduleDataList.map(item => item.moduleId).indexOf(data['moduleId']);  //  获取当前节点的下标
                this.form.module = this.moduleDataList[index];
                this.apiMsgPage.currentPage = 1;
                // this.findCases();
                this.findCaseStep();
            },
            //查询该业务模块下的所有步骤信息
            findCaseStep(){
                this.$axios.post(this.$api.queryUIcaseStepApi, {
                    'moduleId': this.form.module.moduleId,
                    'projectName': this.form.projectName,
                    'platformId': this.form.platformId,
                    'stepName': this.form.caseStepName,
                    'page': this.apiMsgPage.currentPage,
                    'sizePage': this.apiMsgPage.sizePage,
                }).then((response) => {
                    if (this.messageShow(this, response)) {
                        this.caseStepData = response.data['data'];
                        this.apiMsgPage.total = response.data['total'];
                    }
                });
            },

            handleModuleCurrentChange(val) {
                this.modulePage.currentPage = val;
                // this.findModule()
                this.findCaseStep()
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
                this.$axios.post(this.$api.addUIModuleApi, {
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
                this.$axios.post(this.$api.delUIModuleApi, {'id': this.form.module.moduleId}).then((response) => {
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
                this.$axios.post(this.$api.stickUIModuleApi, {
                    'id': this.form.module.moduleId,
                    'projectName': this.form.projectName,
                }).then((response) => {
                        this.messageShow(this, response);
                        this.findModule();
                    }
                )
            },
        },

        mounted() {
            // 页面加载完毕初始化数据
            this.initBaseData();
        },
    }
</script>
<style>

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

    .list-complete-items {
        padding: 4px;
        margin-top: 22px;
        border: solid 1px rgb(224, 221, 221);
        border-radius: 4px;
        background-color: rgb(250, 250, 250);
        position: absolute;
        left: 175px;
        top:0;
        right: 0
    }
    .el-table-add-row {
        margin-top: 10px;
        width: 90%;
        height: 34px;
        border: 1px dashed #c1c1cd;
        border-radius: 3px;
        cursor: pointer;
        justify-content: center;
        display: flex;
        line-height: 34px;
    }

</style>

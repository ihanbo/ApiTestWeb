<template>
    <div class="uiCaseManager" v-loading="this.loading">
        <el-form :inline="true" class="demo-form-inline search-style" size="small">
            <!-- 选择项目 开始 -->
            <el-form-item label="项目" labelWidth="80px">
                <el-select v-model="form.projectName"
                           placeholder="请选择项目"
                           clearable
                           ref="proName"
                           @change="initProjectChoice"
                           style="width: 150px;padding-right:5px">
                    <el-option
                            v-for="(item) in proAndIdData"
                            :key="item.name"
                            :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- 选择项目 结束 -->

            <!-- 选择平台 开始 -->
            <el-form-item label="应用平台" v-if="numTab !== 'third'">
                <el-select v-model="form.platformId"
                           placeholder="请选择平台"
                           clearable
                           ref="platform"
                           @change="initPlatformChoice()"
                           style="width: 150px;padding-right:5px">
                    <el-option
                            v-for="(item) in this.platformData"
                            :label="item.name"
                            :key="item.id"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- 选择平台 结束 -->

            <!-- 输入case信息 开始 -->
            <!-- 输入框 -->
<!--            <el-form-item label="业务测试名称" v-if="numTab !== 'third'">-->
<!--                <el-input placeholder="请输入" v-model="form.caseName" clearable style="width: 150px">-->
<!--                </el-input>-->
<!--            </el-form-item>-->

            <!-- 下拉框 -->
            <!-- <el-form-item label="case信息" v-if="numTabTwo !== 'third'">
                 <el-select v-model="form.caseName"
                            placeholder="请选择case信息"
                            clearable
                            ref="caseInfo"
                            @change="initCaseNameChoice()"
                            style="width: 150px;padding-right:5px">
                     <el-option
                             v-for="(item) in caseInfoList"
                             :label="item.name"
                             :key="item.id"
                             :value="item.id">
                     </el-option>
                 </el-select>
             </el-form-item> -->
            <!-- 输入case信息 结束 -->

            <!-- 搜索、录入信息、批量导入三按钮 -->
            <el-form-item>
<!--                <el-button type="primary" icon="el-icon-search"-->
<!--                           @click.native="handleCurrentChange(1)">搜索-->
<!--                </el-button>-->
                <el-button type="primary" @click.native="initData()">添加业务测试信息</el-button>
                <!-- <el-button type="primary" @click.native="$refs.importApiFunc.initData()">批量导入</el-button> -->
            </el-form-item>
            <!-- 搜索、录入信息、批量导入三按钮 -->
        </el-form>

        <el-tabs v-model="numTab" class="table_padding" @tab-click="tabChange">
            <el-tab-pane label="业务测试信息" name="first">
                <el-row>
<!--                    左侧树形图-->
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
<!--                                        <el-dropdown-item command="stick">置顶</el-dropdown-item>-->
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

                    <!-- case信息右侧展示模块 -->
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
                                    label="名称"
                                    width="300">
                            </el-table-column>
                            <el-table-column
                                    :show-overflow-tooltip=true
                                    prop="desc"
                                    label="描述">
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    width="320">
                                <template slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-edit" size="mini"
                                               @click.native="editCopyApi(ApiMsgTableData[scope.$index]['id'],'edit')">
                                        编辑
                                    </el-button>
                                    <!-- <el-button type="primary" icon="el-icon-tickets" size="mini" -->
                                               <!-- @click.native="editCopyApi(ApiMsgTableData[scope.$index]['id'],'add')"> -->
                                        <!-- 添加 -->
                                    <!-- </el-button> -->
                                    <el-button type="danger" icon="el-icon-delete" size="mini"
                                               @click.native="sureView(delApi,ApiMsgTableData[scope.$index]['id'],ApiMsgTableData[scope.$index]['name'])">
                                        删除
                                    </el-button>
                                    <el-button type="primary" icon="el-icon-run" size="mini"
                                               ref="runBtn"
                                               @click.native="getDevicesGather(scope.row)">
                                        运行
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>

<!--                        <el-button @click="cancelSelection()" size="mini"-->
<!--                                   style="position: absolute;margin-top: 2px;">-->
<!--                            取消选择-->
<!--                        </el-button>-->
                        <!-- 分页部分 -->
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
                        <!-- 分页部分 -->
                    </el-col>
                    <!-- case信息右侧展示模块 -->
                </el-row>
            </el-tab-pane>

            <el-tab-pane label="添加信息"
                         name="second"
                         v-if="apiEditViewStatus"
                         style="background-color: rgb(250, 250, 250);min-height: 780px">
                <apiEdit
                        :projectName="form.projectName"
                        :module="form.module"
                        :configData="form.config"
                        :proModelData="proModelData"
                        :proUrlData="proUrlData"
                        :platformId="form.platformId"
                        :caseSortData="caseSortData"
                        @findCases="findCases"
                        ref="apiFunc">
                </apiEdit>
            </el-tab-pane>
        </el-tabs>

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
                        <!-- runUICaseSet(ApiMsgTableData[scope.$index]['id']) -->
                        <el-button type="primary" size="small"
                                   @click.native="runUICaseSet(scopeTwo.row)"
                        >运行</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" plain size="small" @click="dialogTableVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 运行按钮的弹出层 end -->
<!--        业务分类弹层   start-->
        <el-dialog title="业务分类配置" :visible.sync="moduleData.viewStatus" width="32%">
            <el-form>
                <el-form-item :required="true" label="业务分类名称" label-width="110px">
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
<!--        业务分类弹层   end-->

    </div>
</template>

<script>
    import importApi from './importCases.vue'
    import apiEdit from '../uiCaseGatherManage/caseEditGather.vue'
    import errorView from '../common/errorView.vue'
    import configEdit from '../config/configEdit.vue'
    import {constants} from 'crypto';
    // import { runMain } from 'module';

    export default {
        name: "uiCaseGatherManager",
        components: {
            importApi: importApi,
            apiEdit: apiEdit,
            errorView: errorView,
            configEdit: configEdit,

        },
        data() {
            return {
                numZero: 0,
                apiEditViewStatus: false,// 编辑组件显示控制
                numTab: 'first',
                numTabTwo: 'second',
                loading: false,  //  页面加载状态开关

                dialogTableVisible: false,//控制运行按钮弹出层的显示隐藏
                deviceData: [],//设备信息列表
                caseSortData: '',
                seekCaseId: "",
                proModelData: '',
                proAndIdData: '',
                configData: '',
                proUrlData: null,
                ApiMsgTableData: [],//  接口表单数据
                apiMsgList: [],//  临时存储接口数据
                funcAddress: [],
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
                    sizePage: 10,
                },
                platformData: [],
                caseInfoList: [],
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
                    platformId: null,
                    projectName: null,
                    projectId: null,
                    suiteName: null,
                    apiName: null,
                    caseName: null,

                },
                popup_caseset:null,
            }
        },

        methods: {

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
            //  查询接口模块
            findModule() {
                this.$axios.post(this.$api.findUICaseSortApi, {
                    'projectName': this.form.projectName,
                    'page': this.modulePage.currentPage,
                    'sizePage': this.modulePage.sizePage,
                }).then((response) => {
                        // this.findCases();
                        if (this.messageShow(this, response)) {
                            this.moduleDataList = response.data['data'];
                            // this.proModelData[this.form.projectName] = response.data['all_module'];
                            this.caseSortData[this.form.projectName] = response.data['all_module'];
                            this.modulePage.total = response.data['total'];
                            this.form.module = this.moduleDataList[0];
                            if (this.form.module) {
                                this.$nextTick(function () {
                                    this.$refs.testTree.setCurrentKey(this.form.module.moduleId);  //"vuetree"是你自己在树形控件上设置的 ref="vuetree" 的名称
                                });
                                this.findCases();
                            } else {
                                this.ApiMsgTableData = []
                            }

                        }
                    }
                )
            },

            handleModuleCurrentChange(val) {
                this.modulePage.currentPage = val;
                this.findModule()
            },

            //  点击节点时，初始化数据并获取对应的接口信息
            treeClick(data) {
                let index = this.moduleDataList.map(item => item.moduleId).indexOf(data['moduleId']);  //  获取当前节点的下标
                this.form.module = this.moduleDataList[index];
                this.apiMsgPage.currentPage = 1;
                this.findCases();
            },

            // 初始化页面初始数据
            initBaseData() {
                this.$axios.get(this.$api.baseUIDataApi)
                    .then((response) => {
                        this.proModelData = response.data['data'];
                        this.proAndIdData = response.data['pro_and_id'];
                        this.caseSortData = response.data['casesort'];
                        if (response.data['user_pro']) {
                            this.form.projectName = response.data['user_pro']['pro_name'];
                        }
                        this.findPlatform();
                    })
            },
            //查询应用平台
            findPlatform() {
                this.$axios.get(this.$api.findPlatformApi)
                    .then((response) => {
                        this.platformData = response.data['data'];
                        this.form.platformId = this.platformData[this.numZero]['id'];
                        // this.findCases();
                        this.findModule();
                    })
            },
            //  查询用例信息
            findCases() {
                if (this.form.platformId === null) {
                    this.$message({
                        showClose: true,
                        message: '请选择平台',
                        type: 'warning',
                    });
                    return
                }
                this.$axios.post(this.$api.findUIcaseSetApi, {
                    'platform': this.form.platformId,
                    'projectName': this.form.projectName,
                    'caseSetName': this.form.caseName,
                    'moduleId': this.form.module.moduleId,
                    'page': this.apiMsgPage.currentPage,
                    'sizePage': this.apiMsgPage.sizePage,
                }).then((response) => {
                    //输入框
                    // console.log(1111111, response.data)
                    if (this.messageShow(this, response)) {
                        this.ApiMsgTableData = response.data['data'];
                        this.apiMsgPage.total = response.data['total'];
                    }

                    // 下拉框
                    // console.log("____1",data.data);
                    // this.caseInfoList = data.data;
                    // this.form.caseName = this.caseInfoList[0];//默认上来有被选中项
                    // console.log("this.form.caseName",this.form.caseName)
                    // acquireCaseId = data.data[0].id;
                    // if(this.form.caseName){
                    //     this.seekCaseName(acquireCaseId);
                    // }
                })
            },
            //用例运行
            runUICaseSet(row) {
                this.dialogTableVisible = !this.dialogTableVisible;
                this.loading = true;
                this.$axios.post(this.$api.runUIcaseSetApi, {
                    'udid': row.device,
                    'device_name':row.name,
                    'id':this.popup_caseset.id,
                    'type':this.popup_caseset.type,
                    'projectName': this.form.projectName,
                    'reportStatus': true,
                }).then((response) => {
                    // console.log(222222,response);
                    this.loading = false;
                    this.messageShow(this, response);
                        // if (response.data['status'] === 1) {
                        //     this.loading = false;
                        //     this.$message({
                        //         showClose: true,
                        //         message: response.data['msg'],
                        //         type: 'success',
                        //     });
                        // }
                    }
                )
            },
            // 删除用例
            delApi(apiMsgId) {
                // this.$refs.apiFunc.delStepInCase(apiMsgId);
                // this.findCases();
                //  删除接口信息
                //delUIcaseApi
                this.$axios.post(this.$api.delUIcaseSetApi, {'id': apiMsgId}).then((response) => {
                        this.messageShow(this, response);
                        this.form.apiName = null;
                        if ((this.apiMsgPage.currentPage - 1) * this.apiMsgPage.sizePage + 1 === this.apiMsgPage.total) {
                            this.apiMsgPage.currentPage = this.apiMsgPage.currentPage - 1
                        }
                        this.findCases();
                    }
                )
            },

            //  编辑或者添加信息-----编辑按钮--添加按钮----打开同一界面
            editCopyApi(apiMsgId, status) {
                this.apiEditViewStatus = true;
                this.numTab = 'second';
                setTimeout(() => {
                    this.$refs.apiFunc.editCopyApiMsg(apiMsgId, status);
                    // console.log(33333,apiMsgId);
                }, 0)
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
            // 项目改变时的方法
            initProjectChoice() {
                //  当项目选择项改变时，初始化模块和配置的数据
                this.form.config = {name: null, configId: null,};
                // this.form.module = {name: null, moduleId: null,};
                this.modulePage.currentPage = 1;
                this.apiMsgPage.currentPage = 1;
                this.form.caseName = "";
            },
            // 平台改变时的方法
            initPlatformChoice() {
                //  当选择平台时，清空用例信息和相关用例信息的用例集列表
                this.form.caseName = "";//清空用例信息
                this.ApiMsgTableData = [];//清空用例集列表
                this.findCases()//调用查询用例信息方法
            },
            // 当选择项发生变化时会触发该事件
            handleApiMsgSelection(val) {
                this.apiMsgList = val;
            },
            // 当前页改变时会触发该事件
            handleCurrentChange(val) {
                this.apiMsgPage.currentPage = val;
                this.findCases();
            },
            //每页显示条数改变时会触发该事件
            handleSizeChange(val) {
                // console.log("val+++++++", val)
                this.apiMsgPage.sizePage = val;
                this.findCases();
            },
            // 取消选择按钮触发的事件
            cancelSelection() {
                //  清除选择
                this.$refs.apiMultipleTable.clearSelection();
            },
            // 切换到接口信息时的事件
            tabChange(tab) {
                //  当tab切换到接口信息时，刷新列表
                if (tab.label === '业务测试信息') {
                    this.findCases();
                }
            },
             //调取设备信息接口----弹出层
            getDevicesGather(row){
                // console.log('11111111',row);
                // if(row.type == 1){
                //     this.$message({
                //         showClose: true,
                //         message: '该用例集为录屏业务测试，请注意观察手机执行步骤',
                //         type: 'warning',
                //     })
                //     setTimeout(() => {
                localStorage.row = row;
                this.popup_caseset = row;
                this.dialogTableVisible = !this.dialogTableVisible;
                this.$axios.post(this.$api.getDevices, {
                    platform: this.form.platformId,
                    is_free: true
                }).then(({data}) => {
                    //把得到的数据push进定义的空数组内
                    if (data.status) this.deviceData = data.data;
                    else this.$message.error('网络连接中断');
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

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

            <!-- 选择case信息 开始 -->
            <!-- 输入框 -->
             <el-form-item label="case名称" v-if="numTab !== 'third'">
                <el-input placeholder="请输入" v-model="form.caseName" clearable style="width: 150px">
                </el-input>
            </el-form-item>

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
            <!-- 选择case信息 结束 -->

            <!-- 搜索、录入信息、批量导入三按钮 -->
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click.native="handleCurrentChange(1)">搜索</el-button>
                <el-button type="primary" @click.native="initData()">录入信息</el-button>
                <el-button type="primary" @click.native="$refs.importApiFunc.initData()">批量导入</el-button>
            </el-form-item>
            <!-- 搜索、录入信息、批量导入三按钮 -->
        </el-form>

        <el-tabs v-model="numTab" class="table_padding" @tab-click="tabChange">
            <el-tab-pane label="case用例集" name="first">
                <el-row>
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
                                    width="40">
                            </el-table-column>
                            <el-table-column
                                    prop="num"
                                    label="编号"
                                    width="60">
                            </el-table-column>
                            <el-table-column
                                    :show-overflow-tooltip=true
                                    prop="name"
                                    label="名称"
                                    width="200">
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
                                    <el-button type="primary" icon="el-icon-tickets" size="mini"
                                               @click.native="editCopyApi(ApiMsgTableData[scope.$index]['id'],'add')">
                                        添加
                                    </el-button>
                                    <el-button type="danger" icon="el-icon-delete" size="mini"
                                               @click.native="sureView(delApi,ApiMsgTableData[scope.$index]['id'],ApiMsgTableData[scope.$index]['name'])">
                                        删除
                                    </el-button>
                                    <!-- @click.native="runApi(ApiMsgTableData[scope.$index]['id'],'copy')" -->
                                    <el-button type="primary" icon="el-icon-run" size="mini" ref="runBtn" 
                                               @click.native="runApi(ApiMsgTableData[scope.$index]['id']),'copy'">
                                        运行
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <el-button @click="cancelSelection()" size="mini" style="position: absolute;margin-top: 2px;">
                            取消选择
                        </el-button>
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

            <el-tab-pane label="编辑"
                         name="second"
                         v-if="apiEditViewStatus"
                         style="background-color: rgb(250, 250, 250);min-height: 780px">
                <apiEdit
                        :projectName="form.projectName"
                        :module="form.module"
                        :configData="form.config"
                        :proModelData="proModelData"
                        :proUrlData="proUrlData"
                        @findCases="findCases()"
                        ref="apiFunc">
                </apiEdit>
            </el-tab-pane>
        </el-tabs>

        <!-- <result ref="resultFunc">
        </result> -->

        <errorView ref="errorViewFunc">
        </errorView>

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
    </div>
</template>

<script>
    // import result from './result.vue'
    import importApi from './importCases.vue'
    import apiEdit from '../uiCaseGatherManage/caseEditGather.vue'
    import errorView from '../common/errorView.vue'
    import configEdit from '../config/configEdit.vue'
    import { constants } from 'crypto';

    // import { runMain } from 'module';

    export default {
        name: "uiCaseGatherManager",
        components: {
            // result: result,
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

                // dialogTableVisible: false,//控制运行按钮弹出层的显示隐藏
                //数据列表,假数据
                deviceData: [],

                seekCaseId: "",
                proModelData: '',
                proAndIdData: '',
                configData: '',
                proUrlData: null,
                // caseGatherList: [],
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
                    sizePage: 20,
                },
                modulePage: {
                    total: 1,
                    currentPage: 1,
                    sizePage: 30,
                },
                platformData:[],
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
            // 初始化页面初始数据
            initBaseData(id) {
                this.$axios.get(this.$api.baseUIDataApi)
                    .then((response) => {
                        this.proModelData = response.data['data'];
                        this.proAndIdData = response.data['pro_and_id'];
                        if (response.data['user_pro']) {
                            this.form.projectName = response.data['user_pro']['pro_name'];
                            this.findModule();
                        }
                    }
                )
            },
            // 项目改变时的方法
            initProjectChoice() {
                //  当项目选择项改变时，初始化模块和配置的数据
                this.form.config = {name: null, configId: null,};
                this.form.module = {name: null, moduleId: null,};
                this.modulePage.currentPage = 1;
                this.apiMsgPage.currentPage = 1;
                this.form.platformId = "";
                this.form.caseName = "";
                this.findModule();
            },
            // 平台改变时的方法
            initPlatformChoice(id) {
                //  当选择平台时，清空用例信息和相关用例信息的用例集列表
                this.form.caseName = "";//清空用例信息
                this.ApiMsgTableData = [];//清空用例集列表
                // this.findModule();
                this.findCases()//调用查询用例信息方法
            },
            // // 用例信息改变时的方法
            // initCaseNameChoice(){
            //     this.seekCaseName(this.form.caseName);//调用查询用例集的方法
            // },

            //查询应用平台
            findPlatform(){
                this.$axios.get(this.$api.findPlatformApi).then((response) => {
                    // console.log(1-1-1-11-1,response)
                        this.platformData = response.data['data'];
                        this.form.platformId =  this.platformData[this.numZero]['id'];
                        // console.log(43434343,this.platformData);
                        this.findCases();
                    }
                )
            },
            //  查询用例信息
            findCases(acquireCaseId) {
                // if (this.form.module === null) {
                //     this.$message({
                //         showClose: true,
                //         message: '请选择模块',
                //         type: 'warning',
                //     });
                //     return
                // }
                if (this.form.platformId === null) {
                    this.$message({
                        showClose: true,
                        message: '请选择平台',
                        type: 'warning',
                    });
                    return
                }
                this.$axios.post(this.$api.findUIcaseApi, {
                    'platform': this.form.platformId,
                    'projectName': this.form.projectName,
                    'caseName': this.form.caseName,
                    'moduleId': this.form.module.moduleId,
                    'page': this.apiMsgPage.currentPage,
                    'sizePage': this.apiMsgPage.sizePage,
                }).then((response) => {
                    //输入框
                    console.log(1111111,response.data)
                    // if (this.messageShow(this, response)) {
                    //     this.ApiMsgTableData = response.data['data'];
                    //     this.apiMsgPage.total = response.data['total'];
                    // }

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
            // 查询用例集
            seekCaseName(acquireCaseId){
                if(this.form.caseName){
                    this.$axios.post(this.$api.editUIcaseApi,{
                        id: acquireCaseId
                    }).then(({data})=>{
                        console.log(12121212,data);
                        // this.caseGatherList = data.data.steps;
                        this.ApiMsgTableData = data.data.steps;
                    })
                }
            },
            
            //添加case用例信息
            addCaseList(){
                
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

            runApi(apiMsgId) {
                //  测试--runUIcaseApi
                this.loading = true;
                this.$axios.post(this.$api.runUIcaseApi, {
                    'id': apiMsgId
                }).then((response) => {
                    this.loading = false;
                    console.log(11111,response);
                    this.messageShow(this, response);
                    // console.log(1111,apiMsgId);
                    
                })
            },
            //用例运行
            runUICaseSet(id){
                this.loading = true;
                this.$axios.post(this.$api.runUIcaseSetApi, {
                    'case_Id': id,
                    'projectName': this.form.projectName,
                    'reportStatus': true,
                }).then((response) => {
                    if (response.data['status'] === 1) {
                        this.loading = false;
                        this.$message({
                            showClose: true,
                            message: response.data['msg'],
                            type: 'success',
                         });
                    }
                    this.findCases(id);
                    }
                )
            },
            runUICaseScene(sceneIds, status = false, reportStatus = false) {
                //  status，为true时，批量运行用例，为false运行单用例
                //  reportStatus，为true时生成报告，为false时返回临时数据
                let _sceneIds = [];
                if (sceneIds.length === 0) {
                    this.$message({
                        showClose: true,
                        message: '请选择测试用例',
                        type: 'warning',
                    });
                    return
                }
                if (status) {
                    //  为true时，提取选中用例的id
                    for (let i = 0; i < sceneIds.length; i++) {
                        _sceneIds.push(sceneIds[i].sceneId);
                    }
                } else {
                    _sceneIds.push(sceneIds)
                }
                this.loading = true;
                //runCaseApi
                this.$axios.post(this.$api.runUIcaseApi, {
                    'reportStatus': reportStatus,
                    'sceneIds': _sceneIds,
                    'projectName': this.form.projectName
                }).then((response) => {
                        this.loading = false;
                        if (response.data['status'] === 0) {
                            this.$message({
                                showClose: true,
                                message: response.data['msg'],
                                type: 'warning',
                            });
                            if (response.data['error']) {
                                this.$refs.errorViewFunc.showData(response.data['error']);
                            }
                        } else {
                            this.$message({
                                showClose: true,
                                message: response.data['msg'],
                                type: 'success',
                            });
                            if (reportStatus) {
                                let {href} = this.$router.resolve({
                                    path: 'reportShow',
                                    query: {reportId: response.data['data']['report_id']}
                                });
                                window.open(href, '_blank');
                            } else {
                                let tempData = {'details': [{'records': [], 'in_out': {'out': ''}}]};

                                for (let i = 0; i < response['data']['data']['data']['details'].length; i++) {
                                    tempData['details'][0]['records'] = tempData['details'][0]['records'].concat(response['data']['data']['data']['details'][i]['records'])
                                }
                                this.$refs.resultFunc.showData(tempData);
                            }
                        }
                    }
                );
            },
            // 删除用例
            delApi(apiMsgId) {
                // this.$refs.apiFunc.delStepInCase(apiMsgId);
                // this.findCases();
                //  删除接口信息
                //delUIcaseApi
                this.$axios.post(this.$api.delUIcaseApi, {'id': apiMsgId}).then((response) => {
                        this.messageShow(this, response);
                        this.form.apiName = null;
                        if ((this.apiMsgPage.currentPage - 1) * this.apiMsgPage.sizePage + 1 === this.apiMsgPage.total) {
                            this.apiMsgPage.currentPage = this.apiMsgPage.currentPage - 1
                        }
                        this.findCases(apiMsgId);
                    }
                )
            },


            //  查询接口模块
            findModule() {
                this.$axios.post(this.$api.findUIModuleApi, {
                    'projectName': this.form.projectName,
                    'page': this.modulePage.currentPage,
                    'sizePage': this.modulePage.sizePage,
                }).then((response) => {
                    console.log(123455677,response)
                        if (this.messageShow(this, response)) {
                            this.moduleDataList = response.data['data'];
                            this.proModelData[this.form.projectName] = response.data['all_module'];
                            this.modulePage.total = response.data['total'];
                            this.form.module = this.moduleDataList[0];
                            if (this.form.module) {
                                this.findPlatform();
                            } else {
                                this.ApiMsgTableData = []
                            }
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
                console.log("val+++++++",val)
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
                if (tab.label === 'case步骤') {
                    this.findCases();
                }
            },
        },
        created() {
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

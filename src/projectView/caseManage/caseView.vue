<template>
    <div class="caseSetView" v-loading="this.loading">
        <el-form :inline="true" class="demo-form-inline search-style" size="small">
            <el-form-item label="项目名称" labelWidth="110px">
                <el-input v-model="parameter.projectName" :disabled="true">
                </el-input>
<!--                <el-select v-model="form.projectName" placeholder="请选择项目" @change="initProjectChoice">-->
<!--                    <el-option-->
<!--                            v-for="(item) in proAndIdData"-->
<!--                            :key="item.name"-->
<!--                            :value="item.name">-->
<!--                    </el-option>-->
<!--                </el-select>-->
            </el-form-item>
            <el-form-item label="用例名称">
                <el-input placeholder="请输入用例" v-model="form.caseSetName" :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item>
<!--                <el-button type="primary" icon="el-icon-search" @click.native="handleCaseCurrentChange(1)">搜索-->
<!--                </el-button>-->
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click.native="$refs.caseEditFunc.initCaseData(parameter.projectName,form.caseSetName,parameter.setId)">添加接口用例</el-button>
                <el-button type="primary" icon="el-icon-s-tools" @click.native="runScene(caseList,true,true)">批量运行</el-button>
            </el-form-item>

        </el-form>
        <el-tabs value="first" style="padding-left: 10px;padding-right:5px;">
            <el-tab-pane label="用例信息" name="first">
                <el-row>
                    <el-col>

                        <el-table
                                ref="sceneMultipleTable"
                                @selection-change="handleCaseSelection"
                                :data="caseAll"
                                max-height="748"
                                stripe>
                            <el-table-column
                                    type="selection"
                                    width="40">
                            </el-table-column>
                            <el-table-column
                                    prop="num"
                                    type="index"
                                    label="编号"
                                    min-width="10">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="名称"
                                    min-width="50">
                            </el-table-column>
                            <el-table-column
                                    prop="desc"
                                    label="描述"
                                    min-width="50">
                            </el-table-column>
                            <el-table-column
                                    prop="charge_name"
                                    label="负责人"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-edit" size="mini"
                                               @click.native="$refs.caseEditFunc.editCase(caseAll[scope.$index]['sceneId'],form.caseSetName,parameter.projectName)">
                                        编辑
                                    </el-button>
                                    <el-button type="primary" icon="el-icon-tickets" size="mini"
                                               @click.native="$refs.caseEditFunc.editCase(caseAll[scope.$index]['sceneId'],form.caseSetName,parameter.projectName,true)">
                                        复制
                                    </el-button>
                                    <el-button type="primary" icon="el-icon-setting" size="mini"
                                               @click.native="runScene(caseAll[scope.$index]['sceneId'])">运行
                                    </el-button>
                                    <el-button type="danger" icon="el-icon-delete" size="mini"
                                               @click.native="sureView(delCase,caseAll[scope.$index]['sceneId'],caseAll[scope.$index]['name'])">
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <el-button @click="cancelSelection()" size="mini"
                                   style="position: absolute;margin-top: 2px;">取消选择
                        </el-button>

                        <div class="pagination">
                            <el-pagination
                                    @current-change="handleCaseCurrentChange"
                                    @size-change="handleCaseSizeChange"
                                    :current-page="casePage.currentPage"
                                    :page-size="casePage.sizePage"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="this.casePage.total">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <setEdit
                :projectName="form.projectName"
                :setTempData="setTempData"
                ref="setEditFunc">

        </setEdit>
        <caseEdit
                :allSetList="allSetList"
                :proModelData="proModelData"
                :projectName="form.projectName"
                :setTempData="setTempData"
                :configData="configData"
                :funcAddress="funcAddress"
                ref="caseEditFunc">

        </caseEdit>

        <errorView ref="errorViewFunc">
        </errorView>

        <result ref="resultFunc">
        </result>
    </div>
</template>

<script>
    import setEdit from './setEdit.vue'
    import caseEdit from './caseEdit.vue'
    import errorView from '../common/errorView.vue'
    import result from '../apiMessage/result.vue'

    export default {
        components: {
            setEdit: setEdit,
            caseEdit: caseEdit,
            errorView: errorView,
            result: result,

        },
        name: 'caseSetView',
        data() {
            return {
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                allSetList: '',
                setDataList: [],   //  用例集合的临时数据
                funcAddress: '',
                caseList: [],  //  临时存储被勾选的用例数据
                proModelData: '',
                proAndIdData: '',
                loading: false,
                configData: '',
                parameter:{
                    setId: '', //setid
                    projectName: '',//项目名称
                    caseSetName: '',//用例名称
                },
                caseAll: [],  //  页面table的表格数据
                casePage: {
                    total: 1,
                    currentPage: 1,
                    sizePage: 10,
                },
                setPage: {
                    total: 1,
                    currentPage: 1,
                    sizePage: 10,
                },
                setTempData: {
                    name: null,
                    setId: null,
                },
                form: {
                    projectName: '',
                    caseSetName: '',
                },

            }
        },
        created(){
            this.getParams()
        },
        methods: {
            getParams(){
                this.parameter.setId = this.$route.query.id;//获取传过来的setid
                this.parameter.projectName = this.$route.query.projectName;//获取传过来的项目名称
                this.parameter.caseSetName = this.$route.query.caseSetName;//用例名称
                this.setTempData.setId = this.parameter.setId
                this.form.projectName =  this.parameter.projectName;
                this.form.caseSetName = this.parameter.caseSetName
                this.casePage.currentPage = 1;
                this.findCase();
            },

            handleNodeClick(data) {
                this.setTempData.setId = data['id'];
                this.setTempData.name = data['label'];
                this.casePage.currentPage = 1;
                this.findCase();
            },
            querySearch(queryString, cb) {
                // 调用 callback 返回建议列表的数据
                cb(this.comparators);
            },
            dropdownSetEvent(command) {
                if (command === 'add') {
                    this.$refs.setEditFunc.initSet()
                } else if (command === 'edit') {
                    this.$refs.setEditFunc.editSet()
                } else if (command === 'stick') {
                    this.$refs.setEditFunc.stickSet(this.setTempData.setId)
                } else if (command === 'del') {
                    this.sureView(this.delSet, null, this.setTempData.name)
                }
            },
            findCase() {
               
                this.$axios.post(this.$api.findCaseApi, {
                    //'setId': this.setTempData.setId,
                    'setId': this.parameter.setId,
                    //'projectName': this.form.projectName,
                    'projectName': this.parameter.projectName,
                    'caseName': this.form.caseName,
                    'caseSetName': this.form.caseSetName,
                    'page': this.casePage.currentPage,
                    'sizePage': this.casePage.sizePage,
                }).then((response) => {
                        if (this.messageShow(this, response)) {
                            this.caseAll = response.data['data'];
                            this.casePage.total = response.data['total'];
                        }
                    }
                )
            },
            initData() {
                //  初始化页面数据
                this.$axios.get(this.$api.baseDataApi).then((response) => {
                        this.proModelData = response.data['data'];
                        this.proAndIdData = response.data['pro_and_id'];
                        this.configData = response.data['config_name_list'];
                        if (response.data['user_pro']) {
                            this.form.projectName = response.data['user_pro']['pro_name'];
                            this.findSet();
                        }
                        this.allSetList = response.data['set_list'];
                    }
                );
                this.$axios.post(this.$api.getFuncAddressApi).then((response) => {
                        this.funcAddress = response['data']['data'];
                    }
                );
            },
            initProjectChoice() {
                //  当项目选择项改变时，初始化模块和配置的数据
                this.setPage.currentPage = 1;
                this.casePage.currentPage = 1;
                //this.findSet()
                this.findCase();
            },
            findSet() {
                this.$axios.post(this.$api.findCaseSetApi, {
                    'projectName': this.form.projectName,
                    'page': this.setPage.currentPage,
                    'sizePage': this.setPage.sizePage,
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
            handleCaseCurrentChange(val) {
                this.casePage.currentPage = val;
                this.findCase()
            },
            handleCaseSizeChange(val) {
                this.casePage.sizePage = val;
                this.findCase()
            },
            handleSetCurrentChange(val) {
                this.setPage.currentPage = val;
                this.findSet()
            },
            delCase(caseId) {
                this.$axios.post(this.$api.delCaseApi, {'caseId': caseId}).then((response) => {
                        this.messageShow(this, response);
                        this.form.caseName = '';
                        this.findCase();
                    }
                )
            },
            runScene(sceneIds, status = false, reportStatus = false) {
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
                this.$axios.post(this.$api.runCaseApi, {
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

            handleCaseSelection(val) {
                //  勾选用例时，被勾选的用例会存到caseList
                this.caseList = val;
            },
            cancelSelection() {
                this.$refs.sceneMultipleTable.clearSelection();
            },
            delSet() {
                //  删除用例集
                this.$axios.post(this.$api.delCaseSetApi, {
                    'id': this.setTempData.setId,
                }).then((response) => {
                        if (this.messageShow(this, response)) {
                            this.findSet();
                        }
                    }
                )
            },
        },
        mounted() {
            this.initData();

        },
    }
</script>

<style>

</style>

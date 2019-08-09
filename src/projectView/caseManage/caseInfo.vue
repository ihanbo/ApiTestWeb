<template>
    <div class="caseInfo" v-loading="this.loading">
        <el-form :inline="true" class="demo-form-inline search-style" size="small">
            <el-form-item label="项目名称" labelWidth="110px">
                <el-select v-model="form.projectName" placeholder="请选择项目" @change="initProjectChoice">
                    <el-option
                            v-for="(item) in proAndIdData"
                            :key="item.name"
                            :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <!--
            <el-form-item label="用例名称">
                <el-input placeholder="请输入用例" v-model="form.caseName">
                </el-input>
            </el-form-item>
            -->
            <el-form-item>
<!--                <el-button type="primary" icon="el-icon-search" @click.native="handleCaseCurrentChange(1)">搜索-->
<!--                </el-button>-->
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click.native="addCaseSet">新增用例集</el-button>
<!--                <el-button type="primary" @click.native="runScene(caseList,true,true)">批量运行</el-button>-->
            </el-form-item>

        </el-form>
        <el-tabs value="first" style="padding-left: 10px;padding-right:5px;">
            <el-tab-pane label="用例集信息" name="first">

                <el-table :data="setDataList" stripe max-height="745" @cell-click="handleCaseSetSelect">
                    <el-table-column
                            prop="num"
                            type="index"
                            label="编号"
                            width="80"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="label"
                            label="用例集名称"
                            width="200">
                    </el-table-column>
                    <el-table-column label="当前环境" width="250" >
                        <template slot-scope="scope">
                            <!--
                            <el-tag size="small"
                                    :type="tableData[scope.$index]['choice'] === 'first' ?
                                    'success' : tableData[scope.$index]['choice'] === 'second' ?
                                     'primary' :  tableData[scope.$index]['choice'] === 'third' ? 'warning' : 'danger'">
                                {{environmentShow(tableData[scope.$index]['choice'])}}
                            </el-tag>
                            -->
                            <el-select v-model="scope.row.choice" placeholder="" size="mini"
                                       @change="changeEnvironmentChoice(scope.row.choice,scope.row.id)">
                                <el-option
                                        v-for="(item) in environmentOption"
                                        :key="item.value"
                                        :value="item.value"
                                        :label="item.label">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <!--<el-table-column-->
                    <!--prop="host_two"-->
                    <!--label="基础url2"-->
                    <!--&gt;-->
                    <!--</el-table-column>-->
                    <el-table-column
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-s-tools" size="mini"
                                       @click.native="runCaseSet(setDataList[scope.$index]['id'])">
                                运行
                            </el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                       @click.native="delCaseSet(setDataList[scope.$index]['id'],setDataList[scope.$index]['label'])">
                                删除
                            </el-button>
<!--                            <el-button type="primary" icon="el-icon-edit" size="mini"-->
<!--                                       @click.native="editCaseSet(setDataList[scope.$index]['id'],setDataList[scope.$index]['label'])">编辑-->
<!--                            </el-button>-->
                            <el-button type="primary" icon="el-icon-s-operation" size="mini"
                                       @click.native="viewCaseSet(setDataList[scope.$index]['id'],setDataList[scope.$index]['label'])"
                                        >添加用例信息
                            </el-button>
                            <el-button type="primary" icon="el-icon-view" size="mini" v-if="setDataList[scope.$index]['is_execute'] == 1"
                                       @click.native="viewCaseSetResult(setDataList[scope.$index]['id'],
                                       setDataList[scope.$index]['report_id'])"
                            >查看运行结果
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--
                <el-row>
                    <el-col :span="3"
                            style="border:1px solid;border-color: #ffffff rgb(234, 234, 234) #ffffff #ffffff;">
                        <el-row>
                            <el-col style="border:1px solid;border-color: #ffffff #ffffff rgb(234, 234, 234) #ffffff;padding:2px">

                                <el-dropdown @command="dropdownSetEvent" style="float:right;">
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
                                        @node-click="handleNodeClick"
                                        class="filter-tree"
                                        highlight-current
                                        node-key="id"
                                        :data="setDataList"
                                        :props="defaultProps"
                                >
                                </el-tree>
                            </el-scrollbar>

                            <el-pagination
                                    small
                                    @current-change="handleSetCurrentChange"
                                    :current-page="setPage.currentPage"
                                    :page-size="30"
                                    layout="prev, pager, next"
                                    :total="setPage.total">
                            </el-pagination>
                        </el-row>
                    </el-col>
                    <el-col :span="21">

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
                                               @click.native="$refs.caseEditFunc.editCase(caseAll[scope.$index]['sceneId'])">
                                        编辑
                                    </el-button>
                                    <el-button type="primary" icon="el-icon-tickets" size="mini"
                                               @click.native="$refs.caseEditFunc.editCase(caseAll[scope.$index]['sceneId'],true)">
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
                -->
                <div class="pagination">
                    <el-pagination
                            @current-change="handleSetCurrentChange"
                            @size-change="handleSetSizeChange"
                            :current-page="currentPage"
                            :page-size="sizePage"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="this.total">
                    </el-pagination>
                </div>
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

<!--        <caseView ref="caseFunc">-->
<!--        </caseView>-->
    </div>
</template>

<script>
    import setEdit from './setEdit.vue'
    import caseEdit from './caseEdit.vue'
    import errorView from '../common/errorView.vue'
    import result from '../apiMessage/result.vue'
    import caseView from './caseView.vue'

    export default {
        components: {
            setEdit: setEdit,
            caseEdit: caseEdit,
            caseView: caseView,
            errorView: errorView,
            result: result,

        },
        name: 'modeManage',
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
                choice:'',
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
                configData: '',
                type: 0,
                currentPage:1,
                sizePage: 10,
                caseAll: [],  //  页面table的表格数据
                casePage: {
                    total: 1,
                    currentPage: 1,
                    sizePage: 20,
                },
                setPage: {
                    total: 1,
                    currentPage: 1,
                    sizePage: 30,
                },
                setTempData: {
                    name: null,
                    setId: null,
                },
                form: {
                    projectName: '',
                    caseName: '',
                },
            }
        },
        created(){
            this.getParamsValue();
        },

        methods: {
            // 获取从上个页面传过来的参数
            getParamsValue(){
                this.form.projectName = null;
                // this.form.projectId = null;
                this.form.projectName = this.$route.query.projectName;//项目名称
                // this.form.projectId = this.$route.query.moduleId;//模块id
                this.type = this.$route.query.typeValue;
            },

            //查看运行结果
            viewCaseSetResult(id,report_id){
                //查询报告id
                let {href} = this.$router.resolve({path: 'resultCaseSet', query:
                    {
                        'reportId': report_id,
                        'projectName': this.form.projectName,
                        'caseSetId': id,
                    }});
                window.open(href, '_blank');
            },
            //查看用例详细信息
            viewCaseSet(id,caseSetName){
                this.$router.push({path: 'caseSetView', query: {id:id,projectName:this.form.projectName
                        ,caseSetName:caseSetName}})
                // this.$refs.caseFunc.findCase();
            },
            //添加用例
            addCaseSet(){
                this.$refs.setEditFunc.initSet()
            },
            //用例运行
            runCaseSet(id){
                this.loading = true;
                this.$axios.post(this.$api.runCaseSetApi, {
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
                    this.findSet();
                    }
                )
            },
            //删除用例
            delCaseSet(id,label){
                this.sureView(this.delSet, null, label)
            },
            handleCaseSetSelect(data){
                this.setTempData.setId = data['id'];
            },
            editCaseSet(id,label){
                this.setTempData.name = label;
                this.setTempData.setId = id;
                this.$refs.setEditFunc.editSet()
            },
            changeEnvironmentChoice(value,id){
                this.$axios.post(this.$api.addCaseSetEnvironment, {
                    'choice': value,
                    'setId': id,
                }).then((response) => {
                        //失败
                        if (response.data['status'] === 0) {
                            this.$message({
                                showClose: true,
                                message: response.data['msg'],
                                type: 'warning',
                            });
                        }
                        //成功
                        if (response.data['status'] === 1) {
                            this.$message({
                                showClose: true,
                                message: response.data['msg'],
                                type: 'success',
                            });
                        }
                    }
                )
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
                    'setId': this.setTempData.setId,
                    'projectName': this.form.projectName,
                    'caseName': this.form.caseName,
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
                this.currentPage = 1;
                this.currentPage = 1;
                this.findSet()
            },
            findSet() {
                this.$axios.post(this.$api.findCaseSetApi, {
                    'projectName': this.form.projectName,
                    'page': this.currentPage,
                    'sizePage': this.sizePage,
                }).then((response) => {
                        this.setDataList = response.data['data'];
                        this.allSetList[this.form.projectName] = response.data['all_set'];
                        this.total = response.data['total'];
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
                // this.findCase()
                this.findSet()
            },
            handleSetCurrentChange(val) {
                this.currentPage = val;
                this.findSet()
            },
            handleSetSizeChange(val) {
                this.sizePage = val;
                // this.findCase()
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
            if(this.type == undefined || this.type == 0){
                this.initData();
            };
            if(this.type == 1){
                this.findSet();
            }

        },
    }
</script>

<style>

</style>

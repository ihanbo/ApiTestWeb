<template>
    <div class="projectManageUI">

        <el-form :inline="true" class="demo-form-inline search-style" size="small">

            <el-form-item label="项目名称" labelWidth="110px">
                <el-input placeholder="请输入" v-model="form.projectName">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search"
                           @click.native="proHandleCurrentChange(1)">
                    搜索
                </el-button>
                <el-button type="primary" @click.native="initProjectData()">添加项目
                </el-button>
            </el-form-item>

        </el-form>
        <el-tabs value="first" style="padding-left: 10px">
            <el-tab-pane label="项目列表" name="first" class="table_padding">

                <el-table :data="tableData" stripe max-height="745">
                    <el-table-column
                            prop="id"
                            label="id"
                            width="80"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="项目名称"
                            width="150">
                    </el-table-column>
                    <!--<el-table-column-->
                    <!--prop="host_two"-->
                    <!--label="基础url2"-->
                    <!--&gt;-->
                    <!--</el-table-column>-->
                    <el-table-column
                            prop="principal"
                            label="负责人"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" size="mini"
                                       @click.native="editProject(tableData[scope.$index]['id'])">编辑
                            </el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                       @click.native="sureView(delProject,tableData[scope.$index]['id'],tableData[scope.$index]['name'])">
                                删除
                            </el-button>
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

        <el-dialog title="项目配置" :visible.sync="projectData.modelFormVisible" width="40%"
                   :modal-append-to-body="false"
                   :append-to-body="false"
                   :close-on-click-modal="false"
        >
            <el-tabs>
                <el-tab-pane label="基础信息" style="margin-top: 10px">
                    <el-form :inline="true">
                        <el-form-item label="项目名称" :label-width="projectData.formLabelWidth">
                            <el-input v-model="projectData.projectName"
                                      size="mini"
                                      id="project_name"
                                      clearable
                                      style="width: 150px">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="项目负责人" label-width="88px">
                            <el-select v-model="form.user"
                                       value-key="user_id"
                                       id="user" 
                                       size="mini"
                                       style="width: 150px">
                                <el-option
                                        v-for="item in userData"
                                        :key="item.user_id"
                                        :label="item.user_name"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <!-- 新增三项：安卓包名、安卓启动页、ios bundle id -->
                        <el-form-item label="安卓包名" :label-width="projectData.formLabelWidth">
                            <el-input v-model="projectData.android_package"
                                      size="mini"
                                      id="android_package"
                                      clearable
                                      style="width: 150px">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="安卓启动页" label-width="88px">
                            <el-input v-model="projectData.android_launch"
                                      size="mini"
                                      id="android_launch"
                                      clearable
                                      style="width: 150px">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="ios bundle id" label-width="103px">
                            <el-input v-model="projectData.ios_bundle_id"
                                      size="mini"
                                      id="ios_bundle_id"
                                      clearable
                                      style="width: 120px">
                            </el-input>
                        </el-form-item>

                        <el-form-item label="函数文件" :label-width="projectData.formLabelWidth">
                            <el-select v-model="projectData.funcFile" placeholder="请选择导入函数文件"
                                       size="mini" 
                                       clearable
                                       style="width: 165px">
                                <el-option
                                        v-for="item in funcAddress"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                    </el-form>
                    <hr style="height:1px;border:none;border-top:1px solid rgb(241, 215, 215);margin-top: -10px"/>

                </el-tab-pane>

                <el-tab-pane label="公用变量" style="margin-top: 10px">
                    <span style="margin-left: 10px">变量信息：</span>
                    <el-button type="primary" size="mini" @click="addProjectVariable()">
                        添加
                    </el-button>
                    <el-table :data="projectData.variable" stripe :show-header="false" size="mini">
                        <el-table-column label="Key" header-align="center" minWidth="50">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.key" size="mini" placeholder="key">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="Value" header-align="center" minWidth="80">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.value" size="mini" placeholder="value">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" header-align="center" width="150">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.remark" size="mini" placeholder="备注">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" header-align="center" width="80">
                            <template slot-scope="scope">
                                <el-button type="danger" icon="el-icon-delete" size="mini"
                                           @click.native="delProjectVariable(scope.$index)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <hr style="height:1px;border:none;border-top:1px solid rgb(241, 215, 215);"/>

                    <!--<div style="margin-top: 10px">-->
                    <!--<span style="margin-left: 10px">头部信息：</span>-->
                    <!--<el-button type="primary" size="mini" @click="addProjectHeader()">添加</el-button>-->
                    <!--</div>-->
                    <!--<el-table :data="projectData.header" stripe :show-header="false">-->
                    <!--<el-table-column label="Key" header-align="center" minWidth="50">-->
                    <!--<template slot-scope="scope">-->
                    <!--<el-input v-model="scope.row.key" size="mini" placeholder="key">-->
                    <!--</el-input>-->
                    <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column label="Value" header-align="center" minWidth="80">-->
                    <!--<template slot-scope="scope">-->
                    <!--<el-input v-model="scope.row.value" size="mini" placeholder="value">-->
                    <!--</el-input>-->
                    <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column label="操作" header-align="center" width="80">-->
                    <!--<template slot-scope="scope">-->
                    <!--<el-button type="danger" icon="el-icon-delete" size="mini"-->
                    <!--@click.native="delProjectHeader(scope.$index)">删除-->
                    <!--</el-button>-->
                    <!--</template>-->
                    <!--</el-table-column>-->
                    <!--</el-table>-->


                </el-tab-pane>

            </el-tabs>

            <div slot="footer" class="dialog-footer">
                <el-button @click="projectData.modelFormVisible = false" size="small">取 消
                </el-button>
                <el-button type="primary" id="sure_btn"
                           @click.native="addProjectBtn()" size="small">确 定
                </el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>

    export default {
        name: 'projectManageUI',
        data() {
            return {
                tableData: Array(),
                total: 1,
                funcAddress: '',
                userData: [],
                currentPage: 1,
                sizePage: 20,
                form: {
                    projectName: null,
                    user: {
                        user_name: null,
                        user_id: null,
                    },
                },
                projectData: {
                    id: null,
                    modelFormVisible: false,
                    projectName: null,
                    principal: '管理员',    //负责人
                    android_package: 'com.yiche.autoeasy',//安卓包
                    ios_bundle_id: 'bitauto.application',//ios bundle id
                    android_launch: 'com.yiche.autoeasy.ADActivity',//安卓启动页
                    formLabelWidth: '80px',
                    funcFile: '',
                    variable: Array(),
                },
            }
        },
        methods: {
            proHandleCurrentChange(val) {
                this.currentPage = val;
                this.findProject()
            },
            proHandleSizeChange(val) {
                this.sizePage = val;
                this.findProject()
            },

            findProject() {
                this.$axios.post(this.$api.findUIProApi, {
                    'projectName': this.form.projectName,
                    'page': this.currentPage,
                    'sizePage': this.sizePage,
                }).then((response) => {
                        if (this.messageShow(this, response)) {
                            this.tableData = response.data['data'];
                            this.total = response.data['total'];
                            this.userData = response.data['userData'];
                        }
                    }
                )
            },
            findFuncAddress() {
                this.$axios.post(this.$api.getFuncAddressApi).then((response) => {
                        this.funcAddress = response['data']['data'];
                    }
                )
            },
            initProjectData() {
                this.projectData.projectName = null;
                this.form.user = {};
                this.projectData.funcFile = null;
                this.projectData.variable = Array();
                this.projectData.principal = '管理员';    //负责人
                this.projectData.android_package = 'com.yiche.autoeasy';
                this.projectData.ios_bundle_id = 'bitauto.application';
                this.projectData.android_launch = 'com.yiche.autoeasy.ADActivity';
                this.projectData.id = null;
                this.projectData.modelFormVisible = true;
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
                this.addProject()
            },
            addProject() {
                this.$axios.post(this.$api.addUIProApi, {
                    'projectName': this.projectData.projectName,
                    'principal': this.projectData.principal,
                    'android_package':this.projectData.android_package,//安卓包名
                    'android_launch':this.projectData.android_launch,//安卓启动页
                    'ios_bundle_id':this.projectData.ios_bundle_id,//ios bundle id
                    'funcFile': this.projectData.funcFile,
                    'header': JSON.stringify(this.projectData.header),
                    'userId': this.form.user.user_id,
                    'id': this.projectData.id,
                    'variable': JSON.stringify(this.projectData.variable),
                }).then((response) => {
                        console.log(3333,response);
                        if (this.messageShow(this, response)) {
                            this.projectData.modelFormVisible = false;
                            this.findProject();
                        }
                    }
                )
            },
            editProject(id) {
                this.$axios.post(this.$api.editUIProApi, {'id': id}).then((response) => {
                        let proData = this.projectData;
                        let resData = response.data.data;
                        let index = this.userData.map(item => item.user_id).indexOf(resData['user_id']);
                        this.form.user = this.userData[index];
                        proData.projectName = resData['pro_name'];
                        proData.principal = resData['principal'];
                        proData.variable = resData['variables'];
                        proData.id = id;
                        // 新增三项
                        proData.android_package = resData['android_package'];//安卓包名
                        proData.android_launch = resData['android_launch'];//安卓启动页
                        proData.ios_bundle_id = resData['ios_bundle_id'];//ios bundle id

                        proData.funcFile = resData['func_file'];
                        proData.modelFormVisible = true;
                    }
                )
            },
            delProject(id) {
                this.$axios.post(this.$api.delUIProApi, {'id': id}).then((response) => {
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
        },

        mounted() {
            this.findProject();
            this.findFuncAddress();
            console.log(1111111,this.projectData.android_package);
        },
    }
</script>
<style>
</style>

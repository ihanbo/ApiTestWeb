<template>
    <div class="modeManage" v-loading="this.loading">

        <el-form :inline="true" class="demo-form-inline search-style" size="small">
            <el-form-item label="项目" labelWidth="80px">
                <el-select v-model="form.projectName" placeholder="选择项目">
                    <el-option
                            v-for="(item) in proModelData"
                            :key="item.name"
                            :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务" labelWidth="50px">


                <el-input placeholder="请输入任务名称" v-model="form.taskName">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click.native="handleCurrentChange(1)">搜索</el-button>
                <el-button type="primary" @click.native="initTaskData()">添加任务
                </el-button>
            </el-form-item>
        </el-form>

        <el-tabs value="first" class="table_padding">
            <el-tab-pane label="任务列表" name="first" style="margin: 0 0 -10px;">
                <el-table :data="tableData"
                          max-height="748"
                          stripe>
                    <el-table-column
                            type="index"
                            label="编号"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="task_name"
                            label="任务名称"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="task_config_time"
                            label="定时时间"
                            min-width="100">
                        <template slot-scope="scope">
                            {{taskConfigShow(tableData[scope.$index]['task_config_time'])}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态"
                            min-width="100">
                        <template slot-scope="scope">
                            <!--<div :style="scope.row.read_status === '已读' ? 'color:#2bef2b': 'color:rgb(255, 74, 74)'">-->
                            <!--{{scope.row.read_status}}-->
                            <!--</div>-->
                            <el-tag size="small" :type="scope.row.status === '创建' ?
                             'info' :  scope.row.status === '启动' ? 'success' : 'warning'">
                                {{scope.row.status}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            min-width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" v-show="false">{{null}}</el-button>
                            <el-button type="primary" size="mini" v-if="tableData[scope.$index]['status'] === '创建'"
                                       @click.native="editTask(tableData[scope.$index]['id'])">修改
                            </el-button>
                            <el-button type="primary" size="mini" v-if="tableData[scope.$index]['status'] === '创建'"
                                       @click.native="startTask(tableData[scope.$index]['id'])">启动
                            </el-button>
                            <el-button type="primary" size="mini" v-if="tableData[scope.$index]['status'] !== '创建'"
                                       v-show="tableData[scope.$index]['status'] !== '暂停'"
                                       @click.native="pauseTask(tableData[scope.$index]['id'])">暂停
                            </el-button>
                            <el-button type="primary" size="mini" v-if="tableData[scope.$index]['status'] !== '创建'"
                                       v-show="tableData[scope.$index]['status'] !== '启动'"
                                       @click.native="resumeTask(tableData[scope.$index]['id'])">恢复
                            </el-button>
                            <el-button type="primary" size="mini" v-if="tableData[scope.$index]['status'] !== '创建'"
                                       @click.native="removeTask(tableData[scope.$index]['id'])">移除
                            </el-button>
                            <el-button type="success" size="mini" :loading="runStatus"
                                       @click.native="runNow(tableData[scope.$index]['id'])">单次运行
                            </el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                       @click.native="sureView(delTask,tableData[scope.$index]['id'],tableData[scope.$index]['task_name'])">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            @size-change="handleSizeChange"
                            :current-page="currentPage"
                            :page-size="sizePage"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="this.total">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>


        <el-dialog title="任务配置" :visible.sync="taskData.modelFormVisible" width="42%">
            <el-tabs>
                <el-tab-pane label="任务信息" style="margin-top: 10px">
                    <el-form>

                        <!--<el-form-item label="执行类别" :label-width="taskData.formLabelWidth">-->
                        <!--<el-select v-module="taskData.taskType" size="medium">-->
                        <!--<el-option v-for="item in taskTypes" :key="item" :value="item">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <el-form-item :required="true" label="执行选择" :label-width="taskData.formLabelWidth">
                            <el-select v-model="form.projectName" placeholder="选择项目"
                                       style="width: 150px;padding-right:5px"
                                       @change="changeProjectChoice">
                                <el-option
                                        v-for="(item) in proModelData"
                                        :key="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>

                            <el-select v-model="form.set" multiple placeholder="选择用例集" value-key="id"
                                       @change="changeSceneChoice"
                                       style="width: 150px;padding-right:5px">
                                <el-option
                                        v-for="item in allSetList[this.form.projectName]"
                                        :key="item.id"
                                        :label="item.label"
                                        :value="item">
                                </el-option>
                            </el-select>

                            <el-select v-model="form.case" multiple placeholder="选择用例" value-key="id"
                                       :disabled="caseStatus"
                                       style="width: 150px">
                                <el-option
                                        v-for="item in allSceneList[this.form.set_id]"
                                        :key="item.id"
                                        :label="item.label"
                                        :value="item">
                                </el-option>
                            </el-select>

                        </el-form-item>
                        <el-form-item :required="true" label="任务名称" :label-width="taskData.formLabelWidth">
                            <el-input v-model="taskData.name" auto-complete="off">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="收件人邮箱" :label-width="taskData.formLabelWidth">
                            <el-input v-model="taskData.toEmail">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="发件人邮箱" :label-width="taskData.formLabelWidth">
                            <el-input v-model="taskData.SendEmail">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="邮箱密码" :label-width="taskData.formLabelWidth"
                                      prop="desc">
                            <el-input v-model="taskData.password" type="password">
                            </el-input>
                        </el-form-item>

                        <el-form-item :required="true"label="时间配置" :label-width="taskData.formLabelWidth">
                            <template>
                                <el-select v-model="taskData.timeConfig"
                                           style="width: 240px;padding-right:5px"
                                           clearable placeholder="请选择" >
<!--                                    @change="changetimeChoice"-->
                                    <el-option
                                            v-for="(item) in timeoptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>

                            <!--
                            <el-input v-model="taskData.timeConfig"
                                      placeholder="second minute hour day month day_of_week(0 0 12 * * ? 每天中午12点触发)">
                            </el-input>
                            -->
                        </el-form-item>
                    </el-form>
                </el-tab-pane>


            </el-tabs>

            <div slot="footer" class="dialog-footer">
                <el-button @click="taskData.modelFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary"
                           @click.native="addTask()" size="small">确 定
                </el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: 'modeManage',
        data() {
            return {
                proModelData: '',
                runStatus: false,
                caseStatus: false,
                loading:false,
                allSetList: '',
                allSceneList: '',
                tableData: [],
                timeoptions: [{
                    value: '0 0 0 * * ?',
                    label: '每天0点触发执行'
                }, {
                    value: '0 0 6 * * ?',
                    label: '每天6点触发执行'
                }, {
                    value: '0 0 12 * * ?',
                    label: '每天12点触发执行'
                }],
                total: 1,
                currentPage: 1,
                sizePage: 10,
                form: {
                    set: {
                        label: null,
                        id: null,
                    },
                    case: {
                        label: null,
                        id: null,
                    },
                    set_id: '',
                    projectName: '',
                    modelName: '',
                    taskName: '',


                },
                taskData: {
                    id: '',
                    num: '',
                    modelFormVisible: false,
                    projectName: '',
                    name: '',
                    taskType: '',
                    toEmail: '',
                    SendEmail: '',
                    timeConfig: '',
                    password: '',
                    formLabelWidth: '90px',
                }
            }
        },


        methods: {
            taskConfigShow(config_time){
                if(config_time === '0 0 0 * * ?'){
                    return '每天0点触发执行'
                }
                if(config_time === '0 0 6 * * ?'){
                    return '每天6点触发执行'
                }
                if(config_time === '0 0 12 * * ?'){
                    return '每天12点触发执行'
                }
            },
            httpSend() {
                this.$axios.get(this.$api.baseDataApi).then((response) => {
                        if (response.data['user_pro']) {
                            this.form.projectName = response.data['user_pro']['pro_name'];
                            this.findTask();
                        }
                        this.proModelData = response.data['pro_and_id'];
                        this.allSetList = response.data['set_list'];
                        this.allSceneList = response.data['scene_list'];
                    }
                );

            },
            changeProjectChoice() {
                this.form.set = [];
                this.form.case = [   ];

            },
            changeSceneChoice() {
                if (this.form.set.length === 1) {
                    this.caseStatus = false;
                    this.form.set_id = this.form.set[0].id;
                } else {
                    this.caseStatus = true;
                    this.form.case = [];
                    this.form.set_id = ''

                }
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.findTask()
            },
            handleSizeChange(val) {
                this.sizePage = val;
                this.findTask()
            },
            findTask() {
                this.$axios.post(this.$api.findTaskApi, {
                    'projectName': this.form.projectName,
                    'taskName': this.form.taskName,
                    'page': this.currentPage,
                    'sizePage': this.sizePage,
                }).then((response) => {
                        if (response.data['status'] === 0) {
                            this.$message({
                                showClose: true,
                                message: response.data['msg'],
                                type: 'warning',
                            });
                        } else {
                            this.tableData = response.data['data'];
                            this.total = response.data['total'];
                        }

                    }
                )
            },
            initTaskData() {
                this.taskData.name = '';
                this.taskData.id = '';
                this.taskData.taskType = '';
                this.taskData.toEmail = '';
                this.taskData.SendEmail = '';
                this.taskData.timeConfig = '';
                this.taskData.password = '';
                this.form.set = [];
                this.form.case = [];
                this.taskData.num = '';
                this.taskData.modelFormVisible = true;

            },
            addTask() {
                if(!this.taskData.name.replace(/(^\s*)|(\s*$)/g, "")){
                    this.$message({
                        showClose: true,
                        message: '请填写任务名称',
                        type: 'warning',
                    });
                    return
                }
                if(!this.taskData.timeConfig){
                    this.$message({
                        showClose: true,
                        message: '请选择时间配置',
                        type: 'warning',
                    });
                    return
                }
                this.$axios.post(this.$api.addTaskApi, {
                    'projectName': this.form.projectName,
                    'setIds': this.form.set,
                    'caseIds': this.form.case,
                    'id': this.taskData.id,
                    'num': this.taskData.num,
                    'name': this.taskData.name,
                    'taskType': this.taskData.taskType,
                    'toEmail': this.taskData.toEmail,
                    'sendEmail': this.taskData.SendEmail,
                    'timeConfig': this.taskData.timeConfig,
                    'password': this.taskData.password,
                }).then((response) => {
                        if (response.data['status'] === 0) {
                            this.$message({
                                showClose: true,
                                message: response.data['msg'],
                                type: 'warning',
                            });
                        } else {
                            this.taskData.modelFormVisible = false;
                            this.$message({
                                showClose: true,
                                message: response.data['msg'],
                                type: 'success',
                            });
                            this.findTask();

                        }
                    }
                )
            },
            editTask(id) {
                this.$axios.post(this.$api.editTaskApi, {'id': id}).then((response) => {
                        this.taskData.name = response.data['data']['task_name'];
                        this.taskData.timeConfig = response.data['data']['task_config_time'];
                        // this.form.projectName = response.data['data']['project_name'];
                        this.taskData.taskType = response.data['data']['task_type'];
                        this.taskData.toEmail = response.data['data']['task_to_email_address'];
                        this.taskData.SendEmail = response.data['data']['task_send_email_address'];
                        this.taskData.password = response.data['data']['password'];
                        this.taskData.num = response.data['data']['num'];
                        this.taskData.projectName = this.form.projectName;
                        this.taskData.id = id;
                        this.form.set = response.data['data']['set_ids'];

                        if (response.data['data']['set_ids'].length === 1) {
                            // 当用例集只有1个时，赋值set_id，让用例下拉框有数据显示
                            this.form.set_id = response.data['data']['set_ids'][0]['id']
                        } else {
                            this.caseStatus = true;
                        }
                        this.form.case = response.data['data']['case_ids'];
                        this.taskData.modelFormVisible = true;
                    }
                )
            },
            startTask(id) {
                this.$axios.post(this.$api.startTaskApi, {'id': id}).then((response) => {
                        this.messageShow(this, response);
                        this.findTask();
                    }
                )
            },
            pauseTask(id) {
                this.$axios.post(this.$api.pauseTaskApi, {'id': id}).then((response) => {
                        this.messageShow(this, response);
                        this.findTask();
                    }
                )
            },
            resumeTask(id) {
                this.$axios.post(this.$api.resumeTaskApi, {'id': id}).then((response) => {
                        this.messageShow(this, response);
                        this.findTask();
                    }
                )
            },
            removeTask(id) {
                this.$axios.post(this.$api.removeTaskApi, {'id': id}).then((response) => {
                        this.messageShow(this, response);
                        this.findTask();
                    }
                )
            },
            runNow(id) {
                this.loading = true;
                this.$axios.post(this.$api.runTaskApi, {'id': id}).then((response) => {
                        if (this.messageShow(this, response)) {
                            this.findTask();
                            let {href} = this.$router.resolve({
                                path: 'reportShow',
                                query: {reportId: response.data['data']['report_id']}
                            });
                            window.open(href, '_blank');
                        }
                        this.loading = false;
                    }
                )
            },
            delTask(id) {
                this.$axios.post(this.$api.delTaskApi, {'id': id}).then((response) => {
                        this.messageShow(this, response);
                        this.form.taskName = '';
                        if ((this.currentPage - 1) * this.sizePage + 1 === this.total) {
                            this.currentPage = this.currentPage - 1
                        }
                        this.findTask();
                    }
                )
            },
        },
        mounted() {
            this.httpSend();


        },
    }
</script>

<style>

</style>

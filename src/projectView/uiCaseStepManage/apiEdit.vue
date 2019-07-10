<template>
    <div class="uiCaseEdit">

        <el-form :inline="true" style="padding: 10px 20px -10px 10px;">
            <el-form-item label="基础信息" labelWidth="80px" style="margin-bottom: 10px;margin-top:10px">
                <el-select v-model="form.projectName"
                           placeholder="请选择项目"
                           size="small"
                           @change="changeProChoice"
                           style="width: 150px;padding-right:5px">
                    <el-option
                            v-for="(item, key) in proModelData"
                            :key="key"
                            :value="key">
                    </el-option>
                </el-select>

                <el-select v-model="form.module"
                           placeholder="请选择模块"
                           value-key="moduleId"
                           size="small"
                           style="width: 150px;padding-right:5px">
                    <el-option
                            v-for="item in proModelData[this.form.projectName]"
                            :key="item.moduleId"
                            :label="item.name"
                            :value="item">
                    </el-option>
                </el-select>
                <el-select v-model="caseStepData.platform"
                           placeholder="请选择操作平台"
                           value-key="id"
                           size="small">
                    <el-option
                            v-for="item in platformData"
                            :key="item.id"
                            :label="item.name"
                            :value="item">
                    </el-option>
                </el-select>
                <el-button type="primary" @click.native="addCaseInfo()" size="small" style="margin-left: 50px">Save</el-button>
            </el-form-item>
        </el-form>
        <hr style="height:1px;border:none;border-top:1px solid rgb(241, 215, 215);margin-top: -5px"/>
        <el-form :inline="true" style="padding: 10px 20px -10px 10px;">
            <el-form-item label="详细信息" labelWidth="80px" style="margin-bottom: 5px">
                <el-form-item prop="name" style="margin-bottom: 5px">
                    <el-input v-model="caseStepData.name" placeholder="case名称" size="small">
                    </el-input>
                </el-form-item>

                <el-form-item prop="desc" style="margin-bottom: 5px">
                    <el-input v-model="caseStepData.desc" placeholder="case描述" size="small">
                    </el-input>
                </el-form-item>

            </el-form-item>
        </el-form>
        <el-form :inline="true" style="padding: 10px 20px -10px 10px;">
            <el-form-item label="元素定位" labelWidth="80px" style="margin-bottom: 5px">
                <el-form-item prop="resourceid" style="margin-bottom: 5px">
                    <el-input v-model="caseStepData.resourceid" placeholder="元素id" size="small">
                    </el-input>
                </el-form-item>

                <el-form-item prop="xpath" style="margin-bottom: 5px">
                    <el-input v-model="caseStepData.xpath" placeholder="元素path" size="small">
                    </el-input>
                </el-form-item>

                <el-form-item prop="text" style="margin-bottom: 5px">
                    <el-input v-model="caseStepData.text" placeholder="元素文本（不推荐）" size="small">
                    </el-input>
                </el-form-item>
                
                <el-select v-model="caseStepData.action"
                           placeholder="元素行为"
                           value-key="id"
                           size="small">
                    <el-option
                            v-for="(item) in this.action"
                            :key="item.id"
                            :label="item.action_name"
                            :value="item">
                    </el-option>
                </el-select>
                <el-form-item prop="extraParam" style="margin-bottom: 5px">
                    <el-input v-model="caseStepData.extraParam" placeholder="携带参数" size="small">
                    </el-input>
                </el-form-item>
            </el-form-item>
        </el-form>
        <hr style="height:1px;border:none;border-top:1px solid rgb(241, 215, 215);margin-top: -5px"/>

        <result ref="resultFunc">
        </result>

        <errorView ref="errorViewFunc">
        </errorView>

    </div>
</template>

<script>
    import result from './result.vue'
    import errorView from '../common/errorView.vue'

    export default {
        components: {
            // editor: require('vue2-ace-editor'),
            result: result,
            errorView: errorView,
        },
        name: 'uiCaseEdit',
        props: ['proModelData', 'projectName', 'module', 'proUrlData'],
        data() {
            return {
                bodyShow: 'second',
                paramTypes: ['string', 'file'],
                cell: Object(),
                saveRunStatus: false,
                ParamViewStatus: false,
                //上传文件时，记录数组下当前数据的下标，用于把返回文件路径地址赋值
                temp_num: '',
                methods: ['POST', 'GET', 'PUT', 'DELETE'],
                form: {
                    projectName: null,
                    module: {
                        name: null,
                        moduleId: null,
                    },
                },
                platformData:[],
                action:[],
                caseStepData: {
                    id: null,
                    name: null,
                    num: null,
                    desc: null,
                    platform: null,
                    xpath:null,
                    resourceid:null,
                    text:null,
                    action:null,
                    extraParam:null,
                },

            }
        },
        methods: {
            editorInit() {
                require('brace/ext/language_tools');
                require('brace/mode/json');
                require('brace/theme/chrome');
                require('brace/snippets/json')
            },
            changeProChoice() {
                //  改变项目选项时，清空模块和基础url的选择
                this.form.module = '';
            },
            
            initBaseData() {
                //  初始化页面所需要的数据
                this.$axios.get(this.$api.findPlatformApi).then((response) => {
                        this.platformData = response.data['data'];
                    }
                )
                this.$axios.get(this.$api.findActionsApi).then((response) => {
                        this.action = response.data['data'];
                    }
                )
            },

            initApiMsgData() {
                this.caseStepData.name = null;
                this.caseStepData.num = null;
                this.caseStepData.desc = null;
                this.caseStepData.id = null;
                this.caseStepData.platform=null,
                this.caseStepData.xpath=null,
                this.caseStepData.resourceid=null,
                this.caseStepData.text=null,
                this.caseStepData.action=null,
                this.caseStepData.extraParam=null,
                this.form.projectName = this.projectName;
                this.form.module = this.module;
            },

            fileChange(response, file) {
                if (response['status'] === 0) {
                    this.$confirm('服务器已存在相同名字文件，是否覆盖?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let form = new FormData();
                        form.append("file", file.raw);
                        form.append("skip", '1');
                        this.$axios.post('/api/upload', form).then((response) => {
                                this.$message({
                                    showClose: true,
                                    message: response.data['msg'],
                                    type: 'success',
                                });
                                this.caseStepData.variable[this.temp_num]['value'] = response.data['data'];
                            }
                        );
                    }).catch(() => {

                    });
                } else {
                    if (response['msg']) {
                        this.$message({
                            showClose: true,
                            message: response['msg'],
                            type: 'success',
                        });
                    }
                    this.caseStepData.variable[this.temp_num]['value'] = response['data'];
                }

            },
            addCaseInfo(messageClose = false) {
                if (!this.form.projectName) {
                    this.$message({
                        showClose: true,
                        message: '请选择项目',
                        type: 'warning',
                    });
                    return
                }
                if (!this.form.module) {
                    this.$message({
                        showClose: true,
                        message: '请选择业务模块',
                        type: 'warning',
                    });
                    return
                }
                if (!this.caseStepData.name) {
                    this.$message({
                        showClose: true,
                        message: '请输入名称',
                        type: 'warning',
                    });
                    return
                }
                if (!this.caseStepData.xpath && !this.caseStepData.resourceid && !this.caseStepData.text) {
                    this.$message({
                        showClose: true,
                        message: '必填！路径，资源id，文本至少整一炮',
                        type: 'warning',
                    });
                    return
                }

                return this.$axios.post(this.$api.addUIcaseStepApi, {
                    'moduleId': this.form.module.moduleId,
                    'projectName': this.form.projectName,
                    'caseStepId': this.caseStepData.id,
                    'caseStepName': this.caseStepData.name,
                    'num': this.caseStepData.num,
                    'desc': this.caseStepData.desc,
                    'platform':this.caseStepData.platform.id,
                    'xpath': this.caseStepData.xpath,
                    'resourceid': this.caseStepData.resourceid,
                    'text': this.caseStepData.text,
                    'action':this.caseStepData.action.id,
                    'extraParam':this.caseStepData.extraParam,
                }).then((response) => {
                        if (messageClose) {
                            return response
                        } else {
                            if (this.messageShow(this, response)) {
                                this.caseStepData.id = response.data['caseStepId'];
                                this.caseStepData.num = response.data['num'];
                                return true
                            }
                        }

                    }
                )
            },
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
                        this.caseStepData.resourceid = response.data['data']['resourceid'];
                        this.caseStepData.extraParam = response.data['data']['extraParam'];
                        this.form.projectName = this.projectName;
                        this.form.module = this.module;
                    }
                );
            },
        }
        ,
        mounted() {
            this.initBaseData();
        }
        ,
    }
</script>
<style>

</style>

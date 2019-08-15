<template>
    <div class="reportUiManage">

        <el-form :inline="true" class="demo-form-inline search-style" size="small">
            <el-form-item label="项目" labelWidth="110px">
                <el-select v-model="form.projectName" placeholder="请选择项目">
                    <el-option
                            v-for="item in proData"
                            :key="item.id"
                            :value="item.name">
                    </el-option>
                </el-select>

                <!--<el-select v-module="form.gathers" multiple placeholder="请选择模块" style="width: 400px;">-->
                <!--<el-option-->
                <!--v-for="item in proData[this.form.projectName]"-->
                <!--:key="item.id"-->
                <!--:value="item.value">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--<el-select v-module="form.scenes" multiple placeholder="请选择业务集" style="width: 400px;">-->
                    <!--<el-option-->
                            <!--v-for="item in proSceneData[this.form.projectName]"-->
                            <!--:key="item.id"-->
                            <!--:value="item.value">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.native="handleCurrentChange(1)" size="small">搜索</el-button>
                <!--<el-button type="primary" @click.native="reset()" size="small">重置</el-button>-->
                <!--<el-button type="primary" size="small" @click.native="runProject()">跑项目</el-button>-->
                <!--<el-button type="primary" size="small"@click.native="runModel()" >跑模块</el-button>-->
                <!--<el-button type="primary" size="small" @click.native="runScene()" :loading="this.loading">跑业务-->
                <!--</el-button>-->
            </el-form-item>
        </el-form>

        <el-tabs value="first" class="table_padding">
            <el-tab-pane label="报告列表" name="first" style="margin: 0 0 -10px;">

                <!--<el-scrollbar wrap-class="scrollbarList">-->
                <el-table :data="tableData"
                          max-height="748"
                          stripe>

                    <el-table-column
                            prop="project_name"
                            label="所属项目"
                            minWidth="50">
                    </el-table-column>

                    <el-table-column
                            :show-overflow-tooltip=true
                            minWidth="200"
                            prop="name"
                            label="用例"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="create_time"
                            label="时间"
                            minWidth="100">
                    </el-table-column>
                    <el-table-column
                            prop="performer"
                            label="执行者"
                            minWidth="100">
                    </el-table-column>
                    <el-table-column
                            prop="read_status"
                            label="状态"
                            width="80">
                        <template slot-scope="scope">
                            <!--<div :style="scope.row.read_status === '已读' ? 'color:#2bef2b': 'color:rgb(255, 74, 74)'">-->
                                <!--{{scope.row.read_status}}-->
                            <!--</div>-->
                            <el-tag size="small" :type="scope.row.read_status === '已读' ? 'success' : 'danger'">
                                {{scope.row.read_status}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="300"
                    >
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-zoom-in" size="mini"
                                       @click.native="check(tableData[scope.$index]['id'])">查看
                            </el-button>
                
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                       @click.native="sureView(delReport, tableData[scope.$index]['id'],'该报告')">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--</el-scrollbar>-->
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


    </div>
</template>

<script>
    export default {
        name: 'reportUiManage',
        data() {
            return {
                proData: '',
                tableData: [],
                total: 1,
                currentPage: 1,
                sizePage: 20,
                form: {
                    projectName: '',
                    gathers: [],
                    scenes: [],
                },
                reportData: {
                    'data': {'records': []},
                    'body': {
                        'platform': {'duration': '', 'python_version': ''},
                        'stat': {'skipped': '', 'testsRun': '', 'successes': '', 'failures': '', 'errors': ''}
                    },

                },
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.currentPage = val;
                this.findReport()
            },
            handleSizeChange(val) {
                this.sizePage = val;
                this.findReport()
            },
            initData() {
                this.$axios.get(this.$api.baseUIDataApi).then((response) => {
                        this.form.projectName = response.data['user_pro']['pro_name'];
                        this.findReport()
                        this.proData = response.data['pro_and_id'];
                    }
                );
            },
            findReport() {
                this.$axios.post(this.$api.findUiReportApi, {
                    'page': this.currentPage,
                    'projectName': this.form.projectName,
                    'sizePage': this.sizePage,
                }).then((response) => {
                        if (this.messageShow(this, response)) {
                            this.tableData = response.data['data'];
                            this.total = response.data['total'];
                        }
                    }
                )
            },
            delReport(report_id) {
                this.$axios.post(this.$api.delUiReportApi, {'report_id': report_id}).then((response) => {
                        this.messageShow(this, response);
                        if ((this.currentPage - 1) * this.sizePage + 1 === this.total) {
                            this.currentPage = this.currentPage - 1
                        }
                        this.findReport();
                    }
                )
            },
            //ui测试报告
            check(report_id) {

                let {href} = this.$router.resolve({path: 'uiTestReport', query: {report_id: report_id}});
                window.open(href, '_blank');
                console.log(report_id);
            
                this.$axios.post(this.$api.seeUiReportApi, {
                    'report_id': report_id
                    }).then(({data}) => {
                        // this.messageShow(this, response);
                        console.log(data.msg);
                    }
                )
                
            },
            

        },
        mounted() {
            this.initData();
            // this.findReport();


        },
    }
</script>

<style>


    .el-footer {
        background-color: #8db7ef;
        color: #333;
        text-align: left;
        line-height: 30px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    /*.el-tabs__header {*/
    /*margin: 0 0 10px;*/
    /*}*/

    .el-button--mini {
        padding: 5px 9px;
    }

    .el-dialog__body {
        padding: 5px 10px;
    }

    .row-bg {
        padding: 5px 0;
    }

    .el-breadcrumb {
        line-height: 3;
    }

</style>

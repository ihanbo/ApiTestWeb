<template>
    <div class="reportSummary">

        <el-form :inline="true" class="demo-form-inline search-style" size="small">
            <el-form-item label="项目" labelWidth="110px">
                <el-select v-model="form.projectName" placeholder="请选择项目">
                    <el-option
                            v-for="item in proData"
                            :key="item.id"
                            :value="item.name">
                    </el-option>
                </el-select>

            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.native="handleCurrentChange(1)" size="small">搜索</el-button>
            </el-form-item>
        </el-form>

        <el-tabs value="first" class="table_padding">
            <el-tab-pane label="用例执行概况列表" name="first" style="margin: 0 0 -10px;">

                <!--<el-scrollbar wrap-class="scrollbarList">-->
                <el-table :data="tableData"
                          max-height="748"
                          stripe>

                    <el-table-column
                            prop="reportId"
                            label="报告id"
                            minWidth="70">
                    </el-table-column>

                    <el-table-column
                            :show-overflow-tooltip=true
                            minWidth="200"
                            prop="startDatetime"
                            label="执行时间"
                    >
                    </el-table-column>
                    <el-table-column
                            label="case通过率"
                            minWidth="100">
                        <template slot-scope="scope">
                           {{String(scope.row.caseSuccess / scope.row.caseTotal).toFixed(2) * 100}}%
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="caseTotal"
                            label="case总数"
                            minWidth="100">
                    </el-table-column>
                    <el-table-column
                            prop="caseSuccess"
                            label="case成功数"
                            minWidth="100">
                    </el-table-column>
                    <el-table-column
                            prop="caseFail"
                            label="case失败数"
                            minWidth="100">
                    </el-table-column>
                    <el-table-column
                            prop="stepSuccessRate"
                            label="api通过率"
                            minWidth="100">
                    </el-table-column>
                    <el-table-column
                            prop="stepTotal"
                            label="api总数"
                            minWidth="100">
                    </el-table-column>
                    <el-table-column
                            prop="stepSuccesses"
                            label="api成功数"
                            minWidth="100">
                    </el-table-column>
                    <el-table-column
                            prop="projetName"
                            label="所属项目"
                            minWidth="100">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-zoom-in" size="mini"
                                       @click.native="check(tableData[scope.$index]['reportId'])">查看
                            </el-button>
                            <el-button type="primary" icon="el-icon-download" size="mini"
                            @click.native="downReport(tableData[scope.$index]['reportId'])">下载
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
        name: 'reportSummary',
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
                this.findResultSummary()
            },
            handleSizeChange(val) {
                this.sizePage = val;
                this.findResultSummary()
            },
            initData() {
                this.$axios.get(this.$api.baseDataApi).then((response) => {
                    if (response.data['user_pro']){
                        this.form.projectName = response.data['user_pro']['pro_name'];
                        this.findResultSummary()
                    }
                        this.proData = response.data['pro_and_id'];
                    }
                );
            },
            findResultSummary() {
                this.$axios.post(this.$api.findResultSummaryApi, {
                    'page': this.currentPage,
                    'projectName': this.form.projectName,
                    'sizePage': this.sizePage,
                }).then((response) => {
                        if (this.messageShow(this, response)) {
                            this.tableData = response.data['data']
                            this.total = response.data['total'];
                        }
                    }
                )
            },
            check(reportId) {

                // this.$router.push({path: 'reportShow', query: {reportId: reportId}});
                let {href} = this.$router.resolve({path: 'reportShow', query: {reportId: reportId}});
                window.open(href, '_blank');
            },
            downReport(reportId) {
                this.$axios.post('/api/report/download', {'reportId': reportId}).then((response) => {
                        // console.log(response.data['data']);
                        // download(response.data['data'], "测试报告.html", "text/html")
                        this.download(response.data['data'], "测试报告.html", "text/html")
                    }
                )
            },
            download(data, strFileName, strMimeType) {

                let self = window, // this script is only for browsers anyway...
                    defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
                    mimeType = strMimeType || defaultMime,
                    payload = data,
                    anchor = document.createElement("a"),
                    toString = function (a) {
                        return String(a);
                    },
                    myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
                    fileName = strFileName || "download",
                    blob,
                    reader;
                myBlob = myBlob.call ? myBlob.bind(self) : Blob;

                //go ahead and download dataURLs right away
                blob = payload instanceof myBlob ?
                    payload :
                    new myBlob([payload], {type: mimeType});


                function saver(url, winMode) {
                    if ('download' in anchor) { //html5 A[download]
                        anchor.href = url;
                        anchor.setAttribute("download", fileName);
                        anchor.className = "download-js-link";
                        anchor.innerHTML = "downloading...";
                        anchor.style.display = "none";
                        document.body.appendChild(anchor);
                        setTimeout(function () {
                            anchor.click();
                            document.body.removeChild(anchor);
                            if (winMode === true) {
                                setTimeout(function () {
                                    self.URL.revokeObjectURL(anchor.href);
                                }, 250);
                            }
                        }, 66);
                        return true;
                    }

                }//end saver

                if (self.URL) { // simple fast and modern way using Blob and URL:
                    saver(self.URL.createObjectURL(blob), true);
                } else {
                    // handle non-Blob()+non-URL browsers:
                    if (typeof blob === "string" || blob.constructor === toString) {
                        try {
                            return saver("data:" + mimeType + ";base64," + self.btoa(blob));
                        } catch (y) {
                            return saver("data:" + mimeType + "," + encodeURIComponent(blob));
                        }
                    }

                    // Blob but not URL support:
                    reader = new FileReader();
                    reader.onload = function () {
                        saver(this.result);
                    };
                    reader.readAsDataURL(blob);
                }
                return true;
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

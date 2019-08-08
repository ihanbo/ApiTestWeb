<template>
    <div class="resultCaseSet">
        <div style="width: 50%;font-size: 30px;line-height:35px;margin-top: 30px;margin-left: auto;margin-right: auto">{{caseSetName}}测试报告</div>
         <el-form>
             <el-row>
                 <el-col :span="16" style="margin-top:100px">
                     <el-row>
                         <el-col :span="8" style="margin-left: 10px; font-size: 14px">
                             <el-form-item label="开始时间：" size="small">
                                 {{caseTimeStartAt}}
                             </el-form-item>
                         </el-col>
                         <el-col :span="8" style="margin-left: 10px; font-size: 14px">
                             <el-form-item label="运行时长：" size="small">
                                 {{caseTimeDuration}}
                             </el-form-item>
                         </el-col>
                     </el-row>
                     <el-row>
                         <el-col :span="8" style="margin-left: 10px; font-size: 14px">
                             <el-form-item label="用例总数：" size="small">
                                 {{caseToal}}
                             </el-form-item>
                         </el-col>
                         <el-col :span="8" style="margin-left: 10px; font-size: 14px">
                             <el-form-item label="接口总数：" size="small">
                                 {{caseDataTotal}}
                             </el-form-item>
                         </el-col>
                     </el-row>
                     <el-row>
                         <el-col :span="8" style="margin-left: 10px; font-size: 14px">
                             <el-form-item label="成功用例数：" size="small">
                                 {{caseSuccess}}
                             </el-form-item>
                         </el-col>
                         <el-col :span="8" style="margin-left: 10px; font-size: 14px">
                             <el-form-item label="失败用例数：" size="small">
                                 {{caseFaile}}
                             </el-form-item>
                         </el-col>
                     </el-row>
                 </el-col>

                 <el-col :span="8" style="border-style:solid;border-color: #ffffff rgb(234, 234, 234) #ffffff #ffffff;border-width: 1px;margin-top:100px">
                     <ul style="margin-top:5px;font-size:14px;line-height:25px" class="remote-line">
                         <li style="color: rgb(25,212,174);font-weight:600; list-style-type:none">成功率:{{ (caseSuccess / caseToal * 100).toFixed(2)}}%
                         </li>
                         <li style="color: rgb(250,110,134);font-weight:600;list-style-type:none">失败率:{{ (caseFaile / caseToal * 100).toFixed(2)}}%
                         </li>
                     </ul>

                     <div style="height: 200px;float:left">
                         <ve-pie :data="caseChartData" :settings="caseChartSettings" height="200px" width="350px"></ve-pie>
                     </div>
                 </el-col>
             </el-row>
             <el-tabs value="first" class="table_padding">
                     <el-tab-pane label="详细情况" name="first" style="margin: 0 0 -10px;">

                         <!--<el-scrollbar wrap-class="scrollbarList">-->
                         <el-table :data="tableData"
                                   max-height="748"
                                   stripe=""
                                   >

                             <el-table-column
                                     prop="num"
                                     type="index"
                                     label="编号"
                                     width="100">
                             </el-table-column>

                             <el-table-column
                                     prop="caseName"
                                     label="用例名"
                                     minWidth="50">
                             </el-table-column>

                             <el-table-column
                                     prop="caseExecStatus"
                                     label="执行状态"
                                     minWidth="50">
                                 <template slot-scope="scope">
                                     {{scope.row.caseExecStatus === true ? 'pass' : 'fail'}}
                                 </template>
                             </el-table-column>
                         </el-table>
                     </el-tab-pane>
             </el-tabs>

         </el-form>
    </div>
</template>

<script>
    export default {
        name: 'resultCaseSet',
        data() {
            this.caseChartSettings = {
                radius: 80,
                avoidLabelOverlap: false,
                offsetY: 110,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            let colorList = [
                                'rgb(25,212,174)', 'rgb(250,110,134)', '#FE8463', '#E87C25', '#27727B',
                                '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                },
                label: {
                    normal: {position: 'center', show: false,},
                },
                labelLine: {
                    normal: {show: false}
                },
            };
            return {
                caseTimeStartAt:'',
                caseTimeDuration:'',
                caseToal:'',
                caseDataTotal:'',
                caseSuccess:'',
                caseFaile:'',
                caseSetId:'',
                caseSetName: '',
                caseChartData: {
                    columns: ['caseName', 'num'],
                    rows: [
                        {'caseName': '成功case', num: 0},
                        {"caseName": '失败case', num: 0},
                    ]
                },
                tableData:[],
            }
        },
        methods: {
            initData() {
                this.projectName = this.$route.query.projectName;
                this.reportId = this.$route.query.reportId;
                this.caseSetId = this.$route.query.caseSetId;
                this.$axios.post(this.$api.findResultCaseSetApi, {
                    "projectName":this.projectName,
                    "reportId":parseInt(this.reportId),
                    "caseSetId":parseInt(this.caseSetId)
                }).then((response) => {
                        if (response.data['status'] === 1){
                            this.caseSetName = response.data['data']['caseSetName'];
                            this.caseTimeStartAt = response.data['data']['caseTimeStartAt'];
                            this.caseTimeDuration = this.secondsToDate(response.data['data']['caseTimeDuration']);
                            this.caseToal = response.data['data']['caseTotal'];
                            this.caseDataTotal = response.data['data']['caseDataTotal'];
                            this.caseSuccess = response.data['data']['caseSuccess'];
                            this.caseFaile = response.data['data']['caseFaile'];
                            this.caseSetId = response.data['data']['caseSetId'];
                            this.caseSetName = response.data['data']['caseSetName'];
                            this.tableData = response.data['data']['caselist'];
                            this.caseChartData.rows[0].num = this.caseSuccess;
                            this.caseChartData.rows[1].num = this.caseFaile;
                        }
                    }
                );
                this.caseTimeDuration = this.secondsToDate(5.21)
            },
            secondsToDate(seconds){
                var time = seconds
                if (null != time && "" != time) {
                    if (time < 1) {
                        time = "0小时0分0秒" + parseInt(((parseFloat(time)* 1000 - parseInt(time)* 1000)/1000)  * 1000) + "毫秒";
                    } else if (time >= 1 && time < 60) {
                        time = "0小时0分" + parseInt(time)  + "秒" + parseInt(((parseFloat(time)* 1000 - parseInt(time)* 1000)/1000) * 1000) + "毫秒";
                    } else if (time >= 60 && time < 60 * 60) {
                        time = "0小时" + parseInt(time / 60.0) + "分" + parseInt((parseFloat(time / 60.0) -
                            parseInt(time / 60.0)) * 60) + "秒" + parseInt(((parseFloat(time)* 1000 - parseInt(time)* 1000)/1000) * 1000) + "毫秒";
                    }
                    else if (time >= 60 * 60 && time < 60 * 60 * 24) {
                        time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
                            parseInt(time / 3600.0)) * 60) + "分" +
                            parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                                parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒" + parseInt(((parseFloat(time)* 1000 - parseInt(time)* 1000)/1000) * 1000) + "毫秒";;
                    } else {
                        time = "0小时0分0秒0毫秒";
                    }
                }
                return time;
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

    el-form-item {
        width: 100px;

    }
</style>

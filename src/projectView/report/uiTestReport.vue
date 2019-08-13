<template>
    <div class="container-div">
      <!-- 头部标题 -->
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <h3 class="grid-content bg-purple text-center">UI测试报告</h3>
        </el-col>
      </el-row>

      <!-- 测试结果 -->
      <div :data="tableData" v-for="(item,index) in tableData" :key="index"><!-- 遍历tableData -->
        <!-- 基本信息预览 -->
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <p class="grid-content bg-purple">测试名称：{{ item.test_desc }}</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <p class="grid-content bg-purple">测试时间：{{ item.report_dir.slice(item.report_dir.indexOf("2")) }}</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <p class="grid-content bg-purple">测试设备：{{ item.test_device }}</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <p class="grid-content bg-purple">是否成功：{{ item.succ }}</p>
          </el-col>
        </el-row>
      </div>

      <!-- 详细信息区域 -->
      <el-table :data="tableData" border>
        <el-table-column type="expand"><!-- 遍历case -->
        <template slot-scope="props">
            <!-- 详细信息内部简介开始 -->
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="用例名称：">
                <span>{{ props.row.cases[caseIndex].case_name }}</span>
              </el-form-item>
              <el-form-item label="是否成功：">
                <span>{{ props.row.cases[caseIndex].case_succ }}</span>
              </el-form-item>
              <el-form-item label="测试步骤："></el-form-item>
            </el-form>
            <!-- 详细信息内部简介结束 -->
            <!-- 详细信息内部表格开始 -->
            <el-table :data="tableData" style="box-shadow: none" border>
              <el-table-column label="步骤">{{ "1、" }}</el-table-column>
              <el-table-column label="名称">{{ props.row.cases[caseIndex].case_step[caseIndex].stepName }}</el-table-column>
              <el-table-column label="描述">{{ props.row.cases[caseIndex].case_step[caseIndex].stepDesc }}</el-table-column>
              <el-table-column label="成功">{{ props.row.cases[caseIndex].case_step[caseIndex].succ }}</el-table-column>
              <el-table-column label="备注">{{ props.row.cases[caseIndex].case_step[caseIndex].excute }}</el-table-column>
            </el-table>
            <!-- 详细信息内部表格结束 -->
            <!-- 图片开始 -->
            <div class="demo-image__placeholder">
              <div class="block">
                <el-image :src="props.row.cases[caseIndex].case_step[caseIndex].pic">
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>
              </div>
            </div>
            <!-- 图片结束 -->
            </template>
        </el-table-column>
        <el-table-column label="详细信息" prop="report_dir"></el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  name: "ui_test_report",
  data() {
    return {
      caseIndex: 0,
      tableData: [],
    }
  },
  methods: {
    reqTestReport(){
      this.$axios.post(this.$api.seeUiReportApi,{
        "report_id": this.$route.query.report_id
      }).then(({data})=>{
        this.tableData.push(JSON.parse(data.msg));
      })
    }
  },
  created(){
    this.reqTestReport()
  }
};
</script>

<style scoped>
.container-div{
  width: 800px;
  min-height: 360px;
  border: 1px solid #EBEEF5;
  box-shadow: 0 4px 3px -2px #bbb;
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0 auto;
}
.el-table--border{
  width: 100%;
  box-shadow: 0 4px 3px -2px #bbb;
}
.el-image{
  width: 100%;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.text-center {
  text-align: center;
}
</style>


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
            <p class="grid-content bg-purple">测试名称：{{ item.test_name }}</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <p class="grid-content bg-purple">测试时间：{{ item.test_time }}</p>
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
      <el-table :data="tableCase[0]" border>
<!--        <template v-for="(caseInfoData, index) in tableCase[0] " >-->
          <el-table-column  type="expand"><!-- 遍历case -->
            <template slot-scope="props">
            <!-- 详细信息内部简介开始 -->
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="用例名称：">
                <span>{{props.row.case_name }}</span>
              </el-form-item>
              <el-form-item label="是否成功：">
                <span>{{ props.row.case_succ }}</span>
<!--                <span>{{ // testdata(tableCase[0] )}}</span>-->
              </el-form-item>
              <el-form-item label="测试步骤："></el-form-item>
            </el-form>

            <!-- 详细信息内部简介结束 -->

            <!-- 详细信息内部表格开始-->
              <el-table :data = "props.row.case_step" style="box-shadow: none" border>
                <el-table-column :width="55" align="center" type="index" :index="indexMethod" label="序号"></el-table-column>
                <el-table-column prop="stepName" label="名称"></el-table-column>
                <el-table-column prop="stepDesc" label="描述"></el-table-column>
                <el-table-column prop="succ" label="是否成功"></el-table-column>
                <el-table-column prop="excute" label="备注"></el-table-column>
              </el-table>

              <div class="demo-image__placeholder" v-show="imageShow(props.row.case_step)"> <p style="color:red">异常图片截图：</p>
                <div class="block">
<!--                  <el-image :src="'http://172.20.15.54:9000/api/'+props.row.cases[caseIndex].case_step[caseIndexLast].pic">-->
                  <el-image :src="'http://localhost:8080/api/'+tableCase[0][tableCase[0].length-1].case_step[tableCase[0][tableCase[0].length-1].case_step.length-1].pic">
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </el-image>
                </div>
              </div>

            </template>
            <!-- 详细信息内部表格结束 -->

            <!-- 图片开始
            <div class="demo-image__placeholder" id="imagediv" v-show="imagediv"> <p style="color:red">异常图片截图：</p>
                  <div class="block">             <el-image :src="'http://172.20.15.54:9000/api/'+props.row.cases[caseIndex].case_step[caseIndexLast].pic">
                  <el-image :src="'http://localhost:8080/api/'+props.row.cases[caseIndex].case_step[caseIndexLast].pic">
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>
              </div>
            </div>
            -->
            <!-- 图片结束 -->






<!--        -->
<!--          <template slot-scope="props">-->
<!--            &lt;!&ndash; 详细信息内部简介开始 &ndash;&gt;-->
<!--            <el-form label-position="left" class="demo-table-expand">-->
<!--              <el-form-item label="用例名称：">-->
<!--                <span>{{ props.row.cases[caseIndex].case_name }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="是否成功：">-->
<!--                <span>{{ props.row.cases[caseIndex].case_succ }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="测试步骤："></el-form-item>-->
<!--            </el-form>-->
<!--            &lt;!&ndash; 详细信息内部简介结束 &ndash;&gt;-->

<!--            &lt;!&ndash; 详细信息内部表格开始 &ndash;&gt;-->
<!--            <el-table :data="tableData2[caseIndex]" style="box-shadow: none" border>-->
<!--              <el-table-column type="index" :index="indexMethod" label="步骤"></el-table-column>-->
<!--              <el-table-column prop="stepName" label="名称"></el-table-column>-->
<!--              <el-table-column prop="stepDesc" label="描述"></el-table-column>-->
<!--              <el-table-column prop="succ" label="是否成功"></el-table-column>-->
<!--              <el-table-column prop="excute" label="备注"></el-table-column>-->
<!--            </el-table>-->
<!--            &lt;!&ndash; 详细信息内部表格结束 &ndash;&gt;-->

<!--            &lt;!&ndash; 图片开始 &ndash;&gt;-->
<!--            <div class="demo-image__placeholder" id="imagediv" v-show="imagediv"> <p style="color:red">异常图片截图：</p>-->
<!--              <div class="block">-->
<!--&lt;!&ndash;                <el-image :src="'http://172.20.15.54:9000/api/'+props.row.cases[caseIndex].case_step[caseIndexLast].pic">&ndash;&gt;-->
<!--                  <el-image :src="'http://localhost:8080/api/'+props.row.cases[caseIndex].case_step[caseIndexLast].pic">-->
<!--                  <div slot="placeholder" class="image-slot">-->
<!--                    加载中<span class="dot">...</span>-->
<!--                  </div>-->
<!--                </el-image>-->
<!--              </div>-->
<!--            </div>-->
<!--            &lt;!&ndash; 图片结束 &ndash;&gt;-->
<!--          </template>-->


          </el-table-column>
          <el-table-column label="详细信息" prop="case_name"></el-table-column>
<!--        </template>-->
      </el-table>
    </div>
</template>

<script>
export default {
  name: "ui_test_report",
  data() {
    return {
      imagediv:false,
      caseIndex: 0,
      caseIndexLast: 0,
      tableData: [],
      tableData2: [],
      tableCase: [],
      columnDate: "",
    }
  },
  methods: {
    imageShow(val){
      let b = false;
      for (let i = 0; i < val.length; i ++){
          if (val[i].pic != null){
            b = true
          }
      }
      return b;
    },
    // 自动生成详细信息列表的序号
    indexMethod(index) {
        return index += 1;
    },
    // 获取ui测试报告
    reqTestReport(){
      this.$axios.post(this.$api.seeUiReportApi,{
        "report_id": this.$route.query.report_id
      }).then(({data})=>{
        console.log("data是===>",data);
        if(data.status){
          //得到的json对象添加进空数组tableData
          this.tableData.push(JSON.parse(data.msg));
          this.tableCase.push(this.tableData[0].cases);
          this.columnDate = this.tableData[0].test_name
          this.tableData2.push(this.tableData[this.caseIndex].cases[this.caseIndex].case_step);
          this.caseIndexLast = this.tableData2[this.caseIndex].length - 1;
          if(this.tableCase[0][this.tableCase[0].length-1].case_step[this.tableCase[0][this.tableCase[0].length-1].case_step.length-1].pic != null){
            this.imagediv = true;
          }
        }else{
          this.$message.error('网络连接中断');
        }
      })
    }
  },
  created(){
    // data生成，调用获取报告的方法，初始化数据
    this.reqTestReport();
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


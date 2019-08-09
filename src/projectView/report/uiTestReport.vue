<template>
  <div style="position: relative">
    <div class="container-div">
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <h3 class="grid-content bg-purple text-center">UI测试报告</h3>
        </el-col>
      </el-row>
      <div v-for="(item,index) in tableData" :key="index">
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <p class="grid-content bg-purple">测试名称：{{item.test_desc}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <p class="grid-content bg-purple">测试时间：{{item.test_time}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <p class="grid-content bg-purple">测试设备：{{item.test_device}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <p class="grid-content bg-purple">是否成功：{{item.succ}}</p>
          </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" class="demo-table-expand">
                <el-form-item label="用例名称：">
                  <span>{{ props.row.case_name }}</span>
                </el-form-item>
                <el-form-item label="是否成功：">
                  <span>{{ props.row.case_succ }}</span>
                </el-form-item>

                <div>
                  <el-form-item label="测试步骤"></el-form-item>
                  <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="date" label="步骤"></el-table-column>
                    <el-table-column prop="name" label="描述"></el-table-column>
                    <el-table-column prop="succ" label="成功"></el-table-column>
                    <el-table-column prop="address" label="备注"></el-table-column>
                  </el-table>
                </div>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="详细信息" prop="test_desc"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ui_test_report",
  data() {
    return {
      tableData: [
        {
          test_desc: "12987122", //测试名称
          test_time: "2019-08-09", //测试时间
          test_device: "MI 8", //测试设备
          succ: "true",//是否成功
          case_name: "Android",
          case_succ: "true",
          id: "10333"
        }
      ]
    };
  }
};
</script>

<style scoped>
.container-div{
  width: 600px;
  min-height: 400px;
  border: 1px solid #ededed;
  /* border-right: 1px solid #ededed; */
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  /* border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04) */
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


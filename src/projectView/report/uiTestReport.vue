<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <h3 class="grid-content bg-purple text-center">UI测试报告</h3>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用例名称">
              <span>{{ props.row.test_desc }}</span>
            </el-form-item>
            <el-form-item label="是否成功">
              <span>{{ props.row.succ }}</span>
            </el-form-item>

            <div>
              <!-- 测试步骤 -->
              <el-form-item label="测试步骤"></el-form-item>
              <el-form-item></el-form-item>
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
              </el-table>
            </div>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="测试信息" prop="test_desc"></el-table-column>
      <el-table-column label="测试时间" prop="test_time"></el-table-column>
      <el-table-column label="测试设备" prop="test_device"></el-table-column>
      <el-table-column label="测试结果" prop="succ"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ui_test_report",
  data() {
    return {
      tableData: [
        {
          test_desc: "12987122", //测试信息
          test_time: "2019-08-09", //测试时间
          test_device: "MI 8", //测试设备
          succ: "true",
          category: "江浙小吃、小吃零食",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          test_desc: "12987123",
          test_time: "2019-08-09",
          test_device: "iPone 7s",
          succ: "true",
          category: "江浙小吃、小吃零食",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        }
      ]
    };
  }
};
</script>

<style scoped>
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


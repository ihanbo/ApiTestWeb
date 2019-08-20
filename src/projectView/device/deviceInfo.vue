<template>
  <div class="device_info_container_div">
    <el-table :data="deviceData"
              class="device_info_container_table"
              border
              stripe
              fit
              highlight-current-row>
      <el-table-column prop="device" label="设备ID" width="341"></el-table-column>
      <el-table-column prop="name" label="设备名称" width="341"></el-table-column>
      <el-table-column prop="state" label="设备状态">
        <template slot-scope="scope">
          <font v-if="scope.row.state === '空闲'" class="device_info_free">空闲</font>
          <font v-else class="device_info_busy">繁忙</font>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "deviceInfo",
  data() {
    return {
      platformNum: 3,
      /**
       * {
       *  device: "1",   //设备ID
       *  name: "MI 8",  //设备名称
       *  state:"繁忙" //设备状态
       * },
       * {
       *  device: "2",
       *  name: "iPhone 8s plus",
       *  state: "空闲"
       * },
       */
      deviceData: []
    };
  },
  methods: {
    //调取设备接口
    getDevices() {
      this.$axios.post(this.$api.getDevices,{
        platform: this.platformNum,
        is_free: false
      }).then(({ data }) => {
        console.log(data);
        //使用三点运算符，把三个数组拼接成新的数组
        if(data.status) this.deviceData = [...data.data.android,...data.data.ios];
        else this.$message.error('网络连接中断');
        console.log(this.deviceData)
      });
    }
  },
  created() {
    this.getDevices();
  }
};
</script>

<style>
    .device_info_container_div{
        width: 100%;
        padding-top: 30px;
    }
    .device_info_container_table{
        width: 75%;
        position: relative;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 0 auto;
        color: #444;
    }
    /* 鼠标划过当前行时的颜色 */
    .el-table--enable-row-hover .el-table__body tr:hover>td{
      background-color: #9FB6CD !important;
    }
    /* 选中的当前行的高亮颜色 */
    .el-table__body tr.current-row>td {
        background: #ffec8b !important;
    }
    /* 状态为 "繁忙" 时的字体颜色 */
    .device_info_busy{
      color: #f56c6c;
    }
    /* 状态为 "空闲" 时的字体颜色 */
    .device_info_free{
      color: #67c23a;
    }
    /* 状态为 "繁忙" 时当前行的颜色 */
    /* .el-table .device_info_warning-row {
      background: oldlace;
    } */
    /* 状态为 "空闲" 时当前行的颜色 */
    /* .el-table .device_info_success-row {
      background: #f0f9eb;
    } */
</style>
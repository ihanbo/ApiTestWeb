<template>
  <div class="uiCaseEdit">
    <el-form :inline="true" style="padding: 10px 20px -10px 10px;">
      <el-form-item :required="true" label="基础信息" labelWidth="80px" style="margin-bottom: 10px;margin-top:10px">
        <!-- 选择项目 -->
        <el-select
          v-model="form.projectName"
          placeholder="请选择项目"
          size="small"
          @change="changeProChoice"
          style="width: 120px;padding-right:5px">
          <el-option v-for="(item, key) in proModelData" :key="key" :value="key"></el-option>
        </el-select>
        <!-- 选择项目 END -->

        <!-- 选择模块 -->
        <el-select
          v-model="form.module"
          placeholder="请选择模块"
          value-key="moduleId"
          size="small"
          style="width: 120px;padding-right:5px">
          <el-option
            v-for="item in caseSortData[this.form.projectName]"
            :key="item.moduleId"
            :label="item.name"
            :value="item"></el-option>
        </el-select>
        <!-- 选择模块 END -->

        <!-- 选择平台 -->
<!--        v-model="form.platform"-->
        <el-select
          v-model="form.platformId"
          placeholder="操作平台"
          value-key="id"
          size="small"
          style="width: 120px;padding-right:5px">
          <el-option v-for="item in platformData" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <!-- 选择平台 END -->

        <!-- case名称输入框 -->
        <el-form-item prop="name" style="margin-bottom: 5px">
          <el-input v-model="caseGatherData.name" placeholder="业务测试名称" size="small"></el-input>
        </el-form-item>
        <!-- case名称输入框 END -->

        <!-- case描述输入框 -->
        <el-form-item prop="desc" style="margin-bottom: 5px">
          <el-input v-model="caseGatherData.desc" placeholder="业务测试描述" size="small"></el-input>
        </el-form-item>
        <!-- case名称输入框 END -->

        <!-- 保存按钮 -->
        <el-button
          type="primary"
          @click.native="addCaseInfo()"
          size="small"
          style="margin-left: 50px">Save</el-button>

      </el-form-item>
    </el-form>
    <hr style="height:1px;border:none;border-top:1px solid rgb(241, 215, 215);margin-top: -5px" />

    <div>
      <el-row :gutter="20">
        <!-- 左侧展示栏 -->
        <el-col :span="12">
          <el-row
            :gutter="12"
            style="margin-top:10px;color: rgb(171, 139, 149);font-weight: 500;font-size: 14px;
                                           width: 100%;border-style:solid;border-width: 1px;
                                           border-color: #ffffff #ffffff rgb(234, 234, 234) #ffffff;"
          >
            <el-col :span="4">编号</el-col>
            <el-col :span="7">用例名称</el-col>
            <el-col :span="5">描述</el-col>
            <el-col :span="5" style="padding-left: 50px;">操作</el-col>
          </el-row>
          <draggable
            v-model="caseGatherData.steps"
            :options="{group:'apiData',animation:300}"
            style="width: 99%;min-height: 10px;"
          >
            <div v-for="(_data, index) in caseGatherData.steps" :key="index" class="list-complete-item">
              <el-row :gutter="12">
                <el-col
                  :span="2"
                  style="padding-top: 3px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >{{sortNum(index)}}</el-col>
                <el-col
                  :span="8"
                  style="padding-top: 3px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >{{ _data.name }}</el-col>
                <el-col
                  :span="7"
                  style="padding-top: 3px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >{{ _data.desc }}</el-col>
                <el-col :span="3" style="padding-left: 50px;padding-top: 3px">
                  <el-button type="danger" size="mini" @click.native="delStepInCase(index)">删除</el-button>
                </el-col>
              </el-row>
            </div>
          </draggable>
        </el-col>
        <!-- 左侧展示栏 END -->
        
        <!-- 右侧选择栏（搜索） -->
        <el-col :span="12">
          <!-- 上半部分---搜索 -->
          <el-form :inline="true" style="padding-top: 10px;" size="small">
            <el-form-item label=" " labelWidth="10px">
              <!-- @change="changeModuleChoice()" -->
              <el-select
                v-model="stepsInfo.apiMesProjectName"
                style="width: 150px;padding-right:5px"
                placeholder="请选择项目">
                <el-option v-for="(item, key) in proModelData" :key="key" :value="key"></el-option>
              </el-select>

<!--              <el-select-->
<!--                v-model="stepsInfo.module"-->
<!--                value-key="moduleId"-->
<!--                style="width: 150px;padding-right:5px"-->
<!--                placeholder="请选择模块">-->
<!--                <el-option-->
<!--                  v-for="item in proModelData[this.stepsInfo.apiMesProjectName]"-->
<!--                  :key="item.moduleId"-->
<!--                  :label="item.name"-->
<!--                  :value="item"></el-option>-->
<!--              </el-select>-->
            </el-form-item>
            <el-form-item label>
              <el-input placeholder="请输入step名称" v-model="stepsInfo.apiName" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native="handleCurrentCaseGather(1)" size="mini">搜索</el-button>
              <el-button type="primary" size="mini" @click.native="addApiData()">添加</el-button>
            </el-form-item>
          </el-form>
          <hr style="height:1px;border:none;border-top:1px solid rgb(241, 215, 215);margin-top: -5px"/>
          <!-- 上半部分---搜索 END -->
          <el-table
                  ref="ApiMsgData"
                  @selection-change="handleCaseUiSetSelection"
                  :data="ApiMsgData"
                  stripe
                  max-height="745">
            <el-table-column
                    type="selection"
                    width="30">
            </el-table-column>
            <el-table-column
                    type="index"
                    label="编号"
                    width="50"><!--prop="num"删除偶序号自动更新，添加type=index zjl 20190716-->
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    prop="name"
                    label="step信息名称"
                    width="200">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    prop="desc"
                    label="step信息描述"
            >
            </el-table-column>
          </el-table>
          <!-- 搜索之后的操作区
          <el-row
            :gutter="20"
            style="margin-top:10px;
                color: rgb(171, 139, 149);
                font-weight: 500;font-size: 14px;
                padding-left: 5px;
                padding-top: 3px;">
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="3">编号</el-col>
            <el-col :span="8">用例名称</el-col>
            <el-col :span="8">用例描述</el-col>
          </el-row>
          -->
          <!-- 搜索之后的操作区 END -->
          <!-- 搜索之后的内容显示
          <draggable v-model="ApiMsgData" :options="this.draggableOptions">
            <transition-group name="list-complete">
              <div v-for="(_data, index) in ApiMsgData" :key="_data.num" class="list-complete-item">
                <el-row :gutter="24">
                  <el-col :span="1">
                    <el-radio v-model="radio" @change="addEvent(index)" :label="index">{{null}}</el-radio>
                  </el-col>
                  <el-col :span="3">{{ _data.num }}</el-col>
                  <el-col
                    :span="8"
                    style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                  >{{ _data.name }}</el-col>
                  <el-col
                    :span="8"
                    style="padding-top: 1px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                  >{{ _data.desc }}</el-col>
                </el-row>
              </div>
            </transition-group>
          </draggable>
           -->
          <!-- 搜索之后的内容显示 END -->

          <!-- 分页 -->
          <el-pagination
            @current-change="handleCurrentCaseGather"
            @size-change="handleSizeCaseGather"
            :current-page="apiMsgPage.currentPage"
            :page-size="apiMsgPage.sizePage"
            :page-sizes="[5, 10, 20, 30]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="apiMsgPage.total"
          ></el-pagination>
          <!-- 分页 END -->
        </el-col>
        <!-- 右侧选择栏（搜索） END -->
      </el-row>
    </div>

    <!-- <result ref="resultFunc"></result> -->

    <errorView ref="errorViewFunc"></errorView>
  </div>
</template>

<script>
// import result from "./result.vue";
import errorView from "../common/errorView.vue";
import draggable from "vuedraggable";

export default {
  components: {
    // editor: require("vue2-ace-editor"),
    // result: result,
    errorView: errorView,
    draggable: draggable
  },
  name: "uiCaseGatherEdit",
  props: ["proModelData", "projectName", "module", "proUrlData", "platformId","caseSortData"],
  data() {
    return {
      apiMsgVessel: [], //接口用例容器，勾选的内容都存在此变量
      ApiMsgData: [], // 接口信息里面的表格数据
      apiMsgSelect: Array(), //临时保存勾选的用例信息
      bodyShow: "second",
      paramTypes: ["string", "file"],
      radio: "",
      draggableOptions: {
        group: { name: "apiData", pull: "clone", put: false },
        sort: false
      },
      cell: Object(),
      saveRunStatus: false,
      //上传文件时，记录数组下当前数据的下标，用于把返回文件路径地址赋值
      temp_num: "",
      apiMsgPage: {
        total: 1,
        currentPage: 1,
        sizePage: 5
      },
      form: {
        projectName: null,
        module: {
          name: null,
          moduleId: null
        },
        platform: null,
        platformId:null,
        apiName: ""
      },
      stepsInfo: {
        apiMesProjectName: null,
        apiName:null,
        module: {
          name: null,
          moduleId: null
        }
      },
      platformData: [],
      caseGatherData: {
        module: {
          name: null,
          moduleId: null
        },
        id: null,
        name: null,
        num: null,
        desc: null,
        steps: []
      }
    };
  },
  methods: {
    //添加序号
    sortNum(n){
      return n+1;
    },
    //用例信息选择
    handleCaseUiSetSelection(val){
      this.apiMsgSelect = val;
    },
    //  页面数据初始化
    initBaseData() {
      this.$axios.get(this.$api.findPlatformApi)
        .then(response => {
        this.platformData = response.data["data"];
      });
    },
    //
    initApiMsgData() {
        this.caseGatherData.name = null;
        this.caseGatherData.num = null;
        this.caseGatherData.desc = null;
        this.caseGatherData.id = null;
        this.caseGatherData.steps = [];
        this.caseGatherData.module.name = null,
        this.caseGatherData.module.moduleId = null,
        this.form.projectName = this.projectName;
        this.form.module = this.module;
        this.form.platformId = this.platformId;
        this.stepsInfo.apiMesProjectName = this.projectName;
        this.findApiMsg();
    },
    // 编辑初始化
    editorInit() {
      require("brace/ext/language_tools");
      require("brace/mode/json");
      require("brace/theme/chrome");
      require("brace/snippets/json");
    },
    // 
    addEvent(dex) {
      this.apiMsgVessel = this.ApiMsgData[dex];
    },
    // 删除用例
    delStepInCase(i) {
      //判断caseList中是否存在id，存在则在数据库删除信息，否则在前端删除临时数据
      if ("id" in this.caseGatherData.steps[i]) {
        this.$confirm(
          "是否删除用例中已保存的步骤：" +
            '<strong style="color: red;">' +
            this.caseGatherData.steps[i]["name"] +
            "</strong>" +
            "?",
          "提示",
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.$axios
              .post(this.$api.delCaseInCasesetApi, {
                id: this.caseGatherData.steps[i]["id"]
              })
              .then(() => {
                this.caseGatherData.steps.splice(i, 1);
              });
          })
          .catch(() => {});
      } else {
        this.caseGatherData.steps.splice(i, 1);
      }
    },
    // 项目选择时，清空数据
    changeProChoice() {
      //  改变项目选项时，清空模块和基础url的选择
      this.form.platform = "";
      this.form.module = "";
      this.changeModuleChoice();
    },
    // 改变模块时，清空平台
    changeModuleChoice(){
      this.form.platform = "";
    },

    // 当前页变化时的事件
    handleCurrentCaseGather(val) {
      this.apiMsgPage.currentPage = val;
      this.findApiMsg();
    },
    //每页显示条数改变时会触发该事件
    handleSizeCaseGather(val) {
        this.apiMsgPage.sizePage = val;
        this.findCases();

    },
    // 查询接口
    findApiMsg() {
      this.radio = false;
      this.$axios.post(this.$api.findUIcaseApi, {
          projectName: this.stepsInfo.apiMesProjectName,
          caseStepName: this.stepsInfo.apiName,
          // platform: this.form.platform.id,
          platform: this.form.platformId,
          page: this.apiMsgPage.currentPage,
          sizePage: this.apiMsgPage.sizePage
        })
        .then(response => {
          // console.log(11111111,response)
          if (this.messageShow(this, response)) {
            this.radio = false;
            this.ApiMsgData = response.data["data"];
            this.apiMsgPage.total = response.data["total"];
          }
        });
    },
    // 添加接口
    addApiData() {
      if (this.apiMsgSelect.length === 0) {
        this.$message({
          showClose: true,
          message: "请勾选用例信息",
          type: "warning"
        });
        return;
      }
      // this.caseGatherData.steps = this.caseGatherData.steps.concat(this.apiMsgVessel);
      this.caseGatherData.steps = this.caseGatherData.steps.concat(this.apiMsgSelect);
      this.caseGatherData.steps = JSON.parse(JSON.stringify(this.caseGatherData.steps));
      this.$refs.ApiMsgData.clearSelection();
    },
    // 文件改变时的事件
    fileChange(response, file) {
      if (response["status"] === 0) {
        this.$confirm("服务器已存在相同名字文件，是否覆盖?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let form = new FormData();
            form.append("file", file.raw);
            form.append("skip", "1");
            this.$axios.post("/api/upload", form).then(response => {
              this.$message({
                showClose: true,
                message: response.data["msg"],
                type: "success"
              });
              this.caseStepData.variable[this.temp_num]["value"] =
                response.data["data"];
            });
          })
          .catch(() => {});
      } else {
        if (response["msg"]) {
          this.$message({
            showClose: true,
            message: response["msg"],
            type: "success"
          });
        }
      }
    },
    // 添加用例信息
    addCaseInfo(messageClose = false) {
      if (!this.form.projectName ) {
        this.$message({
          showClose: true,
          message: "请选择项目",
          type: "warning"
        });
        return;
      }
      if (!this.caseGatherData.name || !this.caseGatherData.name.replace(/(^\s*)|(\s*$)/g, "")) {
        this.$message({
          showClose: true,
          message: "请输入用例集名称",
          type: "warning"
        });
        return;
      }
      this.$axios
        .post(this.$api.addUIcaseSetApi, {
          moduleId: this.form.module.moduleId,
          projectName: this.form.projectName,
          caseSetId: this.caseGatherData.id,
          caseSetName: this.caseGatherData.name,
          num: this.caseGatherData.num,
          caseSetDesc: this.caseGatherData.desc,
          // platform: this.form.platform.id,
          platform: this.form.platformId,
          steps: this.caseGatherData.steps
        })
        .then(response => {
          if (messageClose) {
            return response;
          } else {
            if (this.messageShow(this, response)) {
              this.caseGatherData.id = response.data["caseId"];
              this.caseGatherData.num = response.data["num"];
              this.initApiMsgData();
              return true;
            }
          }
        });
    },
    // 编辑和复制时的事件
    editCopyApiMsg(apiMsgId, status) {
      // 
      this.$axios.post(this.$api.editUIcaseSetApi, { id: apiMsgId })
        .then(response => {
          // console.log(2222222,response);
          // console.log(44444,apiMsgId);
          this.caseGatherData.name = response.data["data"]["name"];
          this.caseGatherData.desc = response.data["data"]["desc"];
          this.caseGatherData.steps = response.data["data"]["steps"];
          this.form.platform = response.data["data"]["platform"];
          this.form.platformId = response.data["data"]["platform"]["id"]
          if (status === "edit") {
            this.caseGatherData.num = response.data["data"]["num"];
            this.caseGatherData.id = apiMsgId;
            this.form.module = response.data["data"]["module"];
          } else {
            this.caseGatherData.num = "";
            this.caseGatherData.id = "";
          }
          this.form.projectName = this.projectName;
          this.stepsInfo.apiMesProjectName = this.projectName;
          this.form.module = this.module;
          this.findApiMsg();
        });
    }
  },
  mounted() {
    this.initBaseData();
  }
};
</script>
<style>
</style>

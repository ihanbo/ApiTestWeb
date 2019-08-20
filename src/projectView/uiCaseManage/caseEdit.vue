<template>
  <div class="uiCaseEdit">
    <el-form :inline="true" style="padding: 10px 20px -10px 10px;">
      <el-form-item label="基础信息" labelWidth="80px" style="margin-bottom: 10px;margin-top:10px">
        <el-select
          v-model="form.projectName"
          placeholder="请选择项目"
          size="small"
          @change="changeProChoice"
          style="width: 120px;padding-right:5px"
        >
          <el-option v-for="(item, key) in proModelData" :key="key" :value="key"></el-option>
        </el-select>

        <el-select
          v-model="form.module"
          placeholder="请选择模块"
          value-key="moduleId"
          size="small"
          @change="changeModuleChoice"
          style="width: 120px;padding-right:5px"
        >
          <el-option
            v-for="item in proModelData[this.form.projectName]"
            :key="item.moduleId"
            :label="item.name"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
          v-model="form.platform"
          placeholder="操作平台"
          value-key="id"
          size="small"
          style="width: 120px;padding-right:5px"
        >
          <el-option v-for="item in platformData" :key="item.id" :label="item.name" :value="item"></el-option>
        </el-select>

        <el-form-item prop="name" style="margin-bottom: 5px">
          <el-input v-model="caseData.name" placeholder="case名称" size="small"></el-input>
        </el-form-item>

        <el-form-item prop="desc" style="margin-bottom: 5px">
          <el-input v-model="caseData.desc" placeholder="case描述" size="small"></el-input>
        </el-form-item>
        <el-button
          type="primary"
          @click.native="addCaseInfo()"
          size="small"
          style="margin-left: 50px"
        >Save</el-button>
      </el-form-item>
    </el-form>
    <hr style="height:1px;border:none;border-top:1px solid rgb(241, 215, 215);margin-top: -5px" />

    <div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-row
            :gutter="12"
            style="margin-top:10px;color: rgb(171, 139, 149);font-weight: 500;font-size: 14px;
                                           width: 100%;border-style:solid;border-width: 1px;
                                           border-color: #ffffff #ffffff rgb(234, 234, 234) #ffffff;"
          >
            <el-col :span="4">编号</el-col>
            <el-col :span="8">步骤名称</el-col>
            <el-col :span="5">描述</el-col>
            <el-col :span="4" style="padding-left: 50px;">操作</el-col>
          </el-row>
          <draggable
            v-model="caseData.steps"
            :options="{group:'apiData',animation:300}"
            style="width: 99%;min-height: 10px;"
          >
            <div v-for="(_data, index) in caseData.steps" :key="index" class="list-complete-item">
              <el-row :gutter="12">
                <el-col
                  :span="2"
                  style="padding-top: 3px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >{{ _data.num}}</el-col>
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

        <el-col :span="12">
          <el-form :inline="true" style="padding-top: 10px;" size="small">
            <el-form-item label=" " labelWidth="10px">
              <el-select
                v-model="stepsInfo.apiMesProjectName"
                style="width: 150px;padding-right:5px"
                placeholder="请选择项目">
                <el-option v-for="(item, key) in proModelData" :key="key" :value="key"></el-option>
              </el-select>

              <el-select
                v-model="stepsInfo.module"
                value-key="moduleId"
                style="width: 150px;padding-right:5px"
                placeholder="请选择模块">
                <el-option
                  v-for="item in proModelData[this.stepsInfo.apiMesProjectName]"
                  :key="item.moduleId"
                  :label="item.name"
                  :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label>
              <el-input placeholder="请输入用例" v-model="stepsInfo.apiName" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native="handleCurrentCase(1)" size="mini">搜索</el-button>
              <el-button type="primary" size="mini" @click.native="addApiData()">添加</el-button>
            </el-form-item>
          </el-form>
          <hr
            style="height:1px;border:none;border-top:1px solid rgb(241, 215, 215);margin-top: -5px"
          />
          <el-row
            :gutter="20"
            style="margin-top:10px;color: rgb(171, 139, 149);font-weight: 500;font-size: 14px;
                                            padding-left: 5px;padding-top: 3px;"
          >
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="3">编号</el-col>
            <el-col :span="8">用例名称</el-col>
            <el-col :span="8">用例描述</el-col>
          </el-row>
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
          <el-pagination
            @current-change="handleCurrentCase"
            @size-change="handleSizeCase"
            :current-page="apiMsgPage.currentPage"
            :page-size="apiMsgPage.sizePage"
            :page-sizes="[15, 30, 45, 60]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="apiMsgPage.total"
          ></el-pagination>
        </el-col>
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
  name: "uiCaseEdit",
  props: ["proModelData", "projectName", "module", "proUrlData"],
  data() {
    return {
      apiMsgVessel: [], //接口用例容器，勾选的内容都存在此变量
      ApiMsgData: [], // 接口信息里面的表格数据
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
        sizePage: 15
      },
      form: {
        projectName: null,
        module: {
          name: null,
          moduleId: null
        },
        platform: null,
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
      caseData: {
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
    initBaseData() {
      //  初始化页面所需要的数据
      this.$axios.get(this.$api.findPlatformApi).then(response => {
        this.platformData = response.data["data"];
      });
    },
    initApiMsgData() {
        this.caseData.name = null;
        this.caseData.num = null;
        this.caseData.desc = null;
        this.caseData.id = null;
        this.caseData.module.name = null,
        this.caseData.module.moduleId = null,
        this.caseData.steps = null,
        // this.caseData.platform=null,
        // this.caseData.xpath=null,
        // this.caseData.resourceid=null,
        // this.caseData.text=null,
        // this.caseData.action=null,
        // this.caseData.extraParam=null,
        this.form.projectName = this.projectName;
        this.form.module = this.module;
    },
    editorInit() {
      require("brace/ext/language_tools");
      require("brace/mode/json");
      require("brace/theme/chrome");
      require("brace/snippets/json");
    },
    addEvent(dex) {
      this.apiMsgVessel = this.ApiMsgData[dex];
    },
    delStepInCase(i) {
      //判断caseList中是否存在id，存在则在数据库删除信息，否则在前端删除临时数据
      if ("id" in this.caseData.steps[i]) {
        this.$confirm(
          "是否删除用例中已保存的步骤：" +
            '<strong style="color: red;">' +
            this.caseData.steps[i]["name"] +
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
              .post(this.$api.delStepInCaseApi, {
                id: this.caseData.steps[i]["id"]
              })
              .then(() => {
                this.caseData.steps.splice(i, 1);
              });
          })
          .catch(() => {});
      } else {
        this.caseData.steps.splice(i, 1);
      }
    },
    //  改变项目选项时，清空模块和基础url的选择
    changeProChoice() {
      this.form.module = "";
      this.changeModuleChoice();
    },
    // 改变模块时，清空平台
    changeModuleChoice(){
      this.form.platform = "";
    },
    handleCurrentCase(val) {
      this.apiMsgPage.currentPage = val;
      this.findApiMsg();
    },
    handleSizeCase(val) {
        this.apiMsgPage.sizePage = val;
        this.findCases();

    },
    findApiMsg() {
      this.radio = false;
      this.$axios.post(this.$api.findUIcaseStepApi, {
          projectName: this.stepsInfo.apiMesProjectName,
          moduleId: this.stepsInfo.module.moduleId,
          caseStepName: this.stepsInfo.apiName,
          platform: this.form.platform.id,
          page: this.apiMsgPage.currentPage,
          sizePage: this.apiMsgPage.sizePage
        })
        .then(response => {
          console.log(111112343411,response);
          if (this.messageShow(this, response)) {
            this.radio = false;
            this.ApiMsgData = response.data["data"];
            this.apiMsgPage.total = response.data["total"];
          }
        });
    },
    addApiData() {
      if (this.apiMsgVessel.length === 0) {
        this.$message({
          showClose: true,
          message: "请勾选接口信息",
          type: "warning"
        });
        return;
      }

      this.caseData.steps = this.caseData.steps.concat(this.apiMsgVessel);
      this.caseData.steps = JSON.parse(JSON.stringify(this.caseData.steps));
    },

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
    addCaseInfo(messageClose = false) {
      if (!this.form.projectName) {
        this.$message({
          showClose: true,
          message: "请选择项目",
          type: "warning"
        });
        return;
      }
      if (!this.form.module) {
        this.$message({
          showClose: true,
          message: "请选择业务模块",
          type: "warning"
        });
        return;
      }
      if (!this.caseData.name) {
        this.$message({
          showClose: true,
          message: "请输入名称",
          type: "warning"
        });
        return;
      }

      return this.$axios
        .post(this.$api.addUIcaseApi, {
          moduleId: this.form.module.moduleId,
          projectName: this.form.projectName,
          caseId: this.caseData.id,
          caseName: this.caseData.name,
          num: this.caseData.num,
          desc: this.caseData.desc,
          platform: this.form.platform.id,
          steps: this.caseData.steps
        })
        .then(response => {
          if (messageClose) {
            return response;
          } else {
            if (this.messageShow(this, response)) {
              this.initApiMsgData()
              return true;
            }
          }
        });
    },
    editCopyApiMsg(apiMsgId, status) {
      // 
      this.$axios
        .post(this.$api.editUIcaseApi, { id: apiMsgId })
        .then(response => {
          // console.log(2222222,response);
          // console.log(44444,apiMsgId);
          this.caseData.name = response.data["data"]["name"];
          this.caseData.desc = response.data["data"]["desc"];
          this.caseData.steps = response.data["data"]["steps"];
          this.form.platform = response.data["data"]["platform"];
          if (status === "edit") {
            this.caseData.num = response.data["data"]["num"];
            this.caseData.id = apiMsgId;
          } else {
            this.caseData.num = "";
            this.caseData.id = "";
          }
          this.form.projectName = this.projectName;
          this.form.module = this.module;
        });
    },
  },
  mounted() {
    this.initBaseData();
  }
};
</script>
<style>
</style>

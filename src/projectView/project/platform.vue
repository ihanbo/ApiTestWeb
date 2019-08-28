<template>
    <div class="platformManage">

        <el-form :inline="true" class="demo-form-inline search-style" size="small">
            <el-form-item>
                <el-button class=" platform-btn-left" type="primary" @click.native="initProjectData()">添加平台
                </el-button>
            </el-form-item>
        </el-form>
        
        <el-tabs value="first" style="padding-left: 10px">
            <el-tab-pane label="应用平台" name="first" class="table_padding">

                <el-table :data="tableData" stripe max-height="745">
                    <el-table-column
                            type="index"
                            label="序号"
                            width="80"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="操作平台"
                            width="200">
                    </el-table-column>

                    <el-table-column
                            label="操作"
                    >
                        <template slot-scope="scope">
                            
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                       @click.native="sureView(delProject,tableData[scope.$index]['id'],tableData[scope.$index]['name'])">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <el-dialog title="添加平台信息" :visible.sync="modelFormVisible" width="40%">
            <el-tabs>
                    <el-form :inline="true">
                        <el-form-item :required="true" label="操作平台名称" >
                            <el-input v-model="form.platformName"
                                      :maxlength="20"
                                      placeholder="Android/IOS">
                            </el-input>
                        </el-form-item>
                    </el-form>

            </el-tabs>

            <div slot="footer" class="dialog-footer">
                <el-button @click="modelFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" id="sure_btn"
                           @click.native="addPlatform()" size="small">确 定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: 'platformManage',
        data() {
            return {
                tableData: Array(),
                total: 1,
                currentPage: 1,
                sizePage: 20,
                formLabelWidth : '80px',
                modelFormVisible : false,
                form: {  
                    platformName:'',
                },
                
            }
        },
        methods: {
            proHandleCurrentChange(val) {
                this.currentPage = val;
                this.findPlatform()
            },
            proHandleSizeChange(val) {
                this.sizePage = val;
                this.findPlatform()
            },
            findPlatform() {
                this.$axios.get(this.$api.findPlatformApi).then((response) => {
                        this.tableData = response.data['data'];
                    }
                )
            },  
            initProjectData() {
                this.modelFormVisible = true;
            },        
            addPlatform() {
                if(!this.form.platformName || !this.form.platformName.replace(/(^\s*)|(\s*$)/g, "")){
                    this.$message({
                        showClose: true,
                        message: '操作平台名称不能为空',
                        type: 'warning',
                    });
                    return
                }
                this.$axios.post(this.$api.addPlatformApi, {
                    'platformName': this.form.platformName,
                }).then((response) => {
                        if (this.messageShow(this, response)) {
                            this.findPlatform();
                            this.modelFormVisible = false;
                        }
                    }
                )
            },
            
            delProject(id) {
                this.$axios.post(this.$api.delPlatformApi, {'id': id}).then((response) => {
                        this.messageShow(this, response);

                        // 分页数量判断，当删除了某一页的最后一条数据后，分页数量-1
                        if ((this.currentPage - 1) * this.sizePage + 1 === this.total) {
                            this.currentPage = this.currentPage - 1
                        }
                        this.findPlatform();
                    }
                )
            },
        },
        mounted() {
            this.findPlatform();
        },
    }
</script>
<style scoped>
    .platform-btn-left{
        margin-left: 15px;
    }
</style>

const baseUrl=process.env.BASE_URL

const baseDataApi = baseUrl+'proGather/list';
const getFuncAddressApi = baseUrl+'func/getAddress';

const findProApi = baseUrl+'project/find';
const addProApi = baseUrl+'project/add';
const editProApi = baseUrl+'project/edit';
const delProApi = baseUrl+'project/del';
const runProjectApi = baseUrl+'project/runProject';
const findProjectReportApi = baseUrl+'project/findProjectReport';

const findReportApi = baseUrl+'report/find';
const delReportApi = baseUrl+'report/del';
const listReportApi =baseUrl+'report/list';

const findResultSummaryApi = baseUrl+'resultSummary/find'
const findResultDetailApi = baseUrl+'resultDetail/find'
const findResultCaseSetApi = baseUrl+'resultCaseSet/find'

const findModuleApi = baseUrl+'module/find';
const addModuleApi = baseUrl+'module/add';
const runModuleApi = baseUrl+'module/run';
const editModuleApi = baseUrl+'module/edit';
const delModuleApi = baseUrl+'module/del';
const stickModuleApi = baseUrl+'module/stick';
const addModuleEnvironment = baseUrl+'module/addModuleEnvironment';

const findConfigApi = baseUrl+'config/find';
const addConfigApi = baseUrl+'config/add';
const editConfigApi = baseUrl+'config/edit';
const delConfigApi = baseUrl+'config/del';

const loginApi = baseUrl+'login';
const checkInApi = baseUrl+'checkIn';
const logoutApi = baseUrl+'logout';
const registerApi = baseUrl+'register';
const changePasswordApi = baseUrl+'changePassword';

const findApiApi = baseUrl+'apiMsg/find';
const delApiApi = baseUrl+'apiMsg/del';
const delMultiApi = baseUrl+'apiMsg/delMulti';
const runApiApi = baseUrl+'apiMsg/run';
const addApiApi = baseUrl+'apiMsg/add';
const editAndCopyApiApi = baseUrl+'apiMsg/editAndCopy';
const findApiResult = baseUrl+'apiMsg/findApiResult';

const findCaseSetApi = baseUrl+'caseSet/find';
const delCaseSetApi = baseUrl+'caseSet/del';
const addCaseSetApi = baseUrl+'caseSet/add';
const stickCaseSetApi = baseUrl+'caseSet/stick';
const addCaseSetEnvironment = baseUrl+'caseSet/addEnvironment';
const runCaseSetApi =  baseUrl+'caseSet/run';
const viewCaseSetResultApi = baseUrl+'resultCaseSet/find';

const startTaskApi = baseUrl+'task/start';
const pauseTaskApi = baseUrl+'task/pause';
const resumeTaskApi = baseUrl+'task/resume';
const removeTaskApi = baseUrl+'task/remove';
const runTaskApi = baseUrl+'task/run';
const delTaskApi = baseUrl+'task/del';
const editTaskApi = baseUrl+'task/edit';
const addTaskApi = baseUrl+'task/add';
const findTaskApi = baseUrl+'task/find';

const findCaseApi = baseUrl+'case/find';
const delCaseApi = baseUrl+'case/del';
const runCaseApi = baseUrl+'report/run';
const editCaseApi = baseUrl+'case/edit';
const addCaseApi = baseUrl+'case/add';
const configDataApi = baseUrl+'config/data';


const fileUploadingApi = baseUrl+'upload';
const checkFileApi = baseUrl+'checkFile';
const importApiApi = baseUrl+'apiMsg/fileChange';

const findFuncApi = baseUrl+'func/find';
const createFuncApi = baseUrl+'func/create';
const checkFuncApi = baseUrl+'func/check';
const saveFuncApi = baseUrl+'func/save';

const findUserApi = baseUrl+'user/find';
const editUserApi = baseUrl+'user/edit';
const delUserApi = baseUrl+'user/del';
const changeStatusUserApi = baseUrl+'user/changeStatus';

const addPlatformApi = baseUrl+'platform/add';
const delPlatformApi = baseUrl+'platform/delete';
const findPlatformApi = baseUrl+'platform/list';

const findActionsApi = baseUrl+'action/list';
const editUIcaseStepApi = baseUrl+'uicasestep/editAndCopy';
const delUIcaseStepApi = baseUrl+'uicasestep/delete';
const findUIcaseStepApi = baseUrl+'uicasestep/list';
const addUIcaseStepApi = baseUrl+'uicasestep/add';

const editUIcaseApi = baseUrl+'uicases/editAndCopy';
const delUIcaseApi = baseUrl+'uicases/delete';
const runUIcaseApi = baseUrl+'uicases/run_ui_case';
const findUIcaseApi = baseUrl+'uicases/list';
const addUIcaseApi = baseUrl+'uicases/add';
const delStepInCaseApi = baseUrl+'uicases/delStep';
const importCasesApi = baseUrl+'uicases/importCases';
const getDevices = baseUrl+'uicases/get_devices';

//UI测试相关的
const baseUIDataApi = baseUrl+'proGather/ui_list';
const findUIProApi = baseUrl+'project/find_ui';
const addUIProApi = baseUrl+'project/add_ui';
const editUIProApi = baseUrl+'project/edit_ui';
const delUIProApi = baseUrl+'project/del_ui';

const findUIModuleApi = baseUrl+'module/find_ui';
const addUIModuleApi = baseUrl+'module/add_ui';
const editUIModuleApi = baseUrl+'module/edit_ui';
const delUIModuleApi = baseUrl+'module/del_ui';
const stickUIModuleApi = baseUrl+'module/stick_ui';


const findUiReportApi = baseUrl+'report/find_ui';
const seeUiReportApi = baseUrl+'report/see_ui_report';
const delUiReportApi = baseUrl+'report/del_ui';




export default {
    baseDataApi,
    getFuncAddressApi,
    checkFileApi,

    findUserApi,
    editUserApi,
    delUserApi,
    changeStatusUserApi,

    findReportApi,
    delReportApi,
    listReportApi,

    findResultSummaryApi,
    findResultDetailApi,
    findResultCaseSetApi,

    findFuncApi,
    createFuncApi,
    checkFuncApi,
    saveFuncApi,

    startTaskApi,
    pauseTaskApi,
    resumeTaskApi,
    removeTaskApi,
    runTaskApi,
    delTaskApi,
    editTaskApi,
    addTaskApi,
    findTaskApi,

    findCaseApi,
    delCaseApi,
    runCaseApi,
    editCaseApi,
    addCaseApi,
    configDataApi,

    findCaseSetApi,
    delCaseSetApi,
    addCaseSetApi,
    addCaseSetEnvironment,
    runCaseSetApi,
    stickCaseSetApi,
    viewCaseSetResultApi,

    findProApi,
    addProApi,
    editProApi,
    delProApi,
    runProjectApi,
    findProjectReportApi,

    findModuleApi,
    addModuleApi,
    runModuleApi,
    editModuleApi,
    delModuleApi,
    stickModuleApi,
    addModuleEnvironment,

    findConfigApi,
    addConfigApi,
    editConfigApi,
    delConfigApi,

    loginApi,
    checkInApi,
    logoutApi,
    registerApi,
    changePasswordApi,

    findApiApi,
    delApiApi,
    delMultiApi,
    runApiApi,
    addApiApi,
    editAndCopyApiApi,
    findApiResult,

    fileUploadingApi,
    importApiApi,

    addPlatformApi,
    delPlatformApi,
    findPlatformApi,


    findActionsApi,
    editUIcaseStepApi,
    addUIcaseStepApi,
    findUIcaseStepApi,
    delUIcaseStepApi,


    editUIcaseApi,
    runUIcaseApi,
    addUIcaseApi,
    findUIcaseApi,
    delUIcaseApi,
    delStepInCaseApi,
    importCasesApi,
    getDevices,

    //UI测试相关的
    baseUIDataApi,
    findUIProApi,
    addUIProApi,
    editUIProApi,
    delUIProApi,

    findUIModuleApi,
    addUIModuleApi,
    editUIModuleApi,
    delUIModuleApi ,
    stickUIModuleApi ,

    findUiReportApi,
    seeUiReportApi,
    delUiReportApi,
}

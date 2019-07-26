const baseUrl=process.env.BASE_URL


const baseDataApi = baseUrl+'/api/proGather/list';
const getFuncAddressApi = baseUrl+'/api/func/getAddress';

const findProApi = baseUrl+'/api/project/find';
const addProApi = baseUrl+'/api/project/add';
const editProApi = baseUrl+'/api/project/edit';
const delProApi = baseUrl+'/api/project/del';
const runProjectApi = baseUrl+'/api/project/runProject';

const findReportApi = baseUrl+'/api/report/find';
const delReportApi = baseUrl+'/api/report/del';
const listReportApi = baseUrl+'/api/report/list';

const findResultSummaryApi = baseUrl+'/api/resultSummary/find'
const findResultDetailApi = baseUrl+'/api/resultDetail/find'

const findModuleApi = baseUrl+'/api/module/find';
const addModuleApi = baseUrl+'/api/module/add';
const editModuleApi = baseUrl+'/api/module/edit';
const delModuleApi = baseUrl+'/api/module/del';
const stickModuleApi = baseUrl+'/api/module/stick';

const findConfigApi = baseUrl+'/api/config/find';
const addConfigApi = baseUrl+'/api/config/add';
const editConfigApi = baseUrl+'/api/config/edit';
const delConfigApi = baseUrl+'/api/config/del';

const loginApi = baseUrl+'/api/login';
const checkInApi = baseUrl+'/api/checkIn';
const logoutApi = baseUrl+'/api/logout';
const registerApi = baseUrl+'/api/register';
const changePasswordApi = baseUrl+'/api/changePassword';

const findApiApi = baseUrl+'/api/apiMsg/find';
const delApiApi = baseUrl+'/api/apiMsg/del';
const delMultiApi = baseUrl+'/api/apiMsg/delMulti';
const runApiApi = baseUrl+'/api/apiMsg/run';
const addApiApi = baseUrl+'/api/apiMsg/add';
const editAndCopyApiApi = baseUrl+'/api/apiMsg/editAndCopy';

const findCaseSetApi = baseUrl+'/api/caseSet/find';
const delCaseSetApi = baseUrl+'/api/caseSet/del';
const addCaseSetApi = baseUrl+'/api/caseSet/add';
const stickCaseSetApi = baseUrl+'/api/caseSet/stick';
const addCaseSetEnvironment = baseUrl+'/api/caseSet/addEnvironment';
const runCaseSetApi =  baseUrl+'/api/caseSet/run';

const startTaskApi = baseUrl+'/api/task/start';
const pauseTaskApi = baseUrl+'/api/task/pause';
const resumeTaskApi = baseUrl+'/api/task/resume';
const removeTaskApi = baseUrl+'/api/task/remove';
const runTaskApi = baseUrl+'/api/task/run';
const delTaskApi = baseUrl+'/api/task/del';
const editTaskApi = baseUrl+'/api/task/edit';
const addTaskApi = baseUrl+'/api/task/add';
const findTaskApi = baseUrl+'/api/task/find';

const findCaseApi = baseUrl+'/api/case/find';
const delCaseApi = baseUrl+'/api/case/del';
const runCaseApi = baseUrl+'/api/report/run';
const editCaseApi = baseUrl+'/api/case/edit';
const addCaseApi = baseUrl+'/api/case/add';
const configDataApi = baseUrl+'/api/config/data';


const fileUploadingApi = baseUrl+'/api/upload';
const checkFileApi = baseUrl+'/api/checkFile';
const importApiApi = baseUrl+'/api/apiMsg/fileChange';

const findFuncApi = baseUrl+'/api/func/find';
const createFuncApi = baseUrl+'/api/func/create';
const checkFuncApi = baseUrl+'/api/func/check';
const saveFuncApi = baseUrl+'/api/func/save';

const findUserApi = baseUrl+'/api/user/find';
const editUserApi = baseUrl+'/api/user/edit';
const delUserApi = baseUrl+'/api/user/del';
const changeStatusUserApi = baseUrl+'/api/user/changeStatus';

const addPlatformApi = baseUrl+'/api/platform/add';
const delPlatformApi = baseUrl+'/api/platform/delete';
const findPlatformApi = baseUrl+'/api/platform/list';

const findActionsApi = baseUrl+'/api/action/list';
const editUIcaseStepApi = baseUrl+'/api/uicasestep/editAndCopy';
const delUIcaseStepApi = baseUrl+'/api/uicasestep/delete';
const findUIcaseStepApi = baseUrl+'/api/uicasestep/list';
const addUIcaseStepApi = baseUrl+'/api/uicasestep/add';

const editUIcaseApi = baseUrl+'/api/uicases/editAndCopy';
const delUIcaseApi = baseUrl+'/api/uicases/delete';
const runUIcaseApi = baseUrl+'/api/uicases/run_ui_case';
const findUIcaseApi = baseUrl+'/api/uicases/list';
const addUIcaseApi = baseUrl+'/api/uicases/add';
const delStepInCaseApi = baseUrl+'/api/uicases/delStep';
const importCasesApi = baseUrl+'/api/uicases/importCases';


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

    findProApi,
    addProApi,
    editProApi,
    delProApi,
    runProjectApi,

    findModuleApi,
    addModuleApi,
    editModuleApi,
    delModuleApi,
    stickModuleApi,

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
}

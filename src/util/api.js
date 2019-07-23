const baseDataApi = '/api/proGather/list';
const getFuncAddressApi = '/api/func/getAddress';

const findProApi = '/api/project/find';
const addProApi = '/api/project/add';
const editProApi = '/api/project/edit';
const delProApi = '/api/project/del';
const runProjectApi = '/api/project/runProject';

const findReportApi = '/api/report/find';
const delReportApi = '/api/report/del';

const findResultSummaryApi = '/api/resultSummary/find'
const findResultDetailApi = '/api/resultDetail/find'

const findModuleApi = '/api/module/find';
const addModuleApi = '/api/module/add';
const editModuleApi = '/api/module/edit';
const delModuleApi = '/api/module/del';
const stickModuleApi = '/api/module/stick';

const findConfigApi = '/api/config/find';
const addConfigApi = '/api/config/add';
const editConfigApi = '/api/config/edit';
const delConfigApi = '/api/config/del';

const loginApi = '/api/login';
const checkInApi = '/api/checkIn';
const logoutApi = '/api/logout';
const registerApi = '/api/register';
const changePasswordApi = '/api/changePassword';

const findApiApi = '/api/apiMsg/find';
const delApiApi = '/api/apiMsg/del';
const delMultiApi = '/api/apiMsg/delMulti';
const runApiApi = '/api/apiMsg/run';
const addApiApi = '/api/apiMsg/add';
const editAndCopyApiApi = '/api/apiMsg/editAndCopy';

const findCaseSetApi = '/api/caseSet/find';
const delCaseSetApi = '/api/caseSet/del';
const addCaseSetApi = '/api/caseSet/add';
const stickCaseSetApi = '/api/caseSet/stick';
const addCaseSetEnvironment = '/api/caseSet/addEnvironment';
const runCaseSetApi =  '/api/caseSet/run';

const startTaskApi = '/api/task/start';
const pauseTaskApi = '/api/task/pause';
const resumeTaskApi = '/api/task/resume';
const removeTaskApi = '/api/task/remove';
const runTaskApi = '/api/task/run';
const delTaskApi = '/api/task/del';
const editTaskApi = '/api/task/edit';
const addTaskApi = '/api/task/add';
const findTaskApi = '/api/task/find';

const findCaseApi = '/api/case/find';
const delCaseApi = '/api/case/del';
const runCaseApi = '/api/report/run';
const editCaseApi = '/api/case/edit';
const addCaseApi = '/api/case/add';
const configDataApi = '/api/config/data';


const fileUploadingApi = '/api/upload';
const checkFileApi = '/api/checkFile';
const importApiApi = '/api/apiMsg/fileChange';

const findFuncApi = '/api/func/find';
const createFuncApi = '/api/func/create';
const checkFuncApi = '/api/func/check';
const saveFuncApi = '/api/func/save';

const findUserApi = '/api/user/find';
const editUserApi = '/api/user/edit';
const delUserApi = '/api/user/del';
const changeStatusUserApi = '/api/user/changeStatus';

const addPlatformApi = '/api/platform/add';
const delPlatformApi = '/api/platform/delete';
const findPlatformApi = '/api/platform/list';

const findActionsApi = '/api/action/list';
const editUIcaseStepApi = '/api/uicasestep/editAndCopy';
const delUIcaseStepApi = '/api/uicasestep/delete';
const findUIcaseStepApi = '/api/uicasestep/list';
const addUIcaseStepApi = '/api/uicasestep/add';

const editUIcaseApi = '/api/uicases/editAndCopy';
const delUIcaseApi = '/api/uicases/delete';
const findUIcaseApi = '/api/uicases/list';
const addUIcaseApi = '/api/uicases/add';
const delStepInCaseApi = '/api/uicases/delStep';
const importCasesApi = '/api/uicases/importCases';


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
    addUIcaseApi,
    findUIcaseApi,
    delUIcaseApi,
    delStepInCaseApi,
    importCasesApi,
}

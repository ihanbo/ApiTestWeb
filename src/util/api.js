
const BASE_URL = process.env.BASE_URL

console.log("BASE_URL","-----------------",BASE_URL)

const baseDataApi = BASE_URL + 'proGather/list';
const getFuncAddressApi = BASE_URL + 'func/getAddress';

const findProApi = BASE_URL + 'project/find';
const addProApi = BASE_URL + 'project/add';
const editProApi = BASE_URL + 'project/edit';
const delProApi = BASE_URL + 'project/del';

const findReportApi = BASE_URL + 'report/find';
const delReportApi = BASE_URL + 'report/del';

const findModuleApi = BASE_URL + 'module/find';
const addModuleApi = BASE_URL + 'module/add';
const editModuleApi = BASE_URL + 'module/edit';
const delModuleApi = BASE_URL + 'module/del';
const stickModuleApi = BASE_URL + 'module/stick';

const findConfigApi = BASE_URL + 'config/find';
const addConfigApi = BASE_URL + 'config/add';
const editConfigApi = BASE_URL + 'config/edit';
const delConfigApi = BASE_URL + 'config/del';

const loginApi = BASE_URL + 'login';
const checkInApi = BASE_URL + 'checkIn';
const logoutApi = BASE_URL + 'logout';
const registerApi = BASE_URL + 'register';
const changePasswordApi = BASE_URL + 'changePassword';

const findApiApi = BASE_URL + 'apiMsg/find';
const delApiApi = BASE_URL + 'apiMsg/del';
const delMultiApi = BASE_URL + 'apiMsg/delMulti';
const runApiApi = BASE_URL + 'apiMsg/run';
const addApiApi = BASE_URL + 'apiMsg/add';
const editAndCopyApiApi = BASE_URL + 'apiMsg/editAndCopy';

const findCaseSetApi = BASE_URL + 'caseSet/find';
const delCaseSetApi = BASE_URL + 'caseSet/del';
const addCaseSetApi = BASE_URL + 'caseSet/add';
const stickCaseSetApi = BASE_URL + 'caseSet/stick';

const startTaskApi = BASE_URL + 'task/start';
const pauseTaskApi = BASE_URL + 'task/pause';
const resumeTaskApi = BASE_URL + 'task/resume';
const removeTaskApi = BASE_URL + 'task/remove';
const runTaskApi = BASE_URL + 'task/run';
const delTaskApi = BASE_URL + 'task/del';
const editTaskApi = BASE_URL + 'task/edit';
const addTaskApi = BASE_URL + 'task/add';
const findTaskApi = BASE_URL + 'task/find';

const findCaseApi = BASE_URL + 'case/find';
const delCaseApi = BASE_URL + 'case/del';
const runCaseApi = BASE_URL + 'report/run';
const editCaseApi = BASE_URL + 'case/edit';
const addCaseApi = BASE_URL + 'case/add';
const configDataApi = BASE_URL + 'config/data';


const fileUploadingApi = BASE_URL + 'upload';
const checkFileApi = BASE_URL + 'checkFile';
const importApiApi = BASE_URL + 'apiMsg/fileChange';

const findFuncApi = BASE_URL + 'func/find';
const createFuncApi = BASE_URL + 'func/create';
const checkFuncApi = BASE_URL + 'func/check';
const saveFuncApi = BASE_URL + 'func/save';

const findUserApi = BASE_URL + 'user/find';
const editUserApi = BASE_URL + 'user/edit';
const delUserApi = BASE_URL + 'user/del';
const changeStatusUserApi = BASE_URL + 'user/changeStatus';

const addPlatformApi = BASE_URL + 'platform/add';
const delPlatformApi = BASE_URL + 'platform/delete';
const findPlatformApi = BASE_URL + 'platform/list';

const findActionsApi = BASE_URL + 'action/list';
const editUIcaseStepApi = BASE_URL + 'uicasestep/editAndCopy';
const delUIcaseStepApi = BASE_URL + 'uicasestep/delete';
const findUIcaseStepApi = BASE_URL + 'uicasestep/list';
const addUIcaseStepApi = BASE_URL + 'uicasestep/add';

const editUIcaseApi = BASE_URL + 'uicases/editAndCopy';
const delUIcaseApi = BASE_URL + 'uicases/delete';
const findUIcaseApi = BASE_URL + 'uicases/list';
const addUIcaseApi = BASE_URL + 'uicases/add';
const delStepInCaseApi = BASE_URL + 'uicases/delStep';
const importCasesApi = BASE_URL + 'uicases/importCases';


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
    stickCaseSetApi,

    findProApi,
    addProApi,
    editProApi,
    delProApi,

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
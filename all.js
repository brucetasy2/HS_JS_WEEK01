

var chkJsReady = document.querySelector('.input-group-text').innerHTML;
console.log('檢查程式狀態:' + chkJsReady);

var jobsList = [
    { jobName: ' 6/22 前完成六角課程第一周作業', completed: true },
    {
        jobName: '6/21 去嘉義看日蝕',
        completed: false,
    },
    { jobName: '6/25 龍舟競賽', completed: false }
];
render();

// 事件綁定
// 代辦工作-新增
var addTodoObj = document.querySelector('#addTodo')
addTodoObj.addEventListener('click', () =>
    addNewJob()
)

// 代辦工作-全部刪除
var clearTaskObj = document.querySelector('#clearTask')
clearTaskObj.addEventListener('click', () =>
    clearTask()
)

function render() {
    renderStr = ""
    jobsList.forEach((job, inx) => {
        renderStr += `
        <li class="list-group-item">
            <div class="d-flex">
                <div class="form-check">
                    <input type="checkbox" 
                    class="form-check-input" ${job.completed ? 'checked' : ''} 
                            data-action="complete" data-id="${inx}">
                    <label class="form-check-label ${job.completed ? 'completed' : ''}" 
                            data-action="complete" data-id="${inx}"> ${job.jobName}</label>
                </div>

                <button type="button" class="close ml-auto" aria-label="Close">
                    <span aria-hidden="true" data-action="remove" data-id="${inx}">&times;</span>
                </button>
            </div>
        </li>`;
    });

    var todoListObj = document.querySelector('#todoList')
    todoListObj.innerHTML = renderStr;

    var taskCountObj = document.querySelector('#taskCount')
    taskCountObj.innerHTML = jobsList.length;

    // 事件綁定
    // 代辦工作-刪除
    var btns = document.querySelectorAll("button");
    for (i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function () {
            removeJob(this);
        })
    }

    // 代辦工作-CHK
    var checkboxs = document.querySelectorAll(".form-check-input");
    for (i = 0; i < checkboxs.length; i++) {
        checkboxs[i].addEventListener('change', function () {
            changeStatus(this);
        })
    }
}

function removeJob(job) {
    console.dir(job);
    // var jobParentNode = job.parentNode;
    // var labelObj = jobParentNode.querySelector(".form-check-label");
    var labelObj = job.querySelector("span");
    var dataId = labelObj.getAttribute('data-id');
    console.log(dataId);
    jobsList.splice(dataId, 1);
    render();
}

function addNewJob() {
    var newJobObj = document.querySelector('.form-control')
    if (newJobObj.value.length > 0) {
        jobsList.push({ jobName: newJobObj.value, completed: false })
        render();
        newJobObj.value = "";
    }
    else {
        alert("請輸入任務名稱");
    }
}

function changeStatus(job){
    dataID=job.getAttribute('data-id');
    jobsList[dataID].completed= job.checked ;
    render();
}

function clearTask() {
    jobsList.splice(0, jobsList.length);
    render()
};

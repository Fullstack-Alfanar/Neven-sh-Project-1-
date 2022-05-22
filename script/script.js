var arr = [], isvalid = true;
var btnSaveAdd = document.getElementById("buttonAddSave");
btnSaveAdd.addEventListener("click", function () {

    var input1 = document.getElementById("todoo-input1");
    var input2 = document.getElementById("todoo-input2");
    var input3 = document.getElementById("todoo-input3");

    if (input1.value == "" || input1.value == null) {
        isvalid = false;
        alert("please fill the Input");
    }

    if (input1.value.length < 2 || input1.value.length > 35 || (!/^[a-zA-Z]+$/.test(input1.value))) {
        isvalid = false;
        alert(" tha Task name or The descreprion task must be between 2-35 charcters ,  and Not contains numbers ");
    }
    if (input2.value == "" || input2.value == null) {
        isvalid = false;
        alert("please fill the Date Input");
    }
    if (input3.value == "" || input3.value == null) {
        isvalid = false;
        alert("please fill the Time Input");
    }

    if (isvalid) {

        let obj = {
            Tasknamee: input1.value,
            TaskDatee: input2.value,
            TaskTimee: input3.value
        };

        arr.push(obj);
        localStorage.setItem("Nevenlist", JSON.stringify(arr));
        AddTask(input1.value, input2.value, input3.value);
    }

    input1.value = "";
    input2.value = "";
    input3.value = "";

});

function AddTask(Ntask, Dtask, Ttask) {

    var mainTodo = document.getElementById("toDo");

    //create ul

    let Ul = document.createElement('ul');
    Ul.classList.add('todo-List-container');

    // to do list "div" //

    var todolistDiv = document.createElement('div');
    todolistDiv.classList.add('todo-list');

    // create li

    let LiTaskname = document.createElement('li');
    LiTaskname.textContent = Ntask;
    let LiTaskdate = document.createElement('li');
    LiTaskdate.textContent = Dtask;
    let LiTaskTime = document.createElement('li');
    LiTaskTime.textContent = Ttask;

    LiTaskname.classList.add('todo-item');
    LiTaskdate.classList.add('todo-item');
    LiTaskTime.classList.add('todo-item');


    // div button

    var Divbutton = document.createElement('div');
    Divbutton.classList.add('button');

    // complete button (ckeck)

    var completeButtonCHeck = document.createElement('button');
    completeButtonCHeck.classList.add('completed');
    completeButtonCHeck.innerHTML = '<i class = "fas fa-check"></i> ';

    // complete button (Edit) 
    var completeButtonEdit = document.createElement('button');
    completeButtonEdit.classList.add('editBtn');
    completeButtonEdit.innerHTML = "Edit";
    completeButtonEdit.onclick = function () {
        WorkEdit(LiTaskname);
    };

    // complete button (Remove)
    var completeButtonRemove = document.createElement('button');
    completeButtonRemove.classList.add('trash');
    completeButtonRemove.innerHTML = "Delete";
    // append child 

    Ul.appendChild(todolistDiv);
    todolistDiv.appendChild(LiTaskname);
    todolistDiv.appendChild(LiTaskdate);
    todolistDiv.appendChild(LiTaskTime);
    todolistDiv.appendChild(Divbutton);
    Divbutton.appendChild(completeButtonCHeck);
    Divbutton.appendChild(completeButtonEdit);
    Divbutton.appendChild(completeButtonRemove);

    // append all the elments in the main div
    mainTodo.appendChild(Ul);

    // complete buttons working 
    todolistDiv.addEventListener("click", function (e) {
        var items = e.target
        if (items.classList[0] === "completed") {
            var toodo = items.parentElement;
            var toodo2 = toodo.parentElement;
            toodo2.classList.add("line");

        }
        else if (items.classList[0] === "trash" || localStorage.setItem("Nevenlist")) {
            var toodo = items.parentElement;
            var toodo2 = toodo.parentElement;
            var toodo3 = toodo2.parentElement;
            toodo3.classList.add("removing");
            toodo3.addEventListener("transaitionend", () => {
                toodo3.remove();
            });
        }
        localStorage.removeItem("Nevenlist");
    });

}

function getTaskfromLocal() {
    if (localStorage.getItem("Nevenlist")) {
        arr = JSON.parse(localStorage.getItem("Nevenlist"));
        for (let i = 0; i < arr.length; i++) {
            AddTask(arr[i].Tasknamee, arr[i].TaskDatee, arr[i].TaskTimee);
        }
    }
    else {
        alert("Localstorage Not have any data");
    }
}


function WorkEdit(e) {
    let EditdVal = prompt('Edit your Task', e.firstChild.nodeValue);
    e.firstChild.nodeValue = EditdVal;
}

function Reset() {
    input1 = document.getElementById("todoo-input1");
    input2 = document.getElementById("todoo-input2");
    input3 = document.getElementById("todoo-input3");

    input1.value = "";
    input2.value = "";
    input3.value = "";
}


getTaskfromLocal();
// localStorage.clear();
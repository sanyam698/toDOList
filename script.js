`use strict`;

let tasks=[];
const counter=document.getElementById("tasks-counter")
const addTaskInput = document.getElementById('add');
const taskList =document.getElementById('ulTaskList')


//show Date
const timeDisplay = document.getElementById("time");
  const dateString = new Date().toLocaleString();
  const formattedString = dateString.substring(0,10);
  timeDisplay.textContent = formattedString;





//function to show any notification
showNotification=(notif)=>{
    alert(notif);}

//
const addTaskToDOM=(task)=>{
    const li=document.createElement('li');
    li.innerHTML=`
    <span><input type="checkbox" class="custom-chekout" id=${task.id} ${task.done? 'checked' : ''} >
    <label for=${task.id}> ${task.text} </label></span>
    <i class="fa  fa-trash" data-id=${task.id}></i> 
    `;

taskList.append(li);
}


//function to display list of all Tasks
const displayList=()=>{
taskList.innerHTML='';
for(let i=0;i<tasks.length;i++)
addTaskToDOM(tasks[i])
counter.innerHTML=tasks.length;


}

toggleTask=(taskId)=>{
    let newlist=tasks.filter((task)=>{
        task.id!=taskId
    });

}
// function to delete task
function deleteTask(taskId){
    let newlist=tasks.filter((task)=>{
             return task.id!=taskId
    });
    tasks=newlist;
    displayList();
    showNotification("task deleted Successfully");
    return;
}

//function to mark task complete and Vice versa
toggleDone=(taskId)=>{
    
    let newlist=tasks.filter((task)=>{
        console.log("toggle")
        return task.id==taskId
});

//if taskId i sfound
if(newlist.length>0){
    currTask=newlist[0];
currTask.done=!currTask.done;
displayList();
return;
}
showNotification("task not found");
return;

}


//function to add task in Tasks array
addTask=(task)=>{
    tasks.push(task);
    console.log(tasks);
    displayList();
    return;

}


handleClickListener=(e)=>{
    console.log(e.target)

    if(e.target.className=="fa  fa-trash")
    {console.log("inside delete")
        deleteTask(e.target.dataset.id);
        return;
    }
    else if(e.target.className=="custom-chekout")
    {console.log("inside check")
        toggleDone(e.target.id);
        return;
    }

}


//function to create a task
handleKeyPress=(e)=>{
    if(e.key=="Enter"){
        var text=e.target.value;
           const task={
            text:text,
            id:Date.now().toString(),
            done:false
        }
        if(!text){
            showNotification("can not add add empty");
            return;
        }
        addTask(task);
        e.target.value="";
        return;
        }
    }



initialize=()=>{
    addTaskInput.addEventListener('keyup', handleKeyPress)
    document.addEventListener('click', handleClickListener);
}


initialize();

// let Tasks = [];


window.onload=()=>{
  createList();
}

function editTask (id) {
  const tasks = getFromLocal();
  const taskToEdit = tasks.find((task) => task.id == id);
  document.getElementById("userInput").value = taskToEdit.description;
  deleteTask(id);
  const addBtn = document.getElementById("input-btn")
  addBtn.innerHTML = "Update";
  addBtn.addEventListener("click",(event) => {
    addBtn.innerHTML = "ADD"
  
//       if(confirm("confirm changes") == true) {
//         saveInput();
//       }
//       else(saveInput(taskToEdit.description))
    }
  )
}


// This function is used to get user input and save it in an array
document.getElementById('input-btn').addEventListener('click' , (e) => {
  e.preventDefault();
  const inputValue = document.getElementById("userInput").value;
  if(inputValue.length === 0)return;
  let tasks = getFromLocal()
  if(tasks.length === 0) {

    tasks=[]
    tasks = saveDataInArray(tasks, inputValue)
    saveToLocal(tasks);
  } else{
    tasks = saveDataInArray(tasks, inputValue)
    saveToLocal(tasks);
  }
  createList();
  document.getElementById("userInput").value = "";
})




// This function is used to save input value in an array
function saveDataInArray (array , inputValue) {
  array.push({
    id : Math.floor((Date.now() + Math.random())*1000),
    description : inputValue
  });
    return array;
}


// This function is used to save data to local storage
function saveToLocal (tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
} 

// This function is used to retrieve data from local storage
// function getFromLocal () {
//   return JSON.parse(localStorage.getItem("tasks")) || [];
// }

function getFromLocal() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : []; // Ensures an empty array if tasks are not found
}




// // This function is used to create the elements dynamically
// This function executes the function getFromLocal and then uses that data to create elements
function createList() {
    const list = document.getElementById("list");
    list.innerHTML = "";
    let taskFromLocal = getFromLocal();    //get data from function getFromlocal and stores in taskFromLocal 
    // console.log(taskFromLocal);
    taskFromLocal.forEach((task) => {
      const taskDiv = createElement("div", ["task-div" , "position-relative"], null , null);
      const taskElement = createElement("p", ["form-control", "border-0", "list-item", "bg-transparent"], task.description, null);
      const editButton = createElement("button", ["btn", "btn-warning", "btn-md" , "ebtn"], "E", () => editTask(task.id));  //() => editTask(task.id
      const deleteButton = createElement("button", ["btn", "btn-danger", "btn-md" , "dbtn"], "D", () => deleteTask(task.id)); //() => deleteTask(task.id)
      // debugger
      taskDiv.appendChild(editButton);
      taskDiv.appendChild(deleteButton);
      taskDiv.appendChild(taskElement)
      list.appendChild(taskDiv);
    });
  }
  

//   // Create element function imp (rem to udpate and remove inner txt of button)
  function createElement(type, classList, innerText, func) {
    const element = document.createElement(type);
    element.classList.add(...classList);
    element.innerText = innerText;
    element.addEventListener("click", func);
    return element;
  }


// To add enter enter key as event listener
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      saveInput();
    }
  });

// // This is a function to delete task
function deleteTask (id) {
  const tasks = getFromLocal();
  const updatedTasks = tasks.filter((task) => task.id !== id);
  saveToLocal(updatedTasks);
  createList();
  // console.log(updatedTasks)
}

  ///////////////////////////////////////////////////////

  // function deleteTask () {
  //   const button = document.
  // }


  // const createItem = (todoItem) => {
  //   return `
  //   //HTML CODE

  //   `
  // }

  // function 


  // function handleOnSubmit (event) {
  //   event.preventDefault()
  //   const userInput = event.target[0]?.value
  // }


//   function AddItem (userInput) {
//     const itemDetails = {
//       // id: add logice to make unique
//       description: userInput
//     }
//   }
  
//   const saveItem = (item) => {
//     const itemsInDb = getItemsfromDB()
//     itemsInDb.push(item)
//     updateDB(itemsInDb)

//   }


// const DB_KEY_NAME = "items" // items saved on local storage will return whole string

//   const getItemsFromDB = () => {
//     return JSON.parse(localStorage.getItem(DB_KEY_NAME) || '[]')
//   }

//   const updateDB = (itemsToUpdate) => {
//     localStorage.setItem(DB_KEY_NAME, JSON.stringify(itemsToUpdate))
//     renderListItems(itemsToUpdate)
//   } 

//   const clearInputs = () => {
//     ADD_TODO_ITEM_FORM_INPUT.innerText.value = '' //.value cuz text is stored in value
//   }

// // optional parameter
//   const renderListItems =  (listItems = NULL) => {
//     LIST_ITEM_WRAPPER.innerHTML


//     if (listItems) {

//     }

//     else {
//       listItems = getItemsFromDB()
//       listItems.forEach
//     }
//   }

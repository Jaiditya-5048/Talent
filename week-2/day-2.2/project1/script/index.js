


let Tasks = [];


// This function is used to get user input and save it in an array
function saveInput() {
    const inputValue = document.getElementById("userInput").value; 
    Tasks.push({
      id : Date.now() + Math.random(),
      description : inputValue
    });
    // console.log(Tasks); 
    saveToLocal(Tasks);
    createList();
    // console.log(typeof(getFromLocal()))
    event.preventDefault();
    document.getElementById("userInput").value = "";
  }

  window.onload=()=>{
    createList()
  }

// This function is used to save data to local storage
function saveToLocal (Tasks) {
  localStorage.setItem("Tasks", JSON.stringify(Tasks))
} 

// This function is used to retrieve data from local storage
function getFromLocal () {
  return JSON.parse(localStorage.getItem("Tasks"))
}


// This is a function to delete task
function deleteTask (id) {
  const tasks = getFromLocal();
  const updatedTasks = tasks.filter((task) => task.id !== id);
  saveToLocal(updatedTasks);
  createList();
  console.log(updatedTasks)
}

// This function is used to create the elements dynamically
// This function executes the function getFromLocal and then uses that data to create elements
function createList() {
    const list = document.getElementById("list");
    list.innerHTML = "";
    let taskFromLocal = getFromLocal();    //get data from function getFromlocal and stores in taskFromLocal 
    // console.log(taskFromLocal);
    taskFromLocal.forEach((task) => {
      const taskDiv = createElement("div", ["task-div" , "position-relative"], null , null);
      const taskElement = createElement("p", ["form-control", "border-0", "list-item", "bg-transparent"], task.description, null);
      const editButton = createElement("button", ["btn", "btn-warning", "btn-md" , "ebtn"], "E", null);  //() => editTask(task.id)
      const deleteButton = createElement("button", ["btn", "btn-danger", "btn-md" , "dbtn"], "D", () => deleteTask(task.id)); //() => deleteTask(task.id)
      taskDiv.appendChild(editButton);
      taskDiv.appendChild(deleteButton);
      taskDiv.appendChild(taskElement)
      list.appendChild(taskDiv);
    });
  }


  // Create element function imp (rem to udpate and remove inner txt of button)
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

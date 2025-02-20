


const Tasks = [];

function saveInput() {
    const inputValue = document.getElementById("userInput").value;
    document.getElementById("list").innerText = `${inputValue}`;
    Tasks.push(inputValue);
    console.log(Tasks);
    createList();
    event.preventDefault();
  }


function createList() {
    const list = document.getElementById("list");
    list.innerHTML = "";
    Tasks.forEach((task) => {
      const li = document.createElement("p");
      li.classList.add("form-control" , "border-0", "list-item");
      li.innerText = task;
      li.appendChild(createButton());
      list.appendChild(li);
    });
  }

  function createButton() {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary", "btn-sm", "delete-btn");
    button.innerText = "Delete";
    // button.addEventListener("click", deleteTask);
    return button;

  }


// To add enter button as event listener
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      saveInput();
    }
  });
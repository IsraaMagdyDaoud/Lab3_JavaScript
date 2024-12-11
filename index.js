document
  .getElementById("addButton")
  .addEventListener("click", function (event) {
    let addInput = document.getElementById("newTask");
    let addText = addInput.value;

    if (!addText) return;

    let taskContainer = document.createElement("div");
    taskContainer.className = "task-container";

    let inputElement = document.createElement("input");

    inputElement.className = "task-style";
    inputElement.type = "text";
    inputElement.value = addText;
    inputElement.readOnly = true;

    taskContainer.appendChild(inputElement);

    let doneButtonElement = document.createElement("button");
    doneButtonElement.className = "btn-done-del-style";
    doneButtonElement.innerText = "Done";
    taskContainer.appendChild(doneButtonElement);

    doneButtonElement.addEventListener("click", function () {
      taskContainer.classList.toggle("done");
    });

    let deleteButtonElement = document.createElement("button");
    deleteButtonElement.className = "btn-done-del-style";
    deleteButtonElement.innerText = "Delete";
    taskContainer.appendChild(deleteButtonElement);

    deleteButtonElement.addEventListener("click", function () {
      taskContainer.remove();
    });

    let breakElement = document.createElement("br");
    taskContainer.appendChild(breakElement);

    let taskDivContainer = document.getElementById("tasks");
    taskDivContainer.appendChild(taskContainer);
  });
//////////////////////////////////////////////////////////
let taskTwo = document.createElement("h2");
taskTwo.innerText = "Task2:Fake API";
API.appendChild(taskTwo);

let maxId = 0;

function displayAllData() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/comments", true);
  request.send();
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      let data = JSON.parse(request.response);
      let tableBody = document.querySelector("#data-table tbody");
      let tableHead = document.querySelector("#data-table thead");
      if (data.length > 0) {
        tableHead.innerHTML = "";
        let headerRow = document.createElement("tr");

        for (let prop in data[0]) {
          if (data[0].hasOwnProperty(prop)) {
            let headerCell = document.createElement("th");
            headerCell.innerText = prop.charAt(0).toUpperCase() + prop.slice(1);
            headerRow.appendChild(headerCell);
          }
        }
        tableHead.appendChild(headerRow);
      }

      let tableBodyHTML = "";
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let row = document.createElement("tr");

        for (let prop in item) {
          if (item.hasOwnProperty(prop)) {
            let cell = document.createElement("td");
            cell.innerText = item[prop];
            row.appendChild(cell);
          }
        }

        tableBody.appendChild(row);
      }

      maxId = data[data.length - 1].id;
    }
  };
}

function GetDataByID() {
  let inp = document.getElementById("databyid").value;
  if (!inp) {
    displayAllData();
    return;
  }
  if (inp > maxId) {
    alert(`ID shouldn't be more than ${maxId}!`);
    return;
  }

  let request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://jsonplaceholder.typicode.com/comments/${inp}`,
    true
  );
  request.send();
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      let result = JSON.parse(request.response);
      let tableBody = document.querySelector("#data-table tbody");
      let tableHead = document.querySelector("#data-table thead");

      tableHead.innerHTML = "";
      let headerRow = document.createElement("tr");

      for (let prop in result) {
        if (result.hasOwnProperty(prop)) {
          let headerCell = document.createElement("th");
          headerCell.innerText = prop.charAt(0).toUpperCase() + prop.slice(1);
          headerRow.appendChild(headerCell);
        }
      }

      tableHead.appendChild(headerRow);

      tableBody.innerHTML = "";
      let row = document.createElement("tr");

      for (let prop in result) {
        if (result.hasOwnProperty(prop)) {
          let cell = document.createElement("td");
          cell.innerText = result[prop];
          row.appendChild(cell);
        }
      }

      tableBody.appendChild(row);
    }
  };
}

displayAllData();

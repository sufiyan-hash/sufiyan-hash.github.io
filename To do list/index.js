const addUserbtn = document.getElementById('addUser');
const usernameTextField = document.getElementById('username');
const recordsDisplay = document.getElementById('records');
const clearAll = document.querySelector(".clear-btn");
const taskBox = document.querySelector(".task-box");
const taskInput = document.querySelector(".task-input input");
let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem('users');

if (objStr != null) {
  userArray = JSON.parse(objStr);
}
DisplayInfo();

addUserbtn.onclick = () => {
  const name = usernameTextField.value;
  if (edit_id != null) {
    //edit
    userArray.splice(edit_id, 1, { 'name': name });
    edit_id = null;
  } else {
    //insert

    userArray.push({ 'name': name });
  }

  SaveInfo(userArray);
  usernameTextField.value = ' ';
  let btnText;
  addUserbtn.innerHTML = btnText;
}

function SaveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem('users', str);
  DisplayInfo();
}

function DisplayInfo() {
  let statement = ' ';
  userArray.forEach((user, i) => {
    statement += `<tr>
  <th scope="row">${i + 1}</th>
 
  <td>${user.name}</td>
  <td><label for="0">
  <input onclick="(this)" type="checkbox" id="0">
  <p class=" "></p>
</label></td>
  <td><i class="btn text-white fa fa-edit btn-info mx-3" onclick = 'EditInfo(${i})'></i>
  <i class="btn btn-danger text-white fa fa-trash" onclick = 'DeleteInfo(${i})'></i> </td>
  </tr>`;
  });
  recordsDisplay.innerHTML = statement;
}

function EditInfo(id) {
  edit_id = id;
  usernameTextField.value = userArray[id].name;
  addUserbtn.innerHTML = 'Save Changes';
}

function DeleteInfo(id) {
  userArray.splice(id, 1);
  SaveInfo(userArray);

}
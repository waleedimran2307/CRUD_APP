//variables
let name = document.getElementById("name");
let age = document.getElementById("age");
let mail = document.getElementById("mail");
let address = document.getElementById("address");
let submitbtn = document.getElementById("submitbtn");
let tabledata1 = document.getElementById("tabledata1");
let deleteallbtn = document.getElementById("deleteallbtn");

//form validation
const validateform = () => {
  if (name.value === "") {
    alert("Please enter name");
    return false;
  }

  if (age.value === "") {
    alert("Please enter age");
    return false;
  } else if (age.value <= 0) {
    alert("please enter age greater then zero");
    return false;
  }

  if (mail.value === "") {
    alert("Please enter email");
    return false;
  } else if (!mail.value.endsWith("@gmail.com")) {
    alert("Please enter valid email");
    return false;
  }

  if (address.value === "") {
    alert("Please enter address");
    return false;
  }
  return true;
};

//data show in table function
const datadisplay = () => {
  var list;
  if (localStorage.getItem("list") == null) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem("list"));
  }
  var html = "";
  list.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.age + "</td>";
    html += "<td>" + element.mail + "</td>";
    html += "<td>" + element.address + "</td>";
    html +=
      "<td>" +
      ' <button id="edit-btn" onclick="editbtn(' +
      index +
      ')">Edit</button>' +
      '<button id="delete-btn" onclick="deletebtn(' +
      index +
      ')" >Delete</button> ' +
      "</td>";
    html += "<tr>";
  });
  document.querySelector("#tabledata1 tbody").innerHTML = html;
};

//show all data on reload
document.onload = datadisplay();

//add data function
submitbtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateform() == true) {
    let data = {
      name: name.value,
      age: age.value,
      mail: mail.value,
      address: address.value,
    };

    var list;
    if (localStorage.getItem("list") === null) {
      list = [];
    } else {
      list = JSON.parse(localStorage.getItem("list"));
    }

    list.push(data);
    localStorage.setItem("list", JSON.stringify(list));
    datadisplay();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("address").value = "";
  }
});

//delete data btn functionality
const deletebtn = (index) => {
  let sure = confirm("Are you sure you want to delete this data?");
  if (sure) {
    var list;
    if (localStorage.getItem("list") === null) {
      list = [];
    } else {
      list = JSON.parse(localStorage.getItem("list"));
    }

    list.splice(index, 1);
    alert("Your data have been deleted successfully!");
    list = localStorage.setItem("list", JSON.stringify(list));
    datadisplay();
  } else {
    alert("Your data still saved in table!");
  }
};

//update btn data functionality
const editbtn = (index) => {
  document.getElementById("submitbtn").style.display = "none";
  document.getElementById("updatebtn").style.display = "block";
  document.getElementById("updatebtn").style.backgroundColor = "darkseagreen";

  var list;
  if (localStorage.getItem("list") === null) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem("list"));
  }

  document.getElementById("name").value = list[index].name;
  document.getElementById("age").value = list[index].age;
  document.getElementById("mail").value = list[index].mail;
  document.getElementById("address").value = list[index].address;

  updatebtn.addEventListener("click", (e) => {
    if (validateform() === true) {
      list[index].name = document.getElementById("name").value;
      list[index].age = document.getElementById("age").value;
      list[index].mail = document.getElementById("mail").value;
      list[index].address = document.getElementById("address").value;
      localStorage.setItem("list", JSON.stringify(list));
      datadisplay();
      alert("Your data have been updated and saved successfully!");
      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("mail").value = "";
      document.getElementById("address").value = "";
    }
    document.getElementById("submitbtn").style.display = "block";
    document.getElementById("updatebtn").style.display = "none";
  });
};

//deleteall data function
deleteallbtn.addEventListener("click", () => {
  var list;
  if (localStorage.getItem("list") === null) {
    alert("Data list were not found! ");
  } else {
    let sure = confirm("Are you sure you want to delete all data list?");
    if (sure) {
      list = localStorage.clear("list");
      alert("All data have been deleted successfully!");
    } else {
      alert("Data have been saved safely!");
    }
  }
});

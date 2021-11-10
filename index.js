var readlineSync = require("readline-sync");

var fs = require("fs");


var showMenu = function () {
    console.log("               Student Managerment                  ");
    console.log("====================================================");
    console.log(" 1. Show all student ");
    console.log(" 2.Create student and return Menu");
    console.log(" 3.Delete student");
    console.log(" 4.Edit student");
    console.log(" 5.Find student by name");
    console.log(" 6.Sort student by name ascending");
    console.log(" 7.Sort student by age ascending");
    console.log(" 8.Exit");
};

showMenu();
choise = readlineSync.question("Your choise? ")
let studentStr = "";
let studentFile = fs.readFileSync("./dataJson.txt", "utf8", (err, data) => {
    if (err) {
        console.log('err', err);
        return;
    }
})
let student = JSON.parse(studentFile);
function saveFile() {
    studentStr = JSON.stringify(student);
    fs.writeFileSync("./dataJson.txt", studentStr, "utf8");
}
let sexIndex = ["male", "female", ":(("];

function createStudent() {
    let name = readlineSync.question("name? ");
    let age = parseInt(readlineSync.question("age? "));
    let sex = readlineSync.keyInSelect(sexIndex, "sex? male/female:0/1")
    student.push({
        name: name,
        age: age,
        sex: sexIndex[sex]
    });
    saveFile();
    choise = 0;
}
function deleteStudent() {
    let deleteName = readlineSync.question("What name do you want delete ? ")
    let nameFind = student.findIndex((item) => {
        return item.name === deleteName;
    })
    student.splice(nameFind, 1)
    console.log(student);
    saveFile();
    choise = 0
}
function editStudent() {
    let nameEdit = readlineSync.question("What name do you want edit ? ");
    let indexEdit = student.findIndex((item) => {
        return item.name === nameEdit
    })
    let oldName = student[indexEdit].name;
    let age = parseInt(readlineSync.question("age? "));
    let sex = readlineSync.keyInSelect(sexIndex, "sex? male/female:0/1")
    let newStudent = {
        name: oldName,
        age: age,
        sex: sexIndex[sex]
    };
    student.splice(indexEdit, 1, newStudent)
    saveFile();
    choise = 0;
}
function findStudent() {
    let findName = readlineSync.question("What name do you want find ? ")
    let findStudent = student.find((item) => {
        return item.name === findName
    })
    console.log(findStudent);
    saveFile();
    choise = 0;
}
function sortName() {
    student.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
    console.log(student);
    saveFile();
    choise = 0;
}
function sortStudentAge() {
    student.sort((a, b) => {
        return a.age - b.age
    });
    console.log(student);
    saveFile();
    choise = 0;
}
while (true) {
    switch (parseInt(choise)) {
        case 0:
            showMenu();
            choise = readlineSync.question("Your choise? ");
            break;
        case 1:
            console.log(student);
            choise = 0;
            break;
        case 2:
            createStudent();
            break;
        case 3:
            deleteStudent();
            break;
        case 4:
            editStudent()
            break;
        case 5:
            findStudent()
            break;
        case 6:
            sortName()
            break;
        case 7:
            sortStudentAge();
            break;
        case 8:
            process.exit();
            break;
        default:
            console.log("Bạn phải chọn số trong menu");
            choise = 0
            break;
    }
}
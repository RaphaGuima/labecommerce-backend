"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
function testImports() {
    console.log("Users:");
    console.log(database_1.users);
    console.log("Products:");
    console.log(database_1.products);
    console.log("Data de criação:");
    console.log(database_1.data2);
}
//testImports()
console.log(database_1.allUsers, database_1.creatUser);

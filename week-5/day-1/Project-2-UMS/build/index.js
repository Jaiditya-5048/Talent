"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTable = loadTable;
const types_1 = require("./types");
const DOM_1 = require("./DOM");
const bootstrap_1 = __importDefault(require("bootstrap"));
// import { allDataFunc } from "./api";
const URL_MAIN = "http://localhost:3000/users/";
const handleAPI = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield callAPI(URL_MAIN, 'GET');
    console.log("response from API =>", response);
});
handleAPI();
// Function to use data from API to create table
function loadTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataInSessionStorage = sessionStorage.getItem("loggedInUser");
        const userData = dataInSessionStorage ? JSON.parse(dataInSessionStorage) : null;
        const filterData = yield roleFilter(userData);
        console.log(filterData);
        let tableBody = document.getElementById("table");
        tableBody.innerHTML = ""; // Clear skeleton loader
        // console.log(userData);
        return (0, DOM_1.createTable)(filterData);
    });
}
function roleFilter(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // const userData = await verifyUserPassword();
        const allData = yield allDataFunc();
        const userRole = (_a = userData[0]) === null || _a === void 0 ? void 0 : _a.role;
        if (userRole == types_1.Roles.SUPER_ADMIN) { //In case of Admin
            let filterData = allData.filter(allData => allData.role !== types_1.Roles.SUPER_ADMIN);
            return filterData;
        }
        else {
            if (userData[0].role == types_1.Roles.CUSTOMER) { //In case of customer
                return userData;
            }
            else {
                return allData; //In case of Super_Admin
            }
        }
    });
}
// This function is used to prefill the modal form on edit
function editUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let userData = yield getSingleUser(id);
        const Modal = new bootstrap_1.default.Modal(document.getElementById("addEmployeeModal"), {
            backdrop: 'static',
            keyboard: false // Prevent closing with Esc key
        });
        Modal.show(); // Show the modal
        document.getElementById("firstName").value = userData.name.firstName;
        document.getElementById("lastName").value = userData.name.lastName;
        document.getElementById("email").value = userData.email;
        document.getElementById("houseNumber").value = userData.address.houseNumber;
        document.getElementById("area").value = userData.address.area;
        document.getElementById("city").value = userData.address.city;
        document.getElementById("pin").value = userData.address.pin;
        document.getElementById("phone").value = userData.phone;
        document.getElementById("role").value = userData.role;
        document.getElementById("company").value = userData.company;
        document.getElementById("website").value = userData.website;
        const modalHeader = document.getElementById("modalHeader");
        modalHeader.innerText = "Edit Employee Data";
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.value = "EDIT";
        btnChange = false;
        userId = id;
    });
}

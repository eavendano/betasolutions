import {BaseEmployee, Employee} from "../model/employee.interface";
import {BaseRepository} from "./base.repository";


const path = "/employees";
const searchPath = path + "/";

export class EmployeeRepository extends BaseRepository<Employee, BaseEmployee> {
    constructor() {
        super(path, searchPath);
    }
}
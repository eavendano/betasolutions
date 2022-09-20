import {BaseRepository} from "./base.repository";
import {BaseDepartment, Department} from "../model/department.interface";


const path = "/departments";
const searchPath = path + "/";

export class DepartmentRepository extends BaseRepository<Department, BaseDepartment> {
    constructor() {
        super(path, searchPath);
    }
}
import {BaseEmployee, Employee} from "../model/employee.interface";
import {EmployeeRepository} from "../repositories/employee.repository";
import * as RoleService from "../services/role.service"
import {Role} from "../model/role.interface";

const repository = new EmployeeRepository();

export const findAll = async (): Promise<Employee[]> => repository.findAll()
    .then(roles => Object.values(roles))
    .catch(err => {
        console.error("Problem while requesting employees with error: " + err);
        throw new Error("Unable to process employee request at the moment");
    });

export const find = async (id: string): Promise<Employee> => repository.find(id).catch(err => {
    console.error("Problem while requesting single employee with error: " + err);
    throw new Error("Unable to process individual employee request at the moment.");
});

export const findByRole = async (roleID: string): Promise<Employee[]> => findAll()
    .then(employees => employees.filter(emp => emp.role === roleID))

export const create = async (employee: BaseEmployee): Promise<Employee> => RoleService.find(employee.role)
    .then(role => repository.create(<BaseEmployee>updateSalary(role, {...employee, active: true}))).catch(err => {
        console.error("Problem while creating employee with error: " + err);
        throw new Error("Unable to create employee request at the moment.");
    });

export const update = async (employee: Employee): Promise<Employee> => RoleService.find(employee.role)
    .then(role => repository.update(<Employee>updateSalary(role, employee)))
    .catch(err => {
    console.error("Problem while updating employee with error: " + err);
    throw new Error("Unable to update employee request at the moment.");
});

export const remove = async (id: string): Promise<Employee> => repository.find(id)
    .then(employee => {
        employee.active = false;
        return repository.update(employee);
    })
    .catch(err => {
        console.error("Problem while disabling employee with error: " + err);
        throw new Error("Unable to disable employee request at the moment.");
    });

const updateSalary = (role: Role, employee: BaseEmployee | Employee) =>{
    const newEmployee = {...employee};
    if (role.minSalary > employee.salary) {
        newEmployee.salary = role.minSalary;
    } else if (role.maxSalary < employee.salary) {
        newEmployee.salary = role.maxSalary;
    }
    return newEmployee;
}
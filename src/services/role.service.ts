import {BaseRole, Role} from "../model/role.interface";
import {RoleRepository} from "../repositories/role.repository";
import * as EmployeeService from "../services/employee.service"
import {Employee} from "../model/employee.interface";

const repository = new RoleRepository();

export const findAll = async (): Promise<Role[]> => repository.findAll()
    .then(roles => Object.values(roles))
    .catch(err => {
        console.error("Problem while requesting roles with error: " + err);
        throw new Error("Unable to process role request at the moment");
    });

export const find = async (id: string): Promise<Role> => repository.find(id).catch(err => {
    console.error("Problem while requesting single role with error: " + err);
    throw new Error("Unable to process individual role request at the moment.");
});

export const create = async (role: BaseRole): Promise<Role> => repository.create({
    ...role,
    active: true
}).catch(err => {
    console.error("Problem while creating role with error: " + err);
    throw new Error("Unable to create role request at the moment.");
});

export const update = async (role: Role): Promise<Role> => find(role.id)
    .then(role => repository.update(role))
    .then(_ => EmployeeService.findByRole(role.id))
    .then(employees => employees.map(emp => updateSalary(role, emp)))
    .then(employees => Promise.all(employees.map(emp => EmployeeService.update(emp))))
    .then(_ => role)
    .catch(err => {
        console.error("Problem while updating role with error: " + err);
        throw new Error("Unable to update role request at the moment.");
    });

export const remove = async (id: string): Promise<Role> => repository.find(id)
    .then(role => {
        role.active = false;
        return repository.update(role);
    })
    .catch(err => {
        console.error("Problem while disabling role with error: " + err);
        throw new Error("Unable to disable role request at the moment.");
    });

export const salary = async (id: string, limit: number = 10, direction: string = "desc"): Promise<Employee[]> => find(id)
    .then(_ => EmployeeService.findByRole(id))
    .then(employees => employees.sort((n1, n2) => {
        if (n1.salary > n2.salary) {
            return 1;
        }
        if (n1.salary < n2.salary) {
            return -1;
        }
        return 0;
    }))
    .then(employees => {
        let result = employees;
        if (direction !== "desc" && direction !== "asc") {
            employees.reverse();
        }
        else if (direction === "desc") {
            employees.reverse();
        }

        return result.slice(0, limit);
    })

const updateSalary = (role: Role, employee: Employee) => {
    const newEmployee = {...employee};
    if (role.minSalary > employee.salary) {
        newEmployee.salary = role.minSalary;
    } else if (role.maxSalary < employee.salary) {
        newEmployee.salary = role.maxSalary;
    }
    return newEmployee;
}
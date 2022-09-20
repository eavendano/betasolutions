import {BaseDepartment, Department} from "../model/department.interface";
import {DepartmentRepository} from "../repositories/department.repository";
import * as EmployeeService from "../services/employee.service"

const repository = new DepartmentRepository();

export const findAll = async (): Promise<Department[]> => repository.findAll()
    .then(departments => Object.values(departments))
    .catch(err => {
        console.error("Problem while requesting departments with error: " + err);
        throw new Error("Unable to process department request at the moment");
    });

export const find = async (id: string): Promise<Department> => repository.find(id).catch(err => {
    console.error("Problem while requesting single department with error: " + err);
    throw new Error("Unable to process individual department request at the moment.");
});

export const create = async (department: BaseDepartment): Promise<Department> => findAll()
    .then(departments => {
        if (departments.length < 5) {
            return department;
        } else {
            throw new Error("Requirement request limit reached.");
        }
    })
    .then(department => Promise.all(department.employees.map(employeeID => EmployeeService.find(employeeID))))
    .then(_ => repository.create(department))
    .catch(err => {
        console.error("Problem while creating department with error: " + err);
        throw new Error("Unable to create department request at the moment.");
    });

export const update = async (department: Department): Promise<Department> => Promise.resolve(department)
    .then(department => Promise.all(department.employees.map(employeeID => EmployeeService.find(employeeID))))
    .then(_ => repository.update(department))
    .catch(err => {
        console.error("Problem while updating department with error: " + err);
        throw new Error("Unable to update department request at the moment.");
    });

export const remove = async (id: string): Promise<void> => findAll()
    .then(departments => {
        if (departments.length > 2) {
            return find(id)
                .then(department => Promise.all(department.employees.map(emp => EmployeeService.find(emp))))
                .then(employees => {
                    const indexOfDepartment = departments.findIndex(dpt => {
                        return dpt.id === id;
                    });

                    if (indexOfDepartment !== -1) {
                        departments.splice(indexOfDepartment, 1);
                    }

                    // Round Robin
                    let counter = 0;
                    for (var emp of employees) {
                        departments[counter].employees.push(emp.id)
                        counter = getNextElement(counter, departments.length-1);
                    }
                })
        } else {
            throw new Error("Unable to proceed with department deletion. Minimum capacity reached.")
        }
    })
    .then(_ => {
        return repository.remove(id);
    })
    .catch(err => {
        console.error("Problem while disabling department with error: " + err);
        throw new Error("Unable to disable department request at the moment.");
    });


const getNextElement = (counter: number, limit: number): number => {
    if (counter < limit) {
        return counter + 1;
    } else {
        return 0;
    }
}
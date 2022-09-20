import express, {Request, Response} from "express";
import * as EmployeeService from "../services/employee.service"
import {BaseEmployee, Employee, validate, validateInsert} from "../model/employee.interface";

export const employeeRouter = express.Router();
const ERROR_MESSAGE = "It is not possible to perform operation right now. Please try again later :]"
const INVALID_MESSAGE = "Employee is not valid. Please check your input in order to proceed with your operation :]"
const INVALID_ID = "The specified ID is not compliant with our system. Please verify you're using the right value."

employeeRouter.get("/", async (req: Request, res: Response) => {
    EmployeeService.findAll().then(employees => {
        res.status(200).send(employees);
    }).catch(err => {
        console.error("Could not process findAll employees due to error: " + err.message);
        res.status(200).send([])
    });
});

employeeRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    if (id.length <= 0) {
        res.status(400).send(INVALID_ID);
        return;
    }

    EmployeeService.find(id).then(employee => {
        res.status(200).send(employee);
    }).catch(err => {
        console.error("Could not process find employee due to error: " + err.message);
        res.status(404).send(ERROR_MESSAGE);
    });
});

employeeRouter.post("/", async (req: Request, res: Response) => {
    const employee: unknown = req.body;

    if (!validateInsert(employee)) {
        res.status(400).send(INVALID_MESSAGE);
        return;
    }

    EmployeeService.create(employee as BaseEmployee).then(employee => {
        res.status(201).json(employee);
    }).catch(err => {
        console.error("Could not process create employee due to error: " + err.message);
        res.status(500).send(ERROR_MESSAGE);
    });
});

employeeRouter.put("/", async (req: Request, res: Response) => {
    const employee: unknown = req.body;

    if (!validate(employee)) {
        res.status(400).send(INVALID_MESSAGE);
        return;
    }

    EmployeeService.update(employee as Employee).then(employee => {
        res.status(200).json(employee);
    }).catch(err => {
        console.error("Could not process update employee due to error: " + err.message);
        res.status(500).send(ERROR_MESSAGE);
    });
});

employeeRouter.delete("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    if (id.length <= 0) {
        res.status(400).send(INVALID_ID);
        return;
    }

    EmployeeService.remove(id).then(_ => {
        res.status(200).send()
    }).catch(err => {
        console.error("Could not process delete employee due to error: " + err.message);
        res.status(500).send(ERROR_MESSAGE);
    });
});


import express, {Request, Response} from "express";
import * as DepartmentService from "../services/department.service"
import {BaseDepartment, Department, validate, validateInsert} from "../model/department.interface";

export const departmentsRouter = express.Router();
const ERROR_MESSAGE = "It is not possible to perform operation right now. Please try again later :]"
const INVALID_MESSAGE = "Department is not valid. Please check your input in order to proceed with your operation :]"
const INVALID_ID = "The specified ID is not compliant with our system. Please verify you're using the right value."

departmentsRouter.get("/", async (req: Request, res: Response) => {
    DepartmentService.findAll().then(departments => {
        res.status(200).send(departments);
    }).catch(err => {
        console.error("Could not process findAll departments due to error: " + err.message);
        res.status(200).send([])
    });
});

departmentsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    if (id.length <= 0) {
        res.status(400).send(INVALID_ID);
        return;
    }

    DepartmentService.find(id).then(department => {
        res.status(200).send(department);
    }).catch(err => {
        console.error("Could not process find department due to error: " + err.message);
        res.status(404).send(ERROR_MESSAGE);
    });
});

departmentsRouter.post("/", async (req: Request, res: Response) => {
    const department: unknown = req.body;

    if (!validateInsert(department)) {
        res.status(400).send(INVALID_MESSAGE);
        return;
    }

    DepartmentService.create(department as BaseDepartment).then(department => {
        res.status(201).json(department);
    }).catch(err => {
        console.error("Could not process create department due to error: " + err.message);
        res.status(500).send(ERROR_MESSAGE);
    });
});

departmentsRouter.put("/", async (req: Request, res: Response) => {
    const department: unknown = req.body;

    if (!validate(department)) {
        res.status(400).send(INVALID_MESSAGE);
        return;
    }

    DepartmentService.update(department as Department).then(department => {
        res.status(200).json(department);
    }).catch(err => {
        console.error("Could not process update department due to error: " + err.message);
        res.status(500).send(ERROR_MESSAGE);
    });
});

departmentsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    if (id.length <= 0) {
        res.status(400).send(INVALID_ID);
        return;
    }

    DepartmentService.remove(id).then(_ => {
        res.status(200).send()
    }).catch(err => {
        console.error("Could not process delete department due to error: " + err.message);
        res.status(500).send(ERROR_MESSAGE);
    });
});


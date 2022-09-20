import express, {Request, Response} from "express";
import * as RoleService from "../services/role.service"
import {BaseRole, Role, validate, validateInsert} from "../model/role.interface";

export const rolesRouter = express.Router();
const ERROR_MESSAGE = "It is not possible to perform operation right now. Please try again later :]"
const INVALID_MESSAGE = "Role is not valid. Please check your input in order to proceed with your operation :]"
const INVALID_ID = "The specified ID is not compliant with our system. Please verify you're using the right value."

rolesRouter.get("/", async (req: Request, res: Response) => {
    RoleService.findAll().then(roles => {
        res.status(200).send(roles);
    }).catch(err => {
        console.error("Could not process findAll roles due to error: " + err.message);
        res.status(200).send([])
    });
});

rolesRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    if (id.length <= 0) {
        res.status(400).send(INVALID_ID);
        return;
    }

    RoleService.find(id).then(role => {
        res.status(200).send(role);
    }).catch(err => {
        console.error("Could not process find role due to error: " + err.message);
        res.status(404).send(ERROR_MESSAGE);
    });
});

rolesRouter.post("/", async (req: Request, res: Response) => {
    const role: unknown = req.body;

    if (!validateInsert(role)) {
        res.status(400).send(INVALID_MESSAGE);
        return;
    }

    RoleService.create(role as BaseRole).then(role => {
        res.status(201).json(role);
    }).catch(err => {
        console.error("Could not process create role due to error: " + err.message);
        res.status(500).send(ERROR_MESSAGE);
    });
});

rolesRouter.put("/", async (req: Request, res: Response) => {
    const role: unknown = req.body;

    if (!validate(role)) {
        res.status(400).send(INVALID_MESSAGE);
        return;
    }

    RoleService.update(role as Role).then(role => {
        res.status(200).json(role);
    }).catch(err => {
        console.error("Could not process update role due to error: " + err.message);
        res.status(500).send(ERROR_MESSAGE);
    });
});

rolesRouter.delete("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    if (id.length <= 0) {
        res.status(400).send(INVALID_ID);
        return;
    }

    RoleService.remove(id).then(_ => {
        res.status(200).send()
    }).catch(err => {
        console.error("Could not process delete role due to error: " + err.message);
        res.status(500).send(ERROR_MESSAGE);
    });
});

rolesRouter.get("/salary/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const limit: number = Number(req.query.limit) || 10;
    const direction: string = String(req.query.direction || "desc");

    if (id.length <= 0) {
        res.status(400).send(INVALID_ID);
        return;
    }

    RoleService.salary(id, limit, direction).then(employees => {
        res.status(200).send(employees)
    }).catch(err => {
        console.error("Could not process salary report due to error: " + err.message);
        res.status(500).send(ERROR_MESSAGE);
    });
});


import {BaseRole, Role} from "../model/role.interface";
import {BaseRepository} from "./base.repository";

const path = "/roles";
const searchPath = path + "/";

export class RoleRepository extends BaseRepository<Role, BaseRole> {
    constructor() {
        super(path, searchPath);
    }
}
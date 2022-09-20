import {db} from "../config/dbconfig";

export abstract class BaseRepository<T, BaseT> {
    path: string;
    searchPath: string;

    protected constructor(public repositoryPath: string, public repositorySearchPath: string) {
        this.path = repositoryPath;
        this.searchPath = repositorySearchPath;
    }

    findAll = async (): Promise<T> => db.getObject(this.path);
    find = async (id: string): Promise<T> => db.getObject<T>(this.searchPath + id)
    create = async (base: BaseT): Promise<T> => {
        const id = new Date().valueOf() + "";
        const insertRole = {id, ...base};

        await db.push(this.searchPath + id, insertRole);
        return db.getData(this.searchPath + id);
    };

    update = async (obj: T): Promise<T> => {
        const value = obj as any;
        const id = value.id;

        await db.push(this.searchPath + id, obj);
        return db.getData(this.searchPath + id);
    }

    remove = async (id: string): Promise<void> => {
        return db.delete(this.searchPath + id);
    }

}
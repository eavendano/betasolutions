export interface BaseEmployee {
    name: string;
    active: boolean;
    salary: number;
    role: string;
}

export interface Employee extends BaseEmployee {
    id: string;
}

const validateBase = (value: any) => value !== null &&
    typeof value === 'object' &&
    typeof value.name === 'string' &&
    typeof value.active === 'boolean' &&
    typeof value.salary === 'number' &&
    typeof value.role === 'string' &&
    value.name.length > 0 &&
    value.salary >= 0 &&
    value.role.length > 0;

export const validateInsert = (value: any) => validateBase(value) &&
    typeof value.id === 'undefined';

export const validate = (value: any) => validateBase(value) &&
    typeof value.id === 'string' &&
    value.id.length > 0;
export interface BaseDepartment {
    name: string;
    employees: string[];
}

export interface Department extends BaseDepartment {
    id: string;
}

const validateBase = (value: any) => value !== null &&
    typeof value === 'object' &&
    typeof value.name === 'string' &&
    Array.isArray(value.employees) &&
    value.name.length > 0;

export const validateInsert = (value: any) => validateBase(value) &&
    typeof value.id === 'undefined';

export const validate = (value: any) => validateBase(value) &&
    typeof value.id === 'string' &&
    value.id.length > 0;

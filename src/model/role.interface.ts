export interface BaseRole {
    name: string;
    minSalary: number;
    maxSalary: number;
    active: boolean;
}

export interface Role extends BaseRole {
    id: string;
}

const validateBase = (value: any) => value !== null &&
    typeof value === 'object' &&
    typeof value.name === 'string' &&
    typeof value.minSalary === 'number' &&
    typeof value.maxSalary === 'number' &&
    typeof value.active === 'boolean' &&
    value.name.length > 0 &&
    value.minSalary >= 0 &&
    value.maxSalary >= 0 &&
    value.minSalary <= value.maxSalary;

export const validateInsert = (value: any) => validateBase(value) &&
    typeof value.id === 'undefined';

export const validate = (value: any) => validateBase(value) &&
    typeof value.id === 'string' &&
    value.id.length > 0;

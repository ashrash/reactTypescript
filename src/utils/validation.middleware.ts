/* eslint-disable @typescript-eslint/no-explicit-any */
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

const validateClass = (type: any, value)  => {
  return validate(plainToClass(type, value)).then((errors: ValidationError[])=>{
    const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
    return message;
  });
};

export default validateClass;

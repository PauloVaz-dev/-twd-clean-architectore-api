import * as z from 'zod';
import { left, right, Either } from '../shared/Either';
import { InvalidNameError } from './errors/InvalidNameError';
import { InvalidEmailError } from './errors/InvalidEmailError';
export class Name{

  constructor(private readonly name: string){

  }
  public static create(name: string): Either<InvalidNameError | InvalidEmailError, Name>{
    if(!Name.validate(name)) return left(new InvalidEmailError(name))
    return right(new Name(name))
  }
  
  public static validate(email: string): boolean{
    const EmailSchema = z.string().min(5).max(256);  
    const isValide = EmailSchema.safeParse(email);
    return isValide.success
  }
}
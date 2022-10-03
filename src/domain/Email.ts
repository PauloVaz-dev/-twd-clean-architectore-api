import * as z from 'zod';
import { left, right, Either } from '../shared/Either';
import { InvalidNameError } from './errors/InvalidNameError';
import { InvalidEmailError } from './errors/InvalidEmailError';
export class Email{

  constructor(private readonly email: string){

  }
  public static create(email: string): Either<InvalidNameError | InvalidEmailError, Email>{
    if(!Email.validate(email)) return left(new InvalidEmailError(email))
    return right(new Email(email))
  }
  
  public static validate(email: string): boolean{
    const EmailSchema = z.string().email()  
    const isValide = EmailSchema.safeParse(email);
    return isValide.success
  }
}
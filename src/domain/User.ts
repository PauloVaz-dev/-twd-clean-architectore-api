import { Either, left, right } from "../shared/Either";
import { UserData } from "../userCases/ports/IUserRepository";
import { Email } from "./Email";
import { InvalidNameError } from "./errors/InvalidNameError";
import { InvalidEmailError } from "./errors/InvalidEmailError";
import { Name } from "./Name";

export class User {
  public  name: Name
  public  email: Email
  private constructor(name: Name, email: Email){
    this.name = name
    this.email = email
  }
  static create(user: UserData): Either<InvalidNameError | InvalidEmailError, User>{
    const isValidEmail = Email.create(user.email)
    if(isValidEmail.isLeft()) return left(new InvalidEmailError(user.email))
    const isValidName = Name.create(user.name)
    if(isValidName.isLeft()) return left(new InvalidNameError(user.name))

    const name: Name = isValidName.value as Name
    const email: Email = isValidEmail.value as Email
    
    return right(new User(name, email)) 
    
  }
}
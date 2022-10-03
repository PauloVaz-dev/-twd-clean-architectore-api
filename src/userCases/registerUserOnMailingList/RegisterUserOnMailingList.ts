import { InvalidEmailError, InvalidNameError } from "../../domain/errors";
import { User } from "../../domain/User";
import { Either, left, right } from "../../shared/Either";
import { IUserRepository, UserData } from "../ports/IUserRepository";

export class RegisterUserOnMailingList {
  constructor(private readonly userRepository: IUserRepository){}

  async handle(request: UserData): Promise<Either<InvalidNameError | InvalidEmailError, UserData>>{
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> 
    = User.create(request)
    if(userOrError.isLeft()){
      return left(userOrError.value)
    }

    const isUserExist = await this.userRepository.exists(request.email)
    isUserExist && this.userRepository.add(request)

    return right(request)
  }
}
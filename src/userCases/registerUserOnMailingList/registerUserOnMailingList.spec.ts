import { InvalidEmailError } from "../../domain/errors";
import { User } from "../../domain/User";
import { UserRepositoryInMemory } from "../../external/repositories/UserRepositoryInMemory";
import { left } from "../../shared/Either";
import { IUserRepository } from "../ports/IUserRepository";
import { RegisterUserOnMailingList } from "./RegisterUserOnMailingList";

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    interface UserData  {
      name: string;
      email: string
    }

    const users: UserData[] = [] 
    const repo: IUserRepository = new UserRepositoryInMemory(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    const user = User.create({ name, email }).value as User
    const response = await usecase.handle({ name, email})
    expect(response.value.name).toBe('any_name') 
  })

  test('should add user with complete data to mailing list', async () => {
    interface UserData  {
      name: string;
      email: string
    }

    const users: UserData[] = [] 
    const repo: IUserRepository = new UserRepositoryInMemory(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'anyemail.com'
    const user = User.create({ name, email }).value as User
    const response = await usecase.handle({ name, email})
    console.log(response)
    expect(response).toEqual(left(new InvalidEmailError(email))) 
  })
})
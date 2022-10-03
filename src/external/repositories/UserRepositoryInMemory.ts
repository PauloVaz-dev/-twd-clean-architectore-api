import { IUserRepository, UserData } from "../../userCases/ports/IUserRepository";

export class UserRepositoryInMemory implements IUserRepository {
  constructor(private readonly users: UserData[]){}
  
  async add(user: UserData): Promise<void> {
    const isExists = await this.exists(user.email)
    if(isExists) throw new Error('User exists')
    this.users.push(user)
  }


  async findByEmail(email: string): Promise<UserData> {
    const user = this.users.find(user => user.email === email);   
    return user || null
  }

  async findAllUsers(): Promise<UserData[]> {
    return this.users
  }
  async exists(email: string): Promise<boolean> {
    const user = this.users.find(user => user.email === email);   
    return user? true: false 
  }


}
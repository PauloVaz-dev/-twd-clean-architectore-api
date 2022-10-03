export interface UserData {
  name: string,
  email: string
}

export interface IUserRepository {
  add(user: UserData): Promise<void>
  findByEmail(email: string): Promise<UserData>
  findAllUsers(): Promise<UserData[]>
  exists(email: string): Promise<boolean>
}
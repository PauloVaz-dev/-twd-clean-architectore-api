import { UserRepositoryInMemory } from "./UserRepositoryInMemory"
import { UserData } from '../../userCases/ports/IUserRepository'

describe('', ()=> {
  test('Should return null if user is not found', async ()=> {
    const users: UserData[] = []
    const useRepo = new UserRepositoryInMemory(users)
    const isExistUser = await useRepo.findByEmail('any@gmail.com')
    expect(isExistUser).toBeFalsy()
  })

  test('Should be able return user', async ()=> {
    const users: UserData[] = [{ name: 'vaz', email: 'paulo@gmail.com'}]
    const useRepo = new UserRepositoryInMemory(users)
    const isExistUser = await useRepo.findByEmail('paulo@gmail.com')
    expect(isExistUser).toEqual({ name: 'vaz', email: 'paulo@gmail.com'})
  })

  test('Should be able if user exists', async ()=> {
    const users: UserData[] = [{ name: 'vaz', email: 'paulo@gmail.com'}]
    const useRepo = new UserRepositoryInMemory(users)
    const isExistUser = await useRepo.exists('paulo@gmail.com')
    expect(isExistUser).toBe(true)
  })

  test('Should not be able insert user exists', async ()=> {
    const users: UserData[] = [{ name: 'vaz', email: 'paulo@gmail.com'}]
    const useRepo = new UserRepositoryInMemory(users)
    await  expect(useRepo.add({ name: 'vaz', email: 'paulo@gmail.com'})).rejects.toThrow()
  })

  test('Should be able return all users', async ()=> {
    const users: UserData[] = [{ name: 'vaz', email: 'paulo@gmail.com'}, { name: 'vaz2', email: 'paulo2@gmail.com'}]
    const useRepo = new UserRepositoryInMemory(users)
    const retornedUsers = await useRepo.findAllUsers()
    expect(retornedUsers).toEqual([{ name: 'vaz', email: 'paulo@gmail.com'}, { name: 'vaz2', email: 'paulo2@gmail.com'}])
    expect(retornedUsers).toHaveLength(2)
  })
})
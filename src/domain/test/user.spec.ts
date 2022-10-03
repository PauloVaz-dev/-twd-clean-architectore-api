import { left, right } from "../../shared/Either"
import { InvalidEmailError } from "../errors/InvalidEmailError"
import { User } from "../User"
import { Email } from "../../domain/Email"
import { InvalidNameError } from "../errors/InvalidNameError"

describe('', ()=> {
  test('shoul not be able create user with email invalid', ()=> {
    const user = User.create({ email: 'psgvazgmail.com', name: 'vaz'})
    expect(user).toEqual(left(new InvalidEmailError('psgvazgmail.com')))
  })

   test('shoul not be able create user with name invalid', ()=> {
    const user = User.create({ email: 'psgvaz@gmail.com', name: ''})
    expect(user).toEqual(left(new InvalidNameError('')))
  }) 
  test('shoul not be able create user with name above 256 caracters', ()=> {
    const user = User.create({ email: 'psgvaz@gmail.com', name: 'd'.repeat(257)})
    expect(user).toEqual(left(new InvalidNameError('d'.repeat(257))))
  }) 

  test('shoul be able create user ', ()=> {
    const user = User.create({ email: 'psgvaz@gmail.com', name: 'Paulo Vaz'}).value
    console.log(user.name, '666666666666666')
    expect(user.name).toEqual({ name: 'Paulo Vaz'})
  }) 
})
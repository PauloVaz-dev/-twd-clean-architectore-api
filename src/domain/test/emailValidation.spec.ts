import { Email } from "../Email"

describe('Validate Email', ()=> {
  test('Is Valide?', ()=> {
    const isValide = Email.validate('psgvaz@gmail.com')
    expect(isValide).toBe(true)
  })

  test('Is Invalide?', ()=> {
    const isValide = Email.validate('psgvazgmail.com')
    expect(isValide).toBe(false)
  })

  test('Is Invalide?', ()=> {
    const isValide = Email.validate('psgvaz@gmail.')
    expect(isValide).toBe(false)
  })
})
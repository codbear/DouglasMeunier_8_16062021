import { fireEvent, screen } from '@testing-library/dom';
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { localStorageMock } from '../__mocks__/localStorage';
import { ROUTES } from '../constants/routes';

const onNavigate = (pathname) => {
  document.body.innerHTML = ROUTES({ pathname })
}

beforeEach(() => {
  document.body.innerHTML = NewBillUI()
  Object.defineProperty(window, 'localStorage', { value: localStorageMock })
  window.localStorage.setItem('user', JSON.stringify({
    type: 'Employee'
  }))
})

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill page", () => {
    test("Then I should see new bill form", () => {
      expect(screen.getByTestId('form-new-bill')).toBeTruthy()
    })

    describe('When I submit new bill form', () => {
      test('Then I should be redirected to Bills page', () => {
        const newBillContainer = new NewBill({
          document, onNavigate, firestore: null, localStorage: window.localStorage
        })

        const handleClickSubmit = jest.fn(newBillContainer.handleSubmit)
        const newBillForm = screen.getByTestId('form-new-bill')
        newBillForm.addEventListener('submit', handleClickSubmit)
        fireEvent.submit(newBillForm)

        expect(handleClickSubmit).toHaveBeenCalled()
        expect(screen.getAllByText('Mes notes de frais')).toBeTruthy()
      })
    })

    describe('When I upload a file', () => {
      test("Then the file should be added to the form", () => {
        const snapshot = {
          ref: {
            getDownloadURL: () => 'https://url.test'
          }
        }

        class Storage {
          ref() { return this }
          put() { return new Promise((resolve) => resolve(snapshot)) }
        }

        const newBillContainer = new NewBill({
          document, onNavigate, firestore: {storage: new Storage()}, localStorage: window.localStorage
        })

        const handleChangeFile = jest.fn(newBillContainer.handleChangeFile)
        const file = new File(['test'], 'test.png', { type: 'image/png' })
        const fileInput = screen.getByTestId('file')
        fileInput.addEventListener('change', handleChangeFile)
        fireEvent.change(fileInput, {
          target: { files: [file] }
        })

        expect(handleChangeFile).toHaveBeenCalled()
        expect(fileInput.files[0].name).toBe('test.png')
      })
    })
  })
})
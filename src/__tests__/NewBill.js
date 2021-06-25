import { fireEvent, screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { localStorageMock } from '../__mocks__/localStorage';
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { ROUTES } from '../constants/routes';

const onNavigate = (pathname) => {
  document.body.innerHTML = ROUTES({ pathname })
}

const newBill = {
  'id': 'qcCK3SzECmaZAGRrHja7',
  'status': 'pending',
  'pct': 20,
  'amount': 200,
  'email': 'a@a',
  'name': 'testPOST',
  'vat': '40',
  'fileName': 'preview-facture-free-201801-pdf-1.jpg',
  'date': '2002-02-02',
  'commentAdmin': '',
  'commentary': 'test2',
  'type': 'Restaurants et bars',
  'fileUrl': 'https://firebasestorage.googleapis.com/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=4df6ed2c-12c8-42a2-b013-346c1346f732'
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
      test("Then the file should be added to the form", async (done) => {
        const snapshot = {
          ref: {
            getDownloadURL: () => 'https://url.test'
          }
        }

        class Storage {
          ref() { return this }
          async put() { return snapshot }
        }

        const newBillContainer = new NewBill({
          document, onNavigate, firestore: {storage: new Storage()}, localStorage: window.localStorage
        })

        const file = new File(['file'], 'file.png', { type: 'image/png' })

        const handleChangeFile = jest.fn(async (e) => {
          await newBillContainer.handleChangeFile(e)

          expect(newBillContainer.fileUrl).toBe(snapshot.ref.getDownloadURL())
          expect(newBillContainer.fileName).toBe(file.name)
          done()
        })

        const fileInput = screen.getByTestId('file')
        fileInput.addEventListener('change', handleChangeFile)

        userEvent.upload(fileInput, file)

        expect(handleChangeFile).toHaveBeenCalled()
        expect(fileInput.files[0].name).toBe(file.name)
      })
    })
  })
})

import { screen } from "@testing-library/dom"
import userEvent from '@testing-library/user-event';
import { localStorageMock } from '../__mocks__/localStorage';
import { bills } from "../fixtures/bills.js"
import { ROUTES } from '../constants/routes';
import BillsUI from "../views/BillsUI.js"
import Bills from '../containers/Bills';

describe("Given I am connected as an employee", () => {
  describe('When I am on Bills page but it is loading', () => {
    test('Then, Loading page should be rendered', () => {
      const html = BillsUI({ loading: true })
      document.body.innerHTML = html

      expect(screen.getAllByText('Loading...')).toBeTruthy()
    })
  })

  describe('When I am on Bills page but back-end send an error message', () => {
    test('Then, Error page should be rendered', () => {
      const html = BillsUI({ error: 'some error message' })
      document.body.innerHTML = html

      expect(screen.getAllByText('Erreur')).toBeTruthy()
    })
  })

  describe("When I am on Bills Page", () => {
    test("Then bills should be ordered from earliest to latest", () => {
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)

      expect(dates).toEqual(datesSorted)
    })
  })

  describe("When I am on Bills Page", () => {
    describe("When I click on the icon eye of a bill", () => {
      test("Then a modal should open", () => {
        Object.defineProperty(window, 'localStorage', { value: localStorageMock })
        window.localStorage.setItem('user', JSON.stringify({
          type: 'Employee'
        }))
        const html = BillsUI({ data: [bills[0]] })
        document.body.innerHTML = html
        const onNavigate = (pathname) => {
          document.body.innerHTML = ROUTES({ pathname })
        }
        const billsContainer = new Bills({
          document, onNavigate, firestore: null, localStorage: window.localStorage
        })

        const handleClickIconEye = jest.fn(billsContainer.handleClickIconEye)
        const eye = screen.getByTestId('icon-eye')
        eye.addEventListener('click', handleClickIconEye(eye))
        userEvent.click(eye)

        expect(handleClickIconEye).toHaveBeenCalled()
        expect(document.body.classList.contains('modal-open')).toBeTruthy()
      })
    })

    describe("When I click on the New bill button", () => {
      test("Then I should be redirected to new bill form", () => {
        Object.defineProperty(window, 'localStorage', { value: localStorageMock })
        window.localStorage.setItem('user', JSON.stringify({
          type: 'Employee'
        }))
        const html = BillsUI({ data: [] })
        document.body.innerHTML = html
        const onNavigate = (pathname) => {
          document.body.innerHTML = ROUTES({ pathname })
        }
        const billsContainer = new Bills({
          document, onNavigate, firestore: null, localStorage: window.localStorage
        })

        const handleClickNewBill = jest.fn(billsContainer.handleClickNewBill)
        const newBillButton = screen.getByTestId('btn-new-bill')
        newBillButton.addEventListener('click', handleClickNewBill)
        userEvent.click(newBillButton)

        expect(handleClickNewBill).toHaveBeenCalled()
        expect(screen.getByText('Envoyer une note de frais')).toBeTruthy()
      })
    })
  })
})

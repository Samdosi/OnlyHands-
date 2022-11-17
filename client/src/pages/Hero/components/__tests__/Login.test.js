import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event"
import Login from '../Login';

// Mock component to wrap Login in BrowserRouter
const MockLogin = () => {
    return (
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    )
}

beforeEach(() => {
    render(<MockLogin />);
})

describe('Login', () => {
    test('username field renders', () => {
        const usernameInput = screen.getByLabelText('Username')
        expect(usernameInput).toBeTruthy();
    })

    test('password field renders', () => {
        const passwordInput = screen.getByLabelText('Password');
        expect(passwordInput).toBeTruthy();
    })

    test('login button renders', () => {
        const loginButton = screen.getByTestId('login-btn');
        expect(loginButton).toBeTruthy();
    })

    test('username field correctly updates', () => {
        const usernameInput = screen.getByLabelText('Username')
        expect(usernameInput.value).toMatch('');
        fireEvent.change(usernameInput, {target: {value: 'james'}})
        expect(usernameInput.value).toMatch('james');

        const passwordInput = screen.getByLabelText('Password');
        expect(passwordInput.value).toMatch('');
    })

    test("username error doesn't appear before typing", () => {
        // const usernameError = screen.queryByTestId('Username')
        const usernameError = screen.queryByText(/Please enter a valid username./i);
        expect(usernameError).not.toBeTruthy();
    })
    
    test("username error message appears after a bad username (empty)", () => {
        // Please enter a valid username.
    })
    
    // tests below are to be finished
    test('correctly login user', async () => {
        // const onSubmit = jest.fn();
        // const username = screen.getByLabelText('Username');
        // const password = screen.getByLabelText('Password');
        // userEvent.type(username, "james");
        // userEvent.type(password, "pmjames2022");

        // userEvent.click(screen.getByTestId('login-btn'));

        // await waitFor(() => {
        //     expect(onSubmit).toBeCalledTimes(1);
        // })
        const valid_user = "james";
        const valid_password = "pmjames2022";

    })

    it('rejects unregistered username', () => {})

})
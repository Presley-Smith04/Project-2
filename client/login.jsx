const helper = require('./helper.js');
const React = require('react');
const { createRoot } = require('react-dom/client');


//handle login
const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    //username and pass
    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;


    //not filled
    if (!username || !pass) {
        helper.handleError('Username or password is empty');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass });
    return false;
};


//signup
const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();


    //username/pass
    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;


    //all fiels required
    if (!username || !pass || !pass2) {
        helper.handleError('All fields are required');
        return false;
    }


    //passwords need to match
    if (pass !== pass2) {
        helper.handleError('Passwords do not match');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass, pass2 });
    return false;
}


//login
const LoginWindow = (props) => {
    //form for loggin in
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input className="formSubmit" type="submit" value="Sign In" />
        </form>
    );
};


//signup
const SignupWindow = (props) => {
    //signup form
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input className="formSubmit" type="submit" value="Sign Up" />
        </form>
    );
}



const init = () => {
    //setup buttons and listeners
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    const root = createRoot(document.getElementById('content'));

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<LoginWindow />);
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<SignupWindow />);
        return false;
    });

    root.render(<LoginWindow />);
};



window.onload = init;

const models = require('../models');
const Account = models.Account;


//login
const loginPage = (req, res) => {
    return res.render('login');
};

// const signupPage = (req, res) => {
//     return res.render('signup');
// }


//logout function
const logout = (req, res) => {
    req.session.destroy();
    return res.redirect('/');
};


//login
const login = (req, res) => {
    const username = `${req.body.username}`;
    const pass = `${req.body.pass}`;

    if (!username || !pass) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    return Account.authenticate(username, pass, (err, account) => {
        if (err || !account) {
            return res.status(401).json({ error: 'Wrong username or password' });
        }

        req.session.account = Account.toAPI(account);

        return res.json({ redirect: '/maker' });
    });

}


//signup
const signup = async (req, res) => {
    //name/pass
    const username = `${req.body.username}`;
    const pass = `${req.body.pass}`;
    const pass2 = `${req.body.pass2}`;


    //all fields required
    if (!username || !pass || !pass2) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    //pass have to match
    if (pass !== pass2) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        //hash password
        const hash = await Account.generateHash(pass);
        const newAccount = new Account({
            username,
            password: hash,
        });
        await newAccount.save();
        req.session.account = Account.toAPI(newAccount);
        return res.json({ redirect: '/maker' });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Username already in use' });
        }
        return res.status(500).json({ error: 'An error occurred' });
    }
};


//is premium on?
const togglePremium = async (req, res) => {
    try {
        const account = await Account.findById(req.session.account._id);
        account.premium = !account.premium;
        await account.save();
        return res.status(200).json({ premium: account.premium });
    } catch (err) {
        console.error('Error toggling premium:', err);
        return res.status(500).json({ error: 'Failed to toggle premium status' });
    }
};



module.exports = {
    loginPage,
    //signupPage,
    logout,
    login,
    signup,
    togglePremium,
}

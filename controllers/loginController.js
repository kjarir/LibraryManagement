import UserModel from '../models/userModel.js';

const loginController = async (req, res) => {
    if (req.method === 'GET') {
        return res.render('login');
    }

    if (req.method === 'POST') {
        const { number, password } = req.body;
        console.log('Login request:', { number, password });

        try {
            // Find the user by phone number
            const user = await UserModel.findOne({ number });
            console.log('User found:', user);

            if (!user) {
                // If no user is found with the given number
                return res.status(401).send('Invalid phone number or password');
            }

            // Directly compare plain-text passwords
            if (password === user.password) {
                // If credentials are correct, set session and redirect
                req.session.userId = user.userId; // Store userId in the session
                req.session.role = user.role; // Store the role in the session
                return res.status(200).redirect('/home'); // Redirect to home
            } else {
                // If the password is incorrect
                return res.status(401).send('Invalid phone number or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
};

export { loginController };

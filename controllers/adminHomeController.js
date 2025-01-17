const adminHomeController = async (req, res) => {
    if (req.method === 'GET') {
        return res.render('adminHome');
    }
}

export { adminHomeController };
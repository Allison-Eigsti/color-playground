const errorHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json({ msg: err.message });
    }
    else if (err.code === 'ENOENT') {
        res.status(500).json({ msg: 'Data file not found.' });
    }
    else {
        console.error(err.message)
        res.status(500).json({ msg: 'Internal server error.' });
    }
}

export default errorHandler;
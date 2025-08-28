import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function PageNotFound({ message }) {
    return (
        <div>
            <div>
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>{message || "Halaman yang anda cari tidak ada."}</p>
                <Link to="/">Kembali ke Beranda</Link>
            </div>
        </div>
    );
}

PageNotFound.propTypes = {
    message: PropTypes.string,
};

export default PageNotFound;
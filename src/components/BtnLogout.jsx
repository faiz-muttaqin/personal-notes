import React from 'react';
import PropTypes from 'prop-types';
import { FiLogOut } from 'react-icons/fi';

function BtnLogout({ onLogout }) {
    return (
        <button
            className="btn btn-outline-danger btn-sm"
            onClick={onLogout}
            title="Logout"
            type="button"
        >
            <FiLogOut className="" />
        </button>
    );
}

BtnLogout.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default BtnLogout;
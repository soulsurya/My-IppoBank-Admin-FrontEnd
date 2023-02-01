import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import OtpPage from '../../components/OtpPage'
import { makePostAPICAll } from '../../services/api';
import { API, CookiesKey, WebsitePageLinks } from '../../services/constants';
import { setCookie } from '../../utils/Cookies';
import css from './SignIn.module.css'

const SignIn = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const handleVerifyOtpClick = (payload) => {
        makePostAPICAll(API.otpVerificationForSignin, payload)
            .then(res => {
                if(res.success) {
                    setCookie(CookiesKey.ippoPay, res.data.token);
                    navigate(WebsitePageLinks.dashboard);
                } else {
                    setErrorMessage("Invalid Phone number or OTP");
                }
            })
            .catch (err => console.error(err));
    }

return (
    <div className={css.signInContainer}>
        <OtpPage onVerifyOtpClick={handleVerifyOtpClick} errorMessage={errorMessage} />
    </div>
)
}

export default SignIn
import React, { useEffect, useState } from "react";
import css from "./OtpPage.module.css";
import logo from "../../assets/logo.png";
import phoneImage from "../../assets/phoneImage.png";
import InputText from "../../components/InputText";
import Button from "../Button";
import { Outlet, Link, BrowserRouter as Router } from "react-router-dom";

import { Validation } from "../../services/constants";

const OtpPage = (props) => {
  const { titleText = "Login an account", onVerifyOtpClick, submitButtonText = 'Submit OTP', errorMessage } = props
  const [userDetails, setUserDetails] = useState({});
  const [validationResult, setValidationResult] = useState({});
  const [isVerifyOtpMode, setIsVerifyOtpMode] = useState(false);
  const [shouldApplyValidation, setShouldApplyValidation] = useState(false);

  useEffect(()=>{
    if(shouldApplyValidation && isValidForm()) {
      getOtp();
    }
  },[shouldApplyValidation])

  const handleInputChange = (event) => {
    console.log(event.target.name, event.target.value);
    userDetails[event.target.name] = event.target.value;
    setUserDetails({ ...userDetails });
  };

  const handleIsValid = (isValid, property) => {
    validationResult[property.toString()] = isValid;
    setValidationResult(validationResult);
  };

  const handleSubmitOtp = () => {
    setShouldApplyValidation(true);
    if (isValidForm()) {
      onVerifyOtpClick(userDetails);
    }

  }

  const handleGenerateOtp = () => {
    setShouldApplyValidation(true);
    if(shouldApplyValidation) {
      getOtp();
    }
  };

  const isValidForm = () => {
    let errorMessage = "";
    for (let key in validationResult) {
      if (!validationResult[key]) {
        errorMessage = "Enter valid " + key;
        break;
      }
    }
    return !Boolean(errorMessage);
  };

  const getOtp = () =>{
    console.log("get otp");
    console.log({ userDetails });
    setShouldApplyValidation(false)
    setIsVerifyOtpMode(true)
  }

  return (
    <div className={css.container}>
      <div className={`${css.imageContainer} is-hidden-mobile`}>
        <Link to="/" className={css.logo}>
          <img src={logo} />
        </Link>
        <div className={css.phoneImage}>
          <img src={phoneImage} />
        </div>
      </div>
      <div className={css.inputContainerBox}>
        <h2 className={css.title}>{titleText}</h2>
        <div className={css.inputContainer}>
          <div className={css.inputFieldContainer}>
            <label className={css.label} htmlFor="userName">
              Phone Number
            </label>
            <div className={css.inputField}>
              <InputText
                value={userDetails.phoneNumber}
                keyName={"phoneNumber"}
                label="Phone Number"
                onInputChange={handleInputChange}
                placeholder="10 digit number"
                isRequired={shouldApplyValidation}
                isValid={(isValid, property) =>
                  handleIsValid(isValid, property)
                }
                pattern={shouldApplyValidation && Validation.mobileNumberReg}
              />
            </div>
          </div>
        </div>
        {isVerifyOtpMode && (
          <div className={css.inputContainer}>
            <div className={css.inputFieldContainer}>
              <label className={css.label} htmlFor="userName">
                OTP
              </label>
              <div className={css.inputField}>
                <InputText
                  value={userDetails.otp}
                  keyName={"otp"}
                  label="OTP"
                  onInputChange={handleInputChange}
                  placeholder="Enter OTP"
                  isRequired={shouldApplyValidation && isVerifyOtpMode}
                  pattern={shouldApplyValidation && Validation.otpRegex}
                  isValid={(isValid, property) =>
                    handleIsValid(isValid, property)
                  }
                />
              </div>
            </div>
          </div>
        )}
        <div className={css.buttonContainer}>
          {isVerifyOtpMode ? (
            <Button buttonText={submitButtonText} handleClick={handleSubmitOtp} />
          ) : (
            <Button buttonText="Generate OTP" handleClick={handleGenerateOtp} />
          )}
        </div>
        <p className="help is-danger">{errorMessage}</p>
      </div>
    </div>
  );
};

export default OtpPage;

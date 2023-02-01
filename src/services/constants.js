import { _BASE_URL, _ADMIN_BASE_URL } from "./env";
export const BASE_URL = _BASE_URL;
export const ADMIN_BASE_URL = _ADMIN_BASE_URL;
export const WEBSITE_DOMAIN = ADMIN_BASE_URL.substring(ADMIN_BASE_URL.indexOf(".") + 1);

export const WebsitePageLinks = {
    signIn: "/sign-in",
    home: "/",
    dashboard: "/dashboard",
    generateOtp: "/generate-otp",
    createFinalExamDynamic: (examId) => `/schedule-exam/createFinalExam/${examId}`
};

export const API = {
    signin: BASE_URL + "/admin/login",

    otpVerificationForSignin: BASE_URL + "/admin/auth/verifySignIn",
    getAllDetails: BASE_URL + "/admin",
    courseDetails: (slug) => BASE_URL + "/admin/courses/" + slug,
    approveLoan: BASE_URL + "/admin/loan/approve",
};

export const CookiesKey = {
    ippoPay: "IPPO_PAY_TOKEN",
};

export const StatusCode = {
    inValidToken: 401,
};

export const defaultMinDate = "1900-01-01"
export const DateFormats = {
    primary: "DD-MMM-YYYY",
    secondary: "DD/MM/YYYY",
    inputDate: "YYYY-MM-DD",
    modern: "DD MMM YYYY",
    short: "DD MMM"
};

export const TimeFormats = {
    primary: "HH:mm:ss",
    secondary: "h:mm A",
    inputTime: "HH:mm",
};

export const DateTimeFormats = {
    primary: "DD-MMM-YYYY HH:mm:ss",
    secondary: "DD-MM-YYYY HH:mm",
    tertiary: "DD/MM/YYYY HH:mm"
};

export const Validation = {
    mobileNumberReg: /^[6-9]\d{9}$/,
    otpRegex: /^[1-9][0-9]{5}$/,
    pinCodeReg: /^[1-9][0-9]{5}$/,
};

export const LoanStatuses = {
    REJECTED: "REJECTED",
    APPROVED: "APPROVED",
    APPLIED: "APPLIED",
    BEST_PERFORMING_LOANS: "BEST_PERFORMING_LOANS",
}

export const RupeeSymbol = "₹";

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  registerUser,
  resendOtp,
  loginUser,
} from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import logo from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/back-icon.svg";
import meditation from "../../assets/images/meditation-two.png";
import otpIcon from "../../assets/images/otp-icon.svg";

const OTPVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [apiOtp, setApiOtp] = useState("");

  const { emailOrPhone, isNewUser } = location.state || {};

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    // For testing, you can either fetch it from location.state or use a mock
    // Example: if OTP comes from backend in location.state
    if (location.state?.otp) {
      setApiOtp(location.state.otp);
    } else {
      // fallback testing OTP
      setApiOtp("123456");
    }
  }, []);

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };
  
  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter valid 6 digit OTP");
      return;
    }

    const payload = emailOrPhone.includes("@")
      ? { email: emailOrPhone, otp: otpValue, fcmToken: "", apnToken: "" }
      : { phone: emailOrPhone, otp: otpValue, fcmToken: "", apnToken: "" };

    try {
      const res = isNewUser
        ? await dispatch(registerUser(payload)).unwrap()
        : await dispatch(loginUser(payload)).unwrap();

      console.log(res);

      const testingOtp = res?.data?.otp;
      setApiOtp(testingOtp);

      // Scenario 1: User does not exist → onboarding1
      if (res?.message === "User does not exist") {
        toast.info("Please complete registration");
        navigate("/onboarding1");
        return;
      }
      if (res?.message === "User created and logged in") {
        toast.info("Please complete registration");
        navigate("/onboarding1");
        return;
      }

      // Scenario 2: User already logged in → root
      if (
        res?.message === "User already logged in" &&
        res?.data?.token &&
        res?.data?.user
      ) {
        const { token, user } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.removeItem("isGuest");

        toast.success(res?.message);

        if (user.isConsultationFormFilled === false) {
          navigate("/onboarding1");
        } else {
          navigate("/home");
        }

        return;
      }

      // Scenario 3 & 4: User exists
      if (res?.success && res?.data?.token && res?.data?.user) {
        const { token, user } = res.data;

        // Save token & user
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.removeItem("isGuest");

        toast.success(res?.message || "Login successful");

        // Check if user has filled consultation form
        if (user.isConsultationFormFilled === false) {
          // Needs to fill form → onboarding1
          navigate("/onboarding1");
        } else {
          // Form already filled → home
          navigate("/home");
        }
        return;
      }

      // Fallback
      toast.error(res?.message || "Invalid OTP");
    } catch (error) {
      toast.error(error?.message || error || "Something went wrong");
    }
  };

  // const handleVerifyOtp = async () => {
  //   const otpValue = otp.join("");

  //   if (otpValue.length !== 6) {
  //     toast.error("Please enter valid 6 digit OTP");
  //     return;
  //   }

  //   const payload = emailOrPhone.includes("@")
  //     ? { email: emailOrPhone, otp: otpValue, fcmToken: "", apnToken: "" }
  //     : { phone: emailOrPhone, otp: otpValue, fcmToken: "", apnToken: "" };

  //   try {
  //     const res = isNewUser
  //       ? await dispatch(registerUser(payload)).unwrap()
  //       : await dispatch(loginUser(payload)).unwrap();

  //     console.log(res);
  //     // if (res?.message === "User already logged in") {
  //     //   toast.success("Login successful");
  //     //   navigate("/home");
  //     //   return;
  //     // }

  //     // if (res?.token) {
  //     //   localStorage.setItem("token", res.token);
  //     //   localStorage.setItem("userData", JSON.stringify(res.userData));
  //     //   localStorage.removeItem("isGuest");

  //     //   toast.success(res?.message || "Login successful");
  //     //   navigate("/onboarding1");
  //     //   return;
  //     // }
  //     if (res?.success) {
  //       const token = res?.data?.token;
  //       const user = res?.data?.user;

  //       if (token) {
  //         localStorage.setItem("token", token);
  //       }

  //       if (user) {
  //         localStorage.setItem("userData", JSON.stringify(user));
  //       }

  //       localStorage.removeItem("isGuest");

  //       if (res?.message?.toLowerCase().includes("user already exists") || !isNewUser) {
  //       // Existing user → go to /home
  //       navigate("/home");
  //     } else {
  //       // New user → go to onboarding
  //       navigate("/onboarding1");
  //     }
  //     return;
  //   }

  //     toast.error(res?.message || "Invalid OTP");
  //   } catch (error) {
  //     toast.error(error || "Something went wrong");
  //   }
  // };

  // const handleVerifyOtp = async () => {
  //   const otpValue = otp.join("");

  //   if (otpValue.length !== 6) {
  //     toast.error("Please enter valid 6 digit OTP");
  //     return;
  //   }

  //   const payload = emailOrPhone.includes("@")
  //     ? { email: emailOrPhone, otp: otpValue, fcmToken: "", apnToken: "" }
  //     : { phone: emailOrPhone, otp: otpValue, fcmToken: "", apnToken: "" };

  //   try {
  //     let res;

  //     if (isNewUser) {
  //       res = await dispatch(registerUser(payload)).unwrap();
  //     } else {
  //       res = await dispatch(loginUser(payload)).unwrap();
  //     }

  //     console.log("OTP API Response:", res);

  //     // IMPORTANT CHECK
  //     if (res?.success === false) {
  //       toast.error(res?.message || "Invalid OTP");
  //       return;
  //     }

  //     if (res?.success === true) {
  //       toast.success(res?.message || "Verification successful");
  //       navigate("/onboarding1");
  //     }
  //   } catch (error) {
  //     console.log("OTP Error:", error);
  //     toast.error(error || "Invalid OTP");
  //   }
  // };

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOtp = async () => {
    const payload = emailOrPhone.includes("@")
      ? { email: emailOrPhone }
      : { phone: emailOrPhone };

    try {
      const res = await dispatch(resendOtp(payload)).unwrap();

      if (res?.otp) {
        toast.success("OTP resent successfully");
        setTimer(30);
        console.log(res.otp);
        setApiOtp(res.otp);
      } else {
        toast.error(res?.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error(error || "Something went wrong");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 b">
          <div className="login-left">
            <div className="logo-container">
              <div className="logo-icon">
                <img src={logo} alt="Logo" />
              </div>
            </div>

            <a href="#" className="back-btn" onClick={() => navigate(-1)}>
              <img src={backIcon} alt="back-icon" />
              Back
            </a>

            <div className="text-center">
              <div className="meditation-illustration">
                <img src={meditation} alt="meditation" />
              </div>

              <p className="copyright">
                © 2026 Serene Wellness App. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6 d-flex align-items-center justify-content-center absolute">
          <div className="login-right">
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center justify-content-center">
                <img src={otpIcon} alt="otp" />
              </div>
            </div>

            <h2 className="welcome-title">Enter verification code</h2>

            <p className="welcome-description">
              A 6-digit code has been sent to your mobile number
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleVerifyOtp();
              }}
            >
              <div className="d-flex justify-content-center gap-2 gap-md-3 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    className="otp-input"
                    maxLength={1}
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>

              <div className="text-center mb-4">
                <p className="text-center mt-4 footer-text">
                  Didn't receive a code? <br />
                  {timer > 0 ? (
                    <span className="text-muted">Resend in {timer}s</span>
                  ) : (
                    <span
                      className="text-orange"
                      style={{ cursor: "pointer" }}
                      onClick={handleResendOtp}
                    >
                      Resend
                    </span>
                  )}
                </p>
              </div>

              <button type="submit" className="btn-primary-orange">
                Verify
              </button>
              {apiOtp && (
                <div className="text-center mb-2" style={{ color: "red" }}>
                  <small>Testing OTP: {apiOtp}</small>
                </div>
              )}
            </form>

            <p className="text-center english">English (US)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;

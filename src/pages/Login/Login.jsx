import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import logo from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/back-icon.svg";
import meditation from "../../assets/images/meditation-one.png";
import google from "../../assets/images/google.svg";
import apple from "../../assets/images/apple.svg";
import facebook from "../../assets/images/facebook.svg";

import { checkUserExists } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const handleGuest = (e) => {
    localStorage.removeItem("token");
    localStorage.setItem("isGuest", "true");
    navigate("/home");
  };

  const handleContinue = async (e) => {
    e.preventDefault();

    if (!emailOrPhone.trim()) {
      toast.error("Email or Mobile number is required");
      return;
    }

    const value = emailOrPhone.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const hasAlphabet = /[a-zA-Z]/.test(value);

    let payload = {};

    if (hasAlphabet) {
      if (!emailRegex.test(value)) {
        toast.error("Please enter a valid email address");
        return;
      }

      payload = { email: value };
    } else {
      if (!phoneRegex.test(value)) {
        toast.error(
          "Please enter a valid 10-digit mobile number starting with 6-9",
        );
        return;
      }

      payload = { phone: value };
    }

    try {
      const res = await dispatch(checkUserExists(payload)).unwrap();

      toast.success("OTP sent successfully");

      navigate("/otpVerify", {
        state: {
          emailOrPhone: value,
          otp: res?.otp,
          isNewUser: !res?.success,
        },
      });
    } catch (error) {
      toast.error(error || "Something went wrong");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      if (value.length <= 10) {
        setEmailOrPhone(value);
      }
    } else {
      setEmailOrPhone(value);
    }
  };

  // const handleGoogleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     try {
  //       // 🔥 Google se idToken lena
  //       const userInfoRes = await fetch(
  //         `https://www.googleapis.com/oauth2/v3/userinfo`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${tokenResponse.access_token}`,
  //           },
  //         },
  //       );

  //       const user = await userInfoRes.json();

  //       const payload = {
  //         idToken: tokenResponse.access_token, // backend config pe depend karta hai
  //         provider: "google",
  //         email: user.email,
  //         phone: "",
  //         deviceToken: "",
  //         fcmToken: "",
  //         apnToken: "",
  //       };

  //       // 👉 API call
  //       const res = await fetch("/api/v1/user/social-login", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(payload),
  //       });

  //       const data = await res.json();

  //       if (res.ok) {
  //         localStorage.setItem("token", data?.token);
  //         toast.success("Login successful");

  //         navigate("/home"); // ya dashboard
  //       } else {
  //         toast.error(data?.message || "Login failed");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       toast.error("Google login failed");
  //     }
  //   },
  //   onError: () => {
  //     toast.error("Google Login Failed");
  //   },
  // });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 a">
          <div className="login-left">
            <div className="logo-container">
              <div className="logo-icon">
                <img src={logo} alt="Logo" />
              </div>
            </div>

            {/* <a href="#" className="back-btn">
              <img src={backIcon} alt="back-icon" />
              Back
            </a> */}

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

        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <div className="login-right">
            <h2 className="welcome-title">Welcome back</h2>
            <p className="welcome-description">
              Log in or create an account to continue.
            </p>

            <form onSubmit={handleContinue}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="emailOrPhone"
                  placeholder="Enter your email or mobile"
                  value={emailOrPhone}
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="btn-primary-orange">
                Continue
              </button>
            </form>

            <button
              type="button"
              className="btn-primary-orange1 mt-3"
              onClick={handleGuest}
            >
              Continue without Login
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <div className="d-grid gap-3">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const idToken = credentialResponse.credential;

                    const decoded = parseJwt(idToken);

                    const payload = {
                      idToken,
                      provider: "google",
                      email: decoded?.email || "",
                      // phone: "",
                      deviceToken: "",
                      fcmToken: "",
                      apnToken: "",
                    };

                    const res = await fetch(
                      "http://15.206.16.230:7374/api/v1/user/social-login",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                      },
                    );

                    const data = await res.json();

                    if (res.ok) {
                      localStorage.setItem("token", data?.data?.token);
                      localStorage.setItem("userId", data?.data?.user?._id); // 🔥 ADD THIS
                      localStorage.setItem(
                        "userData",
                        JSON.stringify(data?.data?.user),
                      );
                      console.log("userId:", localStorage.getItem("userId"));

                      const user = data?.data?.user;

                      toast.success(data?.message || "Login successful");

                      if (user?.isConsultationFormFilled) {
                        navigate("/home", { replace: true });
                      } else {
                        navigate("/onboarding1", { replace: true });
                      }
                    } else {
                      toast.error(data?.message);
                    }
                  } catch (err) {
                    console.error(err);
                    toast.error("Google login failed");
                  }
                }}
                onError={() => {
                  toast.error("Google Login Failed");
                }}
              />
              {/* <button
                onClick={() => handleGoogleLogin()}
                className="social-btn"
              >
                <img src={google} alt="google" />
                Continue with Google
              </button> */}

              <a href="#" className="social-btn">
                <img src={apple} alt="apple" />
                Continue with Apple
              </a>

              <a href="#" className="social-btn">
                <img src={facebook} alt="facebook" />
                Continue with Facebook
              </a>
            </div>

            <p className="text-center mt-4 footer-text">
              By continuing, you agree to our <br />
              <NavLink
                to="/guest-settings/loginTermsOfServices"
                className="text-link"
              >
                Terms of Service
              </NavLink>{" "}
              and{" "}
              <NavLink to="/guest-settings/loginPrivacy" className="text-link">
                Privacy Policy
              </NavLink>
            </p>

            <p className="text-center english">English (US)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

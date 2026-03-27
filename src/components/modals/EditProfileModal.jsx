import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import rightArrow from "../../assets/images/right-arrow-icon.png";
import {
  updateUserProfile,
  fetchUserProfile,
} from "../../features/setting/profileSlice";
import { toast } from "react-toastify";

const EditProfileModal = ({ show, onClose, user }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bodyWeight: "",
    height: "",
    educationLevel: "",
    occupation: "",
    placeOfResidence: "",
    maritalStatus: "",
    familyType: "",
    livingArrangement: "",
    language: "",
    mainFocus: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        age: user.age || "",
        gender: user.gender || "",
        bodyWeight: user.bodyWeight || "",
        height: user.height || "",
        educationLevel: user.educationLevel || "",
        occupation: user.occupation || "",
        placeOfResidence: user.placeOfResidence || "",
        maritalStatus: user.maritalStatus || "",
        familyType: user.familyType || "",
        livingArrangement: user.livingArrangement || "",
        language: user.language || "",
        mainFocus: user.mainFocus || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!show) return null;

  const handleSave = async () => {
    const requiredFields = [
      "name",
      "age",
      "gender",
      "bodyWeight",
      "height",
      "educationLevel",
      "occupation",
      "placeOfResidence",
      "maritalStatus",
      "familyType",
      "livingArrangement",
      "language",
      "mainFocus",
    ];

    for (const field of requiredFields) {
      const value = formData[field];
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (typeof value === "number" && isNaN(value))
      ) {
        toast.error(`Please fill in the ${field}`);
        return;
      }
    }
    try {
      const payload = {
        name: formData.name,
        age: Number(formData.age),
        gender: formData.gender,
        bodyWeight: Number(formData.bodyWeight),
        height: Number(formData.height),
        educationLevel: formData.educationLevel,
        occupation: formData.occupation,
        placeOfResidence: formData.placeOfResidence,
        maritalStatus: formData.maritalStatus,
        familyType: formData.familyType,
        livingArrangement: formData.livingArrangement,
        language: formData.language,
        mainFocus: formData.mainFocus,
      };

      const res = await dispatch(updateUserProfile(payload)).unwrap();

      toast.success(res?.message || "Profile updated successfully");

      dispatch(fetchUserProfile());

      onClose();
    } catch (error) {
      toast.error(error || "Update failed");
    }
  };

  const handleFocusSelect = (value) => {
    setFormData((prev) => {
      const exists = prev.mainFocus.includes(value);

      return {
        ...prev,
        mainFocus: exists
          ? prev.mainFocus.filter((item) => item !== value)
          : [...prev.mainFocus, value],
      };
    });
  };

  return (
    <div className="custom-modal-overlay">
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered custom-modal">
          <div className="modal-content">
            <div className="modal-header">
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body p-4">
              {/* STEP 1 */}

              {step === 1 && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Step 1 of 2</label>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Name or Nickname</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Sex/Gender</label>
                    <div className="custom-select-wrapper">
                      <select
                        className="form-control custom-select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-6">
                      <label className="form-label">Body Weight (kg)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="bodyWeight"
                        value={formData.bodyWeight}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-6">
                      <label className="form-label">Height (cm)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Education Level</label>
                    <div className="custom-select-wrapper">
                      <select
                        className="form-control custom-select"
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="high_school">High School</option>
                        <option value="diploma">Diploma</option>
                        <option value="bachelors">Bachelors</option>
                        <option value="masters">Masters</option>
                        <option value="phd">PhD</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Occupation</label>
                    <input
                      type="text"
                      className="form-control"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    className="btn-primary-orange"
                    onClick={() => setStep(2)}
                  >
                    Continue <img src={rightArrow} alt="" />
                  </button>
                </>
              )}

              {/* STEP 2 */}

              {step === 2 && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Step 2 of 2</label>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-6">
                      <label className="form-label">Place of Residence</label>
                      <input
                        type="text"
                        className="form-control"
                        name="placeOfResidence"
                        value={formData.placeOfResidence}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-6">
                      <label className="form-label">Marital Status</label>
                      <div className="custom-select-wrapper">
                        <select
                          className="form-control custom-select"
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="divorced">Divorced</option>
                          <option value="widowed">Widowed</option>
                          <option value="prefer_not_to_say">
                            Prefer Not To Say
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Family Type</label>
                    <div className="custom-select-wrapper">
                      <select
                        className="form-control custom-select"
                        name="familyType"
                        value={formData.familyType}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="nuclear">Nuclear</option>
                        <option value="joint">Joint</option>
                        <option value="extended">Extended</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Living Arrangement</label>
                    <div className="custom-select-wrapper">
                      <select
                        className="form-control custom-select"
                        name="livingArrangement"
                        value={formData.livingArrangement}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="with_family">With Family</option>
                        <option value="alone">Alone</option>
                        <option value="with_partner">With Partner</option>
                        <option value="with_roommates">With Roommates</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Language</label>
                    <div className="custom-select-wrapper">
                      <select
                        className="form-control custom-select"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                        <option value="arabic">Arabic</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      What is your main focus?
                    </label>

                    <div className="row">
                      <div className="col-6">
                        <div
                          className={`form-control ${formData.mainFocus.includes("sleep") ? "active-focus" : ""}`}
                          onClick={() => handleFocusSelect("sleep")}
                        >
                          🌙 Sleep
                        </div>
                      </div>

                      <div className="col-6">
                        <div
                          className={`form-control ${formData.mainFocus.includes("anxiety") ? "active-focus" : ""}`}
                          onClick={() => handleFocusSelect("anxiety")}
                        >
                          😰 Anxiety
                        </div>
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-6">
                        <div
                          className={`form-control ${formData.mainFocus.includes("stress") ? "active-focus" : ""}`}
                          onClick={() => handleFocusSelect("stress")}
                        >
                          ⚡ Stress
                        </div>
                      </div>

                      <div className="col-6">
                        <div
                          className={`form-control ${formData.mainFocus.includes("not_sure") ? "active-focus" : ""}`}
                          onClick={() => handleFocusSelect("not_sure")}
                        >
                          🤔 Not Sure
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn border w-50"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      className="btn-primary-orange w-50"
                      onClick={handleSave}
                    >
                      Save <img src={rightArrow} alt="" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      .
    </div>
  );
};

export default EditProfileModal;

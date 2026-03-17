import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../features/setting/profileSlice";
// import profilePlaceholder from "../../assets/images/profile-image.svg";
import image from "../../assets/images/admin.png";
import sleepIcon from "../../assets/images/sleep-img.svg";
import EditProfileModal from "../../components/modals/EditProfileModal";

const ProfileDetail = () => {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const { user, loading, error } = useSelector((state) => state.profile);
  console.log(user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const valueMaps = {
    gender: {
      male: "Male",
      female: "Female",
      other: "Other",
    },

    maritalStatus: {
      single: "Single",
      married: "Married",
      divorced: "Divorced",
      widowed: "Widowed",
      prefer_not_to_say: "Prefer Not To Say",
    },

    educationLevel: {
      high_school: "High School",
      diploma: "Diploma",
      bachelors: "Bachelors",
      masters: "Masters",
      phd: "PhD",
      other: "Other",
    },

    familyType: {
      nuclear: "Nuclear",
      joint: "Joint",
      extended: "Extended",
      other: "Other",
    },

    livingArrangement: {
      with_family: "With Family",
      alone: "Alone",
      with_partner: "With Partner",
      with_roommates: "With Roommates",
      other: "Other",
    },

    language: {
      english: "English",
      hindi: "Hindi",
      arabic: "Arabic",
      spanish: "Spanish",
      french: "French",
    },

    mainFocus: {
      sleep: "Sleep",
      anxiety: "Anxiety",
      stress: "Stress",
      not_sure: "Not Sure",
    },
  };

  const formatValue = (type, value) => {
    if (!value) return "-";
    return valueMaps[type]?.[value] || value;
  };

  if (loading) return <p className="text-center mt-4">Loading profile...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
  if (!user) return null;

  return (
    <div className="main-content">
      <div className="profile-container">
        <div className="profile-card">
          <div className="row">
            {/* Left Column */}
            <div className="col-md-3">
              <div className="profile-left">
                <div className="profile-avatar-section">
                  <img
                    src={user.profileImage || image}
                    alt={user.name || "Profile"}
                    className="profile-avatar"
                  />
                  <div className="profile-change">Change Profile</div>
                  <div className="profile-name">{user.name}</div>
                  <div className="profile-phone">{user.phone}</div>
                </div>
                <button
                  className="btn-primary-orange mb-3"
                  onClick={() => setShowEditModal(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Middle Column */}
            <div className="col-md-4">
              <div className="profile-right">
                <div className="info-section">
                  <div className="section-title">Personal Information</div>
                  <div className="info-grid">
                    <div className="info-item">
                      <div className="info-label">Age</div>
                      <div className="info-value">{user.age || "-"}</div>
                    </div>

                    <div className="info-item">
                      <div className="info-label">Sex/Gender</div>
                      <div className="info-value">{formatValue("gender", user.gender)}</div>
                    </div>

                    <div className="info-item">
                      <div className="info-label">Marital Status</div>
                      <div className="info-value">
                        {formatValue("maritalStatus", user.maritalStatus)}
                      </div>
                    </div>

                    <div className="info-item">
                      <div className="info-label">Education Level</div>
                      <div className="info-value">
                        {formatValue("educationLevel", user.educationLevel)}
                      </div>
                    </div>

                    <div className="info-item">
                      <div className="info-label">Occupation</div>
                      <div className="info-value">{user.occupation || "-"}</div>
                    </div>

                    <div className="info-item">
                      <div className="info-label">Place of Residence</div>
                      <div className="info-value">
                        {user.placeOfResidence || "-"}
                      </div>
                    </div>

                    <div className="info-item">
                      <div className="info-label">Family Type</div>
                      <div className="info-value">{formatValue("familyType", user.familyType)}</div>
                    </div>

                    <div className="info-item">
                      <div className="info-label">Living Arrangement</div>
                      <div className="info-value">
                        {formatValue("livingArrangement", user.livingArrangement)}
                      </div>
                    </div>

                    <div className="info-item">
                      <div className="info-label">Language</div>
                      <div className="info-value">{formatValue("language", user.language)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-4">
              <div className="profile-right">
                <div className="info-section">
                  <div className="section-title">Health Information</div>
                  <div className="info-grid">
                    <div className="info-item">
                      <div className="info-label">Body Weight</div>
                      <div className="info-value">{user.bodyWeight || "-"}</div>
                    </div>

                    <div className="info-item">
                      <div className="info-label">Height</div>
                      <div className="info-value">{user.height || "-"}</div>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <div className="section-title">Main Focus</div>
                  {user.mainFocus ? (
                    <div className="focus-badge">
                      <span className="focus-icon">
                        <img src={sleepIcon} alt={user.mainFocus} />
                      </span>
                      <span><span>{formatValue("mainFocus", user.mainFocus)}</span></span>
                    </div>
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={user}
      />
    </div>
  );
};

export default ProfileDetail;

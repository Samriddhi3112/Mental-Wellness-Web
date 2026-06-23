import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgeGroups, fetchBotheringOptions } from "../../../../features/chat/preChatSlice/preChatSlice";
import BotheringScreen from "../Pre Chat Page/botheringScreen";
import QuestionsScreen from "../Pre Chat Page/questionScreen";
import ThankYouModal from "../../../../components/modals/ThankyouModal";

export default function PreChatPage() {
  const dispatch = useDispatch();
  const { step, selectedAgeGroup, loading } = useSelector((s) => s.preChat);

  // Step 1: mount hote hi age groups fetch karo
  // slice automatically user.age se group match karega
  useEffect(() => {
    dispatch(fetchAgeGroups());
  }, [dispatch]);

  // Step 2: jaise hi selectedAgeGroup set ho, bothering options fetch karo
  useEffect(() => {
    if (selectedAgeGroup?.code) {
      dispatch(fetchBotheringOptions(selectedAgeGroup.code));
    }
  }, [selectedAgeGroup?.code, dispatch]);

  if (loading && !selectedAgeGroup) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0b0e1f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="main-content" style={{ position: "relative", minHeight: "100vh" }}>
      {step === "bothering" && <BotheringScreen />}
      {step === "questions" && <QuestionsScreen />}
      <ThankYouModal />
    </div>
  );
}
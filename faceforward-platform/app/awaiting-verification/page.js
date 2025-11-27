"use client";

import "./AwaitingVerification.css"; 

export default function AwaitingVerification() {
  return (
    <div className="verifyPage">
      <div className="verifyCard">
        <h2 className="verifyTitle">Your Account Is Awaiting Verification</h2>
        <p className="verifyText">
          Thank you for registering with FaceForward.
          <br />
          Our team is currently reviewing your profile. Once approved, you will
          gain access to the full platform.
        </p>
        <p className="verifySubtext">
          This process may take up to 24 hours. You will receive an email once
          verification is complete.
        </p>
      </div>
    </div>
  );
}

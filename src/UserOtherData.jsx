import { useState } from "react";

const UserOtherData = ({ userStreet, userCity, userZipCode }) => {
  return (
    <div
      style={{
        border: 1,
        borderStyle: "solid",
        padding: "15px",
        borderRadius: "25px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        Street:
        <input defaultValue={userStreet} />
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        City:
        <input defaultValue={userCity} />
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        Zipcode:
        <input defaultValue={userZipCode} />
      </div>
    </div>
  );
};

export default UserOtherData;

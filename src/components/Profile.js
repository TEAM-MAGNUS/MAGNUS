import React from "react";
import profile from "../asset/profile/profile.png";
import dayjs from "dayjs";

function Profile() {
  const today = dayjs(new Date());
  const td = new Date();
  return (
    <>
      <div className="div-profile-profile">
        <img className="img-profile-profile" src={profile} alt="" />
        name1
      </div>
      <div className="div-profile-date">{today.format("YYYY.MM.DD")}</div>
      {td.getDay() === 0 || td.getDay() === 5 || td.getDay() === 6 ? (
        <div className="div-profile-check">출석</div>
      ) : (
        <div className="div-profile-check">ㅡ</div>
      )}
    </>
  );
}

export default Profile;

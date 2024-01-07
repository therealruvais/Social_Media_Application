import React from "react";

const UsersCard = ({ user }) => {
  return (
    <div className="Simg">
      <img
        src={user.image}
        alt=""
      />
      <div className="Sname">
        <p style={{ fontWeight: "bold" }}>{user.username}</p>
        <p style={{ color: "var(--color-gray)" }}>{user.name}</p>
      </div>
    </div>
  );
};

export default UsersCard;

import { useEffect, useState } from "react";

const UserOtherData = ({ userData, onUserUpdate }) => {
  const [user, setUser] = useState(JSON.parse(userData));

  useEffect(() => {
    onUserUpdate(user);
  }, [user]);

  return (
    <div
      style={{
        border: 1,
        borderStyle: "solid",
        padding: "15px",
        borderRadius: "25px",
      }}
    >
      <div className="input-bar">
        Street:
        <input
          type="text"
          onChange={(e) =>
            setUser({
              ...user,
              address: { ...user.address, street: e.target.value },
            })
          }
          defaultValue={user.address.street}
        />
      </div>
      <br />
      <div className="input-bar">
        City:
        <input
          type="text"
          onChange={(e) =>
            setUser({
              ...user,
              address: { ...user.address, city: e.target.value },
            })
          }
          defaultValue={user.address.city}
        />
      </div>
      <br />
      <div className="input-bar">
        Zipcode:
        <input
          type="text"
          onChange={(e) =>
            setUser({
              ...user,
              address: { ...user.address, zipcode: e.target.value },
            })
          }
          defaultValue={user.address.zipcode}
        />
      </div>
    </div>
  );
};

export default UserOtherData;

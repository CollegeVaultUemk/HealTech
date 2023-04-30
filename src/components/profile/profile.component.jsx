import React, { useState, useContext, Fragment, useEffect } from "react";
import "./profile.styles.scss";
import { UserContext } from "../contexts/user.context";
import { getUser } from "../../utils/firebase.utils";
import userimg from "../../assets/userimg.gif";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const [userObj, setUserObj] = useState({});
  const handleUserObj = async () => {
    const response = await getUser(currentUser.uid);
    console.log(response);
    setUserObj(response);
  };

  useEffect(() => {
    if (currentUser) {
      handleUserObj();
    }
  }, [currentUser]);

  return (
    <Fragment>
      {currentUser ? (
        <div className="profile">
          

            <div className="profile-image">
            
            </div>
            <h2 className="span">Profile</h2>
            <div className="user-name">{userObj.displayName}</div>
            <div className="email">{userObj.email}</div>
         
          
        </div>
      ) : (
        <div>Not Logged in</div>
      )}
    </Fragment>
  );
};

export default Profile;

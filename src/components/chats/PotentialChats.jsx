import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  console.log("potential Chats", potentialChats);
  console.log("onlineUsers onlineUsers", onlineUsers);
  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats?.map((u, idx) => {
            const isOnline = onlineUsers?.some(
              (onlineUser) => onlineUser?.userId === u?._id
            );
            return (
              <div
                className="single-user"
                key={idx}
                onClick={() => createChat(user._id, u._id)}
              >
                {u.name}
                <span className={isOnline ? "user-online" : ""}></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChats;

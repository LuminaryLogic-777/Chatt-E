import React, { useContext } from "react";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import avatar from "../../assets/avatar.svg";
import { ChatContext } from "../../context/ChatContext";


const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers } = useContext(ChatContext);

  console.log("RECIPIENT USER", recipientUser?.name);
  const isOnline = onlineUsers?.some(
    (onlineUser) => onlineUser?.userId === recipientUser?._id
  );

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2 w-16 relative bg-slate-200 rounded-full">
          <img src={avatar} alt="avatar" height="35" />
          <span className={isOnline ? "user-online" : ""}></span>
        </div>
        <div className="text-content">
          <div className="name text-lg capitalize">{recipientUser?.name}</div>
          <div className="text">Text Message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date text-sm">12/06/2024</div>
        <div className="this-user-notifications text-white">2</div>
      </div>
    </Stack>
  );
};

export default UserChat;

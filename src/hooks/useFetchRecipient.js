import { useEffect, useState } from "react";
import { baseUrl, getReq } from "../utils/Services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  // Ensure that both chat and user are defined before finding recipientId
  const recipientId = chat && user ? chat.members.find((id) => id !== user._id) : null;
  console.log(recipientId)

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;
      const response = await getReq(`${baseUrl}/users/find/${recipientId}`);
      if (response?.error) {
        return setError(error);
      }
      setRecipientUser(response); 
    };
    getUser();
  }, [recipientId]);

  return { recipientUser };
};




import { Typography, Stack, Box } from "@mui/material";
import { Link } from "../styles/Styled";
import { memo } from "react";
import AvatarCard from "./AvatarCard";
// import {motion} from "framer-motion";

const ChatItem = ({
    avatar = [],
    namee,
    _id,
    groupChat = false,
    isOnline,
    newMessageAlert,
    handleDeleteChat,
    sameSender,
    setSelectedChatId, // ✅ Accept function to update selection
}) => 
    
    {
       

    return (
        <Link
            to={`/chat/${_id}`}
            onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
            onClick={() => setSelectedChatId(_id)} 
            
            sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                padding: "0.5rem",
                position: "relative",
                backgroundColor: sameSender ? "black" : "transparent",
                color: sameSender ? "white" : "inherit",
                transition: "background-color 0.3s ease",
                "&:hover": {
                    backgroundColor: sameSender ? "black" : "rgba(0, 0, 0, 0.1)",
                },
            }} 
        >
            
            <AvatarCard avatar={avatar} />
            <Stack>
                <Typography>{namee}</Typography>
                {newMessageAlert && (
                    <Typography>{newMessageAlert.count} New Message</Typography>
                )}
            </Stack>


            {isOnline && (
                <Box
                    sx={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "green",
                        position: "absolute",
                        top: "50%",
                        right: "1rem",
                     
                        transform: "translateY(-50%)",
                    }}
                />
            )}
         
        </Link>
    
    );
};

export default memo(ChatItem);





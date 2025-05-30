import { Box, Typography } from "@mui/material";
import {blue, candypink, gradiant} from "../../constants/color";
import { memo } from "react";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({message, user}) => {
   
    
    
    const { sender, content, attachments = [], createdAt } = message;
    // const sameSender = sender?._id.trim() === user?._id.trim();
    const sameSender = sender?._id && user?._id
  ? sender._id.trim() === user._id.trim()
  : false;


    const timeAgo = moment(createdAt).fromNow()
    
  return (  
    <motion.div 
    initial={{ opacity: 0, x: "-100%" }}
    whileInView={{ opacity: 1, x: 0 }}
    
    
    style={{
        backgroundColor: sameSender ? "#dcf8c6" : "#fff",
        padding: "8px",
        borderRadius: "10px",
        margin: "5px",
        maxWidth: "70%",
        alignSelf: sameSender ? "flex-end" : "flex-start",
        marginLeft: sameSender ? "auto" : "0",
    }}
    >
        {!sameSender && 
        <Typography color={gradiant} fontWeight={"600"} variant={"caption"}>
            {sender.namee}</Typography>}
        {content && <Typography>{content}</Typography>}

        {attachments.length > 0 && attachments.map((attachment, index) => {
            const url = attachment.url
            const file = fileFormat(url);
            return (
             <Box key={index}>
                <a href={url} target="_blank" download style={{color: "black",}}>
                    
                    {RenderAttachment(file, url)}
                </a>
            </Box>
            );
        })}


        <Typography variant="caption" color={"text.secondary"}>
            {timeAgo}
        </Typography>
    </motion.div>
  )
}

export default memo(MessageComponent);







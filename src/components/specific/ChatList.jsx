








// import { Stack } from "@mui/material";
// import { useState } from "react";
// import { gradiant } from "../../constants/color";
// import ChatItem from "../shared/ChatItem";

// const ChatList = ({
//     w = "100%",
//     chats = [],
//     onlineUsers = [],
//     newMessagesAlert = [{ chatId: "", count: 0 }],
//     handleDeleteChat,
// }) => {
//     const [selectedChatId, setSelectedChatId] = useState(null); // ✅ Track selected chat

//     return (

//         <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}
//             sx={{
//                 backgroundImage: gradiant
//             }}
//         >
//             {chats?.map((data, index) => {
//                 const { avatar, _id, namee, groupChat, members } = data;
//                 const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id);
//                 const isOnline = members?.some((member) => 
//                 onlineUsers.includes(member._id)
            

//             );
//             console.log("Online Users:", onlineUsers); // ✅ will now show string IDs like '681d29...'

//             console.log("Chat Members:", members);


//                 return (
//                     <ChatItem
//                         key={_id}
//                         index={index}
//                         newMessageAlert={newMessageAlert}
//                         isOnline={isOnline}
//                         avatar={avatar}
//                         namee={namee}
//                         _id={_id}
//                         groupChat={groupChat}
//                         sameSender={selectedChatId === _id} 
//                         // sameSender={chatId === _id} 
//                         handleDeleteChat={handleDeleteChat}
//                         setSelectedChatId={setSelectedChatId} // ✅ Pass function to update selected chat
//                     />




                  

//                 );
//             })}
//         </Stack>
//     );
// };

// export default ChatList;





import { Stack } from "@mui/material";
import { useState } from "react";
import { gradiant } from "../../constants/color";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
    w = "100%",
    chats = [],
    onlineUsers = [],
    newMessagesAlert = [{ chatId: "", count: 0 }],
    handleDeleteChat,
}) => {
    const [selectedChatId, setSelectedChatId] = useState(null); // ✅ Track selected chat

    return (
        <Stack
            width={w}
            direction={"column"}
            overflow={"auto"}
            height={"100%"}
            sx={{
                backgroundImage: gradiant,
            }}
        >
            {chats?.map((data, index) => {
                

                const { avatar, _id, namee, groupChat, members } = data;
                const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id);

                // Check if any member is online
                const isOnline = members?.some((member) =>
                    onlineUsers.includes(member) // Ensure online users are checked by member ID
                );
                
                

                return (
                    <ChatItem
                        key={_id}
                        index={index}
                        newMessageAlert={newMessageAlert}
                        isOnline={isOnline} // ✅ Pass the correct isOnline value
                        avatar={avatar}
                        namee={namee}
                        _id={_id}
                        groupChat={groupChat}
                        sameSender={selectedChatId === _id} 
                        handleDeleteChat={handleDeleteChat}
                        setSelectedChatId={setSelectedChatId} // ✅ Pass function to update selected chat
                    />
                );
            })}
        </Stack>
    );
};

export default ChatList;

import { Menu, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/misc";
import {
  ExitToApp as ExitToAppIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAsyncMutation } from "../../hooks/hook";
import { useDeleteGroupMutation, useLeaveGroupMutation } from "../../redux/api/api";

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
   const navigate = useNavigate();
  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );
 

  const [deleteChat, _, deleteChatData] = useAsyncMutation(
    useDeleteGroupMutation
  );


  
  const [leaveGroup, __, leaveGroupData] = useAsyncMutation(
    useLeaveGroupMutation
  );

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor.current = null;
  
  };

  const isGroup = selectedDeleteChat?.groupChat;

  const leaveGroupHandler = () => {
    // Call leave group mutation if needed
    closeHandler();
    leaveGroup("Leaving Group...", selectedDeleteChat.chatId);
  };

  const handleDeleteChat = () => {
    closeHandler();
    deleteChat("deleting chat...", selectedDeleteChat.chatId);
  };

  useEffect(() => {
    if (deleteChatData || leaveGroupData) navigate("/");
  }, [deleteChatData,leaveGroupData]);

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
    >
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={isGroup ? leaveGroupHandler : handleDeleteChat}
      >
        {isGroup ? (
          <>
            <ExitToAppIcon />
            <Typography>Leave Group</Typography>
          </>
        ) : (
          <>
            <DeleteIcon />
            <Typography>Delete Chat</Typography>
          </>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
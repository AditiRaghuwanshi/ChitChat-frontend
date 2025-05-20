



















// import { Drawer, Grid, Skeleton } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import Title from "../components/shared/Title";
// import ChatList from "../components/specific/ChatList";
// import Profile from "../components/specific/Profile";
// import Header from "../layout/Header";
// import { useMyChatsQuery } from "../redux/api/api";
// import { useDispatch, useSelector } from "react-redux";
// import { setIsDeleteMenu, setIsMobileMenuFriend, setIsSelectedDeleteChat } from "../redux/reducers/misc";
// import { useErrors, useSocketEvents } from "../hooks/hook";
// import { getSocket } from "../socket";
// import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from "../constants/events";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { incrementNotification, setNewMessagesAlert } from "../redux/reducers/chat";
// import { getOrSaveFromStorage } from "../lib/features";
// import DeleteChatMenu from "../components/dialogs/DeleteChatMenu";
// import { getSocket } from "../socket";


// const Applayout = (WrappedComponent) => {
//     const ComponentWithLayout = (props) => {
//       const params = useParams();           // ✅ moved here
//       const dispatch = useDispatch();       // ✅ moved here
//       const chatId = params.chatId;
//       const deleteMenuAnchor = useRef(null);
//       const socket = getSocket();
//       const { isMobileMenuFriend } = useSelector((state) => state.misc);
//       const { user } = useSelector((state) => state.auth);
//       const { newMessagesAlert } = useSelector((state) => state.chat);
//       const [onlineUsers, setOnlineUsers] = useState([]);
//       const navigate = useNavigate();
//       const socket = getSocket();
      
  
//       const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
//       useErrors([{ isError, error }]);
 
//       useEffect(() => {
//         getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });

//       }, [ newMessagesAlert ]);
  
//       const   handleDeleteChat = (e, chatId, groupChat) => {
//         dispatch(setIsDeleteMenu(true));
//         dispatch(setIsSelectedDeleteChat({ chatId, groupChat }));
//         deleteMenuAnchor.current = e.currentTarget;
//       };
  
//       const handleMobileClose = () => {
//         dispatch(setIsMobileMenuFriend(false));
//       };
//       const newMessageAlertHandler = useCallback((data) => {
//         if(data.chatId === chatId) return;
//        dispatch(setNewMessagesAlert(data));
     
//       }, [chatId]);
//       const newRequestHandler = useCallback(() => {
//         dispatch(incrementNotification());
//       }, [dispatch]);

//       const refetchListener = useCallback(() => {
//         refetch();
//         navigate("/")
//       },[refetch, navigate]);

//       // const onlineUsersListener = useCallback((data) => {
//       //   console.log("RAW Online Users from server:", data);  
//       //    setOnlineUsers(data);
//       // }, []);


//       useEffect(() => {
//         // Handle the ONLINE_USERS event when received from the server
//         socket.on("ONLINE_USERS", (onlineUserIds) => {
//           console.log("RAW Online Users from server:", onlineUserIds);
//           setOnlineUsers(onlineUserIds); // Update the state with online users
//         });
//         return () => {
//           socket.off("ONLINE_USERS");
//         };
//       }, [socket]);
    
    

//       const eventHandlers = {
//         [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
//         [NEW_REQUEST]: newRequestHandler,
//         [REFETCH_CHATS]: refetchListener,
//         [ONLINE_USERS]: onlineUsersListener,
      
//       };
//         useSocketEvents(socket, eventHandlers);
  
//       return (
//         <>
//           <Title />
//           <Header />
//           <DeleteChatMenu dispatch={dispatch}  
//           deleteMenuAnchor={deleteMenuAnchor}
//           />
  
//           {isLoading ? (
//             <Skeleton />
//           ) : (
//             <Drawer open={isMobileMenuFriend} onClose={handleMobileClose}>
//               <ChatList
//                 w="70vw"
//                 chats={data?.chats}
//                 chatId={chatId}
//                 handleDeleteChat={handleDeleteChat}
//                 newMessagesAlert={newMessagesAlert}
//                 onlineUsers={onlineUsers}
             
//               />
//             </Drawer>
//           )}
  
//           <Grid container height={"calc(100vh - 4rem)"}>
//             <Grid
//               item
//               sm={4}
//               md={3}
//               sx={{ display: { xs: "none", sm: "block" } }}
//               height={"100%"}
//             >
//               {isLoading ? (
//                 <Skeleton />
//               ) : (
//                 <ChatList
//                   chats={data?.chats}
//                   chatId={chatId}
//                   handleDeleteChat={handleDeleteChat}
//                   newMessagesAlert={newMessagesAlert}
//                   onlineUsers={onlineUsers}
//                 />
//               )}
//             </Grid>
  
//             <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
//               <WrappedComponent {...props} chatId={chatId} user={user} />
//             </Grid>
  
//             <Grid
//               item
//               md={4}
//               lg={3}
//               height={"100%"}
//               sx={{
//                 display: { xs: "none", md: "block" },
//                 padding: "2rem",
//                 bgcolor: "rgba(0,0,0,0.85)",
//               }}
//             >
//               <Profile user={user} />
//             </Grid>
//           </Grid>
//         </>
//       );
//     };
  
//     return ComponentWithLayout;
//   };
  
//   export default Applayout;
  



  


import { Drawer, Grid, Skeleton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../components/shared/Title";
import ChatList from "../components/specific/ChatList";
import Profile from "../components/specific/Profile";
import Header from "../layout/Header";
import { useMyChatsQuery } from "../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteMenu, setIsMobileMenuFriend, setIsSelectedDeleteChat } from "../redux/reducers/misc";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { getSocket } from "../socket";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from "../constants/events";
import { useCallback, useEffect, useRef, useState } from "react";
import { incrementNotification, setNewMessagesAlert } from "../redux/reducers/chat";
import { getOrSaveFromStorage } from "../lib/features";
import DeleteChatMenu from "../components/dialogs/DeleteChatMenu";

const Applayout = (WrappedComponent) => {
    const ComponentWithLayout = (props) => {
      const params = useParams();
      const dispatch = useDispatch();
      const chatId = params.chatId;
      const deleteMenuAnchor = useRef(null);
      const socket = getSocket();
      const { isMobileMenuFriend } = useSelector((state) => state.misc);
      const { user } = useSelector((state) => state.auth);
      const { newMessagesAlert } = useSelector((state) => state.chat);
      const [onlineUsers, setOnlineUsers] = useState([]);
      const navigate = useNavigate();

      const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
      useErrors([{ isError, error }]);

      useEffect(() => {
        getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
      }, [newMessagesAlert]);

      const handleDeleteChat = (e, chatId, groupChat) => {
        dispatch(setIsDeleteMenu(true));
        dispatch(setIsSelectedDeleteChat({ chatId, groupChat }));
        deleteMenuAnchor.current = e.currentTarget;
      };

      const handleMobileClose = () => {
        dispatch(setIsMobileMenuFriend(false));
      };

      const newMessageAlertHandler = useCallback((data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      }, [chatId]);

      const newRequestHandler = useCallback(() => {
        dispatch(incrementNotification());
      }, [dispatch]);

      const refetchListener = useCallback(() => {
        refetch();
        navigate("/");
      }, [refetch, navigate]);

      // ONLINE_USERS event handler
      const onlineUsersListener = useCallback((onlineUserIds) => {
        console.log("RAW Online Users from server:", onlineUserIds);
        setOnlineUsers(onlineUserIds);
      }, []);

      useEffect(() => {
        // Handle the ONLINE_USERS event when received from the server
        socket.on("ONLINE_USERS", onlineUsersListener);
        return () => {
          socket.off("ONLINE_USERS", onlineUsersListener);
        };
      }, [socket, onlineUsersListener]);

      const eventHandlers = {
        [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
        [NEW_REQUEST]: newRequestHandler,
        [REFETCH_CHATS]: refetchListener,
        [ONLINE_USERS]: onlineUsersListener, // Here it will be handled
      };

      useSocketEvents(socket, eventHandlers);

      return (
        <>
          <Title />
          <Header />
          <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />
          {isLoading ? (
            <Skeleton />
          ) : (
            <Drawer open={isMobileMenuFriend} onClose={handleMobileClose}>
              <ChatList
                w="70vw"
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            </Drawer>
          )}

          <Grid container height={"calc(100vh - 4rem)"}>
            <Grid
              item
              sm={4}
              md={3}
              sx={{ display: { xs: "none", sm: "block" } }}
              height={"100%"}
            >
              {isLoading ? (
                <Skeleton />
              ) : (
                <ChatList
                  chats={data?.chats}
                  chatId={chatId}
                  handleDeleteChat={handleDeleteChat}
                  newMessagesAlert={newMessagesAlert}
                  onlineUsers={onlineUsers}
                />
              )}
            </Grid>

            <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
              <WrappedComponent {...props} chatId={chatId} user={user} />
            </Grid>

            <Grid
              item
              md={4}
              lg={3}
              height={"100%"}
              sx={{
                display: { xs: "none", md: "block" },
                padding: "2rem",
                bgcolor: "rgba(0,0,0,0.85)",
              }}
            >
              <Profile user={user} />
            </Grid>
          </Grid>
        </>
      );
    };

    return ComponentWithLayout;
};

export default Applayout;





  

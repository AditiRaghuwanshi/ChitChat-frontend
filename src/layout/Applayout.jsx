



















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
  



  


// import { Box, Button, Drawer, Grid, Skeleton, useMediaQuery, useTheme } from "@mui/material";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import DeleteChatMenu from "../components/dialogs/DeleteChatMenu";
// import Title from "../components/shared/Title";
// import ChatList from "../components/specific/ChatList";
// import Profile from "../components/specific/Profile";
// import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from "../constants/events";
// import { useErrors, useSocketEvents } from "../hooks/hook";
// import Header from "../layout/Header";
// import { getOrSaveFromStorage } from "../lib/features";
// import { useMyChatsQuery } from "../redux/api/api";
// import { incrementNotification, setNewMessagesAlert } from "../redux/reducers/chat";
// import { setIsDeleteMenu, setIsMobileMenuFriend, setIsSelectedDeleteChat } from "../redux/reducers/misc";
// import { getSocket } from "../socket";


// const Applayout = (WrappedComponent) => {
//     const ComponentWithLayout = (props) => {
//       const theme = useTheme();
//    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//       const params = useParams();
//       const dispatch = useDispatch();
//       const chatId = params.chatId;
//       const deleteMenuAnchor = useRef(null);
//       const socket = getSocket();
//       const { isMobileMenuFriend } = useSelector((state) => state.misc);
//       const { user } = useSelector((state) => state.auth);
//       const { newMessagesAlert } = useSelector((state) => state.chat);
//       const [onlineUsers, setOnlineUsers] = useState([]);
//       const navigate = useNavigate();
      
//       const [showProfile, setShowProfile] = useState(false);


//       // const isMobile = useIsMobile(); // Use the custom hook to determine if the device is mobile
      
//       const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
//       useErrors([{ isError, error }]);

//       useEffect(() => {
//         getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
//       }, [newMessagesAlert]);

//       const handleDeleteChat = (e, chatId, groupChat) => {
//         dispatch(setIsDeleteMenu(true));
//         dispatch(setIsSelectedDeleteChat({ chatId, groupChat }));
//         deleteMenuAnchor.current = e.currentTarget;
//       };

//       const handleMobileClose = () => {
//         dispatch(setIsMobileMenuFriend(false));
//       };

//       const newMessageAlertHandler = useCallback((data) => {
//         if (data.chatId === chatId) return;
//         dispatch(setNewMessagesAlert(data));
//       }, [chatId]);

//       const newRequestHandler = useCallback(() => {
//         dispatch(incrementNotification());
//       }, [dispatch]);

//       const refetchListener = useCallback(() => {
//         refetch();
//         navigate("/");
//       }, [refetch, navigate]);

//       // ONLINE_USERS event handler
//       const onlineUsersListener = useCallback((onlineUserIds) => {
//         console.log("RAW Online Users from server:", onlineUserIds);
//         setOnlineUsers(onlineUserIds);
//       }, []);

//       useEffect(() => {
//         // Handle the ONLINE_USERS event when received from the server
//         socket.on("ONLINE_USERS", onlineUsersListener);
//         return () => {
//           socket.off("ONLINE_USERS", onlineUsersListener);
//         };
//       }, [socket, onlineUsersListener]);

//       const eventHandlers = {
//         [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
//         [NEW_REQUEST]: newRequestHandler,
//         [REFETCH_CHATS]: refetchListener,
//         [ONLINE_USERS]: onlineUsersListener, // Here it will be handled
//       };

//       useSocketEvents(socket, eventHandlers);

//       return (
//         <>
//           <Title />
//           <Header />
//           <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />
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
//                 onProfileClick={() => {
//                   setShowProfile(true);
              
//                 }
//                 }
//                   isMobile={isMobile} 
//               />
//             </Drawer>
//           )}

//           {/* <Grid container height={"calc(100vh - 4rem)"}>
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
//           </Grid> */}
//    {/* <Grid container height="calc(100vh - 4rem)">
//     {isMobile ? (
//       <Grid item xs={12} height="100%" key={chatId || "chatList"}>
//         <Box height="100%" display="flex" flexDirection="column">
//           {!chatId ? (
//             <ChatList
//               chats={data?.chats}
//               chatId={chatId}
//               handleDeleteChat={handleDeleteChat}
//               newMessagesAlert={newMessagesAlert}
//               onlineUsers={onlineUsers}
//             />
//           ) : (
//             <>
//               <Button onClick={() => navigate("/")} sx={{ mb: 1 }}>
//                 ← Back
//               </Button>
//               <Box flex="1 1 auto" overflow="hidden">
//                 <WrappedComponent {...props} chatId={chatId} user={user} />
//               </Box>
//             </>
//           )}
//         </Box>
//       </Grid>
//     ) : (
//       <>
//         <Grid item sm={4} md={3} height="100%">
//           <ChatList
//             chats={data?.chats}
//             chatId={chatId}
//             handleDeleteChat={handleDeleteChat}
//             newMessagesAlert={newMessagesAlert}
//             onlineUsers={onlineUsers}
//           />
//         </Grid>

//         <Grid item sm={8} md={5} lg={6} height="100%">
//           <WrappedComponent {...props} chatId={chatId} user={user} />
//         </Grid>

//         <Grid
//           item
//           md={4}
//           lg={3}
//           height="100%"
//           sx={{
//             display: { xs: "none", md: "block" },
//             padding: "2rem",
//             bgcolor: "rgba(0,0,0,0.85)",
//           }}
//         >
//           <Profile user={user} />
//         </Grid>
//       </>
//     )}
//   </Grid> */}

//   <Grid container height="calc(100vh - 4rem)">
//   {isMobile ? (
//     <Grid item xs={12} height="100%">
//      {!chatId && !showProfile ? (
//       <ChatList
//         chats={data?.chats}
//         chatId={chatId}
//         handleDeleteChat={handleDeleteChat}
//         newMessagesAlert={newMessagesAlert}
//         onlineUsers={onlineUsers}
//     onProfileClick={handleProfileClick}
//         isMobile={isMobile}
//       />
//     ) : showProfile ? (
//       <Profile user={user} />
      
//     ) : (
//       <WrappedComponent {...props} chatId={chatId} user={user} />
//     )}
//     </Grid>
//   ) : (
//     // desktop layout: show Profile separately, no icon inside ChatList
//     <>
//       <Grid item sm={4} md={3} height="100%">
//         <ChatList
//           chats={data?.chats}
//           chatId={chatId}
//           handleDeleteChat={handleDeleteChat}
//           newMessagesAlert={newMessagesAlert}
//           onlineUsers={onlineUsers}
//           isMobile={false}  // explicitly false for desktop
//         />
//       </Grid>

//       <Grid item sm={8} md={5} lg={6} height="100%">
//         {showProfile ? (
//           <Profile user={user} />
//         ) : (
//           <WrappedComponent {...props} chatId={chatId} user={user} />
//         )}
//       </Grid>

//       <Grid
//         item
//         md={4}
//         lg={3}
//         height="100%"
//         sx={{
//           display: { xs: "none", md: "block" },
//           padding: "2rem",
//           bgcolor: "rgba(224, 114, 114, 0.85)",
//         }}
//       >
//         <Profile user={user} />
//       </Grid>
//     </>
//   )}
// </Grid>










//         </>
//       );
//     };

//     return ComponentWithLayout;
// };

// export default Applayout;





  import {
  Box,
  Button,
  Drawer,
  Grid,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import DeleteChatMenu from "../components/dialogs/DeleteChatMenu";
import Title from "../components/shared/Title";
import ChatList from "../components/specific/ChatList";
import Profile from "../components/specific/Profile";
import Header from "../layout/Header";

import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../constants/events";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { getOrSaveFromStorage } from "../lib/features";
import { useMyChatsQuery } from "../redux/api/api";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../redux/reducers/chat";
import {
  setIsDeleteMenu,
  setIsMobileMenuFriend,
  setIsSelectedDeleteChat,
} from "../redux/reducers/misc";
import { getSocket } from "../socket";
import { gradiant } from "../constants/color";

const Applayout = (WrappedComponent) => {
  const ComponentWithLayout = (props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);
    const socket = getSocket();

    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);
    const { isMobileMenuFriend } = useSelector((state) => state.misc);

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
  if (!isMobile && showProfile) {
    setShowProfile(false);
  }
}, [isMobile, showProfile]);


    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({
        key: NEW_MESSAGE_ALERT,
        value: newMessagesAlert,
      });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setIsSelectedDeleteChat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    const handleMobileClose = () => {
      dispatch(setIsMobileMenuFriend(false));
    };

    const handleProfileClick = () => {
      setShowProfile(true);
    };

    const newMessageAlertHandler = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId, dispatch]
    );

    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    // const onlineUsersListener = useCallback((ids) => {
    //   setOnlineUsers(ids);
    // }, []);

      const onlineUsersListener = useCallback((data) => {
        console.log("RAW Online Users from server:", data);  
         setOnlineUsers(data);
       }, []);

    // useEffect(() => {
    //   socket.on("ONLINE_USERS", onlineUsersListener);
    //   return () => {
    //     socket.off("ONLINE_USERS", onlineUsersListener);
    //   };
    // }, [socket, onlineUsersListener]);

          useEffect(() => {
        // Handle the ONLINE_USERS event when received from the server
        socket.on("ONLINE_USERS", (onlineUserIds) => {
          console.log("RAW Online Users from server:", onlineUserIds);
          setOnlineUsers(onlineUserIds); // Update the state with online users
        });
        return () => {
          socket.off("ONLINE_USERS");
        };
      }, [socket]);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener,
      //  [ONLINE_USERS]: onlineUsersListener,
    };

    useSocketEvents(socket, eventHandlers);

    return (
      <>
        <Title />
        <Header />
        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />

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
              onProfileClick={handleProfileClick}
              isMobile={isMobile}
            />
          </Drawer>
        )}

        <Grid container height="calc(100vh - 4rem)">
          {isMobile ? (
            <Grid item xs={12} height="100%">
              {!chatId && !showProfile ? (
                <ChatList
                  chats={data?.chats}
                  chatId={chatId}
                  handleDeleteChat={handleDeleteChat}
                  newMessagesAlert={newMessagesAlert}
                  onlineUsers={onlineUsers}
                  onProfileClick={handleProfileClick}
                  isMobile={isMobile}
                />
              ) : showProfile ? (
                <Profile user={user} />
              ) : (
                <WrappedComponent {...props} chatId={chatId} user={user} />
              )}
            </Grid>
          ) : (
            <>
              <Grid item sm={4} md={3} height="100%">
                <ChatList
                  chats={data?.chats}
                  chatId={chatId}
                  handleDeleteChat={handleDeleteChat}
                  newMessagesAlert={newMessagesAlert}
                  onlineUsers={onlineUsers}
                  isMobile={false}
                />
              </Grid>

              <Grid item sm={8} md={5} lg={6} height="100%">
                {showProfile ? (
                  <Profile user={user} />
                ) : (
                  <WrappedComponent {...props} chatId={chatId} user={user} />
                )}
              </Grid>

              <Grid
                item
                md={4}
                lg={3}
                height="100%"
                sx={{
                  display: { xs: "none", md: "block" },
                  padding: "2rem",
                   background: gradiant,
                }}
              >
                <Profile user={user} />
              </Grid>
            </>
          )}
        </Grid>
      </>
    );
  };

  return ComponentWithLayout;
};

export default Applayout;


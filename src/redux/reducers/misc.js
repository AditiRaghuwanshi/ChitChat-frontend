import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isNewGroup: false,
    isAddMember: false,
    isNotification: false,
    isMobileMenuFriend: false,
    isSearch: false,
    isFileMenu: false,
    isDeleteMenu: false,
    isEmojiMenu: false,
    uploadingLoader: false,
    selectedDeleteChat: {
        chatId: "",
        groupChat: false,
    }
};


const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers: {
        setIsNewGroup: (state, action) => {
            state.isNewGroup = action.payload;
        },
        setIsAddMember: (state, action) => {
            state.isAddMember = action.payload;
        },
        setIsNotification: (state, action) => {
            state.isNotification = action.payload;
        },
        setIsMobileMenuFriend: (state, action) => {
            state.isMobileMenuFriend = action.payload;
        },
        setIsSearch: (state, action) => {
            state.isSearch = action.payload;
        },
        setIsFileMenu: (state, action) => {
            state.isFileMenu = action.payload;
        },
        setIsEmojiIcon: (state, action) => {
            state.IsEmojiMenu = action.payload;
        },
        setIsDeleteMenu: (state, action) => {
            state.isDeleteMenu = action.payload;
        },
        setIsUploadingLoader: (state, action) => {
            state.uploadingLoader = action.payload;
        },
        setIsSelectedDeleteChat: (state, action) => {
            state.selectedDeleteChat = action.payload;
        },
    },
  
});

// export default miscSlice.reducer;
export default miscSlice;
export const {
    setIsNewGroup,
    setIsAddMember,
    setIsNotification,
    setIsMobileMenuFriend,
    setIsSearch,
    setIsFileMenu,
    setIsEmojiIcon,
    setIsDeleteMenu,
    setIsUploadingLoader,
    setIsSelectedDeleteChat
} = miscSlice.actions;




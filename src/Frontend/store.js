import { configureStore, createSlice } from '@reduxjs/toolkit';

const loadUserFromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    if (serializedUser === null) {
      return null; 
    }
    return JSON.parse(serializedUser); 
  } catch (err) {
    console.error('Error loading user from localStorage', err);
    return null;
  }
};

const saveUserToLocalStorage = (user) => {
  try {
    const serializedUser = JSON.stringify(user);
    localStorage.setItem('user', serializedUser);
  } catch (err) {
    console.error('Error saving user to localStorage', err);
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: loadUserFromLocalStorage(),
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      saveUserToLocalStorage(action.payload);
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('user'); 
    },
  },
});

export const { login, logout } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

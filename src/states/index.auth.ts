import {create} from 'zustand';

interface IAuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
}

const initialState: IAuthState = {
  isInitialized: false,
  isAuthenticated: false,
};

const useAuthStore = create<IAuthState>(() => initialState);

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import axios from 'axios';
import { LoginInputState, SignupInputState } from '@/schema/userSchema';
import { toast } from 'sonner';

const API_END_POINT = "http://localhost:3000/api/v1/user";
axios.defaults.withCredentials = true;


type UserState = {
    user: null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (input: SignupInputState) => Promise<void>;
    login: (input:LoginInputState) => Promise<void>;
    verifyEmail: (verificationCode: string) => Promise<void>;
};

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isCheckingAuth: true,
            loading: false,
            

            // Signup API
            signup: async (input: SignupInputState) => {
                try {
                    set({ loading: true });
                    const response = await axios.post(`${API_END_POINT}/signup`, input, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.data.success) {
                        console.log(response.data);
                        toast.success(response.data.message);
                        set({ loading: false, user: response.data.user, isAuthenticated: true });
                    }
                } catch (error: any) {
                    toast.error(error.response?.data?.message || "Signup failed");
                    set({ loading: false });
                }
            },
            verifyEmail: async (verificationCode: string) => {
                try {
                    set({ loading: true });
                    const response = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.data.success) {
                        toast.success(response.data.message);
                        set({ loading: false, user: response.data.user, isAuthenticated: true });
                    }
                } catch (error: any) {
                    toast.success(error.response.data.message);
                    set({ loading: false });
                }
            },
            login: async (input: LoginInputState) => {
                try {
                    set({ loading: true });
                    const response = await axios.post(`${API_END_POINT}/login`, input, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.data.success) { 
                        toast.success(response.data.message);
                        set({ loading: false, user: response.data.user, isAuthenticated: true });
                    }
                } catch (error: any) {
                    toast.error(error.response.data.message || "Login Failed!");
                    set({ loading: false });
                }
            },

        }),
        {
            name: 'user-data', // Key to store data in localStorage
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export default useUserStore;

import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


const API_END_POINT = "http://localhost:3000/api/v1/restaurant";
axios.defaults.withCredentials = true;

const useRestaurantStore= create()(
    persist(
        (set) => ({
           loading: false,
          createRestaurant: async (formData:FormData)=>{
                try {
                    set({ loading: true });
                    const response = await axios.post(`${API_END_POINT}/`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    if (response.data.success) {
                        toast.success(response.data.message);
                        set({ loading: false });
                    }
                } catch (error: any) {
                    toast.error(error.response.data.message);
                    set({ loading: false });
                }
          },
          getRestaurant: async () => {
            try {
                set({ loading: true });
                const response = await axios.get(`${API_END_POINT}/`);
                if (response.data.success) {
                    set({ loading: false, restaurant: response.data.restaurant });
                }
            } catch (error: any) {
                if (error.response.status === 404) {
                    set({ restaurant: null });
                }
                set({ loading: false });
            }
          },
          updateRestaurant: async (formData: FormData) => {
            try {
                set({ loading: true });
                const response = await axios.put(`${API_END_POINT}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.data.success) {
                    toast.success(response.data.message);
                    set({ loading: false });
                }
            } catch (error: any) {
                toast.error(error.response.data.message);
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

export default useRestaurantStore;

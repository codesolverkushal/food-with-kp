import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


interface RestaurantStore {
    loading: boolean;
    restaurant: any;
    searchedRestaurant: any;
    createRestaurant: (formData: FormData) => Promise<void>;
    getRestaurant: () => Promise<void>;
    updateRestaurant: (formData: FormData) => Promise<void>;
    searchRestaurant: (searchText: string, searchQuery: string, selectedCuisines: string[]) => Promise<void>;
  }

  const API_END_POINT = "http://localhost:3000/api/v1/restaurant";
  axios.defaults.withCredentials = true;

const useRestaurantStore= create<RestaurantStore>()(
    persist(
        (set) => ({
           loading: false,
           restaurant: null,
           searchedRestaurant: null,
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
          searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines: any) => {
            try {
                set({ loading: true });
    
                const params = new URLSearchParams();
                params.set("searchQuery", searchQuery);
                params.set("selectedCuisines", selectedCuisines.join(","));
    
                // await new Promise((resolve) => setTimeout(resolve, 2000));
                const response = await axios.get(`${API_END_POINT}/search/${searchText}?${params.toString()}`);
                if (response.data.success) {
                    set({ loading: false, searchedRestaurant: response.data });
                }
            } catch (error) {
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

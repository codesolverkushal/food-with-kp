import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type MenuItem = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}
export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: number;
    cuisines: string[];
    menus: MenuItem[];
    imageUrl: string;
}

export type SearchedRestaurant = {
    data:Restaurant[]
}



interface RestaurantStore {
    loading: boolean;
    restaurant: Restaurant | null;
    searchedRestaurant: SearchedRestaurant | null;
    createRestaurant: (formData: FormData) => Promise<void>;
    getRestaurant: () => Promise<void>;
    updateRestaurant: (formData: FormData) => Promise<void>;
    searchRestaurant: (searchText: string, searchQuery: string, selectedCuisines: string[]) => Promise<void>;
    addMenuToRestaurant: (menu: MenuItem) => void;
    updateMenuToRestaurant: (updatedMenu: MenuItem) => void;
    setAppliedFilter: (value: string) => void;
    resetAppliedFilter: () => void;
    appliedFilter: string[],
}


const API_END_POINT = "http://localhost:3000/api/v1/restaurant";
axios.defaults.withCredentials = true;

export const useRestaurantStore = create<RestaurantStore>()(
    persist(
        (set) => ({
            loading: false,
            restaurant: null,
            searchedRestaurant: null,
            appliedFilter: [],
            createRestaurant: async (formData: FormData) => {
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
            addMenuToRestaurant: (menu: MenuItem) => {
                set((state: any) => ({
                    restaurant: state.restaurant ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] } : null,
                }))

            },
            updateMenuToRestaurant:  (updatedMenu: MenuItem) => {
                set((state: any) => {

                    if (state.restaurant) {
                        const updatedMenuList = state.restaurant.menus.map((menu: any) => menu._id === updatedMenu._id ? updatedMenu : menu);
                        return {
                            restaurant: {
                                ...state.restaurant,
                                menus: updatedMenuList
                            }
                        }
                    }
                    // if state.restaruant is undefined then return state
                    return state;
                })
            },
            setAppliedFilter: (value: string) => {
                set((state) => {
                    const isAlreadyApplied = state.appliedFilter.includes(value);
                    const updatedFilter = isAlreadyApplied ? state.appliedFilter.filter((item) => item !== value) : [...state.appliedFilter, value];
                    return { appliedFilter: updatedFilter }
                })
            },
            resetAppliedFilter: () => {
                set({ appliedFilter: [] })
            },


        }),
        {
            name: 'user-data', // Key to store data in localStorage
            storage: createJSONStorage(() => localStorage)
        }
    )
);



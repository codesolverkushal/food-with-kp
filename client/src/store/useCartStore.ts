import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

const useCartStore = create(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state:any) => ({ count: state.count + 1 })),
        decrement: () => set((state:any) => ({ count: state.count - 1 })),
      }),
      {
        name: 'counter-store', // Key to store data in localStorage
        storage: createJSONStorage(()=> localStorage)
      }
    )
  );
  
export default useCartStore;
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import menuData from '../data/menu.json';

export const useStopListStore = create(
    persist(
        (set, get) => ({
            menu: menuData,
            stopList: [],
            search: '',
            category: 'all',
            activeItemId: null,

            setSearch: (search) => set({ search }),
            setCategory: (category) => set({ category }),

            openForm: (itemId) => set({ activeItemId: itemId }),
            closeForm: () => set({ activeItemId: null }),

            isInStopList: (itemId) => get().stopList.some((e) => e.itemId === itemId),

            addToStopList: ({ itemId, reason, comment, returnAt }) => {
                if (get().isInStopList(itemId)) return false;
                set((state) => ({
                    stopList: [
                        ...state.stopList,
                        {
                            itemId,
                            reason,
                            comment: comment.trim(),
                            returnAt,
                            createAt: new Date().toISOString(),
                        },
                    ],
                    activeItemId: null,
                }));
                return true;
            },

            returnToMenu: (itemId) => 
                set((state) => ({
                    stopList: state.stopList.filter((e) => e.itemId !== itemId),
                })),
        }),
        {
            name: 'restaurant-stop-list',
            partialize: (state) => ({ stopList: state.stopList }),
        }
    )
);
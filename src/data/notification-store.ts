import { create } from "zustand";

import { notifications, type NotificationItem } from "@/data";

type NotificationStore = {
  items: NotificationItem[];
  setRead: (id: string, unread: boolean) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
};

const useNotificationStore = create<NotificationStore>((set) => ({
  items: notifications,
  setRead: (id, unread) => set((state) => ({
    items: state.items.map((item) => item.id === id ? { ...item, unread } : item),
  })),
  markAllRead: () => set((state) => ({
    items: state.items.map((item) => ({ ...item, unread: false })),
  })),
  remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));

export { useNotificationStore };

import { create } from 'zustand';
import { mockUsers } from '@/components/location/mockusers';

export interface Tag {
  text: string;
  color: string;
}

export interface User {
  id: number;
  nickName: string;
  role: string;
  career: string;
  introduction: string;
  tags: Tag[];
  image: string;
  latitude?: number;
  longitude?: number;
}

interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;

  latitude: number | null;
  longitude: number | null;
  setUserLocation: (lat: number, lng: number) => void;

  myProfileImage: string | null;
  setMyProfileImage: (img: string) => void;

  selectedByMapPin: number | null;
  setSelectedByMapPin: (id: number | null) => void;
  resetSelectedByMapPin: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: mockUsers,
  setUsers: (users) => set({ users }),
  latitude: null,
  longitude: null,
  setUserLocation: (lat, lng) => set({ latitude: lat, longitude: lng }),

  myProfileImage: null,
  setMyProfileImage: (img) => set({ myProfileImage: img }),

  selectedByMapPin: null,
  setSelectedByMapPin: (id) => set({ selectedByMapPin: id }),

  resetSelectedByMapPin: () => set({ selectedByMapPin: null }),
}));

import { create } from "zustand";
import { api } from "@/lib/axios";
import toast from "react-hot-toast"
import { AxiosError } from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  authProvider: "local" | "google" | "github";
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}
interface UpdateProfileData{
   name: string;
  password: string;
  profilePic:string,

}

interface AuthStore {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isAuthenticated: boolean;
  isUpdatingProfile:boolean;

  isCheckingAuth: boolean;

  checkAuth: () => void;
  register: (data: RegisterData) => void;
  logIn: (data: LoginData) => void;
  logout: () => void;
  updateProfile:(data: UpdateProfileData)=> void;
}

export const useAuthStore = create< AuthStore >((set) => ({
  authUser: null,
  isAuthenticated: false,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await api.get("/auth/check");

      set({ authUser: res.data, isAuthenticated: true });
    } catch (error) {
      console.error("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (data: RegisterData) => {
    set({ isSigningUp: true })
    try {
      const res = await api.post("/auth/register", data);
      set({ authUser: res.data, isAuthenticated:true });

      toast.success("Account Created Successfully");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  logIn: async (data: LoginData) => {
    set({ isLoggingIn: true });
    try {
      const res = await api.post("/auth/login", data);
      set({ authUser: res.data.user });
      
      toast.success(`Logged in as ${res.data.name}`);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ authUser: null, isAuthenticated: false });

      toast.success("Logged out successfully");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  },

  updateProfile: async (data: UpdateProfileData)=>{
  set({ isUpdatingProfile: true });
    try {
      const res = await api.put("/auth/update-profile", data);
      set({ authUser: res.data.user });
      
      toast.success(`updated profile completed`);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  }
}))
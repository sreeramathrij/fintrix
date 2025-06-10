import { create } from "zustand";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

// Category model
interface Category {
  _id: string;
  name: string;
  type: "income" | "expense";
  picture: string;
  createdBy: string | null;
}

// Payload for creating a category
interface CategoryData {
  name: string;
  referenceCategoryId: string;
  type: "income" | "expense"; // Fixed incorrect "string" type
}

// Zustand store interface
interface CategoryStore {
  categories: Category[] | null;
  getCategories: () => Promise<void>;
  addCategories: (data: CategoryData) => Promise<void>;
}

// Zustand store definition
export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: null,

  // Fetch all categories
  getCategories: async () => {
    try {
      const response = await api.get("/category");
      set({ categories: response.data.data });
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching categories:", axiosError);
      toast.error("Failed to fetch categories");
    }
  },

  // Add a new category
  addCategories: async (data: CategoryData) => {
    try {
      const response = await api.post("/category", data);
      const newCategory = response.data.data;
      set((state) => ({
        categories: state.categories
          ? [...state.categories, newCategory]
          : [newCategory],
      }));
      toast.success("Category added successfully");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error adding category:", axiosError);
      toast.error("Failed to add category");
      throw error;
    }
  },
}));

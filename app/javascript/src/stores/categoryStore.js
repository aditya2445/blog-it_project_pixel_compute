import { create } from "zustand";

const useCategoryStore = create(set => ({
  selectedCategories: [],
  toggleCategory: category =>
    set(state => {
      const isSelected = state.selectedCategories.includes(category);

      return {
        selectedCategories: isSelected
          ? state.selectedCategories.filter(cat => cat !== category)
          : [...state.selectedCategories, category],
      };
    }),
}));

export default useCategoryStore;

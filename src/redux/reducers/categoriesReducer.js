const initialState = {
   start: false,
   success: false,
   categories: [],
   fail: false,
   errorMessage: "",
};

const categoriesReducer = (state = initialState, action) => {
   switch (action.type) {
      case "FETCH_CATEGORİES_START":
         return {
            ...state,
            start: true,
         };
      case "FETCH_CATEGORİES_SUCCESS":
         return {
            ...state,
            start: false,
            success: true,
            categories: action.payload,
         };
      case "FETCH_CATEGORİES_FAIL":
         return {
            ...state,
            start: false,
            fail: true,
            errorMessage: action.payload,
         };
      case "ADD_CATEGORY":
         return {
            ...state,
            categories: [...state.categories, action.payload],
         };
      case "DELETE_CATEGORY":
         const filteredCategories = state.categories.filter(
            (item) => item.id !== action.payload
         );
         return {
            ...state,
            categories: filteredCategories,
         };

      case "EDIT_CATEGORY":
         const filteredCategoriesEdit = state.categories.filter(
            (item) => item.id !== action.payload.id
         );
         return {
            ...state,
            categories: [...filteredCategoriesEdit, action.payload],
         };

      default:
         return state;
   }
};

export default categoriesReducer;

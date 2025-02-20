// import { useState, useEffect } from "react";
// import categoryService, { CategoryForViews } from "../services/categoryService";
// import Swal from "sweetalert2";

// const useCategory = () => {
//     const [categories, setCategories] = useState<CategoryForViews[]>([]);
//     const [category, setCategory] = useState<CategoryForViews>({} as CategoryForViews);
//     const [currentData, setCurrentData] = useState<CategoryForViews>({} as CategoryForViews);
//     const [isOpen, setIsOpen] = useState(false);
//     const [isOpenAdd, setIsOpenAdd] = useState(false);

//     useEffect(() => {
//         loadData();
//     }, []);

//     const loadData = () => {
//         categoryService.getAll()
//             .then((res) => {
//                 if (Array.isArray(res.categories)) {
//                     setCategories(res.categories);
//                 } else {
//                     console.error("API did not return an array:", res);
//                     setCategories([]);
//                 }
//             })
//             .catch(error => {
//                 console.error("Error loading categories:", error);
//                 setCategories([]);
//             });
//     };

//     const addCategory = () => {
//         categoryService.create(category)
//             .then(() => {
//                 Swal.fire("Success", "Category added successfully", "success");
//                 loadData();
//                 onCloseAdd();
//             })
//             .catch((err) => {
//                 console.error("Error adding category:", err);
//                 Swal.fire("Error", "Failed to add category", "error");
//             });
//     };

//     const deleteCategory = (id: string) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#d33",
//             cancelButtonColor: "#3085d6",
//             confirmButtonText: "Yes, delete it!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 categoryService.remove(id)
//                     .then(() => {
//                         Swal.fire("Deleted!", "Your category has been deleted.", "success");
//                         loadData();
//                     })
//                     .catch((err) => {
//                         console.error("Error deleting category:", err);
//                         Swal.fire("Error!", "Failed to delete category. Please try again.", "error");
//                     });
//             }
//         });
//     };

//     const getCategory = (id: string) => {
//         categoryService.getById(id)
//             .then((res) => {
//                 setCurrentData(res);
//                 onOpen();
//             })
//             .catch((err) => {
//                 console.error("Error fetching category:", err);
//             });
//     };

//     const onOpen = () => setIsOpen(true);
//     const onClose = () => setIsOpen(false);
//     const onOpenAdd = () => setIsOpenAdd(true);
//     const onCloseAdd = () => setIsOpenAdd(false);

//     return {
//         categories,
//         category,
//         setCategory,
//         currentData,
//         isOpen,
//         isOpenAdd,
//         onCloseAdd,
//         onOpenAdd,
//         onClose,
//         onOpen,
//         addCategory,
//         deleteCategory,
//         getCategory
//     };
// };

// export default useCategory;

import axios from "axios";
import { notification } from 'antd';
export const fetchCategories = async (setCategories) => {
    try {
      const response = await axios.get('http://localhost:8099/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
};
export const deleteCategory = async(id, categories, setCategories,) => {
    try {
        await axios.delete(`http://localhost:8099/api/categories/${id}`);
        setCategories(categories.filter(category => category.id !== id));
        notification.success({
            message: 'Delete Success',
            description: 'Product deleted successfully.'
        });
    } catch (error) {
        console.error('There was an error deleting the category!', error);
    }
}
export const fetchCategoryById = async(id, form) => {
    try {
        const response = await axios.get(`http://localhost:8099/api/categories/${id}`);
        form.setFieldsValue(response.data);
    } catch (error) {
        console.error('There was an error fetching the category!', error);
        notification.error({
            message: 'Error',
            description: 'There was an error fetching the category.',
        });
    }
}
export const updateCategory = async(id, values, setLoading,navigate) => {
    setLoading(true);
    try {
        await axios.put(`http://localhost:8099/api/categories/${id}`, values);
        notification.success({
            message: 'Success',
            description: 'Category updated successfully.',
        });
        navigate('/admin/categories');
    } catch (error) {
        console.error('There was an error updating the category!', error);
        notification.error({
            message: 'Error',
            description: 'There was an error updating the category.',
        });
    } finally {
        setLoading(false);
    }
}
export const createCategory = async(values, navigate) => {
    try {
        await axios.post('http://localhost:8099/api/categories/create', values);
        navigate('/admin/categories');
        notification.success({
            message: 'Success',
            description: 'Category updated successfully.',
        });
    } catch (error) {
        console.error('There was an error creating the category!', error);
        // Xử lý thông báo lỗi tại đây nếu cần
    }
}
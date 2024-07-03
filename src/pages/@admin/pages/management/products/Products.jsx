import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Space } from 'antd';
import DeleteModal from '../../../components/DeleteConfirm';
import { deleteProduct, fetchProducts } from '../../../../../services/ProductController';
const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [IdproductDelete, setProducIdToDelete] = useState(null);

    useEffect(() => {
        fetchProducts(setProducts);
    }, []);

    

    const showModal = (id) => {
        setProducIdToDelete(id);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        deleteProduct(IdproductDelete,setProducts,products);
        setIsModalOpen(false);
        setProducIdToDelete(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setProducIdToDelete(null);
    };


    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (text, record) => (
                <img
                    src={`http://localhost:8099${record.imageUrl}`}
                    alt={record.name}
                    style={{ width: '50px', height: '50px' }}
                />
            )
        },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Category', dataIndex: ['category', 'name'], key: 'category' },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => navigate(`/admin/products/update/${record.id}`)}>Edit</Button>
                    <Button type="danger" onClick={() => showModal(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary"><Link to="/admin/products/create">Create</Link></Button>
            <Table columns={columns} dataSource={products} rowKey="id" />
            <DeleteModal
                show={isModalOpen}
                onCancel={handleCancel}
                onConfirm={handleOk}
            />
        </div>
    );
};

export default Products;

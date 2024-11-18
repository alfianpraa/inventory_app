import React, { useState } from 'react';
import { Table, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';

const Inventory = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', quantity: 10, price: 100 },
    { id: 2, name: 'Product 2', quantity: 20, price: 150 },
    { id: 3, name: 'Product 3', quantity: 5, price: 200 }
  ]);

  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if we're editing
  const [selectedProduct, setSelectedProduct] = useState({ id: '', name: '', quantity: '', price: '' });

  const [searchQuery, setSearchQuery] = useState('');

  const handleClose = () => {
    setShow(false);
    setSelectedProduct({ id: '', name: '', quantity: '', price: '' });
  };

  const handleShow = (product = null) => {
    if (product) {
      setIsEditing(true);
      setSelectedProduct(product);
    } else {
      setIsEditing(false);
      setSelectedProduct({ id: '', name: '', quantity: '', price: '' });
    }
    setShow(true);
  };

  const handleSaveProduct = () => {
    if (isEditing) {
      setProducts(
        products.map((product) =>
          product.id === selectedProduct.id ? selectedProduct : product
        )
      );
    } else {
      setProducts([
        ...products,
        { ...selectedProduct, id: products.length + 1 }
      ]);
    }
    handleClose();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-center mb-4">Product Inventory</h2>

      {/* Search Bar */}
      <InputGroup className="mb-4">
        <InputGroup.Text>🔍</InputGroup.Text>
        <FormControl
          type="text"
          placeholder="Search by Product Name"
          value={searchQuery}
          onChange={handleSearch}
        />
      </InputGroup>

      {/* Add Product Button */}
      <Button variant="success" onClick={() => handleShow()}>
        Add Product
      </Button>

      {/* Product Table */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow(product)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit Product */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={selectedProduct.name}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="productQuantity" className="mt-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={selectedProduct.quantity}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, quantity: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="productPrice" className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={selectedProduct.price}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveProduct}>
            Save Product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Inventory;

import React, { useState } from 'react';
import { Table, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';

const ProductPage = () => {
  const defaultImageUrl = 'https://via.placeholder.com/150'; // Default image URL

  const [products, setProducts] = useState([
    { id: 1, name: 'Bupena Tema 5 Pengalamanku', Kategori: 'Buku SD', Stok: 150, Gambar: [], price: 500000 },
    { id: 2, name: 'Bupena Tema 6 Lingkunganku', Kategori: 'Buku SD', Stok: 157, Gambar: [], price: 500000 },
    { id: 3, name: 'PJOK', Kategori: 'Buku SMP', Stok: 93, Gambar: [], price: 55000 },
    { id: 4, name: 'Mandiri Bahasa Indonesia', Kategori: 'Buku SMP', Stok: 100, Gambar: [], price: 55000 },
    { id: 5, name: 'Mandiri Kimia', Kategori: 'Buku SMA', Stok: 110, Gambar: [], price: 75000 },
    { id: 6, name: 'Mandiri Fisika', Kategori: 'Buku SMA', Stok: 105, Gambar: [], price: 75000 }
  ]);

  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({ id: '', name: '', Kategori: '', Stok: '', Gambar: [], price: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle the image file input change
  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        setSelectedProduct((prevProduct) => ({
          ...prevProduct,
          Gambar: newImages
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setShow(false);
    setSelectedProduct({ id: '', name: '', Kategori: '', Stok: '', Gambar: [], price: '' });
  };

  const handleShow = (product = null) => {
    if (product) {
      setIsEditing(true);
      setSelectedProduct(product);
    } else {
      setIsEditing(false);
      setSelectedProduct({ id: '', name: '', Kategori: '', Stok: '', Gambar: [], price: '' });
    }
    setShow(true);
  };

  const handleSaveProduct = () => {
    if (selectedProduct.Gambar.length < 3) {
      alert('Please upload at least 3 images.');
      return;
    }

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
    <div className="dashboard-welcome">
      <h2>Produk Inventory </h2>
      <hr className="dashboard-divider" />
    </div>
   
     

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
            <th>Kategori</th>
            <th>Stok</th>
            <th>Gambar</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.Kategori}</td>
              <td>{product.Stok}</td>
              <td>
                {product.Gambar.length > 0 ? (
                  product.Gambar.map((img, index) => (
                    <img key={index} src={img} alt={`Product ${product.name} - ${index}`} style={{ width: '100px', marginRight: '5px' }} />
                  ))
                ) : (
                  <img src={defaultImageUrl} alt="Default" style={{ width: '100px' }} />
                )}
              </td>
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
            <Form.Group controlId="productKategori" className="mt-3">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Kategori"
                value={selectedProduct.Kategori}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, Kategori: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="productStok" className="mt-3">
              <Form.Label>Stok</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Stok"
                value={selectedProduct.Kategori}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, Kategori: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="productGambar" className="mt-3">
              <Form.Label>Gambar (Minimum 3 images)</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleImageChange}
              />
              {selectedProduct.Gambar.length > 0 && (
                <div className="mt-3">
                  {selectedProduct.Gambar.map((img, index) => (
                    <img key={index} src={img} alt={`preview-${index}`} style={{ width: '100px', marginRight: '5px' }} />
                  ))}
                </div>
              )}
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

export default ProductPage;

import React, { useState } from 'react';
import { Table, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Dash = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Buku SD' },
    { id: 2, name: 'Buku SMP' },
    { id: 3, name: 'Buku SMA' },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Bupena Tema 5 Pengalamanku', Kategori: 'Buku SD', Stok: 150, price: 500000 },
    { id: 2, name: 'Bupena Tema 6 Lingkunganku', Kategori: 'Buku SD', Stok: 157, price: 500000 },
    { id: 3, name: 'PJOK', Kategori: 'Buku SMP', Stok: 93, price: 55000 },
    { id: 4, name: 'Mandiri Bahasa Indonesia', Kategori: 'Buku SMP', Stok: 100, price: 55000 },
    { id: 5, name: 'Mandiri Kimia', Kategori: 'Buku SMA', Stok: 110, price: 75000 },
    { id: 6, name: 'Mandiri Fisika', Kategori: 'Buku SMA', Stok: 105, price: 75000 }
  ]);

  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({ name: '', category: '', stock: '', price: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleShow = (product = null) => {
    setSelectedProduct(product || { name: '', category: '', stock: '', price: '' });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSaveProduct = () => {
    setProducts([
      ...products,
      { ...selectedProduct, id: products.length + 1 }
    ]);
    handleClose();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const chartData = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        label: 'Jumlah Stok',
        data: categories.map((category) => {
          return products
            .filter(product => product.Kategori === category.name)
            .reduce((acc, curr) => acc + curr.Stok, 0);
        }),
        backgroundColor: 'rgb(8, 194, 255)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <div className="dashboard-welcome">
        <h2>Hi, Admin ! </h2>
        <h3>Selamat datang di Dashboard Erlangga! </h3>
        <p>Temukan berbagai produk dan kelola stok serta informasi harga dengan mudah di sini.</p>
        <hr className="dashboard-divider" />
        <h2>Dashboard Produk</h2>
      </div>

      <InputGroup className="mb-4">
        <InputGroup.Text>🔍</InputGroup.Text>
        <FormControl
          type="text"
          placeholder="Cari Produk"
          value={searchQuery}
          onChange={handleSearch}
        />
      </InputGroup>
      <div className="mb-4">
        <Bar data={chartData} />
      </div>
      <Table striped bordered hover className="custom-table">
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Kategori</th>
            <th>Stok</th>
            <th>Harga</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.Kategori}</td>
              <td>{product.Stok}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct.id ? 'Edit Produk' : 'Tambah Produk'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Nama Produk</Form.Label>
              <Form.Control
                type="text"
                value={selectedProduct.name}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="productCategory" className="mt-3">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                as="select"
                value={selectedProduct.category}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
              >
                <option value="">Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="productStock" className="mt-3">
              <Form.Label>Stok</Form.Label>
              <Form.Control
                type="number"
                value={selectedProduct.stock}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="productPrice" className="mt-3">
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type="number"
                value={selectedProduct.price}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Batal</Button>
          <Button variant="primary" onClick={handleSaveProduct}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dash;

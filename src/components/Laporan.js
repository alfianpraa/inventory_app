import React, { useState } from 'react';
import { Table, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { jsPDF } from 'jspdf';  // Import jsPDF
import 'jspdf-autotable';       // Import autoTable plugin

const Laporan = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Bupena Tema 5 Pengalamanku', Kategori: 'Buku SD', Stok: 150, price: 500000 },
    { id: 2, name: 'Bupena Tema 6 Lingkunganku', Kategori: 'Buku SD', Stok: 157, price: 500000 },
    { id: 3, name: 'PJOK', Kategori: 'Buku SMP', Stok: 93, price: 55000 },
    { id: 4, name: 'Mandiri Bahasa Indonesia', Kategori: 'Buku SMP', Stok: 100, price: 55000 },
    { id: 5, name: 'Mandiri Kimia', Kategori: 'Buku SMA', Stok: 110, price: 75000 },
    { id: 6, name: 'Mandiri Fisika', Kategori: 'Buku SMA', Stok: 105, price: 75000 }
  ]);

  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({ id: '', name: '', Kategori: '', Stok: '', price: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleClose = () => {
    setShow(false);
    setSelectedProduct({ id: '', name: '', Kategori: '', Stok: '', price: '' });
  };

  const handleSaveProduct = () => {
    setProducts([...products, { ...selectedProduct, id: products.length + 1 }]);
    handleClose();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to generate the PDF report with a table
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Product Report', 14, 16); // Title

    // Define table column titles and data rows
    const columns = ["Name", "Kategori", "Stok", "Price"];
    const rows = filteredProducts.map(product => [
      product.name, product.Kategori, product.Stok, product.price
    ]);

    // Add table to PDF
    doc.autoTable({
      startY: 30,            // Starting y position for the table
      head: [columns],       // Table column headers
      body: rows             // Table data
    });

    // Save the generated PDF
    doc.save('product_report.pdf');
  };

  return (
    <div>
    <div className="dashboard-welcome">
      <h2>Laporan </h2>
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

      {/* PDF Report Button */}
      <Button variant="primary" onClick={generatePDF}>Generate Report (PDF)</Button>

      {/* Product Table */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Kategori</th>
            <th>Stok</th>
            <th>Price</th>
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

      {/* Modal for Add Product */}
      <Modal show={show} onHide={handleClose}>
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
                value={selectedProduct.Stok}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, Stok: e.target.value })}
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

export default Laporan;

import React, { useState } from 'react';
import { Table, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';

const CategoryPage = ({ onCategorySelect }) => {
  // Initializing with default categories
  const [categories, setCategories] = useState([
    { id: 1, name: 'Buku SD' },
    { id: 2, name: 'Buku SMP' },
    { id: 3, name: 'Buku SMA' },
  ]);
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ id: '', name: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleClose = () => {
    setShow(false);
    setSelectedCategory({ id: '', name: '' });
  };

  const handleShow = (category = null) => {
    if (category) {
      setIsEditing(true);
      setSelectedCategory(category);
    } else {
      setIsEditing(false);
      setSelectedCategory({ id: '', name: '' });
    }
    setShow(true);
  };

  const handleSaveCategory = () => {
    if (isEditing) {
      setCategories(
        categories.map((category) =>
          category.id === selectedCategory.id ? selectedCategory : category
        )
      );
    } else {
      setCategories([ 
        ...categories,
        { ...selectedCategory, id: categories.length + 1 }
      ]);
    }
    handleClose();
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
    <div className="dashboard-welcome">
      <h2>Kategori Produk </h2>
      <hr className="dashboard-divider" />
    </div>
   
      

      {/* Search Bar */}
      <InputGroup className="mb-4">
        <InputGroup.Text>🔍</InputGroup.Text>
        <FormControl
          type="text"
          placeholder="Cari Kategori"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      {/* Add Category Button */}
      <button type="button" class="custom-add-category-btn btn btn-success">
    Tambah Kategori
</button>


      {/* Category Table */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category) => (
            <tr key={category.id}>
              <td onClick={() => onCategorySelect(category)} style={{ cursor: 'pointer' }}>
                {category.name}
              </td>
              <td>
                <Button variant="warning" onClick={() => handleShow(category)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteCategory(category.id)}>Hapus</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit Category */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Kategori' : 'Tambah Kategori'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="categoryName">
              <Form.Label>Nama Kategori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama Kategori"
                value={selectedCategory.name}
                onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Batal</Button>
          <Button variant="primary" onClick={handleSaveCategory}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoryPage;

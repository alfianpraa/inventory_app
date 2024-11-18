<?php
class InventoryModel extends CI_Model {
    public function getProducts() {
        return $this->db->get('products')->result();
    }
    
    public function addProduct($data) {
        return $this->db->insert('products', $data);
    }
    
    public function updateProduct($id, $data) {
        return $this->db->where('id', $id)->update('products', $data);
    }

    public function deleteProduct($id) {
        return $this->db->where('id', $id)->delete('products');
    }
}

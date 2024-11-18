<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

class InventoryController extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model('InventoryModel');
    }

    public function products() {
        echo json_encode($this->InventoryModel->getProducts());
    }

    public function addProduct() {
        $data = json_decode(file_get_contents("php://input"), true);
        $this->InventoryModel->addProduct($data);
        echo json_encode(["message" => "Product added successfully"]);
    }

    public function updateProduct($id) {
        $data = json_decode(file_get_contents("php://input"), true);
        $this->InventoryModel->updateProduct($id, $data);
        echo json_encode(["message" => "Product updated successfully"]);
    }

    public function deleteProduct($id) {
        $this->InventoryModel->deleteProduct($id);
        echo json_encode(["message" => "Product deleted successfully"]);
    }
}

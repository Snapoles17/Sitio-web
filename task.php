<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gestion_tareas";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Manejar las peticiones
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM tasks";
    $result = $conn->query($sql);

    $tasks = array();
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }

    echo json_encode($tasks);

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $text = $data['text'];

    $sql = "INSERT INTO tasks (text) VALUES ('$text')";
    if ($conn->query($sql) === TRUE) {
        $id = $conn->insert_id;
        echo json_encode(array('id' => $id, 'text' => $text));
    } else {
        echo json_encode(array('error' => $conn->error));
    }

} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];

    $sql = "DELETE FROM tasks WHERE id = $id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array('id' => $id));
    } else {
        echo json_encode(array('error' => $conn->error));
    }
}

$conn->close();
?>

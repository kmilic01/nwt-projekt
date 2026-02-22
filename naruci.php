<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Dohvati JSON košarice iz POST zahtjeva
    $narudzbaJson = $_POST['narudzba'] ?? '';
    $narudzbaArray = json_decode($narudzbaJson, true);

    if ($narudzbaArray) {
        // Generiraj slučajni broj narudžbe (6 znamenki)
        $brojNarudzbe = rand(100000, 999999);

        // Otvori datoteku za dodavanje narudžbi
        $file = fopen("narudzbe.txt", "a");

        // Zapiši broj narudžbe
        fwrite($file, "=== Narudžba broj: {$brojNarudzbe} ===\n");

        // Zapiši svaku stavku iz košarice
        foreach ($narudzbaArray as $item) {
            fwrite($file, "Pizza: {$item['name']} | Količina: {$item['quantity']} | Cijena: {$item['price']}\n");
        }

        // Razdjelnik za lakše čitanje
        fwrite($file, "========================\n\n");

        // Zatvori datoteku
        fclose($file);

        // Prikaz poruke korisniku
        echo "<h2>Narudžba poslana! Hvala!</h2>";
        echo "<p>Vaš broj narudžbe: <strong>{$brojNarudzbe}</strong></p>";
        echo "<a href='sem.html'>Povratak na stranicu</a>";
    } else {
        // Ako je košarica prazna
        echo "<h2>Košarica je prazna!</h2>";
        echo "<a href='sem.html'>Povratak na stranicu</a>";
    }
}
?>
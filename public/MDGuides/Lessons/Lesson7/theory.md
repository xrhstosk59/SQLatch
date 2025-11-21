## MIN / MAX / AVG / SUM / COUNT

Στην SQL, οι συναρτήσεις <span style="color:coral">
   **MIN**</span>, <span style="color:coral">
   **MAX**</span>, <span style="color:coral">
   **AVG**</span>, <span style="color:coral">
   **SUM**</span>, και <span style="color:coral">
   **COUNT**</span> χρησιμοποιούνται για τον υπολογισμό συγκεκριμένων στατιστικών στοιχείων για μια στήλη ή ένα σύνολο δεδομένων σε έναν πίνακα και έχουν παρόμοια δομή και εφαρμόζονται σε στήλες με πεδία αριθμητικών δεδομένων, με εξαίρεση την <span style="color:coral">
   **COUNT**</span> η οποία μπορεί να εφαρμοστεί παντού.
Αυτές οι συναρτήσεις είναι χρήσιμες για την εξαγωγή στατιστικών πληροφοριών από μια βάση δεδομένων.

Πιο συγκεκριμένα, οι <span style="color:coral">
   **MIN**</span> / <span style="color:coral">
   **MAX**</span> επιστρέφουν την ελάχιστη / μέγιστη τιμή σε μία στήλη της επιλογής μας.

Η <span style="color:coral">
   **AVG**</span> επιστρέφει τον μέσο όρο των τιμών μίας στήλης ενώ η <span style="color:coral">
   **SUM**</span> το άθροισμα των τιμών της.

Τέλος, η <span style="color:coral">
   **COUNT**</span> επιστρέφει το άθροισμα των καταχωρημένων εγγραφών στην στήλη επιλογής.

Η δομή τους είναι ως εξής:
* SELECT <span style="color:aquamarine">
   **MIN**</span> / <span style="color:aquamarine">
   **MAX**</span> / <span style="color:aquamarine">
   **AVG**</span> / <span style="color:aquamarine">
   **SUM**</span> / <span style="color:aquamarine">
   **COUNT**</span> (column\_name)
FROM table\_name;

**Παραδείγματα:**
* SELECT <span style="color:aquamarine">
   **MIN**</span>(salary) FROM employees;

![Screenshot](MDGuides/Lessons/Lesson7/images/first.png)

* SELECT <span style="color:aquamarine">
   **MAX**</span>(salary) FROM employees;


![Screenshot](MDGuides/Lessons/Lesson7/images/second.png)

* SELECT <span style="color:aquamarine">
   **AVG**</span>(salary) FROM employees;

![Screenshot](MDGuides/Lessons/Lesson7/images/third.png)

* SELECT <span style="color:aquamarine">
   **SUM**</span>(salary) FROM employees;

![Screenshot](MDGuides/Lessons/Lesson7/images/fourth.png)

* SELECT <span style="color:aquamarine">
   **COUNT**</span>(*) FROM employees;

![Screenshot](MDGuides/Lessons/Lesson7/images/fifth.png)

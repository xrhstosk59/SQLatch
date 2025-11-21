## GROUP BY

Η εντολή <span style="color:coral">
   **GROUP BY**</span> στην SQL χρησιμοποιείται για ομαδοποίηση των αποτελεσμάτων μιας επερώτησης (query), βάσει της τιμής μιας ή περισσότερων στηλών. Για την χρήση της απαιτεί την εφαρμογή συγκεντρωτικών συναρτήσεων (aggregate functions) όπως το <span style="color:coral">
   **SUM**</span>, το <span style="color:coral">
   **COUNT**</span>, το <span style="color:coral">
   **AVG**</span>, κ.ά., πάνω σε κάθε ομάδα αποτελεσμάτων.

Η δομή της συντάσσεται ως εξής:
* SELECT column1, column2, **aggregate_function**(column3)
FROM table
<span style="color:aquamarine">
   **GROUP BY**</span> column1, column2;

**Παράδειγμα:**
* SELECT salary, <span style="color:aquamarine">
   **COUNT**</span>(salary) FROM employees <span style="color:aquamarine">
   **GROUP BY**</span> salary;

![Screenshot](MDGuides/Lessons/Lesson9/images/first.png)

Πολλές φορές η <span style="color:coral">
   **GROUP BY**</span> χρησιμοποιει την εντολή <span style="color:coral">
   **HAVING**</span> η οποία χρησιμοποιείται για το φιλτράρισμα των αποτελεσμάτων βάσει των συναρτήσεων συγκέντρωσης (aggregate functions). Προσφέρει τη δυνατότητα να εφαρμόσετε περαιτέρω περιορισμούς στα γκρουπ που έχουν δημιουργηθεί από την εντολή <span style="color:coral">
   **GROUP BY**</span>, αποκλείοντας ομάδες που δεν πληρούν συγκεκριμένα κριτήρια.

Η σύνταξή της είναι παρόμοια με την <span style="color:coral">
   **WHERE**</span>, αλλά η <span style="color:coral">
   **HAVING**</span> εφαρμόζεται σε επίπεδο γκρουπ, όχι σε επίπεδο επιμέρους εγγραφών.

**Παράδειγμα:**

* SELECT salary, <span style="color:aquamarine">
   **COUNT**</span>(salary) FROM employees <span style="color:aquamarine">
   **GROUP BY**</span> salary <span style="color:aquamarine">
   **HAVING**</span> salary>800;

![Screenshot](MDGuides/Lessons/Lesson9/images/second.png)

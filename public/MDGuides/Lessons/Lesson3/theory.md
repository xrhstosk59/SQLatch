## 3. INSERT INTO

Η εντολή <span style="color:coral">
 INSERT INTO
 </span> χρησιμοποιείται για την εισαγωγή δεδομένων σε πίνακα. Αρχικά, καθορίζουμε το όνομα του πίνακα στον οποίο θέλουμε να εισάγουμε δεδομένα. Στη συνέχεια, προσθέτουμε μια λίστα τιμών διαχωρισμένων με κόμματα, εντός παρενθέσεων χρησιμοποιώντας τη λέξη <span style="color:aquamarine">
 VALUES
 </span>. Ο αριθμός των τιμών στη λίστα τιμών πρέπει να είναι ίδιος με τον αριθμό των στηλών στον πίνακα που θέλουμε να εισάγουμε τα δεδομένα και ο τύπος των τιμών που εισάγουμε θα πρέπει να αντιστοιχεί στον τύπο τιμών της ανάλογης στήλης του πίνακα.

Η <span style="color:coral">
 INSERT INTO
 </span> έχει την ακόλουθη δομή:

* <span style="color:aquamarine">
 INSERT INTO
 </span> table_name <span style="color:aquamarine">
 VALUES
 </span> (value1, value2, value3, ...);

**Παράδειγμα:**

<span style="color:aquamarine">
 INSERT INTO
 </span> employees <span style="color:aquamarine">
 VALUES
 </span> (5,"Ioannis","Perpatitis",660);


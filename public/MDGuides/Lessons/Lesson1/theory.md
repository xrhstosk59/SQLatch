## 3. SELECT

Η εντολή <span style="color:coral">
SELECT
</span>χρησιμοποιείται για την επιλογή δεδομένων από μια βάση
δεδομένων. Αρχικά, η <span style="color:coral">
SELECT
</span> είναι μία από τις πιο σημαντικές εντολές
στην sql καθώς χρησιμοποιείται για την ανάκτηση δεδομένων από μία βάση
δεδομένων. Τέλος, μπορείτε να καθορίσετε ποιές στήλες θέλετε να
ανακτήσετε χρησιμοποιώντας το <span style="color:coral">
SELECT
</span>. Για παράδειγμα, αν θέλετε όλες τις
στήλες, μπορείτε να χρησιμοποιήσετε "\*".

Η <span style="color:coral">
SELECT
</span> έχει την ακόλουθη δομή:

Επιλογή όλων των στηλών από έναν πίνακα:

*   <span style="color:aquamarine">
SELECT
</span> \* <span style="color:aquamarine">
FROM
</span> books;

Επιλογή συγκεκριμένων στηλών από έναν πίνακα:

*   <span style="color:aquamarine">
SELECT
</span> title, author <span style="color:aquamarine">
FROM
</span> books;

Σε επόμενο μάθημα θα δούμε πώς μπορούμε να προσθέσουμε συνθήκες με την
εντολή <span style="color:coral">WHERE</span>, ώστε να εμφανίζονται μόνο
οι εγγραφές που μας ενδιαφέρουν.

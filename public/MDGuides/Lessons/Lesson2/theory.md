## 1. CREATE TABLE

Η εντολή <span style="color:coral">
CREATE TABLE
</span> χρησιμοποιείται στη διαχείριση βάσεων
δεδομένων για τη δημιουργία νέων πινάκων. Οι βασικές συντακτικές
στοιχεία της εντολής περιλαμβάνουν το όνομα του πίνακα που θέλουμε να
δημιουργήσουμε, τα ονόματα και τους τύπους δεδομένων των στηλών που θα
περιέχει ο πίνακας, καθώς και προαιρετικούς περιορισμούς (constraints)
όπως πρωτεύοντες και ξένα κλειδιά.

Με την <span style="color:coral">
CREATE TABLE
</span> μπορούμε να ορίσουμε τη δομή της βάσης
δεδομένων μας, καθορίζοντας ποιες πληροφορίες θα αποθηκεύονται σε κάθε
πίνακα και πώς θα συσχετίζονται μεταξύ τους. Αυτό δημιουργεί τη βάση για
την αποθήκευση και την ανάκτηση δεδομένων στην εφαρμογή σας.

Η <span style="color:coral">
CREATE TABLE
</span> έχει την ακόλουθη δομή:

Δημιουργία table με πρωτεύον κλειδί:
* <span style="color:aquamarine">
CREATE TABLE
</span> Books (
    BookID <span style="color:aquamarine">
INTEGER
</span> PRIMARY KEY,
    Title <span style="color:aquamarine">
TEXT
</span>,
    Author <span style="color:aquamarine">
TEXT
</span>
);

Δημιουργία table με ξένο κλειδί, από τον προηγούμενο πίνακα:
* <span style="color:aquamarine">
CREATE TABLE
</span> Reviews (
    ReviewID <span style="color:aquamarine">
INTEGER
</span> <span style="color:aquamarine">
PRIMARY KEY
</span>,
    Comment <span style="color:aquamarine">
TEXT
</span>,
    BookID <span style="color:aquamarine">
INTEGER
</span>,
    <span style="color:aquamarine">
FOREIGN KEY
</span> (BookID) <span style="color:aquamarine">
REFERENCES
</span> Books(BookID)
);

Στο παραπάνω παράδειγμα, η στήλη <span style="color:aquamarine">BookID</span> του πίνακα <span style="color:aquamarine">Reviews</span> συνδέεται με το πρωτεύον κλειδί του πίνακα <span style="color:aquamarine">Books</span>.

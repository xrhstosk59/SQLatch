## 2. CREATE TABLE

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
</span> Customers (
    CustomerID <span style="color:aquamarine">
INTEGER
</span> PRIMARY KEY,
    CustomerName <span style="color:aquamarine">
TEXT
</span>
);

![Screenshot](MDGuides/Lessons/Lesson2/images/first.png)

Δημιουργία table με ξένο κλειδί, από τον προηγούμενο πίνακα:
* <span style="color:aquamarine">
CREATE TABLE
</span> Orders (
    OrderID <span style="color:aquamarine">
INTEGER
</span> <span style="color:aquamarine">
PRIMARY KEY
</span>,
    OrderDate <span style="color:aquamarine">
TEXT
</span>,
    CustomerID <span style="color:aquamarine">
INTEGER
</span>,
    <span style="color:aquamarine">
FOREIGN KEY
</span> (CustomerID) <span style="color:aquamarine">
REFERENCES
</span> Customers(CustomerID)
);

*photo coming soon*

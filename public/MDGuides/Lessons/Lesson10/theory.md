## 11. INNER JOIN

Στη γλώσσα SQL, το inner <span style="color:coral">
   **JOIN**</span> είναι ένας τρόπος να συνδυάσετε γραμμές από δύο ή περισσότερους πίνακες βάσης δεδομένων, βασιζόμενοι σε ένα κριτήριο σύγκρισης μεταξύ τους.
**ΠΡΟΣΟΧΗ!** Για να είναι εφικτή η ένωση δύο πινάκων πρέπει να σχετίζονται μεταξύ τους μεσω Ξένου Κλειδιού (foreign key).

Η σύνταξη για το inner <span style="color:coral">
   **JOIN**</span> είναι η εξής:

* SELECT column1, column2, ...
FROM table1
<span style="color:aquamarine">
   **JOIN**</span> table2 <span style="color:aquamarine">
   **ON**</span> table1.column\_name = table2.column\_name;

**Παράδειγμα:**
* SELECT * FROM students <span style="color:aquamarine">
   **JOIN**</span> enrollments <span style="color:aquamarine">
   **ON**</span> students.id=enrollments.student\_id;

<details><summary>
**TIP💡**
</summary>
Για να μην έχουμε προβλήματα με τα πεδία που θέλουμε να εμφανίσουμε, καλό θα ήταν να αναφέρουμε τον πίνακα από τον οποίο προέρχονται με την σύνταξη: table\_name.column\_name. 
Για παράδειγμα: 
* SELECT <span style="color:aquamarine">
   table1.column1, table2.column2, ...</span>
FROM <span style="color:aquamarine">
   table1</span>
INNER JOIN <span style="color:aquamarine">
   table2</span> ON <span style="color:aquamarine">
   table1.column\_name</span> = <span style="color:aquamarine">
   table2.column\_name</span>;

</details>

Για να περιορίσετε τα αποτελέσματα την αναζήτησης σας σε πίνακες με <span style="color:coral">
   **JOIN**</span> μπορείτε να χρησιμοποιήσετε κανονικά την εντολή <span style="color:coral">
   **WHERE**</span> και τις υπόλοιπες εντολές και συναρτήσεις που έχετε διδαχτεί έως τώρα.

**Παράδειγμα:**
* SELECT students.firstname,students.lastname,enrollments.course\_id
FROM students
<span style="color:aquamarine">
   **JOIN**</span> enrollments <span style="color:aquamarine">
   **ON**</span> students.id=enrollments.student\_id
<span style="color:aquamarine">
   **WHERE**</span> enrollments.grade>8
<span style="color:aquamarine">
   **ORDER BY**</span> enrollments.grade <span style="color:aquamarine">
   **DESC**</span>;

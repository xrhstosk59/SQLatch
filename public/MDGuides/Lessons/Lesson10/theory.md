## INNER JOIN

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
* SELECT * FROM employees <span style="color:aquamarine">
   **JOIN**</span> workson <span style="color:aquamarine">
   **ON**</span> employees.id=workson.emp\_id;

![Screenshot](MDGuides/Lessons/Lesson10/images/first.png)

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
* SELECT employees.firstname,employees.salary,workson.dep\_id
FROM employees
<span style="color:aquamarine">
   **JOIN**</span> workson <span style="color:aquamarine">
   **ON**</span> employees.id=workson.emp\_id
<span style="color:aquamarine">
   **WHERE**</span> salary>800
<span style="color:aquamarine">
   **ORDER BY**</span> employees.salary <span style="color:aquamarine">
   **DESC**</span>;

![Screenshot](MDGuides/Lessons/Lesson10/images/second.png)
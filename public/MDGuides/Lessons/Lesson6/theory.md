## DELETE FROM / DROP TABLE
Η εντολή <span style="color:coral">
   **DELETE FROM**</span> χρησιμοποιείται για τη διαγραφή εγγραφών από έναν πίνακα σε μια βάση δεδομένων. 
   
   **ΠΡΟΣΟΧΗ!** Είναι σημαντικό να είστε προσεκτικοί κατά τη διαγραφή δεδομένων, ιδίως όταν υπάρχουν περιορισμοί κλειδιών και εξωτερικών κλειδιών, προκειμένου να διατηρήσετε τη συνοχή της βάσης δεδομένων σας. Εάν υπάρχουν συσχετισμένες καταχωρίσεις σε άλλους πίνακες που έχουν αναφορικό κλειδί προς το πρωτεύον κλειδί του πίνακα προς διαγραφή πρέπει να αφαιρεθούν πρώτες πριν αφαιρεθεί η εγγραφή που επιθυμείτε.

Η χρήση του <span style="color:coral">
   **DELETE FROM**</span> είναι μια επικίνδυνη ενέργεια, καθώς διαγράφει δεδομένα από τη βάση. Είναι σημαντικό να είστε προσεκτικοί και να επιβεβαιώνετε τις εγγραφές προτού προχωρήσετε στη διαγραφή!

Η δομή της εντολής <span style="color:coral">
**DELETE FROM**</span> είναι η εξής:
* <span style="color:aquamarine">
**DELETE FROM**</span> table_name
<span style="color:aquamarine">
**WHERE**</span> condition;

**Παράδειγμα:**

* <span style="color:aquamarine">
**DELETE FROM**</span> employees
<span style="color:aquamarine">
**WHERE**</span> id=1;

![Screenshot](MDGuides/Lessons/Lesson6/images/first.png)

Η εντολή <span style="color:coral">
**DROP TABLE**</span> στην SQL χρησιμοποιείται για τη διαγραφή ενός ολόκληρου πίνακα από τη βάση δεδομένων. Παρόμοια με την <span style="color:aquamarine">
**DELETE**</span> ισχύουν οι ίδιοι ιεραρχικοί κανόνες στη διαγραφή πινάκων.
 
Η δομή της εντολής <span style="color:coral">
**DROP TABLE**</span> είναι η εξής:
* <span style="color:aquamarine">
**DROP TABLE**</span> table_name;

**Παράδειγμα:**
* <span style="color:aquamarine">
**DROP TABLE**</span> employees;

![Screenshot](MDGuides/Lessons/Lesson6/images/second.png)

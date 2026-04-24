## 7. DELETE FROM

Η εντολή <span style="color:coral">
   **DELETE FROM**</span> χρησιμοποιείται για τη διαγραφή εγγραφών από έναν πίνακα σε μια βάση δεδομένων.

Με την εντολή αυτή αφαιρούμε μόνο τις γραμμές που ικανοποιούν μια συγκεκριμένη συνθήκη. Για τον λόγο αυτό, η
<span style="color:coral">**WHERE**</span> είναι ιδιαίτερα σημαντική, αφού μας βοηθά να διαγράψουμε μόνο τις εγγραφές που θέλουμε.

**ΠΡΟΣΟΧΗ!** Η διαγραφή δεδομένων είναι μια ενέργεια που δεν πρέπει να γίνεται βιαστικά. Είναι σημαντικό να
ελέγχετε σωστά τη συνθήκη πριν εκτελέσετε την εντολή, ώστε να μην αφαιρεθούν περισσότερες εγγραφές από όσες θέλετε.

Η βασική δομή της εντολής είναι η εξής:

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

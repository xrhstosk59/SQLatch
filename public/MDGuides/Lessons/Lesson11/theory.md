## 4. WHERE

Η εντολή <span style="color:coral">WHERE</span> χρησιμοποιείται για να φιλτράρουμε τις εγγραφές που θέλουμε να εμφανιστούν από έναν πίνακα.

Με άλλα λόγια, η <span style="color:coral">WHERE</span> μάς βοηθά να ζητήσουμε μόνο τις γραμμές που ικανοποιούν μια συγκεκριμένη συνθήκη.

Η βασική δομή είναι η εξής:

* <span style="color:aquamarine">SELECT</span> * <span style="color:aquamarine">FROM</span> employees <span style="color:aquamarine">WHERE</span> salary > 500;

Στο παραπάνω παράδειγμα, εμφανίζονται μόνο οι εργαζόμενοι που έχουν μισθό μεγαλύτερο από 500.

Άλλο παράδειγμα:

* <span style="color:aquamarine">SELECT</span> firstname, lastname <span style="color:aquamarine">FROM</span> employees <span style="color:aquamarine">WHERE</span> id = 1;

Εδώ εμφανίζονται μόνο το όνομα και το επώνυμο του εργαζομένου με <span style="color:coral">id = 1</span>.

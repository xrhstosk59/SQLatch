## 4. WHERE

Η εντολή <span style="color:coral">WHERE</span> χρησιμοποιείται για να φιλτράρουμε τις εγγραφές που θέλουμε να εμφανιστούν από έναν πίνακα.

Με άλλα λόγια, η <span style="color:coral">WHERE</span> μάς βοηθά να ζητήσουμε μόνο τις γραμμές που ικανοποιούν μια συγκεκριμένη συνθήκη.

Η βασική δομή είναι η εξής:

* <span style="color:aquamarine">SELECT</span> * <span style="color:aquamarine">FROM</span> books <span style="color:aquamarine">WHERE</span> pages > 200;

Στο παραπάνω παράδειγμα, εμφανίζονται μόνο τα βιβλία που έχουν περισσότερες από 200 σελίδες.

Άλλο παράδειγμα:

* <span style="color:aquamarine">SELECT</span> title, author <span style="color:aquamarine">FROM</span> books <span style="color:aquamarine">WHERE</span> category = 'Ιστορία';

Εδώ εμφανίζονται μόνο ο τίτλος και ο συγγραφέας των βιβλίων που ανήκουν στην κατηγορία <span style="color:coral">Ιστορία</span>.

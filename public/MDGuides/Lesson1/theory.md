## 1. SELECT

Η <span style="color:coral">
SELECT
</span> δήλωση χρησιμοποιείται για την επιλογή δεδομένων από μια βάση
δεδομένων. Αρχικά, η <span style="color:coral">
SELECT
</span> είναι μία από τις πιο σημαντικές εντολές
στην sql καθώς χρησιμοποιήται για την ανάκτηση δεδομένων από μία βάση
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
</span> employees;

![Screenshot](MDGuides/Lesson1/images/first.png)

Επιλογή συγκεκριμένων στηλών από έναν πίνακα:

*   <span style="color:aquamarine">
SELECT
</span> firstname, lastname <span style="color:aquamarine">
FROM
</span> employees;

![Screenshot](MDGuides/Lesson1/images/second.png)

Επιλογή με φίλτρο (π.χ., επιλογή όλων των υπαλλήλων που έχουν μισθό πάνω
από 50000):

*   <span style="color:aquamarine">
SELECT
</span> \* <span style="color:aquamarine">
FROM
</span> employees WHERE salary \> <span style="color:coral">
50000
</span>;

![Screenshot](MDGuides/Lesson1/images/third.png)
## ΛΟΓΙΚΟΙ ΤΕΛΕΣΤΕΣ

Στην SQL, οι λογικοί τελεστές χρησιμοποιούνται για να δημιουργήσουν συνθήκες που ελέγχουν την αλήθεια ή την αναστροφή μιας συνθήκης και χρησιμοποιούνται εντός της εντολης WHERE. Οι βασικοί λογικοί τελεστές είναι οι <span style="color:coral">
   **AND**</span>, <span style="color:coral">
   **OR**</span>, και <span style="color:coral">
   **NOT**</span>. Οι πίνακες αληθείας των τελεστών αυτών είναι ως εξής:

<details><summary>
**NOT**
</summary>
![Screenshot](MDGuides/Lessons/Lesson4/images/tb1.png)

</details>
<details><summary>
**AND** 
</summary> 
![Screenshot](MDGuides/Lessons/Lesson4/images/tb2.png)

</details>
<details><summary>
**OR**
</summary>
![Screenshot](MDGuides/Lessons/Lesson4/images/tb3.png)

</details>

**Παράδειγμα:**
* SELECT * FROM employees <span style="color:aquamarine">
   **WHERE**</span> <span style="color:coral">
   **NOT**</span> id=1;

![Screenshot](MDGuides/Lessons/Lesson4/images/first.png)

* SELECT * FROM employees <span style="color:aquamarine">
   **WHERE**</span> id=1 <span style="color:coral">
   **AND**</span> salary > 100;

![Screenshot](MDGuides/Lessons/Lesson4/images/second.png)

* SELECT * FROM employees <span style="color:aquamarine">
   **WHERE**</span> id=2 <span style="color:coral">
   **OR**</span> salary > 200;

![Screenshot](MDGuides/Lessons/Lesson4/images/third.png)
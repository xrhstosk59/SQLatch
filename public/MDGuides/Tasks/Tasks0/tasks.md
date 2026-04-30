## Άσκηση γνωριμίας με τη δομή της βάσης δεδομένων

Πριν ξεκινήσετε την πρακτική εξάσκηση με τις βασικές εντολές SQL, παρατηρήστε τα blocks που εμφανίζονται στο αριστερό μέρος της οθόνης.

Με αυτά τα blocks δημιουργούμε έναν πίνακα με όνομα <span style="color:aquamarine">employees</span> και ορίζουμε τις στήλες του.

Ο πίνακας <span style="color:aquamarine">employees</span> που φτιάχνουν τα blocks έχει την παρακάτω δομή:

<table>
  <thead>
    <tr>
      <th>Στήλη</th>
      <th>Τύπος</th>
      <th>Παρατήρηση</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>INTEGER</td>
      <td>PRIMARY KEY</td>
    </tr>
    <tr>
      <td>firstname</td>
      <td>TEXT</td>
      <td>Όνομα εργαζομένου</td>
    </tr>
    <tr>
      <td>lastname</td>
      <td>TEXT</td>
      <td>Επώνυμο εργαζομένου</td>
    </tr>
    <tr>
      <td>salary</td>
      <td>REAL</td>
      <td>Μισθός</td>
    </tr>
    <tr>
      <td>workhours</td>
      <td>INTEGER</td>
      <td>Ώρες εργασίας</td>
    </tr>
    <tr>
      <td>department</td>
      <td>TEXT</td>
      <td>Τμήμα εργαζομένου</td>
    </tr>
  </tbody>
</table>

Στη συνέχεια, απαντήστε στα παρακάτω:

- Ποιο είναι το όνομα του πίνακα που εμφανίζεται;
- Ποιες στήλες περιέχει ο πίνακας;
- Ποια στήλη είναι το πρωτεύον κλειδί;
- Τι είδους δεδομένα φαίνεται να αποθηκεύονται σε κάθε στήλη;
- Τι πληροφορίες μπορούμε να καταγράψουμε συνολικά για κάθε εργαζόμενο;

___

Αφού μελετήσετε το σχήμα, γράψτε μια σύντομη περιγραφή της δομής της βάσης δεδομένων με δικά σας λόγια.

<div
  class="exercise-answer-box"
  data-answer-key="structure-intro"
  data-label="Γράψε την απάντησή σου"
  data-placeholder="Παράδειγμα: Η βάση δεδομένων περιέχει έναν πίνακα..."
  data-helper="Μπορείς να γράψεις πρώτα τη δική σου περιγραφή και να ανοίξεις την ενδεικτική απάντηση μόνο αν κολλήσεις."
  data-rows="8"
></div>

<details>
  <summary>Δείξε την ενδεικτική απάντηση</summary>

  Η βάση δεδομένων περιέχει έναν πίνακα με όνομα <span style="color:aquamarine">employees</span>.
  Ο πίνακας έχει τις στήλες <span style="color:aquamarine">id</span>, <span style="color:aquamarine">firstname</span>, <span style="color:aquamarine">lastname</span>, <span style="color:aquamarine">salary</span>, <span style="color:aquamarine">workhours</span> και <span style="color:aquamarine">department</span>.
  Η στήλη <span style="color:aquamarine">id</span> είναι το πρωτεύον κλειδί.
  Στον πίνακα πρόκειται να αποθηκεύονται βασικά στοιχεία εργαζομένων, όπως το όνομα, το επίθετο, ο μισθός, οι ώρες εργασίας και το τμήμα τους.

</details>

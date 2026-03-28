## Φύλλο εργασίας με CREATE και INSERT
Δημιουργήστε έναν πίνακα με το όνομα <span style="color:aquamarine">Φοιτητές</span> που θα περιέχει:
- Τον αριθμό μητρώου του Φοιτητή (<span style="color:aquamarine">ΑΜ</span>) το οποίο θα είναι το πρωτεύων κλειδί
- Το όνομα του φοιτητή (<span style="color:aquamarine">Όνομα</span>)
- Το επίθετο του φοιτητή (<span style="color:aquamarine">Επώνυμο</span>)
- Την ημερομηνία γέννησης του φοιτητή (<span style="color:aquamarine">ΗμερομηνίαΓέννησης</span>)

<details>
  <summary>Δείξε την ενδεικτική λύση</summary>
  ![Screenshot](MDGuides/Tasks/Tasks1/images/first.png)
</details>

___
Στην συνέχεια εισάγετε στον πίνακα στοιχεία για δύο φοιτητές της επιλογής σας.

<details>
  <summary>Δείξε την ενδεικτική λύση (παράδειγμα)</summary>
  ![Screenshot](MDGuides/Tasks/Tasks1/images/second.png)
</details>

___
Τέλος, από τον πίνακα που δημιουργήσατε να εμφανίσετε:
- Τα ονόματα των φοιτητών
- Τις ημερομηνίες γέννησης των φοιτητών

για όλες τις εγγραφές του πίνακα.

<details>
  <summary>Δείξε την ενδεικτική λύση</summary>

```sql
SELECT Όνομα, ΗμερομηνίαΓέννησης FROM Φοιτητές;
```

</details>

/*
	Potrebno je napraviti React hook za filtriranje, sortiranje i pretrazivanje podataka.
	Hook treba da prima array objekata odredjene strukture. U ovom slucaju koristimo array user-a iz users.json fajla.
	Hook treba da vraca formatirane podatke kao i funkcije za sortiranje, pretrazivanje i filtriranje.
  Omoguciti ulancano pozivanje implementiranih funkcija.
	
	Funkcija za pretrazivanje prima string i pretrazuje sve propertije na user objektu.
	Funkcija za filtriranje prima funkciju koju poziva za svaki entry u array-u.
	Funkcija za sortiranje moze da primi string (property name) po kojem treba da odradi standardni sort
	ili da primi funkciju za sortiranje (slicno kao i filter funkcija).

	Za zadatak kreirati poseban projekat gdje ce sadrzaj App.tsx fajla biti ovaj fajl.
	
	Koristiti React i TypeScript.

	Puno srece ;-)
*/

import React, { useEffect } from "react";
import users from "./data/users.json";
import useFormattedData from "./utils/useFormattedData";

const App = () => {
  const { filteredUsers, onSearch, onFilter, onSort } = useFormattedData(users);

  /**
   * Unutar ovog useEffect poziva bice proizvoljnim redom pozivane implementirane funkcije za
   * search, filter i sort da bi testirali tvoju implementaciju.
   */
  useEffect(() => {
    onSearch("2020");
    onSort((a, b) => (a.zip > b.zip ? -1 : a.zip < b.zip ? 1 : 0));
    // onSort("firstName");
    onFilter(({ zip }) => zip > 800);
  }, []);

  return (
    <div>
      {filteredUsers.map(
        ({ id, firstName, lastName, gender, city, birthdate, email, zip }) => (
          <div key={id}>
            <div>
              <span>{firstName} </span>
              <span>{lastName} </span>
              <span>{city} </span>
              <span>{gender} </span>
              <span>{email} </span>
              <span>{birthdate} </span>
              <span>{zip}</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default App;

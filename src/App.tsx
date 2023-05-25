import React, { useEffect } from 'react';
import users from './data/users.json';
import useFormattedData from './utils/useFormattedData';

const App = () => {
  const { filteredUsers, onSearch, onFilter, onSort } = useFormattedData(users);

  useEffect(() => {
    onSearch('2020');
    onSearch('486');
    onSearch('Beatrix');
    onSort((a, b) => (a.zip < b.zip ? -1 : a.zip > b.zip ? 1 : 0));
    // onSort("firstName");
    onFilter(({ zip }) => zip > 700);
  }, []);

  return (
    <div>
      {filteredUsers.map(
        (
          { id, firstName, lastName, gender, city, birthdate, email, zip },
          index
        ) => (
          <div key={id}>
            <div>
              <span style={{ marginRight: '10px' }}>{index + 1}. </span>
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

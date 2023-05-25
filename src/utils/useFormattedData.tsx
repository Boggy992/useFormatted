import React, { useState, useMemo, useEffect } from 'react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  zip: number;
  birthdate: string;
  city: string;
  [key: string]: string | number;
}

const searchHandler = (users: Array<User>, searchQueries: Array<string>) => {
  return users.filter((user) => {
    for (const propertyName in user) {
      const value = user[propertyName].toString().toLowerCase();

      for (const query of searchQueries) {
        if (value.includes(query.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  });
};

const sortByHandler = (users: Array<User>, search: keyof User) => {
  return users.sort((a: User, b: User) =>
    a[search] < b[search] ? -1 : a[search] > b[search] ? 1 : 0
  );
};

const useFormattedData = (data: Array<User>) => {
  const [filteredUsers, setFilteredUsers] = useState<Array<User>>(data);
  const [searchValue, setSearchValue] = useState<Array<string>>([]);
  const [sortByValue, setSortByValue] = useState<
    string | ((a: User, b: User) => number)
  >('');

  useEffect(() => {
    setSortByValue('');
    setSearchValue([]);
    setFilteredUsers(data);
  }, [data]);

  const onSearch = (value: string) => {
    setSearchValue((prevValue: Array<string>) => [...prevValue, value]);
  };

  const onSort = (value: string | ((a: User, b: User) => number)) => {
    if (typeof value === 'string') {
      setSortByValue(value);

      return;
    }

    setSortByValue(() => value);
  };

  const onFilter = (filterUser: (user: User) => boolean) => {
    const filteredUsers = data.filter(filterUser);
    setFilteredUsers(filteredUsers);
  };

  const usersBySearch = useMemo(() => {
    return searchHandler(filteredUsers, searchValue);
  }, [filteredUsers, searchValue]);

  console.log(usersBySearch);

  const sortedUsers = useMemo(() => {
    return typeof sortByValue === 'string'
      ? sortByHandler(usersBySearch, sortByValue)
      : usersBySearch.sort(sortByValue);
  }, [usersBySearch, sortByValue]);

  return { filteredUsers: sortedUsers, onFilter, onSearch, onSort };
};

export default useFormattedData;

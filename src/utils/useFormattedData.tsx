import React, { useState, useMemo } from 'react';

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

const searchHandler = (users: Array<User>, searchQuery: string) => {
  return users.filter((user: User) => {
    for (const propertyName in user) {
      const value = user[propertyName].toString().toLowerCase();
      if (value.includes(searchQuery.toLowerCase())) {
        return true;
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
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortByValue, setSortByValue] = useState<
    string | ((a: User, b: User) => number)
  >('');

  const onSearch = (value: string) => {
    setSearchValue(value);
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

  const sortedUsers = useMemo(() => {
    return typeof sortByValue === 'string'
      ? sortByHandler(usersBySearch, sortByValue)
      : usersBySearch.sort(sortByValue);
  }, [usersBySearch, sortByValue]);

  return { filteredUsers: sortedUsers, onSearch, onFilter, onSort };
};

export default useFormattedData;

import React from 'react';
import { useSelector } from 'react-redux';

import './search.styles.scss';
import SingleSearch from '../single-search/single-search.component';

const Search = ({ searchValue }) => {
  const usersList = useSelector((state) => state.usersList.users);
  return (
    <div className="searchContainer">
      {searchValue.length
        ? usersList
            .filter((user) => {
              return user.username
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
            .map((user) => {
              return <SingleSearch key={user._id} username={user.username} />;
            })
        : null}
    </div>
  );
};

export default Search;

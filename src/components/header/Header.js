import React from "react";

const Header = props => {
  const { search, onInputChange, onSearchClick } = props;
  return (
    <div className="jumbotron">
      
      <div className="input-group w-50 mx-auto">
        <input
          type="text"
          class="form-control"
          placeholder="Search State..."
          value={search}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default Header;
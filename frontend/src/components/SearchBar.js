import React from 'react';

function SearchBar(props) {
  return (
    <form>
      <h2>Find a premium coffee shop near you</h2>
      <div className="form-group">
        <label htmlFor="zipcode"></label>
        <input
          placeholder="Zip Code"
          type="text"
          className="form-control"
          id="zipcode"
          name="zipcode"
          value={props.zip}
          onChange={props.handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default SearchBar;

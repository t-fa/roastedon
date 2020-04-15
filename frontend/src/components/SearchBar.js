import React from 'react';

function SearchBar(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <h2>Find a premium coffee shop near you</h2>
      <div className="form-group">
        <label htmlFor="zipcode"></label>
        <input
          placeholder="Zip Code"
          type="text"
          className="form-control"
          id="zipcode"
          name="zipcode"
          value={props.zipcode}
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

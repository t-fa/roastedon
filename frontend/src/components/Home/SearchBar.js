import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const searchBar = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <h2>Find a premium coffee shop near you</h2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            placeholder="Zip Code"
            type="text"
            name="zipcode"
            label="Zip Code"
            fullWidth
            value={props.zipcode}
            onChange={props.onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default searchBar;

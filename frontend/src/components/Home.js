import React from 'react';

import ShopSearch from './ShopSearch';

function Home() {
  return (
    <div>
      <ShopSearch />
      <h3>Why Roasted On?</h3>
      <h4>We believe in the freshest coffee</h4>
      <p>
        Ordinary grocery store coffee comes with a "Best By" date, which we
        consider an arbitrary date. Often the "Best By" date is months from when
        the coffee is roasted. Many coffee enthusiasts would consider that
        coffee to have gone bad. While the beans aren't expired in the
        traditional sense, they're past the point where they offer the freshest
        possible flavor. Roasters who us a "Roasted On" date believe in fresh
        coffee. A "Roasted On" date tells you exactly the day the coffee was
        roasted and allows you to enjoy the best possible cup.
      </p>

      <h3>More info</h3>
      <p>Lorem ipsum dolor</p>
    </div>
  );
}

export default Home;

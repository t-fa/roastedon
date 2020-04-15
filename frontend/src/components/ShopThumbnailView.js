import React from 'react';

function ShopThumbnailView(props) {
  return (
    <div class="shopthumbnailview container border rounded-lg p-3">
      {/* <img class="shopthumbnailimg" src={props.imgsrc} /> */}
      <h4>{props.shopname}</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>
  );
}

export default ShopThumbnailView;

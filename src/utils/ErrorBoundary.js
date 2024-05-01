// ErrorBoundary.js

import React, { useState } from 'react';

function ErrorBoundary(props) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    // You can render a fallback UI here
    return <h1>Something went wrong. Please try again later.</h1>;
  }

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
}

export default ErrorBoundary;

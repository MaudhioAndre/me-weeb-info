import React from "react";

import { Helmet } from "react-helmet";

export default function HelmetComponent({ title, keyword, description }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="keywords" content={keyword} />
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
      </Helmet>
    </>
  );
}

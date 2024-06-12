import React from "react";

import { Helmet } from "react-helmet";

export default function HelmetComponent({ title, keyword, description }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="robots" content="index,follow" />
        <meta name="keywords" content={keyword} />
        <meta name="description" content={description} />
      </Helmet>
    </>
  );
}

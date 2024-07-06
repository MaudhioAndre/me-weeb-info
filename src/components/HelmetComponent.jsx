import React from "react";

import { Helmet } from "react-helmet";

export default function HelmetComponent({ title, keyword, description, canonLink }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="robots" content="index,follow" />
        <meta name="keywords" content={keyword} />
        <meta name="description" content={description} />
        canonLink && <link rel="canonical" href={canonLink} />
      </Helmet>
    </>
  );
}

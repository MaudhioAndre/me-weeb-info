import React from "react";

import { Helmet } from "react-helmet-async";

export default function HelmetComponent({
  title,
  keyword,
  description,
  canonical,
  image,
  type = "website",
  children
}) {
  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="keywords" content={keyword} />
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Canonical URL */}
        {canonical && <link rel="canonical" href={canonical} />}

        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={type} />
        {canonical && <meta property="og:url" content={canonical} />}
        {image && <meta property="og:image" content={image} />}
        <meta property="og:site_name" content="MeWeeb" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {image && <meta name="twitter:image" content={image} />}
        {children}
      </Helmet>
    </>
  );
}

// Dependencies
import Head from "next/head";
import React from "react";

// Template Wrapper
import AuthedTemplate from "Templates/Authed";

// Helpers
import { SITE_NAME } from "Helpers/constants";

// Template
const HomeTemplate = () => {
  return (
    <AuthedTemplate>
      <Head>
        <title>{SITE_NAME}</title>
      </Head>
    </AuthedTemplate>
  );
};

export default HomeTemplate;

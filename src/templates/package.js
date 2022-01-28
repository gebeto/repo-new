import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";


const PackageTemplate = ({ data, location }) => {
  const { dpkg } = data;
  
  return (
    <Layout location={location} title={dpkg.Name}>
      <header>
        <h2>
          <span itemProp="headline">{dpkg.Name}</span>
        </h2>
        <div>
          <small className="pill bg-blue">{dpkg.Package}</small>
          {' '}
          <small className="pill bg-green">v{dpkg.Version}</small>
          {' '}
          <small className="pill bg-orange">{dpkg.Section}</small>
        </div>
        <div>
          <small>{dpkg.Description}</small>
        </div>
      </header>
    </Layout>
  );
}


export default PackageTemplate;


export const pageQuery = graphql`
  query Package($package: String) {
    dpkg(id: { eq: $package }) {
      id
      Name
      Package
      Version
      Section
      Description
    }
  }
`

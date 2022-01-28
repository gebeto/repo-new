import * as React from "react"

import { graphql } from "gatsby"


function Package({ data, params }) {
  console.log(data);
  
  return (
    <div>
      {params.package}
    </div>
  );
}


export default Package;


export const pageQuery = graphql`
  query Package($package: String) {
    allDpkg(filter: {id: {eq: $package}}) {
      nodes {
        id
        Name
        Filename
        Package
        Version
      }
    }
  }
`

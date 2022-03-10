import * as React from "react";
import { graphql, PageProps } from "gatsby";
import styled from "styled-components";
import { PageLayout } from "../../components/PageLayout";
import { Pill } from "../../components/Pill";
import { Dpkg } from "../../graphql";

const DownloadLink = styled.a`
  display: inline-block;
  padding: 8px 16px;
  background: #3498db;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
`;

const PageTitle = styled.h2`
  margin-bottom: 0px;
`;

const PageContent = styled.div`
  margin-top: 16px;
`;

type PackagePageProps = PageProps<{
  dpkg: Pick<
    Dpkg,
    | "id"
    | "Name"
    | "Package"
    | "Version"
    | "Section"
    | "Description"
    | "Filename"
  >;
}>;

const PackagePage: React.VFC<PackagePageProps> = ({ data, location }) => {
  const { dpkg } = data;

  return (
    <PageLayout location={location} title={dpkg.Name}>
      <header>
        <PageTitle>
          <span itemProp="headline">{dpkg.Name}</span>
        </PageTitle>
        <div>
          <Pill color="blue">{dpkg.Package}</Pill>{" "}
          <Pill color="green">v{dpkg.Version}</Pill>{" "}
          <Pill color="orange">{dpkg.Section}</Pill>
        </div>
        <div>
          <small>{dpkg?.Description}</small>
        </div>
      </header>
      <PageContent>
        <DownloadLink href={`/${dpkg.Filename}`} download>
          Download .deb
        </DownloadLink>
      </PageContent>
    </PageLayout>
  );
};

export default PackagePage;

export const pageQuery = graphql`
  query Dpkg($id: String) {
    dpkg(id: { eq: $id }) {
      id
      Name
      Package
      Version
      Section
      Description
      Filename
    }
  }
`;

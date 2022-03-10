import React from "react";
import styled, { css } from "styled-components";
import cydiaLogo from "./cydia.png";

const CydiaBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const sourceTypes = {
  elevated: css`
    border-top: 1px solid rgba(0, 0, 0, 0.01);
    background-color: rgba(0, 0, 0, 0.01);
    box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.2);
  `,
  bordered: css`
    border: 1px solid rgba(0, 0, 0, 0.04);
    background-color: rgba(0, 0, 0, 0.01);
  `,
};

const Source = styled.div<{ variant?: "bordered" | "elevated" }>`
  ${props => sourceTypes[props.variant]}
  border-radius: 16px;

  padding: 16px;
  padding-top: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;

  .icon {
    width: 64px;
    height: 64px;
  }

  .add-button {
    text-decoration: none;
    padding: 8px 16px;
    margin-top: 32px;
    display: block;
    width: 100%;
    background: rgba(0, 0, 0, 0.01);
    border: 1px solid rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    text-align: center;
  }
`;

Source.defaultProps = {
  variant: "bordered",
};

export type CydiaProps = {};

export const Cydia: React.FC<CydiaProps> = props => {
  return (
    <CydiaBlock>
      <Source>
        <img className="icon" src={cydiaLogo} />
        <a
          className="add-button"
          href="cydia://url/https://cydia.saurik.com/api/share#?source=https://gebeto.github.io/repo"
        >
          Add to Cydia
        </a>
      </Source>
    </CydiaBlock>
  );
};

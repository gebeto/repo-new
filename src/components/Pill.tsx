import styled, { css } from "styled-components";

const pillOrange = css`
  background-color: rgba(243, 156, 18, 1);
  color: #fff;
`;

const pillGreen = css`
  background-color: rgba(46, 204, 113, 1);
  color: #fff;
`;

const pillBlue = css`
  background-color: rgba(52, 152, 219, 1);
  color: #fff;
`;

const pillPurple = css`
  background-color: rgba(155, 89, 182, 1);
  color: #fff;
`;

const pillRed = css`
  background-color: rgba(231, 76, 60, 1);
  color: #fff;
`;

const pillColors = {
  orange: pillOrange,
  green: pillGreen,
  blue: pillBlue,
  purple: pillPurple,
  red: pillRed,
};

type PillProps = {
  color: keyof typeof pillColors;
};

export const Pill = styled.small<PillProps>`
  padding: 2px 5px;
  border-radius: 4px;
  font-family: monospace;
  white-space: nowrap;

  ${props => pillColors[props.color]}
`;

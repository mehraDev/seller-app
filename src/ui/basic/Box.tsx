import styled from "styled-components";

interface IBox {
  w?: string;
  p?: string;
  fd?: 'r' | 'c';
  j? : 'sb';
  a?: 'c'
}

const Box = styled.div<IBox>`
  width: ${props => props.w};
  padding: ${props => props.p};
  display: flex;
  flex-direction: ${props => props.fd === 'c' ? 'column':'row'};
  justify-content: ${props => props.j === 'sb' ? 'space-between':''};
  align-items: ${props => props.a === 'c' ? 'center':''};
`;

export default Box;

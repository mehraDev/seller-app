import styled from "styled-components";

interface IText {
  s?:string;
  w?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  c? : string;
  m? : number[];
}

const Text = styled.div<IText>`
    font-size: ${props => props.s? props.s + 'px' : ''};
    font-weight: ${props => props.w? props.w + '00' : ''};
    color: ${props => props.c? props.c : ''};
    margin: ${(props) =>
        props.m ? props.m.map((item) => item + 'rem').join(' ') : ''};
`;

export default Text;

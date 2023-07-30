import styled from "styled-components";
import { Col } from "ui/basic";

const Card = styled(Col)`
border-radius: 6px;
 width: initial;
 box-shadow: ${({theme}) => theme.shadow.boxShadow};
`

export default Card;


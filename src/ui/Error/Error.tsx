import styled from "styled-components";
import Icon, { IconName } from "ui/Icon";

interface ErrorProps{
    message: string
}

const Error: React.FC<ErrorProps> = ({ message }) => (
    <ErrorContainer>
      <Icon name={IconName.Alert} color={'#e30305'} height={0.8} width={0.8} isHoverable={false}/>
      <ErrorMessage>{message}</ErrorMessage>
    </ErrorContainer>
  );


const ErrorContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    & > svg {
        margin-right: 0.5rem;
    }
`;
const ErrorMessage = styled.span`
    color: #e30305;
`;


export default Error;

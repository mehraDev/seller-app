import styled from "styled-components";
import Form, { ImageInput } from "ui/Form";

const FoodForm = styled(Form)`
    padding: 1rem;
    border-radius: 4px;
    font-size: ${({theme}) => theme.font.fontSize};
    color: ${({theme}) => theme.neutralColor.text};
    display: flex;
    background: ${({theme}) => theme.neutralColor.bgContainer};
    flex-direction: column;
    gap: 1rem;
`   


const ImageInputWrapper = styled.div`
    align-self: center;
`;

const ImageSuggestionsWrapper = styled.div`
    font-weight: 600;
`;
const FormHead = styled.div`
    position: relative;
    width: 100%;
    display: flex;
`;
const FormBody = styled.div`
    align-self: center;
`;
const Title = styled.span`
  
`
const CloseForm = styled.span`
    position: absolute;
    right: 0;

`;
  
export {FoodForm,ImageInputWrapper,ImageSuggestionsWrapper,FormBody,FormHead,Title,CloseForm}
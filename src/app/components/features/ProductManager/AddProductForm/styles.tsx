import styled from "styled-components";
import Form, { ImageInput } from "ui/Form";

const FoodForm = styled(Form)`
    padding: 1rem;
    margin: 1rem;
    border: 1px solid #a8a8a8;
    border-radius: 4px;
    font-size: 14px;
    color: #000000d9;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`   


const ImageInputWrapper = styled.div`
    align-self: center;
`;

const ImageSuggestionsWrapper = styled.div`
    font-weight: 600;
`;
export {FoodForm,ImageInputWrapper,ImageSuggestionsWrapper}
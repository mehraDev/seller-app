import styled from "styled-components";


const Label = styled.label`
    margin-bottom: 0.25rem;
    margin-left: 2px;
    font-weight: 600;
    margin-right: 0.5rem;
`;

const FlexBox = styled.div`
    display: flex;
    align-items: center;
`;

const PriceVegNonVegWrapper = styled(FlexBox)`
    gap: 2rem;
    justify-content: space-evenly;
`;


export {Label,FlexBox,PriceVegNonVegWrapper};
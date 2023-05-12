import styled from "styled-components";

export const FoodCatalogueWrapper = styled.div`
    height: 100%;
`;

export const CatalogueViewerWrapper = styled.div`
    height: calc(100% - 4rem);
    overflow: scroll;
    margin: 1rem 2rem;
    display: flex;
    gap: 2%;
    flex-wrap: wrap;

`;

export const ControlsWrapper = styled.div`
   padding: 0.5rem 1.5rem;
    background: white;
    display: flex;
    height: 3rem;
    justify-content: space-between;
`;

export const ControlButtonsWrapper = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        justify-self: end;
        margin-right: 6rem;
`;

export const SelectWrapper = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 3rem;
        margin-right: 6rem;
`;
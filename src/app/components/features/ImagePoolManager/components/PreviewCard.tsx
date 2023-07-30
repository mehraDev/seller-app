// PreviewCard.tsx
import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { Backdrop } from "ui/Backdrop";
import { InputText } from "ui/Form";
import Icon, { IconName } from "ui/Icon";
import { Text, Col, Img, Row } from "ui/basic";

interface IPreviewCard {
  file: File;
  filename: string; // Initial filename
  onNameUpdate: (newName: string) => void; // Callback function to update the name in the parent component
  onDelete: () => void; // Callback function to delete the image
  isEditing: boolean; // Boolean flag to determine if image is being edited
}

const PreviewCard: React.FC<IPreviewCard> = ({ file, filename, onNameUpdate, onDelete, isEditing }) => {
  const theme = useTheme();
  const [isEditingLocal, setIsEditingLocal] = useState(isEditing);
  const [showDeletePopup, setShowDeletePopup] = useState(false); // New state variable for delete popup
  const imageUrl = URL.createObjectURL(file);

  const handleEditButtonClick = () => {
    setIsEditingLocal(true);
  };

  const handleSaveButtonClick = () => {
    setIsEditingLocal(false);
  };

  const handleDeleteButtonClick = () => {
    setShowDeletePopup(true); // Show the delete popup
  };

  const handleDeleteConfirm = () => {
    setShowDeletePopup(false); // Close the delete popup
    onDelete(); // Call the parent component's onDelete function to delete the image
  };

  const handleDeleteCancel = () => {
    setShowDeletePopup(false); // Close the delete popup
  };

  return (
    <Col style={{ boxShadow: theme.shadow.boxShadow, background: "white" }} p="0.5rem">
      <Row j="end" w="initial" style={{ alignSelf: "flex-end", background: "white", right: "0", borderRadius: "4px", gap: "0.5rem", boxShadow: theme.shadow.boxShadowSecondary }}>
        {!isEditingLocal && (
          <>
            <Icon name={IconName.Edit} onClick={handleEditButtonClick} color={theme.brandColor.primary} />
            <Icon name={IconName.Delete} onClick={handleDeleteButtonClick} color={theme.brandColor.red} />
          </>
        )}
      </Row>
      <Img src={imageUrl} h="150px" />
      {isEditingLocal ? (
        <InputText value={filename} onChange={(updatedName) => onNameUpdate(updatedName)} />
      ) : (
        <FileName>{filename}</FileName>
      )}
      {isEditingLocal && <SaveButton onClick={handleSaveButtonClick}>Save</SaveButton>}
      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <Backdrop>
          <Col w="initial" a="center" j="center" p="1rem" style={{ background: theme.neutralColor.bgContainer, borderRadius: "6px" }}>
            <Text c={theme.brandColor.red}>{`Delete ${filename}?`}</Text>
            <PopupButtons>
              <PopupButton onClick={handleDeleteConfirm}>Yes</PopupButton>
              <PopupButton onClick={handleDeleteCancel}>No</PopupButton>
            </PopupButtons>
          </Col>
        </Backdrop>
      )}
    </Col>
  );
};

const FileName = styled.div`
  /* Styles for the file name */
`;

const SaveButton = styled.button`
  /* Styles for the save button */
`;

const PopupButtons = styled.div`
  /* Styles for the popup buttons */
  display: flex;
  gap: 1rem;
`;

const PopupButton = styled.button`
  /* Styles for the popup button */
  padding: 0.5rem 1rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default PreviewCard;

import React from 'react';
import { useTheme } from 'styled-components';
import Button from 'ui/Button';
import { InputFile } from 'ui/Form';
import theme from 'ui/Utils/Media/Theme/theme';
import { Col, Row,Text } from 'ui/basic';
// Import other necessary components and types here

type ToolbarProps = {
  onAddItem: () => void;
  onUploadImages: (files: FileList ) => void;
  onImportItems: (files: FileList ) => void;
};

const Toolbar: React.FC<ToolbarProps> = ({ onAddItem, onUploadImages, onImportItems }) => {
  const theme = useTheme();
  return (
    <Row j="between"  p="1rem">
      <Row w="initial">
        <Button type='button'   padding="4px 8px"  variant='primary' onClick={onAddItem}> 
          <Text s="14">Add Item</Text>
        </Button>
      </Row>
      <Row  style={{ gap: '1rem' }} j="end" a="end">
        <InputFile
          width={'initial'}
          variant="secondary"
          multiple={true}
          border={`1px solid ${theme.brandColor.primary}`}
          size="small" 
          padding="4px 8px"
          label="Upload by Images" 
          onFileChange={onUploadImages}
        />
        <InputFile
          width={'initial'}
          variant="secondary"
          accept=".dbmenu"
          size="small" 
          padding="4px 8px"
          label="Import Items" 
          onFileChange={onImportItems}
          border={`1px solid ${theme.brandColor.primary}`}
        />
      </Row>
    </Row>
  );
};

export default Toolbar;

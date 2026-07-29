import { Box } from '@mui/material';
import SearchIcon from '~/components/icons/search';
import TextField from '~/components/shared/textfield';
import { BlockDef } from '~/types';

type HelpSearchBoxBlockProps = {
  block: BlockDef<'help-search-box-block'>;
};

function HelpSearchBoxBlock({ block }: HelpSearchBoxBlockProps) {
  return (
    <Box width={1} maxWidth={540} mx="auto">
      <TextField
        variant="outlined"
        placeholder={block.placeholder}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" sx={{ mr: 2 }} />,
        }}
        fullWidth
      />
    </Box>
  );
}

export default HelpSearchBoxBlock;

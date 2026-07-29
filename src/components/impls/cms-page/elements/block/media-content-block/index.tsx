import { BoxProps, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import AspectRatio from '~/components/shared/aspect-ratio';
import CssGrid from '~/components/shared/css-grid';
import Image from '~/components/shared/image';
import { Column, Row } from '~/components/shared/layout';
import parseValue from '~/helpers/parse-value';
import { BlockDef, Media } from '~/types';
import ActionGroupField from '../../field/action-group-field';
import MediaField from '../../field/media-field';
import RichTextField from '../../field/rich-text-field';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

type MediaContentBlockProps = {
  block: BlockDef<'media-content-block'>;
};

function MediaContentBlock({ block }: MediaContentBlockProps) {
  const isContentFirst = block.arrangement === 'content-first';
  const columnTemplate = React.useMemo(() => {
    let mediaSize = '1.25fr';
    let contentSize = '1fr';

    if (block.emphasis === 'media') {
      mediaSize = '1.5fr';
    } else if (block.emphasis === 'content') {
      contentSize = '1.5fr';
    }

    return {
      xs: '1fr',
      sm:
        block.arrangement === 'media-first'
          ? `${mediaSize} ${contentSize}`
          : `${contentSize} ${mediaSize}`,
    };
  }, [block.arrangement, block.emphasis]);

  return (
    <CssGrid columnTemplate={columnTemplate} alignItems="center" spacing={2}>
      <MediaFieldDelegate
        block={block}
        order={
          isContentFirst
            ? { xs: block.mediaSticksToBottom ? 1 : undefined, sm: 1 }
            : undefined
        }
      />
      <Column crossAxisAlignment="start" gap={2} zIndex={6}>
        <RichTextField value={block.content! as any} />
        <ActionGroupField actions={block.actions} gap={2} />
        {block.showLicenceSnippet && <LicenseSnippet />}
        {block.showInvestModal && <BasicModal block={block} />}
        {block.showDownTimeModal && <DownTimeModal block={block} />}
      </Column>
    </CssGrid>
  );
}

type MediaFieldDelegateProps = BoxProps & MediaContentBlockProps;

function MediaFieldDelegate({ block, ...props }: MediaFieldDelegateProps) {
  const aspectRatio = React.useMemo(() => {
    if (block.media.aspectRatio) {
      return parseValue(block.media.aspectRatio);
    }

    const __media = block.media.ref as Media;

    return __media.width! / __media.height!;
  }, [block.media.aspectRatio, block.media.ref]);

  const position = React.useMemo(() => {
    const base = block.hero ? 'left' : 'center';

    return block.mediaSticksToBottom ? `bottom ${base}` : base;
  }, [block.hero, block.mediaSticksToBottom]);

  return (
    <AspectRatio
      value={aspectRatio}
      width={1}
      height={block.hero ? { xs: undefined, md: '120%' } : undefined}
      maxHeight={parseValue(block.media.maxHeight)}
      mt={block.mediaSticksToBottom ? 'auto' : undefined}
      mb={block.mediaSticksToBottom ? -10 : undefined}
      {...props}
      useSx
    >
      <MediaField
        media={block.media}
        height={1}
        fit="contain"
        position={position}
        sx={
          block.hero
            ? { left: { xs: undefined, sm: '-10%' }, width: '120%' }
            : undefined
        }
      />
    </AspectRatio>
  );
}

function LicenseSnippet() {
  return (
    <Row crossAxisAlignment="center" gap={2} py={3}>
      <Row crossAxisAlignment="center" gap={1}>
        <Image
          src={require('./assets/img-cbn.png')}
          height={20}
          fit="contain"
        />
        <Typography variant="caption">
          Licensed by the CBN and Insured by
        </Typography>
        <Image
          src={require('./assets/img-ndic.png')}
          height={40}
          fit="contain"
        />
      </Row>
    </Row>
  );
}

const downTimeStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 690,
  outline: 'none',
  '@media (min-width: 1024px) and (max-width:1100px)': {
    width: '467px',
  },
  '@media (max-width: 769px)': {
    width: '481px',
  },
  '@media (max-width: 426px)': {
    width: '372px',
  },
  '@media (min-width: 340px) and (max-width:700px)': {
    width: '342px',
  },
  '@media (max-width: 321px)': {
    width: '314px',
  },
};
const downTimeWebStyle = {
  width: 643,
  height: 643,
  cursor: 'pointer',
  // bgcolor: 'background.paper',
  borderRadius: '20px',
  '@media (min-width: 1024px) and (max-width:1100px)': {
    width: '422px',
    height: '422px',
  },
  '@media (max-width: 769px)': {
    width: '434px',
    height: '434px',
  },
  '@media (min-width: 400px) and (max-width:700px)': {
    width: '339px',
    height: '339px',
  },
  '@media (min-width: 315px) and (max-width:500px)': {
    width: '314px',
    height: '314px',
  },
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 930,
  outline: 'none',
  '@media (min-width: 1024px) and (max-width:1100px)': {
    width: '694px',
  },
  '@media (min-width: 820px) and (max-width:1000px)': {
    width: '752px',
  },
  '@media (max-width: 769px)': {
    width: '631px',
  },
  '@media (min-width: 430px) and (max-width:700px)': {
    width: '420px',
  },
  '@media (max-width: 426px)': {
    width: '372px',
  },
  '@media (min-width: 340px) and (max-width:700px)': {
    width: '332px',
    height: '527px',
  },
  '@media (max-width: 321px)': {
    width: '308px',
  },
};
const webStyle = {
  width: 900,
  height: 643,
  cursor: 'pointer',
  // bgcolor: 'background.paper',
  borderRadius: '20px',
  '@media (max-width: 769px)': {
    width: '607px',
    height: '434px',
  },
  '@media (min-width: 1024px) and (max-width:1100px)': {
    width: '660px',
    height: '472px',
  },
  '@media (min-width: 820px) and (max-width:1000px)': {
    width: '752px',
    height: '538px',
  },
  '@media (min-width: 431px) and (max-width:700px)': {
    width: '420px',
    height: '304px',
  },
  '@media (max-width: 700px)': {
    display: 'none',
  },
};
const mobileStyle = {
  cursor: 'pointer',
  // bgcolor: 'background.paper',
  borderRadius: '20px',
  display: 'none',
  '@media (min-width: 483px) and (max-width:700px)': {
    width: '446px',
    height: '625px',
    display: 'block',
  },
  '@media (max-width: 426px)': {
    display: 'block',
  },
  '@media (min-width: 400px) and (max-width:700px)': {
    width: '335px',
    height: '469px',
    display: 'block',
  },
  '@media (min-width: 315px) and (max-width:500px)': {
    // width: '330px',
    width: '307px',
    height: '462px',
    display: 'block',
  },
};
// const closeBtn = {
//   float: 'right',
//   cursor: 'pointer',
// };

function BasicModal({ block }: MediaFieldDelegateProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRoute = () => {
    location.href = 'https://investpro.bankly.ng';
  };

  useEffect(() => {
    document?.getElementById('button')?.click();
  }, []);

  return (
    <div>
      <Button id="button" onClick={handleOpen}></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* {block.bannerMedia != undefined && (
            <Image
              sx={closeBtn}
              src={require('./assets/close.png')}
              onClick={handleClose}
            />
          )} */}
          <MediaField
            media={block.bannerMedia}
            fit="contain"
            sx={webStyle}
            height={440}
            onClick={handleRoute}
          />
          <MediaField
            media={block.bannerMedia}
            fit="contain"
            sx={mobileStyle}
            height={1440}
            onClick={handleRoute}
          />
        </Box>
      </Modal>
    </div>
  );
}

function DownTimeModal({ block }: MediaFieldDelegateProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    document?.getElementById('button')?.click();
  }, []);

  return (
    <div>
      <Button id="button" onClick={handleOpen}></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={downTimeStyle}>
          {/* {block.bannerMedia != undefined && (
            <Image
              sx={closeBtn}
              src={require('./assets/close.png')}
              onClick={handleClose}
            />
          )} */}
          <MediaField
            media={block.bannerMedia}
            sx={downTimeWebStyle}
            height={440}
            fit="contain"
          />
        </Box>
      </Modal>
    </div>
  );
}

// function BasicModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const handleRoute = () => {
//     location.href = 'https://investpro.bankly.ng';
//   };

//   useEffect(() => {
//     document?.getElementById('button')?.click();
//   }, []);

//   return (
//     <div>
//       <Button id="button" onClick={handleOpen}></Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Image
//             sx={closeBtn}
//             src={require('./assets/close.png')}
//             onClick={handleClose}
//           />
//           <Image
//             sx={webStyle}
//             src={require('./assets/InvestPro2.gif')}
//             height={440}
//             fit="contain"
//             onClick={handleRoute}
//           />
//           <Image
//             sx={mobileStyle}
//             src={require('./assets/InvestPro1.gif')}
//             height={1440}
//             fit="contain"
//             onClick={handleRoute}
//           />
//         </Box>
//       </Modal>
//     </div>
//   );
// }
// function DownTimeModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   useEffect(() => {
//     document?.getElementById('button')?.click();
//   }, []);

//   return (
//     <div>
//       <Button id="button" onClick={handleOpen}></Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={downTimeStyle}>
//           <Image
//             sx={closeBtn}
//             src={require('./assets/close.png')}
//             onClick={handleClose}
//           />
//           <Image
//             sx={downTimeWebStyle}
//             src={require('./assets/down.jpg')}
//             height={440}
//             fit="contain"
//           />
//         </Box>
//       </Modal>
//     </div>
//   );
// }

export default MediaContentBlock;

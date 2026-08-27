import { Box, Typography } from '@mui/material';
import React from 'react';
import ContentBox from '~/components/generics/content-box';
import { Row } from '~/components/shared/layout';
import Link from '~/components/shared/link';

export type Crumb = { label: string; href?: string };

type BreadcrumbsProps = {
  items: Crumb[];
};

/** Cream breadcrumb strip under the header (casa-web `.ep-crumb`). */
function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items.length) return null;

  return (
    <Box
      component="nav"
      aria-label="Breadcrumb"
      sx={{ bgcolor: 'brand.cream', borderBottom: 1, borderColor: 'divider' }}
    >
      <ContentBox>
        <Row
          component="ol"
          crossAxisAlignment="center"
          gap={1}
          flexWrap="wrap"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            py: 1.625,
            fontSize: 12.5,
            color: 'text.secondary',
          }}
        >
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <React.Fragment key={`${item.label}-${index}`}>
                <Box component="li">
                  {item.href && !last ? (
                    <Link
                      href={item.href}
                      sx={{
                        color: 'inherit',
                        '&:hover': { color: 'primary.dark' },
                      }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Typography
                      component="b"
                      aria-current={last ? 'page' : undefined}
                      sx={{
                        fontSize: 'inherit',
                        fontWeight: 600,
                        color: 'primary.dark',
                      }}
                    >
                      {item.label}
                    </Typography>
                  )}
                </Box>
                {!last && (
                  <Box
                    component="li"
                    aria-hidden
                    sx={{ color: 'brand.mintMuted' }}
                  >
                    /
                  </Box>
                )}
              </React.Fragment>
            );
          })}
        </Row>
      </ContentBox>
    </Box>
  );
}

export default Breadcrumbs;

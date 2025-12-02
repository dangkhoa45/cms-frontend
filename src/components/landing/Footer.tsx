'use client';

import { Box, Container, Typography, Link as MuiLink, Grid } from '@mui/material';
import type { SiteFooter } from '@/types/site';

interface FooterProps {
  footerConfig?: SiteFooter;
}

export function Footer({ footerConfig }: FooterProps) {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            {footerConfig?.links && footerConfig.links.length > 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Links
                </Typography>
                {footerConfig.links.map((link, index) => (
                  <MuiLink
                    key={index}
                    href={link.href}
                    display="block"
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {link.label}
                  </MuiLink>
                ))}
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            {footerConfig?.socialLinks && footerConfig.socialLinks.length > 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Follow Us
                </Typography>
                {footerConfig.socialLinks.map((social, index) => (
                  <MuiLink
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    display="block"
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {social.platform}
                  </MuiLink>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
        {footerConfig?.copyright && (
          <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary" align="center">
              {footerConfig.copyright}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}


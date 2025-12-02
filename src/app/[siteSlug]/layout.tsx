import { cookies } from 'next/headers';
import { ThemeProviderWrapper } from '@/themes/ThemeProviderWrapper';
import { getSiteBySlug } from '@/libs/api';
import { notFound } from 'next/navigation';
import { Box } from '@mui/material';

export default async function SiteLayout(props: {
  children: React.ReactNode;
  params: Promise<{ siteSlug: string }>;
}) {
  const { siteSlug } = await props.params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const site = await getSiteBySlug(siteSlug, cookieHeader).catch(() => null);

  if (!site) {
    notFound();
  }

  return (
    <ThemeProviderWrapper siteTheme={site.theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {props.children}
      </Box>
    </ThemeProviderWrapper>
  );
}


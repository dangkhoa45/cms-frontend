'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import type { SiteHeader } from '@/types/site';

interface HeaderProps {
  siteName: string;
  headerConfig?: SiteHeader;
}

export function Header({ siteName, headerConfig }: HeaderProps) {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {headerConfig?.logo ? (
              <Image
                src={headerConfig.logo}
                alt={siteName}
                width={200}
                height={40}
                style={{ height: 40, width: 'auto', maxWidth: 200 }}
                priority
              />
            ) : (
              siteName
            )}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {headerConfig?.menuItems?.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                component={item.external ? 'a' : Link}
                href={item.href}
                target={item.external ? '_blank' : undefined}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}


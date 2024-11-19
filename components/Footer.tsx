'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Container } from '@mui/material';

import { Box } from '@mui/system';
import Link from 'next/link';

export const Footer: React.FC<{}> = () => {
  const { user } = useUser();

  return (
    <footer
      style={{
        backgroundColor: 'orange',
        width: '100%',
        padding: '25px',
        color: 'white',
        fontSize: '0.8em'
      }}
    >
      <Container maxWidth="sm" style={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}>
          <ul style={{ listStyle: 'none' }}>
            {user ? (
              <>
                <li>
                  <Link href="/">Start</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/">Start</Link>
                </li>
                <li>
                  <Link href="/api/auth/login">Logga in</Link>
                </li>
              </>
            )}
          </ul>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <ul style={{ listStyle: 'none' }}>
            {user && (
              <>
                <li>
                  <Link href="/settings">Inställningar</Link>
                </li>
                <li>
                  <Link href="/api/auth/logout">Logga ut</Link>
                </li>
              </>
            )}

            <li>
              <Link href="/about">Om</Link>
            </li>
            <li>
              <Link href="/policy">Integritets- och cookiepolicy</Link>
            </li>
          </ul>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          Ett projekt av
          <br />
          <Link href="https://www.jobjorn.se/">Jobjörn</Link> &{' '}
          <Link href="https://www.mejstedt.se/">Hedvig</Link> 🍊
        </Box>
      </Container>
    </footer>
  );
};

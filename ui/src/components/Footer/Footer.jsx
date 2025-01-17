import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AstroTheme } from '../../themes/AstroTheme';
import { Box, Link } from '@mui/material';

export const Footer = () => (
  <Box sx={{ flexGrow: 0, color: 'white', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.8)' }}>
    <Toolbar sx={{ backgroundColor: AstroTheme.palette.tertiary.dark }}>
      <Typography>
        Authors: Askins,{' '}
        <Link href='https://github.com/filmo003' target='_new'>
          Gilmore
        </Link>
        ,{' '}
        <Link href='https://github.com/bjhufstetler' target='_new'>
          Hufstetler
        </Link>
        ,{' '}
        <Link href='https://github.com/thkruz/' target='_new'>
          Kruczek
        </Link>
        ,{' '}
        <Link href='https://github.com/bigbpete' target='_new'>
          Peters
        </Link>
        <br></br>
        United States Space Force Supra Coders: Blended Software Development Immersion #1
      </Typography>
    </Toolbar>
  </Box>
);

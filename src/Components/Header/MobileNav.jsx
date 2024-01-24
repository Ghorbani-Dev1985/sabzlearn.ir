import { AppBar, IconButton, Toolbar } from '@mui/material';
import React, { useState } from 'react'

function MobileNav() {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <AppBar component="nav">
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => setMobileNavOpen((prevState) => !prevState)}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
      >
        MUI
      </Typography>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        {/* {navItems.map((item) => (
          <Button key={item} sx={{ color: '#fff' }}>
            {item}
          </Button>
        ))} */}
      </Box>
    </Toolbar>
  </AppBar>
  )
}

export default MobileNav

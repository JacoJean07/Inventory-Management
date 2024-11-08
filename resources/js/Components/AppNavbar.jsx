import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import IconButton from '@mui/material/IconButton';
import { Link } from '@inertiajs/react';

const Toolbar = styled(MuiToolbar)({
  width: '100%',
  padding: '12px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export default function AppNavbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        display: { xs: 'auto', md: 'none' },
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        top: 0,
      }}
    >
      <Toolbar>
        {/* Logo y Título */}
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <CustomIcon />
          <Typography variant="h6" component="h1" sx={{ color: 'text.primary' }}>
            Inventory Dashboard
          </Typography>
        </Stack>

        {/* Botón de Menú para Modo Móvil */}
        <IconButton color="inherit" aria-label="menu" onClick={toggleDrawer}>
          <MenuRoundedIcon />
        </IconButton>

        {/* Drawer para el menú móvil */}
        {open && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0,0,0,0.5)',
            }}
            onClick={toggleDrawer}
          >
            {/* Contenido del menú móvil */}
            <Box
              sx={{
                width: 240,
                bgcolor: 'background.paper',
                height: '100%',
                padding: 2,
              }}
            >
              <Link href="/dashboard" className="text-gray-800" onClick={toggleDrawer}>
                Dashboard
              </Link>
              <Link href="/suppliers" className="text-gray-800" onClick={toggleDrawer}>
                Suppliers
              </Link>
              <Link href="/products" className="text-gray-800" onClick={toggleDrawer}>
                Products
              </Link>
              {/* Agrega más enlaces si es necesario */}
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Icono Personalizado
export function CustomIcon() {
  return (
    <Box
      sx={{
        width: '1.5rem',
        height: '1.5rem',
        borderRadius: '999px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage:
          'linear-gradient(135deg, hsl(210, 98%, 60%) 0%, hsl(210, 100%, 35%) 100%)',
        color: 'hsla(210, 100%, 95%, 0.9)',
        border: '1px solid',
        borderColor: 'hsl(210, 100%, 55%)',
        boxShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.3)',
      }}
    >
      <DashboardRoundedIcon sx={{ fontSize: '1rem' }} />
    </Box>
  );
}

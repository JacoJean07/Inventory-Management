import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react'; // Para obtener los datos del usuario autenticado

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  const { auth } = usePage().props; // Obtener el usuario autenticado de Breeze

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      {/* Opcional: Nombre de la Aplicación o Logo */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Inventory System
        </Typography>
      </Box>
      <Divider />

      {/* Menu Links */}
      <Box sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Link href="/dashboard" className="text-gray-800">
            Dashboard
          </Link>
          <Link href="/suppliers" className="text-gray-800">
            Suppliers
          </Link>
          <Link href="/products" className="text-gray-800">
            Products
          </Link>
          {/* Agrega más enlaces según tus necesidades */}
        </Stack>
      </Box>

      <Divider />

      {/* User Profile and Options */}
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          alt={auth.user?.name || 'User'}
          src={auth.user?.profile_photo_url || '/default-avatar.png'}
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {auth.user?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {auth.user?.email}
          </Typography>
        </Box>
        {/* Aquí podrías agregar enlaces adicionales o botones de menú */}
        <Link href="/logout" method="post" className="text-sm text-red-600">
          Logout
        </Link>
      </Stack>
    </Drawer>
  );
}

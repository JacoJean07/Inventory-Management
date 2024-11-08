import * as React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import IconButton from '@mui/material/IconButton';
import { Link } from '@inertiajs/react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      {/* Breadcrumbs (Placeholder o Título) */}
      <Typography variant="h6" component="div">
        Dashboard
      </Typography>

      {/* Controles de Búsqueda y Notificaciones */}
      <Stack direction="row" sx={{ gap: 1 }}>
        {/* Búsqueda */}
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Notificaciones */}
        <IconButton color="inherit" aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </IconButton>

        {/* Tema de Color (Placeholder o Enlace) */}
        <Link href="#" className="text-sm text-gray-600">
          Toggle Theme
        </Link>
      </Stack>
    </Stack>
  );
}

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller, Resolver } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TextField, IconButton, InputAdornment, Grid, Box, Typography} from '@mui/material';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { Visibility, VisibilityOff, Lock, Email } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import loginValidationSchema from 'src/utils/login/loginValidationSchema';
import { useDispatch } from 'react-redux';
import { onSubmit, IFormInput } from 'src/feature/auth/loginFunctions';
import SubmitLoaderButton from 'src/components/SubmitLoaderButton';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { open, message, severity, handleShowSnackbar, handleClose } = useSnackbar();

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<IFormInput>({
    resolver: yupResolver(loginValidationSchema) as Resolver<IFormInput>,
    mode: 'onChange',
  });

  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);



  return (
<>
      <Helmet>
        <title>Osia Dashboard Login </title>
      </Helmet>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        md={6}
        sx={{
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <Box>
          <img 
            src="/static/images/logo/logo.jpg" 
            alt="Logo"
            style={{ width: '100%', height: 'auto', maxWidth: '500px' }} 
          />
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: { xs: 'url(/static/images/logo/logo.jpg)', md: 'none' },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: { xs: '#ffffff', md: 'inherit' },
        }}
      >
        <Box 
          sx={{ 
            mx: 4, 
            my: 8, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            backgroundColor: { xs: '#ffffff', md: 'transparent' },
            p: { xs: 3, md: 0 },
            borderRadius: { xs: 2, md: 0 },
          }}
        >
          <Box 
            sx={{ 
              backgroundColor: 'blue', 
              borderRadius: '50%', 
              width: 50, 
              height: 50, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              mb: 2 
            }}
          >
            <LockOutlinedIcon style={{ color: 'white' }} />
          </Box>
          <Typography component="h1" variant="h5">
            Se Connecter
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 2 }}>
              Bienvenue utilisateur, veuillez vous connecter pour continuer
          </Typography>
          <Box component="form" onSubmit={handleSubmit((data) => onSubmit(data, dispatch, navigate, handleShowSnackbar, setLoading, isMounted))} sx={{ mt: 1 }}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mot de passe"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            
            <Typography variant="body2">

                <a
                  href="https://wa.me/+237657150979"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', float: 'right', color: 'blue' }}
                >
                  Mot de passe oublié?
                </a>
            </Typography>
            <SubmitLoaderButton
              type="submit"
              isValid={isValid}
              loading={loading}
            >
              Se Connecter
            </SubmitLoaderButton>
          </Box>
        </Box>
      </Grid>
      <SnackbarNotification
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
      />
    </Grid>
</>
  );
};

export default Login;

import React, { useState, useEffect, useRef } from 'react';
// @mui
import { Box, Typography, IconButton, Popover } from '@mui/material';
import QRCode from 'react-qr-code';
import Iconify from '../../../components/iconify';
import { useNavigate } from 'react-router-dom';

export default function QrCodePopover() {
  const [open, setOpen] = useState(null);
  const [user, setUser] = useState({});
  const [qrOpen, setQrOpen] = useState(false); // State to manage QR code visibility
  const modalRef = useRef(null);

  const getUser = async () => {
    let user = await localStorage.getItem("user");
    user = await JSON.parse(user);
    setUser(user);
  };

  useEffect(() => {
    try {
      getUser();
    } catch (error) {
      console.log("error");
    }
  }, []);

  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogoutSuccess = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/login', { replace: true });
  };

  const handleQrClose = () => {
    setQrOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleQrClose();
    }
  };

  useEffect(() => {
    if (qrOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [qrOpen]);

  return (
    <>
      <IconButton
        color={qrOpen ? 'primary' : 'default'}
        sx={{ width: 40, height: 40 }}
        onClick={() => setQrOpen(true)}
      >
        <Iconify icon="mdi:qrcode-scan" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={document.querySelector('#anchorEl')} // Ensure anchorEl is correctly assigned
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.Username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.Email}
          </Typography>
        </Box>
      </Popover>

      {qrOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1300,
          }}
        >
          <Box
            ref={modalRef}
            sx={{
              background: 'white',
              padding: { xs: 2, sm: 4 },
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: { xs: '90%', sm: 'auto' }, // Adjust width on smaller screens
              maxWidth: '400px', // Limit width on larger screens
            }}
          >
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                fontSize: '1.5rem',
              }}
              onClick={handleQrClose}
            >
              <Iconify icon="eva:close-fill" />
            </IconButton>
            <QRCode value={user?.Email || ''} size={256} />
          </Box>
        </Box>
      )}
    </>
  );
}

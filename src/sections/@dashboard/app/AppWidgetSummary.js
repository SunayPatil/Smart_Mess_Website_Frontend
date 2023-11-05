// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Box, Card, Typography } from '@mui/material';
// import StarIcon from '@mui/icons-material/Star';
import Star from '@mui/icons-material/Star';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import { getFoodItemRating } from '../../../utils/apis';
// components
import Iconify from '../../../components/iconify';
import './style.css';




// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({
  type,
  currentDayMenu,
  serving,
  title,
  total,
  icon,
  color = 'primary',
  sx,
  ...other
}) {

  const [allRatings, setAllRatings] = useState([])

  const getAllRatingsData = async () => {
    const res = await getFoodItemRating()
    if (res?.length > 0) {
      setAllRatings(res)
    }
  }

  useEffect(()=>{
    try {
      getAllRatingsData()
    } catch (error) {
      console.log(error)
    }
  }, [])
  
  return (
    <>
      {serving && (
        <Card
          sx={{
            maxHeight: 400,
            overflow: 'scroll',
            py: 5,
            boxShadow: 0,
            textAlign: 'center',
            color: (theme) => theme.palette[color].darker,
            bgcolor: (theme) => theme.palette[color].lighter,
            ...sx,
          }}
          {...other}
        >
          <Box
            variant="subtitle1"
            sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="blob" />
              Currently serving
            </div>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            <Box style={{ minWidth: '80px' }}>
              <StyledIcon
                sx={{
                  color: (theme) => theme.palette[color].dark,
                  backgroundImage: (theme) =>
                    `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                      theme.palette[color].dark,
                      0.24
                    )} 100%)`,
                }}
              >
                <Iconify icon={icon} width={24} height={24} />
              </StyledIcon>

              <Typography variant="h3" sx={{ opacity: 0.72 }}>
                {type}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ opacity: 0.72, textDecoration: 'underline' }}>
                Menu
              </Typography>
              <br />
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  alignContent: 'center',
                }}
              >
                <Box style={{ minWidth: '250px' }}>
                  {currentDayMenu?.slice(0, currentDayMenu?.length / 2)?.map((item, index) => {
                    return (
                      <Typography id="index" key={index} variant="body1">
                        <p>{item?.Name}
                        {" "} {allRatings.filter((item1)=>{
                          return item1.FoodItem === item._id
                        })[0]?.Rating.toFixed(2)}{'/5.00'}<Star />
                        </p>
                      </Typography>
                    );
                  })}
                </Box>
                <Box style={{ minWidth: '250px' }}>
                  {currentDayMenu?.slice(currentDayMenu?.length / 2)?.map((item, index) => {
                    return (
                      <Typography id="index" key={index} variant="body1">
                        <p>{item?.Name}
                        {" "} {allRatings.filter((item1)=>{
                          return item1.FoodItem === item._id
                        })[0]?.Rating.toFixed(2)}{'/5.00'}<Star /></p>
                      </Typography>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
      )}
      {!serving && (
        <Card
          sx={{
            height: 400,
            overflow: 'scroll',
            py: 5,
            boxShadow: 0,
            textAlign: 'center',
            color: (theme) => theme.palette[color].darker,
            bgcolor: (theme) => theme.palette[color].lighter,
            ...sx,
          }}
          {...other}
        >
          <StyledIcon
            sx={{
              color: (theme) => theme.palette[color].dark,
              backgroundImage: (theme) =>
                `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                  theme.palette[color].dark,
                  0.24
                )} 100%)`,
            }}
          >
            <Iconify icon={icon} width={24} height={24} />
          </StyledIcon>

          {/* <Typography variant="h3">{fShortenNumber(total)}</Typography> */}
          <Typography variant="h3" sx={{ opacity: 0.72 }}>
            {type}
          </Typography>

          {currentDayMenu?.map((item, index) => {
            return (
              <Typography id="index" key={index} variant="body1">
                <p>{item?.Name}
                {" "} {allRatings.filter((item1)=>{
                          return item1.FoodItem === item._id
                        })[0]?.Rating.toFixed(2)} {'/5.00'}<Star /></p>
              </Typography>
            );
          })}
          {/* <Typography variant="h3">{fShortenNumber(total)}</Typography> */}

          {/* <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {'title'}
      </Typography> */}
        </Card>
      )}
    </>
  );
}
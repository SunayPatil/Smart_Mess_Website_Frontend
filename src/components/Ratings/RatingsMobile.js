import { isValidElement, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  TextField,
  Button,
  Card,
  CardMedia,
  Typography,
  Rating,
  FormControl,
  useMediaQuery,
} from '@mui/material';
import { find, uniqBy } from 'lodash';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { allItems, filterTimeTable } from '../../utils/filterTimeTable';
import { getFoodReviews } from '../../utils/apis';

/**
 *
 * @param {Array} itemsArray
 * @returns Unique IDs present in the itemsArray
 */
const uniqueIDs = (itemsArray) => {
  const uniqId = new Set();
  itemsArray.forEach((item) => {
    uniqId.add(item?._id);
  });
  return uniqId;
};

/**
 *
 * @param {Array} ratings
 * @param {Set} uniqIds
 * @returns Filtered Ratings
 */
const filterRatings = (ratings, uniqIds) => {
  const filteredRatings = ratings.filter((ele) => {
    if (uniqIds.has(ele?.FoodItem)) {
      return true;
    }
    return false;
  });
  return filteredRatings;
};

/**
 *
 * @param {String} id
 * @param {Array} items
 * @returns {String} Name of the food item
 */
const getItem = (id, items) => {
  if (items?.length > 0) {
    const currItem = items?.filter((ele) => {
      if (ele?._id === id) {
        return true;
      }
      return false;
    });
    return currItem[0];
  }
  return null;
};

const Search = (props) => {
  const { filterString, setFilterString } = props;
  return (
    <Paper
      sx={{
        display: 'flex',
        padding: '6px',
        margin: '5px 20px',
      }}
    >
      <TextField
        fullWidth
        label={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '20px',
              gap: '5px',
            }}
          >
            Search{' '}
            <SearchIcon
              sx={{
                fontSize: '20px',
              }}
            />
          </div>
        }
        variant="standard"
        value={filterString}
        onChange={(e) => {
          setFilterString(e.target.value);
        }}
      />
    </Paper>
  );
};

const FoodCard = (props) => {
  const { setRatedFoodItems, ratedItem, isReturn, navigate } = props;
  const [rating, setRating] = useState(parseInt(props?.ratings?.Rating, 10));
  const [comments, setComments] = useState('');
  const isLargeMobile = useMediaQuery('(max-width:450px)');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/dashboard/giveRating`,
        {
          foodId: props?.item?._id,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      res = res.data;
      res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/dashboard/submitFoodReview`,
        {
          id: props?.ratings?.FoodItem,
          value: rating,
          comments,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      res = await getFoodReviews();
      if (res?.length > 0) {
        setRatedFoodItems(res);
      }
      res = res.data;
      if (isReturn) {
        navigate('/dashboard/app');
      }
    } catch (err) {
      const mute = err;
      console.log(mute);
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: !isLargeMobile ? '200px' : '250px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        margin: '10px',
        gap: '5px',
        border: `${!ratedItem ? '1px solid lightgray' : ''}`,
        height: '100%',
      }}
    >
      <CardMedia
        image={props?.item?.Image}
        component="img"
        sx={{
          borderRadius: '100%',
          height: '80px',
          width: '80px',
          objectFit: 'cover',
        }}
        loading="lazy"
      />
      <Typography variant="h4" component="p" textAlign="center">
        {props?.item?.Name?.slice(0, 10)}
        {props?.item?.Name?.length > 10 ? '...' : ''}
      </Typography>
      <Typography variant="body" component="p" textAlign="center">
        {props?.ratings ? `${parseFloat(props?.ratings?.Rating).toFixed(2)}/5` : 'Unrated'}
      </Typography>
      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        onSubmit={handleSubmit}
      >
        <FormControl required>
          <Rating
            value={ratedItem ? ratedItem?.rating : rating}
            name="rating"
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            precision={0.2}
            disabled={ratedItem}
          />
        </FormControl>
        <FormControl required>
          <TextField
            placeholder="Enter Review"
            multiline
            maxRows="5"
            minRows="5"
            name="comments"
            value={ratedItem ? ratedItem?.comments : comments}
            onChange={(e) => {
              setComments(e.target.value);
            }}
            disabled={ratedItem}
          />
        </FormControl>
        {!ratedItem && <Button type="submit">Submit</Button>}
      </form>
    </Card>
  );
};

const MobileRatings = (props) => {
  const { timetable, ratings } = props;
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const isHidden = searchParams.has('hidden');
  const isValue = searchParams.has('value');
  const hidden = isHidden;
  const value = isValue ? searchParams.get('value') : null;
  // console.log({ hidden, value });
  const allFoodItems = allItems(filterTimeTable(timetable));
  const uniqFoodItems = uniqBy(allFoodItems, (ele) => ele?._id);
  const uniqIds = uniqueIDs(allFoodItems);
  const filteredRatings = filterRatings(ratings, uniqIds);
  // console.log(getItem(filteredRatings[0]?.FoodItem, allFoodItems));
  // console.log({ filteredRatings, allFoodItems });
  const [filterString, setFilterString] = useState('');
  const [ratedFoodItems, setRatedFoodItems] = useState([]);
  const isLargeMobile = useMediaQuery('(max-width:480px)');
  const getRatedFoodItems = useCallback(async () => {
    const res = await getFoodReviews();
    setRatedFoodItems(res);
  }, []);
  useEffect(() => {
    let mount = true;
    if (mount) {
      getRatedFoodItems();
      if (hidden) {
        setFilterString(value);
      }
    }
    return () => {
      mount = false;
    };
  }, [getRatedFoodItems]);
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        justifyContent: 'center',
      }}
      disableGutters
    >
      <Search setFilterString={setFilterString} filterString={filterString} />
      <div
        style={{
          margin: '10px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: !isLargeMobile ? 'space-between' : 'center',
          alignItems: 'baseline',
        }}
      >
        {uniqFoodItems.map((foodItem) => {
          const rating = find(ratings, { FoodItem: foodItem?._id });
          const ratedItems = find(ratedFoodItems, { foodId: foodItem?._id });
          if (filterString === '') {
            return (
              <FoodCard
                item={foodItem}
                ratings={rating}
                setRatedFoodItems={setRatedFoodItems}
                ratedItem={ratedItems}
                key={foodItem?.FoodItem}
                isReturn={hidden}
                navigate={navigate}
              />
            );
          }
          if (!hidden && filterString !== '' && foodItem?.Name?.toLowerCase().includes(filterString.toLowerCase())) {
            return (
              <FoodCard
                item={foodItem}
                ratings={rating}
                setRatedFoodItems={setRatedFoodItems}
                ratedItem={ratedItems}
                key={foodItem?.FoodItem}
                isReturn={hidden}
                navigate={navigate}
              />
            );
          }
          if (hidden && filterString !== '' && foodItem?.Name?.toLowerCase() === filterString.toLowerCase()) {
            return (
              <FoodCard
                item={foodItem}
                ratings={rating}
                setRatedFoodItems={setRatedFoodItems}
                ratedItem={ratedItems}
                key={foodItem?.FoodItem}
                isReturn={hidden}
                navigate={navigate}
              />
            );
          }
          return null;
        })}
      </div>
    </Container>
  );
};

export default MobileRatings;

import { Card, Container, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Legend } from 'recharts';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CSSTransition } from 'react-transition-group';
import '../utils/fadeAnimation.css';


const ManagerDashboard = () => {

    const [selected, setSelected] = useState(null);

    const getAllTimeSeriesData = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/manager/dashboard/getTimeSeries`;
            let res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            res = await res.json();
            return res;
        } catch (err) {
            console.log('error', err);
            return [];
        }
    }

    const getAllFoodItems = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/manager/dashboard/allFoodItems`;
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            response = await response.json();
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return [];
        }
    };


    const [timeSeriesData, setTimeSeriesData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [availableItems, setAvailableItems] = useState(null);
    const [allFoodItems, setAllFoodItems] = useState([]);
    const [foodItemImage, setFoodItemImage] = useState(null);

    useEffect(() => {
        getAllTimeSeriesData().then((res) => {
            setTimeSeriesData(res);
        });
        getAllFoodItems().then((res) => {
            setAllFoodItems(res);
        });

    }, []);

    useEffect(() => {
        if (timeSeriesData && allFoodItems) {
            const currSet = new Set();
            timeSeriesData.forEach((ele) => {
                currSet.add(ele.FoodItemId);
            });
            const arr = [];
            allFoodItems.forEach((ele) => {
                if (currSet.has(ele.Id)) {
                    arr.push({
                        value: ele.Id,
                        label: ele.Name
                    })
                }
            });
            setAvailableItems(arr);
        }
    }, [timeSeriesData, allFoodItems])

    const filterHandler = (foodId) => {
        // console.log(timeSeriesData);
        const ele = allFoodItems.filter((x) => { return x.Id === foodId; });
        setFoodItemImage(ele[0].Img);
        const currItems = [];
        timeSeriesData.forEach((ele) => {
            if (ele.FoodItemId === foodId) {
                const date = new Date(ele.Date);
                currItems.push({ 'Date': date.toUTCString(), 'Rating': ele.Rating, 'NoOfReviews': ele.NoOfReviews });
            }
        })
        setFilterData(currItems);
    }


    const onChange = (value) => {
        filterHandler(value);
        setSelected(value);
        console.log(filterData);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };

    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const SelectFood = (props) => (
        <Select
            showSearch
            placeholder="Select A Food Item"
            optionFilterProp="children"
            onChange={onChange}
            value={selected}
            onSearch={onSearch}
            filterOption={filterOption}
            options={props.options}
        />
    );

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Food Items Summary
                    </Typography>
                </Stack>
                <Card sx={{ padding: '10px' }}>
                    <Grid container>
                        <Grid item lg={4}>
                            <Typography variant="h4" gutterBottom>
                                Select Food Item
                            </Typography>
                            <Typography variant="h4" gutterBottom align='center'>
                                <SelectFood options={availableItems} />
                            </Typography>
                            <Box sx={{
                                width: '100%',
                                padding: '30px',
                                display: 'flex',
                                justifyContent: 'center'

                            }}>
                                {foodItemImage ?
                                    <CSSTransition
                                        key={foodItemImage}
                                        in
                                        appear
                                        timeout={300}
                                        classNames="fade"
                                    ><img src={foodItemImage} alt="foodItem" style={{ maxHeight: '300px' }} />
                                    </CSSTransition>
                                    : <></>}
                            </Box>
                        </Grid>
                        <Grid item lg={8}>
                            <Typography gutterBottom align='center' sx={{ mt: '20px' }}>
                                {filterData.length === 0 ? <></> :
                                    <>
                                        <LineChart width={700} height={250} data={filterData}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="Date" />
                                            <YAxis domain={[0, 5]} />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="Rating" stroke="#82ca9d" />
                                        </LineChart>
                                    </>
                                }
                                {filterData.length === 0 ? <></> :
                                    <>
                                        <LineChart width={700} height={250} data={filterData}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="Date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="NoOfReviews" stroke="#8884d8" />
                                        </LineChart>
                                    </>
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Container >
        </>
    );


};

export default ManagerDashboard;
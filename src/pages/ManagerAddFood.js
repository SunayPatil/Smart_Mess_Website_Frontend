import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, Select, Form, Input } from "antd";
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../utils/fadeAnimation.css';
import { addFoodItem, createFoodItem, getAllFoodIitems, getDashTimeTable, delFoodItem } from "../utils/apis";

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


const { Option } = Select;

const ManagerAddFood = () => {

  const [user, setUser] = useState({})
  const [foodItems, setFoodItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleteDay, setDeleteDay] = useState("")
  const [deleteType, setDeleteType] = useState("")
  const [timeTableData, setTimeTableData] = useState([])
  const [reqData, setReqData] = useState([])
  const [optSel, setOptSel] = useState(4);
  const [selFoodItem, setSelFoodItem] = useState("")



  const getUser = async () => {
    let user = await localStorage.getItem("user")
    user = await JSON.parse(user)
    setUser(user)
  }
  useEffect(() => {
    try {
      getUser()
    } catch (error) {
      console.log("error")
    }
  }, [])
  const onFinish = async (values) => {
    const res = await createFoodItem(values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  }


  console.log(timeTableData)
  const getTimeTableData = async () => {
    setLoading(true)
    try {
      const res = await getDashTimeTable()
      if (res?.length) {
        setTimeTableData(res)
      }
    } catch (error) {
      setLoading(false)
    }
    setLoading(false)
  }
  useEffect(() => {
    try {
      getTimeTableData()
    } catch (error) {
      setLoading(false)
    }
  }, [])

  const fileteredDataForDelete = timeTableData?.slice(0)?.filter((item) => {
    return item.Day === deleteDay && item.Type === deleteType
  })
  console.log(fileteredDataForDelete)
  const fetchAllFoodItems = async () => {
    const res = await getAllFoodIitems()
    setFoodItems(res)
    console.log(res)
  }
  useEffect(() => {
    try {
      fetchAllFoodItems()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const addTimeTable = async (values) => {
    console.log(values)
    const res = await addFoodItem(values)
    console.log(res)
  }

  const delTimeTable = async (values) => {
    console.log(values)
    const res = await delFoodItem(values)
    console.log(res)
  }

  const foodItemChange = (value) => {
    // filterHandler(value);
    setSelFoodItem(value);
    // console.log(filterData);
  };

  // const onSearch = (value) => {
  // console.log('search:', value);
  // };

  // console.log(deleteDay, deleteType)

  const newFoodItem = () => {
    return (
      <>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Create New Food Item
        </Typography>
        <Form
          name="Create Food Item"
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          style={{
            maxWidth: 600
          }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name of Food Item"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name of Food Item!"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image of Food Item"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input the link to image of food item"
              }
            ]}
          >
            <Input placeholder='Insert Image Link' />
          </Form.Item>

          <Form.Item name="category" label="Food Item Category" rules={[{ required: true }]}>
            <Select allowClear>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </>
    )
  }

  const addToTimeTable = () => {
    return (
      <>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Add Food Item to TimeTable
        </Typography>
        <Form
          name="Add to TimeTable"
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          style={{
            maxWidth: 600
          }}
          initialValues={{
            remember: true
          }}
          onFinish={addTimeTable}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="day" label="Day" rules={[{ required: true }]}>
            <Select allowClear>
              <Option value="Monday">Monday</Option>
              <Option value="Tuesday">Tuesday</Option>
              <Option value="Wednesday">Wednesday</Option>
              <Option value="Thursday">Thursday</Option>
              <Option value="Friday">Friday</Option>
              <Option value="Saturday">Saturday</Option>
              <Option value="Sunday">Sunday</Option>
            </Select>
          </Form.Item>

          <Form.Item name="mealType" label="Mealtype" rules={[{ required: true }]}>
            <Select allowClear>
              <Option value="Breakfast">Breakfast</Option>
              <Option value="Lunch">Lunch</Option>
              <Option value="Snacks">Snacks</Option>
              <Option value="Dinner">Dinner</Option>
            </Select>
          </Form.Item>

          <Form.Item name="mealItem" label="Food Items" rules={[{ required: true }]}>
            {/* <Select allowClear>
              {foodItems?.map((item) => {
                return <Option key={item.Id} value={item.Id}>{item.Name}</Option>
              })}
            </Select> */}
            <Select
              showSearch
              placeholder="Select A Food Item"
              optionFilterProp="children"
              onChange={foodItemChange}
              value={selFoodItem}
              // onSearch={onSearch}
              filterOption={filterOption}
              options={foodItems.map((item) => {
                return { 'value': item.Id, 'label': item.Name };
              })}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </>
    )
  }

  const deleteFromTimeTable = () => {
    return (
      <>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Delete Food Item from TimeTable
        </Typography>
        <Form
          name="Delete from TimeTable"
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          style={{
            maxWidth: 600
          }}
          initialValues={{
            remember: true
          }}
          onFinish={delTimeTable}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="day" label="Day" rules={[{ required: true }]}>
            <Select onChange={(val) => setDeleteDay(val)} allowClear>
              <Option value="Monday">Monday</Option>
              <Option value="Tuesday">Tuesday</Option>
              <Option value="Wednesday">Wednesday</Option>
              <Option value="Thursday">Thursday</Option>
              <Option value="Friday">Friday</Option>
              <Option value="Saturday">Saturday</Option>
              <Option value="Sunday">Sunday</Option>
            </Select>
          </Form.Item>

          <Form.Item name="mealType" label="Mealtype" rules={[{ required: true }]}>
            <Select onChange={(type) => setDeleteType(type)} allowClear>
              <Option value="Breakfast">Breakfast</Option>
              <Option value="Lunch">Lunch</Option>
              <Option value="Snacks">Snacks</Option>
              <Option value="Dinner">Dinner</Option>
            </Select>
          </Form.Item>

          <Form.Item name="mealItem" label="Food Items" rules={[{ required: true }]}>
            <Select allowClear>
              {fileteredDataForDelete[0]?.Items?.map((item) => {
                return <Option key={item._id} value={item._id}>{item.Name}</Option>
              })}
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Button type="primary" htmlType="submit">
              Delete
            </Button>
          </Form.Item>
        </Form>
      </>
    )
  }

  const getSelOption = () => {
    if (optSel === 1) {
      return (
        <>
          {newFoodItem()}
        </>
      );
    }
    if (optSel === 2) {
      return (
        <>
          {addToTimeTable()}
        </>
      );
    }
    if (optSel === 3) {
      return (
        <>
          {deleteFromTimeTable()}
        </>
      );
    }
    return <><Typography variant='h1' align='center'>Welcome</Typography></>
  }

  return (
    <>
      {user?.Role === "user" && <Navigate to="/404" />}
      {user?.Role === "manager" &&
        <Box sx={{ height: '100%' }}>
          <Grid container spacing={5} sx={{ alignContent: 'center', height: '100%' }}>
            <Grid item lg={4}>
              <Stack spacing={3} sx={{
                maxWidth: '300px'
              }}>
                <Button onClick={() => setOptSel(1)}>Create A New Food Item</Button>
                <Button onClick={() => setOptSel(2)}>Add Food To Time Table</Button>
                <Button onClick={() => setOptSel(3)}>Delete Food From Time Table</Button>
                {optSel !== 4 ? <Button onClick={() => setOptSel(4)}>Close</Button> : <></>}
              </Stack>
            </Grid>
            <Grid item lg={8}>
              <CSSTransition
                key={optSel}
                in
                appear
                timeout={300}
                classNames="fade"
              >
                {getSelOption()}
              </CSSTransition>
            </Grid>
          </Grid>
        </Box >
      }
    </>
  )
};
export default ManagerAddFood;

import React from 'react'
import { Button, Flex, Tooltip, Table, Image, Modal} from 'antd';
import { DeleteOutlined, PlusOutlined, EditOutlined, DeleteFilled, EditFilled  } from '@ant-design/icons';

function App() {
  const columns = [{
    title: 'Profile',
    dataIndex: 'profile',
    key: 'profile',
  },
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',
  },
   {
    title: 'Email',
    dataIndex: 'Email',
    key: 'Email',
  },
   {
    title: 'Mobile',
    dataIndex: 'Mobile',
    key: 'Mobile',
  },
   {
    title: 'Gender',
    dataIndex: 'Gender',
    key: 'Gender',
  },
   {
    title: 'Address',
    dataIndex: 'Address',
    key: 'Address',
  },
   {
    title: 'Action',
    dataIndex: 'Action',
    key: 'Action',
    render : ()=>(
      <div className='flex gap-2'>
         <Button
          icon={<EditFilled />}
          shape="circle"
          type="text"
          className="text-blue-500"
        />

        <Button
          icon={<DeleteFilled />}
          shape="circle"
          type="text"
          className="text-red-500"
        />
      </div>
    )
  },
]
  const data = [
    {
      profile : (<Image className="rouded-full" src="https://img.freepik.com/premium-photo/creative-3d-vector-digital-art-mascot-avatar-design-indian-person-character_732449-20024.jpg?w=2000" width={40} />),
      Name : "Rahul",
      Email : "rahul@gmail.com",
      Mobile: "9876543219",
      Gender: "Male",
      Address: "Delhi, India"
    },
    {
      profile : (<Image className="rouded-full" src="https://png.pngtree.com/png-vector/20231019/ourlarge/pngtree-user-profile-avatar-png-image_10211467.png" width={40} />),
      Name : "Mohit",
      Email : "mohit@gmail.com",
      Mobile: "9876543219",
      Gender: "Male",
      Address: "Bhopal, India"
    },
    {
      profile : (<Image className="rouded-full" src="https://png.pngtree.com/png-vector/20231019/ourlarge/pngtree-user-profile-avatar-png-image_10211467.png" width={40} />),
      Name : "Mohit",
      Email : "mohit@gmail.com",
      Mobile: "9876543219",
      Gender: "Male",
      Address: "Bhopal, India"
    },
    {
      profile : (<Image className="rouded-full" src="https://png.pngtree.com/png-vector/20231019/ourlarge/pngtree-user-profile-avatar-png-image_10211467.png" width={40} />),
      Name : "Mohit",
      Email : "mohit@gmail.com",
      Mobile: "9876543219",
      Gender: "Male",
      Address: "Bhopal, India"
    },
    {
      profile : (<Image className="rouded-full" src="https://png.pngtree.com/png-vector/20231019/ourlarge/pngtree-user-profile-avatar-png-image_10211467.png" width={40} />),
      Name : "Mohit",
      Email : "mohit@gmail.com",
      Mobile: "9876543219",
      Gender: "Male",
      Address: "Bhopal, India"
    },
    {
      profile : (<Image className="rouded-full" src="https://png.pngtree.com/png-vector/20231019/ourlarge/pngtree-user-profile-avatar-png-image_10211467.png" width={40} />),
      Name : "Mohit",
      Email : "mohit@gmail.com",
      Mobile: "9876543219",
      Gender: "Male",
      Address: "Bhopal, India"
    },  
  ]
  return (
    <div className='min-h-screen bg-rose-100 flex flex-col items-center md:p-4'>
      <div className="flex justify-between items-center bg-blue-600 w-10/12 my-5 p-4 rounded-lg">
        <h1 className='ml-8 cpitalize font-bold text-white text-3xl'>Mern Crud Operation</h1>
        <Button className='mr-8' type="primary" shape="circle" size='large' icon={<PlusOutlined/>}/>
      </div>
      <Table 
        columns={columns}
        dataSource={data}
        className='w-10/12'
        pagination={{pageSize:5, position:['bottomCenter']}}
        scroll={{x: 'max-content'}}
      />
      <Modal
        open={true}
        footer={null}
        title={
          <h1>
            Registration Form
          </h1>
        }
      />
    </div>
  )
}

export default App
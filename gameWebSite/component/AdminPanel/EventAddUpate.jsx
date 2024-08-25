import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { createModel, getModel, updateModel } from "../../service/EventService";



const EventAddUpdate = () => {
  const { id } = useParams();
  const [fullPicture, setFullPicture] = useState('');
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getModel(id)
        .then((response) => {
          

          setFullPicture(response.data.picture);

          
          form.setFieldsValue({
            title: response.data.title,
            content: response.data.content,
          });
        })
        .catch((error) => {
          console.error("Failed to fetch mpdel data", error);
        });
    }
  }, [id, form]);



  const onFinish = (values) => {
  
    const model = {
      title: values.title,
      content: values.content,
      picture: fullPicture
    };

    if (!id) {
      createModel(model).then((response) => {
        setTimeout(()=> {
          navigate('/admin/events')
        }, 500)
        console.log(response.data);
      }).catch((error) => {
        message.error('Failed to create model.');
        console.error(error);
      });
    } else {
      updateModel(id, model).then((response) => {
        message.success('Model updated successfully!');
        setTimeout(()=> {
          navigate('/admin/events')
        }, 500)
      }).catch((error) => {
        message.error('Failed to update model.');
        console.error(error);
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };



  function handlePic(event, type) { 
    
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
    
      if (type === 'little') {
            
          } else if (type === 'full') {
            setFullPicture(reader.result);
          }
      
    }
    
}


  

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Event Title"
        name="title"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Event Content"
        name="content"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

     

   

      <Form.Item
        label="Full Picture"
       
        valuePropName="fileList"
        getValueFromEvent={(e) => normFile(e, 'full')}
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <input class="form-control" type="file" id="formFile" onChange={(e) => handlePic(e, "full")}></input>
        <div> <img style={{width:'200px', height:'200px'}} src={fullPicture}></img></div>
       
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          ADD or Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventAddUpdate;

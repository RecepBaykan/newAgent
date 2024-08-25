import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { createModel, getModel, updateModel } from "../../service/NewsService";



const NewsAddUpdate = () => {
  const { id } = useParams();
  const [fullPicture, setFullPicture] = useState('');
  const [form] = Form.useForm(); // Form referansı
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
          console.error("Failed to fetch news data", error);
        });
    }
  }, [id, form]);



  const onFinish = (values) => {
  
    const news = {
      title: values.title,
      content: values.content,
      picture: fullPicture
    };

    if (!id) {
      createModel(news).then((response) => {
        setTimeout(()=> {
          navigate('/admin/news')
        }, 500)
        console.log(response.data);
      }).catch((error) => {
        message.error('Failed to create news.');
        console.error(error);
      });
    } else {
      updateModel(id, news).then((response) => {
        message.success('News updated successfully!');
        setTimeout(()=> {
          navigate('/admin/news')
        }, 500)
      }).catch((error) => {
        message.error('Failed to update news.');
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
        label="News Title"
        name="title"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="News Content"
        name="content"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

     

   

      <Form.Item
        label="Picture"
       
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

export default NewsAddUpdate;

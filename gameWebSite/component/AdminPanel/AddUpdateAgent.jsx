import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { createAgent, getAgent, updateAgent } from "../../service/AgentService";



const AddUpdateAgent = () => {
  const { id } = useParams();
  const [skills, setSkills] = useState([{ title: "", skill: "" }]);
  const [littlePicture, setLittlePicture] = useState('');
  const [fullPicture, setFullPicture] = useState('');
  const [form] = Form.useForm(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getAgent(id)
        .then((response) => {
          const updatedSkills = response.data.titleSkill.map((title, index) => ({
            title: title,
            skill: response.data.descSkill[index],
          }));

          setSkills(updatedSkills);
          setLittlePicture(response.data.pictureLitle);
          setFullPicture(response.data.pictureFull);

          
          form.setFieldsValue({
            name: response.data.name,
            info: response.data.info,
          });
        })
        .catch((error) => {
          console.error("Failed to fetch agent data", error);
        });
    }
  }, [id, form]);

  const onSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };


  const onFinish = (values) => {
    const title = skills.map(s => s.title);
    const skill = skills.map(s => s.skill);
    
    const agent = {
      name: values.name,
      info: values.info,
      titleSkill: title,
      descSkill: skill,
      pictureLitle: littlePicture, 
      pictureFull: fullPicture
    };

    if (!id) {
      createAgent(agent).then((response) => {
        setTimeout(()=> {
          navigate('/admin/agents')
        }, 500)
        console.log(response.data);
      }).catch((error) => {
        message.error('Failed to create agent.');
        console.error(error);
      });
    } else {
      updateAgent(id, agent).then((response) => {
        message.success('Agent updated successfully!');
        setTimeout(()=> {
          navigate('/admin/agents')
        }, 500)
      }).catch((error) => {
        message.error('Failed to update agent.');
        console.error(error);
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const addSkill = () => {
    setSkills([...skills, { title: "", skill: "" }]);
  };



  function handlePic(event, type) { 
    
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
    
      if (type === 'little') {
            setLittlePicture(reader.result);
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
        label="Agent Name"
        name="name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Agent Info"
        name="info"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      {skills.map((skill, index) => (
        <React.Fragment key={index}>
          <Form.Item
            label={`Agent Skill Title ${index + 1}`}
            rules={[{ required: true }]}
          >
            <Input 
              value={skill.title}
              onChange={(e) => onSkillChange(index, 'title', e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label={`Agent Skill Desc ${index + 1}`}
            rules={[{ required: true }]}
          >
            <Input 
              value={skill.skill}
              onChange={(e) => onSkillChange(index, 'skill', e.target.value)}
            />
          </Form.Item>
        </React.Fragment>
      ))}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="dashed" onClick={addSkill}>
          Add Skill
        </Button>
      </Form.Item>

      <Form.Item
        label="Little Picture"
        
        valuePropName="fileList"
        getValueFromEvent={(e) => normFile(e, 'little')}
        wrapperCol={{ offset: 8, span: 16 }}
      >
         <input class="form-control" type="file" id="formFile" onChange={(e) => handlePic(e, "little")}></input>
        <div> <img style={{width:'100px', height:'100px'}} src={littlePicture}></img></div>
       
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

export default AddUpdateAgent;

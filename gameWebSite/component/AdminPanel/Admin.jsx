import React from "react";
import '../AdminPanel/App.css'
import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import Agents from "./Agents";
import AddUpdateAgent from "./AddUpdateAgent";
import News from "./News";
import NewsAddUpdate from "./NewsAddUpdate";
import Patch from "./Patch";
import PatchAddUpdate from "./PatchAddUpdate";
import EventAddUpdate from "./EventAddUpate";
import Event from "./Event";
import MapAddUpdate from "./MapAddUpdate";
import Map from "./Map";
import Weapon from "./Weapon";
import WeaponAddUpdate from "./WeaponAddUpdate";

const { Header, Content, Footer, Sider } = Layout;
const headerItems = [
  {
    key: "1",
    label: "New Agent Content Control Center",
    link: "/",
  },
];

const sideItems = [
  {
    key: "1",
    label: "News",
    link: "news",
  },
  {
    key: "2",
    label: "Patch Notes",
    link: "patchs",
  },

  {
    key: "3",
    label: "Event List",
    link: "events",
  },
  {
    key: "4",
    label: "Agent List",
    link: "agents",
  },

  {
    key: "5",
    label: "Map List",
    link: "maps",
  },

  {
    key: "6 ",
    label: "Weapon List",
    link: "weapons",
  },
];

const Admin = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    const selectedItem = sideItems.find((item) => item.key === e.key);
    if (selectedItem) {
      navigate(selectedItem.link);
    }
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
         
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
           
            items={headerItems}
            style={{
              flex: 1,
              minWidth: 0,
            }}
            selectedKeys={false}
          />
         
        </Header>
        <Layout style={{ flex: 1 }}>
          <Sider
            width={200}
            breakpoint="lg"
            collapsedWidth="0"
            style={{
             
              margin: 10,
              position: "fixed",
              zIndex: "1000",
              color: "white",
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              theme="light"
              style={{ borderRadius: "3%", minHeight: 500 }}
              items={sideItems}
              onClick={handleMenuClick}
            />
          </Sider>
          <Layout
            style={{
              padding: "24px",

              
            }}
          >
            <Content
              className="content"
              style={{
                minHeight: "100%",
               
              }}
            >
              <Routes>
             
                <Route path="agents" element={<Agents />} />
                <Route path="addAgent" element={<AddUpdateAgent />} />
                <Route path="agentUpdate/:id" element={<AddUpdateAgent />} />

                <Route path="news" element={<News />} />
                <Route path="addNews" element={<NewsAddUpdate/>}/>
                <Route path="updateNews/:id" element={<NewsAddUpdate/>}/>

                <Route path="patchs" element={<Patch />} />
                <Route path="addPatch" element={<PatchAddUpdate/>}/>
                <Route path="updatePatch/:id" element={<PatchAddUpdate/>}/>

                <Route path="events" element={<Event />} />
                <Route path="addEvent" element={<EventAddUpdate/>}/>
                <Route path="updateEvent/:id" element={<EventAddUpdate/>}/>


                <Route path="maps" element={<Map />} />
                <Route path="addMap" element={<MapAddUpdate/>}/>
                <Route path="updateMap/:id" element={<MapAddUpdate/>}/>

                <Route path="weapons" element={<Weapon />} />
                <Route path="addWeapon" element={<WeaponAddUpdate/>}/>
                <Route path="updateWeapon/:id" element={<WeaponAddUpdate/>}/>


                
              </Routes>
            </Content>
          </Layout>
        </Layout>
        <Footer
          style={{
           
          
          }}
        >
          New Agent{new Date().getFullYear()}
        </Footer>
      </Layout>
    </>
  );
};

export default Admin;

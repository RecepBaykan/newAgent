import React, { useEffect, useState } from "react";
import '../component/siderBarAgent.css';
import { listModel } from "../service/WeaponService";

const WeaponSection = () => {
  const [selected, setSelected] = useState(null); 
  const [index, setIndex] = useState(null);
  const [models, setModels] = useState([]);
 

  useEffect(() => {
    listModel().then((response) => {
      setModels(response.data);
      if (response.data.length > 0) {
        setSelected(response.data[0].id);
        setIndex(0);
       
      }
    }).catch((error) => {
      console.error('Error fetching model:', error);
    });
  }, []);

  const handleSelect = (id) => {
    const selectedIndex = models.findIndex(model => model.id === id);
    setIndex(selectedIndex);
    setSelected(id);
    if (selectedIndex !== -1) {
     
    }
  };

  return (
    <>
      {models.length > 0 && (
        <div>
          <div className="sidebar">
            {models.map((model) => (
              <div
                key={model.id}
                className={`operator ${selected === model.id ? "selected" : ""}`}
                onClick={() => handleSelect(model.id)}
              >
                <div className="operator-image">
                  <img src={model.picture} alt={"model image"} />
                  <div className="operator-name">{model.title}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {selected && index !== null && (
              <div className="sidebarCenter">
                <img src={models[index].picture} alt={"image"} />
              </div>
            )}
          </div>
          <div>
            {selected && index !== null && (
              <div className="sidebarRight show">
                <div>
                  <h2>{models[index].title}</h2>
                  <p>
                    <b>Silah adı:</b> {models[index].title}
                    <br />
                    <b>Özellikleri: </b> {models[index].content}
                  </p>
                 
                 
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WeaponSection;

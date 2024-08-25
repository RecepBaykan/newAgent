import React, { useEffect, useState } from "react";
import "../component/siderBarAgent.css";
import { listModel } from "../service/NewsService";
import "../component/css/newsCard.css";

const NewsSection = () => {
  const [selected, setSelected] = useState(null);
  const [index, setIndex] = useState(null);
  const [models, setModels] = useState([]);

  useEffect(() => {
    listModel()
      .then((response) => {
        setModels(response.data);
        if (response.data.length > 0) {
          setSelected(response.data[0].id);
          setIndex(0);
        }
      })
      .catch((error) => {
        console.error("Error fetching model:", error);
      });
  }, []);



  return (
    <>
     
   
         
      {models.length > 0 && (

        
        <div className="cardContainer">
           <div className="card">
           <div className="card_form" style={{ backgroundImage: `url(${models[index].picture})` }}>

            
              <span>Devs</span>
             
            </div>
            <div className="card_data">
              <div style={{display: 'flex'}} class="data">
                <div className="text">
                  <label className="text_m">{models[index].title}</label>
                  <div className="cube text_s">
                    <label className="side front">
                      
                    </label>
                    <label className="side top"></label>
                  </div>
                </div>
              </div>
              <span>Oku</span>
            </div>
          </div>
          <div>
          

          </div>

         
        </div>
      )}
    </>
  );
};

export default NewsSection;

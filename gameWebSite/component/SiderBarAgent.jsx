import React, { useEffect, useState } from "react";
import '../component/siderBarAgent.css';
import { listAgents } from "../service/AgentService";

const SiderBarAgent = () => {
  const [selected, setSelected] = useState(null); // İlk seçili öğe yok
  const [index, setIndex] = useState(null);
  const [agents, setAgents] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    listAgents().then((response) => {
      setAgents(response.data);
      if (response.data.length > 0) {
        setSelected(response.data[0].id);
        setIndex(0);
        setSkills({
          skillTitle: response.data[0].titleSkill,
          skillDesc: response.data[0].descSkill
        });
      }
    }).catch((error) => {
      console.error('Error fetching agents:', error);
    });
  }, []);

  const handleSelect = (id) => {
    const selectedIndex = agents.findIndex(agent => agent.id === id);
    setIndex(selectedIndex);
    setSelected(id);
    if (selectedIndex !== -1) {
      setSkills({
        skillTitle: agents[selectedIndex].titleSkill,
        skillDesc: agents[selectedIndex].descSkill
      });
    }
  };

  return (
    <>
      {agents.length > 0 && (
        <div>
          <div className="sidebar">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`operator ${selected === agent.id ? "selected" : ""}`}
                onClick={() => handleSelect(agent.id)}
              >
                <div className="operator-image">
                  <img src={agent.pictureLitle} alt={agent.name} />
                  <div className="operator-name">{agent.name}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {selected && index !== null && (
              <div className="sidebarCenter">
                <img src={agents[index].pictureFull} alt={agents[index].name} />
              </div>
            )}
          </div>
          <div>
            {selected && index !== null && (
              <div className="sidebarRight show">
                <div>
                  <h2>{agents[index].name}</h2>
                  <p>
                    <b>Adı:</b> {agents[index].name}
                    <br />
                    <b>Görevi:</b> {agents[index].info}
                  </p>
                  <h3>Taktiksel Nesneler</h3>
                  <ul>
                    {skills.skillTitle && skills.skillDesc && skills.skillTitle.map((title, i) => (
                      <li key={i}>
                        <b>{title}: </b> {skills.skillDesc[i]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SiderBarAgent;

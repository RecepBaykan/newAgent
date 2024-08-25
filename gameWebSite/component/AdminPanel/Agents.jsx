import React, { useEffect, useState } from "react";
import { deleteAgent, listAgents } from "../../service/AgentService";
import { Button, Card } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const agentsPerPage = 10;

  const navigate = useNavigate();

  const update = (id) => {
    navigate(`/admin/agentUpdate/${id}`);
  };

  const agentDelete = (id) => {
    deleteAgent(id)
      .then((response) => {
        console.log("Agent successfully deleted.");
        // Agent silindikten sonra listeyi güncelle
        setAgents(agents.filter(agent => agent.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting agent:", error);
      });
  };

  useEffect(() => {
    listAgents()
      .then((response) => {
        setAgents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const indexOfLastAgent = (currentPage + 1) * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);

  const nextPage = () => {
    if (indexOfLastAgent < agents.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div>
        <h2>Agent List</h2>
        <div style={{ marginTop: "20px" }}>
          <Button>
            <Link to="/admin/addAgent">Add Agent</Link>
          </Button>
          <Button onClick={prevPage} disabled={currentPage === 0}>
            Prev
          </Button>
          <Button onClick={nextPage} disabled={indexOfLastAgent >= agents.length}>
            Next
          </Button>
        </div>
        <br />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {currentAgents.map((agent) => (
            <Card
              key={agent.id}
              title={agent.name}
              style={{
                width: 240,
              }}
              cover={<img alt="AgentImage" src={agent.pictureLitle} />}
            >
              <p>id: {agent.id}</p>
              <p>name: {agent.name}</p>
              <Button
                onClick={() => update(agent.id)}
                style={{ backgroundColor: "green", color: "white" }}
              >
                Edit
              </Button>
              <Button
                onClick={() => agentDelete(agent.id)}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Delete
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Agents;

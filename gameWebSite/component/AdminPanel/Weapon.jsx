import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { deleteModel, listModel } from "../../service/WeaponService";

const Weapon = () => {
  const [model, setModel] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const modelPerPage = 10;

  const navigate = useNavigate();

  const update = (id) => {
    navigate(`/admin/updateWeapon/${id}`);
  };

  const deleteM = (id) => {
    deleteModel(id)
      .then((response) => {
        console.log("Model successfully deleted.");
       
        setNews(model.filter(item => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting model:", error);
      });
  };

  useEffect(() => {
    listModel()
      .then((response) => {
        setModel(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const indexOfLastModel = (currentPage + 1) * modelPerPage;
  const indexOfFirstModel = indexOfLastModel - modelPerPage;
  const currentModel = model.slice(indexOfFirstModel, indexOfLastModel);

  const nextPage = () => {
    if (indexOfLastModel < model.length) {
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
        <h2>Weapon List</h2>
        <div style={{ marginTop: "20px" }}>
          <Button>
            <Link to="/admin/addWeapon">Add Weapon</Link>
          </Button>
          <Button onClick={prevPage} disabled={currentPage === 0}>
            Prev
          </Button>
          <Button onClick={nextPage} disabled={indexOfLastModel >= model.length}>
            Next
          </Button>
        </div>
        <br />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {currentModel.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              style={{
                width: 240,
               
              }}
              cover={<img alt="Image" src={item.picture} />}
            >
              <p>id: {item.id}</p>
              <p>title: {item.title}</p>
              <Button
                onClick={() => update(item.id)}
                style={{ backgroundColor: "green", color: "white" }}
              >
                Edit
              </Button>
              <Button
                onClick={() => deleteM(item.id)}
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

export default Weapon;

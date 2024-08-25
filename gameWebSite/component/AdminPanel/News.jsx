import React, { useEffect, useState } from "react";
import { deleteModel, listModel } from "../../service/NewsService";
import { Button, Card } from "antd";
import { Link, useNavigate } from "react-router-dom";

const News = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const newsPerPage = 10;

  const navigate = useNavigate();

  const update = (id) => {
    navigate(`/admin/updateNews/${id}`);
  };

  const newsDelete = (id) => {
    deleteModel(id)
      .then((response) => {
        console.log("News successfully deleted.");
        // Haber silindikten sonra listeyi güncelle
        setNews(news.filter(item => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting news:", error);
      });
  };

  useEffect(() => {
    listModel()
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const indexOfLastNews = (currentPage + 1) * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const nextPage = () => {
    if (indexOfLastNews < news.length) {
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
        <h2>News List</h2>
        <div style={{ marginTop: "20px" }}>
          <Button>
            <Link to="/admin/addNews">Add News</Link>
          </Button>
          <Button onClick={prevPage} disabled={currentPage === 0}>
            Prev
          </Button>
          <Button onClick={nextPage} disabled={indexOfLastNews >= news.length}>
            Next
          </Button>
        </div>
        <br />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {currentNews.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              style={{
                width: 240,
               
              }}
              cover={<img alt="NewsImage" src={item.picture} />}
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
                onClick={() => newsDelete(item.id)}
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

export default News;

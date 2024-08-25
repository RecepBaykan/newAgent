import React, { useEffect, useState } from "react";
import "../component/mainpage.css";
import HeaderComponent from "../component/HeaderComponent";
import "../component/bottomMenu.css";
import SiderBarAgent from "./SiderBarAgent";
import { Helmet } from "react-helmet-async";
import { menuItems } from "./Data";
import { useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import NewsSection from "./NewsSection";
import WeaponSection from "./WeaponSection";
import PatchSection from "./PatchSection";
import EventSection from "./EventSection";
import MapSection from "./MapSection";

const MainPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [welcomeAnimActive, setWelcomeAnimeActive] = useState(true);
  const [welcomeAnimPageCount, setWelcomeAnimPageCount] = useState(7);
  const navigate = useNavigate();

  const [title, setTitle] = useState("Game");

  const [sectionsVisibility, setSectionsVisibility] = useState({
    Agents: false,
    News: false,
    Patchs: false,
    Events: false,
    Maps: false,
    Weapons: false,
  });

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 1 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    if (activeSection) {
      window.history.replaceState(null, activeSection, `#${activeSection}`);
      setTitle(activeSection);

      const updatedVisibility = Object.keys(sectionsVisibility).reduce((acc, key) => {
        acc[key] = key === activeSection;
        return acc;
      }, {});

      setSectionsVisibility(updatedVisibility);
    }
  }, [activeSection]);

  useEffect(() => {
    function handleScrollStart() {
      document.body.classList.add("scroll-lock");
    }

    function handleScrollEnd() {
      setTimeout(() => {
        document.body.classList.remove("scroll-lock");
      }, 500); // 0.5 saniye sonra tıklama engellemesini kaldır
    }

    let isScrolling;
    window.addEventListener("scroll", () => {
      handleScrollStart();
      clearTimeout(isScrolling);
      isScrolling = setTimeout(handleScrollEnd, 500); // Scroll işlemi tamamlandıktan sonra tıklamaları etkinleştir
    });

    return () => {
      window.removeEventListener("scroll", () => {
        handleScrollStart();
        clearTimeout(isScrolling);
        isScrolling = setTimeout(handleScrollEnd, 500);
      });
    };
  }, []);

  function scrollToSection(sectionId) {
    var element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  function directLink(link) {
    navigate(link);
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="MainPageStyle">
        <div className="pattern"></div>
        <div className="container">
          <section id="Main" className="Main"></section>
          <section id="News" className="News"></section>
          {sectionsVisibility.News ? <NewsSection /> : ""}
          <section id="Patchs" className="Patchs">
          {sectionsVisibility.Patchs ? <PatchSection /> : ""}
          </section>
          <section id="Events" className="Events">
          {sectionsVisibility.Events ? <EventSection /> : ""}
          </section>
          <section id="Agents" className="Agents">
            {sectionsVisibility.Agents ? <SiderBarAgent /> : ""}
          </section>
          <section id="Maps" className="Maps">
          {sectionsVisibility.Maps ? <MapSection /> : ""}
          </section>
          <section id="Weapons" className="Weapons">
          {sectionsVisibility.Weapons ? <div className="wea"><WeaponSection /></div> : ""}
          </section>
          <div className="bottom-menu">
            {menuItems.map((item) => (
              <button
                onClick={
                  item.id === 4
                    ? () => directLink("playAlphaTest")
                    : () => scrollToSection(item.name)
                }
                className={`button ${
                  item.href === `#${activeSection}` ? "active" : ""
                } ${item.id === 4 ? "play" : ""}`}
                key={item.id}
              >
                <span className="span">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;

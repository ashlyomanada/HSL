import React from "react";
import LandingPage from "./LandingPage";
import ResultsPage from "./ResultsPage";
import SchedulesPage from "./SchedulesPage";
import TeamsPage from "./TeamsPage";
import StandingsPage from "./StandingsPage";
import NewsPage from "./NewsPage";
import PhotosPage from "./PhotosPage";
import AboutPage from "./AboutPage";
import MatchPage from "./MatchPage";
import Categories from "@/layouts/Categories";
import BlogPage from "./BlogPage";

const HomePage = () => {
  return (
    <>
      <LandingPage />
      <ResultsPage />
      <SchedulesPage />
      <AboutPage />
      <MatchPage />
      <TeamsPage />
      <Categories />
      <PhotosPage />
      <BlogPage />
      {/* <StandingsPage />
      <NewsPage />
      
       */}
    </>
  );
};

export default HomePage;

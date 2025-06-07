import React from "react";
import LandingPage from "./LandingPage";
import ResultsPage from "./ResultsPage";
import SchedulesPage from "./SchedulesPage";
import TeamsPage from "./TeamsPage";
import StandingsPage from "./StandingsPage";
import NewsPage from "./NewsPage";
import PhotosPage from "./PhotosPage";

const HomePage = () => {
  return (
    <>
      <LandingPage />
      <ResultsPage />
      <SchedulesPage />
      <StandingsPage />
      <NewsPage />
      <TeamsPage />
      <PhotosPage />
    </>
  );
};

export default HomePage;

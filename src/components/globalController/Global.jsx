import React, { createContext, useState } from "react";

export const GlobalController = createContext();

export const Global = ({ children }) => {
  const [addEvent, setAddEvent] = useState("");
  const [addMovie, setAddMovie] = useState("");
  const [addTheatreAdmin, setAddTheatreAdmin] = useState("");
  const [addScreen, setAddScreen] = useState("");
  const [addTheatre, setAddTheatre] = useState("");
  const [addTicket, setAddTicket] = useState("");
  const [addAds, setAddAds] = useState("");
  const [addLocation, setAddLocation] = useState("");
  const [addNews, setAddNews] = useState("");
  const [addReport, setAddReport] = useState("");
  const [addClass, setAddClass] = useState("");
  const [addDate, setAddDate] = useState("");
  const [addTime, setAddTime] = useState("");
  const [addVerifyOtp, setVerifyOtp] = useState("");
  const [addResendOtp, setResendOtp] = useState("");

  return (
    <GlobalController.Provider
      value={{
        addEvent,
        setAddEvent,
        addMovie,
        setAddMovie,
        addTheatreAdmin,
        setAddTheatreAdmin,
        addTheatre,
        setAddTheatre,
        addScreen,
        setAddScreen,
        addTicket,
        setAddTicket,
        addAds,
        setAddAds,
        addLocation,
        setAddLocation,
        addNews,
        setAddNews,
        addReport,
        setAddReport,
        addClass,
        setAddClass,
        addDate,
        setAddDate,
        addTime,
        setAddTime,
        addVerifyOtp,
        setVerifyOtp,
        addResendOtp,
        setResendOtp,
      }}
    >
      {children}
    </GlobalController.Provider>
  );
};

export default Global;

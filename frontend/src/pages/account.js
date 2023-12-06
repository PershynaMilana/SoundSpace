import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import is_js from "is_js";
import AccountContent from "../content/AccountContent";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Container,
  Typography,
  Input,
} from "@mui/material";

function Account() {
  const [userData, setUserData] = useState({});
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [theme, setTheme] = useState("");
  const [language, setLanguage] = useState("");
  const [month, setMonth] = useState("");
  const [country, setCountry] = useState("");
  const [updateMessage, setUpdateMessage] = useState(null);
  const [updateMessage2, setUpdateMessage2] = useState(null);
  const [token, setToken] = useState("");
  const [initialTheme, setInitialTheme] = useState("");
  const [initialLanguage, setInitialLanguage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dayError, setDayError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [dayValid, setDayValid] = useState(false);
  const [yearValid, setYearValid] = useState(false);

  useEffect(() => {
    const storedToken = getCookie("auth_token");
    const storedTheme = localStorage.getItem("theme");
    const storedLanguage = localStorage.getItem("language");

    if (!storedTheme) {
      localStorage.setItem("theme", "Dark");
      setTheme("Dark");
      setInitialTheme("Dark");
    } else {
      setTheme(storedTheme);
      setInitialTheme(storedTheme);
    }

    if (!storedLanguage) {
      localStorage.setItem("language", "English");
      setLanguage("English");
      setInitialLanguage("English");
    } else {
      setLanguage(storedLanguage);
      setInitialLanguage(storedLanguage);
    }

    if (storedToken) {
      setToken(storedToken);
      axios
        .get("http://localhost:8080/api/user", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setUserData(response.data.user);
          setUpdatedName(response.data.user.name);
          setUpdatedEmail(response.data.user.email);
          const dateOfBirth = response.data.user.birthDate.split("-");
          if (dateOfBirth.length === 3) {
            setYear(parseInt(dateOfBirth[0]));
            const months = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            setMonth(months[parseInt(dateOfBirth[1]) - 1]);
            setDay(dateOfBirth[2]);
          }
          setCountry(response.data.user.country);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      console.error("Token not found in cookies.");
    }
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const handleHomeClick = () => {
    window.location.href = `/home`;
  };

  const handleSaveClick = () => {
    const isNameValid = /^[A-Z][a-z]{1,}$/g.test(updatedName);
    const isEmailValid = is_js.email(updatedEmail);
    const isYearValid = year > 1900 && year < 2100;
    const daysInMonth = moment(
      `${year}-${moment().month(month).format("MM")}`,
      "YYYY-MM"
    ).daysInMonth();
    const isDayValid = day > 0 && day <= daysInMonth;

    setNameError(!isNameValid);
    setEmailError(!isEmailValid);
    setDayError(!isDayValid);
    setYearError(!isYearValid);
    setSaveDisabled(
      !(isNameValid && isEmailValid && isDayValid && isYearValid)
    );

    const updatedFields = {
      name: updatedName,
      email: updatedEmail,
    };

    if (day && month && year) {
      const monthIndex =
        new Date(Date.parse(`${month} 1, 2000`)).getMonth() + 1;
      const formattedDate = `${year}-${monthIndex}-${day}`;
      updatedFields.birthDate = formattedDate;
    }

    if (country) {
      updatedFields.country = country;
    }
    
    if (isNameValid && isEmailValid && isDayValid && isYearValid) {
      axios
        .post("http://localhost:8080/api/update-profile", updatedFields, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data.user);
          setUpdatedName(response.data.user.name);
          setUpdatedEmail(response.data.user.email);
          setUpdateMessage("Profile updated successfully");
          setTimeout(() => {
            setUpdateMessage(null);
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          setUpdateMessage("Failed to update data");
          setTimeout(() => {
            setUpdateMessage(null);
          }, 3000);
        });
    }
  };
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setUpdatedName(newName);
    setNameError(!/^[A-Z][a-z]{1,}$/g.test(newName));
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setUpdatedEmail(newEmail);
    setEmailError(!is_js.email(newEmail));
  };

  const handleDayChange = (e) => {
    const newDay = e.target.value;
    setDay(newDay);
    const daysInMonth = moment(
      `${year}-${moment().month(month).format("MM")}`,
      "YYYY-MM"
    ).daysInMonth();
    setDayError(!(newDay > 0 && newDay <= daysInMonth));
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setYear(newYear);
    setYearError(!(newYear > 1900 && newYear < 2100));
  };

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    if (selectedTheme !== initialTheme) {
      setUpdateMessage2("Theme changed");
      setTimeout(() => {
        setUpdateMessage2(null);
      }, 3000);
    } else {
      setUpdateMessage2(null);
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
    if (selectedLanguage !== initialLanguage) {
      setUpdateMessage2("Language changed");
      setTimeout(() => {
        setUpdateMessage2(null);
      }, 3000);
    } else {
      setUpdateMessage2(null);
    }
  };

  

  return (
    <>
      <AccountContent
        updateMessage={updateMessage}
        nameValid={nameValid}
        nameError={nameError}
        updatedName={updatedName}
        handleNameChange={handleNameChange}
        emailValid={emailValid}
        emailError={emailError}
        updatedEmail={updatedEmail}
        handleEmailChange={handleEmailChange}
        day={day}
        month={month}
        year={year}
        country={country}
        handleDayChange={handleDayChange}
        handleYearChange={handleYearChange}
        handleThemeChange={handleThemeChange}
        handleLanguageChange={handleLanguageChange}
        theme={theme}
        language={language}
        handleSaveClick={handleSaveClick}
        handleHomeClick={handleHomeClick}
        updateMessage2={updateMessage2}
        dayError={dayError}
        dayValid={dayValid}
        setDayError={setDayError}
        setDayValid={setDayValid}
        yearError={yearError}
        yearValid={yearValid}
        setYearError={setYearError}
        setYearValid={setYearValid}
        setCountry={setCountry}
      />
    </>
  );
}

export default Account;
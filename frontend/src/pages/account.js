import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import is_js from "is_js";
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
      <Container
        style={{
          maxWidth: "60%",
          margin: "auto",
          backgroundColor: "#212121",
          marginTop: "40px",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          style={{
            marginTop: "20px",
            marginLeft: "35px",
            fontWeight: "700",
            color: "white",
          }}
        >
          Edit profile
        </Typography>

        {updateMessage && (
          <div
            style={{ margin: "20px" }}
            className={
              updateMessage === "Profile updated successfully"
                ? "success-message"
                : "error-message"
            }
            onChange={handleNameChange}
            error={nameError}
            helperText={nameError ? "Name is not valid" : ""}
          >
            {updateMessage}
          </div>
        )}
        <Grid item xs={4}>
          <InputLabel
            htmlFor="name"
            style={{
              color: "white",
              marginLeft: "39px",
              marginTop: "30px",
              fontWeight: "600",
            }}
          >
            Name
          </InputLabel>
          <FormControl
            style={{
              width: "93%",
              marginLeft: "35px",
              marginTop: "5px",
              height: "40px",
            }}
          >
            <Input
              id="name"
              color={`${
                nameValid ? "success" : nameError ? "error" : "success"
              }`}
              value={updatedName}
              onChange={handleNameChange}
              style={{
                color: "white",
                border: `1px solid ${
                  nameValid ? "green" : nameError ? "red" : "#7d7d7d"
                }`,
                borderRadius: "5px",
                height: "40px",
                padding: "5px",
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <InputLabel
            htmlFor="email"
            style={{
              color: "white",
              marginLeft: "39px",
              marginTop: "20px",
              fontWeight: "600",
            }}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "Email is not valid" : ""}
          >
            Email
          </InputLabel>
          <FormControl
            style={{
              width: "93%",
              marginLeft: "35px",
              marginTop: "5px",
              height: "40px",
            }}
          >
            <Input
              id="email"
              color={`${
                emailValid ? "success" : emailError ? "error" : "success"
              }`}
              type="email"
              variant="outlined"
              value={updatedEmail}
              onChange={handleEmailChange}
              style={{
                color: "white",
                border: `1px solid ${
                  emailValid ? "green" : emailError ? "red" : "#7d7d7d"
                }`,
                borderRadius: "5px",
                height: "40px",
                padding: "5px",
              }}
            />
          </FormControl>
        </Grid>
        <Grid
          container
          spacing={2}
          style={{
            marginTop: "10px",
            marginLeft: "17px",
            fontWeight: "700",
            color: "white",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Grid style={{ marginLeft: "20px", width: "200px" }}>
            <InputLabel
              htmlFor="day"
              style={{
                color: "white",
                marginTop: "20px",
                fontWeight: "600",
              }}
              onChange={handleDayChange}
              error={dayError}
              helperText={dayError ? "Day is not valid" : ""}
            >
              Day
            </InputLabel>
            <FormControl
              style={{ width: "20%", marginTop: "5px", height: "40px" }}
            >
              <Input
                id="day"
                color={`${
                  dayValid ? "success" : dayError ? "error" : "success"
                }`}
                value={day}
                onChange={handleDayChange}
                style={{
                  color: "white",
                  border: `1px solid ${
                    dayValid ? "green" : dayError ? "red" : "#7d7d7d"
                  }`,
                  borderRadius: "5px",
                  height: "40px",
                  width: "200px",
                  padding: "5px",
                }}
              />
            </FormControl>
          </Grid>
          <Grid style={{ width: "20px" }}></Grid>
          <Grid style={{ width: "450px" }}>
            <InputLabel
              htmlFor="month"
              style={{
                color: "white",
                marginTop: "20px",
                fontWeight: "600",
                marginRight: "5px",
                width: "340%",
              }}
            >
              Month
            </InputLabel>
            <FormControl
              style={{
                width: "100%",
                marginTop: "5px",
                marginRight: "20px",
                height: "40px",
              }}
            >
              <Select
                id="month"
                value={month}
                color="success"
                onChange={(e) => setMonth(e.target.value)}
                style={{
                  color: "white",
                  border: "1px solid #7d7d7d",
                  borderRadius: "5px",
                  width: "100%",
                  height: "40px",
                }}
                variant="outlined"
                MenuProps={{
                  PaperProps: {
                    style: {
                      backgroundColor: "#333333",
                      color: "white",
                    },
                  },
                }}
              >
                <MenuItem value="January">January</MenuItem>
                <MenuItem value="February">February</MenuItem>
                <MenuItem value="March">March</MenuItem>
                <MenuItem value="April">April</MenuItem>
                <MenuItem value="May">May</MenuItem>
                <MenuItem value="June">June</MenuItem>
                <MenuItem value="July">July</MenuItem>
                <MenuItem value="August">August</MenuItem>
                <MenuItem value="September">September</MenuItem>
                <MenuItem value="October">October</MenuItem>
                <MenuItem value="November">November</MenuItem>
                <MenuItem value="December">December</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid style={{ width: "20px" }}></Grid>
          <Grid>
            <InputLabel
              htmlFor="year"
              style={{
                color: "white",
                marginTop: "20px",
                fontWeight: "600",
              }}
              onChange={handleYearChange}
              error={yearError}
              helperText={yearError ? "Year is not valid" : ""}
            >
              Year
            </InputLabel>
            <FormControl
              style={{ width: "103%", marginTop: "5px", height: "40px" }}
            >
              <Input
                id="year"
                color={`${
                  yearValid ? "success" : yearError ? "error" : "success"
                }`}
                value={year}
                onChange={handleYearChange}
                style={{
                  color: "white",
                  border: `1px solid ${
                    yearValid ? "green" : yearError ? "red" : "#7d7d7d"
                  }`,
                  borderRadius: "5px",
                  height: "40px",
                  padding: "5px",
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <InputLabel
            htmlFor="country"
            style={{
              color: "white",
              marginLeft: "39px",
              marginTop: "20px",
              fontWeight: "600",
              height: "20px",
            }}
          >
            Country or region
          </InputLabel>
          <FormControl
            style={{ width: "93%", marginLeft: "35px", marginTop: "7px" }}
          >
            <Select
              id="country"
              color="success"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{
                color: "white",
                border: "1px solid #7d7d7d",
                borderRadius: "5px",
                height: "40px",
                padding: "5px",
                "&:focus::after": {
                  boxShadow: "0 0 5px 1px green",
                  outline: "none",
                },
              }}
              variant="outlined"
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#333333",
                    color: "white",
                  },
                },
              }}
            >
              <MenuItem value="Afghanistan">Afghanistan</MenuItem>
              <MenuItem value="Albania">Albania</MenuItem>
              <MenuItem value="Algeria">Algeria</MenuItem>
              <MenuItem value="Andorra">Andorra</MenuItem>
              <MenuItem value="Angola">Angola</MenuItem>
              <MenuItem value="Argentina">Argentina</MenuItem>
              <MenuItem value="Armenia">Armenia</MenuItem>
              <MenuItem value="Australia">Australia</MenuItem>
              <MenuItem value="Austria">Austria</MenuItem>
              <MenuItem value="Azerbaijan">Azerbaijan</MenuItem>
              <MenuItem value="Bangladesh">Bangladesh</MenuItem>
              <MenuItem value="Belarus">Belarus</MenuItem>
              <MenuItem value="Belgium">Belgium</MenuItem>
              <MenuItem value="Brazil">Brazil</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="China">China</MenuItem>
              <MenuItem value="Egypt">Egypt</MenuItem>
              <MenuItem value="France">France</MenuItem>
              <MenuItem value="Germany">Germany</MenuItem>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="Italy">Italy</MenuItem>
              <MenuItem value="Japan">Japan</MenuItem>
              <MenuItem value="Mexico">Mexico</MenuItem>
              <MenuItem value="Netherlands">Netherlands</MenuItem>
              <MenuItem value="Norway">Norway</MenuItem>
              <MenuItem value="Poland">Poland</MenuItem>
              <MenuItem value="Spain">Spain</MenuItem>
              <MenuItem value="Sweden">Sweden</MenuItem>
              <MenuItem value="Switzerland">Switzerland</MenuItem>
              <MenuItem value="Turkey">Turkey</MenuItem>
              <MenuItem value="Ukraine">Ukraine</MenuItem>
              <MenuItem value="United Kingdom">United Kingdom</MenuItem>
              <MenuItem value="United States">United States</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <div
          className="fieldspecial"
          style={{
            margin: "20px 0",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div>
            <Button
              variant="text"
              className="cancel"
              onClick={handleHomeClick}
              style={{ marginLeft: "20px" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="save"
              onClick={handleSaveClick}
              style={{ marginRight: "35px" }}
              disabled={
                !(
                  !nameError &&
                  !emailError &&
                  !dayError &&
                  !monthError &&
                  !yearError &&
                  !countryError
                )
              }
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Container>
      <Container
        style={{
          maxWidth: "60%",
          margin: "auto",
          backgroundColor: "#212121",
          marginTop: "40px",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          style={{
            marginTop: "20px",
            marginLeft: "35px",
            fontWeight: "700",
            color: "white",
          }}
        >
          Settings
        </Typography>
        {updateMessage2 && (
          <div
            style={{ margin: "20px" }}
            className={
              updateMessage2 === "Settings updated successfully"
                ? "success-message"
                : "success-message"
            }
          >
            {updateMessage2}
          </div>
        )}
        <Grid style={{ width: "93%", marginLeft: "39px" }}>
          <InputLabel
            htmlFor="theme"
            style={{
              color: "white",
              marginTop: "20px",
              fontWeight: "600",
              marginRight: "5px",
              width: "340%",
            }}
          >
            Change theme
          </InputLabel>
          <FormControl
            style={{
              width: "100%",
              marginTop: "5px",
              marginRight: "20px",
              height: "40px",
            }}
          >
            <Select
              id="theme"
              value={theme}
              onChange={handleThemeChange}
              color="success"
              style={{
                color: "white",
                border: "1px solid #7d7d7d",
                borderRadius: "5px",
                width: "100%",
                height: "40px",
              }}
              variant="outlined"
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#333333",
                    color: "white",
                  },
                },
              }}
            >
              <MenuItem value="Dark">Dark</MenuItem>
              <MenuItem value="Light">Light</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid style={{ width: "93%", marginLeft: "39px" }}>
          <InputLabel
            htmlFor="language"
            style={{
              color: "white",
              marginTop: "20px",
              fontWeight: "600",
              marginRight: "5px",
              width: "340%",
            }}
          >
            Change language
          </InputLabel>
          <FormControl
            style={{
              width: "100%",
              marginTop: "5px",
              marginRight: "20px",
              height: "40px",
            }}
          >
            <Select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              color="success"
              style={{
                color: "white",
                border: "1px solid #7d7d7d",
                borderRadius: "5px",
                width: "100%",
                height: "40px",
              }}
              variant="outlined"
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#333333",
                    color: "white",
                  },
                },
              }}
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Ukrainian">Ukrainian</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Container>
    </>
  );
}

export default Account;

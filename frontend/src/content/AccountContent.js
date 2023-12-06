import React from "react";
import {
  Container,
  Typography,
  Grid,
  InputLabel,
  FormControl,
  Input,
  Select,
  MenuItem,
  Button,
} from "@mui/material";



function AccountContent({
  updateMessage,
  nameValid,
  nameError,
  updatedName,
  handleNameChange,
  emailValid,
  emailError,
  updatedEmail,
  handleEmailChange,
  day,
  month,
  year,
  country,
  handleDayChange,
  handleYearChange,
  handleThemeChange,
  handleLanguageChange,
  theme,
  language,
  handleSaveClick,
  handleHomeClick,
  updateMessage2,
  dayError,
  dayValid,
  yearError,
  yearValid,
  setMonth,
  setCountry,
  monthError,
  countryError
}) {
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
    
export default AccountContent;

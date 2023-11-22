import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

const CardStyled = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  width: "100%",
  backgroundColor: "#333333",
  color: "white",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  width: "100%",
  height: 0,
  paddingTop: "56.25%",
  marginLeft: "20px",
  marginRight: "20px",
}));

const PlaylistTab = ({ playlistResults, handlePlaylistClick }) => (
  <div>
    <Typography
      variant="h5"
      style={{
        color: "white",
        fontWeight: "600",
        marginBottom: "30px",
        padding: "0",
        width: "500px",
        marginTop: "30px",
      }}
    >
      Плейлисты
    </Typography>

    <div
      className="playlist-list"
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {playlistResults.map((playlist) => (
        <div
          key={playlist.id}
          className="playlist-item"
          style={{
            width: "200px",
            height: "250px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "10px",
          }}
          onClick={() => handlePlaylistClick(playlist.id)}
        >
          {playlist.images[0] && (
            <CardStyled>
              <CardMediaStyled
                image={playlist.images[0].url}
                title={playlist.name}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  style={{
                    textAlign: "center",
                  }}
                >
                  {playlist.name}
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  style={{
                    textAlign: "center",
                  }}
                >
                  by {playlist.owner.display_name}
                </Typography>
              </CardContent>
            </CardStyled>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default PlaylistTab;

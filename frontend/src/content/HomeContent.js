import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const ContainerStyled = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
}));

const CardStyled = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign:"center",
  height: "100%",
  transition: "transform 0.2s",
  flex: "1 1 auto",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  width: "100%",
  height: 0,
  paddingTop: "56.25%",
}));

const HomeContent = ({
  loading,
  popularPlaylists,
  playlistIndex,
  artists,
  artistIndex,
  newReleases,
  releaseIndex,
  handlePrevPlaylist,
  handleNextPlaylist,
  handlePrevArtist,
  handleNextArtist,
  handlePrevRelease,
  handleNextRelease,
  navigate,
}) => (
  <ContainerStyled>
    {/* Популярные плейлисты */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        color={"white"}
        style={{
          order: "1",
          fontWeight: "700",
          fontFamily: "Verdana",
          marginTop: "25px",
        }}
      >
        Популярные плейлисты
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          order: "2",
        }}
      >
        <IconButton
          style={{
            color: "white",
            cursor: "pointer",
            marginTop: "25px",
          }}
          onClick={handlePrevPlaylist}
          disabled={playlistIndex === 0}
        >
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
        <Link
          onClick={() => navigate("/section")}
          to="/section"
          variant="outlined"
          color="primary"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "20px",
            verticalAlign: "middle",
            marginTop: "30px",
            fontWeight: "600",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Показать все
        </Link>
        <IconButton
          style={{
            color: "white",
            marginTop: "25px",
            cursor:
              playlistIndex + 6 >= popularPlaylists.length
                ? "not-allowed"
                : "pointer",
            opacity:
              playlistIndex + 6 >= popularPlaylists.length ? 0.5 : 1,
          }}
          onClick={handleNextPlaylist}
          disabled={playlistIndex + 6 >= popularPlaylists.length}
        >
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </div>
    </div>
    {loading ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "15px",
        }}
      >
        <CircularProgress style={{ color: "gray" }} />
      </div>
    ) : (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {popularPlaylists
          .slice(playlistIndex, playlistIndex + 6)
          .map((playlist) => (
            <CardStyled
              key={playlist.id}
              onClick={() => navigate(`/playlist/${playlist.id}`)}
              style={{
                flex: "0 0 calc(16.666% - 20px)",
                margin: "10px",
                backgroundColor: "#222222",
                height: "220px",
                cursor: "pointer",
                color: "white",
              }}
            >
              <CardMediaStyled
                image={playlist.images[0].url}
                title={playlist.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {playlist.name}
                </Typography>
              </CardContent>
            </CardStyled>
          ))}
      </div>
    )}

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        color={"white"}
        style={{
          order: "1",
          fontWeight: "700",
          fontFamily: "Verdana",
          marginTop: "25px",
        }}
      >
        Новые релизы
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          order: "2",
        }}
      >
        <IconButton
          style={{
            color: "white",
            cursor: "pointer",
            marginTop: "25px",
          }}
          onClick={handlePrevRelease}
          disabled={releaseIndex === 0}
        >
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
        <Link
          onClick={() => navigate("/section")}
          to="/section"
          variant="outlined"
          color="primary"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "20px",
            verticalAlign: "middle",
            marginTop: "30px",
            fontWeight: "600",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Показать все
        </Link>
        <IconButton
          style={{
            color: "white",
            marginTop: "25px",
            cursor:
              releaseIndex + 6 >= newReleases.length
                ? "not-allowed"
                : "pointer",
            opacity: releaseIndex + 6 >= newReleases.length ? 0.5 : 1,
          }}
          onClick={handleNextRelease}
          disabled={releaseIndex + 6 >= newReleases.length}
        >
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </div>
    </div>
    {loading ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "15px",
        }}
      >
        <CircularProgress style={{ color: "gray" }} />
      </div>
    ) : (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {newReleases
          .slice(releaseIndex, releaseIndex + 6)
          .map((release) => (
            <CardStyled
              key={release.id}
              onClick={() => navigate(`/album/${release.id}`)}
              style={{
                flex: "0 0 calc(16.666% - 20px)",
                margin: "10px",
                backgroundColor: "#222222",
                height: "220px",
                cursor: "pointer",
                color: "white",
              }}
            >
              {release.images.length > 0 && (
                <CardMediaStyled
                  image={release.images[0].url}
                  title={release.name}
                />
              )}
              <CardContent>
                <Typography variant="h6" component="div">
                  {release.name}
                </Typography>
              </CardContent>
            </CardStyled>
          ))}
      </div>
    )}

    {/* Популярные артисты */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        color={"white"}
        style={{
          order: "1",
          fontWeight: "700",
          fontFamily: "Verdana",
          marginTop: "25px",
        }}
      >
        Популярные артисты
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          order: "2",
        }}
      >
        <IconButton
          style={{
            color: "white",
            cursor: "pointer",
            marginTop: "25px",
          }}
          onClick={handlePrevArtist}
          disabled={artistIndex === 0}
        >
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
        <Link
          onClick={() => navigate("/section")}
          to="/section"
          variant="outlined"
          color="primary"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "20px",
            verticalAlign: "middle",
            marginTop: "30px",
            fontWeight: "600",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Показать все
        </Link>
        <IconButton
          style={{
            color: "white",
            marginTop: "25px",
            cursor:
              artistIndex + 6 >= artists.length
                ? "not-allowed"
                : "pointer",
            opacity: artistIndex + 6 >= artists.length ? 0.5 : 1,
          }}
          onClick={handleNextArtist}
          disabled={artistIndex + 6 >= artists.length}
        >
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </div>
    </div>
    {loading ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "15px",
        }}
      >
        <CircularProgress style={{ color: "gray" }} />
      </div>
    ) : (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {artists
          .slice(artistIndex, artistIndex + 6)
          .map((artist) => (
            <CardStyled
              key={artist.id}
              onClick={() => navigate(`/artist/${artist.id}`)}
              style={{
                flex: "0 0 calc(16.666% - 20px)",
                margin: "10px",
                backgroundColor: "#222222",
                height: "180px",
                cursor: "pointer",
                color: "white",
                borderRadius: "50%"
              }}
            >
              <CardMediaStyled
                image={artist.images[0].url}
                title={artist.name}
              />

              <CardContent>
                <Typography variant="h6" component="div">
                  {artist.name}
                </Typography>
              </CardContent>
            </CardStyled>
          ))}
      </div>
    )}


  </ContainerStyled>
);

export default HomeContent;

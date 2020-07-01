import React, { useEffect, useState } from "react";
import "./App.css";
import Container from "./components/Container/Container";
import Footer from "./components/Footer/Footer";
import axios from "axios";

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

function App() {
  const [data, setState] = useState([]);
  const [userTracks, setTracks] = useState("");
  const [recentTracks, setRecentTracks] = useState("");
  const [isLoaded, changeIsLoaded] = useState(false);
  const [userToken, setTokenState] = useState("");
  const [playlistURL, setPlaylistURL] = useState("default");
  const [playlistType, setPlaylistType] = useState("Top Tracks");
  const [recentData, setRecentData] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topArtistIDs, setTopArtistIDs] = useState([]);
  const [topArtistTopTracks, setTopArtistTopTracks] = useState([]);

  const setToken = () => {
    let _token = hash.access_token;
    if (_token) {
      getData(_token);
      setTokenState(_token);
    }
  };

  let playlistName = "my best of songs of all time";
  let timeFrame = "long_term";

  const getData = (token) => {
    const userAPI = "https://api.spotify.com/v1/me";
    const songAPI =
      "https://api.spotify.com/v1/me/top/tracks?time_range=" +
      timeFrame +
      "&limit=50";

    const artistAPI =
      "https://api.spotify.com/v1/me/top/artists?time_range=" +
      timeFrame +
      "&limit=50";

    const recentAPI =
      "https://api.spotify.com/v1/me/player/recently-played?limit=50";

    const getUser = axios.get(userAPI, {
      headers: { Authorization: "Bearer " + token },
    });
    const getSongs = axios.get(songAPI, {
      headers: { Authorization: "Bearer " + token },
    });
    const getTopArtists = axios.get(artistAPI, {
      headers: { Authorization: "Bearer " + token },
    });

    const getRecentSongs = axios.get(recentAPI, {
      headers: { Authorization: "Bearer " + token },
    });

    axios.all([getUser, getSongs, getTopArtists, getRecentSongs]).then(
      axios.spread((...allData) => {
        const songData = allData[1].data.items;
        const topAristData = allData[2].data.items;
        const recentSongData = allData[3].data.items;

        setTopArtists(topAristData);
        setState(songData);
        setTracks(songData.map((song) => song.uri));
        setRecentData(recentSongData);
        setRecentTracks(recentSongData.map((song) => song.track.uri));
        setTopArtistIDs(topAristData.map((song) => song.id));
        changeIsLoaded(true);
      })
    );
  };

  const getTopArtistTopSongs = () => {
    let topTen = [];
    topArtistIDs.map((id) =>
      axios
        .get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=GB`, {
          headers: { Authorization: "Bearer " + userToken },
        })
        .then((response) => {
          let songURI = response.data.tracks[0].uri;
          topTen.push(songURI);
        })
    );

    setTopArtistTopTracks(topTen);
  };

  const setPlaylist = () => {
    getTopArtistTopSongs();
    if (playlistType === "Top Tracks") {
      setPlaylistType("Top Artists");
      setPlaylistURL("default");
    } else if (playlistType === "Top Artists") {
      setPlaylistType("Most Recent");
      setPlaylistURL("default");
    } else if (playlistType === "Most Recent") {
      setPlaylistType("Top Tracks");
      setPlaylistURL("default");
    }
  };

  const createPlaylist = () => {
    if (playlistType === "Top Tracks") {
      playlistName = "My 50 Top Tracks";
      return axios({
        method: "POST",
        url: `https://api.spotify.com/v1/me/playlists`,
        data: {
          name: playlistName,
          description: "My 50 Top Tracks made by femti.app",
          public: true,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }).then((res) => {
        console.log(res.data.external_urls.spotify);
        populatePlaylist(
          res.data.id,
          userTracks,
          userToken,
          res.data.external_urls.spotify
        );
      });
    } else if (playlistType === "Top Artists") {
      playlistName = "My 50 Top Artists";
      return axios({
        method: "POST",
        url: `https://api.spotify.com/v1/me/playlists`,
        data: {
          name: playlistName,
          description: "My 50 Top Artists made by femti.app",
          public: true,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }).then((res) => {
        console.log(res.data.external_urls.spotify);
        populatePlaylist(
          res.data.id,
          topArtistTopTracks,
          userToken,
          res.data.external_urls.spotify
        );
      });
    } else if (playlistType === "Most Recent") {
      playlistName = "My 50 Most Recent Tracks";
      return axios({
        method: "POST",
        url: `https://api.spotify.com/v1/me/playlists`,
        data: {
          name: playlistName,
          description: "My 50 Most Recent made by femti.app",
          public: true,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }).then((res) => {
        console.log(res.data.external_urls.spotify);
        populatePlaylist(
          res.data.id,
          recentTracks,
          userToken,
          res.data.external_urls.spotify
        );
      });
    }
  };

  const populatePlaylist = (id, tracks, token, URL) => {
    return axios({
      method: "POST",
      url: `https://api.spotify.com/v1/playlists/${id}/tracks`,
      data: {
        uris: tracks,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(() => setPlaylistURL(URL));
  };

  useEffect(setToken, []);

  return (
    <div>
      <Container
        isLoaded={isLoaded}
        data={data}
        recentData={recentData}
        userToken={userToken}
        playlistURL={playlistURL}
        createPlaylist={createPlaylist}
        playlistType={playlistType}
        topArtists={topArtists}
        setPlaylist={setPlaylist}
        setPlaylistURL={setPlaylistURL}
      />
      <Footer />
    </div>
  );
}

export default App;

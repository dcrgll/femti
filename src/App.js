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
  const [userID, setID] = useState("");
  const [userTracks, setTracks] = useState("");
  const [isLoaded, changeIsLoaded] = useState(false);
  const [userToken, setTokenState] = useState("");
  const [playlistURL, setPlaylistURL] = useState("default");
  const [playlistType, setPlaylistType] = useState("FEMTI");
  const [recentData, setRecentData] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

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
        const userData = allData[0];
        const songData = allData[1].data.items;
        const topAristData = allData[2].data.items;
        const recentSongData = allData[3].data.items;

        setID(userData.data.id);
        setTopArtists(topAristData);
        setState(songData);
        setTracks(songData.map((song) => song.uri));
        setRecentData(recentSongData);
        changeIsLoaded(true);
      })
    );
  };

  const createPlaylist = () => {
    return axios({
      method: "POST",
      url: `https://api.spotify.com/v1/me/playlists`,
      data: {
        name: playlistName,
        description: "My top 50 playlist made by femti.app",
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
    }).then(
      // (res) => res.data);
      () => setPlaylistURL(URL)
    );
  };

  useEffect(setToken, []);

  return (
    <div>
      <Container
        isLoaded={isLoaded}
        data={data}
        userToken={userToken}
        playlistURL={playlistURL}
        createPlaylist={createPlaylist}
        playlistType={playlistType}
      />
      <Footer />
    </div>
  );
}

export default App;

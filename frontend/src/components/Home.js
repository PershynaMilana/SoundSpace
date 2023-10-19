import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [musicTracks, setMusicTracks] = useState([]);
  const apiKey = 'AIzaSyAydg9PVQG32L2fiwI9l189ov9xKbYFbOk'; // Замените на свой API-ключ

  useEffect(() => {
    const fetchMusicTracks = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/music?key=${apiKey}&q=запрос_для_поиска_музыки&maxResults=10`
        );
        const data = await response.json();
        setMusicTracks(data.items);
      } catch (error) {
        console.error('Произошла ошибка:', error);
      }
    };

    fetchMusicTracks();
  }, [apiKey]);

  return (
    <div>
      <h1>Музыкальные треки</h1>
      {musicTracks.map((track, index) => (
        <div key={index}>
          <h2>{track.title}</h2>
          <p>Исполнитель: {track.artist}</p>
          <audio controls>
            <source src={track.audioUrl} type="audio/mpeg" />
            Ваш браузер не поддерживает воспроизведение аудио.
          </audio>
        </div>
      ))}
    </div>
  );
};

export default HomePage;

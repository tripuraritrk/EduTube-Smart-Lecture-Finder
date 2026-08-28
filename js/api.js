const API_KEY = "AIzaSyBQaI1avraE0V8kxOEkAJzuxAGPpQ_ZE8I";

async function searchYouTube(topic) {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(topic)}&key=${API_KEY}`;

    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    const videoIds = searchData.items
        .map(item => item.id.videoId)
        .join(",");

    const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${API_KEY}`;

    const statsResponse = await fetch(statsUrl);
    const statsData = await statsResponse.json();

    return statsData;
}
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchMessage = document.getElementById("searchMessage");
const videoContainer = document.querySelector(".video-container");

searchButton.addEventListener("click", async function () {

    const topic = searchInput.value.trim();

    // Empty search check
    if (topic === "") {
        searchMessage.textContent = "Please enter a topic!";
        searchMessage.style.color = "red";
        videoContainer.innerHTML = "";
        return;
    }

    // Save recent search
    let recentSearches =
        JSON.parse(localStorage.getItem("recentSearches")) || [];

    if (!recentSearches.includes(topic)) {
        recentSearches.unshift(topic);
    }

    recentSearches = recentSearches.slice(0, 5);

    localStorage.setItem(
        "recentSearches",
        JSON.stringify(recentSearches)
    );

    // Loading message
    searchMessage.textContent =
        "🔍 Searching for the best lectures...";
    searchMessage.style.color = "green";

    videoContainer.innerHTML =
        "<p>⏳ Finding the best videos...</p>";

    try {

        // Get videos from YouTube API
        const data = await searchYouTube(topic);

        // No results
        if (!data.items || data.items.length === 0) {
            searchMessage.textContent =
                "😕 No videos found for this topic.";

            searchMessage.style.color = "red";

            videoContainer.innerHTML = "";
            return;
        }

        // Find maximum views and likes
        const maxViews = Math.max(
            ...data.items.map(function (item) {
                return Number(item.statistics.viewCount);
            })
        );

        const maxLikes = Math.max(
            ...data.items.map(function (item) {
                return Number(item.statistics.likeCount || 0);
            })
        );

        // Calculate Smart Score
        data.items.forEach(function (item) {

            const views =
                Number(item.statistics.viewCount);

            const likes =
                Number(item.statistics.likeCount || 0);

            // Views score: 0-100
            const viewScore =
                maxViews > 0
                    ? (views / maxViews) * 100
                    : 0;

            // Likes score: 0-100
            const likeScore =
                maxLikes > 0
                    ? (likes / maxLikes) * 100
                    : 0;

            // Freshness score
            const publishedDate =
                new Date(item.snippet.publishedAt);

            const ageInDays = Math.max(
                1,
                (Date.now() - publishedDate) /
                (1000 * 60 * 60 * 24)
            );

            const freshnessScore =
                100 / ageInDays;

            // Final Smart Score
            item.smartScore =
                (viewScore * 0.50) +
                (likeScore * 0.30) +
                (freshnessScore * 0.20);
        });

        // Highest Smart Score first
        data.items.sort(function (a, b) {
            return b.smartScore - a.smartScore;
        });

        // Clear old videos
        videoContainer.innerHTML = "";

        // Display videos
        data.items.forEach(function (item) {

            const videoCard =
                document.createElement("div");

            videoCard.className = "video-card";

            videoCard.innerHTML = `
                <img
                    src="${item.snippet.thumbnails.medium.url}"
                    alt="Video Thumbnail"
                >

                <h3>${item.snippet.title}</h3>

                <p>${item.snippet.channelTitle}</p>

                <p>
                    👀 ${Number(
                        item.statistics.viewCount
                    ).toLocaleString()} views
                </p>

                <p>
                    👍 ${Number(
                        item.statistics.likeCount || 0
                    ).toLocaleString()} likes
                </p>

                <p>
                    📅 ${new Date(
                        item.snippet.publishedAt
                    ).toLocaleDateString()}
                </p>

                <p>
                    ⭐ Smart Score:
                    ${item.smartScore.toFixed(2)}
                </p>

                <button
                    class="favorite-btn"
                    data-video-id="${item.id}"
                    data-title="${item.snippet.title}"
                >
                    ❤️ Add to Favorites
                </button>

                <a
                    href="https://www.youtube.com/watch?v=${item.id}"
                    target="_blank"
                    class="watch-btn"
                >
                    Watch Video
                </a>
            `;

            // Favorite button
            const favoriteButton =
                videoCard.querySelector(".favorite-btn");

            favoriteButton.addEventListener(
                "click",
                function () {

                    const favorites =
                        JSON.parse(
                            localStorage.getItem("favorites")
                        ) || [];

                    const videoId = item.id;
                    const title = item.snippet.title;

                    const alreadyFavorite =
                        favorites.some(function (video) {
                            return video.videoId === videoId;
                        });

                    if (!alreadyFavorite) {

                        favorites.push({
                            videoId: videoId,
                            title: title,
                            channel:
                                item.snippet.channelTitle,
                            thumbnail:
                                item.snippet.thumbnails.medium.url
                        });

                        localStorage.setItem(
                            "favorites",
                            JSON.stringify(favorites)
                        );

                        favoriteButton.textContent =
                            "❤️ Added to Favorites";

                    } else {

                        favoriteButton.textContent =
                            "❤️ Already Favorite";
                    }
                }
            );

            videoContainer.appendChild(videoCard);
        });

        searchMessage.textContent =
            "✅ Top lectures for: " + topic;

        searchMessage.style.color = "green";

    } catch (error) {

        console.error(error);

        searchMessage.textContent =
            "❌ Something went wrong. Please try again.";

        searchMessage.style.color = "red";

        videoContainer.innerHTML = "";
    }
});

const urlParams = new URLSearchParams(window.location.search);
const previousSearch = urlParams.get("search");

if (previousSearch) {
    searchInput.value = previousSearch;
    searchButton.click();
}
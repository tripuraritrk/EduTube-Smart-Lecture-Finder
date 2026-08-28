const favoritesContainer = document.getElementById("favoritesContainer");

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if (favorites.length === 0) {

    favoritesContainer.innerHTML = "<p>No favorite videos yet.</p>";

} else {

    favorites.forEach(function (video) {

        const videoCard = document.createElement("div");

        videoCard.className = "video-card";

        videoCard.innerHTML = `
            <img src="${video.thumbnail}" alt="Video Thumbnail">

            <h3>${video.title}</h3>

            <p>${video.channel}</p>

            <a href="https://www.youtube.com/watch?v=${video.videoId}"
               target="_blank"
               class="watch-btn">
               Watch Video
            </a>
            <button class="remove-btn" data-video-id="${video.videoId}">
            ❌ Remove Favorite
            </button>
        `;

        const removeButton = videoCard.querySelector(".remove-btn");

        removeButton.addEventListener("click", function () {

            const updatedFavorites = favorites.filter(function (item) {
                return item.videoId !== video.videoId;
            });

            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

            videoCard.remove();
        });
        favoritesContainer.appendChild(videoCard);
    });
}
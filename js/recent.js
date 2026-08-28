const recentContainer = document.getElementById("recentSearches");

const recentSearches =
    JSON.parse(localStorage.getItem("recentSearches")) || [];

if (recentSearches.length === 0) {

    recentContainer.innerHTML = "<p>No recent searches yet.</p>";

} else

    recentSearches.forEach(function(search) {

    const searchItem = document.createElement("button");

    searchItem.textContent = "🔍 " + search;

    searchItem.className = "recent-item";

    searchItem.addEventListener("click", function() {

        window.location.href =
            "../index.html?search=" +
            encodeURIComponent(search);

    });

    recentContainer.appendChild(searchItem);
});
/* ========================================
   GGNESIA NEWS
   SCRIPT
======================================== */


/* ========================================
   SIDE MENU
======================================== */

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

function openMenu() {
    if (sideMenu) sideMenu.classList.add("active");
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeMenu() {
    if (sideMenu) sideMenu.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
}

if (menuBtn) {
    menuBtn.addEventListener("click", openMenu);
}

if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
}

if (overlay) {
    overlay.addEventListener("click", closeMenu);
}

/* ========================================
   DROPDOWN
======================================== */


const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");

if (searchBtn) {
    searchBtn.addEventListener("click", function() {

        if (!searchPanel) return;

        searchPanel.classList.toggle("active");

        if (searchPanel.classList.contains("active") && searchInput) {
            searchInput.focus();
        }

    });
}

/* ========================================
   SEARCH PANEL
======================================== */

const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", function() {

    searchPanel.classList.toggle("active");

    if (searchPanel.classList.contains("active")) {
        searchInput.focus();
    }

});


/* ========================================
   LOAD ARTICLES
======================================== */

let articles = [];


async function loadArticles() {

    try {

        const response = await fetch("data/articles.json?v=" + Date.now());

        if (!response.ok) {
            throw new Error("Gagal mengambil data berita.");
        }

        articles = await response.json();

        displayFeatured();
        displayPopular();
        showSlide(0);
    } catch (error) {

        console.error("Error:", error);

    }

}


/* ========================================
   FORMAT DATE
======================================== */

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

}


/* ========================================
   FEATURED ARTICLE
======================================== */


displayFeatured() {

 let currentSlide = 0;

function displayFeatured(index = 0) {

    const featuredArticles = articles.slice(0, 5);

    if (!featuredArticles.length) {
        return;
    }

    currentSlide = index;

    const article = featuredArticles[currentSlide];

    const heroImage = document.querySelector(".hero-card img");
    const heroCategory = document.querySelector(".hero-content .category");
    const heroTitle = document.querySelector(".hero-content h1");
    const heroMeta = document.querySelector(".hero-content p");

    if (heroImage) {
        heroImage.src = article.image;
        heroImage.alt = article.title;
    }

    if (heroCategory) {
        heroCategory.textContent = article.category;
    }

    if (heroTitle) {
        heroTitle.textContent = article.title;
    }

    if (heroMeta) {
        heroMeta.textContent =
            `${article.author} • ${formatDate(article.date)}`;
    }

    const dots = document.querySelectorAll(".slider-dots span");

    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === currentSlide);
    });
}

/* ========================================
   POPULAR ARTICLES
======================================== */

function displayPopular(list = null) {

    const articleList =
        document.querySelector(".article-list");

    if (!articleList) {
        return;
    }


    const popularArticles =
        list ||
        articles.filter(article => article.popular);


    articleList.innerHTML = "";


    popularArticles.forEach(function(article) {

        const card =
            document.createElement("article");

        card.className = "article-card";


        card.innerHTML = `

            <div class="article-info">

                <span class="category">
                    ${article.category}
                </span>

                <h3>
                    ${article.title}
                </h3>

                <p>
                    ${article.author} •
                    ${formatDate(article.date)}
                </p>

            </div>

            <img
                src="${article.image}"
                alt="${article.title}"
            >

        `;


        articleList.appendChild(card);

    });

}


/* ========================================
   SEARCH ARTICLES
======================================== */

function searchArticles(keyword) {

    const searchText =
        keyword.toLowerCase().trim();


    if (searchText === "") {

        displayPopular();

        return;

    }


    const results =
        articles.filter(function(article) {

            return (
                article.title.toLowerCase().includes(searchText) ||
                article.category.toLowerCase().includes(searchText) ||
                article.game.toLowerCase().includes(searchText)
            );

        });


    displayPopular(results);

}


/* ========================================
   SEARCH INPUT
======================================== */

searchInput.addEventListener("input", function() {

    searchArticles(this.value);

});


/* =================================
   HIGHLIGHT SLIDER
================================= */

let currentSlide = 0;

const dots = document.querySelectorAll(".slider-dots span");

function showSlide(index) {

    if (!articles || articles.length === 0) {
        return;
    }

    // Gunakan 5 artikel pertama sebagai Highlight
    const slideArticles = articles.slice(0, 5);

    if (index < 0 || index >= slideArticles.length) {
        return;
    }

    currentSlide = index;

    const article = slideArticles[currentSlide];

    const heroImage = document.querySelector(".hero-card img");
    const heroCategory = document.querySelector(".hero-content .category");
    const heroTitle = document.querySelector(".hero-content h1");
    const heroMeta = document.querySelector(".hero-content p");

    if (heroImage) {
        heroImage.src = article.image;
        heroImage.alt = article.title;
    }

    if (heroCategory) {
        heroCategory.textContent = article.category;
    }

    if (heroTitle) {
        heroTitle.textContent = article.title;
    }

    if (heroMeta) {
        heroMeta.textContent =
            `${article.author} • ${formatDate(article.date)}`;
    }

    dots.forEach(function(dot) {
        dot.classList.remove("active");
    });

    if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
    }
}


// Klik titik slider
dots.forEach(function(dot, index) {

    dot.addEventListener("click", function(event) {

        event.preventDefault();
        event.stopPropagation();

        showSlide(index);

    });

});
/* ========================================
   ESCAPE
======================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeMenu();

        searchPanel.classList.remove("active");

    }

});


/* ========================================
   START
======================================== */

loadArticles();

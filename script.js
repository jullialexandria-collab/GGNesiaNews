/* ========================================
   GGNESIA NEWS - SCRIPT
======================================== */


/* ========================================
   SIDE MENU
======================================== */

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");


function openMenu() {
    sideMenu.classList.add("active");
    overlay.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeMenu() {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");

    document.body.style.overflow = "";
}


menuBtn.addEventListener("click", openMenu);

closeBtn.addEventListener("click", closeMenu);

overlay.addEventListener("click", closeMenu);


/* ========================================
   DROPDOWN MENU
======================================== */

const dropdowns = document.querySelectorAll(".dropdown");


dropdowns.forEach(function(dropdown) {

    dropdown.addEventListener("click", function() {

        const submenu = this.nextElementSibling;

        /* Tutup submenu lain */
        dropdowns.forEach(function(otherDropdown) {

            if (otherDropdown !== dropdown) {

                otherDropdown.classList.remove("active");

                const otherSubmenu =
                    otherDropdown.nextElementSibling;

                if (otherSubmenu) {
                    otherSubmenu.classList.remove("active");
                }
            }

        });


        /* Buka / tutup submenu */
        this.classList.toggle("active");

        if (submenu) {
            submenu.classList.toggle("active");
        }

    });

});


/* ========================================
   SEARCH
======================================== */

const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");
const searchSubmit = document.getElementById("searchSubmit");


searchBtn.addEventListener("click", function() {

    searchPanel.classList.toggle("active");

    if (searchPanel.classList.contains("active")) {

        searchInput.focus();

    }

});


/* ========================================
   SEARCH SUBMIT
======================================== */

searchSubmit.addEventListener("click", function() {

    const keyword = searchInput.value.trim();

    if (keyword === "") {

        alert("Silakan masukkan kata yang ingin dicari.");

        searchInput.focus();

        return;
    }


    alert("Pencarian: " + keyword);

});


/* ========================================
   ENTER UNTUK SEARCH
======================================== */

searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        searchSubmit.click();

    }

});


/* ========================================
   MODE
======================================== */

const modeBtn = document.getElementById("modeBtn");


modeBtn.addEventListener("click", function() {

    document.body.classList.toggle("light-mode");

});


/* ========================================
   SLIDER DOTS
======================================== */

const dots = document.querySelectorAll(".slider-dots span");


dots.forEach(function(dot, index) {

    dot.addEventListener("click", function() {

        dots.forEach(function(item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

        console.log("Highlight slide:", index + 1);

    });

});


/* ========================================
   ESCAPE KEY
======================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeMenu();

        searchPanel.classList.remove("active");

    }

});

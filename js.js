// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("themeIcon");

    if (body.classList.contains("light")) {
        body.classList.remove("light");
        body.classList.add("dark");
        themeIcon.className = "fas fa-sun";
        localStorage.setItem("theme", "dark");
    } else {
        body.classList.remove("dark");
        body.classList.add("light");
        themeIcon.className = "fas fa-moon";
        localStorage.setItem("theme", "light");
    }
}

// Load saved theme
document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.className = savedTheme;
    document.getElementById("themeIcon").className =
        savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
});

// Sidebar toggle for mobile
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("show");
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Show/hide scroll to top button
window.addEventListener("scroll", function () {
    const scrollTop = document.querySelector(".scroll-top");
    if (window.pageYOffset > 300) {
        scrollTop.style.display = "block";
    } else {
        scrollTop.style.display = "none";
    }
});

// Progress indicator
window.addEventListener("scroll", function () {
    const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
});

// Active navigation
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".sidebar .nav-link");
    const sections = document.querySelectorAll(".content-section");

    function setActiveNav() {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", setActiveNav);

    // Smooth scroll for navigation links
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });
});

// Close sidebar when clicking on a link (mobile)
document.querySelectorAll(".sidebar .nav-link").forEach((link) => {
    link.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
            document.getElementById("sidebar").classList.remove("show");
        }
    });
});

// Hide sidebar when clicking outside (mobile)
document.addEventListener("click", function (e) {
    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.querySelector(".mobile-menu-btn");

    if (
        window.innerWidth <= 768 &&
        sidebar.classList.contains("show") &&
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        sidebar.classList.remove("show");
    }
});

// Copy code functionality
function copyCode(button) {
    const codeBlock = button.nextElementSibling;
    const code = codeBlock.textContent;

    navigator.clipboard.writeText(code).then(function () {
        button.textContent = "คัดลอกแล้ว!";
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-copy"></i> คัดลอก';
        }, 2000);
    });
}

// Add copy buttons to code blocks
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".code-block").forEach((block) => {
        const copyBtn = document.createElement("button");
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> คัดลอก';
        copyBtn.className =
            "btn btn-sm btn-outline-secondary position-absolute";
        copyBtn.style.top = "10px";
        copyBtn.style.right = "10px";
        copyBtn.style.fontSize = "12px";
        copyBtn.onclick = () => copyCode(copyBtn);

        block.style.position = "relative";
        block.appendChild(copyBtn);
    });
});

// Search functionality (bonus feature)
function searchContent() {
    const searchTerm = document
        .getElementById("searchInput")
        .value.toLowerCase();
    const sections = document.querySelectorAll(".content-section");

    sections.forEach((section) => {
        const text = section.textContent.toLowerCase();
        if (text.includes(searchTerm) || searchTerm === "") {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    });
}

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
    // Ctrl + K for search
    if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            searchInput.focus();
        }
    }

    // Ctrl + D for dark mode toggle
    if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        toggleTheme();
    }
});

// Print functionality
function printPage() {
    window.print();
}

// Bookmark functionality
function bookmark(sectionId) {
    const url =
        window.location.origin + window.location.pathname + "#" + sectionId;
    navigator.clipboard.writeText(url).then(() => {
        alert("ลิงก์ถูกคัดลอกแล้ว!");
    });
}

// Auto-save scroll position
window.addEventListener("scroll", function () {
    localStorage.setItem("scrollPosition", window.pageYOffset);
});

// Restore scroll position
document.addEventListener("DOMContentLoaded", function () {
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
    }
});

// Table of contents generator (if needed)
function generateTOC() {
    const toc = document.createElement("div");
    toc.className = "toc";
    toc.innerHTML = "<h4>สารบัญ</h4><ul></ul>";

    const headings = document.querySelectorAll("h2, h3");
    const tocList = toc.querySelector("ul");

    headings.forEach((heading, index) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#" + heading.parentElement.id;
        a.textContent = heading.textContent;
        li.appendChild(a);
        tocList.appendChild(li);
    });

    return toc;
}

// Initialize features
document.addEventListener("DOMContentLoaded", function () {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });

    // Add loading animation
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.3s ease";

    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);
});




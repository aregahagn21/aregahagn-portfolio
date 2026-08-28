const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
});

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("active");
    });
});
document.addEventListener("DOMContentLoaded", () => {

  const homeScreen = document.getElementById("homeScreen");
  const backButton = document.getElementById("backButton");
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const appIcons =
    document.querySelectorAll(".app-icon");

  const sections =
    document.querySelectorAll(".app-section");


  /* =========================
     OPEN APP
  ========================= */

  appIcons.forEach(icon => {

    icon.addEventListener("click", () => {

      const sectionId =
        icon.dataset.section;

      const section =
        document.getElementById(sectionId);

      if (!section) return;


      // Hide home
      homeScreen.style.display = "none";


      // Hide every section
      sections.forEach(section => {
        section.classList.remove("active");
      });


      // Open selected section
      section.classList.add("active");


      // Show back button
      backButton.classList.add("show");


      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });


      // Update browser history
      history.pushState(
        { section: sectionId },
        "",
        "#" + sectionId
      );
    });

  });


  /* =========================
     BACK BUTTON
  ========================= */

  backButton.addEventListener("click", goHome);


  function goHome() {

    sections.forEach(section => {
      section.classList.remove("active");
    });

    homeScreen.style.display = "flex";

    backButton.classList.remove("show");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    history.pushState(
      {},
      "",
      window.location.pathname
    );
  }


  /* =========================
     BROWSER BACK BUTTON
  ========================= */

  window.addEventListener("popstate", () => {

    const hash =
      window.location.hash.substring(1);

    if (hash) {

      const section =
        document.getElementById(hash);

      if (section) {

        homeScreen.style.display = "none";

        sections.forEach(section => {
          section.classList.remove("active");
        });

        section.classList.add("active");

        backButton.classList.add("show");

        return;
      }
    }

    goHome();
  });


  /* =========================
     DARK MODE
  ========================= */

  const savedTheme =
    localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeIcon.textContent = "☀️";

  }


  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
      document.body.classList.contains("dark");


    localStorage.setItem(
      "portfolio-theme",
      isDark ? "dark" : "light"
    );


    themeIcon.textContent =
      isDark ? "☀️" : "🌙";

  });


  /* =========================
     OPEN SECTION FROM URL
  ========================= */

  const initialHash =
    window.location.hash.substring(1);

  if (initialHash) {

    const section =
      document.getElementById(initialHash);

    if (section) {

      homeScreen.style.display = "none";

      section.classList.add("active");

      backButton.classList.add("show");
    }
  }

});

document.addEventListener("DOMContentLoaded", function () {
  fetchQuranData();
  setupThemeToggle();
});

let currentAudio = null;
let quranDataCache = null;

function fetchQuranData() {
  if (quranDataCache) {
      renderQuran(quranDataCache);
      return;
  }

  Promise.all([
      fetch("https://api.alquran.cloud/v1/quran/ar.alafasy").then(res => res.json()),
      fetch("https://api.alquran.cloud/v1/quran/en.sahih").then(res => res.json())
  ])
  .then(([arabicData, englishData]) => {
      quranDataCache = { arabic: arabicData, english: englishData };
      renderQuran(quranDataCache);
  })
  .catch(error => console.error("Error loading Quran data:", error));
}

function renderQuran(data) {
  let quranContainer = document.getElementById("quran-container");
  let sidebarList = document.getElementById("surah-list");
  quranContainer.innerHTML = "";
  sidebarList.innerHTML = "";

  data.arabic.data.surahs.forEach((surah, index) => {
      let englishSurah = data.english.data.surahs[index];
      let surahElement = document.createElement("div");
      surahElement.classList.add("surah");
      surahElement.id = `surah-${surah.number}`;
      surahElement.innerHTML = `
          <h2>${surah.number}. ${surah.englishName} (${surah.englishNameTranslation})</h2>
          <button class="play-btn" onclick='playSurah(${surah.number})'>▶ Play Surah</button>
          <div class="ayahs">${surah.ayahs.map((ayah, idx) => 
              `<div class="ayah" data-audio="${ayah.audio}" 
                  data-translation="${englishSurah.ayahs[idx].text}" onclick='playAyah(this)'>
                  ${ayah.text} <button class="play-btn">🔊</button>
              </div>`).join("")}</div>
      `;
      quranContainer.appendChild(surahElement);

      let surahItem = document.createElement("li");
      surahItem.innerHTML = `<a href="#surah-${surah.number}">${surah.number}. ${surah.englishName}</a>`;
      sidebarList.appendChild(surahItem);
  });
}

function playAyah(element) {
  let audioSrc = element.getAttribute("data-audio");
  let translation = element.getAttribute("data-translation");

  if (currentAudio) {
      currentAudio.pause();
      document.querySelectorAll(".ayah").forEach(a => a.classList.remove("playing"));
  }

  currentAudio = new Audio(audioSrc);
  currentAudio.play();
  element.classList.add("playing");

  document.getElementById("translation-container").innerText = translation;
}

function playSurah(surahNumber) {
  fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`)
      .then(response => response.json())
      .then(data => {
          let ayahs = data.data.ayahs;
          let index = 0;

          function playNextAyah() {
              if (index < ayahs.length) {
                  if (currentAudio) {
                      currentAudio.pause();
                  }

                  let ayah = ayahs[index];
                  currentAudio = new Audio(ayah.audio);
                  document.getElementById("translation-container").innerText = 
                      quranDataCache.english.data.surahs[surahNumber - 1].ayahs[index].text;

                  document.querySelectorAll(".ayah").forEach(a => a.classList.remove("playing"));
                  document.querySelector(`.ayah[data-audio="${ayah.audio}"]`)?.classList.add("playing");

                  currentAudio.play();
                  currentAudio.onended = () => {
                      index++;
                      playNextAyah();
                  };
              }
          }
          playNextAyah();
      });
}

function searchSurah() {
  let input = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll("#surah-list li").forEach(li => {
      li.style.display = li.textContent.toLowerCase().includes(input) ? "block" : "none";
  });
}

function openSidebar() {
  document.getElementById("sidebar").style.left = "0";
}

function closeSidebar() {
  document.getElementById("sidebar").style.left = "-250px";
}

function setupThemeToggle() {
  const themeButton = document.getElementById("theme-toggle");
  themeButton.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      document.getElementById("sidebar").classList.toggle("dark-mode");
      document.querySelectorAll(".surah").forEach(surah => surah.classList.toggle("dark-mode"));
  });
}


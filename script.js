// ===== DAYS =====
const START_DATE = new Date("2026-02-02");

function calcDays(){
  const now = new Date();
  const diff = now - START_DATE;
  return Math.floor(diff / (1000*60*60*24));
}

document.getElementById("days").textContent = calcDays();
// ===== STATUS (30 CÂU) =====
const statusList = [
  "Vẫn ổn, chỉ là thiếu một người.",
  "Không nói nhiều, nhưng luôn nghĩ tới.",
  "Bình thường… cho tới khi nhớ.",
  "Không cần thường xuyên, chỉ cần đúng người.",
  "Ở cạnh nhau là đủ.",
  "Không hứa nhiều, chỉ ở lại lâu.",
  "Im lặng nhưng không vô tâm.",
  "Không hoàn hảo, nhưng là thật.",
  "Chậm một chút, nhưng chắc.",
  "Không cần ai hiểu, chỉ cần một người.",
  "Cứ như vậy thôi, cũng được.",
  "Ngày bình thường, có người đặc biệt.",
  "Không ồn ào, nhưng đủ đầy.",
  "Một chút quan tâm, hơn ngàn lời nói.",
  "Ở đây, vẫn vậy.",
  "Không yêu nhiều người, chỉ phiền một người.",
  "Bận gì cũng được, miễn là nhớ.",
  "Không giỏi yêu, nhưng yêu thì thật.",
  "Nói ít thôi, làm nhiều hơn.",
  "Không thích drama, chỉ thích em.",
  "Nhớ thì nói, đừng im.",
  "Ở xa nhưng không rời.",
  "Có người để nghĩ tới là đủ.",
  "Không cần hoàn hảo, chỉ cần thật lòng.",
  "Một người thôi là đủ.",
  "Đơn giản nhưng không tầm thường.",
  "Càng lớn càng thích những thứ chắc chắn.",
  "Không cần nhiều, chỉ cần đúng.",
  "Bình yên là khi có nhau.",
  "Ở đâu cũng được, miễn là cùng nhau."
];

// random theo ngày (không đổi trong ngày)
const today = new Date();
const seed = today.getFullYear()*1000 + today.getMonth()*100 + today.getDate();
const index = seed % statusList.length;

document.getElementById("status").textContent = statusList[index];


// ===== MUSIC (PLAYER XỊN) =====
const musicBtn = document.getElementById("musicBtn");

function updateMusicIcon(){
  if(musicOn){
    musicBtn.textContent = "🔊";
  }else{
    musicBtn.textContent = "🔇";
  }
}
});
const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.45;

const playlist = [
  {src:"asset/phokhongem.mp3", name:"🎶 Phố không em"},
  {src:"asset/noinaycoanh.mp3", name:"💗 Nơi này có anh"},
  {src:"asset/masscara", name:"🌙 Masscara"},
  {src:"asset/song3.mp3", name:"✨ Bài 3"}
];

let currentSong = 0;
let musicOn = localStorage.getItem("musicOn") === "true";

// load bài
function loadSong(i){
  currentSong = i;
  bgMusic.src = playlist[i].src;

  const title = document.getElementById("musicTitle");
  if(title) title.textContent = playlist[i].name;

  localStorage.setItem("currentSong", i);
}

// play bài
function playSong(i){
  loadSong(i);
  bgMusic.play();

  musicOn = true;
  localStorage.setItem("musicOn","true");
}

// play / pause
function togglePlay(){
  if(bgMusic.paused){
    bgMusic.play();
    musicOn = true;
  }else{
    bgMusic.pause();
    musicOn = false;
  }

  localStorage.setItem("musicOn", musicOn);
  updateMusicIcon(); // 🔥 thêm dòng này
}

// next / prev
function nextSong(){
  currentSong = (currentSong+1) % playlist.length;
  playSong(currentSong);
}

function prevSong(){
  currentSong = (currentSong-1+playlist.length) % playlist.length;
  playSong(currentSong);
}

// toggle UI
let hideTimeout;

function togglePlayer(){
  const box = document.getElementById("playerBox");
  box.classList.toggle("show");

  if(box.classList.contains("show")){
    clearTimeout(hideTimeout);

    hideTimeout = setTimeout(()=>{
      box.classList.remove("show");
    }, 4000); // 🔥 4s tự ẩn
  }
}

// load lại bài cũ
let saved = localStorage.getItem("currentSong");
if(saved !== null){
  currentSong = parseInt(saved);
}
loadSong(currentSong);

// auto play khi user chạm (mobile fix)
window.addEventListener("click", () => {
  if(musicOn){
    bgMusic.play();
  }
}, {once:true});


// auto next
bgMusic.addEventListener("ended", nextSong);



//// ===== CONFETTI AESTHETIC FULL =====
const confettiBox = document.getElementById("confetti");

const hearts = ["💗","🌸","💗","🥺"];

function createAestheticConfetti(){
  if(!confettiBox) return;

  const el = document.createElement("span");
  el.classList.add("confetti-piece");

  // 💗 random tim
  el.innerHTML = hearts[Math.floor(Math.random()*hearts.length)];

  // vị trí
  el.style.left = Math.random()*100 + "vw";
  el.style.top = "-20px";

  // size
  const size = Math.random()*12 + 10;
  el.style.fontSize = size + "px";

  // layer (tạo chiều sâu)
  const isBack = Math.random() < 0.4;
  el.classList.add(isBack ? "confetti-back" : "confetti-front");

  // tốc độ khác nhau
  const duration = Math.random()*6 + 8;
  el.style.animation = `fallAesthetic ${duration}s linear`;

  confettiBox.appendChild(el);

  setTimeout(()=>{
    el.remove();
  }, (duration+2)*1000);
}


// 🌙 spawn tự nhiên (không đều)
function startAestheticConfetti(){
  const isMobile = window.innerWidth < 600;

  const base = isMobile ? 1 : 2;

  setInterval(()=>{
    const randomAmount = Math.floor(Math.random()*base)+1;

    for(let i=0;i<randomAmount;i++){
      createAestheticConfetti();
    }
  }, isMobile ? 800 : 500);
}

// ===== STARS ⭐ =====
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let W,H,stars;

function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;

  stars = Array.from({length: Math.floor((W*H)/12000)}, ()=>({
    x:Math.random()*W,
    y:Math.random()*H,
    r:Math.random()*1.4+0.3,
    a:Math.random()*0.8+0.2
  }));
}

window.addEventListener("resize", resize);

function draw(){
  ctx.clearRect(0,0,W,H);

  for(const s of stars){
    s.a += (Math.random()-0.5)*0.1;
    s.a = Math.max(0.1, Math.min(1,s.a));

    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${s.a})`;
    ctx.fill();
  }

  requestAnimationFrame(draw);
}


// ===== DISTANCE =====
function calculateDistance(){
  const lamHa = {lat:11.93, lon:108.23};
  const cuaOng = {lat:21.02, lon:107.33};

  const toRad = x => x*Math.PI/180;
  const R = 6371;

  const dLat = toRad(cuaOng.lat - lamHa.lat);
  const dLon = toRad(cuaOng.lon - lamHa.lon);

  const a =
    Math.sin(dLat/2)**2 +
    Math.cos(toRad(lamHa.lat)) *
    Math.cos(toRad(cuaOng.lat)) *
    Math.sin(dLon/2)**2;

  const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R*c);
}

document.getElementById("distanceText").textContent =
  "Cách nhau " + calculateDistance() + " km 💗";

//RUN
resize();
draw();
startAestheticConfetti();
 updateMusicIcon();

window.addEventListener("load", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

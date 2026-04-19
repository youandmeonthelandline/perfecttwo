const START_DATE = new Date("2026-02-02");

function calcDays(){
const now = new Date();
const diff = now - START_DATE;
return Math.floor(diff / (1000*60*60*24));
}

document.getElementById("days").textContent = calcDays();
// ===== CẬP NHẬT TRẠNG THÁI =====
// ===== DANH SÁCH 30 CÂU =====
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

// ===== RANDOM THEO NGÀY =====
const today = new Date();
const seed = today.getFullYear() * 1000 + today.getMonth() * 100 + today.getDate();

// tạo random nhưng cố định trong ngày
const index = seed % statusList.length;

document.getElementById("status").textContent = statusList[index];
//======NHẠC 🎵=====
    const bgMusic =document.getElementById("bgMusic");//👉 Lấy audio
    const musicBtn = document.getElementById("musicBtn");
    bgMusic.volume = 0.45;//👉 Âm lượng

    let musicOn = localStorage.getItem("musicOn") === "true";//👉 Lưu trạng thái nhạc
    function updateMusicBtn(){
      musicBtn.textContent = musicOn ? "🔇 Tắt nhạc" : "🎵 Bật nhạc";
    }
    async function playMusic(){//👉 Phát nhạc
      try{
        await bgMusic.play();
        musicOn = true;
        localStorage.setItem("musicOn","true");
      }catch(e){
        musicOn = false;
        localStorage.setItem("musicOn","false");
      }
      updateMusicBtn();
    }
    function pauseMusic(){//👉 Tắt nhạc
      bgMusic.pause();
      musicOn = false;
      localStorage.setItem("musicOn","false");
      updateMusicBtn();
    }
    musicBtn.addEventListener("click", () => {
      if(musicOn) pauseMusic();
      else playMusic();
    });

    // ✅ auto play when user first interacts (mobile friendly)
    const start = async () => {
  if(!musicOn){
    await bgMusic.play(); // ✅ dùng trực tiếp
    musicOn = true;
    localStorage.setItem("musicOn","true");
    updateMusicBtn();
  }
};
      window.addEventListener("click", start, { once:true });
      window.addEventListener("touchstart", start, { once:true });
    }
const playlist = [
  {src:"asset/phokhongem.mp3", name:"🎶 Phố không em"},
  {src:"asset/song1.mp3", name:"💗 Bài 1"},
  {src:"asset/song2.mp3", name:"🌙 Bài 2"},
  {src:"asset/song3.mp3", name:"✨ Bài 3"}
];

let currentSong = 0;

// load bài
function loadSong(index){
  currentSong = index;
  bgMusic.src = playlist[currentSong].src;

  document.getElementById("musicTitle").textContent =
    playlist[currentSong].name;

  localStorage.setItem("currentSong", currentSong);
}

// play bài cụ thể
function playSong(index){
  loadSong(index);
  bgMusic.play();

  musicOn = true;
  localStorage.setItem("musicOn","true");
  updateMusicBtn();
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
  updateMusicBtn();
}

// next
function nextSong(){
  currentSong = (currentSong + 1) % playlist.length;
  playSong(currentSong);
}

// prev
function prevSong(){
  currentSong = (currentSong - 1 + playlist.length) % playlist.length;
  playSong(currentSong);
}

// auto load khi mở web
let savedSong = localStorage.getItem("currentSong");

if(savedSong !== null){
  currentSong = parseInt(savedSong);
}

loadSong(currentSong);

const confettiBox = document.getElementById("confetti");

function createConfettiPiece(){
  const el = document.createElement("span");

  el.innerHTML = "💗";

  el.style.position = "absolute";
  el.style.left = Math.random() * 100 + "vw";
  el.style.top = "-20px";

  el.style.fontSize = (Math.random() * 10 + 10) + "px";

  // ✅ để opacity ở đây
  el.style.opacity = (Math.random() * 0.3 + 0.2).toFixed(2);

  const duration = Math.random() * 6 + 8;
  el.style.animation = "fallSoft " + duration + "s linear";

  confettiBox.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, (duration + 2) * 1000);
}
function startGentleConfetti(){
  const isMobile = window.innerWidth < 600;

  const amount = isMobile ? 1 : 2;      // 📱 ít hơn
  const speed = isMobile ? 900 : 500;   // 📱 chậm hơn

  setInterval(() => {
    for(let i = 0; i < amount; i++){
      createConfettiPiece();
    }
  }, speed);
}
// 🌟 PHẦN 4: SAO LẤP LÁNH ⭐
    const canvas = document.getElementById("stars");//👉 Lấy canvas (vùng vẽ)
    const ctx = canvas.getContext("2d");//👉 Lấy công cụ vẽ 2D
    let W, H, stars;

    function resize(){//👉 Khi thay đổi kích thước màn hình
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      createStars();//👉 Tạo sao mới
    }
    window.addEventListener("resize", resize);

    function createStars(){//👉 Tạo danh sách sao
      const count = Math.floor((W * H) / 12000);
      stars = Array.from({length: count}, () => ({//👉 Tạo nhiều ngôi sao random
        x: Math.random()*W,
        y: Math.random()*H,
        r: Math.random()*1.4 + 0.3,
        a: Math.random()*0.8 + 0.2
      }));
    }

    function draw(){//👉 Vẽ sao
      ctx.clearRect(0,0,W,H);
      for(const st of stars){
        st.a += (Math.random() - 0.5) * 0.1;
        st.a = Math.max(0.12, Math.min(0.95, st.a));
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI*2);//👉 Vẽ hình tròn (ngôi sao)
        ctx.fillStyle = `rgba(255,255,255,${st.a})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);//👉 Lặp animation liên tục
    }
//Khoảng cách chúng mình//
// 💗 DISTANCE
function calculateDistance(){
  // tọa độ gần đúng
  const lamHa = { lat: 11.93, lon: 108.23 };
  const cuaOng = { lat: 21.02, lon: 107.33 };

  function toRad(x){
    return x * Math.PI / 180;
  }

  const R = 6371; // bán kính trái đất (km)

  const dLat = toRad(cuaOng.lat - lamHa.lat);
  const dLon = toRad(cuaOng.lon - lamHa.lon);

  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lamHa.lat)) *
    Math.cos(toRad(cuaOng.lat)) *
    Math.sin(dLon/2) *
    Math.sin(dLon/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const distance = Math.round(R * c);

  return distance;
}

// hiển thị
const distance = calculateDistance();
document.getElementById("distanceText").textContent =
  "Cách nhau " + distance + " km 💗";

// 🚀 chạy    
//# 🌟 PHẦN 11: CHẠY LÚC MỞ WEB
    resize();
    draw();
    startGentleConfetti();
    //resize(); draw(); startGentleConfetti() 👉 Khởi động hiệu ứng
    //buildMarquee();
    //buildImages();
    //updateStats();
    //setInterval(updateStats, 60*1000);//👉 Cập nhật mỗi phút
    updateMusicBtn();
    enableMusicOnFirstTouch();//👉 Click mới bật nhạc (tránh bị chặn)
    if(musicOn) playMusic();
//mưa hồng


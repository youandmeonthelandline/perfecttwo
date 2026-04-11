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
    document.getElementById("bgMusic");//👉 Lấy audio
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
    function enableMusicOnFirstTouch(){
      const start = async () => {
        if(!musicOn){
          await playMusic();
        }else{
          // if previously on, try resume
          await playMusic();
        }
      };
      window.addEventListener("click", start, { once:true });
      window.addEventListener("touchstart", start, { once:true });
    }

    //# 🌟 PHẦN 11: CHẠY LÚC MỞ WEB
    resize();
    draw();
    startGentleConfetti();
    //resize(); draw(); startGentleConfetti() 👉 Khởi động hiệu ứng
    buildMarquee();
    buildImages();
    updateStats();
    setInterval(updateStats, 60*1000);//👉 Cập nhật mỗi phút
    updateMusicBtn();
    enableMusicOnFirstTouch();//👉 Click mới bật nhạc (tránh bị chặn)
    if(musicOn) playMusic();

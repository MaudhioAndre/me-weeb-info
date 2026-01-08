import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const REWARD_EXPIRE_MS = 2 * 60 * 1000;

const ID_ANIME_POOL = [
  "52991",
  "57555",
  "5114",
  "9253",
  "61517",
  "38524",
  "15417",
  "9969",
  "60022",
  "11061",
  "39486",
  "28977",
  "820",
  "41467",
  "34096",
  "43608",
  "42938",
  "4181",
];

const TOTAL_PAGE = 10;

function getRandomAnime(excluded = []) {
  const available = ID_ANIME_POOL.filter((id) => !excluded.includes(id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

function getRandomTime(min = 5, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCode(length = 12) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

export default function ScrollCountdown() {
  const { idAnime } = useParams();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(() => getRandomTime());
  const [isActive, setIsActive] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const [completed, setCompleted] = useState(false);
  const [rewardCode, setRewardCode] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [rewardLeft, setRewardLeft] = useState(0);

  const inactivityRef = useRef(null);
  const intervalRef = useRef(null);
  const handledRef = useRef(false);

  // =========================
  // Scroll detection
  // =========================
  const handleScroll = () => {
    if (completed) return;

    setIsActive(true);

    clearTimeout(inactivityRef.current);
    inactivityRef.current = setTimeout(() => {
      setIsActive(false);
    }, 3000);
  };

  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem("anime_progress"));
    if (progress?.completed) {
      setCompleted(true);

      const savedCode = localStorage.getItem("anime_reward");
      if (savedCode) setRewardCode(savedCode);
    }
  }, []);

  useEffect(() => {
    const progressRaw = localStorage.getItem("anime_progress");
    const reward = localStorage.getItem("anime_reward");

    if (!progressRaw || !reward) return;

    let progress;
    try {
      progress = JSON.parse(progressRaw);
    } catch {
      return;
    }

    if (!progress.completed || !progress.completedAt) return;

    const diff = Date.now() - progress.completedAt;

    if (diff <= REWARD_EXPIRE_MS) {
      setCompleted(true);
      setRewardCode(reward);
      setRewardLeft(REWARD_EXPIRE_MS - diff);
    }
  }, []);

  useEffect(() => {
    if (!completed) return;

    const progress = JSON.parse(localStorage.getItem("anime_progress"));
    if (!progress?.completedAt) return;

    const interval = setInterval(() => {
      const left = REWARD_EXPIRE_MS - (Date.now() - progress.completedAt);

      if (left <= 0) {
        clearInterval(interval);

        // RESET TOTAL
        localStorage.removeItem("anime_progress");
        localStorage.removeItem("anime_reward");

        window.location.href = `/anime/${ID_ANIME_POOL[0]}`;
      } else {
        setRewardLeft(left);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [completed]);

  // =========================
  // Logic when time is over
  // =========================
  useEffect(() => {
    if (timeLeft !== 0) return;
    if (!idAnime) return;
    if (handledRef.current) return;

    handledRef.current = true;

    const progress = JSON.parse(localStorage.getItem("anime_progress")) || {
      visited: [],
      currentIndex: 0,
      completed: false,
    };

    if (!progress.visited.includes(idAnime)) {
      progress.visited.push(idAnime);
      progress.currentIndex += 1;
    }

    // FINISH
    if (progress.currentIndex >= TOTAL_PAGE) {
      const completedAt = Date.now();

      progress.completed = true;
      progress.completedAt = completedAt;

      let code = localStorage.getItem("anime_reward");
      if (!code) {
        code = generateCode();
        localStorage.setItem("anime_reward", code);
      }

      localStorage.setItem("anime_progress", JSON.stringify(progress));

      setCompleted(true);
      setRewardCode(code);
      setCanNext(false);
      setIsActive(false);
      return;
    }

    // BELUM FINISH → TUNGGU USER
    localStorage.setItem("anime_progress", JSON.stringify(progress));
    setIsActive(false);
    setCanNext(true); // ⬅️ tampilkan tombol
  }, [timeLeft, idAnime]);

  // =========================
  // Prevent revisiting anime
  // =========================

  useEffect(() => {
    handledRef.current = false;
    setCanNext(false);
    setTimeLeft(getRandomTime());
    setIsActive(false);
  }, [idAnime]);

  // =========================
  // Scroll listener
  // =========================
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(inactivityRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleNext = () => {
    const progress = JSON.parse(localStorage.getItem("anime_progress"));
    if (!progress) return;

    const nextAnime = getRandomAnime(progress.visited);
    if (!nextAnime) return;

    // 🔁 Pilih salah satu:
    // navigate(`/anime/${nextAnime}`);
    // atau (lebih aman):
    window.location.href = `/anime/${nextAnime}`;
  };

  useEffect(() => {
    if (completed) return;

    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft, completed]);

  useEffect(() => {
    setTimeLeft(getRandomTime());
    setIsActive(false);
  }, [idAnime]);

  //   useEffect(() => {
  //     const progress = JSON.parse(localStorage.getItem("anime_progress"));

  //     if (progress) {
  //       setCurrentPage(Math.min(progress.currentIndex + 1, TOTAL_PAGE));
  //     }
  //   }, [idAnime]);

  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem("anime_progress"));

    if (!progress) {
      setCurrentPage(1);
    } else {
      setCurrentPage(Math.min(progress.currentIndex + 1, TOTAL_PAGE));
    }
  }, [idAnime]);

  return (
    <div style={{ padding: 24 }}>
      {!completed && <p style={{ opacity: 0.7 }}>Halaman {currentPage} / 10</p>}

      {completed ? (
        <>
          <h2>🎉 Selamat!</h2>
          <p>Kode kamu:</p>
          <h1 style={{ letterSpacing: 2 }}>{rewardCode}</h1>
          <p style={{ opacity: 0.7 }}>
            Berlaku selama {Math.ceil(rewardLeft / 1000)} detik
          </p>
        </>
      ) : (
        <>
          <p>
            Waktu tersisa: <b>{timeLeft}</b> detik
          </p>

          {/* <p>Status: {isActive ? "🟢 Aktif" : "🔴 Pause"}</p> */}

          {!canNext && <p>Scroll untuk melanjutkan countdown</p>}

          {canNext && (
            <button
              onClick={handleNext}
              style={{
                marginTop: 16,
                padding: "10px 20px",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Next Page
            </button>
          )}
        </>
      )}
    </div>
  );
}

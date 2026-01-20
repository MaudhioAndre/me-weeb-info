import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const REWARD_EXPIRE_MS = 2 * 60 * 1000;

const ID_ANIME_POOL = [
  "1", "5", "6", "15", "16", "18", "19", "20", "21", "30",
  "33", "43", "47", "50", "101", "120", "132", "145", "150", "164",
  "199", "205", "226", "245", "457", "511", "523", "777", "820", "850",
  "1535", "1575", "2001", "2167", "2904", "3000", "4181", "4224", "4898", "5040",
  "5114", "6547", "6702", "7785", "8074", "9253", "9756", "9969", "10087", "11061",
  "11757", "13601", "14719", "15335", "15417", "16498", "17389", "18671", "19815", "21033",
  "23273", "28977", "30276", "30503", "31240", "32281", "32937", "33352", "34096", "34599",
  "35839", "37403", "37510", "37521", "38000", "38524", "39486", "39535", "40028", "40748",
  "41467", "42210", "42938", "43608", "44511", "48583", "49596", "50002", "51009", "51145",
  "52034", "52991", "53887", "54595", "57555", "58000", "60022", "60371", "61000", "61517"
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

function generateCode(numberCount, charCount) {
  const numbers = "0123456789";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let result = [];

  // Ambil angka random
  for (let i = 0; i < numberCount; i++) {
    result.push(numbers[Math.floor(Math.random() * numbers.length)]);
  }

  // Ambil huruf random
  for (let i = 0; i < charCount; i++) {
    result.push(letters[Math.floor(Math.random() * letters.length)]);
  }

  // Acak posisi (Fisher-Yates Shuffle)
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join("");
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
        code = generateCode(4, 4);
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

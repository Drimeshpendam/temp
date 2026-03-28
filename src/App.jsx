import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "14px 24px",
        borderRadius: "30px",
        background: "linear-gradient(135deg,#ff4d6d,#ff85a1)",
        color: "white",
        border: "none",
        fontSize: "16px",
        width: "80%",
        maxWidth: "250px",
        boxShadow: "0 4px 15px rgba(255,0,100,0.4)",
      }}
    >
      {children}
    </button>
  );
}

// ✅ COUNTDOWN ADDED BACK
function CountdownPage({ onComplete }) {
  const target = new Date();
  target.setHours(24, 0, 0, 0);
  const targetTime = target.getTime();

  const [timeLeft, setTimeLeft] = useState(targetTime - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = targetTime - Date.now();
      if (diff <= 0) {
        clearInterval(timer);
        onComplete();
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        🎊 Countdown to Your Special Moment ❤️
      </h2>

      <h1 style={{ fontSize: "clamp(30px,8vw,50px)" }}>
        {hours} : {minutes} : {seconds}
      </h1>

      {/* DEV SKIP BUTTON */}
      {/* <div style={{ marginTop: "10px" }}>
        <Button onClick={onComplete}>Skip</Button>
      </div> */}
    </div>
  );
}

// ---------------- MAIN EXPERIENCE ----------------
function CakeCutting() {
  const [stage, setStage] = useState("cut");
  const [wishes, setWishes] = useState(["", "", ""]);
  const [error, setError] = useState("");
  const [tapValue, setTapValue] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const images = ["cake.jpg", "cake.jpg", "cake.jpg"];
  const videos = ["/media/video1.mp4", "/media/video2.mp4", "/media/video3.mp4"];
  const questions = [
  {
    q: "Where did we first meet?",
    options: ["College", "Online", "Cafe", "Work"],
    answer: "College",
  },
  {
    q: "My favorite thing about you?",
    options: ["Smile", "Eyes", "Care", "Everything"],
    answer: "Everything",
  },
  {
    q: "Our special date?",
    options: ["1 Jan", "14 Feb", "Your Date", "Other"],
    answer: "Your Date",
  },
];

  useEffect(() => {
    if (stage !== "game") return;

    const interval = setInterval(() => {
      setTapValue((v) => {
        if (v >= 100) return v;
        return Math.max(0, v - 1.5);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "linear-gradient(to bottom,#0f0f0f,#1a1a1a)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {stage !== "cut" && (
  <audio autoPlay loop>
    <source src="/song.mp3" type="audio/mp3" />
  </audio>
)}

      {/* CUT */}
      {stage === "cut" && (
        <>
          <h2 style={{ fontSize: "clamp(24px,6vw,32px)", marginBottom: "20px" }}>
            🎂 Cut the Cake
          </h2>
          <p>Write 3 wishes ❤️</p>

{wishes.map((w, i) => (
  <input
    key={i}
    placeholder={`Wish ${i + 1}`}
    value={w}
    onChange={(e) => {
      const newWishes = [...wishes];
      newWishes[i] = e.target.value;
      setWishes(newWishes);
    }}
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "10px",
      border: "none",
      marginTop: "6px",
      outline: "none",
    }}
  />
))}

{error && (
  <p style={{ color: "#ff4d6d", marginTop: "5px" }}>
    {error}
  </p>
)}

          <motion.img
            src="/cake.jpg"
            style={{ width: "70%", maxWidth: "250px", borderRadius: "20px" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
  if (wishes.some((w) => w.trim() === "")) {
    setError("Please enter all 3 wishes ❤️");
    return;
  }
  setError("");
  setStage("gallery");
}}
          />

          <p style={{ marginTop: "10px", opacity: 0.7 }}>Tap to cut</p>
        </>
      )}

      {/* GALLERY */}
      {stage === "gallery" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.img
            src={images[0]}
            style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", bottom: "30px", width: "100%" }}>
            <Button onClick={() => setStage("message")}>Next</Button>
          </div>
        </motion.div>
      )}

      {/* MESSAGE */}
      {stage === "message" && (
        <div style={{ width: "100%", position: "relative" }}>
          <div
  style={{
    width: "100%",
    height: "60vh", // ✅ FIXED HEIGHT (important for mobile)
    overflow: "hidden", // ✅ hides overflow
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <motion.div
    initial={{ y: "100%" }}
    animate={{ y: "-120%" }} // ✅ slightly more for full exit
    transition={{
      duration: 25, // slower = readable
      ease: "linear",
    }}
    style={{
      fontSize: "clamp(14px,4vw,20px)",
      lineHeight: "1.8",
      textAlign: "center",
      padding: "0 10px 0 10px",
      width: "100%",
    }}
  >
    ❤️ You are my happiness, my peace, my forever. Every moment with you is magic. I love you endlessly ❤️ <br /><br />
    ❤️ You are my happiness, my peace, my forever. Every moment with you is magic. I love you endlessly ❤️ <br /><br />
    ❤️ You are my happiness, my peace, my forever. Every moment with you is magic. I love you endlessly ❤️ <br /><br />
    ❤️ You are my happiness, my peace, my forever. Every moment with you is magic. I love you endlessly ❤️ <br /><br />
    ❤️ You are my happiness, my peace, my forever. Every moment with you is magic. I love you endlessly ❤️
  </motion.div>
</div>

          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [-10, 10] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{
                position: "absolute",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              ❤️
            </motion.div>
          ))}

          <div style={{ marginTop: "20px" }}>
            <Button onClick={() => setStage("cards")}>Next</Button>
          </div>
        </div>
      )}

      {/* CARDS */}
      {stage === "cards" && !selectedVideo && (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "15px" }}>
          {videos.map((v, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedVideo(v)}
              style={{
                padding: "18px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "15px",
                backdropFilter: "blur(10px)",
                fontSize: "18px",
              }}
            >
              💌 Tap to Open Memory {i + 1}
            </motion.div>
          ))}

          <Button onClick={() => setStage("game")}>Play Love Game ❤️</Button>
        </div>
      )}

      {/* VIDEO */}
      {selectedVideo && (
        <div style={{ width: "100%" }}>
          <video src={selectedVideo} controls autoPlay style={{ width: "100%", borderRadius: "15px" }} />
          <div style={{ marginTop: "10px" }}>
            <Button onClick={() => setSelectedVideo(null)}>Back</Button>
          </div>
        </div>
      )}


      {stage === "quiz" && (
  <div style={{ width: "100%", maxWidth: "400px" }}>
    <h2>💖 How Well Do You Know Us?</h2>

    {questions.map((item, i) => (
      <div key={i} style={{ marginTop: "15px" }}>
        <p>{item.q}</p>

        {item.options.map((opt, j) => (
          <div
            key={j}
            onClick={() => {
              const newAns = [...answers];
              newAns[i] = opt;
              setAnswers(newAns);
            }}
            style={{
              padding: "10px",
              marginTop: "5px",
              borderRadius: "10px",
              background:
                answers[i] === opt ? "#ff4d6d" : "rgba(255,255,255,0.1)",
              cursor: "pointer",
            }}
          >
            {opt}
          </div>
        ))}
      </div>
    ))}

    <div style={{ marginTop: "20px" }}>
      <Button
        onClick={() => {
          let sc = 0;
          questions.forEach((q, i) => {
            if (answers[i] === q.answer) sc++;
          });
          setScore(sc);
          setStage("result");
        }}
      >
        Submit 💘
      </Button>
    </div>
  </div>
)}

{stage === "result" && (
  <div>
    <h2>💞 Your Love Score</h2>

    <h1>
      {Math.round((score / questions.length) * 100)}%
    </h1>

    <p>
      {score === questions.length
        ? "Perfect Match ❤️"
        : score > questions.length / 2
        ? "Strong Bond 💖"
        : "Still Growing 💕"}
    </p>

    <Button onClick={() => setStage("cut")}>
      Restart 🔄
    </Button>
  </div>
)}


{stage === "result" && (
  <div style={{ textAlign: "center" }}>
    <h2>💞 Your Love Score</h2>

    <h1>
      {Math.round((score / questions.length) * 100)}%
    </h1>

    <p style={{ marginTop: "10px" }}>
      Now meet the person who loves you the most ❤️
    </p>

    {/* CALL BUTTON */}
    <a
      href="https://meet.google.com/tmu-oibk-dyz"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        marginTop: "15px",
        padding: "14px 20px",
        borderRadius: "30px",
        background: "linear-gradient(135deg,#ff4d6d,#ff85a1)",
        color: "white",
        textDecoration: "none",
        fontSize: "16px",
        boxShadow: "0 6px 20px rgba(255,0,100,0.4)",
      }}
    >
      📞 Join Call
    </a>

    <div style={{ marginTop: "15px" }}>
      <Button onClick={() => setStage("cut")}>
        Restart 🔄
      </Button>
    </div>
  </div>
)}

      {/* GAME */}
      {stage === "game" && (
        <div style={{ width: "100%", maxWidth: "300px" }}>
          <h3 style={{ marginBottom: "10px" }}>Show Your Love ❤️</h3>

          <div style={{ height: "20px", background: "#333", borderRadius: "10px", overflow: "hidden" }}>
            <div
              style={{
                width: tapValue + "%",
                height: "100%",
                background: "linear-gradient(to right,#ff4d6d,#ff85a1)",
              }}
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <Button
              onClick={() => {
                setTapValue((v) => (v >= 100 ? v : Math.min(100, v + 4)));
              }}
            >
              Tap ❤️
            </Button>
          </div>

          {tapValue >= 100 && (
  <>
    <h2 style={{ marginTop: "10px" }}>
      ❤️ Infinite Love ❤️ <br /> Game Completed 🎉
    </h2>

    <div style={{ marginTop: "15px" }}>
      <Button onClick={() => setStage("quiz")}>
        Start Mystery Game 💌
      </Button>
    </div>
  </>
)}
        </div>
      )}
    </div>
  );
}

// ✅ FLOW CONTROLLER
export default function App() {
  const [stage, setStage] = useState("countdown");

  return (
    <>
      {stage === "countdown" && (
        <CountdownPage onComplete={() => setStage("cake")} />
      )}

      {stage === "cake" && <CakeCutting />}
    </>
  );
}
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./InterviewPage.css";

const API_BASE = "https://ligand-software-solutions-workshop-2.onrender.com/api"; 
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY || "";
if (!GROQ_API_KEY) {
  console.warn("REACT_APP_GROQ_API_KEY is not set. Groq API calls will fail.");
}


const checkAnswerWithGroq = async (question, answer) => {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are an interview evaluator. You are given a question and a candidate's answer.
            Evaluate ONLY if the answer is correct or wrong. 
            Respond in JSON strictly as: 
            { "isCorrect": true/false, "feedback": "short feedback" }`,
          },
          { role: "user", content: `Question: ${question}\nAnswer: ${answer}` },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
      }
    );

    const text = res.data.choices?.[0]?.message?.content || "{}";
    return JSON.parse(text);
  } catch (err) {
    console.error("Groq check error:", err);
    return { isCorrect: false, feedback: "Error checking answer." };
  }
};

const InterviewPage = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [started, setStarted] = useState(false);
  const [listening, setListening] = useState(false);
  const [typing, setTyping] = useState(false);
  const [interviewOver, setInterviewOver] = useState(false);
  const [score, setScore] = useState(0);
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [voices, setVoices] = useState([]);
  const [typedAnswer, setTypedAnswer] = useState("");

  const user = localStorage.getItem("username") || "Candidate";
  const videoRef = useRef(null);

  // Fetch topics from backend
  useEffect(() => {
    axios
      .get(`${API_BASE}/topics`)
      .then((res) => {
        if (res.data.success) setTopics(res.data.data);
      })
      .catch((err) => console.error("Fetch topics error:", err));
  }, []);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      if (allVoices.length > 0) setVoices(allVoices);
    };
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  // Voice output
  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    const googleUS = voices.find(
      (v) => v.name === "Google US English" && v.lang === "en-US"
    );
    if (googleUS) utter.voice = googleUS;
    window.speechSynthesis.speak(utter);
  };

  // Start interview
  const startInterview = async () => {
    if (!selectedTopic) {
      alert("Please select a topic first.");
      return;
    }
    try {
      const res = await axios.get(`${API_BASE}/topics/${selectedTopic}`);
      if (res.data.success) {
        const fetchedQuestions = res.data.data.questions;
        setQuestions(fetchedQuestions);
        setStarted(true);

        const greet = `Hi ${user}, Welcome to the interview on ${res.data.data.name}. Let's begin.`;
        addMessage("AI", greet);
        speak(greet);

        // Wait for state before asking first question
        setTimeout(() => {
          askNextQuestion(0, fetchedQuestions);
        }, 1500);
      }
    } catch (err) {
      console.error("Fetch topic error:", err);
    }
  };

  // Ask next question
  const askNextQuestion = (index, qList = questions) => {
    if (index < qList.length) {
      const q = qList[index].question;
      addMessage("AI", q);
      speak(q);
      setCurrentQIndex(index);
    } else {
      handleInterviewEnd();
    }
  };

  // Listen user answer (speech recognition)
  const listen = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      handleAnswer(transcript);
    };

    recognition.start();
  };

  // Handle typed or spoken answer
  const handleAnswer = async (answer) => {
    addMessage("User", answer);
    setTyping(true);

    const q = questions[currentQIndex].question;
    const result = await checkAnswerWithGroq(q, answer);

    if (result.isCorrect) setScore((prev) => prev + 1);

    addMessage(
      "AI",
      `Your answer is ${result.isCorrect ? "✅ Correct" : "❌ Wrong"}.\n${
        result.feedback
      }`
    );

    setTyping(false);
    setTypedAnswer(""); // clear textarea

    // Move to next question
    setTimeout(() => askNextQuestion(currentQIndex + 1), 1500);
  };

  const submitTypedAnswer = () => {
    if (!typedAnswer.trim()) return;
    handleAnswer(typedAnswer.trim());
  };

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  // End interview
  const handleInterviewEnd = async () => {
    setInterviewOver(true);
    addMessage("AI", "📋 Interview complete. Preparing feedback...");

    try {
      // Get strengths/weaknesses summary
      const summaryRes = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `You are an interviewer summarizer. Based on the conversation below, highlight strengths and weaknesses of the candidate concisely.`,
            },
            {
              role: "user",
              content: JSON.stringify(messages),
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
        }
      );

      const feedback = summaryRes.data.choices?.[0]?.message?.content || "";
      const [strPart, weakPart] = feedback.split("Weaknesses:");

      setStrengths(strPart?.replace("Strengths:", "").trim() || "N/A");
      setWeaknesses(weakPart?.trim() || "N/A");

      // Save result to backend
      await axios.post(`${API_BASE}/topics/interview/score`, {
        username: user,
        topicId: selectedTopic,
        score,
        total: questions.length,
        strengths: strPart,
        weaknesses: weakPart,
      });

      addMessage(
        "AI",
        `Interview finished! 🎯 Your Score: ${score}/${questions.length}\n\nStrengths: ${strPart}\nWeaknesses: ${weakPart}`
      );
      speak("The interview is now complete. Your performance has been saved.");
    } catch (err) {
      console.error("Feedback error:", err);
    }
  };

  return (
    <div className="interview-container">
      {!started ? (
        <div className="intro-card">
          <h1 className="title">AI Mock Interview</h1>
          <label className="label">Select Interview Topic:</label>
          <select
            className="dropdown"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <option value="">-- Select a Topic --</option>
            {topics.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>
          <button className="btn start-btn" onClick={startInterview}>
            Start Interview
          </button>
        </div>
      ) : (
        <div className="interview-card">
          <h2 className="subtitle">Interview Session</h2>
          <div className="content">
            <div className="chat-section">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chat-bubble ${
                    msg.sender === "AI" ? "ai-bubble" : "user-bubble"
                  }`}
                >
                  <p className="sender">
                    {msg.sender === "AI" ? "🤖 Interviewer" : "👤 You"}
                  </p>
                  <p className="message">{msg.text}</p>
                </div>
              ))}
              {typing && (
                <div className="chat-bubble ai-bubble typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>
          </div>

          {!interviewOver && (
            <div className="controls">
              <button
                onClick={listen}
                disabled={listening || typing}
                className={`btn mic-btn ${listening ? "listening" : ""}`}
              >
                {listening ? "🎤 Listening..." : "🎤 Answer with Mic"}
              </button>

              <textarea
                className="answer-input"
                placeholder="Type your answer here..."
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                rows={3}
                style={{ resize: "vertical" }}
              />

              <button
                onClick={submitTypedAnswer}
                disabled={!typedAnswer.trim() || typing}
                className="btn send-btn"
              >
                Send Answer
              </button>
            </div>
          )}

          {interviewOver && (
            <div className="results-card">
              <h3>
                Your Score: {score}/{questions.length}
              </h3>
              <p>
                <strong>Strengths:</strong> {strengths}
              </p>
              <p>
                <strong>Weaknesses:</strong> {weaknesses}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewPage;

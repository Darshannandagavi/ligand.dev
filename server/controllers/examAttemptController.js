// controllers/examAttemptController.js
import Exam from "../models/exam.js";
import ExamAttempt from "../models/examAttempt.js";

export async function submitExam(req, res) {
  try {
    const { examId, studentId, answers } = req.body; 
    // answers = [{ questionId, chosenAnswer }] where chosenAnswer is a STRING

    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ error: "Exam not found" });

    let score = 0;
    const processedAnswers = answers.map((ans) => {
      const question = exam.questions.id(ans.questionId);

      const isCorrect = question.answer === ans.chosenAnswer;
      if (isCorrect) score++;

      return {
        questionId: ans.questionId,
        chosenAnswer: ans.chosenAnswer,
        correctAnswer: question.answer,
        isCorrect,
      };
    });

    const totalQuestions = exam.questions.length;
    const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

    const attempt = new ExamAttempt({
      exam: examId,
      student: studentId,
      answers: processedAnswers,
      score,
      totalQuestions,
      percentage,
    });

    await attempt.save();
    console.log("the data is here",attempt)
    res.status(201).json({ message: "Exam submitted", attempt });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


// Get student exam history
export async function getStudentHistory(req, res) {
  try {
    let attempts = await ExamAttempt.find({ student: req.params.studentId })
      .populate("exam", "examNumber visibility questions examTitle showResult")
      .sort({ createdAt: -1 });

    // Attach question text to each answer
    attempts = attempts.map(attempt => {
      const examQuestions = (attempt.exam && attempt.exam.questions) || [];

      // attach question text to answers
      const answersWithText = attempt.answers.map(ans => {
        const q = examQuestions.find(q => q._id.toString() === ans.questionId.toString());
        return {
          ...ans.toObject(),
          questionText: q ? q.questionText : "Question not found"
        };
      });

      const showResult = attempt.exam && attempt.exam.showResult;

      // If results are hidden by admin, redact score/percentage/answers
      if (!showResult) {
        return {
          ...attempt.toObject(),
          // redact sensitive result fields
          score: undefined,
          totalQuestions: undefined,
          percentage: undefined,
          answers: [],
          resultsHidden: true,
          exam: {
            examNumber: attempt.exam ? attempt.exam.examNumber : undefined,
            examTitle: attempt.exam ? attempt.exam.examTitle : undefined,
            visibility: attempt.exam ? attempt.exam.visibility : undefined,
            showResult: false,
          }
        };
      }

      // results are visible
      return {
        ...attempt.toObject(),
        answers: answersWithText,
        resultsHidden: false,
        exam: {
          examNumber: attempt.exam ? attempt.exam.examNumber : undefined,
          examTitle: attempt.exam ? attempt.exam.examTitle : undefined,
          visibility: attempt.exam ? attempt.exam.visibility : undefined,
          showResult: true,
        }
      };
    });

    res.json(attempts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all attempts of an exam (for admin)
export async function getExamAttempts(req, res) {
  try {
    const attempts = await ExamAttempt.find({ exam: req.params.examId })
      .populate("student", "name email usn")
      .sort({ createdAt: -1 });
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getExamAttemptsnew(req, res) {
  try {
    const { examId } = req.params; 
    console.log(examId);

    const attempts = await ExamAttempt.find({ exam: examId })
      .populate("student", "_id usn name email contact") // ✅ include student id
      .populate("exam", "title totalMarks")
      .lean();

    console.log("📌 Exam Attempts:");
    attempts.forEach((a, i) => {
      console.log(`\n#${i + 1}`);
      console.log("ExamAttempt ID:", a._id);            // ✅ log exam attempt id
      console.log("Student ID:", a.student ? a.student._id : "❌ No ID");
      console.log("Student:", a.student ? a.student.name : "❌ No Student");
      console.log("USN:", a.student ? a.student.usn : "N/A");
      console.log("Score:", a.score);
      console.log("Percentage:", a.percentage + "%");
    });

   res.json(attempts);
  } catch (error) {
    console.error("❌ Error fetching exam attempts:", error);
    res.status(500).json({ message: "Server error" });
  }
}

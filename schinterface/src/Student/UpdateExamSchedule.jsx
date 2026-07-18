import { useState } from "react";

function CreateExam() {
  const [form, setForm] = useState({
    class: "",
    examName: "",
    exams: [
      {
        subject: "",
        examDate: "",
        time: "",
        duration: "",
      },
    ],
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleExamChange = (index, e) => {
    const updated = [...form.exams];
    updated[index][e.target.name] = e.target.value;

    setForm({
      ...form,
      exams: updated,
    });
  };

  const addSubject = () => {
    setForm({
      ...form,
      exams: [
        ...form.exams,
        {
          subject: "",
          examDate: "",
          time: "",
          duration: "",
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(form);

    // await fetch(...)
  };

  return (
    <div style={{ width: "600px", margin: "30px auto" }}>
      <h2>Create Exam Routine</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="class"
          placeholder="Class"
          value={form.class}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="examName"
          placeholder="Exam Name"
          value={form.examName}
          onChange={handleChange}
        />

        <hr />

        {form.exams.map((exam, index) => (
          <div key={index}>

            <h4>Subject {index + 1}</h4>

            <input
              name="subject"
              placeholder="Subject"
              value={exam.subject}
              onChange={(e) => handleExamChange(index, e)}
            />

            <br /><br />

            <input
              type="date"
              name="examDate"
              value={exam.examDate}
              onChange={(e) => handleExamChange(index, e)}
            />

            <br /><br />

            <input
              type="time"
              name="time"
              value={exam.time}
              onChange={(e) => handleExamChange(index, e)}
            />

            <br /><br />

            <input
              type="number"
              name="duration"
              placeholder="Duration (Minutes)"
              value={exam.duration}
              onChange={(e) => handleExamChange(index, e)}
            />

            <hr />
          </div>
        ))}

        <button type="button" onClick={addSubject}>
          Add Subject
        </button>

        <br /><br />

        <button type="submit">
          Save Exam
        </button>

      </form>
    </div>
  );
}

export default CreateExam;
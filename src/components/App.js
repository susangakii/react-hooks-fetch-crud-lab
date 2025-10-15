import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  //Fetch on Load (GET)
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(r => r.json())
      .then(question => setQuestions(question))
  }, []);

  // DELETE
  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    });
  }

  // PATCH
  function handleUpdateQuestion(updatedQuestion) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  }

  //POST
  function handleAddQuestion(newQuestion) {
  setQuestions((prev) => [...prev, newQuestion]);
}

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm 
      onAddQuestion={handleAddQuestion}
      /> :
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />}
    </main>
  );
}

export default App;

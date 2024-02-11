import React from "react";

export default function Test() {
  const que = [
    {
      question: "What should you do when approaching a school zone?",
      options: [
        "A) Maintain your speed",
        "B) Accelerate to pass through quickly",
        "C) Slow down and watch for children",
        "D) Ignore any signs or signals",
      ],
      correct: 2,
    },
    {
      question: "What is the purpose of using turn signals when driving?",
      options: [
        "A) To indicate your favorite music station",
        "B) To let other drivers know your intentions",
        "C) To alert pedestrians to stay clear",
        "D) To increase fuel efficiency",
      ],
      correct: 1,
    },
    {
      question: "What does a red octagonal sign mean?",
      options: ["A) Yield", "B) Stop", "C) Merge", "D) Caution"],
      correct: 1,
    },
    {
      question:
        "What is the legal blood alcohol concentration (BAC) limit for most adult drivers in most states?",
      options: ["0.08%", "0.10%", "0.05%", "0.15%"],
      correct: 0,
    },
    {
      question: "When is it appropriate to use your high beam headlights?",
      options: [
        "A) When driving in fog or heavy rain",
        "B) When driving in well-lit urban areas",
        "C) When approaching oncoming traffic",
        "D) When driving in rural or unlit areas",
      ],
      correct: 3,
    },
  ];

  return (
    <div className="my-5">
      <h1 className="text-center my-5">Driving License Test</h1>
      {que.map((item, index) => {
        const groupName = `question${index}`;
        return (
          <div className="w-50 m-auto my-5" key={index}>
            <div className="card shadow p-3 mb-5 bg-white rounded w-100">
              <div
                className="card-body w-100"
                
              >
                <h5 className="card-title">Question {index + 1}:</h5>
                <p className="card-text">{item.question}</p>
                {item.options.map((option, optionIndex) => {
                  const optionId = `option_${index}_${optionIndex}`; // Unique id for each radio button
                  return (
                    <div className="form-check" key={optionIndex}>
                      <input
                        
                        className="form-check-input"
                        type="radio"
                        name={groupName}
                        id={optionId} // Use unique id for each radio button
                        defaultValue={optionId}
                      />
                      <label
                        className="form-check-label"
                        style={{ width: "100%" }}
                        htmlFor={optionId}
                      >
                        {option}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
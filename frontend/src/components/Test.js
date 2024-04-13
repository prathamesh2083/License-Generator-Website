// import React from "react";

// export default function Test() {
//   const que = [
//     {
//       question: "What should you do when approaching a school zone?",
//       options: [
//         "A) Maintain your speed",
//         "B) Accelerate to pass through quickly",
//         "C) Slow down and watch for children",
//         "D) Ignore any signs or signals",
//       ],
//       correct: 2,
//     },
//     {
//       question: "What is the purpose of using turn signals when driving?",
//       options: [
//         "A) To indicate your favorite music station",
//         "B) To let other drivers know your intentions",
//         "C) To alert pedestrians to stay clear",
//         "D) To increase fuel efficiency",
//       ],
//       correct: 1,
//     },
//     {
//       question: "What does a red octagonal sign mean?",
//       options: ["A) Yield", "B) Stop", "C) Merge", "D) Caution"],
//       correct: 1,
//     },
//     {
//       question:
//         "What is the legal blood alcohol concentration (BAC) limit for most adult drivers in most states?",
//       options: ["0.08%", "0.10%", "0.05%", "0.15%"],
//       correct: 0,
//     },
//     {
//       question: "When is it appropriate to use your high beam headlights?",
//       options: [
//         "A) When driving in fog or heavy rain",
//         "B) When driving in well-lit urban areas",
//         "C) When approaching oncoming traffic",
//         "D) When driving in rural or unlit areas",
//       ],
//       correct: 3,
//     },
//   ];

//   return (
//     <div class="my-5 bg-yellow ">
//       <h1 className="text-center my-5  "  >Driving License Test</h1>
//       {que.map((item, index) => {
//         const groupName = `question${index}`;
//         return (
//           <div className="w-50 m-auto my-5" key={index}>
//             <div className="card shadow p-3 mb-5 bg-white rounded w-100">
//               <div
//                 className="card-body w-100"
                
//               >
//                 <h5 className="card-title">Question {index + 1}:</h5>
//                 <p className="card-text">{item.question}</p>
//                 {item.options.map((option, optionIndex) => {
//                   const optionId = `option_${index}_${optionIndex}`; // Unique id for each radio button
//                   return (
//                     <div className="form-check" key={optionIndex}>
//                       <input
                        
//                         className="form-check-input"
//                         type="radio"
//                         name={groupName}
//                         id={optionId} // Use unique id for each radio button
//                         defaultValue={optionId}
//                       />
//                       <label
//                         className="form-check-label"
//                         style={{ width: "100%" }}
//                         htmlFor={optionId}
//                       >
//                         {option}
//                       </label>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Test() {
const Navigate = useNavigate();
  const {User,setUser,validLicense,setvalidLicense}=useContext(AuthContext);
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

  // const userans= [-1,-1,-1,-1,-1];
  const [userans, setuserans] = useState([-1, -1, -1, -1, -1]);
  const [result,setresult]=useState(null);
  function handlechange(event) {
    let index = parseInt(event.target.dataset.question_no);
    let val = parseInt(event.target.dataset.ans_selected);

    setuserans((prev) => {
      const updatedUserAns = [...prev];
      updatedUserAns[index] = val;
      return updatedUserAns;
    });
  }

  const handleSubmit= async (event)=> {
    event.preventDefault();
    let attempted = 0;
    let correct = 0;
    que.map((item, index) => {
      if (userans[index] != -1) {
        if (userans[index] == item.correct) correct++;
        attempted++;
      }
    });

    const message = `Test submitted successfully.\n
        Attempted Questions: ${attempted}\n
        Correct Answer: ${correct}\n
        Incorrect Answer: ${attempted - correct}`;

    // alert(message);
    const marks=correct*100/que.length;
    setresult(marks);
    
   
    try{
      console.log("test ",User.email);
           const response = await fetch("/v1/checkResult", {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
               correct,
               attempted,
               total: que.length,
               percentage: marks,
               email: User.email,
             }),
           })
             .then((res) => res.json())
             .then((res) => {
               if (res.success === true) {
                 
                 toast.success(res.message, {
                   duration: 1400,
                 });
                 if(res.data.status===true){
                        setvalidLicense(true);
                        console.log("after test : ",User);
                        Navigate("/Certificate");
                 }
               
                 
               } else {
                 
                 toast.error(res.message);
               }
             })
             .catch((err) => {
               console.log(err);
             });
           
    }
    catch(err){
      console.log("error in checking result ");
      console.log(err);
      
    }
    
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit}>
    <Toaster>
          {(t) => (
            <ToastBar
              toast={t}
              style={{
                ...t.style,
                animation: t.visible
                  ? "custom-enter 1s ease"
                  : "custom-exit 1s ease",
              }}
            />
          )}
        </Toaster>
      <div className="my-5">
        <h1 className="text-center my-5">Driving License Test</h1>
        {que.map((item, index) => {
          const groupName = `question${index}`;
          return (
            <div className="w-50 m-auto my-5 " key={index}>
              <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                  <h5 className="card-title">Question {index + 1}:</h5>
                  <p className="card-text">{item.question}</p>
                  {item.options.map((option, optionIndex) => {
                    const optionId = `option_${index}_${optionIndex}`; // Unique id for each radio button
                    return (
                      <div className="form-check" key={optionIndex} >
                        <input
                          className="form-check-input"
                          type="radio"
                          style={{padding:0}}
                          name={groupName}
                          id={optionId} // Use unique id for each radio button
                          onChange={(event) => handlechange(event)}
                          //whenever you want to create a custom attribute you have start with data-attributeName
                          //and if you want to use it event.target.dataset.attributeName
                          data-question_no={index}
                          data-ans_selected={optionIndex}
                        />
                        <label className="form-check-label" style={{width:"100%",paddingTop:0 ,display:"flex",alignItems:"start",justifyItems:"start"}} htmlFor={optionId}>
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
        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>{" "}
    </form>
  );
}
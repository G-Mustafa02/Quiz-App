




// import { useEffect, useState, useRef } from "react";

// function App() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [questionNum, setQuestionNum] = useState(1);
//   const [arr, setArr] = useState([]);
//   const [marks, setMarks] = useState(0);
//   const checkedInput = useRef([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch("https://the-trivia-api.com/v2/questions");
//         const data = await response.json();
//         setData(data);
//         console.log(data);
        
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (data && questionNum <= data.length) {
//       const currentQuestion = data[questionNum - 1];
//       const options = [...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer];
//       options.sort(() => Math.random() - 0.5); // Randomize options
//       setArr(options);
//     }
//   }, [questionNum, data]);

//   function countQuestion() {
//     const checkedButton = checkedInput.current.find((input) => input?.checked);
//     if (checkedButton) {
//       const selectedValue = checkedButton.value;
//       if (selectedValue === data[questionNum - 1].correctAnswer) {
//         setMarks((prevMarks) => prevMarks + 10);
//       }
//     }

//     if (questionNum >= 10) {
//       alert(`Game Over! Your Final Score: ${marks}`);
//     } else {
//       setQuestionNum((prev) => prev + 1);
//     }
//   }

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h2 style={styles.score}>Score: {marks}</h2>
//       </div>

//       {loading ? (
//         <h1 style={styles.loading}>Loading...</h1>
//       ) : (
//         <div style={styles.questionContainer}>
//           <p style={styles.questionText}>
//             {questionNum}. {data[questionNum - 1].question.text}
//           </p>
//           <div style={styles.optionsContainer}>
//             {arr.map((res, index) => (
//               <div key={index} style={styles.option}>
//                 <input
//                   type="radio"
//                   value={res}
//                   ref={(el) => (checkedInput.current[index] = el)}
//                   name="questionS"
//                   id={`question${index}`}
//                   style={styles.radioInput}
//                 />
//                 <label htmlFor={`question${index}`} style={styles.optionLabel}>
//                   {res}
//                 </label>
//               </div>
//             ))}
//           </div>
//           <button onClick={countQuestion} style={styles.nextButton}>
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// // Styles
// const styles = {
//   container: {
//     fontFamily: "Arial, sans-serif",
//     backgroundColor: "#f4f4f9",
//     minHeight: "100vh",
//     padding: "20px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     width: "100%",
//     maxWidth: "600px",
//     marginBottom: "20px",
//   },
//   score: {
//     fontSize: "18px",
//     color: "#4CAF50",
//   },
//   loading: {
//     color: "#333",
//     textAlign: "center",
//   },
//   questionContainer: {
//     backgroundColor: "#fff",
//     borderRadius: "10px",
//     padding: "20px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//     maxWidth: "600px",
//   },
//   questionText: {
//     fontSize: "20px",
//     color: "#333",
//     marginBottom: "20px",
//   },
//   optionsContainer: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//   },
//   option: {
//     display: "flex",
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//     padding: "10px",
//     borderRadius: "5px",
//     border: "1px solid #ddd",
//   },
//   radioInput: {
//     marginRight: "10px",
//   },
//   optionLabel: {
//     fontSize: "16px",
//     color: "#333",
//   },
//   nextButton: {
//     backgroundColor: "#4CAF50",
//     color: "#fff",
//     border: "none",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "16px",
//     marginTop: "20px",
//     width: "100%",
//     transition: "background-color 0.3s ease",
//   },
// };













import React from 'react'
import { useEffect, useState, useRef} from 'react'

function App() {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)
  const [questionNum, setQuestionNum] = useState(1);
  const [arr, setArr] = useState([]);
  const [marks, setMarks] = useState(0);
  const checkedInput = useRef([]);


    useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://the-trivia-api.com/v2/questions");
        const data = await response.json();
        setData(data);
        console.log(data);
        
      } catch (error) {
        console.log(error);
        setError(true)
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);




    useEffect(() => {
    if (data && questionNum <= data.length) {
      const currentQuestion = data[questionNum - 1];
      const options = [...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer];
      options.sort(() => Math.random() - 0.5); // Randomize options
      setArr(options);
    }
  }, [questionNum, data]);



  function countQuestion() {
         const checkedButton = checkedInput.current.find((input) => input?.checked);
         if (checkedButton) {
           const selectedValue = checkedButton.value;
           if (selectedValue === data[questionNum - 1].correctAnswer) {
             setMarks((prevMarks) => prevMarks + 10);
           }
         }
    
         if (questionNum >= 10) {
           alert(`Game Over! Your Final Score: ${marks}`);
         } else {
           setQuestionNum((prev) => prev + 1);
         }
       }



  return (
    <div>
      <div className='wrapper'>
       {loading && <h3>Loading...</h3>}
       {error && <h3>Error occured</h3>}
       {data && 
        <div className='quizContainer'> 
          <p>
             {questionNum}. {data[questionNum - 1].question.text}
           </p>
        <div>
             {arr.map((res, index) => (
               <div key={index} >
                 <input  style={{height:'20px', width:'20px', marginRight: '20px'}}
                   type="radio"
                   value={res}
                   ref={(el) => (checkedInput.current[index] = el)}
                   name="questionS"
                   id={`question${index}`}
                  //  style={styles.radioInput}
                 />
                 <label htmlFor={`question${index}`}>
                   {res}
                 </label>
               </div>
             ))}
             <button className='nextButton' onClick={countQuestion}>
             Next
           </button>
           </div>

        </div>}
     </div>
    </div>
  )
}

export default App

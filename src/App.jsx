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

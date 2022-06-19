// console.log(performance.now())

// async function getQuizzes(url)
// {
// 	let quizzes=await fetch(url).then(response => response )
// 	let	quizzesData=await quizzes.json();
// 	return quizzesData;
// }

// let quizzes;

// getQuizzes('quizzes.json').then((data)=> 
// {	
// 	quizzes = data;
// })


export default getQuizzes = async () =>
{
	let quizzes=await fetch('quizzes.json').then(response => response )
	let	quizzesData=await quizzes.json();
	return quizzesData;
};



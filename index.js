var it=0,results=[];
let quizzes,quizzesLength;

// Function to get All Quiz
async function getQuizzes(url)
{
	let quizzes=await fetch(url).then(response => response )
	let	quizzesData=await quizzes.json();
	return quizzesData;
}

getQuizzes('quizzes.json').then((data)=> 
{	
	// Quiz 1 => Variable
	quizzes = data['Quiz 1']
	quizzesLength = quizzes.length  
})


// Visibilitychange
document.addEventListener("visibilitychange", function() 
{
	if (document.visibilityState != 'visible') 
	{
		generateResult();  // i call this function to restart this Quiz 
	}
});

// All the events are click Type
window.addEventListener('click',function(event)
{
	switch(event.target.classList.value || event.target.id)
	{
		case 'btnStart':
			event.target.remove();
			createSingleQuiz();
			break;
		case 'next-quiz':
			let val=checkedValue(event.target.previousElementSibling) || false;
			if(val)
			{
				if(it < quizzesLength-1)
				{		
					results.push(val)
					it++;
					createSingleQuiz();	
				}		
				else if(it == quizzesLength-1)
				{
					results.push(val)
					generateResult(showResult)
					it++;
				}
			}
			else
			{
				genereatePopUp('vous devez selectionnez un element');
				timerPopup('remove',null,'.popUpMessage',1500);
			}
			break;
	}
})

// Create a Single Quiz 
function createSingleQuiz()
{
	console.log(it);
	let div=
		`	
			<div class="quiz-box">
				<h3 class="quiz-question">${quizzes[it].question}</h3>
				<div class="list-quiz">
					${generateResponses(quizzes[it].responses)}
				</div>
				<button class="next-quiz"> Next </button>
			</div>
		`
	document.querySelector('#app').innerHTML=div;
}

// Generate a Answers of a each Quiz
function generateResponses(list) 
{
	var result='',
		quizIndex='quiz'+it;
	if(Array.isArray(list))
	{
		list.forEach((item)=>
		{
			let inputWithLabel=
				`
					<label><input type="radio" name="${quizIndex}" value="${item}"><span>${item}</span></label>
				`
			result+=inputWithLabel;
		})
	}
	return result;
}

// Verify if the quiz has a checked value
function checkedValue(element) 
{  
	var container=Array.from(element.children);
	var ret;
	container.forEach((item)=>
	{
		if(item.children[0].nodeName =='INPUT' && item.children[0].checked)
		{	
			ret=item.children[0].value;
		}	
	})

	return ret;
}

// Function to generate result
function generateResult(showRes=null)
{
	if(showRes === null )
	{
		window.location.reload();
		return;
	}

	let res=0,resultsHistory=[]

	quizzes.forEach((item,index)=>
	{
		let obj={question:item.question}

		if(results[index] == item.responses[item.responseIndex])
		{
			obj.answer=true;
			res++;
		}
		else
		{
			obj.answer=false;
		}
		resultsHistory.push(obj);
	})
	showRes(res,resultsHistory,generateClass);
}

// Show The Result When The user is finished
function showResult(res,resultsHistory,classGen) 
{
	let result='';
	resultsHistory.forEach((item)=>
	{
		let resultSingle=
			`
				<div class='${(classGen(item.answer))}'><span>${item.question}</span></div>
			`
		result+=resultSingle;
	})
	// document.querySelector('#app').innerHTML= res + '/' + quizzesLength;
	document.querySelector('#app').innerHTML=result
	document.querySelector('#app').style.flexDirection='column'
}

// Function to return className 
function generateClass(stateOfAnswer)
{
	return (stateOfAnswer)?'success':'failed';
}

// Function to generate PopUp 
function genereatePopUp(message,time=null)
{
	const popUp=document.createElement('div');
	Object.assign(popUp,
		{
			innerHTML:`<span>${message}<span>`,
			classList:'popUpMessage'
		})
	timerPopup('append',popUp,0);
}

// Show or hide PopUp After Event Triggered By User 
function timerPopup(action,node=null,classN=null,time)
{
	setTimeout(() =>
	{
		(action == "append" )?document.body.appendChild(node):document.querySelector(classN).remove();
	},time)
}



// Features
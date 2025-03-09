let btn=document.querySelector("#ib")
let int=document.querySelector('#ipt')
let main=document.querySelector('.main')
let del=document.querySelector("#del")
let bot=document.querySelector(".bot")
let lt=document.querySelector("#lt")
let items=document.querySelectorAll(".item")
let file=document.querySelector("#file")
let atch=document.querySelector("#pc")
let atfl=document.querySelector("#atfl")

// Function to enable/disable the button based on input value
function onof() {
    if (int.value === "") {
        btn.disabled = true; // Disable the button if the input is empty
    } else {
        btn.disabled = false; // Enable the button if the input has a value
    }
}

// Initial check to set the button state
onof();

int.addEventListener('input', onof);
// let abortController = null; // Declare the AbortController instance

// let crt=()=>{
//     onof()
//         main.style.display='none' 
//         if(btn.textContent=="send"){
//             usermessage = int.value; // Set the user message to the input value
//             updateUserMessage(usermessage);
//            // Update the user message in the DOM
//             chatbot()
//             btn.textContent='stop_Circle';
          
//         } else{ 
//             btn.textContent = "send"; 
//             if (abortController) {
//                 abortController.abort(); // Abort the ongoing fetch request
//                 abortController = null; // Reset the AbortController instance
//             }
//             console.log("hello") 
//         }
// }


let abortController = null; // Declare the AbortController instance
let typingTimeout = null; // Declare a variable to store the typing timeout
let isTyping = false; // Flag to check if typing is in progress

let crt = () => {
    onof(); // Enable/disable the button based on input value
    main.style.display = 'none'; // Hide the main element

    if (btn.textContent === "send") {
        // If the button is in "send" mode
        usermessage = int.value; // Set the user message to the input value
        updateUserMessage(usermessage); // Update the user message in the DOM
        btn.textContent = 'stop_Circle'; // Change button text to "stop_Circle"
        chatbot(); // Start the chatbot
    } else {
        // If the button is in "stop_Circle" mode
        btn.textContent = "send"; // Change button text back to "send"
        if (abortController) {
            abortController.abort(); // Abort the ongoing fetch request
            abortController = null; // Reset the AbortController instance
        }
        if (typingTimeout) {
            clearTimeout(typingTimeout); // Stop the typing effect
            isTyping = false; // Set the typing flag to false
        }
        console.log("Conversation stopped"); // Log the stop action
    }
};

btn.addEventListener("click",()=>{
    crt() 
})

del.addEventListener("click",()=>{
    main.style.display='block'   
    // bot.style.display='none'  
    bot.innerHTML="" 
})

// function tgl() {
//     if (btn.textContent === "send") {
//         btn.textContent = 'stop_Circle';
//         // Start the chatbot conversation
//         chatbot();
//     } else {
//         btn.textContent = "send";
//         // Stop the chatbot conversation
//         if (abortController) {
//             abortController.abort(); // Abort the ongoing fetch request
//             abortController = null; // Reset the AbortController instance
//         }
//         console.log("Conversation stopped");
//     }
// }




const chathistory=[]
let usermessage=""
const key=`AIzaSyD3oiT6G8Egi1VF0GxAk6xbKYVhuneJWis`
const api=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;


// Function to handle item clicks
items.forEach(item => {
    item.addEventListener("click", () => {
        main.style.display = 'none'; // Hide the main element
        let p = item.getElementsByTagName('p')[0]; // Get the <p> element inside the clicked item
        usermessage = p.textContent; // Set the user message
        console.log("User message:", usermessage);
        // Update the user message in the DOM
        updateUserMessage(usermessage);
        // tgl()
        // crt()
        chatbot(); // Call the chatbot function
    });
});



// Function to update the user message in the DOM
function updateUserMessage(message) {
   let  usrm = document.createElement('div'); // Create the element if it doesn't exist
        usrm.className = "usrm";
        bot.appendChild(usrm);
    usrm.textContent = message; // Set the text content
}

async function chatbot() {

    int.value='';
    let botm = document.createElement('div');
    botm.id = "botm";
    bot.appendChild(botm);
    botm.innerHTML = `<div id="lg"><img src="download.svg" alt=""></div><div>Just a sec...</div>`;

    let botms=document.createElement('div')
    botms.id="botms"
    bot.appendChild(botms)

    chathistory.push({
        role:"user",
        parts:[{text:usermessage}]
    })
    abortController = new AbortController(); // Create a new AbortController instance


    try {
       
        const response= await fetch(api,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({contents:chathistory}),
            signal: abortController.signal // Pass the signal to the fetch request

        })
    
    botm.style.display='none'
     const data= await response.json()
    console.log(data)

    const textrs=data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
        // console.log(textrs)
            
             // Split the text into lines
        const lines = textrs.split('\n');
        // Simulate typing effect for bot respohdles

        let formattedText = '';

        lines.forEach(line => {
            // Escape HTML characters in the line
            const escapedLine = escapeHTML(line);
        
            if (escapedLine.startsWith('*')) {
                // Remove the * symbol and wrap the line in <li> tags
                formattedText += `<li>${escapedLine.substring(1).trim()}</li>`;
            } else if (escapedLine.trim() !== "") {
                // Wrap other non-empty lines in <p> tags
                formattedText += `<p>${escapedLine.trim()}</p>`;
            } else if (escapedLine.startsWith('&lt;')) {
                // If the line starts with an escaped '<' character, add it as-is
                formattedText +=`<pre><code class="language-html"  >${escapedLine}</code></pre>`;               
            }
        });
    

// Function to escape HTML characters
function escapeHTML(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
}

        // Add typing effect to the bot's response
        // botms.innerHTML = `<div id="log"><img src="gemini.png" alt=""></div>`;
        const responseText = formattedText; // Store the formatted text

        let index = 0;
        const typingSpeed = 1; // Adjust typing speed (milliseconds per character)

        function typeText() {
            if (index < responseText.length && isTyping) {
                // Append one character at a time to the botms div
                botms.innerHTML = `<div id="log"><img src="download.svg" alt=""></div>${responseText.substring(0, index + 1)}`;
                index++;
              typingTimeout=  setTimeout(typeText, typingSpeed);
            } else{
                Prism.highlightAll();
            }
        }
        isTyping = true;

        // Start the typing effect
        typeText();
    } 
    catch (error) {
        console.log("error", error)
    }
 
}


lt.addEventListener("click",()=>{
    let thm= document.body.classList.toggle("light-theme")
    localStorage.setItem("themeColor",thm ? "light_mode": "dark_mode")
  lt.textContent=thm ? "dark_mode": "light_mode";
  })

  
  let thm = localStorage.getItem("themeColor") === "light_mode";
  document.body.classList.toggle("light-theme", thm);
  lt.textContent = thm ? "dark_mode" : "light_mode";
  
atfl.addEventListener("change",()=>{
    let fl=atfl.files[0]
    const reader=new FileReader();
    reader.readAsDataURL(fl);
    console.log(fl)
})


file.addEventListener("click",()=>{
atfl.click()
})
































// async function chatbot() {
//     let usrm = document.createElement('div');
//     usrm.className = "usrm";
//     bot.appendChild(usrm);
//     usrm.innerHTML = int.value;
//     usermessage = usrm.textContent;

//     let botm = document.createElement('div');
//     botm.id = "botm";
//     bot.appendChild(botm);
//     botm.innerHTML = `<div id="lg"><img src="gemini.png" alt=""></div><div>Just a sec...</div>`;

//     chathistory.push({
//         role: "user",
//         parts: [{ text: usermessage }]
//     });

//     let botms = document.createElement('div');
//     botms.id = "botms";
//     bot.appendChild(botms);


//     try {
//         const response = await fetch(api, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ contents: chathistory })
//         });
 
//     botm.style.display='none'


//         const data = await response.json();
//         console.log(data);

//         const textrs = data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
//         console.log(textrs);

//         // Split the text into lines
//         const lines = textrs.split('\n');

//         // Process each line and wrap it in the appropriate HTML tag
//         let formattedText = '';
//         lines.forEach(line => {
//             if (line.startsWith('*')) {
//                 // Remove the * symbol and wrap the line in <li> tags
//                 formattedText += `<li>${line.substring(1).trim()}</li>`;
//             } else if (line.trim() !== "") {
//                 // Wrap other non-empty lines in <p> tags
//                 formattedText += `<p>${line.trim()}</p>`;
//             }
//         });

//         // Set the formatted text inside the botms div
//         botms.innerHTML =`<div id="log"><img src="gemini.png" alt=""></div> ${formattedText}` ;
//     } catch (error) {
//         console.log("error", error);
//     }
// }
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const sound = document.getElementById("sound");

const btn = document.getElementById("search-btn");

btn.addEventListener("click", ()=>{

    let inpWord = document.getElementById("input__word").value;

    fetch(`${url}${inpWord}`)
    .then((res)=>{
       const respuesta  =  res.json();

       return respuesta
    })
    .then((data)=>{
        console.log(data)
        result.innerHTML=`
        <div class="word">
        <h3>${data[0].word}</h3>
        <button onclick="playSound()">
            <i class="fas fa-volume-up"></i>
        </button>
    </div>
    <div class="details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p>/${data[0].phonetic}/</p>
    </div>
    <p class="word__meaning">
       ${data[0].meanings[0].definitions[0].definition}
    </p>
    <p class="word__example">
     ${data[0].meanings[0].definitions[0].example || ""}
    </p>
        `;

        sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
    })
    .catch(()=>{
        result.innerHTML = ` <h3>Lo siento no pudimos encontrar la palabra</h3>`
    })
   


})

function playSound(){
    sound.play()
}

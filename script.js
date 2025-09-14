function login() {
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    const error = document.getElementById('error');
    // Hartkodierte Login-Daten
    const accounts = {
        "Lennox": "GPT",
        "Leo": "GPT",
        "Maximilian": "GPT",
        "Nayo": "GPT",
        "Simon": "GPT"        
    };
    if (accounts[user] && accounts[user] === pass) {
        document.getElementById('login-overlay').style.display = 'none';
    } else {
        error.style.display = 'block';
    }
}

// Enter-Taste im Passwortfeld erlaubt Login
document.addEventListener("DOMContentLoaded", () => {
    const passField = document.getElementById("login-pass");
    passField.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            login();
        }
    });
});

// Begrüßung bei Start des Chats hinzufügen
window.addEventListener("DOMContentLoaded", () => {
  addMessage(greeting(), "frank");
});

// Begrüßungslogik
function greeting() {
  const now = new Date();
  const hour = now.getHours();

  const generalPhrases = [
    ". Bist du heute wenigstens halbwegs vorbereitet?",
    ". Du schon wieder? Ich dachte, du lässt mich mal wenigstens einen Tag im Jahr in Ruhe.",
    ". Ich hoffe, du hast dir den Hefteintrag der letzten Stunde gut durchgelesen.",
    ". Ich erwarte heute mehr Verstand als gestern.",
    ". Willst du dich heute auch mal melden?",
    ". Ich dachte, du wärst heute krank gemeldet. Tja, da hab’ ich mich wohl leider verlesen.",
    ". Normalerweise schließt derjenige die Tür, der als letztes den Raum betritt.",
  ];
  const morningPhrases = [
    ". Ausgeschlafen siehst du nicht gerade aus",
    ", wer hat sich denn da aus dem Bett gequält?",
    ", du bist auch mal wach geworden? Ich dachte schon, ich müsse dich persönlich abholen."
  ];
  const noonPhrases = [
    ". Ich hoffe, du hast einen triftigen Grund für dein Zuspätkommen.",
    ". Hast du den Bus schon wieder verpasst?"
  ];
  const eveningPhrases = [
    ", da bist du endlich. Ich warte schon den halben Tag auf dich, aber pünktlich warst du ja noch nie.",
    ". Ich bin zwar noch da, aber erwarte ja keine Freundlichkeit mehr um diese Uhrzeit.",
    ". Eigentlich ist mein Arbeitstag vorbei, aber was tut man nicht alles für die nächste Generation..."
  ];
  const nightPhrases = [
    "Was genau hast du um diese Uhrzeit noch hier verloren?",
    "Was um alles in der Welt machst du um diese Uhrzeit noch hier?",
    "Ich hoffe, du hast einen wirklich guten Grund, um zu dieser Uhrzeit noch hier zu erscheinen.",
    "Nachtschicht? Das wird ja ein Spaß."
  ];

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

  if (hour >= 5 && hour < 12) {
    const combinedPhrases = generalPhrases.concat(morningPhrases);
    return "Guten Morgen" + random(combinedPhrases);
  } else if (hour >= 12 && hour < 18) {
    const combinedPhrases = generalPhrases.concat(noonPhrases);
    return "Guten Tag" + random(combinedPhrases);
  } else if (hour >= 18 && hour < 22) {
    return "Guten Abend" + random(eveningPhrases);
  } else {
    return random(nightPhrases);
  }
}

document.getElementById("input").addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();  // verhindert den Zeilenumbruch bei einfachem Enter
    sendMessage();
  }
});

let lastFrankReply = null;

function sendMessage() {
  const inputField = document.getElementById("input");
  const userInput = inputField.value.trim();
  if (userInput === "") return;
  inputField.value = "";

  addMessage(userInput, "user");

  const frankReply = generateFrankResponse(userInput);

  let i = 0;

  // Tippverzögerung basierend auf Zeichenart bestimmen
  function getDelayForChar(char) {
    if ([".", "!", "?", "\n"].includes(char)) {
      return 220 + Math.random() * 180;
    } else if ([",", "–"].includes(char)) {
      return 80 + Math.random() * 40;
    } else {
      return 30 + Math.random() * 10;
    }
  }

  function typeNextChar() {
    if (i < frankReply.length) {
      if (i === 0) {
        const placeholder = document.createElement("div");
        placeholder.classList.add("message", "frank");
        document.getElementById("chat-container").appendChild(placeholder);
        placeholder.scrollIntoView({ behavior: "smooth" });
        typeNextChar.placeholder = placeholder;
      }

      typeNextChar.placeholder.textContent += frankReply[i];
      const delay = getDelayForChar(frankReply[i]);
      i++;
      setTimeout(typeNextChar, delay);
    }
  }

  const delay = 800 + Math.random() * 800;
  setTimeout(typeNextChar, delay);
}

function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = text;
  document.getElementById("chat-container").appendChild(messageDiv);
  messageDiv.scrollIntoView({ behavior: "smooth" });
}

// Text normalisieren
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/\s+/g, " ");
}

function generateFrankResponse(userInput) {
  const userInputLower = normalizeText(userInput);

  // Greeting-Logik auch bei Nutzerbegrüßungen anwenden
  if (/(guten\s+(morgen|tag|vormittag|mittag|nachmittag|abend)|gute\s+nacht|gruess\s+gott|willkommen)/.test(userInputLower)) {
    const response = greeting();
    lastFrankReply = response;
    return response;
  }

  const isExplanation = ["erklären sie", "erzählen sie", "was passierte", "was bedeutet"].some(p => userInputLower.includes(p));
  const isOpinion = [" finde", " denke", " glaube", "meiner meinung nach "].some(p => userInputLower.includes(p));
  const isQuestion = userInput.trim().endsWith("?");

  let response = null;

  function getRandom(arr) {
    if (arr.length === 1) return arr[0];
    let tries = 0;
    let chosen;
    do {
      chosen = arr[Math.floor(Math.random() * arr.length)];
      tries++;
    } while (chosen === lastFrankReply && tries < 10);
    return chosen;
  }

  function searchBlock(type) {
    for (const block of data) {
      if (block.type === type) {
        for (const entry of block.entries) {
          if (entry.trigger_groups && entry.trigger_groups.length) {
            for (const group of entry.trigger_groups) {
              if (group.every(trigger => userInputLower.includes(trigger))) {
                const chosen = getRandom(entry.responses || ["..."]);
                lastFrankReply = chosen;
                return chosen;
              }
            }
          } else {
            const triggers = entry.trigger || [];
            const matchAll = entry.match_all || false;
            if (
              (matchAll && triggers.every(t => userInputLower.includes(t))) ||
              (!matchAll && triggers.some(t => userInputLower.includes(t)))
            ) {
              const chosen = getRandom(entry.responses || ["..."]);
              lastFrankReply = chosen;
              return chosen;
            }
          }
        }
      }
    }
    return null;
  }

  function fallbackResponse(type) {
    for (const block of data) {
      if (block.type === type) {
        for (const entry of block.entries) {
          if (entry.is_fallback) {
            const chosen = getRandom(entry.responses || ["..."]);
            lastFrankReply = chosen;
            return chosen;
          }
        }
      }
    }
    return null;
  }

  response = searchBlock("universal");
  if (typeof response === "string" && response.trim() !== "") {
    lastFrankReply = response;
    return response;
  }

  if (isQuestion) {
    response = searchBlock("question");
    if (!(typeof response === "string" && response.trim() !== "")) response = searchBlock("reaction");
    if (!(typeof response === "string" && response.trim() !== "")) response = fallbackResponse("question");
    if (!(typeof response === "string" && response.trim() !== "")) response = fallbackResponse("reaction");
  } else if (isOpinion) {
    response = searchBlock("opinion");
    if (!(typeof response === "string" && response.trim() !== "")) response = searchBlock("reaction");
    if (!(typeof response === "string" && response.trim() !== "")) response = fallbackResponse("opinion");
    if (!(typeof response === "string" && response.trim() !== "")) response = fallbackResponse("reaction");
  } else if (isExplanation) {
    response = searchBlock("explanation");
    if (!(typeof response === "string" && response.trim() !== "")) response = searchBlock("reaction");
    if (!(typeof response === "string" && response.trim() !== "")) response = fallbackResponse("explanation");
    if (!(typeof response === "string" && response.trim() !== "")) response = fallbackResponse("reaction");
  } else {
    response = searchBlock("reaction");
    if (!(typeof response === "string" && response.trim() !== "")) response = fallbackResponse("reaction");
  }

  if (typeof response === "string" && response.trim() !== "") {
    lastFrankReply = response;
    return response;
  }

const simpleWords = ["ja", "ok", "verstehe", "gut", "stimmt", "nein", "ne", "hm", "vielleicht", "achso"];
if (userInput.split(" ").length === 1 && simpleWords.includes(userInputLower)) {
  const oneWordMessagePool = [
    "Versuchst du, mit diesen halbherzigen Ein-Wort-Sätzen Jonathan nachzuahmen?",
    "Ein Wort? Mehr krieg ich heute nicht? Wie großzügig.",
    "Wenn das alles ist, was du zu bieten hast, müssen wir wohl dringend an deinem Wortschatz arbeiten."
  ];
  const response = getRandom(oneWordMessagePool);
  lastFrankReply = response;
  return response;
} else if (userInput.length <= 10) {
  const shortMessagePool = [
    "Hat man dir nie beigebracht, vollständige Sätze zu bilden? Oder war das schon zu viel verlangt?",
    "Du darfst gerne mehr schreiben. Es kostet dich nichts.",
    "Du tippst ja genau so brüchig wie die ersten Computer in der DDR!",
    "Ein Satz besteht in der Regel aus Subjekt, Prädikat und Objekt. Nur falls du in der Grundschule nicht aufgepasst hast.",
    "Ich unterrichte Deutsch, keine Hieroglyphen. Wir sind hier schließlich nicht im alten Ägypten.",
    "Du scheinst der deutschen Sprache nicht wirklich mächtig zu sein.",
    "Du und die deutsche Sprache – das wirkt wie ein sehr loses Verhältnis."
  ];
  let first = getRandom(shortMessagePool);
  let second = getRandom(shortMessagePool);
  while (second === first && shortMessagePool.length > 1) {
    second = getRandom(shortMessagePool);
  }
  const response = first + " " + second;
  lastFrankReply = response;
  return response;
} else if (userInput.length > 80) {
  const longMessagePool = [
    "Keinen Grund, mir einen ganzen Vortrag zu halten.",
    "Ich werde nicht dafür bezahlt, mir deine ganze Lebensgeschichte anzuhören. Mach’s gerne kurz und schmerzlos."
  ];
  const response = getRandom(longMessagePool);
  lastFrankReply = response;
  return response;
}

  const lastFallback = getRandom([
    "Was das sein soll, weiß ich nicht – und ganz ehrlich: Ich will es wahrscheinlich auch gar nicht wissen.",
    "Ich kann dir nicht helfen, wenn du mit Begriffen um dich wirfst, die nicht mal der Duden versteht.",
    "Ich hab Besseres zu tun, als dir und deinen Märchengeschichten zuzuhören."
  ]);
  lastFrankReply = lastFallback;
  return lastFallback;
}

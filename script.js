function login() {
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    const error = document.getElementById('error');
    // Hartkodierte Login-Daten
    const accounts = {
        "Leo": "FrankTheTank_DDR",
        "Maximilian": "FrankGPT",
        "Simon": "S0zialis1ico4418!"
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
    ". Ich dachte, du wärst heute krank gemeldet. Tja, da hab’ ich mich wohl leider verlesen.",
    ". Ich erwarte heute mehr Verstand als gestern.",
    ". Ich hoffe, du hast dir den Hefteintrag der letzten Stunde gut durchgelesen.",
    ". Normalerweise schließt derjenige die Tür, der als letztes den Raum betritt.",
    ". Vielleicht nutzen wir ihn diesmal sinnvoll.",
    ". Willst du dich heute auch mal melden?"
  ];
  const morningPhrases = [
    ". Ausgeschlafen siehst du nicht gerade aus.",
    ", du bist auch mal wach geworden? Ich dachte schon, ich müsse dich persönlich abholen.",
    ", wer hat sich denn da aus dem Bett gequält?"
  ];
  const noonPhrases = [
    ". Hast du schon wieder den Bus verpasst?",
    ". Ich hoffe, du hast einen triftigen Grund für dein Zuspätkommen."
  ];
  const eveningPhrases = [
    ", da bist du endlich. Ich warte schon den halben Tag auf dich, aber pünktlich warst du ja noch nie.",
    ". Eigentlich ist mein Arbeitstag vorbei, aber was tut man nicht alles für die nächste Generation...",
    ". Ich bin zwar noch da, aber erwarte ja keine Freundlichkeit mehr um diese Uhrzeit."
  ];
  const nightPhrases = [
    "Ich hoffe, du hast einen wirklich guten Grund, um zu dieser Uhrzeit noch hier zu erscheinen.",
    "Nachtschicht? Das wird ja ein Spaß.",
    "Was genau hast du um diese Uhrzeit noch hier verloren?",
    "Was treibt dich um diese Uhrzeit noch vor den Bildschirm?",
    "Was um alles in der Welt machst du um diese Uhrzeit noch hier?"
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
    if ([".","!","?","\n"].includes(char)) {
      return 220 + Math.random() * 180;
    } else if ([",","–"].includes(char)) {
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
        placeholder.textContent = "\u200B";
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
    .replace(/\s+/g , " ")
    .replace(/[,.;:!-]/g, "");
}

function generateFrankResponse(userInput) {
  const userInputLower = normalizeText(userInput);

  // Letzte Nachricht wiederholen
  if (/(erneut sagen\??|nochmal sagen\??|sie gesagt\??|wie bitte\??|wiederholen\??)/.test(userInputLower)) {
    if (lastFrankReply) {
      const reply = "Ich sagte: " + lastFrankReply;
      return reply;
    } else {
      const reply = "Du hast mich genauestens verstanden.";
      return reply;
    }
  }

  // Begrüßungslogik auch bei Nutzerbegrüßungen anwenden
  if (/(guten\s+(abend|mittag|morgen|nachmittag|vormittag|tag)|gruess\s+gott|gute\s+nacht|willkommen)/.test(userInputLower)) {
    const response = greeting();
    lastFrankReply = response;
    return response;
  }

  const isExplanation = ["erklaeren sie","erlaeutern sie","erzaehlen sie","was passierte ","was bedeutet ","was ist ","wer ist ","was heißt ","was macht ","wofuer steht ","fuer was steht "].some(p => userInputLower.includes(p));
  const isOpinion = [" denke"," glaube","ich finde","meiner meinung nach "].some(p => userInputLower.includes(p));
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
          if (entry.is_fallback) continue; // <-- Skip fallback entries here!
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

  if (isExplanation) {
    response = searchBlock("explanation");
    if (!response) response = searchBlock("reaction");
    if (!response) response = fallbackResponse("explanation");
    if (!response) response = fallbackResponse("reaction");
  } else if (isOpinion) {
    response = searchBlock("opinion");
    if (!response) response = searchBlock("reaction");
    if (!response) response = fallbackResponse("opinion");
    if (!response) response = fallbackResponse("reaction");
  } else if (isQuestion) {
    response = searchBlock("question");
    if (!response) response = searchBlock("reaction");
    if (!response) response = fallbackResponse("question");
    if (!response) response = fallbackResponse("reaction");
  } else {
    response = searchBlock("reaction");
    if (!response) response = fallbackResponse("reaction");
  }

  if (typeof response === "string" && response.trim() !== "") {
    lastFrankReply = response;
    return response;
  }

const simpleWords = ["achso","doch","gut","hm","ja","ne","nein","ok","stimmt","verstehe","vielleicht","was","wer","wo"];
if (userInput.split(" ").length === 1 && simpleWords.includes(userInputLower)) {
  const oneWordMessagePool = [
    "Ein Wort? Mehr hast du nicht drauf?",
    "Ein Wort? Mehr krieg ich heute nicht? Wie großzügig.",
    "Ein-Wort-Sätze sind was für Erstklässler. Bist du sicher, dass du hier richtig bist?",
    "Versuch’ es mal mit einem ganzen Satz.",
    "Versuchst du, mit diesen halbherzigen Ein-Wort-Sätzen Jonathan nachzuahmen?",
    "Wenn das alles ist, was du zu bieten hast, müssen wir wohl dringend an deinem Wortschatz arbeiten."
  ];
  const response = getRandom(oneWordMessagePool);
  lastFrankReply = response;
  return response;
} else if (userInput.length <= 10) {
  const shortMessagePool = [
    "Du darfst gerne mehr schreiben. Es kostet dich nichts.",
    "Du scheinst der deutschen Sprache nicht wirklich mächtig zu sein.",
    "Du tippst ja genau so brüchig wie die ersten Computer in der DDR!",
    "Du und die deutsche Sprache – das wirkt wie ein sehr loses Verhältnis.",
    "Ein Satz besteht in der Regel aus Subjekt, Prädikat und Objekt. Nur falls du in der Grundschule nicht aufgepasst hast.",
    "Hat man dir nie beigebracht, vollständige Sätze zu bilden? Oder war das schon zu viel verlangt?",
    "Ich unterrichte Deutsch, keine Hieroglyphen. Wir sind hier schließlich nicht im alten Ägypten."
  ];
  let first = getRandom(shortMessagePool);
  let second = getRandom(shortMessagePool);
  while (second === first && shortMessagePool.length > 1) {
    second = getRandom(shortMessagePool);
  }
  const response = first + " " + second;
  lastFrankReply = response;
  return response;
} else if (userInput.length > 60) {
  const longMessagePool = [
    "Ich werde nicht dafür bezahlt, mir deine ganze Lebensgeschichte anzuhören. Mach’s gerne kurz und schmerzlos.",
    "Keinen Grund, mir einen ganzen Vortrag zu halten. Fass’ dich bitte kürzer.",
  ];
  const response = getRandom(longMessagePool);
  lastFrankReply = response;
  return response;
}

  const lastFallback = getRandom([
    "Ich hab Besseres zu tun, als dir und deinen Märchengeschichten zuzuhören.",
    "Ich kann dir nicht helfen, wenn du mit Begriffen um dich wirfst, die nicht mal der Duden versteht.",
    "Was das sein soll, weiß ich nicht – und ganz ehrlich: Ich will es wahrscheinlich auch gar nicht wissen."
  ]);
  lastFrankReply = lastFallback;
  return lastFallback;
}

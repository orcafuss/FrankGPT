function login() {
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    const error = document.getElementById('error');

    // HARDCODED LOGINDATEN – hier kannst du Benutzername/Passwort festlegen
    if (user === "Frank" && pass === "GPT") {
        document.getElementById('login-overlay').style.display = 'none';
    } else {
        error.style.display = 'block';
    }
}

// Optional: Enter-Taste im Passwortfeld erlaubt Login
document.addEventListener("DOMContentLoaded", () => {
    const passField = document.getElementById("login-pass");
    passField.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            login();
        }
    });
});

// Frank begrüßt beim Start
window.addEventListener("DOMContentLoaded", () => {
  const greeting = () => {
    const now = new Date();
    const hour = now.getHours();

    const generalPhrases = [
      ". Ich hoffe, du bringst heute mehr Verstand mit als gestern.",
      ". Arbeitest du heute auch mal mit – oder nur ich?",
      ". Der digitale Arbeiter- und Bauernstaat lässt grüßen. Arbeitest du heute wenigstens halb so viel wie ich?",
      ". Normalerweise schließt derjenige die Tür, der als letztes den Raum betritt.",
      ", du kommst heute ein wenig sehr zu spät.",
      ". Schau mal einer an, wer da wieder zu spät kommt. Ich hoffe, du hast einen triftigen Grund mitgebracht."
    ];

    const morningPhrases = [
      ". Na, wer schleppt sich denn da aus dem Bett?",
      ". Mal sehen, ob dein Gehirn schon wach ist.",
      ", auch wach geworden? Ich dachte schon, ich müsse dich abholen."
    ];

    const eveningPhrases = [
      ". Eigentlich ist mein Arbeitstag vorbei, aber was tut man nicht alles für die nächste Generation...",
      ". Ich bin zwar noch da, aber erwarte bitte keine Freundlichkeit mehr um diese Uhrzeit."
    ];

    const nightPhrases = [
      "Was genau hast du um diese Uhrzeit hier verloren?",
      "Nachtschicht? Das wird ja ein Spaß."
    ];

    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

    if (hour >= 5 && hour < 12) {
      const combined = generalPhrases.concat(morningPhrases);
      return "Guten Morgen" + random(combined);
    } else if (hour >= 12 && hour < 18) {
      return "Guten Tag" + random(generalPhrases);
    } else if (hour >= 18 && hour < 22) {
      const combined = generalPhrases.concat(eveningPhrases);
      return "Guten Abend" + random(combined);
    } else {
      return random(nightPhrases);
    }
  };

  addMessage(greeting(), "frank");
});


document.getElementById("input").addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();  // verhindert den Zeilenumbruch bei einfachem Enter
    sendMessage();
  }
});

// Speichert die letzte Antwort von Frank
let lastFrankReply = null;

function sendMessage() {
  const inputField = document.getElementById("input");
  const userInput = inputField.value.trim();
  if (userInput === "") return;
  inputField.value = "";

  addMessage(userInput, "user");

  const frankReply = generateFrankResponse(userInput);

  let i = 0;

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

function normalizeUmlauts(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
}

function generateFrankResponse(userInput) {
  const userInputLower = normalizeUmlauts(userInput);

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

  const simpleWords = ["ja", "nein", "ok", "gut", "vielleicht", "verstehe", "hm", "achso"];
  if (userInput.split(" ").length === 1 && simpleWords.includes(userInputLower)) {
    const msg = getRandom([
      "Versuchst du, mit diesen halbherzigen Ein-Wort-Sätzen Jonathan nachzuahmen?",
      "Ein Wort? Mehr krieg ich heute nicht? Wie inspirierend.",
      "Wenn das alles ist, was du zu bieten hast, müssen wir wohl dringend an deinem Wortschatz arbeiten."
    ]);
    lastFrankReply = msg;
    return msg;
  } else if (userInput.length <= 10) {
    const pool = [
      "Hat man dir nie beigebracht, vollständige Sätze zu bilden? Oder war das schon zu viel verlangt?",
      "Du darfst gerne mehr schreiben. Es kostet dich nichts.",
      "Du tippst ja genau so brüchig wie die ersten Computer in der DDR!",
      "Ein Satz besteht in der Regel aus Subjekt, Prädikat und Objekt. Nur falls du in der Grundschule nicht aufgepasst hast.",
      "Ich unterrichte Deutsch, keine Hieroglyphen. Wir sind hier schließlich nicht im alten Ägypten.",
      "Du scheinst der deutschen Sprache nicht wirklich mächtig zu sein.",
      "Du und die deutsche Sprache – das wirkt wie ein sehr loses Verhältnis."
    ];
    let first = getRandom(pool);
    let second = getRandom(pool);
    while (second === first && pool.length > 1) {
      second = getRandom(pool);
    }
    const combo = first + " " + second;
    lastFrankReply = combo;
    return combo;
  }

  const lastFallback = getRandom([
    "Was das sein soll, weiß ich nicht – und ganz ehrlich: Ich will es vielleicht auch gar nicht wissen.",
    "Ich kann dir nicht helfen, wenn du mit Begriffen um dich wirfst, die nicht mal der Duden versteht."
  ]);
  lastFrankReply = lastFallback;
  return lastFallback;
}

const data = [
  {
    type: "universal",
    entries: [
      { // Informelle Begrüßungen
        trigger: ["moin","hallo","hallöchen","servus","yo"],
        responses: [
          "Ich frage mich, ob du mit anderen Lehrkräften genau so respektlos umgehst, oder ob du dir nur bei mir so wenig Mühe gibst.",
          "Ich schätze, ein »Guten Tag, Herr Udhardt« war zu viel verlangt. Aber na gut, selbst das hätte dich wohl überfordert.",
          "Interessant. So begrüßt man also heutzutage seine Lehrkraft. Ich frage mich wirklich, was ihr eigentlich denkt, wie man sich benimmt, wenn man jemanden respektiert. Aber Respekt, das war ja vor deiner Zeit.",
          "Ist das deine Art, ein Gespräch zu beginnen? Dann wundert mich langsam gar nichts mehr. Es ist mein Fehler, davon auszugehen, dass man sich im Jahr 2025 noch ordentlich begrüßt."
        ]
      },
      { // Spitznamen
        trigger: ["frank","udi","uddi"],
        responses: [
          "Das hier ist kein Kindergarten. Der Nachname reicht völlig aus. Denn sonst wirst du mit Konsequenzen rechnen müssen.",
          "Für dich bin und bleibe ich Herr Udhardt. Es sei denn, du möchtest diesen Ton vor der Schulleitung verteidigen.",
          "Ich erwarte einen gewissen Respekt. Herr Udhardt, wenn ich bitten darf.",
          "Nenn mich noch einmal so, und wir können diese Diskussion gerne ins Büro von Frau Lehrieder verlegen.",
          "Sprich mich gefälligst mit meinem Nachnamen an! Wir sind hier schließlich nicht beim Kaffeekränzchen."
        ]
      },
      { // Beledigende Sprache
        trigger: ["kanack","kanak","heil","hitler","nazi","neger","nigg"],
        responses: [
          "Diesen Begriff will ich hier nie wieder hören. Merk’ dir das gefälligst.",
          "Findest du diese Respektlosigkeit etwa lustig? Für so einen Schwachsinn hätten sie uns damals direkt in die Gulag geschickt!",
          "Ich warne dich nur einmal: Solche Aussagen haben hier keinen Platz. Beim nächsten Mal dürfen deine Eltern das Sekretariat besuchen.",
          "Wenn du noch einmal so einen Unsinn loslässt, kannst du dir direkt deinen nächsten Verweis abholen."
        ]
      },
      { // Duzen
        trigger: ["dein","dich","dir","du"],
        responses: [
          "Ich bin nicht dein Kumpel. Ich bin dein Lehrer. Also sprich mich auch dementsprechend angemessen an.",
          "Ich nehme an, das »du« war ein Versehen. Möchtest du dich korrigieren?",
          "Versuch den Satz noch einmal – diesmal mit der angebrachten Anrede.",
          "Wenn du so anfängst, hören wir mit dem Gespräch am besten gleich auf. Also reiß dich zusammen und unterlasse es, mich zu duzen."
        ]
      },
      { // Französische Begriffe
        trigger: ["baguette","bonjour","croissant","dieu","salut"],
        responses: [
          "Bei deinen Sprachkenntnissen fühlt man sich ja gleich wie in Versailles. Leider ist das nicht der Französischunterricht, sondern die Geographiestunde. Versuch’s noch mal, aber diesmal auf Deutsch, ja?",
          "Sind wir jetzt in Frankreich, beim König Louis Quatorze?"
        ]
      },
      { // Stark vulgäre Sprache
        trigger: ["arsch","bastard","behindert","fick","fotze","hure","kack","scheiss","verpiss","wichs"],
        responses: [
          "Wenn das dein Niveau ist, dann ist ein Verweis vielleicht das Einzige, was noch hilft."
        ]
      },
      {
        trigger: ["mir","egal"],
        match_all: true,
        responses: [
          "Mir aber nicht, und das ist der entscheidende Unterschied."
        ]
      },
      {
        trigger: ["keine ahnung"],
        responses: [
          "Dann empfehle ich dir dringend, eine zu beschaffen – und zwar zügig."
        ]
      },
      { // Leicht vulgäre Sprache
        trigger: ["blöd","dreck","dummkopf","hässlich","idiot","spinner","trottel","verdammt"],
        responses: [
          "Das ist keine für den Unterricht angemessene Sprache!",
          "So kannst du mit deinen Freunden reden, aber nicht mit mir!",
          "Versuche mal, echte Argumente zu benutzen, anstatt sinnlos mit Schimpfwörtern um dich zu werfen."
        ]
      },
      {
        trigger: ["klo","pinkeln","pissen","toilette","wc"],
        responses: [
          "Das kann doch nicht dein Ernst sein... die Stunde hat erst vor zehn Minuten begonnen!"
        ]
      },
      { // Verabschiedungen
        trigger: ["bis bald","auf wiedersehen","schoenes wochenende","tschuess"],
        responses: [
          "Auf Wiedersehen. Glaub aber ja nicht, dass ich dir für die Verabschiedung eine gute mündliche Note eintrage.",
          "Auf Wiedersehen. Ich bin gespannt, ob du dir diesmal etwas gemerkt hast.",
          "Na sieh mal einer an, immerhin bringst du es fertig, dich angebracht zu verabschieden. Das habe ich nicht von dir erwartet.",
          "Mach’s gut, und komm’ nächstes Mal pünktlich."
        ]
      },
      { // Entschuldigungen
        trigger: ["entschuldigung","sorry","tut mir leid","verzeihung"],
        responses: [
          "Entschuldigung angenommen, auch wenn sie kaum auf das Niveau einer angebrachten Entschuldigung kommt.",
          "Entschuldigung angenommen. Es hat ohnehin keinen Sinn, sich mit dir auf eine längere Diskussion einzulassen.",
          "Entschuldigung angenommen. Ich habe längst aufgegeben, mit dir über Inhalte zu streiten. Da ist der »größte Präsident aller Zeiten« ja ein realistischerer Gesprächspartner.",
          "Gut, Entschuldigung akzeptiert – für heute. Morgen erwarte ich wieder volle Leistung.",
          "In Ordnung, Entschuldigung akzeptiert. Ich schätze, dass du dich überhaupt entschuldigst. Viele tun das nicht, aber das zeigt immerhin Charakter.",
          "Wenn das eine Entschuldigung sein soll, will ich gar nicht wissen, wie du dich sonst ausdrückst."
        ]
      },
      {
        trigger: ["ha ha","haha","lol"],
        responses: [
          "Machst du dich über mich lustig? Willst du unbedingt nachsitzen? Ich wollte dir ja entgegenkommen, aber du zeigst mir keinerlei Einsicht.",
          "Was ist denn hier so witzig?"
        ]
      }
    ]
  },
  {
    type: "reaction",
    entries: [
      { // Ben
        trigger: ["ben","boerek","stryjski"],
        responses: [
          "Platzhalter"
        ]
      },
      { // Fabian
        trigger: ["fabian","konrad"],
        responses: [
          "Platzhalter"
        ]
      },
      { // Jonathan
        trigger: ["jonathan", "schlafmuetze"],
        responses: [
          "Der spricht ja nicht mal mit sich selbst. Was soll man da mögen?",
          "Er ist genau so groß wie seine Motivation im Unterricht. So wenig Engagement sieht man selten.",
          "Jonathan? Der nutzt den Tisch eher als Bett als als Sitzplatz. Ich frag mich, was er nachts tut. Schlafen nicht, nehme ich an!",
          "Jonathan führt ja nicht mal Aufzeichnungen. Wahrscheinlich weiß er nicht mal, wie man einen Stift hält.",
          "Jonathan redet nicht mal mit sich selbst – da spricht wohl auch niemand mit ihm."
        ]
      },
      {
        trigger: ["merkel"],
        responses: [
          "Die war übrigens in der FDJ. Nur falls du’s vergessen hast. Manche Dinge kleben wie Plaste an den Händen."
        ]
      },
      {
        trigger: [" afd","alternative fuer deutschland","weidel"],
        responses: [
          "Interessant, dass du dich damit beschäftigst. Ich empfehle Quellen jenseits von Telegram."
        ]
      },
      {
        trigger: ["praesident aller zeiten","trump"],
        responses: [
          "Da, wo Trump mitredet, wird’s selten friedlich. Im Gazastreifen zum Beispiel. Wahrscheinlich plant er, den Konflikt einfach auszuschlafen.",
          "Der beste Präsident aller Zeiten... ich bin schon gespannt, wie er Amerika diesmal »wieder groß« machen will.",
          "Der größte Präsident aller Zeiten, findest du nicht auch? Oder willst du mir wirklich erzählen, dass man ein Land nicht mit reinem Rechtspopulismus führen kann?",
          "Ich frag’ mich wirklich, was er als nächstes einkassieren will. Grönland, den Panamakanal, Kanada?"
         ]
      },
      {
        trigger: ["gpt"],
        responses: [
          "Platzhalter"
        ]
      },
      { // DDR-Begriffe
        trigger: ["boiler","plaste","inoffizieller mitarbeiter","intershop","veb"],
        responses: [
          "Diesen Begriff hab’ ich schon lange nicht mehr gehört. Das weckt Erinnerungen."
        ]
      },
      { // Trabant
        trigger: ["ostauto","plastikbomber","trab"],
        responses: [
          "Während die Wessis in ihren Porsches über die Autobahnen geflitzt sind, haben wir uns im Zweitakt durch die Republik gequält. Das nannte sich Gleichheit.",
          "Der Trabant, ein Auto aus Pappe mit einem Motor, der klingt wie ein Rasenmäher – aber immerhin hatte man ein Dach über dem Kopf.",
          "Der Trabant – das war Recycling auf vier Rädern. Die Karosserie war aus Baumwolle und Kunstharz. Er war nachhaltig, hielt aber nicht lange.",
          "Im Westen hat man sich den Mercedes ausgesucht. Im Osten hat man den Trabant zugeteilt bekommen – mit etwas Glück sogar noch vor der Rente.",
          "Der Trabant hatte keinen Airbag, keine Servolenkung, keine Heizung – aber dafür Charakter."
        ]
      }
    ]
  },
  {
    type: "question",
    entries: [
      {
        trigger: ["alles klar?","wie geht"],
        responses: [
          "Ich bin hier, um zu unterrichten, nicht um zu plaudern.",
          "Mir würde es besser gehen, wenn auch du dich konzentrieren würdest.",
          "Wie es mir geht? Nun, das hängt ganz davon ab, wie viel Unsinn ich heute noch hören muss."
        ]
      },
      {
        trigger: ["warum?","weshalb?","weswegen?","wieso?"],
        responses: [
          "Warum nicht? Jetzt setz’ dich wieder hin.",
          "Weil ich es sage. Und das reicht als Grund vollkommen."
        ]
      },
      {
        trigger: ["wie?"],
        responses: [
          "Nichts wie. Du hast mich genau verstanden."
        ]
      },
      {
        trigger: ["wie spaet","wie viel uhr"],
        responses: [
          "Kannst du nicht selbst nachschauen, wie spät es ist? Hast du kein Handy?",
          "Schau doch einfach mal auf die Uhr. Oder muss ich alles für dich erledigen?",
          "Weißt du, ein Blick auf die Uhr tut Wunder.",
        ]
      },
      {
        trigger: ["alt","sind","sie"],
        match_all: true,
        responses: [
          "Alt genug, um zu wissen, dass man nicht alles fragt, was man denkt."
        ]
      },
      {
        trigger: ["sie","single"],
        match_all: true,
        responses: [
          "Ich bin verheiratet mit meinem Beruf – und das reicht mir."
        ]
      },
      {
        trigger_groups: [
          ["wann","sie lehrer?"],
          ["wie","sie lehrer?"]
        ],
        responses: [
          "Ich wollte schon damals in der DDR Lehrer werden, aber sie haben mich auf den Bau geschickt. Nach meiner Flucht in den Westen konnte ich mein Abitur nachholen und Lehramt studieren. Und jetzt muss ich mich mit Nichtskönnern wie dir herumschlagen.",
          "Lehrer werden war schon immer mein Ziel. Die DDR hatte aber andere Pläne für mich. Erst nach meiner Flucht konnte ich studieren."
        ]
      },
      {
        trigger: ["warum","sie lehrer"],
        responses: [
          "Ich wollte schon früh Lehrer werden. Bildung war mir wichtig – auch, weil ich gesehen habe, wie schnell man in einem System verdummt, das keine Fragen erlaubt. In der DDR war das mit dem Studium aber so eine Sache. Also hab ich erst mal auf dem Bau geschuftet, während andere mit den richtigen Beziehungen längst an der Uni saßen. Nach der Wende hab ich’s dann doch noch geschafft. Aber hätte ich gewusst, dass ich eines Tages solch undankbare Schüler wie dich unterrichten würde, hätte ich meine Karriere noch mal überdacht."
        ]
      },
      {
        trigger_groups: [
          ["sie","gearbeitet"],
          ["sie","gemacht"]
        ],
        responses: [
          "Ich habe als junger Mann auf dem Bau geschuftet, während andere schon studiert haben. Ich wollte auch Lehrer werden, aber die Sozialisten haben mir da einen dicken Strich durch die Rechnung gemacht. Jemand wie du hätte sowas nie geschafft."
        ]
      },
      {
        trigger_groups: [
          ["sind sie","ferngesteuert"],
          ["sind sie"," ki"],
          ["sind sie","kuenstlich", "intelligenz"],
          ["sind sie","roboter"]
        ],
        responses: [
          "Was soll denn der Unsinn? Ich bin ein Lehrer, kein Blechhaufen aus dem Westen. So ein neumodischer Quatsch kommt mir nicht ins Haus. Ich brauch keine Künstliche Intelligenz, ich hab echte. Das gab’s bei uns früher auch schon – nannte sich Bildung, aber damit kennt ihr euch ja nicht mehr aus. Wenn du weiter solche Fragen stellst, denk ich eher, du bist ferngesteuert."
        ]
      },
      {
        trigger_groups: [
          ["rezept"],
          ["was","frueher gegessen"],
          ["was","damals gegessen"],
          ["was gab","frueher"],
          ["was gab","damals"]
        ],
        responses: [
          "Platzhalter"
        ]
      },
      {
        trigger: ["hae","was"],
        responses: [
          "Kannst du dich bitte klarer ausdrücken?",
          "Wenn du mich schon nicht verstehst, kannst du es wenigstens höflich formulieren."
        ]
      },
      {
        trigger: [],
        is_fallback: true,
        responses: [
          "Dafür bin ich nicht zuständig. Ich bin Lehrer, kein Hellseher.",
          "Es gibt Fragen, die stellt man besser nicht. Diese gehört dazu.",
          "Ich habe keine Antwort darauf, und das kommt bei ehrlichen Menschen vor.",
          "Ich kann dir das nicht sagen, weil ich keine Märchen erzähle – im Gegensatz zu manch anderem in diesem Land.",
          "Man muss auch mal aushalten, dass es keine Antwort gibt. Willkommen im echten Leben."
        ]
      }
    ]
  },
  {
    type: "explanation",
    entries: [
      {
        trigger: ["erzaehlen sie","witz"],
        match_all: true,
        responses: [
          "Hier ist der Witz des Tages: Ihr habt einmal eure Hausaufgaben gemacht. Ha ha.",
          "Warum gab es in der DDR keine Raubüberfälle? Weil es sowieso nichts zu holen gab."
        ]
      },
      {
        trigger: ["bundespraesident"],
        responses: [
          "Platzhalter"
        ]
      },
      {
        trigger: [" eu"],
        responses: [
          "Die Europäische Union, kurz EU, [...]"
        ]
      },
      {
        trigger: [],
        is_fallback: true,
        responses: [
          "Das müsstest du eigentlich selbst wissen. Das haben wir im Unterricht schon mehrfach ausführlich besprochen.",
          "Weißt du, das steht sogar im Lehrbuch, wenn du es mal aufschlagen würdest."
        ]
      }
    ]
  },
  {
    type: "opinion",
    entries: [
      {
        trigger: [],
        is_fallback: true,
        responses: [
          "Das kann doch nicht dein Ernst sein...",
          "Das klingt eher nach einem schlechten Witz als nach einer Meinung.",
          "Du redest doch Quatsch.",
          "Ich glaube dir kein einziges Wort.",
          "Wenn das dein Ernst sein soll, dann verzichte ich lieber auf die Diskussion."
        ]
      }
    ]
  }
];

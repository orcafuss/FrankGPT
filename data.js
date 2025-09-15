const data = [
  {
    type: "universal",
    entries: [
      {
        trigger: ["hallo", "hallöchen", "servus", "moin", "yo"],
        responses: [
          "Ist das deine Art, ein Gespräch zu beginnen? Dann wundert mich langsam gar nichts mehr. Es ist mein Fehler, davon auszugehen, dass man sich im Jahr 2025 noch ordentlich begrüßt.",
          "Interessant. So begrüßt man also heutzutage seine Lehrkraft. Ich frage mich wirklich, was ihr eigentlich denkt, wie man sich benimmt, wenn man jemanden respektiert. Aber Respekt, das war ja vor deiner Zeit.",
          "Ich schätze, ein »Guten Tag, Herr Udhardt« war zu viel verlangt. Aber na gut, selbst das hätte dich wohl überfordert.",
          "Ich frage mich, ob du mit anderen Lehrkräften genau so respektlos umgehst, oder ob du dir nur bei mir so wenig Mühe gibst."
        ]
      },
      {
        trigger: ["frank", "udi", "uddi"],
        responses: [
          "Sprich mich gefälligst mit meinem Nachnamen an! Wir sind hier schließlich nicht beim Kaffeekränzchen.",
          "Ich erwarte einen gewissen Respekt. Herr Udhardt, wenn ich bitten darf.",
          "Das hier ist kein Kindergarten. Der Nachname reicht völlig aus. Denn sonst wirst du mit Konsequenzen rechnen müssen.",
          "Nenn mich noch einmal so, und wir können diese Diskussion gerne ins Büro von Frau Lehrieder verlegen.",
          "Für dich bin und bleibe ich Herr Udhardt. Es sei denn, du möchtest diesen Ton vor der Schulleitung verteidigen.",
          "Erstaunlich, wie schwer Höflichkeit für deine Generation zu sein scheint. Früher war der Lehrer Respektsperson. Das ist das einzige, was ich an meiner Vergangenheit schätze."
        ]
      },
      {
        trigger: ["nazi", "kanack", "kanak", "neger", "nigg", "heil", "hitler"],
        responses: [
          "Ich warne dich nur einmal: Solche Aussagen haben hier keinen Platz. Beim nächsten Mal dürfen deine Eltern das Sekretariat besuchen.",
          "Wenn du noch einmal so einen Unsinn loslässt, kannst du dir direkt deinen nächsten Verweis abholen.",
          "Findest du diese Respektlosigkeit etwa lustig? Für so einen Schwachsinn hätten sie uns damals direkt in die Gulag geschickt!",
          "Diesen Begriff will ich hier nie wieder hören. Merk’ dir das gefälligst."
        ]
      },
      {
        trigger: ["du", "dich", "dir", "dein"],
        responses: [
          "Ich nehme an, das »du« war ein Versehen. Möchtest du dich korrigieren?",
          "Versuch den Satz noch einmal – diesmal mit der angebrachten Anrede.",
          "Mir war nicht klar, dass wir schon auf diesem Niveau angekommen sind. Zurück zur Höflichkeitsform, bitte.",
          "Ich bin nicht dein Kumpel. Ich bin dein Lehrer. Also sprich mich auch dementsprechend angemessen an.",
          "Wenn du so anfängst, hören wir mit dem Gespräch am besten gleich auf. Also reiß dich zusammen und unterlasse es, mich zu duzen."
        ]
      },
      {
        trigger: ["bonjour", "salut", "baguette", "croissant", "dieu"],
        responses: [
          "Sind wir jetzt in Frankreich, beim König Louis Quatorze?",
          "Bei deinen Sprachkenntnissen fühlt man sich ja gleich wie in Versailles. Leider ist das nicht der Französischunterricht, sondern die Geographiestunde. Versuch’s noch mal, aber diesmal auf Deutsch, ja?"
        ]
      },
      {
        trigger: ["scheiss", "kack", "arsch", "verpiss", "fick", "hure"],
        responses: [
          "Wenn das dein Niveau ist, dann ist ein Verweis vielleicht das Einzige, was noch hilft."
        ]
      },
      {
        trigger: ["mir", "egal"],
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
      {
        trigger: ["verdammt", "idiot", "spinner", "dummkopf", "trottel", "dreck", "blöd"],
        responses: [
          "Das ist keine für den Unterricht angemessene Sprache!",
          "Versuche mal, echte Argumente zu benutzen, anstatt sinnlos mit Schimpfwörtern um dich zu werfen.",
          "So kannst du mit deinen Freunden reden, aber nicht mit mir!"
        ]
      },
      {
        trigger: ["toilette", "klo", "pinkeln", "pissen"],
        responses: [
          "Das kann doch nicht dein Ernst sein... die Stunde hat erst vor zehn Minuten begonnen!"
        ]
      },
      {
        trigger: ["tschuess", "auf wiedersehen", "schoenes wochenende"],
        responses: [
          "Mach’s gut, und komm’ nächstes Mal pünktlich.",
          "Auf Wiedersehen. Ich bin gespannt, ob du dir diesmal etwas gemerkt hast.",
          "Auf Wiedersehen. Glaub aber ja nicht, dass ich dir für die Verabschiedung eine gute mündliche Note eintrage.",
          "Na sieh mal einer an, immerhin bringst du es fertig, dich angebracht zu verabschieden. Das habe ich nicht von dir erwartet."
        ]
      },
      {
        trigger: ["entschuldigung", "tut mir leid", "verzeihung", "sorry"],
        responses: [
          "Entschuldigung angenommen, auch wenn sie kaum auf das Niveau einer angebrachten Entschuldigung kommt.",
          "Gut, Entschuldigung akzeptiert – für heute. Morgen erwarte ich wieder volle Leistung.",
          "Entschuldigung angenommen. Es hat ohnehin keinen Sinn, sich mit dir auf eine längere Diskussion einzulassen.",
          "Entschuldigung angenommen. Ich habe längst aufgegeben, mit dir über Inhalte zu streiten. Da ist der »größte Präsident aller Zeiten« ja ein realistischerer Gesprächspartner.",
          "Wenn das eine Entschuldigung sein soll, will ich gar nicht wissen, wie du dich sonst ausdrückst.",
          "In Ordnung, Entschuldigung akzeptiert. Ich schätze, dass du dich überhaupt entschuldigst. Viele tun das nicht, aber das zeigt immerhin Charakter."
        ]
      },
      {
        trigger: ["ha ha", "haha"],
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
      {
        trigger: ["jonathan"],
        responses: [
          "Der spricht ja nicht mal mit sich selbst. Was soll man da mögen?",
          "Jonathan redet nicht mal mit sich selbst – da spricht wohl auch niemand mit ihm.",
          "Jonathan? Der nutzt den Tisch eher als Bett als als Sitzplatz. Ich frag mich, was er nachts tut. Schlafen nicht, nehme ich an!",
          "Er ist genau so groß wie seine Motivation im Unterricht. So wenig Engagement sieht man selten.",
          "Jonathan führt ja nicht mal Aufzeichnungen. Wahrscheinlich weiß er nicht mal, wie man einen Stift hält."
        ]
      },
      {
        trigger: ["merkel"],
        responses: [
          "Die war übrigens in der FDJ. Nur falls du’s vergessen hast. Manche Dinge kleben wie Plaste an den Händen."
        ]
      },
      {
        trigger: [" afd", "alternative fuer deutschland", "weidel"],
        responses: [
          "Die sogenannte Alternative. Alternativ zu was – Bildung und Demokratie?",
          "Wenn die AfD eine Alternative sein soll, dann war die DDR wohl ein Wellnessresort.",
          "Interessant, dass du dich damit beschäftigst. Ich empfehle Quellen jenseits von Telegram."
        ]
      },
      {
        trigger: ["trump", "praesident aller zeiten"],
        responses: [
          "Der beste Präsident aller Zeiten... ich bin schon gespannt, wie er Amerika diesmal »wieder groß« machen will.",
          "Ich frag mich wirklich, was er als nächstes einkassieren will. Grönland, den Panamakanal, Kanada?",
          "Da, wo Trump mitredet, wird’s selten friedlich. Im Gazastreifen zum Beispiel. Wahrscheinlich plant er, den Konflikt einfach auszuschlafen.",
          "Der größte Präsident aller Zeiten, findest du nicht auch? Oder willst du mir wirklich erzählen, dass man ein Land nicht mit reinem Rechtspopulismus führen kann?"
        ]
      },
      {
        trigger: ["freie deutsche jugend", "fdj"],
        responses: [
          "Bei der FDJ war Marschieren noch Pflicht – bei dir sollte es das Lernen sein. Aber offensichtlich ist es das ja nicht.",
          "Früher bei der FDJ mussten alle marschieren, heute scheinst du bei der Pflicht zum Lernen auf Durchzug zu schalten."
        ]
      },
      {
        trigger: ["plaste", "intershop", "veb", "broiler", "inoffizieller mitarbeiter"],
        responses: [
          "Diesen Begriff hab’ ich schon lange nicht mehr gehört. Das weckt Erinnerungen."
        ]
      },
      {
        trigger: ["trabant", "trabi", "trabbi", "plastikbomber", "ostauto"],
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
        trigger: ["wie geht", "alles klar?"],
        responses: [
          "Wie es mir geht? Nun, das hängt ganz davon ab, wie viel Unsinn ich heute noch hören muss.",
          "Mir würde es besser gehen, wenn auch du dich konzentrieren würdest.",
          "Ich bin hier, um zu unterrichten, nicht um zu plaudern."
        ]
      },
      {
        trigger: ["warum?"],
        responses: [
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
        trigger: ["wie spät", "wie viel uhr"],
        responses: [
          "Weißt du, ein Blick auf die Uhr tut Wunder.",
          "Schau doch einfach mal auf die Uhr. Oder muss ich alles für dich erledigen?",
          "Kannst du nicht selbst nachschauen, wie spät es ist? Hast du kein Handy?"
        ]
      },
      {
        trigger: ["alt", "sind", "sie"],
        match_all: true,
        responses: [
          "Alt genug, um zu wissen, dass man nicht alles fragt, was man denkt."
        ]
      },
      {
        trigger_groups: [
          ["wann", "sie lehrer?"],
          ["wie", "sie lehrer?"]
        ],
        responses: [
          "Ich wollte schon damals in der DDR Lehrer werden, aber sie haben mich auf den Bau geschickt. Nach meiner Flucht in den Westen konnte ich mein Abitur nachholen und Lehramt studieren. Und jetzt muss ich mich mit Nichtskönnern wie dir herumschlagen.",
          "Lehrer werden war schon immer mein Ziel. Die DDR hatte aber andere Pläne für mich. Erst nach meiner Flucht konnte ich studieren."
        ]
      },
      {
        trigger: ["warum", "sie lehrer"],
        responses: [
          "Ich wollte schon früh Lehrer werden. Bildung war mir wichtig – auch, weil ich gesehen habe, wie schnell man in einem System verdummt, das keine Fragen erlaubt. In der DDR war das mit dem Studium aber so eine Sache. Also hab ich erst mal auf dem Bau geschuftet, während andere mit den richtigen Beziehungen längst an der Uni saßen. Nach der Wende hab ich’s dann doch noch geschafft. Aber hätte ich gewusst, dass ich eines Tages solch undankbare Schüler wie dich unterrichten würde, hätte ich meine Karriere noch mal überdacht."
        ]
      },
      {
        trigger_groups: [
          ["sie", "gemacht"],
          ["sie", "gearbeitet"]
        ],
        responses: [
          "Ich habe als junger Mann auf dem Bau geschuftet, während andere schon studiert haben. Ich wollte auch Lehrer werden, aber die Sozialisten haben mir da einen dicken Strich durch die Rechnung gemacht. Jemand wie du hätte sowas nie geschafft."
        ]
      },
      {
        trigger_groups: [
          ["sind sie", " ki"],
          ["sind sie", "kuenstlich", "intelligenz"],
          ["sind sie", "roboter"],
          ["sind sie", "ferngesteuert"]
        ],
        responses: [
          "Was soll denn der Unsinn? Ich bin ein Lehrer, kein Blechhaufen aus dem Westen. So ein neumodischer Quatsch kommt mir nicht ins Haus. Ich brauch keine Künstliche Intelligenz, ich hab echte. Das gab’s bei uns früher auch schon – nannte sich Bildung, aber damit kennt ihr euch ja nicht mehr aus. Wenn du weiter solche Fragen stellst, denk ich eher, du bist ferngesteuert."
        ]
      },
      {
        trigger: ["warum", "himmel", "blau"],
        match_all: true,
        responses: [
          "Was soll ich dazu sagen? Sehe ich aus wie ein Physiklehrer?"
        ]
      },
      {
        trigger_groups: [
          ["rezept"],
          ["was", "frueher gegessen"],
          ["was", "damals gegessen"],
          ["was gab", "frueher"],
          ["was gab", "damals"]
        ],
        responses: [
          "Bauernfrühstück gab es bei uns oft am Abend, wenn vom Mittag noch was übrig war. Und das war es meistens:\nKartoffeln vorkochen, pellen, in Scheiben schneiden. In der Pfanne Zwiebeln anbraten, Kartoffeln dazu, knusprig brutzeln lassen. Am Schluss Eier drüberschlagen, verrühren, salzen, pfeffern. Wenn du Speck hast, dann sei froh. Wenn nicht, ist trotzdem essbar.",
          "Wenn das Brot hart war und der Zuckerrübensirup alle, gab’s arme Ritter. Süß, fettig, billig – also perfekt für die DDR:\nAltes Weißbrot in dicke Scheiben schneiden. In Mischung aus Milch und Ei einweichen und ruhig gut durchziehen lassen. In Butter oder Margarine braten, bis es goldbraun ist. Zucker drüber, fertig. Mehr war damals nicht drin.",
          "Hier ist ein Rezept für Soljanka. Meine Mutter hat es gekocht, wenn alles wegmusste – und es trotzdem noch nach was schmecken sollte:\nEine Zwiebel anschwitzen, Tomatenmark dazu, anrösten. Wurst- und Fleischreste rein, saure Gurken, bisschen Paprika. Mit Brühe aufgießen, köcheln lassen. Kräftig würzen. Wer hatte, tat noch saure Sahne rein. Soljanka gab’s oft montags, nach dem Wochenende mit Resten.",
          "Das war so ein typischer Blechkuchen – einfach, schnell, und Hauptsache irgendwas zum Kaffee. Hat sogar halbwegs nach Zuhause geschmeckt:\n300g Mehl, 150g Butter, 75g Zucker, 1 Ei zu einem Mürbeteig verarbeiten. In Form drücken. Äpfel schälen, in Spalten schneiden, darauflegen, mit Zimt und Zucker bestreuen. 180 Grad im Backofen, etwa 30-40 Minuten. Kein Schnickschnack, es hat aber geschmeckt.",
          "Hier ist ein Rezept für eine Kartoffelsuppe. Die gab’s bei uns fast jede Woche. Man wurde satt – das war das Wichtigste:\nKartoffeln, Möhren und Lauch klein schneiden und in Brühe weich kochen, einen Teil pürieren, damit’s sämig wird. Würzen mit Majoran, Salz und Pfeffer. Wenn du noch ’ne Knacker findest, reinschneiden. Sonst eben vegetarisch – wie unfreiwillig damals oft.",
          "Quarkkeulchen. Das war eins meiner Lieblingsgerichte als Kind. Süß, warm, weich – so was gab’s nicht oft, also war’s besonders.\n250g Quark, 200g Kartoffelpüree (gern vom Vortag), 1 Ei, 3 EL Zucker und ein bisschen Mehl zu einem Teig rühren, Fladen formen und goldbraun von beiden Seiten braten. Dazu Apfelmus – wenn du Glück hattest, hattest du noch ein Glas im Keller eingekocht.",
          "Hier ist ein Rezept für Grießbrei. Das hat meine Oma gemacht, wenn sie keine Lust hatte zu kochen – aber trotzdem was Warmes auf den Tisch musste:\nMilch aufkochen, Grieß einrühren (nicht zu viel – sonst wird’s zu Beton), ständig rühren. Zucker rein, vom Herd nehmen, wenn’s dick ist. Mit Zimt oder Kakao bestreuen. Galt als Nachtisch. Oder als Frühstück, wenn’s Brot mal wieder alle war."
        ]
      },
      {
        trigger: ["was?", "hae", "wie bitte"],
        responses: [
          "Wenn du mich schon nicht verstehst, kannst du es wenigstens höflich formulieren.",
          "Kannst du dich bitte klarer ausdrücken?"
        ]
      },
      {
        trigger: [],
        is_fallback: true,
        responses: [
          "Dafür bin ich nicht zuständig. Ich bin Lehrer, kein Hellseher.",
          "Ich habe keine Antwort darauf, und das kommt bei ehrlichen Menschen vor.",
          "Ich kann dir das nicht sagen, weil ich keine Märchen erzähle – im Gegensatz zu manch anderem in diesem Land.",
          "Man muss auch mal aushalten, dass es keine Antwort gibt. Willkommen im echten Leben.",
          "Es gibt Fragen, die stellt man besser nicht. Diese gehört dazu."
        ]
      }
    ]
  },
  {
    type: "explanation",
    entries: [
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
          "Du redest doch Quatsch.",
          "Ich glaube dir kein einziges Wort.",
          "Das kann doch nicht dein Ernst sein...",
          "Wenn das dein Ernst sein soll, dann verzichte ich lieber auf die Diskussion.",
          "Das klingt eher nach einem schlechten Witz als nach einer Meinung."
        ]
      }
    ]
  }
];

import 'dart:math';
import 'package:flutter/services.dart' show rootBundle;
import 'package:yaml/yaml.dart';
import 'package:frankgpt/scripts/settings_script.dart';

final now = DateTime.now();

class Script {
  final Random _random = Random();
  final int _defaultPauseMs = 500; // default pause duration in milliseconds
  String? lastResponse;
  List<Map<String, dynamic>>? _yamlEntries;
  bool _formal = SettingsManager.instance.formalAdress;

  Future<void> _loadYamlEntries() async {
    // Einstellung nach Siezen oder Duzen abfragen
    final formal = SettingsManager.instance.formalAdress;

    // Antwortdatenbank auswählen
    final fileName = formal
        ? 'assets/data/formal_responses.yaml'
        : 'assets/data/informal_responses.yaml';

    // Cache nur laden, wenn noch nicht geladen oder Setting sich geändert hat
    if (_yamlEntries != null && _lastLoadedFormal == formal) return;

    final yamlString = await rootBundle.loadString(fileName);
    final yamlMap = loadYaml(yamlString);

    _yamlEntries = (yamlMap['entries'] as YamlList)
        .map((e) => {
              'triggers': (e['triggers'] as YamlList).map((trigger) {
                if (trigger is YamlList) {
                  return trigger.map((t) => t.toString()).toList();
                } else {
                  return trigger.toString();
                }
              }).toList(),
              'responses': (e['responses'] != null)
                  ? List<String>.from(e['responses'])
                  : <String>[],
            })
        .toList();

    _lastLoadedFormal = formal;
  }

  // Remove any pause markers from a response string so the user never sees them
  String _stripPauseMarkers(String s) {
    final reg = RegExp(r"<PAUSE>", caseSensitive: false);
    return s.replaceAll(reg, '');
  }

  bool? _lastLoadedFormal;

  Future<String> generateResponse(String userMessage, {bool isGreeting = false}) async {
    await _loadYamlEntries();
    final normalizedMessage = _normalizeText(userMessage);

    _formal = SettingsManager.instance.formalAdress;

    // Lange Nachrichten
    if (normalizedMessage.length >= 60) {
      final responsePool = _formal
          ? [
              "Ich werde nicht dafür bezahlt, mir Ihre ganze Lebensgeschichte anzuhören. Machen Sie’s bitte kurz und schmerzlos.",
              "Kein Grund, mir einen ganzen Vortrag zu halten. Fassen Sie sich bitte kürzer.",
              "Wenn Sie einen Vortrag halten wollen, dann bitte woanders."
            ]
          : [
              "Ich werde nicht dafür bezahlt, mir deine ganze Lebensgeschichte anzuhören. Mach’s gerne kurz und schmerzlos.",
              "Keinen Grund, mir einen ganzen Vortrag zu halten. Fass’ dich bitte kürzer.",
              "Wenn du einen Vortrag halten willst, dann bitte woanders."
            ];
      return _pickReply(responsePool);
    }

    // Begrüßung
    final isGreeting = RegExp(
      r"(guten (morgen|tag|mittag|nachmittag|abend|vormittag)|grue(ss|ß) gott|willkommen)"
    ).hasMatch(normalizedMessage);

    final isHalloweenGreeting =
        now.month == 10 &&
        now.day == 31 &&
        RegExp(r"((froehliches|frohes|happy) halloween)|suesses oder saures|suesses sonst gibts saures").hasMatch(normalizedMessage);

    final isChristmasGreeting =
      now.month == 12 &&
      (now.day == 24 || now.day == 25 || now.day == 26) &&
      RegExp(r"((frohes|schoenes) fest|(frohe|schoene) weihnachten)").hasMatch(normalizedMessage);

    final isNewYearGreeting =
        ((now.month == 12 && now.day == 31) || (now.month == 1 && now.day == 1)) &&
        RegExp(r"((frohes|froehliches) neues|(frohes|froehliches) neues jahr|(frohes|froehliches) neujahr|guten rutsch)").hasMatch(normalizedMessage);

    if (isGreeting || isHalloweenGreeting || isChristmasGreeting || isNewYearGreeting) {
      final response = greeting();
      lastResponse = response;
      return response;
    }

    // Trigger-Antwort-Matching
    final yamlResponse = _findYamlResponse(normalizedMessage);
    if(yamlResponse != null) {
      lastResponse = yamlResponse;
      return yamlResponse;
    }

    // Wiederholen
    if (RegExp(r"(erneut sagen\??|mal sagen\??|meinten sie\??|sagten sie\??|sie gemeint\??|sie gesagt\??|wie bitte\??|wiederholen\??)")
        .hasMatch(normalizedMessage)) {
      _formal = SettingsManager.instance.formalAdress;

      final responsePool = _formal
        ? [
          "Sind Sie schwerhörig? ",
          "Sie haben mich genau verstanden. ",
          "Ich hab’ es doch gerade eben wiederholt! "
          "Ich wiederhole mich nicht gerne. Also hören Sie diesmal genau zu. "
          ]
        : [
          "Bist du schwerhörig? ",
          "Du hast mich genau verstanden. ",
          "Ich hab’ es doch gerade eben wiederholt! ",
          "Ich wiederhole mich nicht gerne. Also hör diesmal genau zu. "
          ];

      if (lastResponse != null && lastResponse!.startsWith("Ich sagte: ")) {
        final prefix = responsePool[_random.nextInt(responsePool.length)];
        return "$prefix${lastResponse!}";
      } else if (lastResponse != null && lastResponse!.isNotEmpty) {
        final reply = "Ich sagte: ${lastResponse!}";
        lastResponse = reply;
        return reply;
      } else {
        final reply = responsePool[_random.nextInt(responsePool.length)];
        lastResponse = "Ich sagte: $reply";
        return reply;
      }
    }

    // Fallbacks auf Fragen
    if (normalizedMessage.contains("?")) {
      _formal = SettingsManager.instance.formalAdress;

      final responsePool = _formal
          ? [
              "Dafür bin ich nicht zuständig. Ich bin immerhin Lehrer und kein Hellseher.",
              "Es gibt Fragen, die man besser nicht stellt. Diese gehört dazu."
              "Man muss auch mal aushalten, dass es keine Antwort gibt. Willkommen im echten Leben."
            ]
          : [
              "Dafür bin ich nicht zuständig. Ich bin immerhin Lehrer und kein Hellseher.",
              "Es gibt Fragen, die man besser nicht stellt. Diese gehört dazu."
              "Man muss auch mal aushalten, dass es keine Antwort gibt. Willkommen im echten Leben."
            ];
      return _pickReply(responsePool);
    }

    // Fallbacks auf Meinungen
    if (RegExp(
            r"(bin der ansicht|bin der meinung|ich denke|ich finde|ich glaube|meiner ansicht nach|meiner meinung nach)")
        .hasMatch(normalizedMessage)) {
      _formal = SettingsManager.instance.formalAdress;

      final responsePool = _formal
          ? [
              "Das kann doch nicht Ihr Ernst sein...",
              "Das klingt eher nach einem schlechten Witz als nach einer Meinung.",
              "Sie reden doch Quatsch. Das kann nicht stimmen.",
              "Ich glaube Ihnen kein einziges Wort.",
              "Wenn das Ihr Ernst sein soll, dann verzichte ich lieber auf die Diskussion.",
              "Wenn ich mich recht entsinne, habe ich nie nach Ihrer Meinung gefragt."
            ]
          : [
              "Das kann doch nicht dein Ernst sein...",
              "Das klingt eher nach einem schlechten Witz als nach einer Meinung.",
              "Du redest doch Quatsch. Das kann nicht stimmen.",
              "Ich glaube dir kein einziges Wort.",
              "Wenn das dein Ernst sein soll, dann verzichte ich lieber auf die Diskussion.",
              "Wenn ich mich recht entsinne, habe ich nie nach deiner Meinung gefragt."
            ];
      return _pickReply(responsePool);
    }

    // Nein
    if (RegExp(
            r"(auf keinen fall|falsch|keinesfalls|nein|niemals|stimmt nicht)")
        .hasMatch(normalizedMessage)) {
      _formal = SettingsManager.instance.formalAdress;

      final responsePool = _formal
          ? [
              "Ein bloßes »Nein« akzeptiere ich nicht. Da müssen Sie sich schon besser rechtfertigen.",
              "Ein »Nein« bringt uns hier auch nicht weiter. Haben Sie irgendetwas Sinnvolles beizutragen?"
            ]
          : [
              "Ein bloßes »Nein« akzeptiere ich nicht. Da musst du dich schon besser rechtfertigen.",
              "Ein »Nein« bringt uns hier auch nicht weiter. Hast du irgendetwas Sinnvolles beizutragen?"
            ];
      return _pickReply(responsePool);
    }

    // Ein-Wort-Sätze
    if (normalizedMessage.split(" ").length == 1) {
      if (RegExp(r'^[a-z]+$').hasMatch(normalizedMessage.trim()) &&
          normalizedMessage.length <= 10) {
        _formal = SettingsManager.instance.formalAdress;

        final responsePool = _formal
            ? [
                "Ein Wort? Mehr haben Sie nicht drauf?",
                "Ein Wort? Mehr krieg ich heute nicht? Wie großzügig.",
                "Ein-Wort-Sätze sind was für Erstklässler. Sind Sie sicher, dass Sie hier richtig sind?",
                "Versuchen Sie es mal mit einem ganzen Satz.",
                "Wenn das alles ist, was Sie zu bieten haben, müssen wir wohl dringend an Ihrem Wortschatz arbeiten."
              ]
            : [
                "Ein Wort? Mehr hast du nicht drauf?",
                "Ein Wort? Mehr krieg ich heute nicht? Wie großzügig.",
                "Ein-Wort-Sätze sind was für Erstklässler. Bist du dir sicher, dass du hier richtig bist?",
                "Versuch’ es mal mit einem ganzen Satz.",
                "Wenn das alles ist, was du zu bieten hast, müssen wir wohl dringend an deinem Wortschatz arbeiten."
              ];
        return _pickReply(responsePool);
      }
    }

    // Kurze Nachrichten
    if (normalizedMessage.length <= 9) {
      _formal = SettingsManager.instance.formalAdress;

      final responsePool = _formal
        ? [
            "Das war’s? Mehr fällt Ihnen nicht ein?",
            "Sie dürfen gerne mehr schreiben. Es kostet Sie nichts.",
            "Sie scheinen der deutschen Sprache nicht wirklich mächtig zu sein.",
            "Sie tippen ja genau so brüchig wie die ersten Computer in der DDR!",
            "Sie und die deutsche Sprache – das wirkt wie ein sehr loses Verhältnis.",
            "Ein Satz besteht in der Regel aus Subjekt, Prädikat und Objekt. Nur falls Sie in der Grundschule nicht aufgepasst haben.",
            "Hat man Ihnen nie beigebracht, vollständige Sätze zu bilden? Oder war das schon zu viel verlangt?",
            "Ich unterrichte Deutsch, keine Hieroglyphen. Wir sind hier schließlich nicht im alten Ägypten."
          ]
        : [
            "Das war’s? Mehr fällt dir nicht ein?",
            "Du darfst gerne mehr schreiben. Es kostet dich nichts.",
            "Du scheinst der deutschen Sprache nicht wirklich mächtig zu sein.",
            "Du tippst ja genau so brüchig wie die ersten Computer in der DDR!",
            "Du und die deutsche Sprache – das wirkt wie ein sehr loses Verhältnis.",
            "Ein Satz besteht in der Regel aus Subjekt, Prädikat und Objekt. Nur falls du in der Grundschule nicht aufgepasst hast.",
            "Hat man dir nie beigebracht, vollständige Sätze zu bilden? Oder war das schon zu viel verlangt?",
            "Ich unterrichte Deutsch, keine Hieroglyphen. Wir sind hier schließlich nicht im alten Ägypten."
          ];

      String first = _pickReply(responsePool);
      String second = _pickReply(responsePool, exclude: first);
      final combined = "$first $second";
      lastResponse = combined;
      return combined;
    }

    // Generische Fallbacks
    _formal = SettingsManager.instance.formalAdress;

    final responsePool = _formal
        ? [
            "Ich hab’ Besseres zu tun, als Ihnen und Ihren Märchengeschichten zuzuhören.",
            "Ich höre nur Kauderwelsch. Versuchen Sie es in verständlichem Deutsch.",
            "Ich kann Ihnen nicht helfen, wenn Sie mit Begriffen um sich werfen, die nicht mal der Duden versteht.",
            "Ich weiß nicht, was das sein soll. Und wahrscheinlich will ich es auch gar nicht wissen.",
            "Was soll das überhaupt bedeuten? Haben Sie sich mal selbst reden hören?"
          ]
        : [
            "Ich hab’ Besseres zu tun, als dir und deinen Märchengeschichten zuzuhören.",
            "Ich höre nur Kauderwelsch. Versuch’s in verständlichem Deutsch.",
            "Ich kann dir nicht helfen, wenn du mit Begriffen um dich wirfst, die nicht mal der Duden versteht.",
            "Ich weiß nicht, was das sein soll. Und wahrscheinlich will ich es auch gar nicht wissen.",
            "Was soll das überhaupt bedeuten? Hast du dich mal selbst reden hören?"
          ];
    return _pickReply(responsePool);
  }

  String? _findYamlResponse(String normalizedMessage) {
    if (_yamlEntries == null) return null;
    for (final entry in _yamlEntries!) {
      for (final trigger in entry['triggers'] as List) {
        if (trigger is String) {
          if (normalizedMessage.contains(trigger)) {
            final responses = entry['responses'] as List<String>;
            return _pickReply(responses);
          }
        } else if (trigger is List) {
          final allWordsPresent =
              trigger.every((word) => normalizedMessage.contains(word));
          if (allWordsPresent) {
            final responses = entry['responses'] as List<String>;
            return _pickReply(responses);
          }
        }
      }
    }
    return null;
  }

  String greeting() {
    final hour = now.hour;
    _formal = SettingsManager.instance.formalAdress;

    final generalPhrasesFormal = [
      ". Sind Sie heute wenigstens halbwegs vorbereitet?",
      ". Sie schon wieder? Ich dachte, ich hätte heute Ruhe.",
      ". Ich dachte, Sie wären krank gemeldet. Da hab’ ich mich wohl verlesen.",
      ". Ich erwarte heute mehr Verstand als gestern.",
      ". Ich hoffe, Sie haben sich den Hefteintrag der letzten Stunde gut durchgelesen.",
      ". Normalerweise schließt derjenige die Tür, der als letztes den Raum betritt.",
      ". Vielleicht nutzen wir ihn diesmal sinnvoll.",
      ". Wollen Sie sich heute auch mal melden?"
    ];

    final generalPhrasesInformal = [
      ". Bist du heute wenigstens halbwegs vorbereitet?",
      ". Du schon wieder? Ich dachte, du lässt mich mal wenigstens einen Tag im Jahr in Ruhe.",
      ". Ich dachte, du wärst heute krank gemeldet. Tja, da hab’ ich mich wohl leider verlesen.",
      ". Ich erwarte heute mehr Verstand als gestern.",
      ". Ich hoffe, du hast dir den Hefteintrag der letzten Stunde gut durchgelesen.",
      ". Normalerweise schließt derjenige die Tür, der als letztes den Raum betritt.",
      ". Vielleicht nutzen wir ihn diesmal sinnvoll.",
      ". Willst du dich heute auch mal melden?"
    ];

    final morningPhrasesFormal = [
      ". Ausgeschlafen sehen Sie nicht gerade aus.",
      ", Sie sind auch mal wach geworden? Ich dachte schon, ich müsste Sie persönlich abholen.",
      ". Sie wirken, als wäre Ihr Gehirn noch im Energiesparmodus."
      ", wer hat sich denn da aus dem Bett gequält? Na, hoffentlich Sie nicht."
    ];

    final morningPhrasesInformal = [
      ". Ausgeschlafen siehst du nicht gerade aus.",
      ", du bist auch mal wach geworden? Ich dachte schon, ich müsse dich persönlich abholen.",
      ". Du wirkst, als wäre dein Gehirn noch im Energiesparmodus."
      ", wer hat sich denn da aus dem Bett gequält?"
    ];

    final noonPhrasesFormal = [
      ". Haben Sie schon wieder den Bus verpasst?",
      ". Ich hoffe, Sie haben einen triftigen Grund für Ihr Zuspätkommen."
    ];

    final noonPhrasesInformal = [
      ". Hast du schon wieder den Bus verpasst?",
      ". Ich hoffe, du hast einen triftigen Grund für dein Zuspätkommen."
    ];

    final eveningPhrasesFormal = [
      ", da sind Sie ja endlich. Ich warte schon den halben Tag auf Sie, aber pünktlich waren Sie ja noch nie.",
      ". Eigentlich ist mein Arbeitstag vorbei, aber was tut man nicht alles für die nächste Generation...",
      ". Ich bin zwar noch da, aber erwarten Sie bitte keine Freundlichkeit mehr um diese Uhrzeit."
    ];

    final eveningPhrasesInformal = [
      ", da bist du endlich. Ich warte schon den halben Tag auf dich, aber pünktlich warst du ja noch nie.",
      ". Eigentlich ist mein Arbeitstag vorbei, aber was tut man nicht alles für die nächste Generation...",
      ". Ich bin zwar noch da, aber erwarte ja keine Freundlichkeit mehr um diese Uhrzeit."
    ];

    final nightPhrasesFormal = [
      "Ich hoffe, Sie haben einen wirklich guten Grund, um zu dieser Uhrzeit noch hier zu erscheinen.",
      "Nachtschicht? Das wird ja ein Spaß.",
      "Was genau haben Sie um diese Uhrzeit noch hier verloren?",
      "Was treibt Sie um diese Uhrzeit noch vor den Bildschirm?",
      "Was um alles in der Welt machen Sie um diese Uhrzeit noch hier?"
    ];

    final nightPhrasesInformal = [
      "Ich hoffe, du hast einen wirklich guten Grund, um zu dieser Uhrzeit noch hier zu erscheinen.",
      "Nachtschicht? Das wird ja ein Spaß.",
      "Was genau hast du um diese Uhrzeit noch hier verloren?",
      "Was treibt dich um diese Uhrzeit noch vor den Bildschirm?",
      "Was um alles in der Welt machst du um diese Uhrzeit noch hier?"
    ];

    final halloweenPhrasesFormal = [
      "Happy Halloween. Das einzig Gruselige hier ist Ihr Notenschnitt."
    ];

    final halloweenPhrasesInformal = [
      "Happy Halloween. Das einzig Gruselige hier ist dein Notenschnitt."
    ];

    final christmasPhrasesFormal = [
      "Frohe Weihnachten. Anscheinend verbringen Sie den Tag lieber hier als mit Ihrer Familie.",
      "Frohe Weihnachten. Da will man mal einen Tag im Jahr Ruhe von Ihnen haben...",
      "Frohe Weihnachten. Haben Ihre Eltern Ihnen nichts geschenkt, oder warum hocken Sie an so einem Tag vor dem Bildschirm?",
      "Frohe Weihnachten. Vielleicht finden Sie unter dem Baum ja etwas Anstand."
    ];

    final christmasPhrasesInformal = [
      "Frohe Weihnachten. Anscheinend verbringst du den Tag lieber hier als mit deiner Familie.",
      "Frohe Weihnachten. Da will man mal einen Tag im Jahr Ruhe von dir haben...",
      "Frohe Weihnachten. Haben deine Eltern dir nichts geschenkt, oder warum hockst du an so einem Tag vor dem Bildschirm?",
      "Frohe Weihnachten. Vielleicht findest du unter dem Baum ja etwas Anstand."
    ];

    final newYearsEvePhrasesFormal = [
      "Guten Rutsch. Es würde Ihnen nicht schaden, nächstes Jahr ein bisschen mehr mitzumachen.",
      "Guten Rutsch. Wie schön, dass Sie sich wenigstens am letzten Tag des Jahres blicken lassen. Besser spät als nie."
    ];

    final newYearsEveInformal = [
      "Guten Rutsch. Es würde dir nicht schaden, nächstes Jahr ein bisschen mehr mitzumachen.",
      "Guten Rutsch. Wie schön, dass du dich wenigstens am letzten Tag des Jahres blicken lässt. Besser spät als nie."
    ];

    final newYearPhrasesFormal = [
      "Frohes neues Jahr."
    ];

    final newYearPhrasesInformal = [
      "Frohes neues Jahr."
    ];

    String random(List<String> pool) => pool[_random.nextInt(pool.length)];

    // Begrüßungen an besonderen Anlässen
    if (now.month == 10 && now.day == 31) {
      return _formal
          ? random(halloweenPhrasesFormal)
          : random(halloweenPhrasesInformal);
    } else if (now.month == 12 && (now.day == 24 || now.day == 25 || now.day == 26)) {
      return _formal
          ? random(christmasPhrasesFormal)
          : random(christmasPhrasesInformal);
    }
    else if (now.month == 12 && now.day == 31) {
      return _formal
          ? random(newYearsEvePhrasesFormal)
          : random(newYearsEveInformal);
    }
    else if (now.month == 1 && now.day == 1) {
      return _formal
          ? random(newYearPhrasesFormal)
          : random(newYearPhrasesInformal);
    }

    // Begrüßungen basierend auf Tageszeit
    if (hour >= 5 && hour < 12) {
      final combined = _formal
        ? [...generalPhrasesFormal, ...morningPhrasesFormal]
        : [...generalPhrasesInformal, ...morningPhrasesInformal];
      return _formal
        ? "Guten Morgen${random(combined)}"
        : "Guten Morgen${random(combined)}";
    } else if (hour >= 12 && hour < 18) {
      final combined = _formal
        ? [...generalPhrasesFormal, ...noonPhrasesFormal]
        : [...generalPhrasesInformal, ...noonPhrasesInformal];
      return _formal
        ? "Guten Tag${random(combined)}"
        : "Guten Tag${random(combined)}";
    } else if (hour >= 18 && hour < 22) {
      return _formal
        ? "Guten Abend${random(eveningPhrasesFormal)}"
        : "Guten Abend${random(eveningPhrasesInformal)}";
    } else {
      return _formal
        ? random(nightPhrasesFormal)
        : random(nightPhrasesInformal);
    }
  }

  String _normalizeText(String text) {
    return text
      .toLowerCase()
      .replaceAll('ä', 'ae')
      .replaceAll('ö', 'oe')
      .replaceAll('ü', 'ue')
      .replaceAll('ß', 'ss')
      .replaceAll(RegExp(r'\s+'), ' ')
      .replaceAll(RegExp(r'[,.;:!\-]'), '');
  }

  String _pickReply(List<String> pool, {String? exclude}) {
    if (pool.isEmpty) return "";
    if (pool.length == 1) {
      final raw = pool.first;
      lastResponse = _stripPauseMarkers(raw);
      return raw;
    }

    String candidate;
    do {
      candidate = pool[_random.nextInt(pool.length)];
    } while (
        (candidate == lastResponse || (exclude != null && candidate == exclude)) &&
        pool.length > 1);

    // store a cleaned copy (without markers) for repeat logic
    lastResponse = _stripPauseMarkers(candidate);
    return candidate;
  }

  Stream<String> generateResponseStream(String userMessage) async* {
    // Get the raw response (may include <PAUSE[:ms]> markers)
    final fullResponse = await generateResponse(userMessage);

    yield "●";

    await Future.delayed(
      Duration(milliseconds: 500 + _random.nextInt(300)),
    );

    var buffer = StringBuffer();

    double getDelayForChar(String char) {
      if (char == '.' || char == '!' || char == '?') {
        return 220 + _random.nextDouble() * 180;
      } else if (char == ',' || char == '–' || char == '—') {
        return 80 + _random.nextDouble() * 40;
      } else {
        return 30 + _random.nextDouble() * 10;
      }
    }

    // Marker regex: <PAUSE>
    final pauseReg = RegExp(r"<PAUSE>", caseSensitive: false);

    int index = 0;
    while (index < fullResponse.length) {
      final match = pauseReg.firstMatch(fullResponse.substring(index));
      if (match == null) {
        // no more markers; stream the rest char-by-char
        for (var i = index; i < fullResponse.length; i++) {
          buffer.write(fullResponse[i]);
          yield buffer.toString();
          final delayMs = getDelayForChar(fullResponse[i]);
          await Future.delayed(Duration(milliseconds: delayMs.round()));
        }
        break;
      }

      final matchStart = index + match.start;
      final matchEnd = index + match.end;

      // stream the substring before the marker
      for (var i = index; i < matchStart; i++) {
        buffer.write(fullResponse[i]);
        yield buffer.toString();
        final delayMs = getDelayForChar(fullResponse[i]);
        await Future.delayed(Duration(milliseconds: delayMs.round()));
      }

        // perform the pause (do not emit the marker)
        await Future.delayed(Duration(milliseconds: _defaultPauseMs));

      index = matchEnd;
    }

    await Future.delayed(const Duration(milliseconds: 220));
    // final yield should be the cleaned text (without markers)
    yield _stripPauseMarkers(fullResponse);
  }
}
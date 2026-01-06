import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:path_provider/path_provider.dart';

class SettingsManager extends ChangeNotifier {
  static final SettingsManager instance = SettingsManager._internal();
  SettingsManager._internal();

  Map<String, dynamic>? _settings;
  File? _file;

  final Map<String, dynamic> _defaultSettings = {
    "theme": "dark",
    "accent_color": "default",
    "formal_adress": false,
    "text_to_speech": false,
  };

  Future<void> init() async {
    if (!kIsWeb) {
      final dir = await getApplicationDocumentsDirectory();
      _file = File('${dir.path}/settings.json');

      if (await _file!.exists()) {
        try {
          final jsonString = await _file!.readAsString();
          _settings = json.decode(jsonString);
        } catch (_) {
          _settings = Map<String, dynamic>.from(_defaultSettings);
          await _save();
        }
      } else {
        _settings = Map<String, dynamic>.from(_defaultSettings);
        await _save();
      }
    } else {
      _settings = Map<String, dynamic>.from(_defaultSettings);
    }
    
    notifyListeners();
  }

  dynamic get(String key) => _settings?[key] ?? _defaultSettings[key];

  Future<void> set(String key, dynamic value) async {
    _settings ??= Map<String, dynamic>.from(_defaultSettings);
    _settings![key] = value;
    await _save();
    notifyListeners();
  }

  Future<void> _save() async {
    if (_file != null) {
      await _file!.writeAsString(json.encode(_settings ?? _defaultSettings));
    }
  }

  String get theme => get("theme") as String;
  String get accentColor => get("accent_color") as String;
  bool get formalAdress => get("formal_adress") as bool;
  bool get textToSpeech => get("text_to_speech") as bool;

  Future<void> setTheme(String value) => set("theme", value);
  Future<void> setAccentColor(String value) => set("accent_color", value);
  Future<void> setFormalAdress(bool value) => set("formal_adress", value);
  Future<void> setTextToSpeech(bool value) => set("text_to_speech", value);

  // Alle Farbvariablen, die nur vom Theme abhängen
  AppColors getColorScheme() {
    bool isDark = theme == "dark";
    if (theme == "system") {
      final Brightness systemBrightness =
          WidgetsBinding.instance.platformDispatcher.platformBrightness;
      isDark = systemBrightness == Brightness.dark;
    }

    final Color accent = _getAccentColor(accentColor);

    // fünf Farben abhängig von Theme + Akzentfarbe
    final userMessageBackground = _getAccentThemeColor("userMessageBackground", isDark ? "dark" : "light", accentColor);
    final sendButtonActiveBackground = _getAccentThemeColor("sendButtonActiveBackground", isDark ? "dark" : "light", accentColor);
    final sendButtonActiveHover = _getAccentThemeColor("sendButtonActiveHover", isDark ? "dark" : "light", accentColor);
    final sendButtonActiveIcon = _getAccentThemeColor("sendButtonActiveIcon", isDark ? "dark" : "light", accentColor);
    final userMessageText = _getAccentThemeColor("userMessageText", isDark ? "dark" : "light", accentColor);
    final selectionHighlight = _getAccentThemeColor("selectionHighlight", isDark ? "dark" : "light", accentColor);

    return AppColors(
      text: isDark ? const Color(0xFFFFFFFF) : const Color(0xFF000000),
      placeholderText: isDark ? const Color(0xFFAFAFAF) : const Color(0xFF505050),
      tooltipBackground: isDark ? const Color(0xFF000000) : const Color(0xFF000000),
      tooltipText: isDark ? const Color(0xFFFFFFFF) : const Color(0xFFFFFFFF),

      chatBackground: isDark ? const Color(0xFF212121) : const Color(0xFFFFFFFF),
      chatControlsBackground: isDark ? const Color(0xFF303030) : const Color(0xFFCFCFCF),
      chatControlsBorder: isDark ? const Color(0xFF4E4E4E) : const Color(0xFFA6A6A6),
      chatControlsHover: isDark ? const Color(0xFF353535) : const Color(0xFFCACACA),

      sendButtonActiveBackground: sendButtonActiveBackground,
      sendButtonActiveHover: sendButtonActiveHover,
      sendButtonActiveIcon: sendButtonActiveIcon,
      sendButtonInactiveBackground: isDark ? const Color(0xFF4E4E4E) : const Color(0xFFA6A6A6),
      sendButtonInactiveIcon: isDark ? const Color(0xFF303030) : const Color(0xFFCFCFCF),

      userMessageText: userMessageText,
      userMessageBackground: userMessageBackground,
      selectionHighlight: selectionHighlight,

      menuBackground: isDark ? const Color(0xFF181818) : const Color(0xFFE7E7E7),
      menuBorder: isDark ? const Color(0xFF212121) : const Color(0xFFDEDEDE),
      menuHover: isDark ? const Color(0xFF2A2A2A) : const Color(0xFFD5D5D5),

      dropdownBackground: isDark ? const Color(0xFF353535) : const Color(0xFFCACACA),
      dropdownBorder: isDark ? const Color(0xFF393939) : const Color(0xFFC6C6C6),
      dropdownHover: isDark ? const Color(0xFF454545) : const Color(0xFFBABABA),

      accent: accent,
    );
  }

  // --- Accent-Farben-Tabelle ---
  final Map<String, Map<String, Map<String, Color>>> _accentedColors = {
    "dark": {
      "default": {
        "userMessageBackground": Color(0xFF303030),
        "sendButtonActiveBackground": Color(0xFFFFFFFF),
        "sendButtonActiveHover": Color(0xFFC1C1C1),
        "sendButtonActiveIcon": Color(0xFF303030),
        "userMessageText": Color(0xFFFFFFFF),
        "selectionHighlight": Color(0xFF3D5C7A),
      },
      "blue": {
        "userMessageBackground": Color(0xFF003F7A),
        "sendButtonActiveBackground": Color(0xFF0169CC),
        "sendButtonActiveHover": Color(0xFF0F589E),
        "sendButtonActiveIcon": Color(0xFFFFFFFF),
        "userMessageText": Color(0xFFFFFFFF),
        "selectionHighlight": Color(0xFF0E5DA6),
      },
      "green": {
        "userMessageBackground": Color(0xFF00692A),
        "sendButtonActiveBackground": Color(0xFF00A240),
        "sendButtonActiveHover": Color(0xFF0E803B),
        "sendButtonActiveIcon": Color(0xFFFFFFFF),
        "userMessageText": Color(0xFFFFFFFF),
        "selectionHighlight": Color(0xFF0F7B3B),
      },
      "yellow": {
        "userMessageBackground": Color(0xFF916F00),
        "sendButtonActiveBackground": Color(0xFFE0AC00),
        "sendButtonActiveHover": Color(0xFFAB870E),
        "sendButtonActiveIcon": Color(0xFFFFFFFF),
        "userMessageText": Color(0xFFFFFFFF),
        "selectionHighlight": Color(0xFF8F7210),
      },
      "pink": {
        "userMessageBackground": Color(0xFF963C67),
        "sendButtonActiveBackground": Color(0xFFE04C91),
        "sendButtonActiveHover": Color(0xFFAB4474),
        "sendButtonActiveIcon": Color(0xFFFFFFFF),
        "userMessageText": Color(0xFFFFFFFF),
        "selectionHighlight": Color(0xFFA64A75),
      },
      "orange": {
        "userMessageBackground": Color(0xFF923B0F),
        "sendButtonActiveBackground": Color(0xFFE25507),
        "sendButtonActiveHover": Color(0xFFAD4A13),
        "sendButtonActiveIcon": Color(0xFFFFFFFF),
        "userMessageText": Color(0xFFFFFFFF),
        "selectionHighlight": Color(0xFFA44D21),
      },
    },
    "light": {
      "default": {
        "userMessageBackground": Color(0xFFCFCFCF),
        "sendButtonActiveBackground": Color(0xFF000000),
        "sendButtonActiveHover": Color(0xFF4C4C4C),
        "sendButtonActiveIcon": Color(0xFFCFCFCF),
        "userMessageText": Color(0xFF000000),
        "selectionHighlight": Color(0xFFB8DDFF),
      },
      "blue": {
        "userMessageBackground": Color(0xFFE5F3FF),
        "sendButtonActiveBackground": Color(0xFF0285FF),
        "sendButtonActiveHover": Color(0xFF4DA9FF),
        "sendButtonActiveIcon": Color(0xFFFFFFFF),
        "userMessageText": Color(0xFF00284D),
        "selectionHighlight": Color(0xFFB8DDFF),
      },
      "green": {
        "userMessageBackground": Color(0xFFD9F4E4),
        "sendButtonActiveBackground": Color(0xFF04B84C),
        "sendButtonActiveHover": Color(0xFF4FCD81),
        "sendButtonActiveIcon": Color(0xFFFFFFFF),
        "userMessageText": Color(0xFF003716),
        "selectionHighlight": Color(0xFFBCECD0),
      },
      "yellow": {
        "userMessageBackground": Color(0xFFFFF6D9),
        "sendButtonActiveBackground": Color(0xFFFFC300),
        "sendButtonActiveHover": Color(0xFFFFD54C),
        "sendButtonActiveIcon": Color(0xFFFFFFFF),
        "userMessageText": Color(0xFFFFC300),
        "selectionHighlight": Color(0xFFFFF0BC),
      },
      "pink": {
        "userMessageBackground": Color(0xFFFFE8F3),
        "sendButtonActiveBackground": Color(0xFFFF66AD),
        "sendButtonActiveHover": Color(0xFFFF94C5),
        "sendButtonActiveIcon": Color(0xFFFFFFFF),
        "userMessageText": Color(0xFF4D1F34),
        "selectionHighlight": Color(0xFFFFD7EA),
      },
      "orange": {
        "userMessageBackground": Color(0xFFFFE7D9),
        "sendButtonActiveBackground": Color(0xFFFB6A22),
        "sendButtonActiveHover": Color(0xFFFC9664),
        "sendButtonActiveIcon": Color(0xFFFFFFFF),
        "userMessageText": Color(0xFF4A2206),
        "selectionHighlight": Color(0xFFFFD5C0),
      },
    },
  };

  Color _getAccentThemeColor(String key, String theme, String accent) {
    final themeMap = _accentedColors[theme] ?? _accentedColors["dark"]!;
    final accentMap = themeMap[accent] ?? themeMap["default"]!;
    return accentMap[key]!;
  }

  Color _getAccentColor(String key) {
    switch (key) {
      case "blue":
        return const Color(0xFF0169cc);
      case "green":
        return const Color(0xFF00a240);
      case "yellow":
        return const Color(0xFFe0ac00);
      case "pink":
        return const Color(0xFFe04c91);
      case "orange":
        return const Color(0xFFe25507);
      default:
        return const Color(0xFF9b9b9b);
    }
  }
}

class AppColors {
  final Color text;
  final Color placeholderText;
  final Color tooltipBackground;
  final Color tooltipText;
  final Color chatBackground;
  final Color chatControlsBackground;
  final Color chatControlsBorder;
  final Color chatControlsHover;
  final Color sendButtonActiveBackground;
  final Color sendButtonActiveHover;
  final Color sendButtonActiveIcon;
  final Color sendButtonInactiveBackground;
  final Color sendButtonInactiveIcon;
  final Color userMessageText;
  final Color userMessageBackground;
  final Color menuBackground;
  final Color menuBorder;
  final Color menuHover;
  final Color dropdownBackground;
  final Color dropdownBorder;
  final Color dropdownHover;
  final Color accent;
  final Color selectionHighlight;

  const AppColors({
    required this.text,
    required this.placeholderText,
    required this.tooltipBackground,
    required this.tooltipText,
    required this.chatBackground,
    required this.chatControlsBackground,
    required this.chatControlsBorder,
    required this.chatControlsHover,
    required this.sendButtonActiveBackground,
    required this.sendButtonActiveHover,
    required this.sendButtonActiveIcon,
    required this.sendButtonInactiveBackground,
    required this.sendButtonInactiveIcon,
    required this.userMessageText,
    required this.userMessageBackground,
    required this.menuBackground,
    required this.menuBorder,
    required this.menuHover,
    required this.dropdownBackground,
    required this.dropdownBorder,
    required this.dropdownHover,
    required this.accent,
    required this.selectionHighlight,
  });
}

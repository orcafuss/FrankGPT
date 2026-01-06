import 'package:flutter/material.dart';
import 'package:frankgpt/components/widgets.dart';
import 'package:frankgpt/components/animations.dart';
import 'package:frankgpt/scripts/settings_script.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: SettingsManager.instance,
      builder: (context, _) {
        final colors = SettingsManager.instance.getColorScheme();
        return Scaffold(
          backgroundColor: colors.menuBackground,
          body: ListView(
            children: [
              const SizedBox(height: 8),
              HeaderTile(
                label: "Einstellungen",
                onButtonPressed: () => Navigator.pop(context),
              ),
              DropdownTile(
                key: ValueKey(SettingsManager.instance.theme),
                iconPath: "assets/icons/settings/sun.svg",
                label: "Farbschema",
                value: SettingsManager.instance.theme,
                items: const [
                  DropdownMenuItem(value: "dark", child: Text("Dunkel")),
                  DropdownMenuItem(value: "light", child: Text("Hell")),
                  DropdownMenuItem(value: "system", child: Text("System")),
                ],
                onChanged: (val) {
                  SettingsManager.instance.setTheme(val);
                },
              ),
              DropdownTile(
                key: ValueKey(SettingsManager.instance.accentColor),
                iconPath: "assets/icons/settings/paintbrush.svg",
                label: "Akzentfarbe",
                value: SettingsManager.instance.accentColor,
                items: const [
                  DropdownMenuItem(value: "default", child: Text("Standard")),
                  DropdownMenuItem(value: "blue", child: Text("Blau")),
                  DropdownMenuItem(value: "green", child: Text("Grün")),
                  DropdownMenuItem(value: "yellow", child: Text("Gelb")),
                  DropdownMenuItem(value: "pink", child: Text("Rosa")),
                  DropdownMenuItem(value: "orange", child: Text("Orange")),
                ],
                leadingColor: (val) {
                  switch (val) {
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
                },
                onChanged: (val) {
                  SettingsManager.instance.setAccentColor(val);
                },
              ),
              BasicTile(
                iconPath: "assets/icons/system/settings.svg",
                label: "Verhalten",
                onTap: () =>
                    slideToPage(context, const _BehaviorSettingsPage()),
              ),
              BasicTile(
                iconPath: "assets/icons/settings/audio_lines.svg",
                label: "Audio",
                onTap: () => slideToPage(context, const _AudioSettingsPage()),
              ),
            ],
          ),
        );
      },
    );
  }
}

// ────────── Behavior Settings ──────────

class _BehaviorSettingsPage extends StatelessWidget {
  const _BehaviorSettingsPage();

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: SettingsManager.instance,
      builder: (context, _) {
        final colors = SettingsManager.instance.getColorScheme();

        return Scaffold(
          backgroundColor: colors.menuBackground,
          body: ListView(
            children: [
              const SizedBox(height: 8),
              HeaderTile(
                label: "Verhalten",
                onButtonPressed: () => Navigator.pop(context),
              ),
              SwitchTile(
                iconPath: "assets/icons/system/settings.svg",
                label: "Siezen",
                value: SettingsManager.instance.formalAdress,
                onChanged: (val) {
                  SettingsManager.instance.setFormalAdress(val);
                },
              ),
            ],
          ),
        );
      },
    );
  }
}

// ────────── Audio Settings ──────────

class _AudioSettingsPage extends StatelessWidget {
  const _AudioSettingsPage();

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: SettingsManager.instance,
      builder: (context, _) {
        final colors = SettingsManager.instance.getColorScheme();

        return Scaffold(
          backgroundColor: colors.menuBackground,
          body: ListView(
            children: [
              const SizedBox(height: 8),
              HeaderTile(
                label: "Audio",
                onButtonPressed: () => Navigator.pop(context),
              ),
              SwitchTile(
                iconPath: "assets/icons/settings/audio_lines.svg",
                label: "Text-to-Speech",
                value: SettingsManager.instance.textToSpeech,
                onChanged: (val) {
                  SettingsManager.instance.setTextToSpeech(val);
                },
              ),
            ],
          ),
        );
      },
    );
  }
}

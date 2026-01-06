import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'dart:io' show Platform;
import 'package:window_manager/window_manager.dart';
import 'package:frankgpt/screens/chat.dart';
import 'package:frankgpt/scripts/settings_script.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  if (!kIsWeb && (Platform.isWindows || Platform.isMacOS || Platform.isLinux)) {
    await windowManager.ensureInitialized();
    windowManager.waitUntilReadyToShow().then((_) async {
      await windowManager.setSize(const Size(600, 800));
      await windowManager.setMinimumSize(const Size(480, 640));
      await windowManager.center();
      await windowManager.show();
    });
  }

  await SettingsManager.instance.init();
  runApp(const FrankGPT());
}

class FrankGPT extends StatelessWidget {
  const FrankGPT({super.key});

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: SettingsManager.instance,
      builder: (context, child) {
        return MaterialApp(
          title: "FrankGPT",
          home: child,
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
            fontFamily: "Inter",
            tooltipTheme: TooltipThemeData(
              waitDuration: const Duration(milliseconds: 400),
              showDuration: const Duration(seconds: 3),
              decoration: BoxDecoration(
                color: const Color(0xE6000000),
                borderRadius: BorderRadius.circular(6),
              ),
              textStyle: const TextStyle(
                fontFamily: 'Inter',
                color: Colors.white,
                fontSize: 14,
                letterSpacing: 0.1,
              ),
            ),
            scrollbarTheme: ScrollbarThemeData(
              thumbColor: WidgetStateProperty.all(Colors.transparent),
              trackColor: WidgetStateProperty.all(Colors.transparent),
              radius: const Radius.circular(4),
              thickness: WidgetStateProperty.all(6),
              crossAxisMargin: 2,
            ),
          ),
        );
      },
      child: const ChatPage(),
    );
  }
}
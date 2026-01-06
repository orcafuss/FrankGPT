import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:math';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:frankgpt/scripts/chat_script.dart';
import 'package:frankgpt/screens/settings.dart';
import 'package:frankgpt/scripts/settings_script.dart';
import 'package:frankgpt/components/widgets.dart';
import 'package:frankgpt/components/animations.dart';

enum Sender { user, bot }

class Message {
  final String text;
  final Sender sender;
  Message(this.text, this.sender);
}

String _lastPlaceholder = "";

String _randomPlaceholder() {
  const placeholders = [
    "Stelle irgendeine Frage",
  ];

  final rnd = Random();
  String next;

  do {
    next = placeholders[rnd.nextInt(placeholders.length)];
  } while (next == _lastPlaceholder && placeholders.length > 1);

  _lastPlaceholder = next;
  return next;
}

class ChatPage extends StatefulWidget {
  const ChatPage({super.key});
  @override
  State<ChatPage> createState() => _ChatState();
}

class _ChatState extends State<ChatPage> {
  final ScrollController _scrollController = ScrollController();
  final List<Message> _messages = [];
  final Script _script = Script();
  final _inputKey = GlobalKey<_MessageInputState>();

  StreamSubscription<String>? _typingSub;
  bool _isBotTyping = false;

  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _addBotGreeting();

      _inputKey.currentState?.setPlaceholder(_randomPlaceholder());
    });
  }

  void _addBotGreeting() async {
    setState(() {
      _messages.add(Message("", Sender.bot));
      _isBotTyping = true;
    });

    final greeting = _script.greeting();
    final rnd = Random();

    final Stream<String> stream = (() async* {
      yield "●";
      await Future.delayed(const Duration(milliseconds: 650 + 150));

      var buffer = StringBuffer();

      double getDelayForChar(String char) {
        if (char == '.' || char == '!' || char == '?') {
          return 220 + rnd.nextDouble() * 180;
        } else if (char == ',' || char == '–' || char == '—') {
          return 80 + rnd.nextDouble() * 40;
        } else {
          return 30 + rnd.nextDouble() * 10;
        }
      }

      for (var i = 0; i < greeting.length; i++) {
        buffer.write(greeting[i]);
        yield buffer.toString();
        final delayMs = getDelayForChar(greeting[i]);
        await Future.delayed(Duration(milliseconds: delayMs.round()));
      }

      await Future.delayed(const Duration(milliseconds: 220));
      yield greeting;
    })();

    _typingSub?.cancel();
    _typingSub = stream.listen(
      (partial) {
        if (!mounted) return;
        setState(() {
          final lastIndex = _messages.lastIndexWhere((m) => m.sender == Sender.bot);
          if (lastIndex != -1) {
            _messages[lastIndex] = Message(partial, Sender.bot);
          }
        });

        Future.delayed(const Duration(milliseconds: 80), () {
          if (mounted) _scrollDown();
        });
      },
      onError: (e) {
        if (!mounted) return;
        setState(() {
          final lastIndex = _messages.lastIndexWhere((m) => m.sender == Sender.bot);
          if (lastIndex != -1) {
            _messages[lastIndex] = Message("Fehler beim Generieren der Begrüßung.", Sender.bot);
          }
          _isBotTyping = false;
        });
      },
      onDone: () {
        if (!mounted) return;
        setState(() {
          _isBotTyping = false;
          _script.lastResponse = greeting;
        });
        WidgetsBinding.instance.addPostFrameCallback((_) => _scrollDown());
      },
      cancelOnError: true,
    );
  }

  void _scrollDown() {
    if (!_scrollController.hasClients) return;

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!_scrollController.hasClients) return;
      final current = _scrollController.offset;
      final max = _scrollController.position.maxScrollExtent;

      final target = (current + 128).clamp(0, max).toDouble();
      _scrollController.animateTo(
        target,
        duration: const Duration(milliseconds: 180),
        curve: Curves.easeOutCubic,
      );
    });
  }

  @override
  void dispose() {
    _typingSub?.cancel();
    _scrollController.dispose();
    super.dispose();
  }

  void _addMessage(String userMessage) async {
    setState(() {
      _messages.add(Message(userMessage, Sender.user));
    });
    WidgetsBinding.instance.addPostFrameCallback((_) => _scrollDown());

    _typingSub?.cancel();
    _isBotTyping = true;
    setState(() {
      _messages.add(Message("", Sender.bot));
    });

    final stream = _script.generateResponseStream(userMessage);
    _typingSub = stream.listen(
      (partial) {
        setState(() {
          final lastIndex = _messages.lastIndexWhere((m) => m.sender == Sender.bot);
          if (lastIndex != -1) {
            _messages[lastIndex] = Message(partial, Sender.bot);
          }
        });

        Future.delayed(const Duration(milliseconds: 80), () {
          if (mounted) _scrollDown();
        });
      },
      onError: (e) {
        setState(() {
          final lastIndex = _messages.lastIndexWhere((m) => m.sender == Sender.bot);
          if (lastIndex != -1) {
            _messages[lastIndex] = Message("Fehler beim Generieren der Antwort.", Sender.bot);
          }
          _isBotTyping = false;
        });
      },
      onDone: () {
        setState(() => _isBotTyping = false);
        WidgetsBinding.instance.addPostFrameCallback((_) => _scrollDown());
      },
      cancelOnError: true,
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: SettingsManager.instance,
      builder: (context, _) {
        final colors = SettingsManager.instance.getColorScheme();

        return AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          color: colors.chatBackground,
          child: Scaffold(
            backgroundColor: Colors.transparent,
            drawer: Container(
              decoration: BoxDecoration(
                border: Border(
                  right: BorderSide(color: colors.menuBorder, width: 2),
                ),
              ),
              child: Drawer(
                backgroundColor: colors.menuBackground,
                shape: const RoundedRectangleBorder(
                  borderRadius: BorderRadius.zero,
                ),
                child: SafeArea(
                  child: ListView(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    children: [
                      BasicTile(
                        iconPath: "assets/icons/chat/new_chat.svg",
                        label: "Neuer Chat",
                        onTap: () {
                          Navigator.pop(context);
                          _typingSub?.cancel();
                          _isBotTyping = false;
                          setState(() {
                            _messages.clear();
                            _addBotGreeting();
                          });
                          _inputKey.currentState?.clear();
                          _inputKey.currentState?.setPlaceholder(_randomPlaceholder());
                        },
                      ),
                      BasicTile(
                        iconPath: "assets/icons/system/settings.svg",
                        label: "Einstellungen",
                        onTap: () {
                          slideToPage(context, const SettingsPage());
                        },
                      ),
                    ],
                  ),
                ),
              ),
            ),
            body: Stack(
              children: [
                // Chat
                Column(
                  children: [
                    Expanded(
                      child: ListView.builder(
                        controller: _scrollController,
                        padding: const EdgeInsets.fromLTRB(26, 82, 26, 26),
                        physics: const AlwaysScrollableScrollPhysics(),
                        itemCount: _messages.length,
                        itemBuilder: (context, index) {
                          final message = _messages[index];
                          final isBot = message.sender == Sender.bot;
                          return Align(
                            alignment: isBot ? Alignment.centerLeft : Alignment.centerRight,
                            child: isBot
                              ? Padding(
                                padding: const EdgeInsets.only(
                                  top: 4, bottom: 24, left: 16, right: 16),
                                child: Theme(
                                  data: Theme.of(context).copyWith(
                                    textSelectionTheme: TextSelectionThemeData(
                                      selectionColor: colors.selectionHighlight,
                                      selectionHandleColor: colors.text,
                                    ),
                                  ),
                                  child: SelectableText(
                                    message.text,
                                    style: TextStyle(
                                      color: colors.text,
                                      fontSize: 16,
                                      height: 1.5,
                                    ),
                                  ),
                                ),
                              )
                              : AnimatedContainer(
                                duration: const Duration(milliseconds: 300),
                                margin: const EdgeInsets.only(
                                  top: 4, bottom: 24, left: 64, right: 16),
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                                decoration: BoxDecoration(
                                  color: colors.userMessageBackground,
                                  borderRadius: BorderRadius.circular(30),
                                ),
                                child: Text(
                                  message.text,
                                  style: TextStyle(color: colors.userMessageText, fontSize: 16, height: 1.5),
                                ),
                              ),
                          );
                        },
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 16, right: 16, bottom: 16),
                      child: MessageInput(
                        key: _inputKey,
                        onSend: _addMessage,
                        enabled: !_isBotTyping,
                      ),
                    ),
                  ],
                ),

                // Fade-Overlay am oberen Chatrand
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 80,
                  child: IgnorePointer(
                    ignoring: true,
                    child: Container(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                          colors: [
                            colors.chatBackground.withValues(alpha: 1.0),
                            colors.chatBackground.withValues(alpha: 0.8),
                            colors.chatBackground.withValues(alpha: 0.0),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),

                // Knopf zum Öffnen des Menüs
                Positioned(
                  top: 16,
                  left: 16,
                  child: Builder(
                    builder: (context) => AnimatedContainer(
                      duration: const Duration(milliseconds: 300),
                      width: 50,
                      height: 50,
                      child: Material(
                        color: colors.chatControlsBackground,
                        shape: CircleBorder(
                          side: BorderSide(
                            color: colors.chatControlsBorder,
                            width: 2,
                          ),
                        ),
                        clipBehavior: Clip.antiAlias,
                        child: InkWell(
                          customBorder: const CircleBorder(),
                          splashColor: Colors.transparent,
                          highlightColor: Colors.transparent,
                          hoverColor: colors.chatControlsHover,
                          onTap: () => Scaffold.of(context).openDrawer(),
                          child: Tooltip(
                            message: "Menü",
                            waitDuration: const Duration(milliseconds: 400),
                            decoration: BoxDecoration(
                              color: colors.tooltipBackground,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            textStyle: Theme.of(context).tooltipTheme.textStyle?.copyWith(
                              color: colors.tooltipText,
                            ),
                            child: Center(
                              child: SvgPicture.asset(
                                "assets/icons/chat/menu.svg",
                                width: 25,
                                height: 25,
                                colorFilter: ColorFilter.mode(
                                  colors.text,
                                  BlendMode.srcIn,
                                ),
                                semanticsLabel: "Menü",
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),

                // Knopf zum Erstellen eines neuen Chats
                Positioned(
                  top: 16,
                  right: 16,
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 300),
                    width: 50,
                    height: 50,
                    child: Material(
                      color: colors.chatControlsBackground,
                      shape: CircleBorder(
                        side: BorderSide(
                          color: colors.chatControlsBorder,
                          width: 2,
                        ),
                      ),
                      clipBehavior: Clip.antiAlias,
                      child: InkWell(
                        customBorder: const CircleBorder(),
                        splashColor: Colors.transparent,
                        highlightColor: Colors.transparent,
                        hoverColor: colors.chatControlsHover,
                        onTap: () {
                          _typingSub?.cancel();
                          _isBotTyping = false;
                          setState(() {
                            _messages.clear();
                            _addBotGreeting();
                          });
                          _inputKey.currentState?.clear();
                          _inputKey.currentState?.setPlaceholder(_randomPlaceholder());
                        },
                        child: Tooltip(
                          message: "Neuer Chat",
                          waitDuration: const Duration(milliseconds: 400),
                          decoration: BoxDecoration(
                            color: colors.tooltipBackground,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          textStyle: Theme.of(context).tooltipTheme.textStyle?.copyWith(
                            color: colors.tooltipText,
                          ),
                          child: Center(
                            child: SvgPicture.asset(
                              "assets/icons/chat/new_chat.svg",
                              width: 25,
                              height: 25,
                              colorFilter: ColorFilter.mode(
                                colors.text,
                                BlendMode.srcIn,
                              ),
                              semanticsLabel: "Neuer Chat",
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class MessageInput extends StatefulWidget {
  final void Function(String) onSend;
  final bool enabled;
  const MessageInput({required this.onSend, required this.enabled, super.key});

  @override
  State<MessageInput> createState() => _MessageInputState();
}

class _MessageInputState extends State<MessageInput> with SingleTickerProviderStateMixin {
  final TextEditingController _controller = TextEditingController();
  final FocusNode _focusNode = FocusNode();

  String _placeholder = "Stelle irgendeine Frage";

  void setPlaceholder(String value) {
    setState(() {
      _placeholder = value;
    });
  }

  late final AnimationController _animController;
  late final Animation<double> _scaleAnimation;

  bool _wasActive = false;

  bool get _isActive => widget.enabled && _controller.text.trim().isNotEmpty;

  @override
  void initState() {
    super.initState();

    _controller.addListener(_handleActivationChange);

    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 300),
    );

    _scaleAnimation = Tween<double>(begin: 0.75, end: 1.0).animate(
      CurvedAnimation(parent: _animController, curve: Curves.easeOutBack),
    );

    _animController.value = 1.0;
    _wasActive = _isActive;
  }

  @override
  void didUpdateWidget(covariant MessageInput oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.enabled != widget.enabled) {
      _handleActivationChange();
    }
  }

  bool _isHoveringSend = false;

  void _handleActivationChange() {
    final nowActive = _isActive;
    if (nowActive && !_wasActive) {
      _animController.value = 0.0;
      _animController.forward(from: 0.0);
    } else if (!nowActive && _wasActive) {
      _animController.value = 1.0;
    }
    _wasActive = nowActive;
    setState(() {});
    if (!_isActive && _isHoveringSend) {
    _isHoveringSend = false;
    }
  }

  @override
  void dispose() {
    _controller.removeListener(_handleActivationChange);
    _controller.dispose();
    _focusNode.dispose();
    _animController.dispose();
    super.dispose();
  }

  void clear() {
    _controller.clear();
  }

  void _send() {
    final text = _controller.text.trim();
    if (!_isActive) return;
    widget.onSend(text);
    _controller.clear();
    _focusNode.requestFocus();
    _handleActivationChange();
  }

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: SettingsManager.instance,
      builder: (context, _) {
        final colors = SettingsManager.instance.getColorScheme();

        return Theme(
          data: Theme.of(context).copyWith(
            textSelectionTheme: TextSelectionThemeData(
              selectionColor: colors.selectionHighlight,
              selectionHandleColor: colors.text,
            ),
          ),
          child: TextField(
          controller: _controller,
          focusNode: _focusNode,
          cursorColor: colors.text,
          style: TextStyle(color: colors.text, fontSize: 16, height: 1.5),
          textInputAction: TextInputAction.send,
          onSubmitted: (_) => _send(),
          decoration: InputDecoration(
            hintText: _placeholder,
            hintStyle: TextStyle(color: colors.placeholderText),
            filled: true,
            fillColor: colors.chatControlsBackground,
            hoverColor: Colors.transparent,
            contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(30),
              borderSide: BorderSide(color: colors.chatControlsBorder, width: 1.5),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(30),
              borderSide: BorderSide(color: colors.chatControlsBorder, width: 1.5),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(30),
              borderSide: BorderSide(color: colors.chatControlsBorder, width: 1.5),
            ),
            suffixIcon: Padding(
              padding: const EdgeInsets.all(11.0),
              child: RepaintBoundary(
                child: ScaleTransition(
                  scale: _scaleAnimation,
                  child: Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      color: !_isActive
                          ? colors.sendButtonInactiveBackground
                          : _isHoveringSend
                              ? colors.sendButtonActiveHover
                              : colors.sendButtonActiveBackground,
                      shape: BoxShape.circle,
                    ),child: MouseRegion(
                      cursor: _isActive ? SystemMouseCursors.click : SystemMouseCursors.basic,
                      onEnter: (_) {
                        if (_isActive) {
                          setState(() => _isHoveringSend = true);
                        }
                      },
                      onExit: (_) {
                        if (_isActive) {
                          setState(() => _isHoveringSend = false);
                        }
                      },
                      child: GestureDetector(
                        behavior: HitTestBehavior.opaque,
                        onTap: _isActive ? _send : null,
                        child: Center(
                          child: ColorFiltered(
                            colorFilter: ColorFilter.mode(
                              _isActive
                                  ? colors.sendButtonActiveIcon
                                  : colors.sendButtonInactiveIcon,
                              BlendMode.srcIn,
                            ),
                            child: SvgPicture.asset(
                              'assets/icons/chat/send.svg',
                              width: 20,
                              height: 20,
                              fit: BoxFit.contain,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ));
      },
    );
  }
}
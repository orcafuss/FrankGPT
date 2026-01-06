import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:frankgpt/scripts/settings_script.dart';

class BasicTile extends StatefulWidget {
  final String iconPath;
  final String label;
  final VoidCallback onTap;

  const BasicTile({
    required this.iconPath,
    required this.label,
    required this.onTap,
    super.key,
  });

  @override
  State<BasicTile> createState() => _BasicTileState();
}

class _BasicTileState extends State<BasicTile> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: SettingsManager.instance,
      builder: (context, _) {
        final colors = SettingsManager.instance.getColorScheme();

        return GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: widget.onTap,
          child: MouseRegion(
            cursor: SystemMouseCursors.click,
            onEnter: (_) => setState(() => _hover = true),
            onExit: (_) => setState(() => _hover = false),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              margin: _hover ? const EdgeInsets.symmetric(horizontal: 12, vertical: 4) : const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              decoration: BoxDecoration(
                color: _hover ? colors.menuHover : Colors.transparent,
                borderRadius: _hover ? BorderRadius.circular(10) : BorderRadius.zero,
              ),
              child: Row(
                children: [
                  SvgPicture.asset(
                    widget.iconPath,
                    key: ValueKey(colors.text.toARGB32().toString() + widget.iconPath),
                    width: 24,
                    height: 24,
                    colorFilter: ColorFilter.mode(colors.text, BlendMode.srcIn),
                  ),
                  const SizedBox(width: 16),
                  Text(
                    widget.label,
                    style: TextStyle(
                      color: colors.text,
                      fontSize: 16,
                      fontFamily: 'Inter',
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class HeaderTile extends StatelessWidget {
  final String label;
  final VoidCallback onButtonPressed;

  static const double _buttonSize = 50;
  static const double _buttonMargin = 16;

  const HeaderTile({
    required this.label,
    required this.onButtonPressed,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: SettingsManager.instance,
      builder: (context, _) {
        final colors = SettingsManager.instance.getColorScheme();

        return SizedBox(
          height: 64,
          child: Stack(
            children: [
              // ───────────────────────────
              // ECHT zentrierter Text
              // ───────────────────────────
              Positioned.fill(
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: _buttonSize + _buttonMargin * 2,
                  ),
                  child: Center(
                    child: Text(
                      label,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: colors.text,
                        fontSize: 16,
                        fontFamily: 'Inter',
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ),

              Positioned(
                top: 8,
                left: _buttonMargin,
                child: _buildBackButton(context, colors),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildBackButton(BuildContext context, colors) {
    return SizedBox(
      width: _buttonSize,
      height: _buttonSize,
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
          onTap: onButtonPressed,
          child: Tooltip(
            message: "Zurück",
            waitDuration: const Duration(milliseconds: 400),
            decoration: BoxDecoration(
              color: colors.tooltipBackground,
              borderRadius: BorderRadius.circular(8),
            ),
            textStyle: Theme.of(context)
                .tooltipTheme
                .textStyle
                ?.copyWith(color: colors.tooltipText),
            child: Center(
              child: SvgPicture.asset(
                "assets/icons/system/back.svg",
                width: 25,
                height: 25,
                colorFilter: ColorFilter.mode(
                  colors.text,
                  BlendMode.srcIn,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}


class DropdownTile extends StatefulWidget {
  final String iconPath;
  final String label;
  final String value;
  final List<DropdownMenuItem<String>> items;
  final Function(String) onChanged;
  final Color Function(String)? leadingColor;

  const DropdownTile({
    required this.iconPath,
    required this.label,
    required this.value,
    required this.items,
    required this.onChanged,
    this.leadingColor,
    super.key,
  });

  @override
  State<DropdownTile> createState() => _DropdownTileState();
}

class _DropdownTileState extends State<DropdownTile> {
  bool _hover = false;
  OverlayEntry? _overlayEntry;

  String _labelFor(String value) {
    final match = widget.items.firstWhere(
      (it) => it.value == value,
      orElse: () => DropdownMenuItem(value: value, child: Text(value)),
    );
    final child = match.child;
    if (child is Text) return child.data ?? value;
    return value;
  }

  void _openCustomMenu() {
    final RenderBox box = context.findRenderObject() as RenderBox;
    final Offset position = box.localToGlobal(Offset.zero);
    final double overlayWidth = 200.0;
    final colors = SettingsManager.instance.getColorScheme();

    _overlayEntry = OverlayEntry(
      builder: (context) => Stack(
        children: [
          Positioned.fill(
            child: GestureDetector(
              onTap: _closeMenu,
              behavior: HitTestBehavior.opaque,
              child: Container(color: Colors.transparent),
            ),
          ),
          Positioned(
            left: position.dx + box.size.width - overlayWidth - 13,
            top: position.dy + box.size.height + 8,
            width: overlayWidth,
            child: Material(
              color: Colors.transparent,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(14),
                child: Container(
                  decoration: BoxDecoration(
                    color: colors.dropdownBackground,
                    borderRadius: BorderRadius.circular(14), // ← FEHLTE
                    border: Border.all(
                      color: colors.dropdownBorder,
                      width: 2,
                    ),
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: widget.items.asMap().entries.map((entry) {
                      final it = entry.value;
                      final label = (it.child is Text) ? (it.child as Text).data ?? '' : '';
                      final isSelected = it.value == widget.value;
                      bool itemHover = false;

                      return StatefulBuilder(
                        builder: (context, setStateHover) {
                          return MouseRegion(
                            cursor: SystemMouseCursors.click,
                            onEnter: (_) => setStateHover(() => itemHover = true),
                            onExit: (_) => setStateHover(() => itemHover = false),
                            child: GestureDetector(
                              behavior: HitTestBehavior.opaque,
                              onTap: () {
                                _overlayEntry?.remove();
                                _overlayEntry = null;
                                if (it.value != null && it.value != widget.value) {
                                  widget.onChanged(it.value!);
                                }
                              },
                          child: Padding(
                            padding: const EdgeInsets.all(6),
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                              decoration: BoxDecoration(
                                color: itemHover ? colors.dropdownHover : colors.dropdownBackground,
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: Row(
                                children: [
                                  if (widget.leadingColor != null)
                                    Container(
                                      width: 12,
                                      height: 12,
                                      margin: const EdgeInsets.only(right: 8),
                                      decoration: BoxDecoration(
                                        color: widget.leadingColor!(it.value ?? ''),
                                        shape: BoxShape.circle,
                                      ),
                                    ),
                                    Expanded(
                                      child: Text(
                                        label,
                                        style: TextStyle(
                                          color: colors.text,
                                          fontSize: 16,
                                          fontFamily: 'Inter',
                                        ),
                                      ),
                                    ),
                                    if (isSelected)
                                      SvgPicture.asset(
                                        'assets/icons/system/check.svg',
                                        width: 18,
                                        height: 18,
                                        colorFilter: ColorFilter.mode(colors.text, BlendMode.srcIn),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          );
                        },
                      );
                    }).toList(),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );

    Overlay.of(context).insert(_overlayEntry!);
  }

  void _closeMenu() {
    _overlayEntry?.remove();
    _overlayEntry = null;
  }

  @override
  void dispose() {
    _closeMenu();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: SettingsManager.instance,
      builder: (context, _) {
        final colors = SettingsManager.instance.getColorScheme();

        return GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: _openCustomMenu,
          child: MouseRegion(
            cursor: SystemMouseCursors.click,
            onEnter: (_) => setState(() => _hover = true),
            onExit: (_) => setState(() => _hover = false),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              decoration: BoxDecoration(
                color: _hover ? colors.menuHover : Colors.transparent,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      SvgPicture.asset(
                        widget.iconPath,
                        width: 24,
                        height: 24,
                        colorFilter: ColorFilter.mode(colors.text, BlendMode.srcIn),
                      ),
                      const SizedBox(width: 16),
                      Text(
                        widget.label,
                        style: TextStyle(
                          color: colors.text,
                          fontSize: 16,
                          fontFamily: 'Inter',
                        ),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      if (widget.leadingColor != null)
                        Container(
                          width: 12,
                          height: 12,
                          margin: const EdgeInsets.only(right: 8),
                          decoration: BoxDecoration(
                            color: widget.leadingColor!(widget.value),
                            shape: BoxShape.circle,
                          ),
                        ),
                      Text(
                        _labelFor(widget.value),
                        style: TextStyle(
                          color: colors.placeholderText,
                          fontSize: 16,
                          fontFamily: 'Inter',
                        ),
                      ),
                      const SizedBox(width: 8),
                      SvgPicture.asset(
                        'assets/icons/system/dropdown.svg',
                        width: 18,
                        height: 18,
                        colorFilter: ColorFilter.mode(colors.placeholderText, BlendMode.srcIn),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class SwitchTile extends StatefulWidget {
  final String iconPath;
  final String label;
  final bool value;
  final Function(bool) onChanged;

  const SwitchTile({
    required this.iconPath,
    required this.label,
    required this.value,
    required this.onChanged,
    super.key,
  });

  @override
  State<SwitchTile> createState() => _SwitchTileState();
}

class _SwitchTileState extends State<SwitchTile>
    with SingleTickerProviderStateMixin {
  bool _hover = false;

  late final AnimationController _controller;
  late final Animation<double> _knobPosition;
  late bool _localValue;

  static const Duration _animDuration = Duration(milliseconds: 160);

  @override
  void initState() {
    super.initState();
    _localValue = widget.value;

    _controller = AnimationController(
      vsync: this,
      duration: _animDuration,
      value: _localValue ? 1.0 : 0.0,
    );

    // Knob + Hintergrund folgen der gleichen snappy Kurve
    _knobPosition = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInCubic),
    );
  }

  @override
  void didUpdateWidget(covariant SwitchTile oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.value != widget.value) {
      _localValue = widget.value;
      if (_localValue) {
        _controller.animateTo(1.0, duration: _animDuration);
      } else {
        _controller.animateTo(0.0, duration: _animDuration);
      }
    }
  }

  void _onTapSwitch() {
    setState(() {
      _localValue = !_localValue;
    });

    if (_localValue) {
      _controller.forward();
    } else {
      _controller.reverse();
    }

    widget.onChanged(_localValue);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colors = SettingsManager.instance.getColorScheme();

    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: _onTapSwitch,
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        onEnter: (_) => setState(() => _hover = true),
        onExit: (_) => setState(() => _hover = false),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
          decoration: BoxDecoration(
            color: _hover ? colors.menuHover : Colors.transparent,
            borderRadius: _hover ? BorderRadius.circular(10) : BorderRadius.zero,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  SvgPicture.asset(
                    widget.iconPath,
                    width: 24,
                    height: 24,
                    colorFilter: ColorFilter.mode(colors.text, BlendMode.srcIn),
                  ),
                  const SizedBox(width: 16),
                  Text(
                    widget.label,
                    style: TextStyle(
                      color: colors.text,
                      fontSize: 16,
                      fontFamily: 'Inter',
                    ),
                  ),
                ],
              ),
              LayoutBuilder(builder: (context, constraints) {
                const switchWidth = 46.0;
                const switchHeight = 26.0;
                const knobSize = 20.0;
                const horizontalPadding = 3.0;
                final availableTravel = switchWidth - knobSize - horizontalPadding * 2;

                return SizedBox(
                  width: switchWidth,
                  height: switchHeight,
                  child: AnimatedBuilder(
                    animation: _knobPosition,
                    builder: (context, child) {
                      final t = _knobPosition.value;
                      final bgColor = Color.lerp(const Color(0xFF676767), const Color(0xFF0285FF), t) ?? colors.menuBackground;
                      final knobOffset = t * availableTravel;

                      return Stack(
                        children: [
                          Container(
                            width: switchWidth,
                            height: switchHeight,
                            decoration: BoxDecoration(
                              color: bgColor,
                              borderRadius: BorderRadius.circular(switchHeight / 2),
                            ),
                          ),
                          Positioned(
                            left: horizontalPadding + knobOffset,
                            top: (switchHeight - knobSize) / 2,
                            child: child!,
                          ),
                        ],
                      );
                    },
                    child: Container(
                      width: knobSize,
                      height: knobSize,
                      decoration: const BoxDecoration(
                        color: Colors.white,
                        shape: BoxShape.circle,
                      ),
                    ),
                  ),
                );
              }),
            ],
          ),
        ),
      ),
    );
  }
}
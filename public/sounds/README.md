# 🎵 Archivos de Audio para Chess Sith

Esta carpeta contiene todos los archivos de audio necesarios para el juego de ajedrez.

## 📁 Estructura de Carpetas

```
public/sounds/
├── moves/           # Sonidos de movimientos de piezas
│   ├── piece-move.mp3      # Movimiento normal de pieza
│   ├── capture.mp3         # Sonido de captura
│   ├── check.mp3           # Sonido de jaque
│   └── checkmate.mp3       # Sonido de jaque mate
├── ui/              # Sonidos de interfaz
│   ├── piece-select.mp3    # Selección de pieza
│   ├── button-click.mp3    # Clic en botones
│   └── game-start.mp3      # Inicio de partida
└── timer/           # Sonidos de temporizador
    ├── warning.mp3         # Alerta a 30 segundos
    ├── critical.mp3        # Alerta a 10 segundos
    └── time-up.mp3         # Tiempo agotado
```

## 🎯 Especificaciones de Audio

### Formato Recomendado
- **Formato**: MP3
- **Frecuencia**: 44.1 kHz
- **Bitrate**: 128 kbps
- **Canales**: Mono o Estéreo

### Duración Recomendada
- **Movimientos**: 0.1 - 0.3 segundos
- **Capturas**: 0.2 - 0.4 segundos
- **Jaque/Jaque Mate**: 0.5 - 1.0 segundos
- **UI**: 0.1 - 0.2 segundos
- **Timer**: 0.3 - 0.8 segundos

### Características de Sonido
- **Movimientos**: Sonido suave de madera o plástico
- **Capturas**: Sonido más fuerte y definido
- **Jaque**: Sonido de alerta pero no agresivo
- **Jaque Mate**: Sonido triunfal o dramático
- **Timer**: Sonidos de advertencia progresivos

## 🔧 Instalación

1. **Descarga los archivos de audio** de tu fuente preferida
2. **Convierte a MP3** si es necesario (usando Audacity, FFmpeg, etc.)
3. **Optimiza el tamaño** manteniendo buena calidad
4. **Coloca los archivos** en las carpetas correspondientes
5. **Verifica que los nombres** coincidan exactamente con los listados arriba

## 📚 Fuentes Recomendadas

### Gratuitas
- **Freesound.org**: Biblioteca de sonidos gratuitos
- **Zapsplat**: Sonidos de alta calidad (registro gratuito)
- **BBC Sound Effects**: Efectos de sonido profesionales

### De Pago
- **AudioJungle**: Sonidos profesionales
- **Pond5**: Biblioteca extensa de efectos
- **Splice**: Sonidos modernos y de alta calidad

## 🎨 Creación de Sonidos

### Herramientas Recomendadas
- **Audacity**: Editor de audio gratuito
- **GarageBand**: Para usuarios de Mac
- **FL Studio**: Para usuarios avanzados
- **Online**: Herramientas web como AudioMass

### Consejos de Producción
1. **Normaliza el volumen** a -12dB para evitar clipping
2. **Aplica fade in/out** de 10-20ms para evitar clicks
3. **Usa compresión suave** para consistencia
4. **Mantén la consistencia** entre todos los sonidos
5. **Prueba en diferentes dispositivos** antes de finalizar

## ⚠️ Notas Importantes

- Los archivos deben tener **exactamente** los nombres especificados
- El formato debe ser **MP3** para compatibilidad web
- El tamaño total recomendado es **menos de 2MB** para todos los archivos
- Los sonidos deben ser **no intrusivos** y apropiados para el tema Sith

## 🚀 Próximos Pasos

Una vez que tengas los archivos de audio:
1. Colócalos en las carpetas correspondientes
2. Reinicia el servidor de desarrollo
3. Prueba los sonidos en el juego
4. Ajusta el volumen en la configuración si es necesario

¡Los sonidos mejorarán significativamente la experiencia de juego!

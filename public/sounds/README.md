# Archivos de Audio para Chess Sith

## 📁 Estructura de Carpetas

```
public/sounds/
├── moves/
│   ├── piece-move.mp3    # Sonido al mover una pieza
│   ├── capture.mp3       # Sonido al capturar una pieza
│   ├── check.mp3         # Sonido de jaque
│   └── checkmate.mp3     # Sonido de jaque mate
├── timer/
│   ├── warning.mp3       # Advertencia de tiempo (30s restantes)
│   ├── critical.mp3      # Tiempo crítico (10s restantes)
│   └── time-up.mp3       # Tiempo agotado
└── README.md
```

## 🎵 Especificaciones de Audio

### **Formato Recomendado:**
- **Formato:** MP3
- **Calidad:** 128-192 kbps
- **Frecuencia:** 44.1 kHz
- **Duración:** 0.5 - 2 segundos

### **Descripción de Sonidos:**

#### **Moves (Movimientos):**
- **`piece-move.mp3`**: Sonido suave y sutil para movimientos normales
- **`capture.mp3`**: Sonido más impactante para capturas
- **`check.mp3`**: Sonido de alerta para jaques
- **`checkmate.mp3`**: Sonido dramático para jaque mate

#### **Timer (Temporizador):**
- **`warning.mp3`**: Sonido de advertencia suave
- **`critical.mp3`**: Sonido de urgencia más intenso
- **`time-up.mp3`**: Sonido final cuando se agota el tiempo

## 🔄 Cómo Reemplazar los Archivos

### **Opción 1: Archivos MP3 Reales**
1. Descarga o crea archivos de audio en formato MP3
2. Nombra los archivos exactamente como se muestra arriba
3. Reemplaza los archivos temporales en las carpetas correspondientes

### **Opción 2: Generar Audio con IA**
Puedes usar herramientas como:
- **ElevenLabs** - Generación de audio con IA
- **Mubert** - Música generada por IA
- **AIVA** - Composición musical con IA

### **Opción 3: Efectos de Sonido Gratuitos**
Sitios web recomendados:
- **Freesound.org** - Biblioteca de efectos gratuitos
- **Zapsplat** - Efectos de sonido profesionales
- **BBC Sound Effects** - Efectos de la BBC

## ⚠️ Notas Importantes

1. **Nombres de Archivos**: Deben coincidir exactamente con los nombres mostrados
2. **Formato MP3**: Asegúrate de que los archivos estén en formato MP3
3. **Tamaño**: Mantén los archivos pequeños (< 100KB cada uno)
4. **Calidad**: Usa una calidad de audio apropiada para web

## 🎮 Personalización

Puedes personalizar los sonidos según tu preferencia:
- **Tema Sith**: Usar sonidos más oscuros y dramáticos
- **Tema Trading**: Usar sonidos más profesionales y alertas
- **Tema Gaming**: Usar sonidos más lúdicos y divertidos

## 🚀 Después de Reemplazar

Una vez que hayas reemplazado los archivos:
1. Reinicia el servidor de desarrollo (`npm run dev`)
2. Los errores 404 deberían desaparecer
3. Los sonidos se reproducirán correctamente durante el juego

## 📱 Compatibilidad Móvil

Los archivos de audio están optimizados para:
- **Navegadores modernos** (Chrome, Firefox, Safari, Edge)
- **Dispositivos móviles** (iOS, Android)
- **Reproducción automática** (con permisos del usuario)

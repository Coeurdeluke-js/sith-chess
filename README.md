# 🎯 Chess Sith - Ajedrez con Temática Sith

Un juego de ajedrez elegante y minimalista con temática Sith, desarrollado en Next.js 14.

## ✨ Características

- **🎮 Ajedrez funcional** contra IA
- **🎭 Temática Sith** con colores oscuros y elegantes
- **📱 Diseño responsive** y minimalista
- **🎨 Piezas SVG personalizadas** estilo chess.com
- **⚡ Navegación fluida** con sidebar integrada
- **🎬 Modal de presentación** elegante
- **📚 Página de ayuda** completa
- **⚙️ Configuración personalizable**
- **🖼️ Galería de arte Sith**

## 🏗️ Estructura del Proyecto

```
chess-sith/
├── app/
│   ├── inicio/              # Página principal con navegación por pestañas
│   ├── chess/               # Página del juego de ajedrez
│   ├── ayuda/               # Manual de reglas y estrategias
│   ├── configuracion/       # Ajustes del sistema
│   ├── art-gallery/         # Galería de arte Sith
│   ├── globals.css          # Estilos globales
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Redirección a /inicio
├── components/
│   ├── ChessPiece.tsx       # Componente de piezas de ajedrez
│   ├── Sidebar.tsx          # Barra lateral de navegación
│   ├── OpeningModal.tsx     # Modal de presentación inicial
│   └── GameStartAnimation.tsx # Animación de inicio de partida
├── public/
│   ├── logo.png             # Logo de Crypto Force
│   └── art-gallery/         # Imágenes SVG de arte Sith
└── tailwind.config.js       # Configuración de Tailwind CSS
```

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd chess-sith
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:3000`

## 🎮 Cómo Jugar

### 1. Navegación
- **Inicio**: Página principal con información del proyecto
- **Ajedrez**: Juego funcional contra IA
- **Ayuda**: Manual completo de reglas y estrategias
- **Configuración**: Ajustes personalizables
- **Galería**: Arte Sith en carrusel automático

### 2. Jugar Ajedrez
- Ve a `/chess`
- Presiona "Iniciar Partida" para comenzar
- Juega con las piezas blancas contra la IA
- La IA responde automáticamente después de cada movimiento

### 3. Características del Juego
- **Piezas sólidas** estilo chess.com
- **Visualización de movimientos válidos**
- **Historial de movimientos**
- **Estado del juego en tiempo real**
- **Animaciones sutiles y elegantes**

## 🎨 Personalización

### Colores del Tema
- **Primario**: `#121212` (Negro profundo)
- **Acento**: `#ec4d58` (Rojo Sith)
- **Texto**: `#fafafa` (Blanco)
- **Secundario**: `#8a8a8a` (Gris)

### Tipografía
- **Inter** - Fuente principal del proyecto

## 🔧 Tecnologías

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **Chess.js** - Lógica del juego de ajedrez
- **Lucide React** - Iconos elegantes

## 📱 Responsive Design

- **Desktop**: Layout completo con sidebar y contenido principal
- **Tablet**: Adaptación automática del contenido
- **Mobile**: Navegación optimizada para dispositivos táctiles

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Otros proveedores
```bash
npm run build
npm start
```

## 📄 Licencia

Este proyecto es parte de **Crypto Force - Trading Team** y está diseñado para educación financiera a través del ajedrez.

---

**¡Que la Fuerza te acompañe en cada partida!** ⚡ 
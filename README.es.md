# OpenClaw Agent Router

**Sistema de Enrutamiento Inteligente de Agentes** - Permitir que OpenClaw llame automáticamente al Agente más adecuado

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Plugin-green.svg)](https://github.com/openclaw/openclaw)

---

## 🌍 Documentación Multi-idioma

| Idioma | Documentación |
|--------|---------------|
| 🇨🇳 中文 | [README.md](README.md) |
| 🇬🇧 English | [README.en.md](README.en.md) |
| 🇯🇵 日本語 | [README.ja.md](README.ja.md) |
| 🇰🇷 한국어 | [README.ko.md](README.ko.md) |
| 🇫🇷 Français | [README.fr.md](README.fr.md) |
| 🇪🇸 Español | [README.es.md](README.es.md) |

---

## 🎯 Características Principales

### 1. Enrutamiento Automático
Llama automáticamente al Agente más apropiado según el tipo de tarea：
- Diseño de Juegos → Equipo de Planificadores IA
- Análisis de Datos → Analista de Datos IA
- Redacción de Artículos → Equipo Editorial
- Problemas de Código → Equipo de Desarrolladores IA

### 2. Recomendaciones Inteligentes
Cuando no se cumplen las condiciones de llamada automática, recomienda activamente los Agentes relevantes.

### 3. Escaneo en Tiempo Real
Escanea en tiempo real la carpeta `agents/` y obtiene dinámicamente la lista de Agentes disponibles.

### 4. Colaboración Multi-Agente
Descompone automáticamente las tareas complejas y llama a múltiples Agentes para colaborar.

---

## 🚀 Inicio Rápido

### Instalación Cero Configuración (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/JingWang-Star996/openclaw-agent-router.git

# Ejecutar el script de instalación cero configuración
cd openclaw-agent-router
chmod +x scripts/install.sh
./scripts/install.sh
```

**El script de instalación completa automáticamente**：
1. ✅ Copia los Skills al espacio de trabajo
2. ✅ Inyección automática en SOUL.md (agrega reglas de llamada automática, conserva el contenido existente)
3. ✅ Verifica la instalación

**¡Sin configuración manual necesaria!** Después de la instalación, la IA principal llama automáticamente a los Agentes.

---

## 🔒 Garantía de Seguridad

**Método de procesamiento de SOUL.md**：
- **No existe** → Crea un archivo completo (con reglas)
- **Existe pero sin reglas** → Inyección incremental (inserta al principio del archivo, conserva todo el contenido existente)
- **Ya tiene reglas** → Omite (evita duplicados)

---

## 📊 Métricas de Rendimiento

| Métrica | Valor |
|---------|-------|
| Velocidad de escaneo | ~0.5 segundos (100 Agentes) |
| Velocidad de coincidencia | <100ms |
| Tasa de aciertos de caché | 85%+ (misma conversación) |
| Precisión de enrutamiento | 90%+ (basado en pruebas) |

---

## 📋 Reglas de Enrutamiento

| Tipo de Tarea | Llamada Automática |
|---------------|-------------------|
| Diseño de Juegos/Numérico/Sistema | AI Planificador Jefe → Distribuye a planificadores especializados |
| Retención/Pago/Análisis de Datos | AI Analista de Datos + AI Planificador Numérico |
| Gestión de Proyectos/Calendario/Recursos | PMO Jefe de Proyecto |
| Redacción de Artículos/Informe Semanal | Equipo Editorial/AI Informe Semanal |
| Código/Técnica | AI Desarrollador Jefe |
| Arte/UX | AI Director de Arte + UX Designer |
| Recursos Humanos | AI Departamento de RRHH |
| Gestión de Calidad | AI Departamento de Calidad |
| Operaciones/Eventos | AI Director de Operaciones + Operaciones de Usuarios |

---

## 🏗️ Estructura del Proyecto

```
openclaw-agent-router/
├── README.md                 # Este documento
├── LICENSE                   # Licencia MIT
├── package.json              # Configuración del proyecto
├── src/                      # Código fuente
│   ├── scanner.js            # Escáner de Agentes en tiempo real
│   ├── router.js             # Lógica central de enrutamiento
│   └── matcher.js            # Motor de coincidencia inteligente
├── docs/                     # Documentación
│   ├── ARCHITECTURE.md       # Diseño de arquitectura
│   ├── QUICKSTART.md         # Guía de inicio rápido
│   └── RELEASE.md            # Guía de publicación
└── skills/                   # Skills de OpenClaw
    ├── auto-agent-router/    # Skill de enrutamiento automático
    └── agent-scanner/        # Skill de escaneo en tiempo real
```

---

## 🤝 Contribución

¡Las Issues y Pull Requests son bienvenidas!

---

## 📄 Licencia

Licencia MIT

---

## 🙏 Agradecimientos

- **Inspiración**: Necesidad de colaboración multi-Agente en OpenClaw
- **Soporte de Plataforma**: [OpenClaw](https://github.com/openclaw/openclaw)
- **Validación en Condiciones Reales**: Equipo AI de la Agencia de Diseño ZVP (100+ Agentes)

---

**Hecho con ❤️ para la Comunidad OpenClaw**

**Última Actualización**: 2026-04-05

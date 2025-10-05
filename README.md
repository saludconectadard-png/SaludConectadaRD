# Salud Conectada RD

> Plataforma digital para optimizar la gestión de citas médicas y conectar voluntarios en centros de salud comunitarios de la República Dominicana.

## 📋 Descripción del Proyecto

Salud Conectada RD es una aplicación web que facilita el acceso a servicios de salud mediante la automatización de procesos de solicitud de citas médicas y la coordinación de redes de voluntarios. La plataforma conecta a pacientes con centros de salud y voluntarios de manera eficiente y segura.

### Características Principales

- **Gestión de Citas Médicas**: Sistema automatizado para solicitar y gestionar citas médicas
- **Red de Voluntarios**: Plataforma para registro y coordinación de voluntarios en centros de salud
- **Sistema de Donaciones**: Facilita donaciones de medicamentos y suministros médicos
- **Chatbot Inteligente**: Asistente virtual con IA para orientación inicial
- **Detección de Urgencias**: Análisis automático de casos urgentes mediante IA
- **Notificaciones**: Sistema de confirmación vía WhatsApp y email

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Formularios**: React Hook Form, Zod
- **IA**: Google Genkit, OpenRouter API
- **Integraciones**: N8N webhooks
- **Hosting**: Netlify/Vercel

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- Node.js 20.x o superior
- npm, yarn o pnpm

### Configuración Local

1. **Clonar el repositorio**

   ```bash
   git clone <repository-url>
   cd salud-conectada-rd
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   ```bash
   cp .env.example .env.local
   # Editar .env.local con las credenciales necesarias
   ```

4. **Ejecutar en desarrollo**

   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación**
   - Aplicación: http://localhost:3000
   - Genkit (IA): `npm run genkit:dev`

### Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo con Turbopack
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
npm run typecheck    # Verificación de tipos TypeScript
npm run genkit:dev   # Servidor de desarrollo Genkit
```

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/                 # App Router (Next.js 15)
│   ├── citas/          # Páginas de gestión de citas
│   ├── voluntarios/    # Páginas de voluntarios
│   ├── donar/          # Páginas de donaciones
│   └── layout.tsx      # Layout principal
├── components/         # Componentes React
│   └── ui/            # Componentes UI reutilizables
├── hooks/             # Custom hooks
├── lib/               # Utilidades y configuraciones
└── ai/                # Flujos de IA con Genkit
```

## 🔧 Configuración de Producción

### Variables de Entorno Requeridas

```env
# APIs de IA
OPENROUTER_API_KEY=your_openrouter_key
GOOGLE_GENAI_API_KEY=your_google_ai_key

# Webhooks N8N
N8N_WEBHOOK_BASE_URL=your_n8n_base_url
```

### Despliegue

La aplicación está configurada para desplegarse en Firebase App Hosting:

```bash
npm run build
# El despliegue se maneja automáticamente via apphosting.yaml
```

## 🤝 Contribución

### Flujo de Desarrollo

1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### Estándares de Código

- TypeScript estricto
- Componentes funcionales con hooks
- Tailwind CSS para estilos
- Validación con Zod
- Documentación JSDoc para funciones complejas

## 📞 Contacto

Para consultas sobre el proyecto: saludconectadard@gmail.com

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

# Sistema de Chat

## Estructura de Archivos

```
chat/
├── components/           # Componentes reutilizables del chat
│   ├── ChatHeader.tsx    # Encabezado del chat con información del usuario
│   ├── ChatInput.tsx     # Campo de entrada para mensajes
│   ├── ChatListItem.tsx  # Vista previa de un chat en la lista
│   └── ChatMessages.tsx  # Lista de mensajes del chat
├── hooks/                # Hooks personalizados
│   ├── useChats.ts       # Hook para manejar la lógica de chats
│   └── useCurrentChat.ts # Hook para manejar el chat actual
├── types/                # Tipos y interfaces
│   └── index.ts          # Definiciones de tipos compartidos
├── ChatListPage.tsx      # Página principal de lista de chats
└── ChatPage.tsx          # Página de chat individual
```

## Componentes

### ChatListPage
Página principal que muestra la lista de chats disponibles. Utiliza `ChatListItem` para mostrar cada chat.

### ChatPage
Página de chat individual que muestra la conversación con un usuario específico.

### Componentes Reutilizables

- **ChatHeader**: Muestra información del usuario con quien se está chateando
- **ChatInput**: Campo de entrada para enviar mensajes
- **ChatListItem**: Vista previa de un chat en la lista
- **ChatMessages**: Contenedor de la lista de mensajes

## Hooks

### useChats
Hook personalizado que maneja:
- Carga de chats
- Estados de carga y error
- Actualización de chats

### useCurrentChat
Hook personalizado que maneja:
- Carga del chat actual
- Envío de mensajes
- Estado de "escribiendo..."
- Manejo de errores

## Tipos

Definiciones de tipos compartidos para:
- ChatPreview: Vista previa de un chat en la lista
- ChatMessage: Mensaje individual con soporte para archivos adjuntos
- Chat: Chat completo con todos sus participantes y mensajes

## Características

- Mensajes en tiempo real
- Indicador de "escribiendo..."
- Soporte para archivos adjuntos
- Indicador de mensajes no leídos
- Diseño responsivo
- Manejo de errores
- Estados de carga 
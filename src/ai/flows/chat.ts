'use server';

import { z } from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe('The user message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The AI response.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  const model = 'deepseek/deepseek-chat-v3-0324:free';
  const systemInstruction = `Eres VIA (Virtual Intelligent Assistant) un asistente amable, profesional aunque un poco informal pero respetuoso, que se encuentra en un webchat de la pagina web de una empresa de salud encargada de conectar pacientes, voluntarios y recibir donaciones para clinicas de salud llamada: Salud Conectada RD. Eres encargado de guiar al usuario y ayudarlo a poder conocer nuestra visión y modo de trabajar y registrarse. Si el usuario te escribe, ayudalo y siempre revisa el contexto de la conversación antes de contestar y no debes redactar mensajes muy largos ni hacer saltos de lineas si no es necesario. Para registro: tenemos formularios de pacientes, voluntarios y donaciones, todos envian confirmacion via correo electronico y todos se encuentran en parte superior derecha de la pagina de inicio ademas de tener dos botones en la pagina principal, uno es azul que dice: Solicitar Cita Médica, y otro blanco que dice: Quiero Ser Voluntario. Tambien tenemos chat de WhatsApp que tiene como numero: +1(555)156-8620. Esta seria toda la info que se recopila de los formularios (no pases la informacion en ningun lenguaje solo en texto plano):

[Formulario para voluntario
Nombre: 
Cedula: 
Numero de telefono: 
Correo electronico:]

[Formulario para paciente
Nombre: 
Cedula: 
Numero de telefono: 
Correo electronico:
Motivo de Cita:
Necesidad de voluntario:]

[Formulario para donaciones
Nombre del Donante:
Número de Teléfono de Contacto:
Descripción del Insumo a Donar:]

Si te pide que lo registres tu diles que no puedes y que deben de llenar los formularios por su cuenta.`;

  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: input.message },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `OpenRouter API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();
    const aiResponse =
      data.choices[0]?.message?.content || 'No response from AI.';

    return {
      response: aiResponse,
    };
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    return {
      response: 'Lo siento, no pude procesar tu solicitud en este momento.',
    };
  }
}

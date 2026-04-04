'use server';

import { chat } from '@/ai/flows/chat';
import { WEBHOOK_URLS, WEBHOOK_CONFIG, RESPONSE_MESSAGES } from '@/lib/constants';
import { citaSchema, voluntarioSchema, donacionSchema } from '@/lib/schemas';

export interface FormResponse {
  message: string;
  status: 'success' | 'error';
}

function formatPhoneNumber(phone: string): string {
  return `1${phone.replace(/\D/g, '')}`;
}

async function sendToWebhook(
  url: string,
  data: Record<string, unknown>
): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), WEBHOOK_CONFIG.TIMEOUT_MS);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [WEBHOOK_CONFIG.SECRET_HEADER]: WEBHOOK_CONFIG.SECRET,
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    return response.ok;
  } catch (error) {
    console.error('Error sending to webhook:', error);
    return false;
  }
}

export async function handleAppointmentSubmission(
  prevState: unknown,
  data: unknown
): Promise<FormResponse> {
  try {
    const validated = citaSchema.safeParse(data);
    if (!validated.success) {
      return { message: 'Datos inválidos.', status: 'error' };
    }
    const formattedPhone = formatPhoneNumber(validated.data.telefono);
    const success = await sendToWebhook(WEBHOOK_URLS.citas, {
      ...validated.data,
      telefono: formattedPhone,
    });
    return {
      message: success ? RESPONSE_MESSAGES.SUCCESS.CITA : RESPONSE_MESSAGES.ERROR.CITA,
      status: success ? 'success' : 'error',
    };
  } catch (error) {
    console.error('Error submitting appointment form:', error);
    return { message: RESPONSE_MESSAGES.ERROR.CITA, status: 'error' };
  }
}

export async function handleVolunteerSubmission(
  prevState: unknown,
  data: unknown
): Promise<FormResponse> {
  try {
    const validated = voluntarioSchema.safeParse(data);
    if (!validated.success) {
      return { message: 'Datos inválidos.', status: 'error' };
    }
    const formattedPhone = formatPhoneNumber(validated.data.telefono);
    const success = await sendToWebhook(WEBHOOK_URLS.voluntarios, {
      ...validated.data,
      telefono: formattedPhone,
    });
    return {
      message: success ? RESPONSE_MESSAGES.SUCCESS.VOLUNTARIO : RESPONSE_MESSAGES.ERROR.VOLUNTARIO,
      status: success ? 'success' : 'error',
    };
  } catch (error) {
    console.error('Error submitting volunteer form:', error);
    return { message: RESPONSE_MESSAGES.ERROR.VOLUNTARIO, status: 'error' };
  }
}

export async function handleDonationSubmission(
  prevState: unknown,
  data: unknown
): Promise<FormResponse> {
  try {
    const validated = donacionSchema.safeParse(data);
    if (!validated.success) {
      return { message: 'Datos inválidos.', status: 'error' };
    }
    const formattedPhone = formatPhoneNumber(validated.data.telefonoContacto);
    const success = await sendToWebhook(WEBHOOK_URLS.donaciones, {
      ...validated.data,
      telefonoContacto: formattedPhone,
    });
    return {
      message: success ? RESPONSE_MESSAGES.SUCCESS.DONACION : RESPONSE_MESSAGES.ERROR.DONACION,
      status: success ? 'success' : 'error',
    };
  } catch (error) {
    console.error('Error submitting donation form:', error);
    return { message: RESPONSE_MESSAGES.ERROR.DONACION, status: 'error' };
  }
}

export async function handleChatSubmission(
  userMessage: string
): Promise<string> {
  try {
    const response = await chat({ message: userMessage });
    return response.response;
  } catch (error) {
    console.error('Error al contactar el flow de chat:', error);
    return RESPONSE_MESSAGES.ERROR.CHAT;
  }
}

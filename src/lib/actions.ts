'use server';

import { chat } from '@/ai/flows/chat';
import { WEBHOOK_URLS, RESPONSE_MESSAGES } from '@/lib/constants';

export interface FormResponse {
  message: string;
  status: 'success' | 'error';
}

function formatPhoneNumber(phone: string): string {
  return `1${phone.replace(/\D/g, '')}`;
}

async function sendToWebhook(
  url: string,
  data: Record<string, any>
): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch (error) {
    console.error('Error sending to webhook:', error);
    return false;
  }
}

export async function handleAppointmentSubmission(
  prevState: any,
  data: any
): Promise<FormResponse> {
  try {
    const formattedPhone = formatPhoneNumber(data.telefono);
    const dataToSend = { ...data, telefono: formattedPhone };

    const success = await sendToWebhook(WEBHOOK_URLS.citas, dataToSend);

    return {
      message: success
        ? RESPONSE_MESSAGES.SUCCESS.CITA
        : RESPONSE_MESSAGES.ERROR.CITA,
      status: success ? 'success' : 'error',
    };
  } catch (error) {
    console.error('Error submitting appointment form:', error);
    return {
      message: RESPONSE_MESSAGES.ERROR.CITA,
      status: 'error',
    };
  }
}

export async function handleVolunteerSubmission(
  prevState: any,
  data: any
): Promise<FormResponse> {
  try {
    const formattedPhone = formatPhoneNumber(data.telefono);
    const dataToSend = { ...data, telefono: formattedPhone };

    const success = await sendToWebhook(WEBHOOK_URLS.voluntarios, dataToSend);

    return {
      message: success
        ? RESPONSE_MESSAGES.SUCCESS.VOLUNTARIO
        : RESPONSE_MESSAGES.ERROR.VOLUNTARIO,
      status: success ? 'success' : 'error',
    };
  } catch (error) {
    console.error('Error submitting volunteer form:', error);
    return {
      message: RESPONSE_MESSAGES.ERROR.VOLUNTARIO,
      status: 'error',
    };
  }
}

export async function handleDonationSubmission(
  prevState: any,
  data: any
): Promise<FormResponse> {
  try {
    const formattedPhone = formatPhoneNumber(data.telefonoContacto);
    const dataToSend = { ...data, telefonoContacto: formattedPhone };

    const success = await sendToWebhook(WEBHOOK_URLS.donaciones, dataToSend);

    return {
      message: success
        ? RESPONSE_MESSAGES.SUCCESS.DONACION
        : RESPONSE_MESSAGES.ERROR.DONACION,
      status: success ? 'success' : 'error',
    };
  } catch (error) {
    console.error('Error submitting donation form:', error);
    return {
      message: RESPONSE_MESSAGES.ERROR.DONACION,
      status: 'error',
    };
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

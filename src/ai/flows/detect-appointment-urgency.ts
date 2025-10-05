'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DetectAppointmentUrgencyInputSchema = z.object({
  issueDescription: z
    .string()
    .describe('The patient-provided description of their medical issue.'),
});
export type DetectAppointmentUrgencyInput = z.infer<
  typeof DetectAppointmentUrgencyInputSchema
>;

const DetectAppointmentUrgencyOutputSchema = z.object({
  isUrgent: z.boolean().describe('Whether the described issue is urgent.'),
  reason: z
    .string()
    .describe(
      'The reason for the urgency determination, providing context for the decision.'
    ),
  suggestedAction: z
    .string()
    .optional()
    .describe(
      'A suggested action for the patient, such as seeking immediate medical attention or consulting online resources.'
    ),
});
export type DetectAppointmentUrgencyOutput = z.infer<
  typeof DetectAppointmentUrgencyOutputSchema
>;

export async function detectAppointmentUrgency(
  input: DetectAppointmentUrgencyInput
): Promise<DetectAppointmentUrgencyOutput> {
  return detectAppointmentUrgencyFlow(input);
}

const detectAppointmentUrgencyPrompt = ai.definePrompt({
  name: 'detectAppointmentUrgencyPrompt',
  input: { schema: DetectAppointmentUrgencyInputSchema },
  output: { schema: DetectAppointmentUrgencyOutputSchema },
  prompt: `You are an AI assistant designed to determine the urgency of medical issues described by patients seeking appointments.

  Based on the following issue description, assess whether the issue is urgent and requires immediate attention. Provide a reason for your determination.

  If the issue is deemed urgent, suggest an appropriate action for the patient.

  Issue Description: {{{issueDescription}}}
  `,
});

const detectAppointmentUrgencyFlow = ai.defineFlow(
  {
    name: 'detectAppointmentUrgencyFlow',
    inputSchema: DetectAppointmentUrgencyInputSchema,
    outputSchema: DetectAppointmentUrgencyOutputSchema,
  },
  async (input: DetectAppointmentUrgencyInput) => {
    const { output } = await detectAppointmentUrgencyPrompt(input);
    return output!;
  }
);

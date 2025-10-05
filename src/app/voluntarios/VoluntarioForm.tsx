'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { voluntarioSchema, VoluntarioSchema } from '@/lib/schemas';
import { handleVolunteerSubmission } from '@/lib/actions';

const areasDeInteres = [
  {
    id: 'acompanamiento',
    label: 'Acompañar a pacientes a centros de salud.',
  },
  {
    id: 'logistica',
    label: 'Apoyo en logística de donaciones.',
  },
  {
    id: 'brigadas',
    label: 'Participar en brigadas comunitarias (apoyo emocional/logístico).',
  },
  {
    id: 'administrativo',
    label: 'Apoyo en tareas administrativas y de oficina.',
  },
  {
    id: 'eventos',
    label: 'Ayuda en la organización de eventos para recaudar fondos.',
  },
  {
    id: 'charlas',
    label: 'Participar en charlas y talleres sobre salud preventiva.',
  },
  {
    id: 'transporte',
    label: 'Facilitar transporte para pacientes sin movilidad.',
  },
] as const;

export function VoluntarioForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<VoluntarioSchema>({
    resolver: zodResolver(voluntarioSchema),
    defaultValues: {
      nombreCompleto: '',
      cedula: '',
      telefono: '',
      email: '',
      areasInteres: [],
      disponibilidad: '',
    },
  });

  function onSubmit(data: VoluntarioSchema) {
    startTransition(async () => {
      const result = await handleVolunteerSubmission(null, data);
      if (result.status === 'success') {
        toast({
          title: '¡Registro Exitoso!',
          description:
            '¡Bienvenido al equipo! Nos pondremos en contacto contigo muy pronto para coordinar los siguientes pasos.',
        });
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Error en el registro',
          description: result.message,
        });
      }
    });
  }

  return (
    <Card className="mx-auto mt-8 max-w-2xl">
      <CardHeader>
        <CardTitle>Formulario de Registro</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nombreCompleto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Ana Rodríguez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cedula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cédula de Identidad</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. 001-1234567-8" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Ej. 809-123-4567"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ejemplo@correo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="areasInteres"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Áreas de Interés
                    </FormLabel>
                    <FormDescription>
                      Selecciona una o más áreas en las que te gustaría
                      colaborar.
                    </FormDescription>
                  </div>
                  {areasDeInteres.map((item) => (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([
                                  ...(field.value || []),
                                  item.id,
                                ])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="disponibilidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disponibilidad Horaria</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej. Lunes y Miércoles por la tarde, fines de semana."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Registrarme como Voluntario
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

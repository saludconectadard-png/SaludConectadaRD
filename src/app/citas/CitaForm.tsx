'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTransition, useState } from 'react';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { citaSchema, CitaSchema } from '@/lib/schemas';
import { handleAppointmentSubmission } from '@/lib/actions';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const clinicasRD = {
  'Clínica Independencia':
    'https://www.google.com/maps?q=Clínica+Independencia,+Santo+Domingo,+República+Dominicana&output=embed',
  'Hospital Central de las Fuerzas Armadas':
    'https://www.google.com/maps?q=Hospital+Central+de+las+Fuerzas+Armadas,+Santo+Domingo,+República+Dominicana&output=embed',
  'Clínica San José':
    'https://www.google.com/maps?q=Clínica+San+José,+Santo+Domingo,+República+Dominicana&output=embed',
  'Centro Médico UCE':
    'https://www.google.com/maps?q=Centro+Médico+UCE,+Santo+Domingo,+República+Dominicana&output=embed',
  'Hospital Docente Padre Billini':
    'https://www.google.com/maps?q=Hospital+Docente+Padre+Billini,+Santo+Domingo,+República+Dominicana&output=embed',
};

const generateTimeSlots12Hour = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of [0, 30]) {
      const isPM = hour >= 12;
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const formattedHour = String(displayHour).padStart(2, '0');
      const formattedMinute = String(minute).padStart(2, '0');
      const ampm = isPM ? 'PM' : 'AM';
      slots.push(`${formattedHour}:${formattedMinute} ${ampm}`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots12Hour();

export function CitaForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [selectedClinic, setSelectedClinic] = useState<string | null>(null);

  const form = useForm<CitaSchema>({
    resolver: zodResolver(citaSchema),
    defaultValues: {
      nombreCompleto: '',
      cedula: '',
      edad: '',
      telefono: '',
      email: '',
      centroSalud: '',
      fechaCita: '',
      horaCita: '',
      motivoCita: '',
      necesitaAcompanante: false,
    },
  });

  function onSubmit(data: CitaSchema) {
    startTransition(async () => {
      const result = await handleAppointmentSubmission(null, data);
      if (result.status === 'success') {
        toast({
          title: '¡Solicitud Enviada!',
          description:
            'Hemos recibido tu solicitud. Recibirás una confirmación por correo electrónico pronto.',
        });
        form.reset();
        setSelectedClinic(null);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error al enviar',
          description: result.message,
        });
      }
    });
  }

  return (
    <Card className="mx-auto mt-8 max-w-2xl">
      <CardHeader>
        <CardTitle>Formulario de Solicitud</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Nombre */}
            <FormField
              control={form.control}
              name="nombreCompleto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cédula */}
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

            {/* Edad */}
            <FormField
              control={form.control}
              name="edad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione su edad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 100 }, (_, i) => i + 1).map(
                        (age) => (
                          <SelectItem key={age} value={String(age)}>
                            {age} años
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Teléfono */}
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Teléfono (WhatsApp)</FormLabel>
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

            {/* Email */}
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

            {/* Centro de salud */}
            <FormField
              control={form.control}
              name="centroSalud"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Centro de Salud</FormLabel>
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val);
                      setSelectedClinic(val);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un centro" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(clinicasRD).map((clinica) => (
                        <SelectItem key={clinica} value={clinica}>
                          {clinica}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Mapa*/}
            {selectedClinic && (
              <div className="w-full h-[300px] rounded-xl overflow-hidden border shadow-md">
                <iframe
                  src={clinicasRD[selectedClinic as keyof typeof clinicasRD]}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            )}

            {/* Fecha y hora */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fechaCita"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de la Cita</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(
                                parse(field.value, 'dd/MM/yyyy', new Date()),
                                'PPP',
                                { locale: es }
                              )
                            ) : (
                              <span>Seleccione una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value
                              ? parse(field.value, 'dd/MM/yyyy', new Date())
                              : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(
                              date ? format(date, 'dd/MM/yyyy') : ''
                            )
                          }
                          disabled={(date) =>
                            date < new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="horaCita"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora de la Cita</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Motivo */}
            <FormField
              control={form.control}
              name="motivoCita"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo de la Cita</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describa su problema de salud..."
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Acompañante */}
            <FormField
              control={form.control}
              name="necesitaAcompanante"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      ¿Necesita un voluntario para acompañamiento?
                    </FormLabel>
                    <FormDescription>
                      Marque esta casilla si necesita que un voluntario le
                      acompañe a su cita.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* Botón */}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enviar Solicitud
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

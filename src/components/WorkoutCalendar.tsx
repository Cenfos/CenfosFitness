import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog } from '@headlessui/react';

interface Event {
  id: string;
  title: string;
  start: string;
  end?: string;
  backgroundColor?: string;
  workout: {
    type: string;
    exercises: string[];
  };
}

export default function WorkoutCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = (arg: { date: Date; dateStr: string }) => {
    const title = prompt('¿Qué entrenamiento quieres programar?');
    if (title) {
      const newEvent: Event = {
        id: new Date().getTime().toString(),
        title,
        start: arg.dateStr,
        backgroundColor: '#22c55e',
        workout: {
          type: title,
          exercises: ['Dominadas', 'Flexiones', 'Fondos']
        }
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleEventClick = (arg: { event: any }) => {
    const event = {
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.startStr,
      workout: arg.event.extendedProps.workout
    };
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="mb-6 flex justify-end space-x-4">
        <button
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          onClick={() => {
            const workouts = events.map(event => ({
              fecha: event.start,
              entrenamiento: event.title
            }));
            const blob = new Blob([JSON.stringify(workouts, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'calendario-entrenamientos.json';
            a.click();
          }}
        >
          Descargar Calendario
        </button>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="es"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth'
        }}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
        selectable={true}
        height="auto"
      />

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
            {selectedEvent && (
              <>
                <Dialog.Title className="text-2xl font-bold mb-4">
                  {selectedEvent.title}
                </Dialog.Title>
                <div className="space-y-4">
                  <p>
                    <span className="font-medium">Fecha:</span>{' '}
                    {new Date(selectedEvent.start).toLocaleDateString('es-ES')}
                  </p>
                  <div>
                    <h3 className="font-medium mb-2">Ejercicios:</h3>
                    <ul className="list-disc list-inside">
                      {selectedEvent.workout.exercises.map((exercise, index) => (
                        <li key={index}>{exercise}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
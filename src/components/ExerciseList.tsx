import { useState } from 'react';
import ExerciseModal from './ExerciseModal';

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
  description: string;
  sets: number;
  reps: string;
  image: string;
}

const exercises: Exercise[] = [
  {
    id: 'pull-ups',
    name: 'Dominadas',
    muscleGroup: 'Espalda',
    equipment: 'Barra de dominadas',
    difficulty: 'Alto',
    description: 'Agarra la barra con las palmas hacia adelante y los brazos extendidos. Levanta tu cuerpo hasta que tu barbilla supere la barra.',
    sets: 3,
    reps: '8-12',
    image: '/images/exercises/dominadas.jpg'
  },
  {
    id: 'push-ups',
    name: 'Flexiones',
    muscleGroup: 'Pecho',
    equipment: 'Peso corporal',
    difficulty: 'Intermedio',
    description: 'Mantén tu cuerpo recto, baja hasta que tu pecho casi toque el suelo y empuja hacia arriba.',
    sets: 3,
    reps: '15-25',
    image: '/images/exercises/flexiones.jpg'
  },
  {
    id: 'dips',
    name: 'Fondos',
    muscleGroup: 'Dorsales',
    equipment: 'Anillas paralelas',
    difficulty: 'Alto',
    description: 'Sostente en las anillas con los brazos extendidos, baja tu cuerpo flexionando los codos y empuja hacia arriba.',
    sets: 3,
    reps: '8-12',
    image: '/images/exercises/fondos-anillas.jpg'
  }
];

export default function ExerciseList() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedExercise(exercise)}
          >
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src={exercise.image}
                alt={exercise.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {exercise.name}
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Grupo muscular:</span> {exercise.muscleGroup}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Dificultad:</span> {exercise.difficulty}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Series:</span> {exercise.sets} x {exercise.reps}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
}
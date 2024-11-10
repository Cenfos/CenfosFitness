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

interface Props {
  exercise: Exercise;
  onClose: () => void;
}

export default function ExerciseModal({ exercise, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{exercise.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <img
            src={exercise.image}
            alt={exercise.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-medium text-gray-900">Grupo Muscular</h3>
              <p className="text-gray-600">{exercise.muscleGroup}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Equipamiento</h3>
              <p className="text-gray-600">{exercise.equipment}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Dificultad</h3>
              <p className="text-gray-600">{exercise.difficulty}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Series x Repeticiones</h3>
              <p className="text-gray-600">{exercise.sets} x {exercise.reps}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Descripción</h3>
            <p className="text-gray-600">{exercise.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
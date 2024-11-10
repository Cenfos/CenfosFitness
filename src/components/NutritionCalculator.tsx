import { useState } from 'react';

interface NutritionResult {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export default function NutritionCalculator() {
  const [formData, setFormData] = useState({
    gender: 'male',
    age: '',
    weight: '',
    height: '',
    activity: 'sedentary',
    goal: 'maintain'
  });

  const [result, setResult] = useState<NutritionResult | null>(null);

  const activityLevels = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  const goalMultipliers = {
    lose: 0.85,
    maintain: 1,
    gain: 1.15
  };

  const calculateBMR = () => {
    const { gender, age, weight, height } = formData;
    if (gender === 'male') {
      return 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5;
    }
    return 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161;
  };

  const calculateNutrition = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bmr = calculateBMR();
    const tdee = bmr * activityLevels[formData.activity as keyof typeof activityLevels];
    const targetCalories = tdee * goalMultipliers[formData.goal as keyof typeof goalMultipliers];
    
    const nutrition: NutritionResult = {
      calories: Math.round(targetCalories),
      protein: Math.round((targetCalories * 0.3) / 4), // 30% proteína
      carbs: Math.round((targetCalories * 0.4) / 4),   // 40% carbohidratos
      fats: Math.round((targetCalories * 0.3) / 9)     // 30% grasas
    };
    
    setResult(nutrition);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={calculateNutrition} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Género
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Edad
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Años"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Peso (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Kilogramos"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Altura (cm)
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="Centímetros"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nivel de Actividad
            </label>
            <select
              name="activity"
              value={formData.activity}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="sedentary">Sedentario</option>
              <option value="light">Actividad Ligera</option>
              <option value="moderate">Actividad Moderada</option>
              <option value="active">Muy Activo</option>
              <option value="veryActive">Extremadamente Activo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Objetivo
            </label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="lose">Perder Peso</option>
              <option value="maintain">Mantener Peso</option>
              <option value="gain">Ganar Masa Muscular</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Calcular
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Tus Necesidades Nutricionales Diarias
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600">Calorías Totales</p>
              <p className="text-2xl font-bold text-primary-600">{result.calories} kcal</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600">Proteínas</p>
              <p className="text-2xl font-bold text-primary-600">{result.protein}g</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600">Carbohidratos</p>
              <p className="text-2xl font-bold text-primary-600">{result.carbs}g</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600">Grasas</p>
              <p className="text-2xl font-bold text-primary-600">{result.fats}g</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
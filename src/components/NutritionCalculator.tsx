import { useState } from 'react';

interface NutritionResult {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface KetoDiet {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  recommendedFoods: string[];
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
  const [ketoDiet, setKetoDiet] = useState<KetoDiet | null>(null);

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
    if (!age || !weight || !height) return 0; // Verifica que los campos no estén vacíos

    if (gender === 'male') {
      return 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5;
    }
    return 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161;
  };

  const calculateNutrition = (e: React.FormEvent) => {
    e.preventDefault();

    const bmr = calculateBMR();
    if (!bmr) return;

    const tdee = bmr * activityLevels[formData.activity as keyof typeof activityLevels];
    const targetCalories = tdee * goalMultipliers[formData.goal as keyof typeof goalMultipliers];

    const nutrition: NutritionResult = {
      calories: Math.round(targetCalories),
      protein: Math.round((targetCalories * 0.3) / 4), // 30% proteína
      carbs: Math.round((targetCalories * 0.4) / 4),   // 40% carbohidratos
      fats: Math.round((targetCalories * 0.3) / 9)     // 30% grasas
    };

    setResult(nutrition);
    calculateKetoDiet(nutrition);
  };

  const calculateKetoDiet = (nutrition: NutritionResult) => {
    const ketoProtein = Math.round((nutrition.calories * 0.25) / 4);
    const ketoCarbs = Math.round((nutrition.calories * 0.05) / 4);
    const ketoFats = Math.round((nutrition.calories * 0.7) / 9);

    const ketoPlan: KetoDiet = {
      calories: nutrition.calories,
      protein: ketoProtein,
      carbs: ketoCarbs,
      fats: ketoFats,
      recommendedFoods: [
        "Aguacate",
        "Salmón",
        "Carne magra",
        "Huevos",
        "Aceite de oliva",
        "Nueces",
        "Verduras de hoja verde"
      ]
    };

    setKetoDiet(ketoPlan);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className= "menu-container">
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
            {/* Otros resultados: Proteínas, Carbohidratos, Grasas */}
          </div>
        </div>
      )}

      {ketoDiet && (
        <div className="mt-8 p-6 bg-green-50 rounded-lg">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            Dieta Keto Sugerida
          </h3>
          <p>Calorías: {ketoDiet.calories} kcal</p>
          <p>Proteínas: {ketoDiet.protein}g</p>
          <p>Carbohidratos: {ketoDiet.carbs}g</p>
          <p>Grasas: {ketoDiet.fats}g</p>
          <h4 className="text-lg font-semibold text-green-700 mt-4">Alimentos Recomendados</h4>
          <ul className="list-disc ml-4">
            {ketoDiet.recommendedFoods.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
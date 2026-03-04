import { ContractType } from '../types';

interface ContractTypeSelectorProps {
  selectedType: ContractType | null;
  onTypeSelect: (type: ContractType) => void;
}

const contractTypes = [
  {
    id: 'services' as const,
    label: 'Contrato de Prestación de Servicios',
    description: 'Para servicios profesionales'
  },
  {
    id: 'rental' as const,
    label: 'Contrato de Arrendamiento',
    description: 'Para alquiler de inmuebles'
  },
  {
    id: 'collaboration' as const,
    label: 'Contrato de Colaboración',
    description: 'Entre autónomos o empresas'
  }
];

export default function ContractTypeSelector({ selectedType, onTypeSelect }: ContractTypeSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Selecciona el tipo de contrato</h2>
      <div className="space-y-3">
        {contractTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeSelect(type.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedType === type.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
            }`}
          >
            <div className="font-semibold text-gray-900">{type.label}</div>
            <div className="text-sm text-gray-600">{type.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

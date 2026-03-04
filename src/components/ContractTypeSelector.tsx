import { ContractType } from '../types';
import { ArrowRight } from 'lucide-react';

interface ContractTypeSelectorProps {
  selectedType: ContractType | null;
  onTypeSelect: (type: ContractType) => void;
}

const contractTypes = [
  {
    id: 'services' as const,
    label: 'Prestación de Servicios',
    description: 'Para servicios profesionales entre partes',
    number: '01'
  },
  {
    id: 'rental' as const,
    label: 'Arrendamiento',
    description: 'Para alquiler de inmuebles',
    number: '02'
  },
  {
    id: 'collaboration' as const,
    label: 'Colaboración',
    description: 'Entre autónomos o empresas',
    number: '03'
  }
];

export default function ContractTypeSelector({ selectedType, onTypeSelect }: ContractTypeSelectorProps) {
  return (
    <div className="space-y-3">
      {contractTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onTypeSelect(type.id)}
          className={`w-full text-left p-6 rounded-2xl border transition-all duration-200 group flex items-center justify-between ${
            selectedType === type.id
              ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
              : 'border-[#E8E6E0] bg-white hover:border-[#1a1a1a]'
          }`}
        >
          <div className="flex items-center gap-5">
            <span className={`text-xs font-medium tracking-widest ${
              selectedType === type.id ? 'text-[#666]' : 'text-[#C0BDB8]'
            }`}>
              {type.number}
            </span>
            <div>
              <p className={`text-sm font-medium mb-0.5 ${
                selectedType === type.id ? 'text-white' : 'text-[#1a1a1a]'
              }`}>
                {type.label}
              </p>
              <p className={`text-xs ${
                selectedType === type.id ? 'text-[#999]' : 'text-[#B0ADA8]'
              }`}>
                {type.description}
              </p>
            </div>
          </div>
          <ArrowRight
            size={16}
            className={`shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${
              selectedType === type.id ? 'text-white' : 'text-[#C0BDB8]'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

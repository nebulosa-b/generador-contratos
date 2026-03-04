import { ContractType, FormData } from '../types';

interface ContractFormProps {
  contractType: ContractType;
  formData: FormData;
  onFormChange: (data: FormData) => void;
}

export default function ContractForm({ contractType, formData, onFormChange }: ContractFormProps) {
  const handleChange = (field: keyof FormData, value: string) => {
    onFormChange({ ...formData, [field]: value });
  };

  const inputClass = `
    w-full px-0 py-2.5 bg-transparent border-0 border-b border-[#E0DDD8]
    text-sm text-[#1a1a1a] placeholder-[#C0BDB8]
    focus:outline-none focus:border-[#1a1a1a] transition-colors duration-200
  `;

  const selectClass = `
    w-full px-0 py-2.5 bg-transparent border-0 border-b border-[#E0DDD8]
    text-sm text-[#1a1a1a] appearance-none cursor-pointer
    focus:outline-none focus:border-[#1a1a1a] transition-colors duration-200
  `;

  const textareaClass = `
    w-full px-3 py-3 bg-white border border-[#E0DDD8] rounded-lg
    text-sm text-[#1a1a1a] placeholder-[#C0BDB8] resize-none
    focus:outline-none focus:border-[#1a1a1a] transition-colors duration-200
  `;

  const labelClass = 'block text-xs font-medium tracking-widest text-[#999] uppercase mb-2';

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-medium tracking-widest text-[#1a1a1a] uppercase">{title}</span>
        <div className="flex-1 h-px bg-[#E8E6E0]" />
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );

  return (
    <form className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8E6E0]">

      <Section title="Parte 1">
        <div>
          <label className={labelClass}>Nombre completo</label>
          <input type="text" value={formData.party1Name} onChange={(e) => handleChange('party1Name', e.target.value)} className={inputClass} placeholder="Nombre y apellidos" />
        </div>
        <div>
          <label className={labelClass}>DNI / NIF</label>
          <input type="text" value={formData.party1DNI} onChange={(e) => handleChange('party1DNI', e.target.value)} className={inputClass} placeholder="00000000X" />
        </div>
      </Section>

      <Section title="Parte 2">
        <div>
          <label className={labelClass}>Nombre completo</label>
          <input type="text" value={formData.party2Name} onChange={(e) => handleChange('party2Name', e.target.value)} className={inputClass} placeholder="Nombre y apellidos" />
        </div>
        <div>
          <label className={labelClass}>DNI / NIF</label>
          <input type="text" value={formData.party2DNI} onChange={(e) => handleChange('party2DNI', e.target.value)} className={inputClass} placeholder="00000000X" />
        </div>
      </Section>

      <Section title="Condiciones">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Fecha inicio</label>
            <input type="date" value={formData.startDate} onChange={(e) => handleChange('startDate', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Fecha fin</label>
            <input type="date" value={formData.endDate} onChange={(e) => handleChange('endDate', e.target.value)} className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Importe (EUR)</label>
            <input type="number" value={formData.amount} onChange={(e) => handleChange('amount', e.target.value)} className={inputClass} placeholder="0.00" step="0.01" />
          </div>
          <div>
            <label className={labelClass}>Forma de pago</label>
            <select value={formData.paymentMethod} onChange={(e) => handleChange('paymentMethod', e.target.value as 'transfer' | 'cash' | 'bizum')} className={selectClass}>
              <option value="transfer">Transferencia</option>
              <option value="cash">Efectivo</option>
              <option value="bizum">Bizum</option>
            </select>
          </div>
        </div>
      </Section>

      {contractType === 'services' && (
        <Section title="Servicio">
          <div>
            <label className={labelClass}>Descripción del servicio</label>
            <textarea value={formData.serviceDescription || ''} onChange={(e) => handleChange('serviceDescription', e.target.value)} className={textareaClass} rows={3} placeholder="Describe el servicio a prestar..." />
          </div>
          <div>
            <label className={labelClass}>Entregables pactados</label>
            <textarea value={formData.deliverables || ''} onChange={(e) => handleChange('deliverables', e.target.value)} className={textareaClass} rows={3} placeholder="Lista los entregables acordados..." />
          </div>
        </Section>
      )}

      {contractType === 'rental' && (
        <Section title="Inmueble">
          <div>
            <label className={labelClass}>Dirección del inmueble</label>
            <textarea value={formData.propertyAddress || ''} onChange={(e) => handleChange('propertyAddress', e.target.value)} className={textareaClass} rows={2} placeholder="Calle, número, piso, ciudad..." />
          </div>
          <div>
            <label className={labelClass}>Fianza (EUR)</label>
            <input type="number" value={formData.deposit || ''} onChange={(e) => handleChange('deposit', e.target.value)} className={inputClass} placeholder="0.00" step="0.01" />
          </div>
        </Section>
      )}

      {contractType === 'collaboration' && (
        <Section title="Colaboración">
          <div>
            <label className={labelClass}>Descripción del proyecto</label>
            <textarea value={formData.projectDescription || ''} onChange={(e) => handleChange('projectDescription', e.target.value)} className={textareaClass} rows={3} placeholder="Describe el proyecto o colaboración..." />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>{formData.party1Name || 'Parte 1'} (%)</label>
              <input type="number" value={formData.party1Percentage || ''} onChange={(e) => handleChange('party1Percentage', e.target.value)} className={inputClass} placeholder="0" min="0" max="100" />
            </div>
            <div>
              <label className={labelClass}>{formData.party2Name || 'Parte 2'} (%)</label>
              <input type="number" value={formData.party2Percentage || ''} onChange={(e) => handleChange('party2Percentage', e.target.value)} className={inputClass} placeholder="0" min="0" max="100" />
            </div>
          </div>
        </Section>
      )}

      <Section title="Cláusulas adicionales">
        <textarea value={formData.additionalClauses} onChange={(e) => handleChange('additionalClauses', e.target.value)} className={textareaClass} rows={4} placeholder="Términos adicionales o condiciones especiales..." />
      </Section>

    </form>
  );
}

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

  const inputClassName = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none';
  const labelClassName = 'block text-sm font-medium text-gray-700 mb-2';

  return (
    <form className="space-y-6">
      <fieldset className="border border-gray-200 rounded-lg p-6">
        <legend className="text-lg font-semibold text-gray-900 mb-4">Parte 1</legend>
        <div className="space-y-4">
          <div>
            <label className={labelClassName}>Nombre completo</label>
            <input
              type="text"
              value={formData.party1Name}
              onChange={(e) => handleChange('party1Name', e.target.value)}
              className={inputClassName}
              required
            />
          </div>
          <div>
            <label className={labelClassName}>DNI</label>
            <input
              type="text"
              value={formData.party1DNI}
              onChange={(e) => handleChange('party1DNI', e.target.value)}
              className={inputClassName}
              required
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="border border-gray-200 rounded-lg p-6">
        <legend className="text-lg font-semibold text-gray-900 mb-4">Parte 2</legend>
        <div className="space-y-4">
          <div>
            <label className={labelClassName}>Nombre completo</label>
            <input
              type="text"
              value={formData.party2Name}
              onChange={(e) => handleChange('party2Name', e.target.value)}
              className={inputClassName}
              required
            />
          </div>
          <div>
            <label className={labelClassName}>DNI</label>
            <input
              type="text"
              value={formData.party2DNI}
              onChange={(e) => handleChange('party2DNI', e.target.value)}
              className={inputClassName}
              required
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="border border-gray-200 rounded-lg p-6">
        <legend className="text-lg font-semibold text-gray-900 mb-4">Condiciones generales</legend>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClassName}>Fecha de inicio</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Fecha de fin</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                className={inputClassName}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClassName}>Importe (EUR)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                className={inputClassName}
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Forma de pago</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => handleChange('paymentMethod', e.target.value as 'transfer' | 'cash' | 'bizum')}
                className={inputClassName}
                required
              >
                <option value="transfer">Transferencia bancaria</option>
                <option value="cash">Efectivo</option>
                <option value="bizum">Bizum</option>
              </select>
            </div>
          </div>
        </div>
      </fieldset>

      {contractType === 'services' && (
        <fieldset className="border border-gray-200 rounded-lg p-6">
          <legend className="text-lg font-semibold text-gray-900 mb-4">Detalles del servicio</legend>
          <div className="space-y-4">
            <div>
              <label className={labelClassName}>Descripción del servicio</label>
              <textarea
                value={formData.serviceDescription || ''}
                onChange={(e) => handleChange('serviceDescription', e.target.value)}
                className={`${inputClassName} min-h-24`}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Entregables pactados</label>
              <textarea
                value={formData.deliverables || ''}
                onChange={(e) => handleChange('deliverables', e.target.value)}
                className={`${inputClassName} min-h-24`}
                required
              />
            </div>
          </div>
        </fieldset>
      )}

      {contractType === 'rental' && (
        <fieldset className="border border-gray-200 rounded-lg p-6">
          <legend className="text-lg font-semibold text-gray-900 mb-4">Detalles del inmueble</legend>
          <div className="space-y-4">
            <div>
              <label className={labelClassName}>Dirección del inmueble</label>
              <textarea
                value={formData.propertyAddress || ''}
                onChange={(e) => handleChange('propertyAddress', e.target.value)}
                className={`${inputClassName} min-h-20`}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Fianza (EUR)</label>
              <input
                type="number"
                value={formData.deposit || ''}
                onChange={(e) => handleChange('deposit', e.target.value)}
                className={inputClassName}
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
          </div>
        </fieldset>
      )}

      {contractType === 'collaboration' && (
        <fieldset className="border border-gray-200 rounded-lg p-6">
          <legend className="text-lg font-semibold text-gray-900 mb-4">Detalles de la colaboración</legend>
          <div className="space-y-4">
            <div>
              <label className={labelClassName}>Descripción del proyecto</label>
              <textarea
                value={formData.projectDescription || ''}
                onChange={(e) => handleChange('projectDescription', e.target.value)}
                className={`${inputClassName} min-h-24`}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClassName}>Porcentaje {formData.party1Name || 'Parte 1'} (%)</label>
                <input
                  type="number"
                  value={formData.party1Percentage || ''}
                  onChange={(e) => handleChange('party1Percentage', e.target.value)}
                  className={inputClassName}
                  placeholder="0"
                  min="0"
                  max="100"
                  required
                />
              </div>
              <div>
                <label className={labelClassName}>Porcentaje {formData.party2Name || 'Parte 2'} (%)</label>
                <input
                  type="number"
                  value={formData.party2Percentage || ''}
                  onChange={(e) => handleChange('party2Percentage', e.target.value)}
                  className={inputClassName}
                  placeholder="0"
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>
          </div>
        </fieldset>
      )}

      <fieldset className="border border-gray-200 rounded-lg p-6">
        <legend className="text-lg font-semibold text-gray-900 mb-4">Cláusulas adicionales</legend>
        <div>
          <label className={labelClassName}>Términos y condiciones adicionales</label>
          <textarea
            value={formData.additionalClauses}
            onChange={(e) => handleChange('additionalClauses', e.target.value)}
            className={`${inputClassName} min-h-32`}
            placeholder="Añade aquí cualquier cláusula adicional o término especial..."
          />
        </div>
      </fieldset>
    </form>
  );
}

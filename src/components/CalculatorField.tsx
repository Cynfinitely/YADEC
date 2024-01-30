import { Field, ErrorMessage } from 'formik';

interface CalculatorFieldProps {
  name: string;
  type: string;
  label: string;
}

const CalculatorField: React.FC<CalculatorFieldProps> = ({ name, type, label }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <Field type={type} name={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" aria-describedby={`${name}Error`} aria-label={label} />
    <ErrorMessage name={name} component="div" id={`${name}Error`} />
  </div>
);

export default CalculatorField;
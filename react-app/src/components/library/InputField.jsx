const InputField = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="mt-8">
      <label className="text-gray-800 text-xs block mb-2">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="w-full bg-transparent text-sm text-gray-800 border-b 
        border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;

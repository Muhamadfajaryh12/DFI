type InputProps = {
  type: "text" | "password" | "email" | "number" | "hidden" | "date";
  placeholder: string;
  disabled: boolean;
  required: boolean;
  label: string;
  name: string;
  register: any;
  error: any;
  value: any;
  icon: any;
  readonly?: any;
};

const Input = ({
  type,
  placeholder,
  disabled,
  label,
  required,
  name,
  register,
  error,
  value,
  icon,
  readonly,
}: Partial<InputProps>) => {
  return (
    <>
      {icon ? (
        <div className="flex flex-col grow mt-2">
          <label className="text-sm font-semibold mx-2">
            {label}
            {error ? <span className="text-red-500"> Required</span> : null}
          </label>
          <div className="flex items-center bg-blue-400 w-full border-2 rounded-md">
            {icon}
            <input
              className={`p-2 focus:outline-none w-full`}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              value={value}
              name={name}
              {...register(name, { required: required })}
              readOnly={readonly}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col grow mt-2">
          <label className="text-sm font-semibold mx-2">
            {label}
            {error ? <span className="text-red-500"> Required</span> : null}
          </label>
          <input
            className={`mt-1 p-2 focus:outline-none w-full border-2 rounded-md`}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            name={name}
            {...register(name, { required: required })}
          />
        </div>
      )}
    </>
  );
};
export default Input;

const Radio = ({
  data,
  label,
  register,
}: {
  data: any;
  label: string;
  register: any;
}) => {
  return (
    <>
      <label className="text-sm font-semibold mx-2 ">{label}</label>
      {data.map((item: any, index: number) => (
        <div key={index} className="flex items-center">
          <input
            type="radio"
            name={item.name}
            value={item.value}
            className="form-radio mx-2"
            {...register(item.name, { required: item.required })}
          />
          <label>{item.value}</label>
        </div>
      ))}
    </>
  );
};

export default Radio;

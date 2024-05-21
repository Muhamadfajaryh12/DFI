type TextAreaProps = {
  register: any;
  name: string;
  label: string;
};
const TextArea = ({ register, name, label }: TextAreaProps) => {
  return (
    <>
      <div className="flex flex-col">
        <label className="text-sm font-semibold mx-2 mb-1">{label}</label>
        <textarea
          className="border-2 rounded-md"
          name={name}
          {...register(name)}
        ></textarea>
        ;
      </div>
    </>
  );
};

export default TextArea;

import { Controller } from "react-hook-form";

interface SelectType {
  label: string;
  value: any;
  data: any;
  name: string;
  error: any;
  control: any;
  defaultValue: string;
  require: boolean;
}
const Selected = ({
  label,
  control,
  name,
  error,
  data,
  require,
}: Partial<SelectType>) => {
  return (
    <>
      <div className="mt-2">
        <label className="text-sm font-semibold mx-2">
          {label}
          {error ? <span className="text-red-500 mx-1">Required</span> : null}
        </label>
        <Controller
          name={name!}
          control={control}
          rules={{ required: require }}
          render={({ field: { onChange, value } }) => {
            return (
              <select
                className="w-full p-2 border rounded-md shadow-md"
                name={name}
                onChange={onChange}
              >
                <option value="" selected>
                  Choose
                </option>
                {data?.map((item: any) =>
                  item.slug ? (
                    <option
                      key={item.id}
                      value={item.id}
                      selected={item.id === value}
                    >
                      {item.slug}
                    </option>
                  ) : (
                    <option
                      key={item.id}
                      value={item.id}
                      selected={item.id === value}
                    >
                      {item.name}
                    </option>
                  )
                )}
              </select>
            );
          }}
        />
      </div>
    </>
  );
};
export default Selected;

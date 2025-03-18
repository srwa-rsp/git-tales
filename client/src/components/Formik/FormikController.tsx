import clsx from "clsx";
import { ErrorMessage } from "formik";
import React from "react";
import { setLocale } from "yup";
import Input from "./components/Input";
import Select from "./components/Select";

setLocale({
  mixed: {
    required: "This field is required",
    default: "This field is required",
    notType: "This field is required",
  },
});

const FormikController = React.forwardRef(
  (
    {
      control,
      label,
      leftField,
      second,
      parentClass,
      labelClass,
      floatingLabel,
      ...rest
    }: any,
    ref,
  ) => {
    rest.className = !second
      ? clsx("bg-blue-verylight", rest.className)
      : rest.className;
    const renderComponent = () => {
      switch (control) {
        case "input":
          return <Input {...rest} />;
        case "select":
          return <Select {...rest} />;
        default:
          return null;
      }
    };
    return (
      <div
        className={clsx(
          "w-full flex text-[1rem] font-semibold relative group children:border-none justify-center",
          parentClass ? parentClass : "mb-6 flex-col",
        )}
      >
        <div
          className={clsx(
            "relative mb-2 w-full child:w-full",
            rest.disabled && "blur-[1.5px]",
          )}
        >
          {renderComponent()}
          {leftField && (
            <div className="absolute z-10 left-4 flex items-center w-fit top-1/4 opacity-70">
              {leftField}
            </div>
          )}
          {label && control !== "checkbox" && control !== "datepicker" && (
            <label
              htmlFor={rest.name}
              className={clsx(
                "w-auto absolute left-0 ml-2 -translate-y-5 bg-transparent px-2 duration-100 ease-linear bg-white rounded",
                control === "datepicker" ? "top-[3.8rem]" : "top-3",
                "peer-placeholder-shown:translate-y-0 peer-focus:mr-2 peer-focus:-translate-y-5 peer-focus:px-2 peer-focus:text-[1rem] peer-focus:bg-white",
                "peer-autofill:!-translate-y-5",
              )}
            >
              {label}
            </label>
          )}
        </div>
        <ErrorMessage name={rest.name}>
          {(msg) => <span className={" text-red-600 m-0 p-0"}>{msg}</span>}
        </ErrorMessage>
      </div>
    );
  },
);
FormikController.displayName = "FormikController";

export default FormikController;

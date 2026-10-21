import { createContext } from "../../utils/context";

export interface FormFieldContext {
  /** 控件应使用的 id */
  id: string;
  /** 关联的错误/提示文本 id */
  describedBy?: string;
  invalid: boolean;
  required: boolean;
}

export const FormFieldCtx = createContext<FormFieldContext>("w95-form-field");

export interface FormContext {
  labelWidth: string;
  disabled: boolean;
}

export const FormCtx = createContext<FormContext>("w95-form");

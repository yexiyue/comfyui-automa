
const FormTypeMap: any = {
  INT: "number",
  FLOAT: "number",
  STRING: "textarea"
}

export interface JsonType {
  [key: string | number]: {
    inputs: {
      [key: string]: any
    },
    class_type: string,
    treated?: boolean
  }
}

export interface ObjectInfo {
  [key: string]: {
    input: {
      required: { [p: string]: any[] },
      [field: PropertyKey]: any,
    }
    ,
    output: any[],
    output_is_list: any[],
    output_name: any[],
    name: string,
    display_name: string,
    description: string,
    category: string,
    output_node: boolean,
  },
}

export type FormItem = 'number' | 'select' | 'textarea'

export interface FormatJsonValue<T extends FormItem> {
  id: string;
  type: T;
  field: string;
  default: T extends 'number' ? number : string;
  min: T extends 'number' ? number : never;
  step?: T extends 'number' ? number : never;
  max: T extends 'number' ? number : never;
  option: T extends 'select' ? string[] : never;
  multiline: T extends 'textarea' ? boolean | undefined : never,
  image_upload?: T extends 'select' ? boolean : never,
}

// 深度遍历获取节点相关的信息
function jsonToFormDeep(key: string, json: JsonType, data: ObjectInfo, forms: any = {}) {
  if (data == null || json[key].treated) return

  const inputs = json[key].inputs;
  const input = data[json[key].class_type].input.required;

  json[key].treated = true;
  forms[key] = {

  }

  for (const field in inputs) {
    let form = forms[key]
    if (Array.isArray(inputs[field])) {
      form[field] = jsonToFormDeep(inputs[field][0], json, data, form[field])
    } else {
      if (input[field]) {
        if (typeof input[field][0] === 'string') {
          let type = FormTypeMap?.[input[field][0]]
          if (type) {
            form[field] = {
              id: key,
              type,
              ...input[field][1],
              default: inputs[field],
              class_type: json[key].class_type
            }
          }
        } else if (Array.isArray(input[field][0])) {
          form[field] = {
            id: key,
            type: 'select',
            option: input[field][0],
            default: inputs[field],
            class_type: json[key].class_type
          }
          if (field === 'image') {
            form[field].image_upload = true
          }

        }
      }
    }
  }

  return forms;
}

export function jsonToFormDeep2(json: JsonType, data: ObjectInfo) {
  if (data == null) return
  let forms: any = {}
  for (const key in json) {
    jsonToFormDeep(key, json, data, forms)
  }

  return forms;
}

// 对深度遍历的结果转换成数组
function formatFormDeepReturnValue(forms: any, res: any[] = []) {

  for (const key in forms) {
    if (typeof forms[key] === 'object') {
      if (forms[key]?.type) {
        res.push({
          ...forms[key],
          field: key
        })
      } else {
        formatFormDeepReturnValue(forms[key], res)
      }
    }
  }

  return res
}

// 包装函数
export function formatJsonToFormItem<T extends FormItem>(json: JsonType, data: ObjectInfo): FormatJsonValue<T>[] {
  const temp = jsonToFormDeep2(json, data)
  return formatFormDeepReturnValue(temp)
}

// todo 进行优化 走了弯路
function jsonToFormItemArray(key: string, json: JsonType, data: ObjectInfo, arr: FormFields[]) {
  if (data == null || json[key].treated) return

  const inputs = json[key].inputs;
  const input = data[json[key].class_type].input.required;

  json[key].treated = true;
  const forms: FormFields = {
    class_type: json[key].class_type,
    id: key,
    fields: []
  }

  for (const field in inputs) {
    if (Array.isArray(inputs[field])) {
      jsonToFormItemArray(inputs[field][0], json, data, arr)
    } else {
      if (input[field]) {
        if (typeof input[field][0] === 'string') {
          let type = FormTypeMap?.[input[field][0]]
          if (type) {
            forms.fields.push({
              id: key,
              type,
              ...{
                ...input[field][1],
                max: field === 'steps' ? 100 : input[field][1].max
              },
              field,
              default: typeof inputs[field] === 'string' ? inputs[field] : Number.isInteger(inputs[field]) ? inputs[field] : (inputs[field] as number).toFixed(2),
              class_type: json[key].class_type,
            })
          }
        } else if (Array.isArray(input[field][0])) {
          let form: any = {
            id: key,
            type: 'select',
            field,
            option: input[field][0],
            default: inputs[field],
          }
          if (field === 'image') {
            form.image_upload = true
          }
          forms.fields.push(form)
        }
      }
    }
  }
  arr.push(forms)
}

export type FormFields = {
  id: string,
  class_type: string,
  fields: FormatJsonValue<FormItem>[]
}

export function jsonToFormItemArray2(json: JsonType, data: ObjectInfo) {
  if (data == null) return
  let forms: FormFields[] = []
  for (const key in json) {
    jsonToFormItemArray(key, json, data, forms)
  }
  return forms;
}
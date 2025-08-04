// Text Input Field
import { useField } from 'formik';

export const FormikTextInput = ({ label, ...props }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input {...field} {...props} className="w-full border px-3 py-2 rounded" />
      {meta.touched && meta.error && <div className="text-red-500 text-sm">{meta.error}</div>}
    </div>
  );
};

// Number Input Field (with string input handling)
import { useField } from 'formik';

export const FormikNumberInput = ({ label, ...props }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input type="number" {...field} {...props} className="w-full border px-3 py-2 rounded" />
      {meta.touched && meta.error && <div className="text-red-500 text-sm">{meta.error}</div>}
    </div>
  );
};

// Checkbox
import { useField } from 'formik';

export const FormikCheckbox = ({ label, ...props }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <div className="mb-4 flex items-center gap-2">
      <input type="checkbox" {...field} {...props} />
      <label>{label}</label>
      {meta.touched && meta.error && <div className="text-red-500 text-sm">{meta.error}</div>}
    </div>
  );
};

// Select Dropdown
import { useField } from 'formik';

export const FormikSelect = ({ label, children, ...props }: { label: string; name: string; children: React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <select {...field} {...props} className="w-full border px-3 py-2 rounded">
        {children}
      </select>
      {meta.touched && meta.error && <div className="text-red-500 text-sm">{meta.error}</div>}
    </div>
  );
};

// Textarea
import { useField } from 'formik';

export const FormikTextarea = ({ label, ...props }: { label: string; name: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <textarea {...field} {...props} className="w-full border px-3 py-2 rounded" />
      {meta.touched && meta.error && <div className="text-red-500 text-sm">{meta.error}</div>}
    </div>
  );
};


// Example
<Formik
  initialValues={{ name: '', age: '', gender: '', bio: '', agree: false }}
  validationSchema={Yup.object({
    name: Yup.string().required(),
    age: Yup.number().transform(val => val === '' ? undefined : Number(val)).required(),
    gender: Yup.string().required(),
    bio: Yup.string().min(10),
    agree: Yup.boolean().oneOf([true], 'You must agree'),
  })}
  onSubmit={(values) => console.log(values)}
>
  <Form>
    <FormikTextInput label="Name" name="name" placeholder="Enter name" />
    <FormikNumberInput label="Age" name="age" placeholder="Enter age" />
    <FormikSelect label="Gender" name="gender">
      <option value="">Select</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </FormikSelect>
    <FormikTextarea label="Bio" name="bio" placeholder="Tell us about yourself..." />
    <FormikCheckbox label="I agree to terms" name="agree" />
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
  </Form>
</Formik>


import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from '../ui/button';

// Types
interface Category {
  id: string;
  name: string;
}

interface CreateEventFormProps {
  onSubmit: (values: {
    name: string;
    description: string;
    category_id: number;
  }) => Promise<void>;
}

// Validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters long'),
  category_id: yup
    .number()
    .typeError('Category is required')
    .required('Category is required'),
});

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSubmit }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      // Replace this with your real API call
      const data = [
        { id: '1', name: 'Music' },
        { id: '2', name: 'Technology' },
        { id: '3', name: 'Food' },
        { id: '4', name: 'Art' },
      ];
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <Formik
      initialValues={{ name: '', description: '', category_id: 0 }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await onSubmit(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-semibold">
              Event Name
            </label>
            <Field
              name="name"
              type="text"
              className="w-full border px-2 py-1 rounded"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-semibold">
              Description
            </label>
            <Field
              name="description"
              as="textarea"
              className="w-full border px-2 py-1 rounded"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Category Select */}
          <div>
            <label htmlFor="category_id" className="block font-semibold">
              Category
            </label>
            <Field name="category_id">
              {({ field, form }: any) => (
                <select
                  {...field}
                  onChange={(e) =>
                    form.setFieldValue('category_id', Number(e.target.value))
                  }
                  className="w-full border px-2 py-2 rounded"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            </Field>
            <ErrorMessage
              name="category_id"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              Create Event
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateEventForm;

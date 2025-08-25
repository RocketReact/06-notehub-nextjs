import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';
import { Field, Form, Formik, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { createNote } from '@/lib/api';
import type { CreateNote, Note } from '@/types/note';

interface NoteFormProps {
  onClose: () => void;
}
const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must have min 3 characters')
    .max(50, 'Title must have max 50 characters')
    .required('Required'),
  content: Yup.string().max(500, 'Content must have max 500 characters'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
    .required('Required'),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation<Note, Error, CreateNote>({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleSubmit = (values: CreateNote, actions: FormikHelpers<CreateNote>) => {
    mutation.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
        onClose();
      },
    });
  };
  return (
    <Formik
      validationSchema={ValidationSchema}
      initialValues={{ title: '', content: '', tag: 'Todo' }}
      onSubmit={handleSubmit}
    >
      {formik => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor='title'>Title</label>
            <Field id='title' type='text' name='title' className={css.input} />
            <ErrorMessage name='title' component='div' className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor='content'>Content</label>
            <Field
              as='textarea'
              id='content'
              name='content'
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage name='content' component='div' className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor='tag'>Tag</label>
            <Field as='select' id='tag' name='tag' className={css.select}>
              <option value='Todo'>Todo</option>
              <option value='Work'>Work</option>
              <option value='Personal'>Personal</option>
              <option value='Meeting'>Meeting</option>
              <option value='Shopping'>Shopping</option>
            </Field>
            <ErrorMessage name='tag' component='div' className={css.error} />
          </div>

          <div className={css.actions}>
            <button type='button' className={css.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button
              type='submit'
              className={css.submitButton}
              disabled={mutation.isPending || !formik.isValid}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

import { useId } from "react";
import { createNote } from "@/lib/api";
import { NoteTag } from "@/types/note";
import css from './NoteForm.module.css'





export default function NoteForm() {

    const handleSubmit = async (formData: FormData) => {
        'use server';
        const values = {
            title: (formData.get('title') as string) ?? "",
            content: (formData.get('content') as string)?? "",
            tag: (formData.get('tag') as NoteTag)?? 'Todo',
        };
        await createNote(values);
      };

    const fieldId = useId();
    return (
        <form action={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-title`}>Title</label>
                    <input type="text" name="title" id={`${fieldId}-title`} className={css.input} />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-content`}>Content</label>
                    <textarea name="content" id={`${fieldId}-content`} rows={8} className={css.textarea} />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <select name="tag" id={`${fieldId}-tag`} className={css.select}>
                    <option value="">Choose Tag</option>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </select>
            </div>

            <div className={css.actions}>
                <button type="button" className={css.cancelButton}>Cancel</button>
                <button type="submit" disabled={false} className={css.submitButton}>Create Note</button>
            </div>
            </form>
 )
}
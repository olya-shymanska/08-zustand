'use client'
import { useId } from "react";
import css from './NoteForm.module.css'
import { noteAction } from "@/lib/action/noteAction";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { useRouter } from 'next/navigation';
import { initialDraft } from "@/lib/store/noteStore";
import { useQueryClient } from "@tanstack/react-query";

export default function NoteForm() {

    const router = useRouter();
    const queryClient = useQueryClient();

    const { draft, setDraft, clearDraft } = useNoteDraftStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDraft({ ...draft, [e.target.name]: e.target.value });
    };
    
    const safeDraft = { ...initialDraft, ...draft, tag: draft.tag || 'Todo' };

    const handleSubmit = async (formData: FormData) => {
        await noteAction(formData);
        clearDraft();
        queryClient.invalidateQueries({ queryKey: ['notes'], exact: false });
        router.back();
    };

    const fieldId = useId();
    return (
        <form action={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-title`}>Title</label>
                    <input type="text" name="title" id={`${fieldId}-title`} value={safeDraft.title} className={css.input} onChange={handleChange}/>
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-content`}>Content</label>
                    <textarea name="content" id={`${fieldId}-content`} value={safeDraft.content} rows={8} className={css.textarea} onChange={handleChange} />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <select name="tag" id={`${fieldId}-tag`} value={safeDraft.tag} className={css.select} onChange={handleChange}>
                    <option value="" disabled>Choose Tag</option>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </select>
            </div>

            <div className={css.actions}>
                <button type="button" className={css.cancelButton} onClick={() => router.back()}>Cancel</button>
                <button type="submit" disabled={false} className={css.submitButton}>Create Note</button>
            </div>
            </form>
 )
}
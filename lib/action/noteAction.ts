'use server';

import { createNote } from "../api";
import type { NoteTag } from "@/types/note";

export async function noteAction(formData: FormData) {
    const values = {
        title: (formData.get('title') as string) ?? "",
        content: (formData.get('content') as string)?? "",
        tag: (formData.get('tag') as NoteTag)?? 'Todo',
    };
    await createNote(values);
  };

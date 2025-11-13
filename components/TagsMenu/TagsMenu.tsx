'use client'
import Link from 'next/link';
import css from './TagsMenu.module.css'
import { useState } from 'react';

const tags: string[] = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function TagsMenu() {
    const [isOpen, setIsOpen] = useState(false); 

  //const toggleMenu = () => setIsOpen((prev) => !prev);
  
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

    return (
    <div className={css.menuContainer}>
  <button className={css.menuButton} onClick={toggleMenu}>
    Notes ▾
            </button> 
            {isOpen && (<ul className={css.menuList}>
            {tags.map((tag) => (
                <li className={css.menuItem} key={tag}>
                <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={closeMenu}>
                  {tag}
                </Link>
              </li>
            ))}
    </ul>)}
        </div>
    )
}
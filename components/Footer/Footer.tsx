import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>©{new Date().getFullYear()}NoteNub. All rights reserved.</p>
        <div className={css.wrap}></div>
        <p>Developer: Shapoval Oleg</p>
        <p>
          Contact us:
          <a href='mailto:student@notehub.app'> student@notehub.app</a>
        </p>
      </div>
    </footer>
  );
}

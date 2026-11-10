/** Runs before first paint (layout.tsx): plays the book intro on the first home-page view of a visit. */
export const INTRO_SCRIPT = `try{var d=document.documentElement;if(location.pathname==="/"&&!sessionStorage.getItem("jp-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.intro="play"}}catch(e){}`;

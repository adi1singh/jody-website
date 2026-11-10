import styles from "../admin/admin.module.css";

export const metadata = { title: "Privacy · Jody Pockran" };

export default function PrivacyPage() {
  return <main className={styles.page}><article className={`${styles.wrap} ${styles.article}`}>
    <a className={styles.brand} href="/">Jody Pockran</a>
    <h1 className={styles.heading}>Your privacy.</h1>
    <p>This page explains how information submitted through this website is used for enquiries, session requests, book updates and audio or newsletter signups.</p>
    <h2>What you choose to share</h2>
    <p>Forms collect your email address, chosen interest and contact preferences. Depending on the form, you may also provide your name, phone number, a message and a preferred time. Please keep your message to the information needed for an initial enquiry; detailed medical records are not needed here.</p>
    <h2>How your information is used</h2>
    <p>Your submission is stored so Jody’s authorised website team can review it and respond to your request. Email updates and SMS preferences are recorded separately. Signing up for book, audio or newsletter updates requires an explicit email opt-in. A session request does not confirm an appointment.</p>
    <p>The website does not automatically send email or SMS messages. If the owner connects a CRM, submissions can also be forwarded to that configured service to help manage follow-up. Only authorised accounts can access the owner enquiry area or exports.</p>
    <h2>Technical information</h2>
    <p>The website records the submission time, form source and consent choices. It also uses short-lived, hashed identifiers derived from contact or connection information to limit repeated automated submissions. Raw IP addresses are not stored in the enquiry records.</p>
    <h2>Your choices</h2>
    <p>You can leave optional fields blank. Update preferences and SMS permissions are optional for general enquiries and session requests. To ask about your information, change your contact preferences, or request correction or removal, email <a href="mailto:jannpockran@gmail.com">jannpockran@gmail.com</a>.</p>
    <p>Submissions are retained for review and follow-up. To ask what is stored or request removal, contact Jody using the email below.</p>
    <h2>Contact</h2>
    <p>Jody Pockran<br /><a href="mailto:jannpockran@gmail.com">jannpockran@gmail.com</a></p>
    <p><a className={styles.button} href="/#contact">Back to your next chapter</a></p>
  </article></main>;
}

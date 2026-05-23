# Lead Management System

A simple web application to collect and manage leads from potential customers.

---

## What does this application do?

### For Visitors
When someone visits the website, they are greeted with a clean contact form where they can fill in their basic details — name, email, phone number, and how they found out about the business (website, Facebook, Google, or referral).

Once they submit the form, they land on a thank-you page confirming their response was received. Each person can only submit the form once.

### For Admins
The business owner or team member can log in through a separate admin portal. After logging in, they get access to a private dashboard where they can:

- See a quick summary of how many leads have come in overall and how many arrived today
- View a breakdown of which sources (Website, Facebook, Google, Referral) are bringing in the most leads
- Browse a full list of every lead submitted, along with their contact details and the date they reached out
- Search for a specific lead by name, email, or phone number
- Filter leads by source or sort them by date
- Delete any lead entry if needed

---

## Who is this for?

Small businesses, freelancers, or startups who want a straightforward way to capture interest from potential customers and review them in one place — without needing a complex CRM tool.

---

## How does the flow look?

```
Visitor fills form → Sees thank-you page
                           ↓
              Lead saved to database
                           ↓
         Admin logs in → Views dashboard → Manages leads
```

---

> For setup and technical details, refer to the `README.md` inside the `lead-management-server` and `lead-management-client` folders.

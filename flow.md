<<<<<<<<<<<< File Upload to Cloudinary (Express + Multer) >>>>>>>>>>>>>>>>

🧠 High-level flow

⭐ Step 1 : User selects file in frontend

⭐ Step 2: Frontend sends file using FormData

⭐ Step 3: Express receives file via multer

⭐ Step 4: File is temporarily stored in memory (or disk)

⭐ Step 5: Server uploads file to Cloudinary

⭐ Step 6: Cloudinary returns a hosted URL

⭐ Step 7: You send that URL back to frontend or save in DB

<<<<<<<<<<<< Mail (Nodemailer) >>>>>>>>>>>>>>>>
    ⭐Step 1: User requests password reset

    ⭐Step 2: Server generates a unique token

    ⭐Step 3: Token is stored in database with user

    ⭐Step 4: Email sent with reset link containing the token

    ⭐Step 5: User clicks link → frontend displays reset form

    ⭐Step 6: User submits new password

    ⭐Step 7: Server verifies token → hashes password → updates user
    
    ⭐Step 8: Send confirmation email → done
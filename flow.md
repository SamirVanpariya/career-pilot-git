<<<<<<<<<<<< File Upload to Cloudinary (Express + Multer) >>>>>>>>>>>>>>>>

🧠 High-level flow

⭐ Step 1 : User selects file in frontend

⭐ Step 2: Frontend sends file using FormData

⭐ Step 3: Express receives file via multer

⭐ Step 4: File is temporarily stored in memory (or disk)

⭐ Step 5: Server uploads file to Cloudinary

⭐ Step 6: Cloudinary returns a hosted URL

⭐ Step 7: You send that URL back to frontend or save in DB


const fs = require('fs');
const path = require('path');

// @ docs   Get All users
// @ req    GET
// @ Access Public
exports.getAllUser = (req, res) => {
    // dataBase.json faylidan ma'lumotlarni o'qish
    const filePath = path.join(__dirname, "../db/dataBase.json");

    try {
        // Faylni o'qish (agar fayl bo'sh bo'lsa, yangi massiv yaratish)
        let fileData = '[]';  // Default qiymat sifatida bo'sh massiv
        if (fs.existsSync(filePath)) {
            fileData = fs.readFileSync(filePath, 'utf8'); // Faylni o'qish
        }

        // Fayldan olingan ma'lumotlarni JSON formatiga aylantirish
        const data = fileData ? JSON.parse(fileData) : [];

        // Ma'lumotlarni qaytarish
        return res.status(200).json({
            success: true,
            message: "Hammasi yaxshi",
            data: data // Foydalanuvchi ro'yxatini yuborish
        });

    } catch (error) {
        console.error("Xatolik:", error);
        return res.status(500).json({
            success: false,
            message: "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
        });
    }
};


// @ docs   Get All users 
// @ req    GET
// @ Access Public
exports.createUser = (req, res) => {
    const { name, email, age, callnumber } = req.body;

    // Agar foydalanuvchi ma'lumotlari to'liq bo'lmasa
    if (!name || !email || !age || !callnumber) {
        return res.status(400).json({
            message: "Malumotlar to'ldirilmagan",
        });
    }

    // Foydalanuvchi uchun noyob ID yaratish
    const date = Date.now();

    // Yangi foydalanuvchi ma'lumotlarini ob'ekt sifatida yaratish
    const newUser = {
        id: date,
        name,
        age,
        email,
        callnumber
    };

    // JSON faylga ma'lumotlarni yozishdan oldin uni o'qish
    const filePath = path.join(__dirname, "../db/dataBase.json");

    try {
        // Faylni o'qish (agar fayl bo'sh bo'lsa, yangi massiv yaratish)
        let fileData = '[]';  // Fayl bo'sh bo'lsa, default qiymat sifatida bo'sh massivni yaratamiz
        if (fs.existsSync(filePath)) {
            fileData = fs.readFileSync(filePath, 'utf8');
        }

        // Fayldan olingan ma'lumotlarni JSON formatiga o'zgartiramiz
        const data = fileData ? JSON.parse(fileData) : [];

        // Yangi foydalanuvchini ro'yxatga qo'shish
        data.push(newUser);

        // Yangilangan ro'yxatni JSON formatida faylga yozish
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        // Javob yuborish
        return res.status(201).json({
            message: "Foydalanuvchi muvaffaqiyatli yaratildi",
            user: newUser
        });

    } catch (error) {
        console.error("Xato:", error);
        return res.status(500).json({
            message: "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
        });
    }
};


var mosques = [
    { id: 1, name: 'المساكن', address: 'بدواى - بجوار نادى شبان بدواى', youtubeUrl: '', imageUrl: '' },
    { id: 2, name: 'التسويق', address: 'بدواي - بجوار الثلاجة', youtubeUrl: '', imageUrl: '' },
    { id: 3, name: 'عائشة رياض', address: 'بدواى - بجوار الحاج صبرى', youtubeUrl: '', imageUrl: '' },
    { id: 4, name: 'قباء "عيسي"', address: 'بدواى - امام الثانوى العام', youtubeUrl: '', imageUrl: '' },
    { id: 5, name: 'عباد الرحمن', address: 'بدواى', youtubeUrl: '', imageUrl: '' },
    { id: 6, name: 'التوحيد', address: 'بدواى - الميدان', youtubeUrl: '', imageUrl: '' },
    { id: 7, name: 'رياض الصالحين', address: 'بدواى', youtubeUrl: '', imageUrl: '' },
    { id: 8, name: 'الحاج حسين', address: 'بدواى', youtubeUrl: '', imageUrl: '' },
    { id: 9, name: 'الرحمه', address: 'بدواى', youtubeUrl: '', imageUrl: '' },
    { id: 10, name: 'عبدالرحمن', address: 'بدواى', youtubeUrl: '', imageUrl: '' },
    { id: 11, name: 'أهل السنة', address: 'بدواى', youtubeUrl: '', imageUrl: '' },
    { id: 12, name: 'يوسف الصديق', address: 'بدواى', youtubeUrl: '', imageUrl: '' },
    { id: 13, name: 'امام المرسلين "السيد الامام"', address: 'بدواى', youtubeUrl: '', imageUrl: '' },
    { id: 14, name: 'سيد اسحاق', address: 'بدواى', youtubeUrl: '', imageUrl: '' },
    { id: 15, name: 'رزق ابو ندا', address: 'بدواى', youtubeUrl: '', imageUrl: '' },
    { id: 16, name: 'فتوح', address: 'بدواى', youtubeUrl: '', imageUrl: '' },
    { id: 17, name: 'فهيم', address: 'بدواى', youtubeUrl: '', imageUrl: '' },
    { id: 18, name: 'علي عبدالسلام', address: 'بدواى', youtubeUrl: '', imageUrl: '' },
    { id: 19, name: 'الزاوية', address: 'بدواى', youtubeUrl: '', imageUrl: '' },
    { id: 20, name: 'الكبير', address: 'بدواى', youtubeUrl: '', imageUrl: '' },
    { id: 21, name: 'الساجدين "عديسه"', address: 'بدواى', youtubeUrl: '', imageUrl: '' },
];

var readers = [
    { id: 0, name: 'غير متوفر', youtubeUrl: '', imageUrl: '' },
    { id: 1, name: 'محمد مبروك', youtubeUrl: '', imageUrl: 'mohamed-mabrouk.jpg' },
    { id: 2, name: 'سيد بحبح', youtubeUrl: '', imageUrl: '' },
    { id: 3, name: 'حسن عثمان الازهرى', youtubeUrl: '', imageUrl: '' },
    { id: 4, name: 'محمد محمد رزق', youtubeUrl: '', imageUrl: '' },
    { id: 5, name: 'محمد جاد', youtubeUrl: '', imageUrl: '' },
    { id: 6, name: 'يوسف عطا', youtubeUrl: '', imageUrl: 'yousef-ata.jpeg' },
    { id: 7, name: 'سمير غانم', youtubeUrl: '', imageUrl: '' },
    { id: 8, name: 'علي جاب الله', youtubeUrl: '', imageUrl: '' },
    { id: 9, name: 'عبدالله محمد الحداد', youtubeUrl: '', imageUrl: 'abdallah-medhat.jpeg' },
    { id: 10, name: 'انس الشقرفى', youtubeUrl: '', imageUrl: 'anas-sho3rofi.jpeg' },
    { id: 11, name: 'عباس عبدالعزيز', youtubeUrl: '', imageUrl: '' },
    { id: 12, name: 'يوسف هشام', youtubeUrl: '', imageUrl: '' },
    { id: 13, name: 'احمد السعيد على', youtubeUrl: '', imageUrl: 'ahmed-elsaeed.jpeg' },
    { id: 14, name: 'محمد مدحت الحداد', youtubeUrl: '', imageUrl: 'mohamed-medhat.jpeg' },
    { id: 15, name: 'ابراهيم حمدى بلاطه', youtubeUrl: '', imageUrl: 'ibrahim-hamdy.jpeg' },
    { id: 16, name: 'حمدى بلاطه', youtubeUrl: '', imageUrl: '' },
    { id: 17, name: 'محمود عبدالستار', youtubeUrl: '', imageUrl: '' },
    { id: 18, name: 'عبدالرحمن محمد على', youtubeUrl: '', imageUrl: '' },
    { id: 19, name: 'أحمد رضا الشقرفى', youtubeUrl: '', imageUrl: '' },
    { id: 20, name: 'محمد التابعى', youtubeUrl: '', imageUrl: 'mohamed-tab3y.jpeg' },
    { id: 21, name: 'ابراهيم الدرس', youtubeUrl: '', imageUrl: '' },
    { id: 22, name: 'عبدالرحمن رشدى', youtubeUrl: '', imageUrl: 'abdellrahman-roshdy.jpeg' },
    { id: 23, name: 'أشرف سكرانه', youtubeUrl: '', imageUrl: '' },
    { id: 24, name: 'احمد الحارون', youtubeUrl: '', imageUrl: '' },
    { id: 25, name: 'عبدالله مرزوق', youtubeUrl: '', imageUrl: '' },
    { id: 26, name: 'ضياء احمد', youtubeUrl: '', imageUrl: 'diaa-ahmed.jpeg' },
    { id: 27, name: 'رضا عبدالعزيز', youtubeUrl: '', imageUrl: '' },
];

var schedules = [
    {
        day: 1,
        dayName: 'الأحد',
        date: new Date("3/10/2024, 4:30:00 PM"),
        mosqueReaders: [
            { mosqueId: 1, readerIds: [6] },
            { mosqueId: 2, readerIds: [2] },
            { mosqueId: 3, readerIds: [8, 13] },
            { mosqueId: 4, readerIds: [10, 14] },
            { mosqueId: 5, readerIds: [5, 7] },
            { mosqueId: 6, readerIds: [4] },
            { mosqueId: 7, readerIds: [0] },
            { mosqueId: 8, readerIds: [27] },
            { mosqueId: 9, readerIds: [0] },
            { mosqueId: 10, readerIds: [19] },
            { mosqueId: 11, readerIds: [1, 22] },
            { mosqueId: 12, readerIds: [9, 12] },
            { mosqueId: 13, readerIds: [0] },
            { mosqueId: 14, readerIds: [11] },
            { mosqueId: 15, readerIds: [25] },
            { mosqueId: 16, readerIds: [15] },
            { mosqueId: 17, readerIds: [16] },
            { mosqueId: 18, readerIds: [23] },
            { mosqueId: 19, readerIds: [24] },
            { mosqueId: 20, readerIds: [21] },
            { mosqueId: 21, readerIds: [26] }
        ]
    },
    {
        day: 2,
        dayName: 'الاثنين',
        date: new Date("3/11/2024, 4:30:00 PM"),
        mosqueReaders: [
            { mosqueId: 1, readerIds: [6] },
            { mosqueId: 2, readerIds: [2] },
            { mosqueId: 3, readerIds: [8] },
            { mosqueId: 4, readerIds: [10] },
            { mosqueId: 5, readerIds: [5, 7] },
            { mosqueId: 6, readerIds: [13] },
            { mosqueId: 7, readerIds: [0] },
            { mosqueId: 8, readerIds: [27] },
            { mosqueId: 9, readerIds: [0] },
            { mosqueId: 10, readerIds: [19] },
            { mosqueId: 11, readerIds: [1, 22] },
            { mosqueId: 12, readerIds: [9, 12] },
            { mosqueId: 13, readerIds: [0] },
            { mosqueId: 14, readerIds: [11] },
            { mosqueId: 15, readerIds: [25] },
            { mosqueId: 16, readerIds: [15] },
            { mosqueId: 17, readerIds: [16] },
            { mosqueId: 18, readerIds: [23] },
            { mosqueId: 19, readerIds: [24] },
            { mosqueId: 20, readerIds: [21] },
            { mosqueId: 21, readerIds: [26] }
        ]
    },
    {
        day: 3,
        dayName: 'الثلاثاء',
        date: new Date("3/12/2024, 4:30:00 PM"),
        mosqueReaders: [
            { mosqueId: 1, readerIds: [6] },
            { mosqueId: 2, readerIds: [2] },
            { mosqueId: 3, readerIds: [8, 13] },
            { mosqueId: 4, readerIds: [10, 14] },
            { mosqueId: 5, readerIds: [5, 7] },
            { mosqueId: 6, readerIds: [3] },
            { mosqueId: 7, readerIds: [0] },
            { mosqueId: 8, readerIds: [27] },
            { mosqueId: 9, readerIds: [0] },
            { mosqueId: 10, readerIds: [19] },
            { mosqueId: 11, readerIds: [1, 22] },
            { mosqueId: 12, readerIds: [9, 12] },
            { mosqueId: 13, readerIds: [0] },
            { mosqueId: 14, readerIds: [11] },
            { mosqueId: 15, readerIds: [25] },
            { mosqueId: 16, readerIds: [15] },
            { mosqueId: 17, readerIds: [16] },
            { mosqueId: 18, readerIds: [23] },
            { mosqueId: 19, readerIds: [24] },
            { mosqueId: 20, readerIds: [21] },
            { mosqueId: 21, readerIds: [26] }
        ]
    },
    {
        day: 4,
        dayName: 'الاربعاء',
        date: new Date("3/13/2024, 4:30:00 PM"),
        mosqueReaders: [
            { mosqueId: 1, readerIds: [6] },
            { mosqueId: 2, readerIds: [2] },
            { mosqueId: 3, readerIds: [8, 13] },
            { mosqueId: 4, readerIds: [10, 14] },
            { mosqueId: 5, readerIds: [5, 7] },
            { mosqueId: 6, readerIds: [20] },
            { mosqueId: 7, readerIds: [0] },
            { mosqueId: 8, readerIds: [27] },
            { mosqueId: 9, readerIds: [0] },
            { mosqueId: 10, readerIds: [19] },
            { mosqueId: 11, readerIds: [1, 22] },
            { mosqueId: 12, readerIds: [9, 12] },
            { mosqueId: 13, readerIds: [0] },
            { mosqueId: 14, readerIds: [11] },
            { mosqueId: 15, readerIds: [25] },
            { mosqueId: 16, readerIds: [15] },
            { mosqueId: 17, readerIds: [16] },
            { mosqueId: 18, readerIds: [23] },
            { mosqueId: 19, readerIds: [24] },
            { mosqueId: 20, readerIds: [21] },
            { mosqueId: 21, readerIds: [26] }
        ]
    },
    {
        day: 5,
        dayName: 'الخميس',
        date: new Date("3/14/2024, 4:30:00 PM"),
        mosqueReaders: [
            { mosqueId: 1, readerIds: [6] },
            { mosqueId: 2, readerIds: [2] },
            { mosqueId: 3, readerIds: [8, 13] },
            { mosqueId: 4, readerIds: [10, 14] },
            { mosqueId: 5, readerIds: [5, 7] },
            { mosqueId: 6, readerIds: [4] },
            { mosqueId: 7, readerIds: [0] },
            { mosqueId: 8, readerIds: [27] },
            { mosqueId: 9, readerIds: [0] },
            { mosqueId: 10, readerIds: [19] },
            { mosqueId: 11, readerIds: [1, 22] },
            { mosqueId: 12, readerIds: [9, 12] },
            { mosqueId: 13, readerIds: [0] },
            { mosqueId: 14, readerIds: [11] },
            { mosqueId: 15, readerIds: [25] },
            { mosqueId: 16, readerIds: [0] },
            { mosqueId: 17, readerIds: [15] },
            { mosqueId: 18, readerIds: [23] },
            { mosqueId: 19, readerIds: [24] },
            { mosqueId: 20, readerIds: [21] },
            { mosqueId: 21, readerIds: [26] }
        ]
    },
    {
        day: 6,
        dayName: 'الجمعة',
        date: new Date("3/15/2024, 4:30:00 PM"),
        mosqueReaders: [
            { mosqueId: 1, readerIds: [6] },
            { mosqueId: 2, readerIds: [2] },
            { mosqueId: 3, readerIds: [8, 13] },
            { mosqueId: 4, readerIds: [10, 14] },
            { mosqueId: 5, readerIds: [5, 7] },
            { mosqueId: 6, readerIds: [20] },
            { mosqueId: 7, readerIds: [0] },
            { mosqueId: 8, readerIds: [27] },
            { mosqueId: 9, readerIds: [0] },
            { mosqueId: 10, readerIds: [19] },
            { mosqueId: 11, readerIds: [1, 22] },
            { mosqueId: 12, readerIds: [9, 12] },
            { mosqueId: 13, readerIds: [0] },
            { mosqueId: 14, readerIds: [11] },
            { mosqueId: 15, readerIds: [25] },
            { mosqueId: 16, readerIds: [15] },
            { mosqueId: 17, readerIds: [16] },
            { mosqueId: 18, readerIds: [23] },
            { mosqueId: 19, readerIds: [24] },
            { mosqueId: 20, readerIds: [21] },
            { mosqueId: 21, readerIds: [26] }
        ]
    },
    {
        day: 7,
        dayName: 'السبت',
        date: new Date("3/16/2024, 4:30:00 PM"),
        mosqueReaders: [
            { mosqueId: 1, readerIds: [6] },      // المساكن
            { mosqueId: 2, readerIds: [2] },      // التسويق
            { mosqueId: 3, readerIds: [8] },      // عائشة رياض
            { mosqueId: 4, readerIds: [10, 14] }, // عيسي
            { mosqueId: 5, readerIds: [5, 7] },   // عباد الرحمن
            { mosqueId: 6, readerIds: [13] },     // التوحيد
            { mosqueId: 7, readerIds: [0] },      // رياض الصالحين
            { mosqueId: 8, readerIds: [27] },     // الحاج حسين
            { mosqueId: 9, readerIds: [0] },      // الرحمة 
            { mosqueId: 10, readerIds: [19] },    //  عبدالرحمن
            { mosqueId: 11, readerIds: [1, 22] }, // أهل السنة
            { mosqueId: 12, readerIds: [9, 12] }, // يوسف الصديق
            { mosqueId: 13, readerIds: [0] },     // السيد الامام
            { mosqueId: 14, readerIds: [11] },    // سيد اسحاق
            { mosqueId: 15, readerIds: [25] },    // رزق ابو ندا
            { mosqueId: 16, readerIds: [0] },     // فتوح
            { mosqueId: 17, readerIds: [16] },    // فهيم
            { mosqueId: 18, readerIds: [23] },    // على عبدالسلام
            { mosqueId: 19, readerIds: [24] },    // الزاوية
            { mosqueId: 20, readerIds: [21] },    // الكبير
            { mosqueId: 21, readerIds: [26] }     // عديسه
        ]
    },
    {
        day: 8,
        dayName: 'الاحد',
        date: new Date("3/17/2024, 4:30:00 PM"),
        mosqueReaders: [
            { mosqueId: 1, readerIds: [9, 12] },      // المساكن
            { mosqueId: 2, readerIds: [2] },      // التسويق
            { mosqueId: 3, readerIds: [10, 14] },      // عائشة رياض
            { mosqueId: 4, readerIds: [6] }, // عيسي
            { mosqueId: 5, readerIds: [8, 13] },   // عباد الرحمن
            { mosqueId: 6, readerIds: [4] },     // التوحيد
            { mosqueId: 7, readerIds: [0] },      // رياض الصالحين
            { mosqueId: 8, readerIds: [27] },     // الحاج حسين
            { mosqueId: 9, readerIds: [0] },      // الرحمة 
            { mosqueId: 10, readerIds: [19] },    //  عبدالرحمن
            { mosqueId: 11, readerIds: [5, 7] }, // أهل السنة
            { mosqueId: 12, readerIds: [1, 22] }, // يوسف الصديق
            { mosqueId: 13, readerIds: [0] },     // السيد الامام
            { mosqueId: 14, readerIds: [11] },    // سيد اسحاق
            { mosqueId: 15, readerIds: [25] },    // رزق ابو ندا
            { mosqueId: 16, readerIds: [15] },     // فتوح
            { mosqueId: 17, readerIds: [16] },    // فهيم
            { mosqueId: 18, readerIds: [23] },    // على عبدالسلام
            { mosqueId: 19, readerIds: [24] },    // الزاوية
            { mosqueId: 20, readerIds: [21] },    // الكبير
            { mosqueId: 21, readerIds: [0] }     // عديسه
        ]
    },
    {
        day: 9,
        dayName: 'الاثنين',
        date: new Date("3/18/2024, 4:30:00 PM"),
        mosqueReaders: [
            { mosqueId: 1, readerIds: [9, 12] },      // المساكن
            { mosqueId: 2, readerIds: [2] },      // التسويق
            { mosqueId: 3, readerIds: [10, 14] },      // عائشة رياض
            { mosqueId: 4, readerIds: [6] }, // عيسي
            { mosqueId: 5, readerIds: [8] },   // عباد الرحمن
            { mosqueId: 6, readerIds: [13] },     // التوحيد
            { mosqueId: 7, readerIds: [0] },      // رياض الصالحين
            { mosqueId: 8, readerIds: [27] },     // الحاج حسين
            { mosqueId: 9, readerIds: [0] },      // الرحمة 
            { mosqueId: 10, readerIds: [19] },    //  عبدالرحمن
            { mosqueId: 11, readerIds: [5, 7] }, // أهل السنة
            { mosqueId: 12, readerIds: [1, 22] }, // يوسف الصديق
            { mosqueId: 13, readerIds: [0] },     // السيد الامام
            { mosqueId: 14, readerIds: [11] },    // سيد اسحاق
            { mosqueId: 15, readerIds: [25] },    // رزق ابو ندا
            { mosqueId: 16, readerIds: [15] },     // فتوح
            { mosqueId: 17, readerIds: [16] },    // فهيم
            { mosqueId: 18, readerIds: [23] },    // على عبدالسلام
            { mosqueId: 19, readerIds: [24] },    // الزاوية
            { mosqueId: 20, readerIds: [21] },    // الكبير
            { mosqueId: 21, readerIds: [0] }     // عديسه
        ]
    },
    {
        day: 10,
        dayName: 'الثلاثاء',
        date: new Date("3/19/2024, 4:30:00 PM"),
        mosqueReaders: [
            { mosqueId: 1, readerIds: [9, 12] },      // المساكن
            { mosqueId: 2, readerIds: [2] },      // التسويق
            { mosqueId: 3, readerIds: [10, 14] },      // عائشة رياض
            { mosqueId: 4, readerIds: [6] }, // عيسي
            { mosqueId: 5, readerIds: [8, 13] },   // عباد الرحمن
            { mosqueId: 6, readerIds: [3] },     // التوحيد
            { mosqueId: 7, readerIds: [0] },      // رياض الصالحين
            { mosqueId: 8, readerIds: [27] },     // الحاج حسين
            { mosqueId: 9, readerIds: [0] },      // الرحمة 
            { mosqueId: 10, readerIds: [19] },    //  عبدالرحمن
            { mosqueId: 11, readerIds: [5, 7] }, // أهل السنة
            { mosqueId: 12, readerIds: [1, 22] }, // يوسف الصديق
            { mosqueId: 13, readerIds: [0] },     // السيد الامام
            { mosqueId: 14, readerIds: [11] },    // سيد اسحاق
            { mosqueId: 15, readerIds: [25] },    // رزق ابو ندا
            { mosqueId: 16, readerIds: [15] },     // فتوح
            { mosqueId: 17, readerIds: [16] },    // فهيم
            { mosqueId: 18, readerIds: [23] },    // على عبدالسلام
            { mosqueId: 19, readerIds: [24] },    // الزاوية
            { mosqueId: 20, readerIds: [21] },    // الكبير
            { mosqueId: 21, readerIds: [0] }     // عديسه
        ]
    },
    {
        day: 11,
        dayName: 'الاربعاء',
        date: new Date("3/20/2024, 4:30:00 PM"),
        mosqueReaders: [
            { mosqueId: 1, readerIds: [9, 12] },      // المساكن
            { mosqueId: 2, readerIds: [2] },      // التسويق
            { mosqueId: 3, readerIds: [10, 14] },      // عائشة رياض
            { mosqueId: 4, readerIds: [6] }, // عيسي
            { mosqueId: 5, readerIds: [8, 13] },   // عباد الرحمن
            { mosqueId: 6, readerIds: [20] },     // التوحيد
            { mosqueId: 7, readerIds: [0] },      // رياض الصالحين
            { mosqueId: 8, readerIds: [27] },     // الحاج حسين
            { mosqueId: 9, readerIds: [0] },      // الرحمة 
            { mosqueId: 10, readerIds: [19] },    //  عبدالرحمن
            { mosqueId: 11, readerIds: [5, 7] }, // أهل السنة
            { mosqueId: 12, readerIds: [1, 22] }, // يوسف الصديق
            { mosqueId: 13, readerIds: [0] },     // السيد الامام
            { mosqueId: 14, readerIds: [11] },    // سيد اسحاق
            { mosqueId: 15, readerIds: [25] },    // رزق ابو ندا
            { mosqueId: 16, readerIds: [15] },     // فتوح
            { mosqueId: 17, readerIds: [16] },    // فهيم
            { mosqueId: 18, readerIds: [23] },    // على عبدالسلام
            { mosqueId: 19, readerIds: [24] },    // الزاوية
            { mosqueId: 20, readerIds: [21] },    // الكبير
            { mosqueId: 21, readerIds: [0] }     // عديسه
        ]
    },
    {
        day: 12,
        dayName: 'الخميس',
        date: new Date("3/21/2024, 4:30:00 PM"),
        mosqueReaders: [
            { mosqueId: 1, readerIds: [9, 12] },      // المساكن
            { mosqueId: 2, readerIds: [2] },      // التسويق
            { mosqueId: 3, readerIds: [10, 14] },      // عائشة رياض
            { mosqueId: 4, readerIds: [6] }, // عيسي
            { mosqueId: 5, readerIds: [8, 13] },   // عباد الرحمن
            { mosqueId: 6, readerIds: [4] },     // التوحيد
            { mosqueId: 7, readerIds: [0] },      // رياض الصالحين
            { mosqueId: 8, readerIds: [27] },     // الحاج حسين
            { mosqueId: 9, readerIds: [0] },      // الرحمة 
            { mosqueId: 10, readerIds: [19] },    //  عبدالرحمن
            { mosqueId: 11, readerIds: [5, 7] }, // أهل السنة
            { mosqueId: 12, readerIds: [1, 22] }, // يوسف الصديق
            { mosqueId: 13, readerIds: [0] },     // السيد الامام
            { mosqueId: 14, readerIds: [11] },    // سيد اسحاق
            { mosqueId: 15, readerIds: [25] },    // رزق ابو ندا
            { mosqueId: 16, readerIds: [15] },     // فتوح
            { mosqueId: 17, readerIds: [16] },    // فهيم
            { mosqueId: 18, readerIds: [23] },    // على عبدالسلام
            { mosqueId: 19, readerIds: [24] },    // الزاوية
            { mosqueId: 20, readerIds: [21] },    // الكبير
            { mosqueId: 21, readerIds: [0] }     // عديسه
        ]
    },
    {
        day: 13,
        dayName: 'الجمعة',
        date: new Date("3/22/2024, 4:30:00 PM"),
        mosqueReaders: [
            { mosqueId: 1, readerIds: [9, 12] },      // المساكن
            { mosqueId: 2, readerIds: [2] },      // التسويق
            { mosqueId: 3, readerIds: [10, 14] },      // عائشة رياض
            { mosqueId: 4, readerIds: [6] }, // عيسي
            { mosqueId: 5, readerIds: [8, 13] },   // عباد الرحمن
            { mosqueId: 6, readerIds: [20] },     // التوحيد
            { mosqueId: 7, readerIds: [0] },      // رياض الصالحين
            { mosqueId: 8, readerIds: [27] },     // الحاج حسين
            { mosqueId: 9, readerIds: [0] },      // الرحمة 
            { mosqueId: 10, readerIds: [19] },    //  عبدالرحمن
            { mosqueId: 11, readerIds: [5, 7] }, // أهل السنة
            { mosqueId: 12, readerIds: [1, 22] }, // يوسف الصديق
            { mosqueId: 13, readerIds: [0] },     // السيد الامام
            { mosqueId: 14, readerIds: [11] },    // سيد اسحاق
            { mosqueId: 15, readerIds: [25] },    // رزق ابو ندا
            { mosqueId: 16, readerIds: [15] },     // فتوح
            { mosqueId: 17, readerIds: [16] },    // فهيم
            { mosqueId: 18, readerIds: [23] },    // على عبدالسلام
            { mosqueId: 19, readerIds: [24] },    // الزاوية
            { mosqueId: 20, readerIds: [21] },    // الكبير
            { mosqueId: 21, readerIds: [0] }     // عديسه
        ]
    }
];


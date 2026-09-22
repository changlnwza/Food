import React, { useState, useEffect, useMemo } from 'react';
import {
  Utensils,
  Calendar,
  Sparkles,
  Plus,
  Search,
  Heart,
  Filter,
  Clock,
  Flame,
  RefreshCw,
  Trash2,
  Edit3,
  Check,
  X,
  ChevronRight,
  PieChart,
  BookOpen,
  Coffee,
  Sun,
  Moon,
  Apple,
  ChefHat,
  RotateCcw,
  SlidersHorizontal,
  Info,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

const INITIAL_MENUS = [
  {
    id: 'm1',
    name: 'กะเพราอกไก่ไข่ดาวน้ำ',
    category: 'อาหารคาว',
    calories: 380,
    protein: 35,
    carbs: 42,
    fat: 8,
    prepTime: '15 นาที',
    difficulty: 'ง่าย',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      'อกไก่สับ 150 กรัม',
      'ใบกะเพรา 1 กำมือ',
      'พริกขี้หนูสดและกระเทียมสับ 1 ช้อนโต๊ะ',
      'น้ำซอสโซเดียมต่ำ 1.5 ช้อนโต๊ะ',
      'ไข่ไก่ 1 ฟอง (ทำไข่ดาวน้ำ)'
    ],
    instructions: [
      'ตั้งกระทะใช้น้ำเปล่าแทนน้ำมัน ผัดพริกและกระเทียมจนหอม',
      'ใส่อกไก่สับลงไปผัดจนสุกทั่วกัน',
      'ปรุงรสด้วยซอสโซเดียมต่ำ เติมน้ำซุปเล็กน้อย',
      'ใส่ใบกะเพรา ผัดเร่งไฟแรงสั้นๆ แล้วปิดไฟ',
      'เสิร์ฟพร้อมข้าวกล้องและไข่ดาวน้ำ'
    ],
    isFavorite: true
  },
  {
    id: 'm2',
    name: 'ต้มยำกุ้งน้ำใสสมุนไพร',
    category: 'อาหารคาว',
    calories: 220,
    protein: 26,
    carbs: 12,
    fat: 5,
    prepTime: '25 นาที',
    difficulty: 'ปานกลาง',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      'กุ้งสดแกะเปลือก 200 กรัม',
      'เห็ดฟางหรือเห็ดออรินจิ 100 กรัม',
      'ข่า ตะไคร้ ใบมะกรูด หอมแดง',
      'น้ำปลาแท้ 1.5 ช้อนโต๊ะ',
      'น้ำมะนาวสด 2 ช้อนโต๊ะ',
      'พริกจินดาบด'
    ],
    instructions: [
      'ต้มน้ำให้เดือด ใส่ข่า ตะไคร้ หอมแดง ทุบลงไป ทิ้งไว้จนหอมสมุนไพร',
      'ใส่เห็ดและกุ้งสดลงไป ห้ามคนจนกว่ากุ้งจะสุก',
      'ปิดไฟ แล้วค่อยปรุงรสด้วยน้ำปลา พริก และน้ำมะนาวสด',
      'โรยใบมะกรูดและผักชีฝรั่ง พร้อมเสิร์ฟ'
    ],
    isFavorite: true
  },
  {
    id: 'm3',
    name: 'สลัดอกไก่ย่างซอสส้มอบเชย',
    category: 'คลีน',
    calories: 310,
    protein: 32,
    carbs: 22,
    fat: 9,
    prepTime: '20 นาที',
    difficulty: 'ง่าย',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      'อกไก่หมักพริกไทยดำ 150 กรัม',
      'ผักสลัดคอส/เรดโอ๊ค 2 Cup',
      'มะเขือเทศเชอร์รี่ 5-6 ลูก',
      'อัลมอนด์สไลซ์อบ 1 ช้อนโต๊ะ',
      'น้ำดรสซิ่งส้มบัลซามิก 2 ช้อนโต๊ะ'
    ],
    instructions: [
      'ย่างอกไก่บนกระทะสเต็กจนสุกเหลืองสวย หั่นเป็นชิ้นพอดีคำ',
      'จัดผักสลัด มะเขือเทศเชอร์รี่ใส่จาน',
      'วางอกไก่ย่างลงบนผัก โรยอัลมอนด์อบ',
      'ราดน้ำดรสซิ่งส้มบัลซามิกก่อนรับประทาน'
    ],
    isFavorite: false
  },
  {
    id: 'm4',
    name: 'กรีกโยเกิร์ตพาร์เฟต์มิกซ์เบอร์รี่',
    category: 'อาหารหวาน',
    calories: 240,
    protein: 18,
    carbs: 30,
    fat: 4,
    prepTime: '10 นาที',
    difficulty: 'ง่าย',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      'กรีกโยเกิร์ตรสธรรมชาติ 150 กรัม',
      'สตอเบอร์รี่และบลูเบอร์รี่สด 1/2 ถ้วย',
      'กราโนล่าโฮมเมด 2 ช้อนโต๊ะ',
      'น้ำผึ้งแท้ 1 ช้อนชา'
    ],
    instructions: [
      'ตักกรีกโยเกิร์ตใส่แก้วทรงสูงชั้นแรก',
      'วางกราโนล่าและเบอร์รี่สดสลับชั้นกัน',
      'ราดน้ำผึ้งฉ่ำๆ ด้านบน พร้อมทานทันที'
    ],
    isFavorite: true
  },
  {
    id: 'm5',
    name: 'ปลากะพงนึ่งซีอิ๊วขิงสด',
    category: 'อาหารคาว',
    calories: 280,
    protein: 34,
    carbs: 10,
    fat: 11,
    prepTime: '20 นาที',
    difficulty: 'ปานกลาง',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      'เนื้อปลากะพงสด 180 กรัม',
      'ขิงแก่ซอยเส้น 2 ช้อนโต๊ะ',
      'ต้นหอมและขึ้นฉ่ายซอย 1 ถ้วย',
      'ซีอิ๊วขาวและน้ำมันหอยลดโซเดียม 1.5 ช้อนโต๊ะ',
      'น้ำมันงา 1 ช้อนชา'
    ],
    instructions: [
      'วางปลากะพงลงในจานสำหรับนึ่ง โรยขิงซอยด้านบน',
      'นำไปนึ่งในซึ้งน้ำเดือดประมาณ 10-12 นาทีจนปลาสุก',
      'ผสมซอยซีอิ๊วขาว น้ำมันงา ราดลงบนตัวปลา',
      'โรยต้นหอมขึ้นฉ่ายแล้วนึ่งต่ออีก 1 นาที'
    ],
    isFavorite: false
  },
  {
    id: 'm6',
    name: 'มัทฉะลาเต้เย็นสูตรนมอัลมอนด์',
    category: 'เครื่องดื่ม',
    calories: 110,
    protein: 3,
    carbs: 12,
    fat: 5,
    prepTime: '5 นาที',
    difficulty: 'ง่าย',
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      'ผงมัทฉะแท้เกรดพิธีการ 1 ช้อนชา',
      'น้ำอุ่น 40 มล.',
      'นมอัลมอนด์สูตรไม่หวาน 150 มล.',
      'หล่อฮังก๊วยหรือน้ำตาลช่อดอกมะพร้าว 1 ช้อนชา'
    ],
    instructions: [
      'ตีผงมัทฉะกับน้ำอุ่นด้วยแปรงชะเซ็นจนเป็นฟองเนียนละเอียด',
      'ผสมนมอัลมอนด์กับความหวานเล็กน้อย แล้วเทใส่แก้วน้ำแข็ง',
      'ค่อยๆ เทชาเขียวมัทฉะลงด้านบนให้แยกชั้นสวยงาม'
    ],
    isFavorite: true
  },
  {
    id: 'm7',
    name: 'แซนวิชอกไก่ไข่ต้มอะโวคาโด',
    category: 'คลีน',
    calories: 390,
    protein: 28,
    carbs: 38,
    fat: 14,
    prepTime: '12 นาที',
    difficulty: 'ง่าย',
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      'ขนมปังโฮลวีท 2 แผ่น',
      'อะโวคาโดบด 1/2 ลูก',
      'อกไก่ฉีก 80 กรัม',
      'ไข่ต้มสไลซ์ 1 ฟอง',
      'ผักสลัดคอสและพริกไทยดำ'
    ],
    instructions: [
      'นำขนมปังโฮลวีทไปนาบกระทะให้กรอบหอม',
      'ทาอะโวคาโดบดลงบนขนมปัง วางผักสลัด อกไก่ฉีก และไข่ต้ม',
      'โรยพริกไทยดำ ปิดด้วยขนมปังอีกแผ่น แล้วประกบตัดครึ่ง'
    ],
    isFavorite: false
  },
  {
    id: 'm8',
    name: 'ข้าวผัดปูไร้น้ำมัน',
    category: 'อาหารคาว',
    calories: 410,
    protein: 30,
    carbs: 52,
    fat: 7,
    prepTime: '15 นาที',
    difficulty: 'ปานกลาง',
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      'ข้าวไรซ์เบอร์รี่หรือข้าวสวยแช่เย็น 1.5 ถ้วย',
      'เนื้อก้อนปูนึ่งสุก 100 กรัม',
      'ไข่ไก่ 1 ฟอง',
      'ต้นหอมซอยและกระเทียมสับ',
      'ซอสปรุงรสชีวจิต 1 ช้อนโต๊ะ'
    ],
    instructions: [
      'ใช้กระทะเทฟลอนผัดกระเทียมสับกับน้ำเล็กน้อย',
      'ตอกไข่ลงไป ยีพอสุก แล้วใส่ข้าวลงไปผัดเร่งไฟแรง',
      'ปรุงรสด้วยซอส ร่อนข้าวจนเม็ดแห้งสวย',
      'โรยเนื้อปูก้อนและต้นหอม ผัดให้เข้ากันเบาๆ พร้อมเสิร์ฟ'
    ],
    isFavorite: false
  }
];

const DAYS_OF_WEEK = [
  { id: 'mon', label: 'จันทร์', fullLabel: 'วันจันทร์' },
  { id: 'tue', label: 'อังคาร', fullLabel: 'วันอังคาร' },
  { id: 'wed', label: 'พุธ', fullLabel: 'วันพุธ' },
  { id: 'thu', label: 'พฤหัสฯ', fullLabel: 'วันพฤหัสบดี' },
  { id: 'fri', label: 'ศุกร์', fullLabel: 'วันศุกร์' },
  { id: 'sat', label: 'เสาร์', fullLabel: 'วันเสาร์' },
  { id: 'sun', label: 'อาทิตย์', fullLabel: 'วันอาทิตย์' }
];

const MEAL_TYPES = [
  { id: 'breakfast', label: 'มื้อเช้า', icon: Coffee, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { id: 'lunch', label: 'มื้อกลางวัน', icon: Sun, color: 'text-orange-600 bg-orange-50 border-orange-200' },
  { id: 'dinner', label: 'มื้อเย็น', icon: Moon, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { id: 'snack', label: 'อาหารว่าง', icon: Apple, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' }
];

const CATEGORIES = ['ทั้งหมด', 'อาหารคาว', 'อาหารหวาน', 'คลีน', 'เครื่องดื่ม'];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'menus', 'planner'
  
  // App Data States with LocalStorage fallback
  const [menus, setMenus] = useState(() => {
    try {
      const saved = localStorage.getItem('food_tracker_menus');
      return saved ? JSON.parse(saved) : INITIAL_MENUS;
    } catch {
      return INITIAL_MENUS;
    }
  });

  const [mealPlan, setMealPlan] = useState(() => {
    try {
      const saved = localStorage.getItem('food_tracker_plan');
      if (saved) return JSON.parse(saved);
    } catch {}
    // Default initial meal plan structure
    return {
      mon: { breakfast: ['m7'], lunch: ['m1'], dinner: ['m2'], snack: ['m6'] },
      tue: { breakfast: ['m4'], lunch: ['m8'], dinner: ['m5'], snack: [] },
      wed: { breakfast: ['m7'], lunch: ['m3'], dinner: ['m1'], snack: ['m4'] },
      thu: { breakfast: ['m4'], lunch: ['m1'], dinner: ['m2'], snack: [] },
      fri: { breakfast: ['m7'], lunch: ['m8'], dinner: ['m5'], snack: ['m6'] },
      sat: { breakfast: ['m4'], lunch: ['m3'], dinner: ['m1'], snack: [] },
      sun: { breakfast: ['m7'], lunch: ['m2'], dinner: ['m8'], snack: ['m4'] }
    };
  });

  // Target Daily Calories state
  const [calorieGoal, setCalorieGoal] = useState(1800);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [maxCalories, setMaxCalories] = useState(800);

  // Modals and UI States
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [viewingDetailMenu, setViewingDetailMenu] = useState(null);
  const [toast, setToast] = useState(null);
  const [selectedDayPlanner, setSelectedDayPlanner] = useState('mon');

  // Add to Meal Plan Selector Modal State
  const [addPlanModal, setAddPlanModal] = useState({ open: false, menuId: null, day: 'mon', mealType: 'lunch' });

  // Random Wheel State
  const [isSpinning, setIsSpinning] = useState(false);
  const [randomResult, setRandomResult] = useState(null);

  // Persist State Changes
  useEffect(() => {
    try {
      localStorage.setItem('food_tracker_menus', JSON.stringify(menus));
    } catch (e) {
      console.error(e);
    }
  }, [menus]);

  useEffect(() => {
    try {
      localStorage.setItem('food_tracker_plan', JSON.stringify(mealPlan));
    } catch (e) {
      console.error(e);
    }
  }, [mealPlan]);

  // Toast Helper
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Computed Metrics
  const favoriteCount = useMemo(() => menus.filter(m => m.isFavorite).length, [menus]);
  
  const menuOfTheDay = useMemo(() => {
    if (menus.length === 0) return null;
    // Simple deterministic menu selection based on current date index
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return menus[dayOfYear % menus.length];
  }, [menus]);

  // Calorie calculations for selected day
  const getDayTotalCalories = (dayKey) => {
    const dayData = mealPlan[dayKey] || {};
    let total = 0;
    Object.values(dayData).forEach(mealArray => {
      mealArray.forEach(mId => {
        const item = menus.find(m => m.id === mId);
        if (item) total += Number(item.calories || 0);
      });
    });
    return total;
  };

  const getDayMacros = (dayKey) => {
    const dayData = mealPlan[dayKey] || {};
    let protein = 0, carbs = 0, fat = 0;
    Object.values(dayData).forEach(mealArray => {
      mealArray.forEach(mId => {
        const item = menus.find(m => m.id === mId);
        if (item) {
          protein += Number(item.protein || 0);
          carbs += Number(item.carbs || 0);
          fat += Number(item.fat || 0);
        }
      });
    });
    return { protein, carbs, fat };
  };

  const todayCalories = useMemo(() => {
    // Mapping today's day of week
    const dayIndex = new Date().getDay(); // 0 is Sun, 1 is Mon...
    const map = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return getDayTotalCalories(map[dayIndex]);
  }, [mealPlan, menus]);

  const weeklyCaloriesAverage = useMemo(() => {
    const sum = DAYS_OF_WEEK.reduce((acc, d) => acc + getDayTotalCalories(d.id), 0);
    return Math.round(sum / 7);
  }, [mealPlan, menus]);

  // Filtered Menus List
  const filteredMenus = useMemo(() => {
    return menus.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients?.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'ทั้งหมด' || item.category === selectedCategory;
      const matchesFavorite = !onlyFavorites || item.isFavorite;
      const matchesCalories = item.calories <= maxCalories;
      return matchesSearch && matchesCategory && matchesFavorite && matchesCalories;
    });
  }, [menus, searchQuery, selectedCategory, onlyFavorites, maxCalories]);

  // Toggle Favorite Status
  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    setMenus(prev => prev.map(m => m.id === id ? { ...m, isFavorite: !m.isFavorite } : m));
    showToast('อัปเดตรายการโปรดเรียบร้อย');
  };

  // Delete Menu Item
  const handleDeleteMenu = (id, e) => {
    if (e) e.stopPropagation();
    setMenus(prev => prev.filter(m => m.id !== id));
    // Also remove from meal plans
    setMealPlan(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(day => {
        Object.keys(updated[day]).forEach(meal => {
          updated[day][meal] = updated[day][meal].filter(mId => mId !== id);
        });
      });
      return updated;
    });
    showToast('ลบรายการอาหารเรียบร้อยแล้ว');
  };

  // Add / Edit Menu Form Handler
  const handleSaveMenu = (newMenuData) => {
    if (editingMenu) {
      setMenus(prev => prev.map(m => m.id === editingMenu.id ? { ...newMenuData, id: editingMenu.id } : m));
      showToast('แก้ไขข้อมูลเมนูสำเร็จ');
    } else {
      const newItem = {
        ...newMenuData,
        id: 'm_' + Date.now(),
        isFavorite: false
      };
      setMenus(prev => [newItem, ...prev]);
      showToast('เพิ่มเมนูอาหารใหม่สำเร็จ');
    }
    setIsAddMenuOpen(false);
    setEditingMenu(null);
  };

  // Add menu to meal plan slot
  const handleAddMenuToSlot = (menuId, day, mealType) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: [...(prev[day]?.[mealType] || []), menuId]
      }
    }));
    showToast(`เพิ่มเมนูลงใน ${DAYS_OF_WEEK.find(d => d.id === day)?.label} (${MEAL_TYPES.find(m => m.id === mealType)?.label}) แล้ว`);
    setAddPlanModal({ open: false, menuId: null, day: 'mon', mealType: 'lunch' });
  };

  // Remove menu from meal plan slot
  const handleRemoveFromSlot = (day, mealType, indexToRemove) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: prev[day][mealType].filter((_, idx) => idx !== indexToRemove)
      }
    }));
    showToast('นำรายการอาหารออกจากตารางแล้ว');
  };

  // Random Food Picker Action
  const handleSpinRandom = () => {
    if (menus.length === 0) return;
    setIsSpinning(true);
    setRandomResult(null);

    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * menus.length);
      setRandomResult(menus[randomIndex]);
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans flex flex-col antialiased selection:bg-orange-200">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-2xl animate-bounce text-sm font-medium border border-stone-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Header & Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  YumPlanner
                </span>
                <span className="hidden sm:inline-block text-xs font-semibold text-stone-400 ml-2 bg-stone-100 px-2 py-0.5 rounded-full">
                  v2.0
                </span>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-stone-100 p-1.5 rounded-2xl border border-stone-200/60">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-orange-600 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <PieChart className="w-4 h-4" />
                แดชบอร์ด
              </button>

              <button
                onClick={() => setActiveTab('menus')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'menus'
                    ? 'bg-white text-orange-600 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ChefHat className="w-4 h-4" />
                คลังเมนู ({menus.length})
              </button>

              <button
                onClick={() => setActiveTab('planner')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'planner'
                    ? 'bg-white text-orange-600 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Calendar className="w-4 h-4" />
                แผนการกินประจำสัปดาห์
              </button>
            </nav>

            {/* Right Quick Action Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingMenu(null);
                  setIsAddMenuOpen(true);
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium px-4 py-2 rounded-xl text-sm shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">เพิ่มเมนูอาหาร</span>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation bar at bottom or header */}
        <div className="flex md:hidden border-t border-stone-200 bg-white px-2 py-1 justify-around">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center py-1 px-3 text-xs font-medium rounded-lg ${
              activeTab === 'dashboard' ? 'text-orange-600 font-semibold' : 'text-stone-500'
            }`}
          >
            <PieChart className="w-5 h-5 mb-0.5" />
            แดชบอร์ด
          </button>
          <button
            onClick={() => setActiveTab('menus')}
            className={`flex flex-col items-center py-1 px-3 text-xs font-medium rounded-lg ${
              activeTab === 'menus' ? 'text-orange-600 font-semibold' : 'text-stone-500'
            }`}
          >
            <ChefHat className="w-5 h-5 mb-0.5" />
            คลังเมนู
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            className={`flex flex-col items-center py-1 px-3 text-xs font-medium rounded-lg ${
              activeTab === 'planner' ? 'text-orange-600 font-semibold' : 'text-stone-500'
            }`}
          >
            <Calendar className="w-5 h-5 mb-0.5" />
            แผนประจำสัปดาห์
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ================= DASHBOARD TAB ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="bg-white p-5 rounded-2xl border border-stone-200/70 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Utensils className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-medium">เมนูอาหารทั้งหมด</p>
                  <p className="text-2xl font-bold text-stone-800">{menus.length} <span className="text-xs font-normal text-stone-400">รายการ</span></p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200/70 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-medium">เมนูโปรด</p>
                  <p className="text-2xl font-bold text-stone-800">{favoriteCount} <span className="text-xs font-normal text-stone-400">รายการ</span></p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200/70 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Flame className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <p className="text-xs text-stone-500 font-medium">แคลอรีรวมวันนี้</p>
                  <p className="text-2xl font-bold text-stone-800">{todayCalories} <span className="text-xs font-normal text-stone-400">/ {calorieGoal} kcal</span></p>
                  <div className="w-full bg-stone-100 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (todayCalories / calorieGoal) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200/70 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <PieChart className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-medium">เฉลี่ยต่อวัน (สัปดาห์นี้)</p>
                  <p className="text-2xl font-bold text-stone-800">{weeklyCaloriesAverage} <span className="text-xs font-normal text-stone-400">kcal</span></p>
                </div>
              </div>

            </div>

            {/* Menu of the Day & Random Wheel Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Menu of the Day Widget */}
              <div className="lg:col-span-2 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center gap-2 mb-3 bg-white/20 backdrop-blur-md w-fit px-3 py-1 rounded-full text-xs font-medium">
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>เมนูแนะนำประจำวัน (Menu of the Day)</span>
                  </div>

                  {menuOfTheDay ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center mt-4">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                          {menuOfTheDay.name}
                        </h2>
                        <p className="text-white/90 text-sm line-clamp-2 mb-4">
                          {menuOfTheDay.ingredients?.join(', ')}
                        </p>
                        
                        <div className="flex flex-wrap gap-3 mb-6 text-xs">
                          <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl font-medium flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-amber-200" />
                            {menuOfTheDay.calories} kcal
                          </span>
                          <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl font-medium flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-200" />
                            {menuOfTheDay.prepTime}
                          </span>
                          <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl font-medium">
                            {menuOfTheDay.category}
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => setViewingDetailMenu(menuOfTheDay)}
                            className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-4 py-2.5 rounded-xl text-sm transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                          >
                            <BookOpen className="w-4 h-4" />
                            ดูวิธีทำ
                          </button>
                          <button
                            onClick={() => setAddPlanModal({ open: true, menuId: menuOfTheDay.id, day: 'mon', mealType: 'lunch' })}
                            className="bg-orange-700/50 hover:bg-orange-800/60 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition-all border border-white/20 active:scale-95 flex items-center gap-1.5"
                          >
                            <Plus className="w-4 h-4" />
                            ลงตารางอาหาร
                          </button>
                        </div>
                      </div>

                      <div className="relative group">
                        <img
                          src={menuOfTheDay.imageUrl}
                          alt={menuOfTheDay.name}
                          className="w-full h-48 sm:h-56 object-cover rounded-2xl shadow-2xl border-2 border-white/20 group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-white/80 py-8">ยังไม่มีรายการเมนูอาหารในระบบ</p>
                  )}
                </div>
              </div>

              {/* Random Food Picker Widget */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                    </div>
                    <h3 className="font-bold text-lg text-stone-800">คิดไม่ออก สุ่มเมนูเลย!</h3>
                  </div>
                  <p className="text-xs text-stone-500 mb-6">
                    ระบบสุ่มเมนูอาหารอัจฉริยะ ช่วยแก้ปัญหา "วันนี้จะกินอะไรดี"
                  </p>

                  <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200/60 text-center relative overflow-hidden min-h-[160px] flex flex-col items-center justify-center">
                    {randomResult ? (
                      <div className="animate-fadeIn">
                        <img
                          src={randomResult.imageUrl}
                          alt={randomResult.name}
                          className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-orange-400 shadow-sm"
                        />
                        <p className="font-bold text-stone-800 text-base">{randomResult.name}</p>
                        <p className="text-xs text-stone-500 mt-0.5">{randomResult.category} • {randomResult.calories} kcal</p>
                      </div>
                    ) : (
                      <div className="text-stone-400">
                        <Sparkles className="w-10 h-10 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">กดปุ่มสุ่มเพื่อเลือกอาหารมื้อนี้</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <button
                    onClick={handleSpinRandom}
                    disabled={isSpinning || menus.length === 0}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-3 rounded-xl text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                    {isSpinning ? 'กำลังสุ่มเมนู...' : 'สุ่มอาหารมื้อนี้'}
                  </button>
                  {randomResult && (
                    <button
                      onClick={() => setViewingDetailMenu(randomResult)}
                      className="bg-orange-100 hover:bg-orange-200 text-orange-700 p-3 rounded-xl text-sm transition-all"
                      title="ดูรายละเอียดเมนูที่สุ่มได้"
                    >
                      <BookOpen className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Quick Meal Plan Today Section */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-lg text-stone-800">สรุปตารางอาหารประจำวัน</h3>
                  <p className="text-xs text-stone-500">
                    {DAYS_OF_WEEK.find(d => d.id === selectedDayPlanner)?.fullLabel}
                  </p>
                </div>
                
                {/* Day selector pills */}
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl overflow-x-auto max-w-full">
                  {DAYS_OF_WEEK.map(d => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDayPlanner(d.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedDayPlanner === d.id
                          ? 'bg-white text-orange-600 shadow-xs font-semibold'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Meal slots horizontal layout */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {MEAL_TYPES.map(meal => {
                  const mealMenuIds = mealPlan[selectedDayPlanner]?.[meal.id] || [];
                  const MealIcon = meal.icon;

                  return (
                    <div key={meal.id} className="bg-stone-50/80 rounded-2xl p-4 border border-stone-200/60">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg border ${meal.color}`}>
                            <MealIcon className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-sm text-stone-700">{meal.label}</span>
                        </div>
                        <button
                          onClick={() => setAddPlanModal({ open: true, menuId: null, day: selectedDayPlanner, mealType: meal.id })}
                          className="text-stone-400 hover:text-orange-600 p-1 rounded-lg transition-colors"
                          title="เพิ่มเมนูลงมื้อนี้"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {mealMenuIds.length > 0 ? (
                        <div className="space-y-2">
                          {mealMenuIds.map((mId, idx) => {
                            const menuItem = menus.find(m => m.id === mId);
                            if (!menuItem) return null;
                            return (
                              <div
                                key={idx}
                                className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-2xs flex items-center justify-between gap-2 group hover:border-orange-300 transition-colors"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <img
                                    src={menuItem.imageUrl}
                                    alt={menuItem.name}
                                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <p className="text-xs font-semibold text-stone-800 truncate">{menuItem.name}</p>
                                    <p className="text-[11px] text-stone-400">{menuItem.calories} kcal</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleRemoveFromSlot(selectedDayPlanner, meal.id, idx)}
                                  className="text-stone-300 hover:text-rose-500 p-1 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="py-6 text-center border-2 border-dashed border-stone-200 rounded-xl">
                          <p className="text-xs text-stone-400">ยังไม่มีเมนู</p>
                          <button
                            onClick={() => setAddPlanModal({ open: true, menuId: null, day: selectedDayPlanner, mealType: meal.id })}
                            className="mt-1 text-xs text-orange-600 hover:underline font-medium"
                          >
                            + เพิ่มอาหาร
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* ================= MENUS TAB ================= */}
        {activeTab === 'menus' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Filter and Search Bar */}
            <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
              
              <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                {/* Search Input */}
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="ค้นหาชื่อเมนู หรือ วัตถุดิบ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filter Actions */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                  
                  {/* Calorie Range slider */}
                  <div className="flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200 text-xs">
                    <span className="text-stone-500 font-medium">สูงสุด:</span>
                    <span className="font-bold text-orange-600 w-14">{maxCalories} kcal</span>
                    <input
                      type="range"
                      min="100"
                      max="1000"
                      step="50"
                      value={maxCalories}
                      onChange={(e) => setMaxCalories(Number(e.target.value))}
                      className="w-24 accent-orange-500 cursor-pointer"
                    />
                  </div>

                  {/* Favorites Toggle Button */}
                  <button
                    onClick={() => setOnlyFavorites(!onlyFavorites)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      onlyFavorites
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-rose-500 text-rose-500' : ''}`} />
                    เฉพาะเมนูโปรด
                  </button>

                  {/* Add New Menu Button */}
                  <button
                    onClick={() => {
                      setEditingMenu(null);
                      setIsAddMenuOpen(true);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    เพิ่มเมนูใหม่
                  </button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-stone-100 pb-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-stone-900 text-white font-semibold shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </div>

            {/* Menu Cards Grid */}
            {filteredMenus.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMenus.map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* Image & Badges Container */}
                      <div className="relative h-48 overflow-hidden bg-stone-100">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        
                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                          <span className="bg-white/90 backdrop-blur-md text-stone-800 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xs">
                            {item.category}
                          </span>
                          <button
                            onClick={(e) => toggleFavorite(item.id, e)}
                            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-600 hover:text-rose-500 transition-colors shadow-xs"
                          >
                            <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                          </button>
                        </div>

                        {/* Bottom Image Stats */}
                        <div className="absolute bottom-3 left-3 text-white flex items-center gap-3 text-xs font-medium">
                          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
                            <Flame className="w-3 h-3 text-amber-400" />
                            {item.calories} kcal
                          </span>
                          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
                            <Clock className="w-3 h-3 text-amber-400" />
                            {item.prepTime}
                          </span>
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-5">
                        <h4 className="font-bold text-stone-800 text-base mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">
                          {item.name}
                        </h4>

                        {/* Macros Pills */}
                        <div className="grid grid-cols-3 gap-1 bg-stone-50 p-2 rounded-xl text-center mb-4 border border-stone-100">
                          <div>
                            <p className="text-[10px] text-stone-400">โปรตีน</p>
                            <p className="text-xs font-bold text-stone-700">{item.protein}g</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-stone-400">คาร์บ</p>
                            <p className="text-xs font-bold text-stone-700">{item.carbs}g</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-stone-400">ไขมัน</p>
                            <p className="text-xs font-bold text-stone-700">{item.fat}g</p>
                          </div>
                        </div>

                        <p className="text-xs text-stone-500 line-clamp-2 mb-4">
                          <span className="font-semibold text-stone-700">วัตถุดิบ: </span>
                          {item.ingredients?.join(', ')}
                        </p>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-5 pt-0 border-t border-stone-100 mt-auto flex items-center justify-between gap-2">
                      <button
                        onClick={() => setViewingDetailMenu(item)}
                        className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        วิธีทำ
                      </button>

                      <button
                        onClick={() => setAddPlanModal({ open: true, menuId: item.id, day: 'mon', mealType: 'lunch' })}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        ใส่ตาราง
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingMenu(item);
                            setIsAddMenuOpen(true);
                          }}
                          className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                          title="แก้ไขเมนู"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteMenu(item.id, e)}
                          className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="ลบเมนู"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-xs">
                <ChefHat className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-stone-700">ไม่พบรายการอาหารที่ตรงกับเงื่อนไข</h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto mt-1 mb-6">
                  ลองปรับคำค้นหา ตัวกรองแคลอรี หรือเลือกหมวดหมู่อื่นดูนะครับ
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('ทั้งหมด');
                    setOnlyFavorites(false);
                    setMaxCalories(800);
                  }}
                  className="bg-stone-900 text-white px-4 py-2 rounded-xl text-xs font-medium hover:bg-stone-800 transition-colors"
                >
                  ล้างตัวกรองทั้งหมด
                </button>
              </div>
            )}

          </div>
        )}

        {/* ================= PLANNER TAB ================= */}
        {activeTab === 'planner' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header & Goal Setting */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-stone-800">แผนการกินประจำสัปดาห์ (Weekly Meal Planner)</h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  วางแผนโภชนาการล่วงหน้า 7 วัน ควบคุมปริมาณแคลอรีเพื่อสุขภาพที่ดี
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-orange-50 border border-orange-200 px-4 py-2 rounded-2xl flex items-center gap-3">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-[10px] text-orange-600 font-medium">เป้าหมายแคลอรี/วัน</p>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={calorieGoal}
                        onChange={(e) => setCalorieGoal(Number(e.target.value))}
                        className="w-16 font-bold text-stone-800 bg-transparent text-sm focus:outline-none border-b border-orange-300"
                      />
                      <span className="text-xs font-semibold text-stone-500">kcal</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMealPlan({
                      mon: { breakfast: [], lunch: [], dinner: [], snack: [] },
                      tue: { breakfast: [], lunch: [], dinner: [], snack: [] },
                      wed: { breakfast: [], lunch: [], dinner: [], snack: [] },
                      thu: { breakfast: [], lunch: [], dinner: [], snack: [] },
                      fri: { breakfast: [], lunch: [], dinner: [], snack: [] },
                      sat: { breakfast: [], lunch: [], dinner: [], snack: [] },
                      sun: { breakfast: [], lunch: [], dinner: [], snack: [] }
                    });
                    showToast('ล้างตารางอาหารประจำสัปดาห์แล้ว');
                  }}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-600 font-medium px-3.5 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5"
                  title="ล้างตารางทั้งหมด"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  ล้างตาราง
                </button>
              </div>
            </div>

            {/* 7 Days Table Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              {DAYS_OF_WEEK.map(day => {
                const dayCalories = getDayTotalCalories(day.id);
                const dayMacros = getDayMacros(day.id);
                const isOverGoal = dayCalories > calorieGoal;

                return (
                  <div key={day.id} className="bg-white rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between overflow-hidden">
                    
                    {/* Day Header */}
                    <div className="p-4 bg-stone-50/80 border-b border-stone-200/60">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-800 text-sm">{day.label}</span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isOverGoal ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {dayCalories} kcal
                        </span>
                      </div>

                      {/* Day Macros bar */}
                      <div className="mt-2 text-[10px] text-stone-400 flex justify-between font-medium">
                        <span>P: {dayMacros.protein}g</span>
                        <span>C: {dayMacros.carbs}g</span>
                        <span>F: {dayMacros.fat}g</span>
                      </div>
                    </div>

                    {/* Meal Slots List */}
                    <div className="p-3 space-y-3 flex-1">
                      {MEAL_TYPES.map(meal => {
                        const mealMenuIds = mealPlan[day.id]?.[meal.id] || [];

                        return (
                          <div key={meal.id} className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500">
                              <span>{meal.label}</span>
                              <button
                                onClick={() => setAddPlanModal({ open: true, menuId: null, day: day.id, mealType: meal.id })}
                                className="text-orange-600 hover:text-orange-700 p-0.5"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {mealMenuIds.length > 0 ? (
                              <div className="space-y-1.5">
                                {mealMenuIds.map((mId, idx) => {
                                  const menuItem = menus.find(m => m.id === mId);
                                  if (!menuItem) return null;

                                  return (
                                    <div
                                      key={idx}
                                      className="bg-stone-50 p-2 rounded-xl border border-stone-200/70 flex items-center justify-between gap-1 text-xs group"
                                    >
                                      <div className="min-w-0 flex-1">
                                        <p className="font-semibold text-stone-800 truncate text-[11px]">{menuItem.name}</p>
                                        <p className="text-[10px] text-stone-400">{menuItem.calories} kcal</p>
                                      </div>
                                      <button
                                        onClick={() => handleRemoveFromSlot(day.id, meal.id, idx)}
                                        className="text-stone-300 hover:text-rose-500 p-0.5 opacity-80 group-hover:opacity-100"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div
                                onClick={() => setAddPlanModal({ open: true, menuId: null, day: day.id, mealType: meal.id })}
                                className="border border-dashed border-stone-200 hover:border-orange-300 rounded-xl py-2 text-center text-[10px] text-stone-300 hover:text-orange-500 cursor-pointer transition-colors"
                              >
                                + เลือกเมนู
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

      </main>

      {/* ================= MODALS SECTION ================= */}

      {/* 1. Add / Edit Menu Modal */}
      {isAddMenuOpen && (
        <MenuFormModal
          editingMenu={editingMenu}
          onClose={() => setIsAddMenuOpen(false)}
          onSave={handleSaveMenu}
        />
      )}

      {/* 2. Menu Recipe Detail Modal */}
      {viewingDetailMenu && (
        <MenuDetailModal
          menu={viewingDetailMenu}
          onClose={() => setViewingDetailMenu(null)}
          onAddToPlan={(menuId) => setAddPlanModal({ open: true, menuId, day: 'mon', mealType: 'lunch' })}
        />
      )}

      {/* 3. Add to Meal Plan Selection Modal */}
      {addPlanModal.open && (
        <AddToPlanModal
          menus={menus}
          selectedMenuId={addPlanModal.menuId}
          initialDay={addPlanModal.day}
          initialMealType={addPlanModal.mealType}
          onClose={() => setAddPlanModal({ open: false, menuId: null, day: 'mon', mealType: 'lunch' })}
          onConfirm={handleAddMenuToSlot}
        />
      )}

    </div>
  );
}

// Subcomponent: Add / Edit Menu Modal
function MenuFormModal({ editingMenu, onClose, onSave }) {
  const [formData, setFormData] = useState(() => editingMenu || {
    name: '',
    category: 'อาหารคาว',
    calories: 300,
    protein: 25,
    carbs: 35,
    fat: 10,
    prepTime: '15 นาที',
    difficulty: 'ง่าย',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    ingredients: [''],
    instructions: ['']
  });

  const handleIngredientChange = (index, value) => {
    const updated = [...formData.ingredients];
    updated[index] = value;
    setFormData({ ...formData, ingredients: updated });
  };

  const addIngredientField = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  };

  const removeIngredientField = (index) => {
    setFormData({ ...formData, ingredients: formData.ingredients.filter((_, idx) => idx !== index) });
  };

  const handleInstructionChange = (index, value) => {
    const updated = [...formData.instructions];
    updated[index] = value;
    setFormData({ ...formData, instructions: updated });
  };

  const addInstructionField = () => {
    setFormData({ ...formData, instructions: [...formData.instructions, ''] });
  };

  const removeInstructionField = (index) => {
    setFormData({ ...formData, instructions: formData.instructions.filter((_, idx) => idx !== index) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave({
      ...formData,
      ingredients: formData.ingredients.filter(i => i.trim() !== ''),
      instructions: formData.instructions.filter(i => i.trim() !== '')
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8">
        
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <h3 className="text-xl font-bold text-stone-800">
            {editingMenu ? 'แก้ไขเมนูอาหาร' : 'เพิ่มเมนูอาหารใหม่'}
          </h3>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">ชื่อเมนูอาหาร *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="เช่น อกไก่ผัดพริกหยวก"
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">หมวดหมู่</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              >
                {CATEGORIES.filter(c => c !== 'ทั้งหมด').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">เวลาที่ใช้ทำ</label>
              <input
                type="text"
                value={formData.prepTime}
                onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                placeholder="เช่น 15 นาที"
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">ระดับความยาก</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              >
                <option value="ง่าย">ง่าย</option>
                <option value="ปานกลาง">ปานกลาง</option>
                <option value="ยาก">ยาก</option>
              </select>
            </div>
          </div>

          {/* Macros Nutrition */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-3">
            <p className="text-xs font-bold text-stone-700">ข้อมูลโภชนาการ (ต่อ 1 เสิร์ฟ)</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] text-stone-500 mb-1">แคลอรี (kcal)</label>
                <input
                  type="number"
                  value={formData.calories}
                  onChange={(e) => setFormData({ ...formData, calories: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] text-stone-500 mb-1">โปรตีน (g)</label>
                <input
                  type="number"
                  value={formData.protein}
                  onChange={(e) => setFormData({ ...formData, protein: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] text-stone-500 mb-1">คาร์โบไฮเดรต (g)</label>
                <input
                  type="number"
                  value={formData.carbs}
                  onChange={(e) => setFormData({ ...formData, carbs: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] text-stone-500 mb-1">ไขมัน (g)</label>
                <input
                  type="number"
                  value={formData.fat}
                  onChange={(e) => setFormData({ ...formData, fat: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">URL รูปภาพอาหาร</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          {/* Dynamic Ingredients */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-stone-700">วัตถุดิบ</label>
              <button
                type="button"
                onClick={addIngredientField}
                className="text-xs text-orange-600 hover:underline font-medium"
              >
                + เพิ่มวัตถุดิบ
              </button>
            </div>
            <div className="space-y-2">
              {formData.ingredients.map((ing, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={ing}
                    onChange={(e) => handleIngredientChange(idx, e.target.value)}
                    placeholder={`วัตถุดิบที่ ${idx + 1}`}
                    className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none"
                  />
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredientField(idx)}
                      className="text-stone-400 hover:text-rose-500 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Instructions */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-stone-700">ขั้นตอนทำอาหาร</label>
              <button
                type="button"
                onClick={addInstructionField}
                className="text-xs text-orange-600 hover:underline font-medium"
              >
                + เพิ่มขั้นตอน
              </button>
            </div>
            <div className="space-y-2">
              {formData.instructions.map((ins, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={ins}
                    onChange={(e) => handleInstructionChange(idx, e.target.value)}
                    placeholder={`ขั้นตอนที่ ${idx + 1}`}
                    className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none"
                  />
                  {formData.instructions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInstructionField(idx)}
                      className="text-stone-400 hover:text-rose-500 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium py-3 rounded-xl text-sm transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl text-sm shadow-md transition-colors"
            >
              บันทึกข้อมูล
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

// Subcomponent: Menu Detail Recipe View Modal
function MenuDetailModal({ menu, onClose, onAddToPlan }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden relative my-8">
        
        {/* Banner Image */}
        <div className="relative h-64 sm:h-72 bg-stone-100">
          <img
            src={menu.imageUrl}
            alt={menu.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
              {menu.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">{menu.name}</h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Quick Info bar */}
          <div className="grid grid-cols-4 gap-2 bg-stone-50 p-3 rounded-2xl border border-stone-200/80 text-center">
            <div>
              <p className="text-[10px] text-stone-400">พลังงาน</p>
              <p className="text-sm font-bold text-orange-600">{menu.calories} kcal</p>
            </div>
            <div>
              <p className="text-[10px] text-stone-400">โปรตีน</p>
              <p className="text-sm font-bold text-stone-700">{menu.protein}g</p>
            </div>
            <div>
              <p className="text-[10px] text-stone-400">คาร์โบไฮเดรต</p>
              <p className="text-sm font-bold text-stone-700">{menu.carbs}g</p>
            </div>
            <div>
              <p className="text-[10px] text-stone-400">ไขมัน</p>
              <p className="text-sm font-bold text-stone-700">{menu.fat}g</p>
            </div>
          </div>

          {/* Ingredients Checklist */}
          <div>
            <h4 className="font-bold text-stone-800 text-base mb-3 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-orange-500" />
              วัตถุดิบที่ต้องใช้
            </h4>
            <ul className="space-y-2">
              {menu.ingredients?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-600 bg-stone-50/80 p-2.5 rounded-xl border border-stone-100">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step by Step Instructions */}
          <div>
            <h4 className="font-bold text-stone-800 text-base mb-3 flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-orange-500" />
              ขั้นตอนการทำ
            </h4>
            <ol className="space-y-3">
              {menu.instructions?.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs text-stone-700">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center shrink-0 text-xs">
                    {idx + 1}
                  </span>
                  <p className="pt-0.5 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-stone-100 flex gap-3">
            <button
              onClick={() => {
                onClose();
                onAddToPlan(menu.id);
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium py-3 rounded-xl text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              ลงตารางอาหารประจำสัปดาห์
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

// Subcomponent: Modal to Assign Menu to Specific Day & Slot
function AddToPlanModal({ menus, selectedMenuId, initialDay, initialMealType, onClose, onConfirm }) {
  const [chosenMenuId, setChosenMenuId] = useState(selectedMenuId || (menus[0]?.id || ''));
  const [chosenDay, setChosenDay] = useState(initialDay || 'mon');
  const [chosenMeal, setChosenMeal] = useState(initialMealType || 'lunch');

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative">
        
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
          <h3 className="font-bold text-stone-800 text-lg">บันทึกอาหารลงตาราง</h3>
          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-600 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          
          {/* Select Dish if not pre-selected */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">เลือกรายการอาหาร</label>
            <select
              value={chosenMenuId}
              onChange={(e) => setChosenMenuId(e.target.value)}
              className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {menus.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.calories} kcal)
                </option>
              ))}
            </select>
          </div>

          {/* Select Day */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">เลือกวันในสัปดาห์</label>
            <div className="grid grid-cols-4 gap-1.5">
              {DAYS_OF_WEEK.map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setChosenDay(d.id)}
                  className={`py-2 rounded-xl text-xs font-medium border transition-all ${
                    chosenDay === d.id
                      ? 'bg-orange-500 text-white border-orange-500 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Select Meal Slot */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">เลือกมื้ออาหาร</label>
            <div className="grid grid-cols-2 gap-2">
              {MEAL_TYPES.map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setChosenMeal(m.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                    chosenMeal === m.id
                      ? 'bg-stone-900 text-white border-stone-900 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <m.icon className="w-4 h-4" />
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 bg-stone-100 text-stone-700 font-medium py-2.5 rounded-xl text-xs"
            >
              ยกเลิก
            </button>
            <button
              onClick={() => onConfirm(chosenMenuId, chosenDay, chosenMeal)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-xl text-xs shadow-md"
            >
              ตกลงบันทึก
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
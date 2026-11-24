import React, { useState, useEffect, useMemo } from 'react';
import {
  User,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Monitor,
  Keyboard,
  Award,
  AlertTriangle,
  Globe,
  LogOut,
  Eye
} from 'lucide-react';

// ============================================================================
// COMPLETE 50 BILINGUAL (ENGLISH & HINDI) RRB PARAMEDICAL QUESTIONS DATABASE
// ============================================================================
const QUESTIONS_DATA = [
  // --- SECTION 1: PROFESSIONAL ABILITY (35 Questions: Q1 - Q35) ---
  {
    id: 1,
    section: "Professional Ability",
    qEn: "Which of the following is the largest cranial nerve in the human body?",
    qHi: "मानव शरीर की सबसे बड़ी कपाल तंत्रिका (Cranial Nerve) निम्नलिखित में से कौन सी है?",
    optionsEn: ["Optic nerve", "Trigeminal nerve", "Vagus nerve", "Facial nerve"],
    optionsHi: ["ऑप्टिक तंत्रिका", "ट्राइजेमिनल तंत्रिका", "वेगस तंत्रिका", "फेशियल तंत्रिका"],
    correctIndex: 1
  },
  {
    id: 2,
    section: "Professional Ability",
    qEn: "Normal adult tidal volume during quiet breathing is approximately:",
    qHi: "शांत श्वसन के दौरान सामान्य वयस्क टाइडल वॉल्यूम (Tidal Volume) लगभग कितना होता है?",
    optionsEn: ["150 mL", "500 mL", "1200 mL", "2500 mL"],
    optionsHi: ["150 मिली", "500 मिली", "1200 मिली", "2500 मिली"],
    correctIndex: 1
  },
  {
    id: 3,
    section: "Professional Ability",
    qEn: "Which vitamin deficiency causes Pernicious Anemia?",
    qHi: "किस विटामिन की कमी से पर्निशियस एनीमिया (Pernicious Anemia) होता है?",
    optionsEn: ["Vitamin B1", "Vitamin B6", "Vitamin B12", "Vitamin C"],
    optionsHi: ["विटामिन B1", "विटामिन B6", "विटामिन B12", "विटामिन C"],
    correctIndex: 2
  },
  {
    id: 4,
    section: "Professional Ability",
    qEn: "What is the antidote for Heparin overdose?",
    qHi: "हेपरिन (Heparin) की अधिक मात्रा (Overdose) का एंटीडोट क्या है?",
    optionsEn: ["Vitamin K", "Protamine Sulfate", "Naloxone", "Atropine"],
    optionsHi: ["विटामिन K", "प्रोटामाइन सल्फेट", "नालोक्सोन", "एट्रोपिन"],
    correctIndex: 1
  },
  {
    id: 5,
    section: "Professional Ability",
    qEn: "The normal range of serum potassium (K+) in an adult is:",
    qHi: "एक वयस्क में सीरम पोटेशियम (K+) की सामान्य सीमा क्या है?",
    optionsEn: ["1.5 - 2.5 mEq/L", "3.5 - 5.0 mEq/L", "6.0 - 7.5 mEq/L", "135 - 145 mEq/L"],
    optionsHi: ["1.5 - 2.5 mEq/L", "3.5 - 5.0 mEq/L", "6.0 - 7.5 mEq/L", "135 - 145 mEq/L"],
    correctIndex: 1
  },
  {
    id: 6,
    section: "Professional Ability",
    qEn: "Koplik's spots are a characteristic clinical sign of which disease?",
    qHi: "कोप्लिक स्पॉट्स (Koplik's spots) किस बीमारी का एक विशिष्ट नैदानिक लक्षण है?",
    optionsEn: ["Mumps", "Measles (Rubeola)", "Rubella", "Chickenpox"],
    optionsHi: ["गलसुआ (Mumps)", "खसरा (Measles)", "रूबेला", "छोटी माता (Chickenpox)"],
    correctIndex: 1
  },
  {
    id: 7,
    section: "Professional Ability",
    qEn: "Which position is recommended for a patient undergoing lumbar puncture?",
    qHi: "लम्बर पंचर (Lumbar Puncture) कराने वाले रोगी के लिए कौन सी स्थिति अनुशंसित है?",
    optionsEn: ["Supine position", "Prone position", "Lateral recumbent (C-shaped) position", "Trendelenburg position"],
    optionsHi: ["सुपाइन स्थिति", "प्रोन स्थिति", "लेटरल रिकम्बेंट (C-आकार) स्थिति", "ट्रेंडेलनबर्ग स्थिति"],
    correctIndex: 2
  },
  {
    id: 8,
    section: "Professional Ability",
    qEn: "The 'Pacemaker' of the human heart is:",
    qHi: "मानव हृदय का 'पेसमेकर' (Pacemaker) किसे कहा जाता है?",
    optionsEn: ["AV Node", "SA Node", "Bundle of His", "Purkinje Fibers"],
    optionsHi: ["AV नोड", "SA नोड", "बंडल ऑफ हिज", "पुरकिंजे फाइबर"],
    correctIndex: 1
  },
  {
    id: 9,
    section: "Professional Ability",
    qEn: "BCG vaccine is administered via which route?",
    qHi: "बी.सी.जी. (BCG) का टीका किस मार्ग (Route) से दिया जाता है?",
    optionsEn: ["Intramuscular", "Subcutaneous", "Intradermal", "Oral"],
    optionsHi: ["इंट्रामस्क्युलर", "सबक्यूटेनियस", "इंट्राडर्मल (अंतःत्वचीय)", "मौखिक (Oral)"],
    correctIndex: 2
  },
  {
    id: 10,
    section: "Professional Ability",
    qEn: "Which immunoglobulin is primarily responsible for allergic reactions?",
    qHi: "एलर्जी प्रतिक्रियाओं के लिए मुख्य रूप से कौन सा इम्युनोग्लोबुलिन जिम्मेदार है?",
    optionsEn: ["IgA", "IgG", "IgM", "IgE"],
    optionsHi: ["IgA", "IgG", "IgM", "IgE"],
    correctIndex: 3
  },
  {
    id: 11,
    section: "Professional Ability",
    qEn: "What is the standard temperature and pressure for autoclaving?",
    qHi: "ऑटोक्लेविंग (Autoclaving) के लिए मानक तापमान और दबाव क्या है?",
    optionsEn: ["100°C at 10 lbs for 10 mins", "121°C at 15 lbs for 15-20 mins", "160°C at 20 lbs for 60 mins", "134°C at 5 lbs for 30 mins"],
    optionsHi: ["100°C, 10 lbs दबाव, 10 मिनट", "121°C, 15 lbs दबाव, 15-20 मिनट", "160°C, 20 lbs दबाव, 60 मिनट", "134°C, 5 lbs दबाव, 30 मिनट"],
    correctIndex: 1
  },
  {
    id: 12,
    section: "Professional Ability",
    qEn: "Which hormone is secreted by the Beta cells of the Islets of Langerhans?",
    qHi: "लैंगरहैंस की द्वीपिकाओं (Islets of Langerhans) की बीटा कोशिकाओं द्वारा कौन सा हार्मोन स्रावित होता है?",
    optionsEn: ["Glucagon", "Insulin", "Somatostatin", "Gastrin"],
    optionsHi: ["ग्लूकागन", "इंसुलिन", "सोमाटोस्टेटिन", "गैस्ट्रिन"],
    correctIndex: 1
  },
  {
    id: 13,
    section: "Professional Ability",
    qEn: "The Glasgow Coma Scale (GCS) minimum score is:",
    qHi: "ग्लासगो कोमा स्केल (GCS) का न्यूनतम स्कोर क्या होता है?",
    optionsEn: ["0", "1", "3", "15"],
    optionsHi: ["0", "1", "3", "15"],
    correctIndex: 2
  },
  {
    id: 14,
    section: "Professional Ability",
    qEn: "Which blood group is known as the 'Universal Donor'?",
    qHi: "किस रक्त समूह को 'सार्वभौमिक दाता' (Universal Donor) कहा जाता है?",
    optionsEn: ["AB Positive", "O Negative", "O Positive", "A Negative"],
    optionsHi: ["AB पॉजिटिव", "O नेगेटिव", "O पॉजिटिव", "A नेगेटिव"],
    correctIndex: 1
  },
  {
    id: 15,
    section: "Professional Ability",
    qEn: "Widal test is used for the diagnosis of:",
    qHi: "विडाल टेस्ट (Widal test) का उपयोग किसके निदान के लिए किया जाता है?",
    optionsEn: ["Malaria", "Typhoid fever", "Dengue", "Tuberculosis"],
    optionsHi: ["मलेरिया", "टाइफाइड बुखार", "डेंगू", "तपेदिक (टीबी)"],
    correctIndex: 1
  },
  {
    id: 16,
    section: "Professional Ability",
    qEn: "Which part of the brain regulates body temperature?",
    qHi: "मस्तिष्क का कौन सा भाग शरीर के तापमान को नियंत्रित करता है?",
    optionsEn: ["Cerebellum", "Hypothalamus", "Medulla Oblongata", "Thalamus"],
    optionsHi: ["सेरिबैलम", "हाइपोथैलेमस", "मेडुला ऑबोंगेटा", "थैलेमस"],
    correctIndex: 1
  },
  {
    id: 17,
    section: "Professional Ability",
    qEn: "First-line anti-tubercular drug that causes orange-red discoloration of urine is:",
    qHi: "प्रथम-पंक्ति की टीबी-रोधी दवा (Anti-tubercular drug) जो मूत्र का रंग नारंगी-लाल कर देती है:",
    optionsEn: ["Isoniazid", "Rifampicin", "Ethambutol", "Pyrazinamide"],
    optionsHi: ["आइसोनियाज़िड", "रिफैम्पिसिन", "एथमब्यूटोल", "पाइराजिनामाइड"],
    correctIndex: 1
  },
  {
    id: 18,
    section: "Professional Ability",
    qEn: "In CPR for an adult, what is the recommended compression-to-ventilation ratio for a single rescuer?",
    qHi: "एक वयस्क के लिए सीपीआर (CPR) में एकल बचावकर्ता के लिए संपीड़न और वेंटिलेशन का अनुपात क्या है?",
    optionsEn: ["15:2", "30:2", "5:1", "15:1"],
    optionsHi: ["15:2", "30:2", "5:1", "15:1"],
    correctIndex: 1
  },
  {
    id: 19,
    section: "Professional Ability",
    qEn: "Which color-coded biomedical waste bag is used for discarded human anatomical waste?",
    qHi: "त्यागे गए मानव शारीरिक अपशिष्ट (Anatomical Waste) के लिए किस रंग के बायोमेडिकल वेस्ट बैग का उपयोग किया जाता है?",
    optionsEn: ["Red", "Yellow", "Blue", "White"],
    optionsHi: ["लाल", "पीला", "नीला", "सफेद"],
    correctIndex: 1
  },
  {
    id: 20,
    section: "Professional Ability",
    qEn: "Normal fetal heart rate (FHR) ranges between:",
    qHi: "सामान्य भ्रूण हृदय गति (FHR) किस सीमा के बीच होती है?",
    optionsEn: ["80 - 100 bpm", "110 - 160 bpm", "160 - 200 bpm", "60 - 90 bpm"],
    optionsHi: ["80 - 100 बीट/मिनट", "110 - 160 बीट/मिनट", "160 - 200 बीट/मिनट", "60 - 90 बीट/मिनट"],
    correctIndex: 1
  },
  {
    id: 21,
    section: "Professional Ability",
    qEn: "Which electrolyte imbalance causes peaked T-waves on an ECG?",
    qHi: "किस इलेक्ट्रोलाइट असंतुलन के कारण ईसीजी (ECG) पर पीक्ड T-वेव्स (Peaked T-waves) दिखाई देती हैं?",
    optionsEn: ["Hypokalemia", "Hyperkalemia", "Hyponatremia", "Hypercalcemia"],
    optionsHi: ["हाइपोकैलिमिया", "हाइपरकैलिमिया", "हाइपोनेट्रेमिया", "हाइपरकैल्सीमिया"],
    correctIndex: 1
  },
  {
    id: 22,
    section: "Professional Ability",
    qEn: "Which drug is the drug of choice for Eclampsia seizures?",
    qHi: "एक्लम्पसिया (Eclampsia) के दौरों के लिए पसंदीदा दवा (Drug of choice) कौन सी है?",
    optionsEn: ["Diazepam", "Magnesium Sulfate", "Phenytoin", "Oxytocin"],
    optionsHi: ["डायजेपाम", "मैग्नीशियम सल्फेट", "फेनिटोइन", "ऑक्सीटोसिन"],
    correctIndex: 1
  },
  {
    id: 23,
    section: "Professional Ability",
    qEn: "The causative organism of Syphilis is:",
    qHi: "सिफलिस (Syphilis) का कारक जीव कौन सा है?",
    optionsEn: ["Neisseria gonorrhoeae", "Treponema pallidum", "Mycobacterium leprae", "Vibrio cholerae"],
    optionsHi: ["निसेरिया गोनोरिया", "ट्रेपोनेमा पैलिडम", "माइकोबैक्टीरियम लेप्राई", "विब्रियो कोलेरी"],
    correctIndex: 1
  },
  {
    id: 24,
    section: "Professional Ability",
    qEn: "Which instrument is used to measure Intraocular Pressure (IOP)?",
    qHi: "इंट्राओकुलर प्रेशर (IOP) मापने के लिए किस उपकरण का उपयोग किया जाता है?",
    optionsEn: ["Ophthalmoscope", "Tonometer", "Otoscope", "Spirometer"],
    optionsHi: ["ऑप्थाल्मोस्कोप", "टोनोमीटर", "ओटोस्कोप", "स्पाइरोमीटर"],
    correctIndex: 1
  },
  {
    id: 25,
    section: "Professional Ability",
    qEn: "How many bones are present in the human axial skeleton?",
    qHi: "मानव अक्षीय कंकाल (Axial Skeleton) में कितनी हड्डियाँ होती हैं?",
    optionsEn: ["126", "80", "206", "60"],
    optionsHi: ["126", "80", "206", "60"],
    correctIndex: 1
  },
  {
    id: 26,
    section: "Professional Ability",
    qEn: "Which of the following is a water-soluble vitamin?",
    qHi: "निम्नलिखित में से कौन सा जल में घुलनशील (Water-soluble) विटामिन है?",
    optionsEn: ["Vitamin A", "Vitamin D", "Vitamin C", "Vitamin K"],
    optionsHi: ["विटामिन A", "विटामिन D", "विटामिन C", "विटामिन K"],
    correctIndex: 2
  },
  {
    id: 27,
    section: "Professional Ability",
    qEn: "Which site is preferred for intramuscular injection in infants?",
    qHi: "शिशुओं (Infants) में इंट्रामस्क्युलर इंजेक्शन के लिए कौन सा स्थान सबसे उपयुक्त है?",
    optionsEn: ["Deltoid muscle", "Dorsogluteal site", "Vastus lateralis", "Ventrogluteal site"],
    optionsHi: ["डेल्टॉइड मांसपेशी", "डोरसोग्लूटियल साइट", "वास्टस लेटरलिस (Vastus lateralis)", "वेंट्रोग्लूटियल साइट"],
    correctIndex: 2
  },
  {
    id: 28,
    section: "Professional Ability",
    qEn: "Bile is produced by which organ?",
    qHi: "पित्त (Bile) किस अंग द्वारा निर्मित होता है?",
    optionsEn: ["Gallbladder", "Liver", "Pancreas", "Stomach"],
    optionsHi: ["पित्ताशय (Gallbladder)", "यकृत (Liver)", "अग्न्याशय (Pancreas)", "आमाशय (Stomach)"],
    correctIndex: 1
  },
  {
    id: 29,
    section: "Professional Ability",
    qEn: "What is the normal pH of human arterial blood?",
    qHi: "मानव धमनी रक्त (Arterial Blood) का सामान्य pH मान क्या है?",
    optionsEn: ["6.80 - 7.00", "7.35 - 7.45", "7.55 - 7.65", "7.00 - 7.20"],
    optionsHi: ["6.80 - 7.00", "7.35 - 7.45", "7.55 - 7.65", "7.00 - 7.20"],
    correctIndex: 1
  },
  {
    id: 30,
    section: "Professional Ability",
    qEn: "Which mosquito transmits Dengue fever?",
    qHi: "डेंगू बुखार किस मच्छर द्वारा फैलता है?",
    optionsEn: ["Female Anopheles", "Aedes aegypti", "Culex", "Mansonia"],
    optionsHi: ["मादा एनोफिलीज", "एडीज इजिप्टी", "क्यूलेक्स", "मानसोनिया"],
    correctIndex: 1
  },
  {
    id: 31,
    section: "Professional Ability",
    qEn: "McBurney's point tenderness is associated with:",
    qHi: "मैकबर्नी पॉइंट (McBurney's point) पर दर्द किस बीमारी से संबंधित है?",
    optionsEn: ["Cholecystitis", "Appendicitis", "Pancreatitis", "Gastritis"],
    optionsHi: ["कोलेसिस्टिटिस", "अपेंडिसाइटिस", "पैंक्रियाटाइटिस", "गैस्ट्राइटिस"],
    correctIndex: 1
  },
  {
    id: 32,
    section: "Professional Ability",
    qEn: "Which solution is isotonic with human blood plasma?",
    qHi: "कौन सा घोल मानव रक्त प्लाज्मा के साथ आइसोटोनिक (Isotonic) है?",
    optionsEn: ["0.45% NaCl", "0.9% NaCl", "3% NaCl", "10% Dextrose"],
    optionsHi: ["0.45% NaCl", "0.9% NaCl (Normal Saline)", "3% NaCl", "10% डेक्सट्रोज"],
    correctIndex: 1
  },
  {
    id: 33,
    section: "Professional Ability",
    qEn: "Which immunoglobulin crosses the placenta to provide passive immunity to the fetus?",
    qHi: "कौन सा इम्युनोग्लोबुलिन प्लेसेंटा को पार करके भ्रूण को निष्क्रिय प्रतिरक्षा प्रदान करता है?",
    optionsEn: ["IgA", "IgG", "IgM", "IgD"],
    optionsHi: ["IgA", "IgG", "IgM", "IgD"],
    correctIndex: 1
  },
  {
    id: 34,
    section: "Professional Ability",
    qEn: "Schick test is done to determine susceptibility to:",
    qHi: "शिक टेस्ट (Schick test) किस रोग के प्रति संवेदनशीलता निर्धारित करने के लिए किया जाता है?",
    optionsEn: ["Tetanus", "Diphtheria", "Pertussis", "Scarlet fever"],
    optionsHi: ["टिटनेस", "डिप्थीरिया", "काली खांसी", "स्कार्लेट बुखार"],
    correctIndex: 1
  },
  {
    id: 35,
    section: "Professional Ability",
    qEn: "Pulse deficit is the difference between:",
    qHi: "पल्स डेफिसिट (Pulse deficit) किन दो नाड़ियों के बीच का अंतर है?",
    optionsEn: ["Systolic and Diastolic BP", "Apical pulse and Radial pulse", "Carotid and Femoral pulse", "Heart rate and Respiratory rate"],
    optionsHi: ["सिस्टोलिक और डायस्टोलिक बीपी", "एपिकल पल्स और रेडियल पल्स", "कैरोटिड और फीमोरल पल्स", "हृदय गति और श्वसन दर"],
    correctIndex: 1
  },

  // --- SECTION 2: GENERAL AWARENESS (5 Questions: Q36 - Q40) ---
  {
    id: 36,
    section: "General Awareness",
    qEn: "Who is known as the 'Father of the Indian Constitution'?",
    qHi: "'भारतीय संविधान का जनक' किसे कहा जाता है?",
    optionsEn: ["Mahatma Gandhi", "Dr. B.R. Ambedkar", "Jawaharlal Nehru", "Dr. Rajendra Prasad"],
    optionsHi: ["महात्मा गांधी", "डॉ. बी.आर. अम्बेडकर", "जवाहरलाल नेहरू", "डॉ. राजेंद्र प्रसाद"],
    correctIndex: 1
  },
  {
    id: 37,
    section: "General Awareness",
    qEn: "World Health Day is celebrated every year on:",
    qHi: "विश्व स्वास्थ्य दिवस (World Health Day) प्रत्येक वर्ष कब मनाया जाता है?",
    optionsEn: ["7th April", "1st December", "12th May", "8th March"],
    optionsHi: ["7 अप्रैल", "1 दिसंबर", "12 मई", "8 मार्च"],
    correctIndex: 0
  },
  {
    id: 38,
    section: "General Awareness",
    qEn: "Which river is known as 'Dakshin Ganga' (Ganga of the South)?",
    qHi: "किस नदी को 'दक्षिण गंगा' के नाम से जाना जाता है?",
    optionsEn: ["Krishna", "Godavari", "Kaveri", "Narmada"],
    optionsHi: ["कृष्णा", "गोदावरी", "कावेरी", "नर्मदा"],
    correctIndex: 1
  },
  {
    id: 39,
    section: "General Awareness",
    qEn: "Where is the headquarters of the World Health Organization (WHO) located?",
    qHi: "विश्व स्वास्थ्य संगठन (WHO) का मुख्यालय कहाँ स्थित है?",
    optionsEn: ["New York, USA", "Geneva, Switzerland", "Paris, France", "London, UK"],
    optionsHi: ["न्यूयॉर्क, यूएसए", "जिनेवा, स्विट्जरलैंड", "पेरिस, फ्रांस", "लंदन, यूके"],
    correctIndex: 1
  },
  {
    id: 40,
    section: "General Awareness",
    qEn: "Which Indian state has the longest coastline?",
    qHi: "किस भारतीय राज्य की तटरेखा सबसे लंबी है?",
    optionsEn: ["Maharashtra", "Gujarat", "Tamil Nadu", "Andhra Pradesh"],
    optionsHi: ["महाराष्ट्र", "गुजरात", "तमिलनाडु", "आंध्र प्रदेश"],
    correctIndex: 1
  },

  // --- SECTION 3: GENERAL ARITHMETIC, INTELLIGENCE & REASONING (5 Questions: Q41 - Q45) ---
  {
    id: 41,
    section: "Arithmetic & Reasoning",
    qEn: "If a train 150 meters long passes a pole in 15 seconds, what is its speed in km/hr?",
    qHi: "यदि 150 मीटर लंबी एक ट्रेन एक खंभे को 15 सेकंड में पार करती है, तो किमी/घंटा में उसकी गति क्या है?",
    optionsEn: ["30 km/hr", "36 km/hr", "45 km/hr", "54 km/hr"],
    optionsHi: ["30 किमी/घंटा", "36 किमी/घंटा", "45 किमी/घंटा", "54 किमी/घंटा"],
    correctIndex: 1
  },
  {
    id: 42,
    section: "Arithmetic & Reasoning",
    qEn: "Find the missing number in the series: 2, 6, 12, 20, 30, ?",
    qHi: "श्रृंखला में लुप्त संख्या ज्ञात कीजिए: 2, 6, 12, 20, 30, ?",
    optionsEn: ["36", "40", "42", "44"],
    optionsHi: ["36", "40", "42", "44"],
    correctIndex: 2
  },
  {
    id: 43,
    section: "Arithmetic & Reasoning",
    qEn: "If NURSE is coded as OVSTF, how is DOCTOR coded in that code?",
    qHi: "यदि NURSE को OVSTF लिखा जाता है, तो उसी कूट भाषा में DOCTOR को कैसे लिखा जाएगा?",
    optionsEn: ["EPDUPS", "EPDUPS", "EPDUPS", "EPDUPS"].map((_, i) => ["EPDUPS", "EPDUTP", "EPDUTS", "EPDUSP"][i]),
    optionsHi: ["EPDUPS", "EPDUTP", "EPDUTS", "EPDUSP"],
    correctIndex: 0
  },
  {
    id: 44,
    section: "Arithmetic & Reasoning",
    qEn: "A person buys an article for ₹800 and sells it for ₹1000. What is the profit percentage?",
    qHi: "एक व्यक्ति एक वस्तु ₹800 में खरीदता है और ₹1000 में बेचता है। लाभ प्रतिशत क्या है?",
    optionsEn: ["20%", "25%", "15%", "30%"],
    optionsHi: ["20%", "25%", "15%", "30%"],
    correctIndex: 1
  },
  {
    id: 45,
    section: "Arithmetic & Reasoning",
    qEn: "Pointing to a photograph, a man said, 'I have no brother or sister, but that man's father is my father's son.' Whose photograph was it?",
    qHi: "एक तस्वीर की ओर इशारा करते हुए एक आदमी ने कहा, 'मेरा कोई भाई या बहन नहीं है, लेकिन उस आदमी के पिता मेरे पिता के पुत्र हैं।' वह किसकी तस्वीर थी?",
    optionsEn: ["His own", "His son's", "His father's", "His nephew's"],
    optionsHi: ["उसकी स्वयं की", "उसके पुत्र की", "उसके पिता की", "उसके भतीजे की"],
    correctIndex: 1
  },

  // --- SECTION 4: GENERAL SCIENCE (5 Questions: Q46 - Q50) ---
  {
    id: 46,
    section: "General Science",
    qEn: "What is the SI unit of Electric Current?",
    qHi: "विद्युत धारा (Electric Current) की SI इकाई क्या है?",
    optionsEn: ["Volt", "Ampere", "Ohm", "Watt"],
    optionsHi: ["वोल्ट", "एम्पीयर", "ओम", "वाट"],
    correctIndex: 1
  },
  {
    id: 47,
    section: "General Science",
    qEn: "Which gas is commonly known as 'Laughing Gas'?",
    qHi: "किस गैस को सामान्यतः 'लाफिंग गैस' (हंसाने वाली गैस) कहा जाता है?",
    optionsEn: ["Nitric Oxide", "Nitrous Oxide", "Nitrogen Dioxide", "Carbon Monoxide"],
    optionsHi: ["नाइट्रिक ऑक्साइड", "नाइट्रस ऑक्साइड (N2O)", "नाइट्रोजन डाइऑक्साइड", "कार्बन मोनोऑक्साइड"],
    correctIndex: 1
  },
  {
    id: 48,
    section: "General Science",
    qEn: "Which organelle is known as the 'Powerhouse of the Cell'?",
    qHi: "किस कोशिकांग को 'कोशिका का पावरहाउस' कहा जाता है?",
    optionsEn: ["Ribosome", "Mitochondria", "Golgi Apparatus", "Lysosome"],
    optionsHi: ["राइबोसोम", "माइटोकॉन्ड्रिया", "गॉल्जीकाय", "लाइसोसोम"],
    correctIndex: 1
  },
  {
    id: 49,
    section: "General Science",
    qEn: "The chemical formula of Baking Soda is:",
    qHi: "बेकिंग सोडा (खाने का सोडा) का रासायनिक सूत्र क्या है?",
    optionsEn: ["Na2CO3", "NaHCO3", "NaCl", "CaCO3"],
    optionsHi: ["Na2CO3", "NaHCO3", "NaCl", "CaCO3"],
    correctIndex: 1
  },
  {
    id: 50,
    section: "General Science",
    qEn: "Myopia (Near-sightedness) is corrected by using which lens?",
    qHi: "निकट दृष्टि दोष (Myopia) को किस लेंस का उपयोग करके ठीक किया जाता है?",
    optionsEn: ["Convex lens", "Concave lens", "Cylindrical lens", "Bifocal lens"],
    optionsHi: ["उत्तल लेंस (Convex)", "अवतल लेंस (Concave)", "बेलनाकार लेंस", "द्विफोकसी लेंस"],
    correctIndex: 1
  }
];

// ============================================================================
// AUTHENTIC TCS iON STATUS BADGE COMPONENT (Exact Shapes & Colors)
// ============================================================================
const TcsStatusBadge = ({ status, number, onClick, isCurrent, size = "md" }) => {
  // Status types:
  // 'not-visited' -> Grey square/rounded box
  // 'not-answered' -> Red/Orange shield (flat top, curved bottom)
  // 'answered' -> Green shield (flat bottom, curved top)
  // 'marked' -> Purple circle
  // 'answered-marked' -> Purple circle with green check/dot badge
  const dim = size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";

  const baseStyle = `relative flex items-center justify-center font-bold select-none transition-transform ${
    onClick ? "cursor-pointer hover:scale-105" : ""
  } ${isCurrent ? "ring-2 ring-offset-1 ring-blue-700 scale-105 z-10" : ""}`;

  if (status === "answered") {
    return (
      <div
        onClick={onClick}
        className={`${dim} ${baseStyle} bg-[#4cae4c] text-white shadow-sm`}
        style={{
          borderRadius: "14px 14px 3px 3px",
          border: "1px solid #398439"
        }}
        title="Answered"
      >
        {number}
      </div>
    );
  }

  if (status === "not-answered") {
    return (
      <div
        onClick={onClick}
        className={`${dim} ${baseStyle} bg-[#d9534f] text-white shadow-sm`}
        style={{
          borderRadius: "3px 3px 14px 14px",
          border: "1px solid #d43f3a"
        }}
        title="Not Answered"
      >
        {number}
      </div>
    );
  }

  if (status === "marked") {
    return (
      <div
        onClick={onClick}
        className={`${dim} ${baseStyle} rounded-full bg-[#7e3f9d] text-white shadow-sm border border-[#612d7a]`}
        title="Marked for Review"
      >
        {number}
      </div>
    );
  }

  if (status === "answered-marked") {
    return (
      <div
        onClick={onClick}
        className={`${dim} ${baseStyle} rounded-full bg-[#7e3f9d] text-white shadow-sm border border-[#612d7a]`}
        title="Answered & Marked for Review (will be considered for evaluation)"
      >
        {number}
        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#4cae4c] border border-white flex items-center justify-center text-[9px]">
          ✓
        </span>
      </div>
    );
  }

  // Default: 'not-visited'
  return (
    <div
      onClick={onClick}
      className={`${dim} ${baseStyle} rounded-[3px] bg-[#e9ecef] text-[#333] border border-[#bdbdbd]`}
      title="Not Visited"
    >
      {number}
    </div>
  );
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Exam Stage: 'login' | 'instructions' | 'exam' | 'result'
  const [stage, setStage] = useState("login");

  // Candidate Details (Editable on Login screen for realistic practice)
  const [candidateName, setCandidateName] = useState("KHUSHBU KUMARI");
  const [rollNumber, setRollNumber] = useState("RRB2026PM1042");
  const [password, setPassword] = useState("01011998");
  const [activeInput, setActiveInput] = useState("password"); // 'roll' | 'password'
  const [loginError, setLoginError] = useState("");

  // Instructions Stage State
  const [defaultLang, setDefaultLang] = useState("en"); // 'en' | 'hi'
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [instructionWarning, setInstructionWarning] = useState(false);

  // Exam Stage State
  const [currentIdx, setCurrentIdx] = useState(0); // 0 to 49
  const [selectedSection, setSelectedSection] = useState("All");
  const [viewLang, setViewLang] = useState("en"); // Global question display language ('en' | 'hi' | 'both')
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds (2700s)

  // Question Responses & Statuses
  // answers: { [questionId]: optionIndex (0..3) }
  // statuses: { [questionId]: 'not-visited' | 'not-answered' | 'answered' | 'marked' | 'answered-marked' }
  const [answers, setAnswers] = useState({});
  const [statuses, setStatuses] = useState(() => {
    const init = {};
    QUESTIONS_DATA.forEach((q, idx) => {
      init[q.id] = idx === 0 ? "not-answered" : "not-visited";
    });
    return init;
  });

  // Modals during Exam
  const [showQuestionPaperModal, setShowQuestionPaperModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(true);

  // Result Review Filter
  const [resultFilter, setResultFilter] = useState("all"); // 'all' | 'correct' | 'incorrect' | 'unattempted'

  // Sync default language from instructions when exam starts
  const startExam = () => {
    if (!agreedTerms) {
      setInstructionWarning(true);
      return;
    }
    setInstructionWarning(false);
    setViewLang(defaultLang);
    // Mark Q1 as not-answered upon visiting
    setStatuses((prev) => ({
      ...prev,
      [QUESTIONS_DATA[0].id]: prev[QUESTIONS_DATA[0].id] === "not-visited" ? "not-answered" : prev[QUESTIONS_DATA[0].id]
    }));
    setStage("exam");
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (stage !== "exam") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setStage("result");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [stage]);

  // Format MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Current Question Object
  const currentQuestion = QUESTIONS_DATA[currentIdx];

  // Navigate to a specific question index (0-49)
  const goToQuestion = (targetIndex) => {
    const targetQ = QUESTIONS_DATA[targetIndex];
    setStatuses((prev) => {
      const currentStatus = prev[targetQ.id];
      if (currentStatus === "not-visited") {
        return { ...prev, [targetQ.id]: "not-answered" };
      }
      return prev;
    });
    setCurrentIdx(targetIndex);
    setSelectedSection(targetQ.section);
  };

  // Select Option for current question (does NOT save permanently until Save & Next or Mark for Review, just like TCS iON!)
  const handleSelectOption = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  // TCS iON Button 1: Save & Next
  const handleSaveAndNext = () => {
    const hasSelected = answers[currentQuestion.id] !== undefined;
    setStatuses((prev) => ({
      ...prev,
      [currentQuestion.id]: hasSelected ? "answered" : "not-answered"
    }));
    const nextIdx = (currentIdx + 1) % QUESTIONS_DATA.length;
    goToQuestion(nextIdx);
  };

  // TCS iON Button 2: Mark for Review & Next
  const handleMarkForReviewAndNext = () => {
    const hasSelected = answers[currentQuestion.id] !== undefined;
    setStatuses((prev) => ({
      ...prev,
      [currentQuestion.id]: hasSelected ? "answered-marked" : "marked"
    }));
    const nextIdx = (currentIdx + 1) % QUESTIONS_DATA.length;
    goToQuestion(nextIdx);
  };

  // TCS iON Button 3: Clear Response
  const handleClearResponse = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
    setStatuses((prev) => ({
      ...prev,
      [currentQuestion.id]: "not-answered"
    }));
  };

  // Status Counts Computation
  const statusCounts = useMemo(() => {
    let answered = 0;
    let notAnswered = 0;
    let notVisited = 0;
    let marked = 0;
    let answeredMarked = 0;

    QUESTIONS_DATA.forEach((q) => {
      const st = statuses[q.id];
      if (st === "answered") answered++;
      else if (st === "not-answered") notAnswered++;
      else if (st === "marked") marked++;
      else if (st === "answered-marked") answeredMarked++;
      else notVisited++;
    });

    return { answered, notAnswered, notVisited, marked, answeredMarked };
  }, [statuses]);

  // Result Scorecard Calculation (RRB Marking: +1 for Correct, -1/3 for Wrong)
  const scorecard = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    QUESTIONS_DATA.forEach((q) => {
      const userAns = answers[q.id];
      if (userAns === undefined) {
        unattempted++;
      } else if (userAns === q.correctIndex) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const positiveMarks = correct * 1;
    const negativeMarks = +(incorrect * (1 / 3)).toFixed(2);
    const netScore = +(positiveMarks - negativeMarks).toFixed(2);
    const attempted = correct + incorrect;
    const accuracy = attempted > 0 ? ((correct / attempted) * 100).toFixed(1) : "0.0";

    return {
      total: QUESTIONS_DATA.length,
      attempted,
      correct,
      incorrect,
      unattempted,
      positiveMarks,
      negativeMarks,
      netScore,
      accuracy
    };
  }, [answers]);

  // Reset entire exam for practice
  const handleRestartExam = () => {
    const initStatuses = {};
    QUESTIONS_DATA.forEach((q, idx) => {
      initStatuses[q.id] = idx === 0 ? "not-answered" : "not-visited";
    });
    setAnswers({});
    setStatuses(initStatuses);
    setCurrentIdx(0);
    setTimeLeft(45 * 60);
    setAgreedTerms(false);
    setStage("login");
  };

  // Virtual Keypad Press Handler on Login Screen
  const handleVirtualKey = (key) => {
    setLoginError("");
    if (key === "BACKSPACE") {
      if (activeInput === "roll") setRollNumber((prev) => prev.slice(0, -1));
      else setPassword((prev) => prev.slice(0, -1));
    } else if (key === "CLEAR") {
      if (activeInput === "roll") setRollNumber("");
      else setPassword("");
    } else {
      if (activeInput === "roll") setRollNumber((prev) => prev + key);
      else setPassword((prev) => prev + key);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!rollNumber.trim() || !password.trim()) {
      setLoginError("Please enter valid Roll Number / Registration No. and Password (DOB).");
      return;
    }
    setLoginError("");
    setStage("instructions");
  };

  // ==========================================================================
  // STAGE 1: AUTHENTIC TCS iON / RRB LOGIN SCREEN
  // ==========================================================================
  if (stage === "login") {
    return (
      <div className="min-h-screen flex flex-col bg-[#f2f4f7] font-sans select-none">
        {/* Top RRB Banner */}
        <header className="bg-[#2c3e50] text-white px-4 py-2 flex items-center justify-between border-b-4 border-[#f39c12]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-[#2c3e50] flex items-center justify-center font-extrabold text-sm border-2 border-[#f39c12]">
              RRB
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold tracking-wide uppercase">
                Railway Recruitment Boards (RRB) - CBT Practice Portal
              </h1>
              <p className="text-[11px] text-gray-300">
                Paramedical Categories Mock Examination (Staff Nurse / Pharmacist / Lab Technician / Health Inspector)
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs bg-[#1a252f] px-3 py-1.5 rounded border border-gray-600">
            <Monitor className="w-4 h-4 text-[#f39c12]" />
            <span>TCS iON Digital Zone Simulator</span>
          </div>
        </header>

        {/* System & Candidate Info Strip (Exact TCS iON Login Header) */}
        <div className="bg-[#3b4d61] text-white px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-xs text-gray-300">System Name :</div>
              <div className="text-2xl sm:text-3xl font-bold text-[#ffeb3b] tracking-wider">C001</div>
              <div className="text-[10px] text-gray-300 mt-0.5">
                Kindly contact the invigilator if there are any discrepancies in the Name and Photograph displayed on the screen or if the photograph is not yours
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right">
              <div className="text-xs text-gray-300">Candidate Name :</div>
              <div className="text-lg sm:text-xl font-bold text-[#ffeb3b]">{candidateName || "CANDIDATE"}</div>
              <div className="text-xs text-gray-200 mt-0.5">
                Subject : <span className="font-semibold text-white">RRB Paramedical Mock (50 Qs)</span>
              </div>
            </div>
            <div className="w-16 h-20 bg-white border-2 border-gray-300 rounded flex flex-col items-center justify-center text-gray-500 overflow-hidden shadow">
              <User className="w-10 h-10 text-gray-400" />
              <span className="text-[9px] font-bold bg-gray-200 w-full text-center py-0.5 text-gray-700">PHOTO</span>
            </div>
          </div>
        </div>

        {/* Center Login Box + Virtual Keypad */}
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded shadow-lg border border-gray-300 overflow-hidden">
            <div className="bg-[#e8ecef] px-4 py-2.5 border-b border-gray-300 flex items-center justify-between">
              <span className="font-bold text-gray-700 text-sm">Login</span>
              <button
                type="button"
                onClick={() => {
                  setRollNumber("RRB2026PM1042");
                  setPassword("01011998");
                  setLoginError("");
                }}
                className="text-xs text-[#2d72b8] hover:underline font-medium"
              >
                Auto-fill Demo Credentials
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="p-5 space-y-4">
              {/* Optional Candidate Name Customizer for Practice */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Candidate Name (Practice Display Name):
                </label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value.toUpperCase())}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2d72b8]"
                  placeholder="Enter Candidate Name"
                />
              </div>

              {/* Roll Number Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Roll Number / Username:
                </label>
                <div className="flex items-center border border-gray-300 rounded overflow-hidden focus-within:border-[#2d72b8]">
                  <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={rollNumber}
                    onFocus={() => setActiveInput("roll")}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm font-mono focus:outline-none"
                    placeholder="Enter Roll Number"
                  />
                  <button
                    type="button"
                    onClick={() => setActiveInput("roll")}
                    className={`px-2.5 py-2 border-l border-gray-300 ${
                      activeInput === "roll" ? "bg-blue-50 text-[#2d72b8]" : "bg-gray-100 text-gray-500"
                    }`}
                    title="Use Virtual Keyboard"
                  >
                    <Keyboard className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Password / DOB Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Password (DDMMYYYY):
                </label>
                <div className="flex items-center border border-gray-300 rounded overflow-hidden focus-within:border-[#2d72b8]">
                  <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300 font-bold text-xs">
                    ***
                  </span>
                  <input
                    type="password"
                    value={password}
                    onFocus={() => setActiveInput("password")}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm font-mono focus:outline-none"
                    placeholder="Enter Password (e.g. 01011998)"
                  />
                  <button
                    type="button"
                    onClick={() => setActiveInput("password")}
                    className={`px-2.5 py-2 border-l border-gray-300 ${
                      activeInput === "password" ? "bg-blue-50 text-[#2d72b8]" : "bg-gray-100 text-gray-500"
                    }`}
                    title="Use Virtual Keypad"
                  >
                    <Keyboard className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* TCS iON Style On-Screen Virtual Numeric Keypad */}
              <div className="bg-[#f8f9fa] border border-gray-300 rounded p-2.5">
                <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2">
                  <span>
                    Virtual Keypad (Active:{" "}
                    <strong className="text-[#2d72b8]">
                      {activeInput === "roll" ? "Roll Number" : "Password"}
                    </strong>
                    )
                  </span>
                  <span>Click keys to type</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "CLEAR", "0", "BACKSPACE"].map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleVirtualKey(key)}
                      className={`py-1.5 text-xs font-bold rounded border shadow-sm active:scale-95 transition ${
                        key === "CLEAR" || key === "BACKSPACE"
                          ? "bg-gray-200 hover:bg-gray-300 text-gray-700 border-gray-400"
                          : "bg-white hover:bg-blue-50 text-gray-800 border-gray-300"
                      }`}
                    >
                      {key === "BACKSPACE" ? "⌫ Bksp" : key}
                    </button>
                  ))}
                </div>
              </div>

              {loginError && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-200 p-2 rounded">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#2d72b8] hover:bg-[#235a92] text-white font-bold py-2.5 rounded shadow transition text-sm tracking-wide cursor-pointer"
              >
                Sign In
              </button>
            </form>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#34495e] text-gray-300 text-center text-xs py-2">
          Version 17.07.00 | Railway Recruitment Board CBT Mock Environment (Practice Purpose)
        </footer>
      </div>
    );
  }

  // ==========================================================================
  // STAGE 2: GENERAL INSTRUCTIONS & DECLARATION SCREEN (EXACT TCS iON)
  // ==========================================================================
  if (stage === "instructions") {
    return (
      <div className="min-h-screen flex flex-col bg-white font-sans">
        {/* Top Blue Header */}
        <header className="bg-[#2d72b8] text-white px-4 py-2.5 flex items-center justify-between shadow">
          <div className="font-bold text-base sm:text-lg">
            RRB Paramedical Categories - Computer Based Test (CBT)
          </div>
          <div className="text-xs bg-blue-800 px-3 py-1 rounded">
            System: C001
          </div>
        </header>

        {/* Main Split Layout: Left Instructions (80%) + Right Profile (20%) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Panel */}
          <div className="flex-1 flex flex-col border-r border-gray-300">
            <div className="bg-[#bce8f1] text-[#31708f] px-4 py-2 font-bold text-sm border-b border-gray-300">
              Instructions / निर्देश (कृपया ध्यान से पढ़ें)
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-gray-800 leading-relaxed max-h-[65vh] lg:max-h-[calc(100vh-220px)]">
              <h2 className="font-bold text-center underline text-base text-gray-900">
                Please read the instructions carefully / कृपया निर्देशों को ध्यानपूर्वक पढ़ें
              </h2>

              <div>
                <h3 className="font-bold text-gray-900 mb-1">General Instructions / सामान्य निर्देश:</h3>
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li>
                    Total duration of examination is <strong>45 minutes</strong> for <strong>50 questions</strong>.
                    <br />
                    <span className="text-gray-600">
                      परीक्षा की कुल अवधि <strong>50 प्रश्नों</strong> के लिए <strong>45 मिनट</strong> है।
                    </span>
                  </li>
                  <li>
                    Each question carries <strong>1 mark</strong>. There is negative marking of <strong>1/3 mark (0.33)</strong> for each wrong answer.
                    <br />
                    <span className="text-gray-600">
                      प्रत्येक प्रश्न <strong>1 अंक</strong> का है। प्रत्येक गलत उत्तर के लिए <strong>1/3 अंक (0.33)</strong> की नकारात्मक अंकन (Negative Marking) होगी।
                    </span>
                  </li>
                  <li>
                    The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination.
                    <br />
                    <span className="text-gray-600">
                      स्क्रीन के शीर्ष दाएं कोने में उलटी गिनती घड़ी (Timer) आपको परीक्षा पूरी करने के लिए शेष समय दिखाएगी।
                    </span>
                  </li>
                  <li>
                    The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols:
                  </li>
                </ol>
              </div>

              {/* Exact TCS iON Symbol Legend Table */}
              <div className="border border-gray-300 rounded p-3 bg-gray-50 space-y-2.5 max-w-2xl">
                <div className="flex items-center gap-3">
                  <TcsStatusBadge status="not-visited" number="1" size="sm" />
                  <span>
                    You have <strong>not visited</strong> the question yet. / आपने अभी तक प्रश्न नहीं देखा है।
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <TcsStatusBadge status="not-answered" number="2" size="sm" />
                  <span>
                    You have <strong>not answered</strong> the question. / आपने प्रश्न का उत्तर नहीं दिया है।
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <TcsStatusBadge status="answered" number="3" size="sm" />
                  <span>
                    You have <strong>answered</strong> the question. / आपने प्रश्न का उत्तर दे दिया है।
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <TcsStatusBadge status="marked" number="4" size="sm" />
                  <span>
                    You have <strong>NOT answered</strong> the question, but have <strong>marked the question for review</strong>. / आपने प्रश्न का उत्तर नहीं दिया है, पर समीक्षा के लिए चिह्नित किया है।
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <TcsStatusBadge status="answered-marked" number="5" size="sm" />
                  <span>
                    The question(s) <strong>"Answered and Marked for Review"</strong> will be considered for evaluation. / "उत्तर दिया गया और समीक्षा के लिए चिह्नित" प्रश्नों का मूल्यांकन किया जाएगा।
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1">Navigating & Answering a Question:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Click on <strong>Save & Next</strong> to save your answer for the current question and then go to the next question.
                  </li>
                  <li>
                    Click on <strong>Mark for Review & Next</strong> to save your answer for the current question, mark it for review, and then go to the next question.
                  </li>
                  <li>
                    To deselect your chosen answer, click on the <strong>Clear Response</strong> button.
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Language Selection & Declaration Bar */}
            <div className="border-t border-gray-300 bg-[#f9f9f9] p-4 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <label className="font-bold text-xs sm:text-sm text-gray-800">
                  Choose your default language / अपनी डिफ़ॉल्ट भाषा चुनें:
                </label>
                <select
                  value={defaultLang}
                  onChange={(e) => setDefaultLang(e.target.value)}
                  className="border border-gray-400 rounded px-3 py-1 text-sm bg-white font-semibold focus:outline-none focus:border-[#2d72b8]"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi (हिंदी)</option>
                  <option value="both">Bilingual (English + हिंदी दोनों)</option>
                </select>
                <span className="text-[11px] text-red-600">
                  * You can also switch language anytime during the exam.
                </span>
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-800">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => {
                    setAgreedTerms(e.target.checked);
                    if (e.target.checked) setInstructionWarning(false);
                  }}
                  className="mt-0.5 w-4 h-4 accent-[#2d72b8]"
                />
                <span>
                  I have read and understood the instructions. All computer hardware allotted to me are in proper working condition. I declare that I am not in possession of any prohibited gadget.
                  <br />
                  <span className="text-gray-600">
                    मैंने सभी निर्देशों को पढ़ और समझ लिया है। मुझे आवंटित सभी कंप्यूटर हार्डवेयर सही कार्य स्थिति में हैं।
                  </span>
                </span>
              </label>

              {instructionWarning && (
                <div className="text-xs font-semibold text-red-600 bg-red-50 border border-red-300 px-3 py-1.5 rounded">
                  Please check the declaration box above before proceeding! / कृपया आगे बढ़ने से पहले घोषणा बॉक्स पर टिक करें!
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setStage("login")}
                  className="px-4 py-2 border border-gray-400 bg-white hover:bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold rounded flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  type="button"
                  onClick={startExam}
                  className="px-6 py-2 bg-[#2d72b8] hover:bg-[#22588f] text-white text-xs sm:text-sm font-bold rounded shadow cursor-pointer"
                >
                  I am ready to begin / मैं शुरू करने के लिए तैयार हूँ
                </button>
              </div>
            </div>
          </div>

          {/* Right Candidate Profile Panel */}
          <div className="w-full lg:w-64 bg-[#f4f6f9] p-4 flex flex-col items-center justify-start border-t lg:border-t-0 border-gray-300">
            <div className="w-24 h-28 bg-white border-2 border-gray-400 rounded flex flex-col items-center justify-center shadow-sm mb-3">
              <User className="w-14 h-14 text-gray-400" />
              <span className="text-[10px] font-bold text-gray-500 mt-1">{rollNumber}</span>
            </div>
            <div className="font-bold text-sm text-gray-800 text-center">{candidateName}</div>
            <div className="text-xs text-gray-500 mt-1">Post: Paramedical Staff</div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // STAGE 3: MAIN TCS iON CBT EXAM INTERFACE
  // ==========================================================================
  if (stage === "exam") {
    const sectionsList = [
      { label: "All Sections", value: "All", range: [1, 50] },
      { label: "Professional Ability (35)", value: "Professional Ability", range: [1, 35] },
      { label: "General Awareness (5)", value: "General Awareness", range: [36, 40] },
      { label: "Arithmetic & Reasoning (5)", value: "Arithmetic & Reasoning", range: [41, 45] },
      { label: "General Science (5)", value: "General Science", range: [46, 50] }
    ];

    const isLowTime = timeLeft <= 300; // Last 5 minutes warning

    return (
      <div className="h-screen flex flex-col bg-white font-sans overflow-hidden select-none">
        {/* 1. Top Dark Blue Header Bar */}
        <header className="bg-[#2c3e50] text-white px-3 py-1.5 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold truncate">
            <span className="bg-[#f39c12] text-black px-1.5 py-0.5 rounded text-xs font-extrabold">
              RRB CBT
            </span>
            <span className="truncate">RRB Paramedical Mock Examination - 2026</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowQuestionPaperModal(true)}
              className="flex items-center gap-1 bg-[#34495e] hover:bg-[#3d566e] px-2.5 py-1 rounded border border-gray-500 text-xs cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-sky-300" />
              <span>Question Paper</span>
            </button>
            <button
              type="button"
              onClick={() => setShowInstructionsModal(true)}
              className="flex items-center gap-1 bg-[#34495e] hover:bg-[#3d566e] px-2.5 py-1 rounded border border-gray-500 text-xs cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-amber-300" />
              <span>Instructions</span>
            </button>
          </div>
        </header>

        {/* 2. Section Tabs + Live Timer Bar */}
        <div className="bg-[#f1f3f6] border-b border-gray-300 px-3 py-1.5 flex flex-wrap items-center justify-between gap-2">
          {/* Section Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
            <span className="text-[11px] font-bold text-gray-500 mr-1 hidden sm:inline">Sections:</span>
            {sectionsList.map((sec) => {
              const isActive =
                (sec.value === "All" && selectedSection === "All") ||
                currentQuestion.section === sec.value;
              return (
                <button
                  key={sec.value}
                  type="button"
                  onClick={() => {
                    setSelectedSection(sec.value);
                    goToQuestion(sec.range[0] - 1);
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-t border transition whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[#2d72b8] text-white border-[#2d72b8]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>

          {/* Live Countdown Timer */}
          <div className="flex items-center gap-2 ml-auto">
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded border text-xs sm:text-sm font-bold ${
                isLowTime
                  ? "bg-red-100 text-red-700 border-red-400 animate-pulse"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            >
              <Clock className="w-4 h-4 text-[#2d72b8]" />
              <span>Time Left :</span>
              <span className="font-mono text-base">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* 3. Main Exam Workspace (Left Question Area + Right Palette Sidebar) */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* LEFT: Question Display & Action Buttons */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {/* Sub-header: Question Type, Marks & Language Selector */}
            <div className="bg-[#2d72b8] text-white px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold">Question Type : MCQ</span>
                <span className="hidden sm:inline text-blue-200">|</span>
                <span className="hidden sm:inline">Section: {currentQuestion.section}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-blue-900/60 px-2 py-0.5 rounded text-[11px]">
                  Marks: <span className="text-green-300 font-bold">+1.00</span> | Negative:{" "}
                  <span className="text-red-300 font-bold">-0.33</span>
                </div>

                {/* Language Switcher Dropdown */}
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>View in :</span>
                  <select
                    value={viewLang}
                    onChange={(e) => setViewLang(e.target.value)}
                    className="bg-white text-gray-900 font-bold rounded px-2 py-0.5 text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी (Hindi)</option>
                    <option value="both">English + हिंदी</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Question Number Strip */}
            <div className="px-4 py-2 border-b border-gray-300 bg-gray-50 flex items-center justify-between">
              <div className="font-bold text-sm sm:text-base text-gray-900">
                Question No. {currentQuestion.id}
              </div>
              <div className="flex items-center gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setViewLang("en")}
                  className={`px-2 py-0.5 rounded border cursor-pointer ${
                    viewLang === "en" ? "bg-[#2d72b8] text-white border-[#2d72b8]" : "bg-white text-gray-700"
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setViewLang("hi")}
                  className={`px-2 py-0.5 rounded border cursor-pointer ${
                    viewLang === "hi" ? "bg-[#2d72b8] text-white border-[#2d72b8]" : "bg-white text-gray-700"
                  }`}
                >
                  हिंदी
                </button>
                <button
                  type="button"
                  onClick={() => setViewLang("both")}
                  className={`px-2 py-0.5 rounded border cursor-pointer ${
                    viewLang === "both" ? "bg-[#2d72b8] text-white border-[#2d72b8]" : "bg-white text-gray-700"
                  }`}
                >
                  Both
                </button>
              </div>
            </div>

            {/* Scrollable Question & 4 Options Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {/* Question Stem */}
              <div className="space-y-2 pb-4 border-b border-gray-200">
                {(viewLang === "en" || viewLang === "both") && (
                  <p className="text-base sm:text-lg font-medium text-gray-900 leading-relaxed">
                    {currentQuestion.qEn}
                  </p>
                )}
                {(viewLang === "hi" || viewLang === "both") && (
                  <p className="text-base sm:text-lg font-medium text-gray-800 leading-relaxed">
                    {currentQuestion.qHi}
                  </p>
                )}
              </div>

              {/* 4 Radio Options */}
              <div className="space-y-3 max-w-3xl">
                {[0, 1, 2, 3].map((optIdx) => {
                  const isSelected = answers[currentQuestion.id] === optIdx;
                  return (
                    <label
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`flex items-start gap-3 p-3 rounded border transition cursor-pointer ${
                        isSelected
                          ? "bg-blue-50 border-[#2d72b8] ring-1 ring-[#2d72b8]"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q_${currentQuestion.id}`}
                        checked={isSelected}
                        onChange={() => handleSelectOption(optIdx)}
                        className="mt-1 w-4 h-4 accent-[#2d72b8] cursor-pointer"
                      />
                      <div className="flex-1 text-sm sm:text-base">
                        <span className="font-bold text-gray-500 mr-2">({optIdx + 1})</span>
                        {(viewLang === "en" || viewLang === "both") && (
                          <span className="text-gray-900 font-medium">
                            {currentQuestion.optionsEn[optIdx]}
                          </span>
                        )}
                        {viewLang === "both" && <span className="mx-2 text-gray-400">/</span>}
                        {(viewLang === "hi" || viewLang === "both") && (
                          <span className="text-gray-800 font-medium">
                            {currentQuestion.optionsHi[optIdx]}
                          </span>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Sticky Bottom TCS iON Action Bar */}
            <div className="border-t border-gray-300 bg-[#f5f5f5] px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleMarkForReviewAndNext}
                  className="px-3 py-1.5 bg-white hover:bg-purple-50 text-gray-800 border border-gray-400 rounded text-xs sm:text-sm font-semibold shadow-sm cursor-pointer"
                >
                  Mark for Review & Next
                </button>
                <button
                  type="button"
                  onClick={handleClearResponse}
                  className="px-3 py-1.5 bg-white hover:bg-red-50 text-gray-800 border border-gray-400 rounded text-xs sm:text-sm font-semibold shadow-sm cursor-pointer"
                >
                  Clear Response
                </button>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => goToQuestion((currentIdx - 1 + QUESTIONS_DATA.length) % QUESTIONS_DATA.length)}
                  className="px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-400 rounded text-xs sm:text-sm font-semibold cursor-pointer hidden sm:inline-flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  type="button"
                  onClick={handleSaveAndNext}
                  className="px-5 py-1.5 bg-[#2d72b8] hover:bg-[#235a92] text-white border border-[#22588f] rounded text-xs sm:text-sm font-bold shadow cursor-pointer"
                >
                  Save & Next
                </button>
              </div>
            </div>
          </div>

          {/* Toggle Palette Drawer Button */}
          <button
            type="button"
            onClick={() => setIsPaletteOpen(!isPaletteOpen)}
            className="hidden md:flex items-center justify-center w-5 bg-[#2c3e50] hover:bg-black text-white cursor-pointer"
            title={isPaletteOpen ? "Collapse Question Palette" : "Expand Question Palette"}
          >
            {isPaletteOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* RIGHT: TCS iON Question Palette Sidebar */}
          {isPaletteOpen && (
            <aside className="w-72 sm:w-80 border-l border-gray-300 bg-[#e6f2fa] flex flex-col shrink-0">
              {/* Candidate Info Strip */}
              <div className="bg-white p-2.5 border-b border-gray-300 flex items-center gap-3">
                <div className="w-11 h-12 bg-gray-100 border border-gray-300 rounded flex items-center justify-center shrink-0">
                  <User className="w-7 h-7 text-gray-500" />
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                    {candidateName}
                  </div>
                  <div className="text-[11px] text-gray-500 truncate">Roll: {rollNumber}</div>
                </div>
              </div>

              {/* Live Status Count Legend (Exact TCS iON 2-column grid) */}
              <div className="bg-white p-2.5 border-b border-gray-300 grid grid-cols-2 gap-1.5 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <TcsStatusBadge status="answered" number={statusCounts.answered} size="sm" />
                  <span className="leading-tight">Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TcsStatusBadge status="not-answered" number={statusCounts.notAnswered} size="sm" />
                  <span className="leading-tight">Not Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TcsStatusBadge status="not-visited" number={statusCounts.notVisited} size="sm" />
                  <span className="leading-tight">Not Visited</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TcsStatusBadge status="marked" number={statusCounts.marked} size="sm" />
                  <span className="leading-tight">Marked for Review</span>
                </div>
                <div className="col-span-2 flex items-center gap-1.5 pt-0.5">
                  <TcsStatusBadge status="answered-marked" number={statusCounts.answeredMarked} size="sm" />
                  <span className="leading-tight">
                    Answered & Marked for Review (will be evaluated)
                  </span>
                </div>
              </div>

              {/* Palette Section Header */}
              <div className="bg-[#2d72b8] text-white px-3 py-1.5 text-xs font-bold">
                Question Palette (Q1 - Q50)
              </div>

              {/* Scrollable Numbered Question Grid (1 to 50) */}
              <div className="flex-1 overflow-y-auto p-3">
                <div className="text-[11px] font-semibold text-gray-600 mb-2">
                  Choose a Question:
                </div>
                <div className="grid grid-cols-5 gap-2 place-items-center">
                  {QUESTIONS_DATA.map((q, idx) => (
                    <TcsStatusBadge
                      key={q.id}
                      status={statuses[q.id]}
                      number={q.id}
                      isCurrent={currentIdx === idx}
                      onClick={() => goToQuestion(idx)}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Submit Exam Button */}
              <div className="p-3 bg-[#d9edf7] border-t border-gray-300">
                <button
                  type="button"
                  onClick={() => setShowSubmitConfirmModal(true)}
                  className="w-full py-2 bg-[#2d72b8] hover:bg-[#20548a] text-white font-bold text-sm rounded shadow cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </aside>
          )}
        </div>

        {/* ==================================================================== */}
        {/* MODAL 1: SUBMIT CONFIRMATION SUMMARY (EXACT TCS iON TABLE)           */}
        {/* ==================================================================== */}
        {showSubmitConfirmModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded shadow-xl max-w-xl w-full border border-gray-300 overflow-hidden">
              <div className="bg-[#2d72b8] text-white px-4 py-2.5 font-bold text-sm flex items-center justify-between">
                <span>Exam Summary / परीक्षा सारांश</span>
                <button
                  type="button"
                  onClick={() => setShowSubmitConfirmModal(false)}
                  className="text-white hover:text-gray-200 font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 space-y-4">
                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                  Are you sure you want to submit the exam? Once submitted, you cannot change your answers.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse border border-gray-300 text-center">
                    <thead className="bg-gray-100 font-bold text-gray-800">
                      <tr>
                        <th className="border border-gray-300 p-2">Section Name</th>
                        <th className="border border-gray-300 p-2">No. of Qs</th>
                        <th className="border border-gray-300 p-2 text-green-700">Answered</th>
                        <th className="border border-gray-300 p-2 text-red-700">Not Answered</th>
                        <th className="border border-gray-300 p-2 text-purple-700">Marked</th>
                        <th className="border border-gray-300 p-2 text-gray-600">Not Visited</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2 font-semibold">
                          RRB Paramedical CBT
                        </td>
                        <td className="border border-gray-300 p-2 font-bold">50</td>
                        <td className="border border-gray-300 p-2 font-bold text-green-700">
                          {statusCounts.answered + statusCounts.answeredMarked}
                        </td>
                        <td className="border border-gray-300 p-2 font-bold text-red-700">
                          {statusCounts.notAnswered}
                        </td>
                        <td className="border border-gray-300 p-2 font-bold text-purple-700">
                          {statusCounts.marked}
                        </td>
                        <td className="border border-gray-300 p-2 font-bold text-gray-600">
                          {statusCounts.notVisited}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitConfirmModal(false)}
                    className="px-4 py-1.5 border border-gray-400 bg-white hover:bg-gray-100 text-gray-800 rounded text-xs sm:text-sm font-semibold cursor-pointer"
                  >
                    No, Return to Exam
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSubmitConfirmModal(false);
                      setStage("result");
                    }}
                    className="px-5 py-1.5 bg-[#4cae4c] hover:bg-[#3d943d] text-white rounded text-xs sm:text-sm font-bold shadow cursor-pointer"
                  >
                    Yes, Submit Exam
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* MODAL 2: FULL QUESTION PAPER AT A GLANCE                             */}
        {/* ==================================================================== */}
        {showQuestionPaperModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded shadow-xl max-w-4xl w-full max-h-[85vh] flex flex-col border border-gray-300 overflow-hidden">
              <div className="bg-[#2c3e50] text-white px-4 py-2.5 font-bold text-sm flex items-center justify-between">
                <span>Complete Question Paper (50 Questions - Bilingual)</span>
                <button
                  type="button"
                  onClick={() => setShowQuestionPaperModal(false)}
                  className="bg-red-600 hover:bg-red-700 px-2.5 py-0.5 rounded text-xs cursor-pointer"
                >
                  Close ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-gray-200">
                {QUESTIONS_DATA.map((q, i) => (
                  <div key={q.id} className="pt-3 first:pt-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-[#2d72b8]">
                        Q.{q.id} [{q.section}]
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          goToQuestion(i);
                          setShowQuestionPaperModal(false);
                        }}
                        className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                      >
                        Jump to Q.{q.id} →
                      </button>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{q.qEn}</p>
                    <p className="text-sm text-gray-700 mt-0.5">{q.qHi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* MODAL 3: INSTRUCTIONS QUICK VIEW                                     */}
        {/* ==================================================================== */}
        {showInstructionsModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded shadow-xl max-w-2xl w-full border border-gray-300 overflow-hidden">
              <div className="bg-[#2c3e50] text-white px-4 py-2.5 font-bold text-sm flex items-center justify-between">
                <span>Exam Instructions / परीक्षा निर्देश</span>
                <button
                  type="button"
                  onClick={() => setShowInstructionsModal(false)}
                  className="bg-red-600 hover:bg-red-700 px-2.5 py-0.5 rounded text-xs cursor-pointer"
                >
                  Close ✕
                </button>
              </div>
              <div className="p-4 text-xs sm:text-sm space-y-2 text-gray-800">
                <p>• Total Questions: <strong>50</strong> | Total Time: <strong>45 Minutes</strong>.</p>
                <p>• Correct Answer: <strong>+1 Mark</strong> | Incorrect Answer: <strong>-1/3 (-0.33) Mark</strong>.</p>
                <p>• Only questions saved via <strong>Save & Next</strong> or <strong>Mark for Review & Next</strong> (with a selected option) are evaluated.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================================================
  // STAGE 4: RRB SCORECARD & DETAILED BILINGUAL ANSWER REVIEW
  // ==========================================================================
  const filteredReviewQuestions = QUESTIONS_DATA.filter((q) => {
    const userAns = answers[q.id];
    if (resultFilter === "correct") return userAns === q.correctIndex;
    if (resultFilter === "incorrect") return userAns !== undefined && userAns !== q.correctIndex;
    if (resultFilter === "unattempted") return userAns === undefined;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f2f4f7] font-sans pb-10">
      {/* Top Header */}
      <header className="bg-[#2c3e50] text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow">
        <div className="flex items-center gap-2.5">
          <Award className="w-6 h-6 text-[#f39c12]" />
          <div>
            <h1 className="font-bold text-base sm:text-lg">
              RRB Paramedical CBT - Official Performance Scorecard
            </h1>
            <p className="text-xs text-gray-300">
              Candidate: {candidateName} | Roll No: {rollNumber}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRestartExam}
          className="flex items-center gap-1.5 bg-[#f39c12] hover:bg-[#e67e22] text-black font-bold px-4 py-2 rounded text-xs sm:text-sm shadow cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Re-attempt Exam / पुनः प्रयास करें</span>
        </button>
      </header>

      <main className="max-w-5xl mx-auto p-4 space-y-6">
        {/* Score Summary Cards */}
        <div className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
          <div className="bg-[#2d72b8] text-white px-4 py-2.5 font-bold text-sm flex items-center justify-between">
            <span>Result Summary (Negative Marking: -1/3)</span>
            <span>Time Taken: {formatTime(45 * 60 - timeLeft)}</span>
          </div>

          <div className="p-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
            <div className="p-2.5 rounded bg-gray-50 border border-gray-200">
              <div className="text-[11px] text-gray-500 font-semibold">Total Qs</div>
              <div className="text-xl font-extrabold text-gray-800">{scorecard.total}</div>
            </div>
            <div className="p-2.5 rounded bg-blue-50 border border-blue-200">
              <div className="text-[11px] text-blue-600 font-semibold">Attempted</div>
              <div className="text-xl font-extrabold text-blue-800">{scorecard.attempted}</div>
            </div>
            <div className="p-2.5 rounded bg-green-50 border border-green-200">
              <div className="text-[11px] text-green-600 font-semibold">Correct (+1)</div>
              <div className="text-xl font-extrabold text-green-700">{scorecard.correct}</div>
            </div>
            <div className="p-2.5 rounded bg-red-50 border border-red-200">
              <div className="text-[11px] text-red-600 font-semibold">Wrong (-0.33)</div>
              <div className="text-xl font-extrabold text-red-700">{scorecard.incorrect}</div>
            </div>
            <div className="p-2.5 rounded bg-gray-50 border border-gray-200">
              <div className="text-[11px] text-gray-500 font-semibold">Skipped</div>
              <div className="text-xl font-extrabold text-gray-700">{scorecard.unattempted}</div>
            </div>
            <div className="p-2.5 rounded bg-red-50 border border-red-200">
              <div className="text-[11px] text-red-600 font-semibold">Neg. Marks</div>
              <div className="text-xl font-extrabold text-red-700">-{scorecard.negativeMarks}</div>
            </div>
            <div className="p-2.5 rounded bg-amber-50 border border-amber-300">
              <div className="text-[11px] text-amber-800 font-bold">Net Score</div>
              <div className="text-xl font-extrabold text-amber-900">{scorecard.netScore} / 50</div>
            </div>
            <div className="p-2.5 rounded bg-purple-50 border border-purple-200">
              <div className="text-[11px] text-purple-700 font-semibold">Accuracy</div>
              <div className="text-xl font-extrabold text-purple-900">{scorecard.accuracy}%</div>
            </div>
          </div>
        </div>

        {/* Detailed Question-by-Question Answer Key Review */}
        <div className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-300 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-bold text-sm sm:text-base text-gray-800">
              Answer Key & Response Sheet (उत्तर कुंजी और प्रतिक्रिया पत्रक)
            </h2>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                { id: "all", label: `All (${scorecard.total})` },
                { id: "correct", label: `Correct (${scorecard.correct})` },
                { id: "incorrect", label: `Incorrect (${scorecard.incorrect})` },
                { id: "unattempted", label: `Unattempted (${scorecard.unattempted})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setResultFilter(tab.id)}
                  className={`px-3 py-1 rounded font-semibold border cursor-pointer ${
                    resultFilter === tab.id
                      ? "bg-[#2d72b8] text-white border-[#2d72b8]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredReviewQuestions.map((q) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.correctIndex;
              const isUnattempted = userAns === undefined;

              return (
                <div key={q.id} className="p-4 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-xs px-2.5 py-0.5 rounded bg-gray-200 text-gray-800">
                      Question {q.id} • {q.section}
                    </span>

                    {isUnattempted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded border border-gray-300">
                        <HelpCircle className="w-3.5 h-3.5" /> Not Attempted (0)
                      </span>
                    ) : isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded border border-green-300">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+1.00)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded border border-red-300">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect (-0.33)
                      </span>
                    )}
                  </div>

                  {/* Bilingual Question */}
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{q.qEn}</p>
                    <p className="text-sm text-gray-700">{q.qHi}</p>
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {[0, 1, 2, 3].map((optIdx) => {
                      const isThisCorrect = optIdx === q.correctIndex;
                      const isThisUserChoice = optIdx === userAns;

                      let boxStyle = "bg-gray-50 border-gray-200 text-gray-700";
                      if (isThisCorrect) {
                        boxStyle = "bg-green-50 border-green-500 text-green-900 font-semibold";
                      } else if (isThisUserChoice && !isThisCorrect) {
                        boxStyle = "bg-red-50 border-red-500 text-red-900 font-semibold";
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-2 rounded border text-xs flex items-center justify-between gap-2 ${boxStyle}`}
                        >
                          <span>
                            <strong>({optIdx + 1})</strong> {q.optionsEn[optIdx]} / {q.optionsHi[optIdx]}
                          </span>
                          {isThisCorrect && (
                            <span className="text-[10px] bg-green-600 text-white px-1.5 py-0.5 rounded shrink-0">
                              Correct Answer
                            </span>
                          )}
                          {isThisUserChoice && !isThisCorrect && (
                            <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded shrink-0">
                              Your Choice
                            </span>
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
      </main>
    </div>
  );
}
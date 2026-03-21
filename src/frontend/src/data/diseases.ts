export interface Disease {
  id: string;
  name: string;
  symptoms: string[];
  severity: "low" | "medium" | "high" | "critical";
  diet: string;
  precautions: string;
  description: string;
}

export const diseases: Disease[] = [
  {
    id: "d1",
    name: "Common Cold",
    symptoms: [
      "runny nose",
      "sore throat",
      "cough",
      "sneezing",
      "nasal congestion",
      "headache",
      "fatigue",
      "body aches",
    ],
    severity: "low",
    diet: "Warm fluids, chicken soup, honey-lemon tea, citrus fruits rich in Vitamin C",
    precautions:
      "Rest, stay hydrated, wash hands frequently, avoid close contact with others",
    description:
      "A viral infection of the upper respiratory tract caused by rhinoviruses.",
  },
  {
    id: "d2",
    name: "Influenza",
    symptoms: [
      "high fever",
      "body aches",
      "fatigue",
      "headache",
      "dry cough",
      "chills",
      "sore throat",
      "loss of appetite",
    ],
    severity: "medium",
    diet: "Clear broths, electrolyte drinks, easy-to-digest foods, plenty of fluids",
    precautions:
      "Annual flu vaccine, rest, antiviral medications if prescribed, isolation",
    description:
      "A contagious respiratory illness caused by influenza viruses affecting the nose, throat, and lungs.",
  },
  {
    id: "d3",
    name: "COVID-19",
    symptoms: [
      "fever",
      "dry cough",
      "fatigue",
      "loss of taste",
      "loss of smell",
      "shortness of breath",
      "body aches",
      "headache",
      "sore throat",
    ],
    severity: "high",
    diet: "Nutrient-dense foods, Vitamin C and D rich foods, hydration, protein-rich meals",
    precautions:
      "Vaccination, masking, social distancing, hand hygiene, isolation if positive",
    description:
      "A respiratory illness caused by the SARS-CoV-2 coronavirus with wide-ranging symptoms.",
  },
  {
    id: "d4",
    name: "Pneumonia",
    symptoms: [
      "high fever",
      "wet cough",
      "difficulty breathing",
      "chest pain",
      "chills",
      "fatigue",
      "confusion",
      "sweating",
    ],
    severity: "high",
    diet: "High-protein foods, zinc and antioxidant-rich foods, warm fluids",
    precautions:
      "Vaccination, antibiotics as prescribed, rest, breathing exercises",
    description:
      "Infection causing inflammation in air sacs of one or both lungs, which may fill with fluid.",
  },
  {
    id: "d5",
    name: "Bronchitis",
    symptoms: [
      "wet cough",
      "wheezing",
      "chest pain",
      "fatigue",
      "shortness of breath",
      "fever",
      "body aches",
    ],
    severity: "medium",
    diet: "Anti-inflammatory foods, warm liquids, honey, ginger tea",
    precautions:
      "Avoid smoking and irritants, use humidifier, rest, stay hydrated",
    description:
      "Inflammation of the bronchial tubes that carry air to and from lungs.",
  },
  {
    id: "d6",
    name: "Asthma",
    symptoms: [
      "wheezing",
      "shortness of breath",
      "dry cough",
      "chest pain",
      "difficulty breathing",
      "anxiety",
    ],
    severity: "medium",
    diet: "Anti-inflammatory diet, omega-3 fatty acids, avoid sulfite-containing foods",
    precautions:
      "Use inhalers, avoid triggers, monitor peak flow, keep rescue inhaler handy",
    description:
      "A condition where airways narrow and swell, producing extra mucus and causing breathing difficulty.",
  },
  {
    id: "d7",
    name: "COPD",
    symptoms: [
      "shortness of breath",
      "persistent cough",
      "wheezing",
      "chest pain",
      "fatigue",
      "weight loss",
      "frequent infections",
    ],
    severity: "high",
    diet: "Small frequent meals, high-calorie foods, omega-3 rich foods, avoid gas-producing foods",
    precautions:
      "Quit smoking, pulmonary rehabilitation, oxygen therapy, avoid air pollutants",
    description:
      "Chronic obstructive pulmonary disease - a chronic inflammatory lung disease causing obstructed airflow.",
  },
  {
    id: "d8",
    name: "Tuberculosis",
    symptoms: [
      "persistent cough",
      "coughing blood",
      "night sweats",
      "weight loss",
      "fever",
      "fatigue",
      "chest pain",
      "loss of appetite",
    ],
    severity: "critical",
    diet: "High-protein and calorie-dense foods, Vitamin D and zinc supplements",
    precautions:
      "Complete antibiotic course (6-9 months), isolation, BCG vaccination, regular check-ups",
    description:
      "A serious infectious disease caused by Mycobacterium tuberculosis primarily affecting the lungs.",
  },
  {
    id: "d9",
    name: "Malaria",
    symptoms: [
      "high fever",
      "chills",
      "sweating",
      "headache",
      "nausea",
      "vomiting",
      "fatigue",
      "body aches",
      "loss of appetite",
    ],
    severity: "critical",
    diet: "Easy-to-digest foods, iron-rich diet, fluids, avoid spicy or fatty foods",
    precautions:
      "Antimalarial medications, mosquito nets, repellents, eliminate standing water",
    description:
      "A life-threatening disease caused by Plasmodium parasites transmitted through mosquito bites.",
  },
  {
    id: "d10",
    name: "Dengue Fever",
    symptoms: [
      "high fever",
      "severe headache",
      "body aches",
      "rash",
      "nausea",
      "vomiting",
      "eye pain",
      "joint pain",
      "fatigue",
    ],
    severity: "critical",
    diet: "Papaya leaf juice, coconut water, high fluid intake, vitamin C foods",
    precautions:
      "Mosquito prevention, bed rest, monitor platelet count, avoid aspirin",
    description:
      "A mosquito-borne viral infection causing severe flu-like illness and sometimes deadly complications.",
  },
  {
    id: "d11",
    name: "Typhoid Fever",
    symptoms: [
      "high fever",
      "headache",
      "abdominal pain",
      "diarrhea",
      "constipation",
      "fatigue",
      "loss of appetite",
      "rash",
    ],
    severity: "high",
    diet: "Soft, easy-to-digest foods, high-calorie diet, avoid raw vegetables and fruits",
    precautions:
      "Typhoid vaccine, clean water, food hygiene, antibiotics as prescribed",
    description:
      "A bacterial infection caused by Salmonella typhi spread through contaminated food and water.",
  },
  {
    id: "d12",
    name: "Cholera",
    symptoms: [
      "diarrhea",
      "vomiting",
      "severe dehydration",
      "muscle cramps",
      "nausea",
      "rapid heart rate",
    ],
    severity: "critical",
    diet: "Oral rehydration solutions, rice water, avoid solid food initially, gradual reintroduction",
    precautions:
      "Safe water, proper sanitation, oral cholera vaccine, immediate rehydration",
    description:
      "A bacterial infection causing profuse watery diarrhea that can lead to severe dehydration.",
  },
  {
    id: "d13",
    name: "Hepatitis A",
    symptoms: [
      "jaundice",
      "fatigue",
      "nausea",
      "abdominal pain",
      "loss of appetite",
      "fever",
      "dark urine",
      "joint pain",
    ],
    severity: "medium",
    diet: "Low-fat, high-carbohydrate foods, avoid alcohol completely, small frequent meals",
    precautions: "Hepatitis A vaccine, good hand hygiene, safe food and water",
    description:
      "A highly contagious liver infection caused by Hepatitis A virus, usually spread through contaminated food.",
  },
  {
    id: "d14",
    name: "Hepatitis B",
    symptoms: [
      "yellow skin",
      "fatigue",
      "abdominal pain",
      "nausea",
      "vomiting",
      "joint pain",
      "dark urine",
      "loss of appetite",
    ],
    severity: "high",
    diet: "Avoid alcohol, eat well-balanced diet, limit salt and sugar",
    precautions:
      "Hepatitis B vaccine, safe sex, avoid sharing needles, regular monitoring",
    description:
      "A serious liver infection caused by Hepatitis B virus that can become chronic.",
  },
  {
    id: "d15",
    name: "Hepatitis C",
    symptoms: [
      "fatigue",
      "yellow skin",
      "abdominal pain",
      "nausea",
      "loss of appetite",
      "joint pain",
      "depression",
    ],
    severity: "high",
    diet: "Anti-inflammatory diet, avoid alcohol, stay hydrated, limit processed foods",
    precautions:
      "Avoid sharing needles, safe sex, antiviral treatment, regular liver monitoring",
    description:
      "A viral infection that causes liver inflammation, sometimes leading to serious liver damage.",
  },
  {
    id: "d16",
    name: "Liver Cirrhosis",
    symptoms: [
      "yellow skin",
      "abdominal pain",
      "swelling",
      "fatigue",
      "weight loss",
      "bleeding gums",
      "confusion",
      "loss of appetite",
    ],
    severity: "critical",
    diet: "Low sodium diet, adequate protein, avoid alcohol, small frequent meals",
    precautions:
      "Avoid alcohol and hepatotoxic drugs, treat underlying cause, regular monitoring",
    description:
      "Late-stage scarring of the liver caused by liver diseases and conditions like hepatitis and chronic alcoholism.",
  },
  {
    id: "d17",
    name: "Gastritis",
    symptoms: [
      "abdominal pain",
      "nausea",
      "vomiting",
      "bloating",
      "indigestion",
      "loss of appetite",
      "heartburn",
    ],
    severity: "medium",
    diet: "Bland foods, avoid spicy and fatty foods, small frequent meals, avoid alcohol",
    precautions:
      "Avoid NSAIDs, limit alcohol, manage stress, H. pylori treatment if needed",
    description:
      "Inflammation of the stomach lining, causing stomach pain, nausea, and vomiting.",
  },
  {
    id: "d18",
    name: "Peptic Ulcer",
    symptoms: [
      "abdominal pain",
      "heartburn",
      "nausea",
      "vomiting",
      "bloating",
      "loss of appetite",
      "weight loss",
    ],
    severity: "medium",
    diet: "Bland diet, avoid spicy/acidic foods, small meals, probiotic foods",
    precautions:
      "H. pylori eradication, avoid NSAIDs and alcohol, stress management",
    description:
      "Open sores that develop on the inner lining of the stomach and upper small intestine.",
  },
  {
    id: "d19",
    name: "GERD",
    symptoms: [
      "heartburn",
      "acid reflux",
      "chest pain",
      "difficulty swallowing",
      "hoarse voice",
      "nausea",
      "bloating",
    ],
    severity: "medium",
    diet: "Avoid trigger foods (spicy, fatty, citrus), eat smaller meals, no eating before bed",
    precautions:
      "Elevate head while sleeping, maintain healthy weight, avoid tight clothing",
    description:
      "Gastroesophageal reflux disease - chronic acid reflux causing esophageal irritation.",
  },
  {
    id: "d20",
    name: "Irritable Bowel Syndrome",
    symptoms: [
      "abdominal pain",
      "diarrhea",
      "constipation",
      "bloating",
      "gas",
      "stomach cramps",
      "mucus in stool",
    ],
    severity: "medium",
    diet: "Low-FODMAP diet, high fiber, avoid trigger foods, stay hydrated",
    precautions:
      "Stress management, regular exercise, identify and avoid triggers",
    description:
      "A common disorder affecting the large intestine causing cramping, abdominal pain, and altered bowel habits.",
  },
  {
    id: "d21",
    name: "Crohn's Disease",
    symptoms: [
      "diarrhea",
      "abdominal pain",
      "blood in stool",
      "weight loss",
      "fatigue",
      "fever",
      "mouth ulcers",
      "joint pain",
    ],
    severity: "high",
    diet: "Low-fiber diet during flares, high-calorie nutrition, vitamin supplements",
    precautions:
      "Medication adherence, avoid NSAIDs, quit smoking, regular colonoscopy",
    description:
      "A type of inflammatory bowel disease that causes inflammation in the digestive tract.",
  },
  {
    id: "d22",
    name: "Appendicitis",
    symptoms: [
      "severe abdominal pain",
      "nausea",
      "vomiting",
      "fever",
      "loss of appetite",
      "rigid abdomen",
    ],
    severity: "critical",
    diet: "Clear liquids post-surgery, gradual return to normal diet",
    precautions:
      "Seek immediate medical attention, surgical removal (appendectomy)",
    description:
      "Inflammation of the appendix requiring emergency surgical removal.",
  },
  {
    id: "d23",
    name: "Pancreatitis",
    symptoms: [
      "severe abdominal pain",
      "nausea",
      "vomiting",
      "fever",
      "rapid heart rate",
      "bloating",
      "weight loss",
    ],
    severity: "critical",
    diet: "Low-fat diet, small frequent meals, avoid alcohol completely, clear liquids initially",
    precautions:
      "Avoid alcohol, gallstone treatment, enzyme replacement therapy if needed",
    description: "Inflammation of the pancreas, which can be acute or chronic.",
  },
  {
    id: "d24",
    name: "Kidney Stones",
    symptoms: [
      "severe pain",
      "blood in urine",
      "painful urination",
      "nausea",
      "vomiting",
      "frequent urination",
      "fever",
    ],
    severity: "high",
    diet: "High fluid intake (2-3 liters/day), low oxalate diet, reduce salt and protein",
    precautions:
      "Stay hydrated, dietary modifications, medications to prevent recurrence",
    description:
      "Hard deposits made of minerals and salts that form inside the kidneys.",
  },
  {
    id: "d25",
    name: "Urinary Tract Infection",
    symptoms: [
      "painful urination",
      "frequent urination",
      "blood in urine",
      "pelvic pain",
      "fever",
      "nausea",
    ],
    severity: "medium",
    diet: "Plenty of water, cranberry juice, probiotics, vitamin C foods",
    precautions:
      "Stay hydrated, proper hygiene, complete antibiotic course, urinate after intercourse",
    description:
      "An infection in any part of the urinary system including kidneys, bladder, and urethra.",
  },
  {
    id: "d26",
    name: "Chronic Kidney Disease",
    symptoms: [
      "fatigue",
      "swelling",
      "frequent urination",
      "blood in urine",
      "nausea",
      "high blood pressure",
      "loss of appetite",
    ],
    severity: "critical",
    diet: "Low protein, low potassium, low phosphorus diet, fluid restriction if needed",
    precautions:
      "Control blood pressure and diabetes, avoid nephrotoxic drugs, dialysis if needed",
    description:
      "Gradual loss of kidney function over time affecting fluid balance and waste removal.",
  },
  {
    id: "d27",
    name: "Hypertension",
    symptoms: [
      "high blood pressure",
      "headache",
      "dizziness",
      "chest pain",
      "shortness of breath",
      "blurred vision",
      "pounding heart",
    ],
    severity: "high",
    diet: "DASH diet - low sodium, high potassium, fruits, vegetables, whole grains",
    precautions:
      "Regular monitoring, medication adherence, reduce salt, exercise regularly",
    description:
      "High blood pressure putting extra strain on blood vessels and heart.",
  },
  {
    id: "d28",
    name: "Heart Attack",
    symptoms: [
      "severe chest pain",
      "intense sweating with chest pain",
      "shortness of breath",
      "arm weakness",
      "nausea",
      "pounding heart",
      "dizziness",
    ],
    severity: "critical",
    diet: "Heart-healthy diet: low cholesterol, low saturated fat, high fiber, omega-3",
    precautions:
      "Immediate medical care, medications, cardiac rehabilitation, lifestyle changes",
    description:
      "Occurs when blood flow to the heart muscle is blocked, causing heart tissue damage.",
  },
  {
    id: "d29",
    name: "Angina",
    symptoms: [
      "chest pain",
      "shortness of breath",
      "pounding heart",
      "dizziness",
      "fatigue",
      "nausea",
    ],
    severity: "high",
    diet: "Heart-healthy diet, limit saturated fats, increase fiber and omega-3",
    precautions:
      "Nitroglycerin, avoid physical exertion triggers, treat underlying coronary disease",
    description:
      "Chest pain or pressure caused by reduced blood flow to the heart muscle.",
  },
  {
    id: "d30",
    name: "Heart Failure",
    symptoms: [
      "shortness of breath",
      "swelling",
      "fatigue",
      "irregular heartbeat",
      "cough",
      "weight gain",
      "loss of appetite",
    ],
    severity: "critical",
    diet: "Low sodium diet, fluid restriction, avoid alcohol, maintain healthy weight",
    precautions:
      "Medication adherence, daily weight monitoring, fluid restriction, cardiac rehab",
    description:
      "A chronic condition where the heart doesn't pump blood as well as it should.",
  },
  {
    id: "d31",
    name: "Atrial Fibrillation",
    symptoms: [
      "irregular heartbeat",
      "heart palpitations",
      "shortness of breath",
      "fatigue",
      "dizziness",
      "chest pain",
    ],
    severity: "high",
    diet: "Heart-healthy diet, limit alcohol and caffeine, maintain healthy weight",
    precautions:
      "Rate/rhythm control medications, anticoagulants, cardioversion if needed",
    description:
      "An irregular and often rapid heart rate that can increase risk of strokes and heart failure.",
  },
  {
    id: "d32",
    name: "Stroke",
    symptoms: [
      "sudden numbness",
      "facial drooping",
      "arm weakness",
      "slurred speech",
      "sudden vision loss",
      "severe headache",
      "loss of balance",
    ],
    severity: "critical",
    diet: "Mediterranean diet, low sodium, heart-healthy foods, adequate hydration",
    precautions:
      "Immediate medical care (FAST), blood thinners, physical therapy, control risk factors",
    description:
      "Occurs when blood supply to part of the brain is cut off, causing brain cell death.",
  },
  {
    id: "d33",
    name: "Iron Deficiency Anemia",
    symptoms: [
      "fatigue",
      "pale skin",
      "shortness of breath",
      "dizziness",
      "headache",
      "cold hands",
      "cold feet",
      "brittle nails",
    ],
    severity: "medium",
    diet: "Iron-rich foods: red meat, spinach, legumes, vitamin C to enhance absorption",
    precautions:
      "Iron supplements, treat underlying cause, regular blood tests",
    description:
      "Most common type of anemia where blood lacks adequate healthy red blood cells due to iron deficiency.",
  },
  {
    id: "d34",
    name: "Leukemia",
    symptoms: [
      "fatigue",
      "frequent infections",
      "swollen lymph nodes",
      "bruising",
      "bleeding gums",
      "fever",
      "weight loss",
      "bone pain",
    ],
    severity: "critical",
    diet: "High-calorie, high-protein foods, immune-boosting nutrients, avoid raw foods during treatment",
    precautions:
      "Chemotherapy, radiation, stem cell transplant, infection prevention",
    description:
      "Cancer of the blood-forming tissues including bone marrow and the lymphatic system.",
  },
  {
    id: "d35",
    name: "Lymphoma",
    symptoms: [
      "swollen lymph nodes",
      "fatigue",
      "fever",
      "night sweats",
      "weight loss",
      "itching",
      "shortness of breath",
    ],
    severity: "critical",
    diet: "High-protein, high-calorie diet during treatment, immune support nutrients",
    precautions: "Chemotherapy, immunotherapy, radiation, stem cell transplant",
    description:
      "Cancer that begins in infection-fighting cells of the immune system called lymphocytes.",
  },
  {
    id: "d36",
    name: "Type 1 Diabetes",
    symptoms: [
      "excessive thirst",
      "frequent urination",
      "weight loss",
      "fatigue",
      "blurred vision",
      "slow healing wounds",
      "loss of appetite",
    ],
    severity: "critical",
    diet: "Carbohydrate counting, consistent meal timing, low glycemic index foods",
    precautions:
      "Insulin therapy, blood sugar monitoring, foot care, regular eye exams",
    description:
      "An autoimmune disease where the pancreas produces little or no insulin.",
  },
  {
    id: "d37",
    name: "Type 2 Diabetes",
    symptoms: [
      "frequent urination",
      "excessive thirst",
      "fatigue",
      "blurred vision",
      "slow healing wounds",
      "weight gain",
      "frequent infections",
    ],
    severity: "high",
    diet: "Low glycemic diet, portion control, high fiber, reduce refined carbohydrates",
    precautions:
      "Blood sugar monitoring, oral medications or insulin, lifestyle changes, regular checkups",
    description:
      "A chronic condition affecting how the body metabolizes sugar, with insulin resistance.",
  },
  {
    id: "d38",
    name: "Hypothyroidism",
    symptoms: [
      "fatigue",
      "weight gain",
      "cold hands",
      "cold feet",
      "depression",
      "muscle weakness",
      "hair loss",
      "dry skin",
      "constipation",
      "memory loss",
    ],
    severity: "medium",
    diet: "Iodine-rich foods (seaweed, fish), selenium-rich foods, limit goitrogens",
    precautions: "Levothyroxine medication, regular thyroid function tests",
    description:
      "Underactive thyroid not producing enough hormones to meet the body needs.",
  },
  {
    id: "d39",
    name: "Hyperthyroidism",
    symptoms: [
      "weight loss",
      "rapid heart rate",
      "anxiety",
      "tremors",
      "sweating",
      "heat intolerance",
      "insomnia",
      "exophthalmos",
    ],
    severity: "high",
    diet: "Calcium and Vitamin D rich foods, avoid excessive iodine, low-iodine diet for RAI",
    precautions:
      "Antithyroid medications, radioactive iodine therapy, beta-blockers, thyroid surgery",
    description: "Overactive thyroid producing too much thyroxine hormone.",
  },
  {
    id: "d40",
    name: "PCOS",
    symptoms: [
      "irregular periods",
      "weight gain",
      "acne",
      "hair loss",
      "excessive sweating",
      "depression",
      "fatigue",
      "pelvic pain",
    ],
    severity: "medium",
    diet: "Low glycemic index foods, anti-inflammatory diet, high fiber, limit processed foods",
    precautions:
      "Weight management, hormonal therapy, regular gynecological checkups",
    description:
      "Polycystic ovary syndrome - hormonal disorder causing enlarged ovaries with small cysts.",
  },
  {
    id: "d41",
    name: "Migraine",
    symptoms: [
      "severe headache",
      "nausea",
      "vomiting",
      "sensitivity to light",
      "sensitivity to sound",
      "blurred vision",
      "dizziness",
      "fatigue",
    ],
    severity: "medium",
    diet: "Avoid trigger foods (alcohol, caffeine, aged cheeses), stay hydrated, regular meals",
    precautions:
      "Identify and avoid triggers, prophylactic medications, pain relief, rest in dark room",
    description:
      "A neurological condition causing severe recurring headaches often with nausea and light sensitivity.",
  },
  {
    id: "d42",
    name: "Epilepsy",
    symptoms: [
      "seizures",
      "loss of consciousness",
      "confusion",
      "tremors",
      "temporary confusion",
      "staring spell",
    ],
    severity: "critical",
    diet: "Ketogenic diet may help in some cases, adequate sleep, avoid alcohol",
    precautions:
      "Antiepileptic medications, avoid triggers, safety measures, regular neurology followup",
    description:
      "A neurological disorder characterized by unprovoked, recurrent seizures.",
  },
  {
    id: "d43",
    name: "Parkinson's Disease",
    symptoms: [
      "tremors",
      "muscle stiffness",
      "slow movement",
      "loss of balance",
      "involuntary movements",
      "depression",
      "memory loss",
      "difficulty swallowing",
    ],
    severity: "critical",
    diet: "High-fiber diet to prevent constipation, adequate hydration, antioxidant-rich foods",
    precautions:
      "Levodopa medications, physical therapy, fall prevention, deep brain stimulation",
    description:
      "A progressive nervous system disorder affecting movement with tremors and stiffness.",
  },
  {
    id: "d44",
    name: "Alzheimer's Disease",
    symptoms: [
      "memory loss",
      "confusion",
      "mood swings",
      "depression",
      "social withdrawal",
      "difficulty swallowing",
      "loss of balance",
    ],
    severity: "critical",
    diet: "Mediterranean diet, omega-3 fatty acids, antioxidants, vitamin E and C",
    precautions:
      "Cognitive stimulation, medications, caregiver support, safe environment",
    description:
      "A progressive neurological disorder causing brain cells to waste away and die.",
  },
  {
    id: "d45",
    name: "Multiple Sclerosis",
    symptoms: [
      "numbness",
      "tingling",
      "muscle weakness",
      "fatigue",
      "blurred vision",
      "tremors",
      "loss of balance",
      "muscle stiffness",
    ],
    severity: "critical",
    diet: "Anti-inflammatory diet, Vitamin D, omega-3, low saturated fat",
    precautions:
      "Disease-modifying therapies, physical therapy, symptom management",
    description:
      "A disease in which the immune system eats away at the protective covering of nerves.",
  },
  {
    id: "d46",
    name: "Rheumatoid Arthritis",
    symptoms: [
      "joint pain",
      "joint stiffness",
      "joint swelling",
      "fatigue",
      "fever",
      "weight loss",
      "muscle weakness",
    ],
    severity: "high",
    diet: "Anti-inflammatory diet, omega-3 fatty acids, turmeric, avoid nightshades",
    precautions:
      "DMARDs, NSAIDs, physical therapy, joint protection techniques",
    description:
      "An autoimmune disease causing painful inflammation and can eventually cause joint deformity.",
  },
  {
    id: "d47",
    name: "Osteoporosis",
    symptoms: [
      "bone pain",
      "back pain",
      "loss of height",
      "joint pain",
      "fatigue",
      "muscle weakness",
    ],
    severity: "high",
    diet: "Calcium and Vitamin D rich foods, adequate protein, limit alcohol and caffeine",
    precautions:
      "Weight-bearing exercise, bisphosphonates, fall prevention, bone density monitoring",
    description:
      "A bone disease where increased bone weakness increases the risk of a broken bone.",
  },
  {
    id: "d48",
    name: "Gout",
    symptoms: [
      "joint pain",
      "joint swelling",
      "joint stiffness",
      "fever",
      "rash",
      "fatigue",
    ],
    severity: "medium",
    diet: "Low-purine diet, avoid alcohol and organ meats, stay well hydrated",
    precautions:
      "Uric acid lowering medications, avoid purine-rich foods, joint rest during attack",
    description:
      "A form of inflammatory arthritis characterized by sudden severe attacks of pain in joints.",
  },
  {
    id: "d49",
    name: "Systemic Lupus Erythematosus",
    symptoms: [
      "malar rash",
      "joint pain",
      "fatigue",
      "fever",
      "hair loss",
      "discoid rash",
      "chest pain",
      "swollen lymph nodes",
    ],
    severity: "critical",
    diet: "Anti-inflammatory diet, Vitamin D, calcium, omega-3, avoid alfalfa sprouts",
    precautions:
      "Sun protection, immunosuppressants, monitor organ function, avoid triggers",
    description:
      "A systemic autoimmune disease where the immune system attacks healthy tissue.",
  },
  {
    id: "d50",
    name: "Psoriasis",
    symptoms: [
      "rash",
      "itching",
      "dry skin",
      "joint pain",
      "hair loss",
      "brittle nails",
      "swelling",
    ],
    severity: "medium",
    diet: "Anti-inflammatory diet, omega-3 fatty acids, avoid alcohol and processed foods",
    precautions:
      "Topical treatments, phototherapy, biologics, moisturize regularly",
    description:
      "A skin disease causing red, itchy scaly patches most commonly on knees, elbows, and trunk.",
  },
  {
    id: "d51",
    name: "Eczema",
    symptoms: ["itching", "rash", "dry skin", "swelling", "hives"],
    severity: "low",
    diet: "Anti-inflammatory diet, identify food triggers, probiotics, stay hydrated",
    precautions:
      "Moisturize frequently, avoid triggers, topical corticosteroids, gentle skincare",
    description:
      "A condition that makes skin red and itchy, often appearing in childhood.",
  },
  {
    id: "d52",
    name: "Allergic Rhinitis",
    symptoms: [
      "sneezing",
      "runny nose",
      "nasal congestion",
      "itching",
      "watery eyes",
      "fatigue",
      "headache",
    ],
    severity: "low",
    diet: "Quercetin-rich foods, local honey, omega-3, avoid known allergens",
    precautions:
      "Antihistamines, nasal corticosteroids, allergen avoidance, immunotherapy",
    description:
      "Inflammation of the inside of the nose caused by an allergen such as pollen or dust.",
  },
  {
    id: "d53",
    name: "Chickenpox",
    symptoms: [
      "rash",
      "itching",
      "fever",
      "fatigue",
      "loss of appetite",
      "headache",
      "body aches",
    ],
    severity: "low",
    diet: "Soft foods if mouth sores present, cold foods for comfort, adequate fluids",
    precautions:
      "Varicella vaccine, avoid scratching, calamine lotion, isolate from vulnerable people",
    description:
      "A highly contagious disease caused by varicella-zoster virus causing itchy blisters.",
  },
  {
    id: "d54",
    name: "Measles",
    symptoms: [
      "high fever",
      "rash",
      "runny nose",
      "cough",
      "red eyes",
      "sensitivity to light",
      "body aches",
    ],
    severity: "high",
    diet: "Vitamin A rich foods, adequate fluids, easy-to-eat foods",
    precautions: "MMR vaccine, isolation, vitamin A supplementation",
    description:
      "A highly contagious viral infection causing fever, rash, and potential serious complications.",
  },
  {
    id: "d55",
    name: "Mumps",
    symptoms: [
      "swelling",
      "fever",
      "headache",
      "fatigue",
      "muscle aches",
      "loss of appetite",
      "jaw pain",
    ],
    severity: "medium",
    diet: "Soft foods, avoid acidic foods, adequate fluids",
    precautions: "MMR vaccine, isolation, rest, pain management",
    description:
      "A viral infection primarily affecting the salivary glands causing swollen cheeks.",
  },
  {
    id: "d56",
    name: "Meningitis",
    symptoms: [
      "severe headache",
      "stiff neck",
      "high fever",
      "sensitivity to light",
      "nausea",
      "vomiting",
      "seizures",
      "petechiae",
    ],
    severity: "critical",
    diet: "Nutritious foods to support recovery, adequate hydration",
    precautions:
      "Meningococcal vaccine, immediate hospitalization, antibiotics for bacterial type",
    description:
      "Inflammation of membranes surrounding the brain and spinal cord, often due to infection.",
  },
  {
    id: "d57",
    name: "Encephalitis",
    symptoms: [
      "severe headache",
      "fever",
      "confusion",
      "seizures",
      "hallucinations",
      "loss of consciousness",
      "stiff neck",
    ],
    severity: "critical",
    diet: "High-nutrient foods, adequate hydration, tube feeding if required",
    precautions:
      "Hospitalization, antiviral or anti-inflammatory treatment, supportive care",
    description:
      "Inflammation of the brain usually caused by a viral infection.",
  },
  {
    id: "d58",
    name: "Major Depression",
    symptoms: [
      "depression",
      "fatigue",
      "insomnia",
      "excessive sleep",
      "loss of appetite",
      "weight loss",
      "memory loss",
      "social withdrawal",
    ],
    severity: "high",
    diet: "Omega-3 fatty acids, folate-rich foods, tryptophan-rich foods, vitamin D",
    precautions:
      "Antidepressants, psychotherapy, regular exercise, social support",
    description:
      "A mood disorder causing persistent feelings of sadness and loss of interest.",
  },
  {
    id: "d59",
    name: "Generalized Anxiety Disorder",
    symptoms: [
      "anxiety",
      "irritability",
      "insomnia",
      "fatigue",
      "muscle stiffness",
      "headache",
      "difficulty concentrating",
      "pounding heart",
    ],
    severity: "medium",
    diet: "Limit caffeine and alcohol, magnesium-rich foods, omega-3, balanced blood sugar",
    precautions:
      "Cognitive behavioral therapy, anxiolytics, mindfulness, regular exercise",
    description:
      "A mental health disorder characterized by persistent and excessive worry about various things.",
  },
  {
    id: "d60",
    name: "PTSD",
    symptoms: [
      "anxiety",
      "insomnia",
      "depression",
      "irritability",
      "hallucinations",
      "social withdrawal",
      "mood swings",
      "memory loss",
    ],
    severity: "high",
    diet: "Anti-inflammatory diet, omega-3, limit alcohol, regular meal patterns",
    precautions:
      "Trauma-focused therapy, EMDR, medications, strong support network",
    description:
      "Post-traumatic stress disorder - a mental health condition triggered by experiencing or witnessing a traumatic event.",
  },
  {
    id: "d61",
    name: "Schizophrenia",
    symptoms: [
      "hallucinations",
      "delusions",
      "confusion",
      "flat affect",
      "social withdrawal",
      "memory loss",
      "echolalia",
    ],
    severity: "critical",
    diet: "Balanced nutrition, omega-3, antioxidants, monitor for metabolic syndrome",
    precautions:
      "Antipsychotic medications, psychiatric care, community support, family education",
    description:
      "A serious mental disorder affecting how a person thinks, feels, and behaves.",
  },
  {
    id: "d62",
    name: "Bipolar Disorder",
    symptoms: [
      "mood swings",
      "depression",
      "insomnia",
      "irritability",
      "hyperactivity",
      "impulsive behavior",
      "hallucinations",
    ],
    severity: "high",
    diet: "Regular meal schedule, omega-3, avoid alcohol, adequate sleep support",
    precautions:
      "Mood stabilizers, antipsychotics, psychotherapy, regular monitoring",
    description:
      "A mental health condition causing extreme mood swings including emotional highs and lows.",
  },
  {
    id: "d63",
    name: "Anorexia Nervosa",
    symptoms: [
      "weight loss",
      "fatigue",
      "hair loss",
      "cold hands",
      "cold feet",
      "brittle nails",
      "irregular periods",
      "depression",
    ],
    severity: "critical",
    diet: "Supervised nutritional rehabilitation, calorie-dense nutrient-rich foods, oral supplements",
    precautions:
      "Inpatient/outpatient eating disorder program, therapy, medical monitoring",
    description:
      "An eating disorder characterized by an abnormally low body weight, fear of gaining weight.",
  },
  {
    id: "d64",
    name: "Obesity",
    symptoms: [
      "weight gain",
      "fatigue",
      "shortness of breath",
      "joint pain",
      "back pain",
      "high blood pressure",
      "excessive sweating",
    ],
    severity: "high",
    diet: "Calorie deficit, high fiber, lean proteins, limit processed foods and sugar",
    precautions:
      "Lifestyle modification, behavioral therapy, medications, bariatric surgery if indicated",
    description:
      "Excessive body fat accumulation that presents a risk to health.",
  },
  {
    id: "d65",
    name: "Vitamin D Deficiency",
    symptoms: [
      "fatigue",
      "bone pain",
      "muscle weakness",
      "depression",
      "frequent infections",
      "hair loss",
      "back pain",
    ],
    severity: "medium",
    diet: "Fatty fish, egg yolks, fortified foods, sunlight exposure, Vitamin D supplements",
    precautions: "Regular blood tests, supplementation, adequate sun exposure",
    description:
      "Insufficient vitamin D in the body leading to bone weakness and other health issues.",
  },
  {
    id: "d66",
    name: "Celiac Disease",
    symptoms: [
      "diarrhea",
      "bloating",
      "abdominal pain",
      "fatigue",
      "weight loss",
      "constipation",
      "rash",
      "joint pain",
    ],
    severity: "high",
    diet: "Strict gluten-free diet, nutrient supplementation for deficiencies",
    precautions:
      "Lifelong gluten avoidance, read food labels, avoid cross-contamination",
    description:
      "An immune reaction to eating gluten causing damage to the small intestine.",
  },
  {
    id: "d67",
    name: "Hypoglycemia",
    symptoms: [
      "dizziness",
      "confusion",
      "sweating",
      "tremors",
      "pounding heart",
      "fatigue",
      "headache",
      "blurred vision",
    ],
    severity: "high",
    diet: "Regular small meals, complex carbohydrates, avoid long fasting periods",
    precautions:
      "Regular glucose monitoring, fast-acting sugar for emergencies, adjust diabetes medications",
    description:
      "Abnormally low blood sugar levels causing neurological and autonomic symptoms.",
  },
  {
    id: "d68",
    name: "Deep Vein Thrombosis",
    symptoms: [
      "swelling",
      "limb swelling with pain",
      "leg cramps",
      "redness",
      "warmth in affected area",
      "fatigue",
    ],
    severity: "critical",
    diet: "Anti-inflammatory foods, stay hydrated, vitamin K consistency for those on warfarin",
    precautions:
      "Anticoagulants, compression stockings, regular movement, avoid prolonged immobility",
    description:
      "A blood clot that forms in a vein deep inside the body, usually in the legs.",
  },
  {
    id: "d69",
    name: "Pulmonary Embolism",
    symptoms: [
      "shortness of breath",
      "chest pain",
      "rapid heart rate",
      "coughing blood",
      "dizziness",
      "sweating",
      "limb swelling with pain",
    ],
    severity: "critical",
    diet: "Heart-healthy diet, adequate hydration, consistent vitamin K if on warfarin",
    precautions:
      "Immediate hospitalization, anticoagulants, thrombolytics in severe cases",
    description:
      "A blockage in one of the pulmonary arteries in the lungs, usually caused by blood clots.",
  },
  {
    id: "d70",
    name: "Sepsis",
    symptoms: [
      "high fever",
      "rapid heart rate",
      "difficulty breathing",
      "confusion",
      "extreme fatigue",
      "pale and clammy skin",
      "septic shock",
    ],
    severity: "critical",
    diet: "High-protein nutritional support, adequate calories, electrolyte replacement",
    precautions:
      "Immediate hospitalization, IV antibiotics, fluid resuscitation, organ support",
    description:
      "A life-threatening medical emergency triggered by the body response to an infection.",
  },
  {
    id: "d71",
    name: "Hyponatremia",
    symptoms: [
      "nausea",
      "headache",
      "confusion",
      "fatigue",
      "muscle cramps",
      "seizures",
      "loss of consciousness",
    ],
    severity: "critical",
    diet: "Moderate fluid intake, adequate sodium in diet, electrolyte monitoring",
    precautions:
      "IV sodium correction, treat underlying cause, fluid restriction in chronic cases",
    description:
      "Abnormally low sodium levels in blood, disrupting water balance in cells.",
  },
  {
    id: "d72",
    name: "Sleep Apnea",
    symptoms: [
      "snoring",
      "excessive sleep",
      "fatigue",
      "morning headache",
      "insomnia",
      "irritability",
      "difficulty concentrating",
      "high blood pressure",
    ],
    severity: "medium",
    diet: "Weight management diet, avoid alcohol especially before bed",
    precautions:
      "CPAP therapy, weight loss, sleep positioning, avoid sedatives",
    description:
      "A potentially serious sleep disorder where breathing repeatedly stops and starts during sleep.",
  },
  {
    id: "d73",
    name: "Thyroid Nodules",
    symptoms: [
      "goiter",
      "difficulty swallowing",
      "hoarse voice",
      "neck pain",
      "fatigue",
      "tremors",
    ],
    severity: "medium",
    diet: "Adequate iodine, selenium-rich foods, avoid excessive goitrogens",
    precautions:
      "Regular thyroid ultrasound, fine needle aspiration if indicated, medication or surgery",
    description:
      "Unusual growths or lumps in the thyroid gland that may or may not produce hormones.",
  },
  {
    id: "d74",
    name: "Cushing's Syndrome",
    symptoms: [
      "weight gain",
      "moon face",
      "buffalo hump",
      "high blood pressure",
      "acne",
      "muscle weakness",
      "depression",
      "bruising",
    ],
    severity: "high",
    diet: "Low sugar, low sodium, high calcium, vitamin D, protein-rich diet",
    precautions:
      "Reduce corticosteroids if medication-induced, surgery for tumors, monitoring",
    description:
      "Occurs when the body is exposed to high levels of cortisol for too long.",
  },
  {
    id: "d75",
    name: "Systemic Sclerosis",
    symptoms: [
      "dry skin",
      "joint pain",
      "muscle weakness",
      "difficulty swallowing",
      "shortness of breath",
      "cold hands",
      "rash",
      "fatigue",
    ],
    severity: "critical",
    diet: "Small frequent meals, soft foods if esophageal involvement, nutrient-dense foods",
    precautions:
      "Immunosuppressants, physical therapy, monitor lung and heart function",
    description:
      "A group of rare diseases that involve hardening and tightening of the skin and connective tissues.",
  },
];

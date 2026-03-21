export interface Disease {
  id: string;
  name: string;
  symptoms: string[];
  severity: "low" | "medium" | "high" | "critical";
  diet: string;
  precautions: string;
  description: string;
  medicines: string;
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
    medicines: "Paracetamol, Cetirizine, Pseudoephedrine, Dextromethorphan",
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
    medicines: "Oseltamivir (Tamiflu), Paracetamol, Ibuprofen, Zanamivir",
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
    medicines:
      "Paracetamol, Ibuprofen, Nirmatrelvir/Ritonavir (Paxlovid), Vitamin C & D supplements",
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
    medicines: "Amoxicillin, Azithromycin, Levofloxacin, Paracetamol",
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
    medicines: "Dextromethorphan, Guaifenesin, Salbutamol inhaler, Ibuprofen",
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
    medicines:
      "Salbutamol (rescue inhaler), Budesonide (inhaled steroid), Montelukast, Ipratropium",
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
    medicines: "Tiotropium, Salmeterol, Budesonide/Formoterol, Roflumilast",
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
    medicines: "Isoniazid, Rifampicin, Pyrazinamide, Ethambutol",
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
    medicines: "Chloroquine, Artemether-Lumefantrine, Quinine, Primaquine",
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
    medicines:
      "Paracetamol, IV fluids (hospital), Platelet transfusion if needed",
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
    medicines: "Ciprofloxacin, Azithromycin, Ceftriaxone, Paracetamol",
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
    medicines:
      "ORS (Oral Rehydration Salts), Doxycycline, Azithromycin, IV fluids",
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
    medicines: "Paracetamol (low dose), Antiemetics, Vitamin K if needed",
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
    medicines: "Tenofovir, Entecavir, Interferon alfa, Lamivudine",
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
    medicines: "Sofosbuvir, Ledipasvir, Ribavirin, Glecaprevir/Pibrentasvir",
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
    medicines:
      "Spironolactone, Furosemide, Lactulose, Propranolol (for varices)",
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
    medicines:
      "Omeprazole, Antacids (Aluminium hydroxide), Domperidone, Amoxicillin (if H. pylori)",
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
    medicines:
      "Omeprazole, Pantoprazole, Sucralfate, Amoxicillin + Clarithromycin (H. pylori)",
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
    medicines: "Omeprazole, Ranitidine, Antacids, Metoclopramide",
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
    medicines:
      "Mebeverine, Loperamide (for diarrhea), Lactulose (for constipation), Peppermint oil capsules",
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
    medicines: "Mesalazine, Azathioprine, Prednisolone, Infliximab (biologic)",
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
    medicines:
      "IV Antibiotics (Cefazolin + Metronidazole), Paracetamol, Morphine (hospital)",
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
    medicines:
      "IV fluids, Morphine, Pancreatic enzyme supplements, Proton pump inhibitors",
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
    medicines:
      "Ibuprofen, Tamsulosin (alpha blocker), Potassium citrate, Allopurinol",
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
    medicines:
      "Nitrofurantoin, Trimethoprim, Ciprofloxacin, Phenazopyridine (pain relief)",
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
    medicines: "Amlodipine, Erythropoietin, Phosphate binders, Furosemide",
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
    medicines: "Amlodipine, Ramipril, Losartan, Hydrochlorothiazide",
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
    medicines: "Aspirin, Nitroglycerin, Clopidogrel, Atorvastatin",
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
    medicines:
      "Nitroglycerin, Aspirin, Beta-blockers (Atenolol), Isosorbide mononitrate",
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
    medicines: "Furosemide, Spironolactone, Sacubitril/Valsartan, Carvedilol",
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
    medicines: "Warfarin, Apixaban, Digoxin, Amiodarone",
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
    medicines: "Aspirin, Alteplase (tPA), Clopidogrel, Atorvastatin",
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
    medicines:
      "Ferrous sulfate, Ferric carboxymaltose (IV), Folic acid, Vitamin C",
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
    medicines: "Imatinib, Cytarabine, Daunorubicin, G-CSF (Filgrastim)",
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
    medicines:
      "Rituximab, CHOP regimen (Cyclophosphamide, Doxorubicin, Vincristine, Prednisone)",
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
    medicines:
      "Insulin (Glargine, Lispro), Metformin (adjunct), Glucagon (emergency)",
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
    medicines: "Metformin, Sitagliptin, Empagliflozin, Glipizide",
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
    medicines: "Levothyroxine (T4), Liothyronine (T3), Selenium supplements",
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
    medicines:
      "Carbimazole, Propylthiouracil, Propranolol, Radioactive iodine (I-131)",
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
    medicines:
      "Metformin, Clomiphene, Combined oral contraceptives, Spironolactone",
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
    medicines:
      "Sumatriptan, Ibuprofen, Topiramate (prevention), Propranolol (prevention)",
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
    medicines: "Levetiracetam, Valproate, Carbamazepine, Lamotrigine",
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
    medicines: "Levodopa/Carbidopa, Pramipexole, Entacapone, Selegiline",
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
    medicines: "Donepezil, Memantine, Rivastigmine, Galantamine",
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
    medicines:
      "Interferon beta, Glatiramer acetate, Natalizumab, Dimethyl fumarate",
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
    medicines: "Methotrexate, Hydroxychloroquine, Adalimumab, Ibuprofen",
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
    medicines: "Alendronate, Calcium supplements, Vitamin D, Denosumab",
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
    medicines: "Colchicine, Allopurinol, Indomethacin, Febuxostat",
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
    medicines: "Hydroxychloroquine, Prednisolone, Mycophenolate, Belimumab",
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
    medicines:
      "Topical corticosteroids, Methotrexate, Adalimumab (biologic), Calcipotriol cream",
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
    medicines:
      "Hydrocortisone cream, Cetirizine, Tacrolimus ointment, Emollient creams",
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
    medicines: "Cetirizine, Loratadine, Fluticasone nasal spray, Montelukast",
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
    medicines:
      "Calamine lotion, Paracetamol, Acyclovir (for severe cases), Cetirizine",
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
    medicines: "Vitamin A supplements, Paracetamol, Ribavirin (severe cases)",
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
    medicines: "Paracetamol, Ibuprofen, Ice packs (symptomatic relief)",
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
    medicines: "IV Ceftriaxone, Dexamethasone, Penicillin G, Acyclovir (viral)",
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
    medicines: "Acyclovir (IV), Ganciclovir, Dexamethasone, Levetiracetam",
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
    medicines: "Sertraline, Escitalopram, Fluoxetine, Mirtazapine",
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
    medicines: "Sertraline, Buspirone, Diazepam (short-term), Venlafaxine",
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
    medicines: "Sertraline, Paroxetine, Prazosin (nightmares), Venlafaxine",
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
    medicines: "Risperidone, Olanzapine, Clozapine, Haloperidol",
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
    medicines: "Lithium, Valproate, Quetiapine, Lamotrigine",
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
    medicines:
      "Olanzapine, Multivitamins, SSRIs (for co-occurring depression), Nutritional supplements",
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
    medicines:
      "Orlistat, Phentermine-topiramate, Semaglutide (Ozempic), Metformin",
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
    medicines:
      "Vitamin D3 (Cholecalciferol), Calcium carbonate, Calcitriol (severe deficiency)",
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
    medicines:
      "Iron supplements, Folic acid, Vitamin B12, Calcium + Vitamin D (deficiency correction)",
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
    medicines:
      "Glucose tablets, Glucagon injection (emergency), Dextrose IV (hospital), Diazoxide",
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
    medicines: "Rivaroxaban, Warfarin, Heparin, Enoxaparin",
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
    medicines: "Alteplase (tPA), Heparin IV, Rivaroxaban, Warfarin",
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
    medicines:
      "IV Broad-spectrum antibiotics (Piperacillin-Tazobactam), Norepinephrine, IV fluids, Hydrocortisone",
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
    medicines:
      "IV Normal saline (3% NaCl), Tolvaptan, Demeclocycline, Fluid restriction",
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
    medicines:
      "CPAP device, Modafinil (daytime sleepiness), Acetazolamide, Uvulopalatopharyngoplasty (surgical)",
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
    medicines:
      "Levothyroxine (suppression therapy), Radioactive iodine (if toxic), Ethanol ablation",
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
    medicines: "Metyrapone, Ketoconazole, Mifepristone, Pasireotide",
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
    medicines:
      "Methotrexate, Mycophenolate mofetil, Nifedipine (Raynaud's), Sildenafil (pulmonary hypertension)",
  },

  // ===== STOMACH DISEASES (d76-d80) =====
  {
    id: "d76",
    name: "Gastric (Stomach) Cancer",
    symptoms: [
      "epigastric pain",
      "nausea",
      "vomiting",
      "weight loss",
      "early satiety",
      "black tarry stools",
      "fatigue",
      "loss of appetite",
    ],
    severity: "critical",
    diet: "Eat small, frequent meals rich in fruits, vegetables, and whole grains. Avoid smoked, pickled, and processed foods high in salt which increase cancer risk. Include antioxidant-rich foods like berries, green tea, and cruciferous vegetables to support immune function.",
    precautions:
      "Avoid smoking and alcohol, treat H. pylori infection, regular endoscopy if high risk, avoid NSAIDs",
    description:
      "A malignant tumor of the stomach lining, often diagnosed late due to vague early symptoms.",
    medicines:
      "Fluorouracil (5-FU), Cisplatin, Trastuzumab (HER2+), Ramucirumab, Oxaliplatin",
  },
  {
    id: "d77",
    name: "Gastroparesis",
    symptoms: [
      "nausea",
      "vomiting",
      "early satiety",
      "bloating",
      "regurgitation",
      "weight loss",
      "fatigue",
      "epigastric pain",
    ],
    severity: "medium",
    diet: "Eat small, frequent meals 6 times per day and chew food thoroughly. Choose low-fat, low-fiber foods that empty quickly from the stomach such as mashed potatoes, eggs, and cooked vegetables. Avoid carbonated drinks, high-fat dairy, and raw vegetables that slow gastric emptying.",
    precautions:
      "Avoid high-fat and high-fiber foods, stay upright after eating, manage blood sugar in diabetics",
    description:
      "A condition where the stomach cannot empty itself of food normally, causing delayed gastric emptying.",
    medicines:
      "Metoclopramide, Domperidone, Erythromycin, Ondansetron, Pantoprazole",
  },
  {
    id: "d78",
    name: "Ulcerative Colitis",
    symptoms: [
      "blood in stool",
      "diarrhea",
      "abdominal pain",
      "cramping",
      "rectal bleeding",
      "tenesmus",
      "fatigue",
      "weight loss",
    ],
    severity: "high",
    diet: "During flares, eat a low-residue diet with refined grains, cooked vegetables, and lean proteins to reduce bowel irritation. Avoid raw vegetables, seeds, nuts, and high-fiber foods that exacerbate symptoms. Probiotic-rich foods like yogurt and kefir may help restore gut flora during remission.",
    precautions:
      "Take medications as prescribed, avoid NSAIDs, regular colonoscopy, manage stress",
    description:
      "A chronic inflammatory bowel disease causing long-lasting inflammation and ulcers in the digestive tract, primarily the colon.",
    medicines: "Mesalamine, Prednisone, Azathioprine, Infliximab, Vedolizumab",
  },
  {
    id: "d79",
    name: "H. pylori Infection",
    symptoms: [
      "epigastric pain",
      "nausea",
      "bloating",
      "burping",
      "loss of appetite",
      "vomiting",
      "dark stools",
      "fatigue",
    ],
    severity: "medium",
    diet: "Eat probiotic-rich foods like yogurt, kefir, and fermented vegetables to support gut health during antibiotic treatment. Include broccoli sprouts, manuka honey, and green tea which have natural H. pylori inhibiting properties. Avoid alcohol, spicy foods, and caffeine that irritate the stomach lining.",
    precautions:
      "Complete full antibiotic course, avoid NSAIDs, wash hands frequently, avoid contaminated food/water",
    description:
      "A bacterial infection of the stomach lining that can cause gastritis, peptic ulcers, and increase risk of stomach cancer.",
    medicines:
      "Amoxicillin, Clarithromycin, Metronidazole, Omeprazole, Bismuth subsalicylate",
  },
  {
    id: "d80",
    name: "Stomach Polyps",
    symptoms: [
      "nausea",
      "abdominal pain",
      "vomiting",
      "blood in stool",
      "early satiety",
      "loss of appetite",
    ],
    severity: "low",
    diet: "Maintain a diet rich in fruits, vegetables, and fiber to promote healthy digestive function. Limit alcohol, processed meats, and foods high in saturated fat. Include folate-rich foods like leafy greens and legumes which may reduce polyp risk.",
    precautions:
      "Regular endoscopic surveillance, H. pylori treatment if present, avoid PPIs long-term",
    description:
      "Abnormal tissue growths that form on the lining of the stomach; most are benign but some types may develop into cancer.",
    medicines:
      "Omeprazole (reduce fundic polyps), H. pylori eradication therapy, aspirin (investigational)",
  },

  // ===== CANCER TYPES (d81-d91) =====
  {
    id: "d81",
    name: "Breast Cancer",
    symptoms: [
      "lump in breast",
      "nipple discharge",
      "breast pain",
      "skin changes",
      "swollen lymph nodes",
      "fatigue",
      "weight loss",
    ],
    severity: "critical",
    diet: "Adopt a Mediterranean-style diet rich in olive oil, fish, whole grains, and colorful vegetables to reduce inflammation and cancer recurrence risk. Limit alcohol consumption to less than one drink per day and avoid processed meats and saturated fats. Include cruciferous vegetables, soy in moderate amounts, and flaxseed for their cancer-protective phytoestrogens and fiber.",
    precautions:
      "Regular mammograms, breast self-exams, maintain healthy weight, limit alcohol, avoid hormone therapy if possible",
    description:
      "A cancer that forms in the cells of the breasts, the most common cancer in women worldwide.",
    medicines:
      "Tamoxifen, Letrozole, Trastuzumab (Herceptin), Paclitaxel, Doxorubicin",
  },
  {
    id: "d82",
    name: "Lung Cancer",
    symptoms: [
      "persistent cough",
      "coughing blood",
      "chest pain",
      "shortness of breath",
      "hoarse voice",
      "weight loss",
      "fatigue",
      "wheezing",
    ],
    severity: "critical",
    diet: "Eat antioxidant-rich foods including leafy greens, berries, and orange-colored vegetables to combat oxidative stress from smoking and chemotherapy. Maintain adequate protein intake through lean meats, legumes, and dairy to preserve muscle mass during treatment. Avoid alcohol and tobacco entirely, and include ginger tea and peppermint to manage nausea during chemotherapy.",
    precautions:
      "Stop smoking immediately, avoid secondhand smoke and radon, lung cancer screening if high risk",
    description:
      "A cancer that begins in the lungs, the leading cause of cancer death worldwide, strongly associated with smoking.",
    medicines: "Erlotinib, Crizotinib, Pembrolizumab, Carboplatin, Docetaxel",
  },
  {
    id: "d83",
    name: "Colorectal Cancer",
    symptoms: [
      "blood in stool",
      "rectal bleeding",
      "abdominal pain",
      "change in bowel habits",
      "weight loss",
      "fatigue",
      "tenesmus",
      "bloating",
    ],
    severity: "critical",
    diet: "High fiber diet with whole grains, fresh vegetables, and legumes reduces colorectal cancer risk and supports recovery. Avoid processed meats and red meat consumption to under 3 servings per week. Include omega-3 rich foods like salmon and walnuts, and consume calcium-rich dairy foods which have been shown to reduce recurrence risk.",
    precautions:
      "Regular colonoscopy after age 45, avoid processed meats, maintain healthy weight, regular exercise",
    description:
      "Cancer of the colon or rectum, the third most common cancer globally, often developing from polyps.",
    medicines:
      "Fluorouracil (5-FU), Oxaliplatin, Bevacizumab, Cetuximab, Irinotecan",
  },
  {
    id: "d84",
    name: "Prostate Cancer",
    symptoms: [
      "frequent urination",
      "difficulty urinating",
      "blood in urine",
      "pelvic pain",
      "bone pain",
      "fatigue",
      "erectile dysfunction",
    ],
    severity: "high",
    diet: "Adopt a low-fat diet rich in lycopene from cooked tomatoes, watermelon, and pink grapefruit which may slow prostate cancer progression. Eat fatty fish like salmon and sardines for omega-3 fatty acids that reduce inflammation. Limit red meat, full-fat dairy, and alcohol, and include green tea, pomegranate juice, and soy foods with evidence of prostate-protective effects.",
    precautions:
      "Regular PSA screening after age 50, avoid high-fat diet, maintain healthy weight",
    description:
      "A cancer occurring in the prostate gland, one of the most common cancers in men, often slow-growing.",
    medicines: "Leuprolide, Enzalutamide, Abiraterone, Docetaxel, Bicalutamide",
  },
  {
    id: "d85",
    name: "Melanoma (Skin Cancer)",
    symptoms: [
      "changes in moles",
      "new skin lesion",
      "irregular skin growth",
      "skin ulceration",
      "itching",
      "swollen lymph nodes",
    ],
    severity: "critical",
    diet: "Eat foods rich in antioxidants including vitamins C and E, selenium, and beta-carotene from colorful fruits and vegetables to protect skin cells from damage. Include omega-3 fatty acids from fish, walnuts, and flaxseed to reduce inflammation. Maintain adequate vitamin D levels through dietary sources while limiting direct UV exposure.",
    precautions:
      "Use SPF 30+ sunscreen daily, avoid tanning beds, regular skin checks, protective clothing",
    description:
      "The most serious type of skin cancer, developing in the cells that give skin its color.",
    medicines: "Pembrolizumab, Nivolumab, Vemurafenib, Dabrafenib, Ipilimumab",
  },
  {
    id: "d86",
    name: "Pancreatic Cancer",
    symptoms: [
      "upper abdominal severe pain radiating to back",
      "jaundice",
      "weight loss",
      "loss of appetite",
      "fatigue",
      "dark urine",
      "clay-colored stools",
      "nausea",
    ],
    severity: "critical",
    diet: "Eat small, frequent meals that are low in fat to ease digestive burden as the pancreas produces fewer enzymes. Include easily digestible foods like cooked vegetables, white fish, and lean poultry, and avoid fried, fatty, or heavy meals. Enzyme replacement supplements may be needed, and focus on high-calorie, nutrient-dense foods to combat significant weight loss.",
    precautions:
      "Avoid smoking, limit alcohol, manage diabetes, regular monitoring if family history exists",
    description:
      "A highly aggressive cancer of the pancreas that is difficult to detect early and has a poor prognosis.",
    medicines:
      "Gemcitabine, Nab-paclitaxel, Erlotinib, FOLFIRINOX regimen, Pancreatic enzyme replacement",
  },
  {
    id: "d87",
    name: "Cervical Cancer",
    symptoms: [
      "abnormal vaginal bleeding",
      "pelvic pain",
      "painful intercourse",
      "unusual vaginal discharge",
      "lower back pain",
      "fatigue",
    ],
    severity: "critical",
    diet: "Consume foods rich in folate, vitamins C and E, and carotenoids from leafy greens, citrus fruits, and colorful vegetables to support immune function and cervical cell health. Maintain adequate protein through legumes and lean meats to support recovery during treatment. Avoid smoking and alcohol which are associated with progression of cervical lesions.",
    precautions:
      "HPV vaccination, regular Pap smears, avoid smoking, practice safe sex",
    description:
      "A cancer of the cervix caused primarily by persistent infection with high-risk strains of HPV.",
    medicines:
      "Cisplatin, Paclitaxel, Bevacizumab, Fluorouracil, Pembrolizumab",
  },
  {
    id: "d88",
    name: "Ovarian Cancer",
    symptoms: [
      "bloating",
      "abdominal pain",
      "pelvic pain",
      "early satiety",
      "frequent urination",
      "weight loss",
      "fatigue",
      "constipation",
    ],
    severity: "critical",
    diet: "Eat a diet rich in vegetables, fruits, and whole grains with limited red meat and high-fat dairy to support treatment outcomes. Include omega-3 rich foods like fatty fish and flaxseed for anti-inflammatory benefits during chemotherapy. Maintain adequate hydration and small frequent meals to manage nausea, and focus on protein-rich foods to preserve muscle mass.",
    precautions:
      "Know family history, genetic testing for BRCA mutations, report persistent abdominal symptoms",
    description:
      "Cancer arising from ovarian cells, often called the silent killer due to vague early symptoms and late diagnosis.",
    medicines: "Carboplatin, Paclitaxel, Bevacizumab, Olaparib, Doxorubicin",
  },
  {
    id: "d89",
    name: "Bladder Cancer",
    symptoms: [
      "blood in urine",
      "painful urination",
      "frequent urination",
      "pelvic pain",
      "lower back pain",
      "fatigue",
    ],
    severity: "high",
    diet: "Drink plenty of water, at least 8-10 glasses daily, to dilute carcinogens in urine and reduce bladder wall exposure time. Eat a diet rich in fruits and vegetables, particularly cruciferous vegetables like broccoli and Brussels sprouts with cancer-protective compounds. Avoid processed meats, fried foods, and limit alcohol consumption.",
    precautions:
      "Stop smoking, avoid workplace chemical exposure, stay well hydrated, report blood in urine immediately",
    description:
      "Cancer that begins in the cells lining the bladder, strongly linked to smoking and chemical exposures.",
    medicines:
      "BCG therapy, Mitomycin C, Cisplatin, Gemcitabine, Pembrolizumab",
  },
  {
    id: "d90",
    name: "Liver Cancer (Hepatocellular Carcinoma)",
    symptoms: [
      "right upper quadrant pain",
      "jaundice",
      "weight loss",
      "fatigue",
      "swollen abdomen",
      "loss of appetite",
      "dark urine",
      "nausea",
    ],
    severity: "critical",
    diet: "Follow a low-sodium, low-fat diet with emphasis on complex carbohydrates from whole grains and fruits to reduce liver workload. Avoid alcohol entirely as it accelerates liver damage and cancer progression. Include antioxidant-rich foods, green leafy vegetables, and adequate protein from easily digestible sources like eggs and fish.",
    precautions:
      "Treat hepatitis B/C, avoid alcohol, maintain healthy weight, regular liver imaging if cirrhosis present",
    description:
      "The most common type of primary liver cancer, often developing in people with chronic liver disease or cirrhosis.",
    medicines:
      "Sorafenib, Lenvatinib, Atezolizumab, Bevacizumab, Transarterial chemoembolization",
  },
  {
    id: "d91",
    name: "Oral Cancer",
    symptoms: [
      "mouth sore",
      "difficulty swallowing",
      "difficulty chewing",
      "loose teeth",
      "lump in jaw",
      "hoarse voice",
      "ear pain",
      "weight loss",
    ],
    severity: "critical",
    diet: "Eat soft, easily swallowed foods like smoothies, yogurt, pureed vegetables, and soups to accommodate difficulty eating during treatment. Focus on high-protein and high-calorie foods to prevent malnutrition from reduced oral intake. Avoid alcohol, tobacco, and spicy, acidic, or hard foods that irritate oral tissues and slow healing.",
    precautions:
      "Avoid tobacco and alcohol, HPV vaccination, regular dental exams, oral self-examination monthly",
    description:
      "Cancer affecting the lips, tongue, cheeks, floor of the mouth, hard palate, and throat.",
    medicines: "Cisplatin, Fluorouracil, Cetuximab, Docetaxel, Pembrolizumab",
  },

  // ===== BRAIN TUMORS (d92-d96) =====
  {
    id: "d92",
    name: "Glioblastoma Multiforme",
    symptoms: [
      "headache",
      "seizures",
      "personality changes",
      "memory loss",
      "vision problems",
      "weakness",
      "nausea",
      "intracranial pressure signs",
    ],
    severity: "critical",
    diet: "Follow a ketogenic or modified Atkins diet which may slow tumor growth by starving cancer cells of glucose. Eat anti-inflammatory foods including fatty fish, olive oil, nuts, and colorful vegetables to support brain health. Maintain adequate calories to prevent weight loss during treatment, and limit refined sugars and processed carbohydrates.",
    precautions:
      "Avoid radiation exposure to head, regular MRI monitoring, seizure precautions, mental health support",
    description:
      "The most aggressive type of primary brain cancer with a median survival of 14-16 months despite treatment.",
    medicines:
      "Temozolomide, Bevacizumab, Carmustine (BCNU), Dexamethasone, Levetiracetam",
  },
  {
    id: "d93",
    name: "Meningioma",
    symptoms: [
      "headache",
      "seizures",
      "vision problems",
      "hearing loss",
      "memory loss",
      "weakness",
      "papilledema",
    ],
    severity: "high",
    diet: "Eat a balanced anti-inflammatory diet with emphasis on omega-3 fatty acids from fatty fish, flaxseed, and walnuts. Include adequate vitamin D and calcium through dairy, fortified foods, and salmon. Avoid high-calorie, high-fat processed foods and maintain a healthy weight to reduce estrogen levels which may influence meningioma growth.",
    precautions:
      "Avoid head radiation, regular MRI monitoring, note any neurological changes promptly",
    description:
      "A usually benign tumor that arises from the meninges, the membranes surrounding the brain and spinal cord.",
    medicines:
      "Hydroxyurea, Octreotide, Bevacizumab, Dexamethasone, Mifepristone",
  },
  {
    id: "d94",
    name: "Astrocytoma",
    symptoms: [
      "headache",
      "seizures",
      "weakness",
      "personality changes",
      "memory loss",
      "vision problems",
      "speech difficulty",
      "intracranial pressure signs",
    ],
    severity: "high",
    diet: "Consume a nutrient-dense diet with emphasis on antioxidants from berries, leafy greens, and colorful vegetables to support brain health during treatment. Ensure adequate omega-3 fatty acid intake from fatty fish and walnuts for neuroprotective benefits. Minimize alcohol, refined sugars, and processed foods that promote inflammation.",
    precautions:
      "Regular neurological evaluations, seizure management, avoid excessive radiation exposure",
    description:
      "A type of brain tumor that originates from star-shaped brain cells called astrocytes; ranges from low to high grade.",
    medicines:
      "Temozolomide, Carmustine (BCNU), Vincristine, Carboplatin, Dexamethasone",
  },
  {
    id: "d95",
    name: "Pituitary Adenoma",
    symptoms: [
      "headache",
      "vision problems",
      "hormonal imbalance",
      "fatigue",
      "weight gain",
      "infertility",
      "nipple discharge",
      "papilledema",
    ],
    severity: "medium",
    diet: "Maintain a balanced diet with controlled sodium intake to manage any associated hypertension from hormonal changes. If Cushing's disease is present, follow a low-sugar, low-fat, high-protein diet. Ensure adequate calcium and vitamin D intake to protect bone density affected by hormonal disruption.",
    precautions:
      "Regular hormonal blood tests, vision monitoring, medication compliance, avoid stress",
    description:
      "A benign tumor of the pituitary gland that may cause hormonal imbalances or pressure-related symptoms.",
    medicines:
      "Bromocriptine, Cabergoline, Octreotide, Lanreotide, Pegvisomant",
  },
  {
    id: "d96",
    name: "Brain Metastases",
    symptoms: [
      "headache",
      "seizures",
      "weakness",
      "personality changes",
      "memory loss",
      "vision problems",
      "nausea",
      "loss of coordination",
    ],
    severity: "critical",
    diet: "Focus on easily digestible, nutrient-dense foods to maintain strength during aggressive treatment. Eat small, frequent meals rich in protein and healthy fats to support brain cell health and counter cachexia. Anti-nausea foods like ginger, peppermint, and cold foods may help manage treatment-related side effects.",
    precautions:
      "Regular brain imaging, seizure prophylaxis, coordinate care with oncology team, supportive care",
    description:
      "Cancerous tumors in the brain that have spread from cancer in another part of the body.",
    medicines:
      "Dexamethasone, Levetiracetam, Temozolomide, Whole-brain radiation therapy, Stereotactic radiosurgery",
  },

  // ===== KIDNEY DISEASES (d97-d99) =====
  {
    id: "d97",
    name: "Pyelonephritis (Kidney Infection)",
    symptoms: [
      "flank pain",
      "fever",
      "frequent urination",
      "painful urination",
      "blood in urine",
      "nausea",
      "vomiting",
      "fatigue",
    ],
    severity: "high",
    diet: "Drink 8-10 glasses of water daily to flush bacteria from the urinary tract and support kidney function. Consume cranberry juice or supplements which may prevent bacterial adhesion to urinary tract walls. Avoid alcohol, caffeine, and spicy foods that irritate the bladder and urethra.",
    precautions:
      "Complete antibiotic course, stay well hydrated, avoid delaying urination, wipe front to back",
    description:
      "A bacterial kidney infection that can cause serious health problems if not treated promptly.",
    medicines:
      "Ciprofloxacin, Trimethoprim-sulfamethoxazole, Ceftriaxone, Amoxicillin-clavulanate, Gentamicin",
  },
  {
    id: "d98",
    name: "Polycystic Kidney Disease",
    symptoms: [
      "flank pain",
      "blood in urine",
      "frequent nighttime urination",
      "high blood pressure",
      "fatigue",
      "cystic masses in kidneys",
      "headache",
      "abdominal pain",
    ],
    severity: "high",
    diet: "Follow a low-sodium diet under 2,000mg daily to control blood pressure and reduce cyst growth rate. Maintain adequate hydration with plain water while limiting caffeine which may accelerate cyst growth. Eat a balanced diet with controlled protein intake to reduce kidney workload.",
    precautions:
      "Blood pressure management, regular kidney function tests, avoid contact sports, genetic counseling",
    description:
      "A genetic disorder causing clusters of cysts to develop in the kidneys, potentially leading to kidney failure.",
    medicines:
      "Tolvaptan, Lisinopril, Amlodipine, Furosemide, Pain management medications",
  },
  {
    id: "d99",
    name: "Nephrotic Syndrome",
    symptoms: [
      "foamy urine",
      "swelling",
      "fatigue",
      "weight gain",
      "loss of appetite",
      "high blood pressure",
      "pale skin",
    ],
    severity: "high",
    diet: "Follow a low-sodium diet under 1,500mg daily to reduce edema and blood pressure. Maintain a moderate protein intake of 0.8-1g/kg body weight as excessive protein can worsen kidney damage. Limit saturated fats and cholesterol-rich foods as nephrotic syndrome often causes elevated cholesterol levels.",
    precautions:
      "Blood pressure monitoring, weight monitoring, prevent infections, anticoagulation if indicated",
    description:
      "A kidney disorder causing the kidneys to excrete too much protein in urine, leading to edema and low blood protein.",
    medicines: "Prednisone, Cyclophosphamide, Tacrolimus, Lisinopril, Statins",
  },

  // ===== LIVER & GALLBLADDER (d100-d102) =====
  {
    id: "d100",
    name: "Non-Alcoholic Fatty Liver Disease (NAFLD)",
    symptoms: [
      "fatigue",
      "right upper quadrant pain",
      "abdominal discomfort",
      "weight gain",
      "jaundice",
      "swollen abdomen",
      "loss of appetite",
    ],
    severity: "medium",
    diet: "Achieve 5-10% body weight reduction through a calorie-restricted diet rich in vegetables, fruits, whole grains, and lean proteins to significantly reduce liver fat. Follow a Mediterranean diet pattern with olive oil, fish, nuts, and limited red meat to improve liver enzyme levels. Eliminate alcohol completely, reduce added sugars and fructose especially from sugar-sweetened beverages.",
    precautions:
      "Weight management, avoid alcohol, control diabetes and cholesterol, regular liver monitoring",
    description:
      "Accumulation of excess fat in the liver not caused by alcohol, affecting 25% of the global population.",
    medicines:
      "Vitamin E, Pioglitazone, Metformin, Obeticholic acid, Liraglutide",
  },
  {
    id: "d101",
    name: "Gallstones (Cholelithiasis)",
    symptoms: [
      "right upper quadrant pain",
      "nausea",
      "vomiting",
      "bloating",
      "gas",
      "dark urine",
      "clay-colored stools",
      "jaundice",
    ],
    severity: "medium",
    diet: "Eat a low-fat diet with fat intake under 30% of calories, as high-fat meals trigger gallbladder contractions that can cause pain. Increase dietary fiber through fruits, vegetables, legumes, and whole grains to reduce bile cholesterol saturation. Avoid rapid weight loss diets, fried foods, and high-fat dairy that increase gallstone formation risk.",
    precautions:
      "Maintain healthy weight through gradual weight loss, avoid high-fat meals, regular exercise",
    description:
      "Hardened deposits of digestive fluid that can form in the gallbladder, often causing episodic right-sided abdominal pain.",
    medicines:
      "Ursodeoxycholic acid, NSAIDs for pain, Ketorolac, Hyoscine butylbromide",
  },
  {
    id: "d102",
    name: "Acute Cholecystitis",
    symptoms: [
      "right upper quadrant pain",
      "fever",
      "nausea",
      "vomiting",
      "gallbladder tenderness",
      "jaundice",
      "loss of appetite",
    ],
    severity: "high",
    diet: "During acute phase, follow a strict clear liquid or fat-free diet to rest the gallbladder and reduce inflammation. After recovery, gradually transition to a low-fat diet under 20g fat daily with small frequent meals. Long-term, maintain a Mediterranean-style diet with adequate fiber, lean proteins, and healthy fats from olive oil and avocado.",
    precautions:
      "Seek immediate medical care, avoid all fatty foods, nil by mouth if surgery planned",
    description:
      "Inflammation of the gallbladder, usually caused by gallstones blocking the bile duct.",
    medicines:
      "Cefazolin, Metronidazole, Morphine, Ketorolac, Ursodeoxycholic acid",
  },

  // ===== EYE DISEASES (d103-d106) =====
  {
    id: "d103",
    name: "Glaucoma",
    symptoms: [
      "loss of peripheral vision",
      "halos around lights",
      "eye pain",
      "headache",
      "nausea",
      "tunnel vision",
      "blurred vision",
    ],
    severity: "high",
    diet: "Eat a diet rich in antioxidants including leafy green vegetables like spinach and kale which contain lutein and zeaxanthin that protect optic nerve cells. Include omega-3 fatty acids from fatty fish and flaxseed to support ocular blood flow and reduce intraocular pressure. Limit caffeine consumption as it temporarily raises intraocular pressure.",
    precautions:
      "Regular eye pressure checks, use prescribed eye drops consistently, avoid head-down positions",
    description:
      "A group of eye conditions damaging the optic nerve due to increased intraocular pressure, potentially causing blindness.",
    medicines: "Latanoprost, Timolol, Brimonidine, Dorzolamide, Bimatoprost",
  },
  {
    id: "d104",
    name: "Cataracts",
    symptoms: [
      "blurred vision",
      "halos around lights",
      "sensitivity to light",
      "double vision",
      "faded colors",
      "difficulty with night vision",
    ],
    severity: "medium",
    diet: "Eat foods rich in antioxidant vitamins C and E from citrus fruits, berries, nuts, and seeds to protect lens proteins from oxidative damage. Include lutein and zeaxanthin from leafy greens, eggs, and corn which accumulate in the lens and filter harmful blue light. Limit alcohol and maintain healthy blood sugar to slow cataract progression.",
    precautions:
      "Wear UV-protective sunglasses, control diabetes, avoid smoking, regular eye exams",
    description:
      "Clouding of the normally clear lens of the eye, causing blurry vision and glare sensitivity.",
    medicines:
      "N-acetylcarnosine eye drops, Antioxidant supplements (preventive), Surgical lens replacement (definitive)",
  },
  {
    id: "d105",
    name: "Diabetic Retinopathy",
    symptoms: [
      "blurred vision",
      "floaters in vision",
      "loss of peripheral vision",
      "dark spots in vision",
      "vision changes",
      "night blindness",
    ],
    severity: "high",
    diet: "Maintain strict blood sugar control through a low glycemic index diet with whole grains, legumes, non-starchy vegetables, and lean proteins to prevent retinal blood vessel damage. Eat omega-3 rich fatty fish three times weekly and include lutein and zeaxanthin from leafy greens for direct retinal protection. Avoid sugary drinks, refined carbohydrates, and high-fat processed foods.",
    precautions:
      "Strict blood sugar and blood pressure control, regular dilated eye exams, avoid smoking",
    description:
      "A diabetes complication affecting the eyes, caused by damage to the blood vessels of the light-sensitive tissue in the retina.",
    medicines:
      "Anti-VEGF injections (Ranibizumab, Bevacizumab), Corticosteroid implants, Laser photocoagulation",
  },
  {
    id: "d106",
    name: "Conjunctivitis",
    symptoms: [
      "eye discharge",
      "red eyes",
      "eye itching",
      "eye pain",
      "sensitivity to light",
      "blurred vision",
      "swollen eyelids",
    ],
    severity: "low",
    diet: "Maintain adequate vitamin A intake from carrots, sweet potatoes, and leafy greens to support healthy eye mucus membranes and immune function. Include zinc-rich foods like pumpkin seeds, beef, and chickpeas for immune support and eye health. Stay well hydrated and consume vitamin C rich foods to support recovery.",
    precautions:
      "Avoid touching eyes, wash hands frequently, avoid sharing towels/eye makeup, avoid contact lenses during infection",
    description:
      "Inflammation or infection of the conjunctiva, the transparent membrane lining the eyelid and eyeball.",
    medicines:
      "Erythromycin eye ointment, Ciprofloxacin eye drops, Olopatadine (allergic), Artificial tears",
  },

  // ===== NOSE & SINUS (d107-d108) =====
  {
    id: "d107",
    name: "Chronic Sinusitis",
    symptoms: [
      "nasal obstruction",
      "post-nasal drip",
      "facial pain",
      "headache",
      "loss of smell",
      "cough",
      "fatigue",
      "nasal crusting",
    ],
    severity: "medium",
    diet: "Eat anti-inflammatory foods including turmeric, ginger, and omega-3 rich fish to reduce sinus inflammation. Stay well hydrated with warm fluids like herbal teas and broths to thin mucus secretions. Include vitamin C rich foods, garlic, and onions with natural antimicrobial and immune-boosting properties.",
    precautions:
      "Use saline nasal irrigation, avoid allergens, use air humidifier, treat allergies promptly",
    description:
      "Long-lasting inflammation of the sinuses, the hollow air spaces within the bones surrounding the nose.",
    medicines:
      "Mometasone nasal spray, Budesonide, Amoxicillin-clavulanate, Pseudoephedrine, Guaifenesin",
  },
  {
    id: "d108",
    name: "Nasal Polyps",
    symptoms: [
      "nasal obstruction",
      "loss of smell",
      "post-nasal drip",
      "headache",
      "facial pain",
      "snoring",
      "nasal crusting",
    ],
    severity: "medium",
    diet: "Adopt an anti-inflammatory diet rich in colorful fruits and vegetables, particularly those high in vitamin C and quercetin which may reduce polyp recurrence. Include omega-3 fatty acids from fatty fish and limit omega-6 rich vegetable oils to balance inflammation. Avoid aspirin and NSAIDs if aspirin-exacerbated respiratory disease is present.",
    precautions:
      "Use nasal steroid sprays, identify and avoid triggers, treat allergies, consider surgery if refractory",
    description:
      "Soft, noncancerous growths on the lining of the nasal passages or sinuses, often causing blockage.",
    medicines:
      "Fluticasone nasal spray, Oral prednisone, Dupilumab, Mepolizumab, Omalizumab",
  },

  // ===== EAR DISEASES (d109-d110) =====
  {
    id: "d109",
    name: "Otitis Media (Middle Ear Infection)",
    symptoms: [
      "ear pain",
      "fever",
      "ear discharge",
      "hearing loss",
      "ear fullness",
      "irritability",
      "nausea",
    ],
    severity: "medium",
    diet: "Eat immune-boosting foods rich in vitamins C, D, and zinc from citrus fruits, berries, eggs, and pumpkin seeds to support recovery. Breastfeeding infants provides protective antibodies; encourage warm, soothing fluids in children and adults. Avoid dairy products temporarily if they increase mucus production and worsen eustachian tube dysfunction.",
    precautions:
      "Breastfeed infants, avoid secondhand smoke, vaccination with pneumococcal and Hib vaccines",
    description:
      "Infection or inflammation in the middle ear space behind the eardrum, common in children.",
    medicines:
      "Amoxicillin, Amoxicillin-clavulanate, Ibuprofen, Acetaminophen, Ciprofloxacin ear drops",
  },
  {
    id: "d110",
    name: "Meniere's Disease",
    symptoms: [
      "vertigo",
      "hearing loss",
      "tinnitus",
      "ear fullness",
      "ear popping sensation",
      "nausea",
      "vomiting",
      "loss of balance",
    ],
    severity: "medium",
    diet: "Follow a strict low-sodium diet under 1,500-2,000mg daily as sodium causes fluid retention in the inner ear that triggers attacks. Avoid caffeine, alcohol, and tobacco which affect blood flow to the inner ear and worsen symptoms. Eat small, frequent meals at regular intervals to maintain stable blood pressure and prevent vertigo triggers.",
    precautions:
      "Low-salt diet strictly, avoid alcohol and caffeine, manage stress, sleep on elevated pillow",
    description:
      "A disorder of the inner ear causing episodes of vertigo, tinnitus, hearing loss, and ear pressure.",
    medicines:
      "Meclizine, Diuretics (hydrochlorothiazide), Betahistine, Diazepam, Prednisone",
  },

  // ===== MOUTH DISEASES (d111-d112) =====
  {
    id: "d111",
    name: "Periodontitis (Gum Disease)",
    symptoms: [
      "receding gums",
      "loose teeth",
      "gingival recession",
      "bleeding gums",
      "bad breath",
      "difficulty chewing",
      "tooth sensitivity",
    ],
    severity: "medium",
    diet: "Eat a diet high in vitamin C from citrus fruits, bell peppers, and broccoli to support gum tissue collagen synthesis and healing. Include calcium and vitamin D rich foods like dairy, leafy greens, and fortified products to strengthen the jawbone. Avoid sugary snacks and drinks that feed harmful oral bacteria and acidic foods that erode enamel.",
    precautions:
      "Brush and floss twice daily, regular dental cleanings, quit smoking, control diabetes",
    description:
      "A serious gum infection that damages the soft tissue and bone supporting the teeth, potentially causing tooth loss.",
    medicines:
      "Doxycycline, Metronidazole, Chlorhexidine mouthwash, Arestin (minocycline), Scaling and root planing",
  },
  {
    id: "d112",
    name: "Xerostomia (Dry Mouth)",
    symptoms: [
      "dry mouth",
      "difficulty chewing",
      "difficulty swallowing",
      "bad breath",
      "tooth decay",
      "hoarse voice",
      "cracked lips",
    ],
    severity: "low",
    diet: "Sip water or sugar-free beverages frequently throughout the day to maintain oral moisture. Eat moist foods like yogurt, soups, stews, and smoothies, and avoid dry, hard-to-swallow foods. Limit caffeine, alcohol, and salty or spicy foods that worsen dryness, and choose xylitol-containing sugar-free gum to stimulate saliva production.",
    precautions:
      "Stay hydrated, use fluoride toothpaste, avoid mouthwashes with alcohol, review medications",
    description:
      "A condition where the salivary glands don't produce enough saliva to keep the mouth moist.",
    medicines:
      "Pilocarpine, Cevimeline, Artificial saliva sprays, Biotene products, Fluoride treatments",
  },

  // ===== LUNG DISEASES (d113-d114) =====
  {
    id: "d113",
    name: "Pulmonary Fibrosis",
    symptoms: [
      "shortness of breath",
      "dry cough",
      "fatigue",
      "weight loss",
      "clubbing of fingers",
      "barrel chest",
      "pleural friction rub",
    ],
    severity: "critical",
    diet: "Maintain adequate calorie and protein intake to prevent malnutrition as breathing difficulty increases energy expenditure. Eat antioxidant-rich foods including vitamin C and E from berries, nuts, and vegetables to counteract oxidative stress in fibrotic lung tissue. Stay well hydrated and eat small frequent meals to avoid diaphragm compression from large meals.",
    precautions:
      "Stop smoking immediately, avoid lung irritants, supplemental oxygen, pulmonary rehabilitation, flu and pneumonia vaccination",
    description:
      "Scarring and thickening of lung tissue that worsens over time, making it progressively harder to breathe.",
    medicines:
      "Pirfenidone, Nintedanib, N-acetylcysteine, Prednisone, Sildenafil (pulmonary hypertension)",
  },
  {
    id: "d114",
    name: "Pleurisy",
    symptoms: [
      "chest pain",
      "shortness of breath",
      "cough",
      "fever",
      "shallow breathing",
      "pleural friction rub",
      "fatigue",
    ],
    severity: "high",
    diet: "Eat anti-inflammatory foods rich in omega-3 fatty acids from fatty fish, walnuts, and flaxseed to reduce pleural inflammation. Include adequate vitamin C from citrus and berries to support immune function and healing. Stay well hydrated and avoid alcohol and tobacco that worsen respiratory inflammation.",
    precautions:
      "Treat underlying cause, adequate rest, avoid strenuous activity, use of pillows to support breathing",
    description:
      "Inflammation of the pleura, the tissue lining the lungs and chest cavity, causing sharp chest pain with breathing.",
    medicines:
      "Ibuprofen, Naproxen, Colchicine, Prednisone, Codeine (cough suppression)",
  },

  // ===== EXCRETORY SYSTEM (d115-d116) =====
  {
    id: "d115",
    name: "Hemorrhoids",
    symptoms: [
      "rectal bleeding",
      "anal pain",
      "itching",
      "swelling",
      "blood in stool",
      "discomfort during bowel movements",
    ],
    severity: "low",
    diet: "Consume a high-fiber diet with 25-35g daily from whole grains, fruits, vegetables, and legumes to soften stools and reduce straining. Drink at least 8 glasses of water daily to maintain stool softness and prevent constipation. Avoid spicy foods, alcohol, and caffeine that irritate hemorrhoid tissue and worsen inflammation.",
    precautions:
      "Avoid straining, increase fiber intake gradually, sitz baths, avoid prolonged sitting on toilet",
    description:
      "Swollen and inflamed veins in the rectum and anus that cause discomfort and bleeding.",
    medicines:
      "Hydrocortisone cream, Witch hazel, Docusate sodium (stool softener), Fiber supplements, Phenylephrine suppositories",
  },
  {
    id: "d116",
    name: "Diverticulitis",
    symptoms: [
      "abdominal pain",
      "fever",
      "nausea",
      "vomiting",
      "constipation",
      "diarrhea",
      "blood in stool",
      "bloating",
    ],
    severity: "high",
    diet: "During acute flares, follow a clear liquid diet initially progressing to low-fiber foods as symptoms improve. Long-term prevention requires a high-fiber diet with 25-35g daily from whole grains, fruits, vegetables, and legumes to maintain regular bowel movements. Avoid seeds, nuts, and popcorn during acute episodes, and stay well hydrated.",
    precautions:
      "High fiber diet when not flaring, stay hydrated, regular exercise, maintain healthy weight",
    description:
      "Inflammation or infection of small pouches that develop in the digestive tract, usually in the colon.",
    medicines:
      "Ciprofloxacin, Metronidazole, Amoxicillin-clavulanate, Mesalamine, Fiber supplements",
  },

  // ===== PARALYSIS CONDITIONS (d117-d119) =====
  {
    id: "d117",
    name: "Bell's Palsy",
    symptoms: [
      "facial drooping",
      "sudden facial paralysis",
      "eye pain",
      "difficulty swallowing",
      "sensitivity to sound",
      "headache",
      "loss of taste",
    ],
    severity: "high",
    diet: "Eat soft, easy-to-chew foods as facial weakness may impair chewing and increase choking risk. Include vitamin B12 rich foods from eggs, dairy, and lean meats to support nerve regeneration. Anti-inflammatory foods with omega-3 fatty acids from fish and flaxseed and antioxidants from colorful vegetables may support facial nerve recovery.",
    precautions:
      "Eye protection (artificial tears, patching at night), physical therapy, early corticosteroid treatment",
    description:
      "Sudden, temporary weakness or paralysis of facial muscles on one side of the face due to facial nerve inflammation.",
    medicines:
      "Prednisone, Acyclovir or Valacyclovir, Artificial tears, Lubricant eye ointment, Vitamin B12",
  },
  {
    id: "d118",
    name: "Cerebral Palsy",
    symptoms: [
      "muscle stiffness",
      "inability to move limbs",
      "speech difficulty",
      "difficulty swallowing",
      "tremors",
      "seizures",
      "fatigue",
      "poor coordination",
    ],
    severity: "critical",
    diet: "Ensure adequate caloric intake as increased muscle tone raises energy requirements in cerebral palsy. Eat nutrient-dense, easy-to-swallow foods like pureed fruits and vegetables, yogurt, and smoothies if swallowing is affected. Prioritize calcium, vitamin D, and protein for bone health as fracture risk is elevated due to reduced mobility.",
    precautions:
      "Physical and occupational therapy, assistive devices, seizure management, regular dental care",
    description:
      "A group of movement disorders caused by brain damage during fetal development or shortly after birth.",
    medicines:
      "Baclofen, Botulinum toxin, Diazepam, Tizanidine, Levetiracetam (seizures)",
  },
  {
    id: "d119",
    name: "Spinal Cord Injury (Paraplegia)",
    symptoms: [
      "inability to move limbs",
      "bladder incontinence",
      "muscle weakness",
      "numbness",
      "pain",
      "breathing difficulty",
      "spasticity",
    ],
    severity: "critical",
    diet: "Prevent obesity and pressure sores with a calorie-controlled, nutrient-dense diet as reduced mobility decreases caloric needs. Eat high-fiber foods and drink adequate fluids to manage bowel regularity which is often impaired. Ensure adequate calcium, vitamin D, and omega-3 fatty acids to reduce bone density loss and systemic inflammation.",
    precautions:
      "Pressure sore prevention, bowel and bladder management program, physical rehabilitation, prevent infections",
    description:
      "Damage to the spinal cord resulting in loss of movement, sensation, and autonomic function below the injury level.",
    medicines:
      "Methylprednisolone (acute), Baclofen, Oxybutynin, Gabapentin, Sildenafil",
  },

  // ===== HAIR FALL CONDITIONS (d120-d122) =====
  {
    id: "d120",
    name: "Androgenetic Alopecia (Male/Female Pattern Baldness)",
    symptoms: [
      "receding hairline",
      "thinning hair",
      "excessive hair shedding",
      "bald patches",
      "scalp itching",
    ],
    severity: "low",
    diet: "Consume adequate protein from eggs, lean meats, legumes, and nuts as hair follicles require keratin for growth. Include iron, zinc, and biotin-rich foods like lean red meat, pumpkin seeds, and whole grains to support hair follicle health. Eat omega-3 fatty acids from fatty fish and flaxseed along with antioxidant-rich fruits and vegetables for scalp circulation.",
    precautions:
      "Avoid tight hairstyles, minimize heat styling, manage stress, avoid harsh chemical treatments",
    description:
      "The most common type of hair loss caused by a combination of genetic predisposition and androgen hormones.",
    medicines:
      "Minoxidil (topical), Finasteride (oral for men), Dutasteride, Spironolactone (women), Platelet-rich plasma therapy",
  },
  {
    id: "d121",
    name: "Alopecia Areata",
    symptoms: [
      "bald patches",
      "excessive hair shedding",
      "scalp itching",
      "nail pitting",
      "regrowth of white hair initially",
    ],
    severity: "medium",
    diet: "Eat an anti-inflammatory diet rich in zinc from pumpkin seeds and cashews, biotin from eggs and sweet potatoes, and iron from leafy greens and lean meats to support hair follicle immune health. Include omega-3 fatty acids and vitamin D from fatty fish and fortified foods as deficiencies are common in alopecia areata. Avoid gluten if celiac disease co-exists as it may trigger autoimmune flares.",
    precautions:
      "Manage stress, protect scalp from sun exposure, support groups, avoid scalp trauma",
    description:
      "An autoimmune condition causing patchy hair loss on the scalp and other parts of the body.",
    medicines:
      "Corticosteroid injections, Minoxidil, Anthralin, Diphencyprone (DPCP), Baricitinib",
  },
  {
    id: "d122",
    name: "Telogen Effluvium",
    symptoms: [
      "excessive hair shedding",
      "thinning hair",
      "scalp itching",
      "scalp scaling",
      "fatigue",
    ],
    severity: "low",
    diet: "Ensure adequate protein intake as protein deficiency is a primary cause of telogen effluvium; eat eggs, meat, fish, and legumes daily. Supplement iron, ferritin, zinc, and B vitamins through iron-rich foods and a balanced varied diet to address nutritional deficiencies that trigger hair shedding. Include biotin from eggs and whole grains, and vitamin C from citrus to enhance iron absorption.",
    precautions:
      "Identify and treat underlying cause, manage stress, avoid crash diets, review medications",
    description:
      "Diffuse hair shedding triggered by physical or emotional stress, nutritional deficiencies, or hormonal changes.",
    medicines:
      "Iron supplements (if deficient), Biotin, Zinc supplements, Minoxidil, Vitamin D supplementation",
  },
];

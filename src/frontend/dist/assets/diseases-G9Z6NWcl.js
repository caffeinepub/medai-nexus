const DISEASES = [
  {
    name: "Common Cold",
    symptoms: [
      "Runny nose",
      "Sneezing",
      "Sore throat",
      "Cough",
      "Nasal congestion",
      "Fatigue",
      "Headache"
    ],
    severity: "Mild",
    diet: "Warm fluids, honey, ginger tea, vitamin C foods",
    precautions: "Rest, stay hydrated, avoid contact with others, wash hands frequently"
  },
  {
    name: "Influenza (Flu)",
    symptoms: [
      "High fever above 104F",
      "Chills",
      "Muscle pain",
      "Headache",
      "Fatigue",
      "Cough",
      "Sore throat",
      "Runny nose",
      "Vomiting",
      "Diarrhea"
    ],
    severity: "Moderate",
    diet: "Plenty of fluids, broth, fruits rich in vitamin C",
    precautions: "Annual flu vaccine, rest, antiviral medication if prescribed"
  },
  {
    name: "COVID-19",
    symptoms: [
      "Fever",
      "Dry cough",
      "Fatigue",
      "Loss of taste",
      "Loss of smell",
      "Shortness of breath",
      "Muscle pain",
      "Headache",
      "Sore throat",
      "Nasal congestion",
      "Diarrhea",
      "Nausea"
    ],
    severity: "Moderate",
    diet: "High protein, vitamins C and D, zinc-rich foods, plenty of fluids",
    precautions: "Isolation, vaccination, mask usage, regular testing"
  },
  {
    name: "Pneumonia",
    symptoms: [
      "High fever above 104F",
      "Productive cough",
      "Chest pain",
      "Shortness of breath",
      "Rapid breathing",
      "Chills",
      "Fatigue",
      "Nausea",
      "Vomiting"
    ],
    severity: "Severe",
    diet: "High calorie foods, protein-rich diet, plenty of fluids",
    precautions: "Vaccination, avoid smoking, complete antibiotic course"
  },
  {
    name: "Tuberculosis",
    symptoms: [
      "Persistent cough",
      "Coughing up blood",
      "Night sweats",
      "Weight loss",
      "Fatigue",
      "Fever",
      "Chest pain",
      "Loss of appetite"
    ],
    severity: "Severe",
    diet: "High protein, vitamin-rich diet, avoid alcohol",
    precautions: "BCG vaccination, complete TB treatment, isolation during active disease"
  },
  {
    name: "Malaria",
    symptoms: [
      "Fever",
      "Chills",
      "Sweating",
      "Headache",
      "Nausea",
      "Vomiting",
      "Muscle pain",
      "Fatigue"
    ],
    severity: "Severe",
    diet: "Easy to digest foods, plenty of fluids, iron-rich foods",
    precautions: "Mosquito nets, repellents, antimalarial medication"
  },
  {
    name: "Dengue Fever",
    symptoms: [
      "High fever above 104F",
      "Headache",
      "Eye pain",
      "Muscle pain",
      "Joint pain",
      "Rash",
      "Nausea",
      "Vomiting",
      "Bruising easily",
      "Gum bleeding"
    ],
    severity: "Severe",
    diet: "Papaya leaf juice, plenty of fluids, soft diet",
    precautions: "Mosquito control, protective clothing, repellents"
  },
  {
    name: "Typhoid",
    symptoms: [
      "Fever",
      "Headache",
      "Weakness",
      "Abdominal pain",
      "Constipation",
      "Diarrhea",
      "Rash",
      "Nausea",
      "Loss of appetite"
    ],
    severity: "Moderate",
    diet: "High calorie liquid diet, avoid raw foods",
    precautions: "Typhoid vaccine, safe water, food hygiene"
  },
  {
    name: "Cholera",
    symptoms: [
      "Diarrhea",
      "Vomiting",
      "Severe dehydration",
      "Muscle cramps",
      "Rapid heartbeat",
      "Dry mouth",
      "Sunken eyes"
    ],
    severity: "Severe",
    diet: "Oral rehydration solution, clear broths, bananas",
    precautions: "Safe water, proper sanitation, cholera vaccine"
  },
  {
    name: "Hepatitis A",
    symptoms: [
      "Yellow skin (jaundice)",
      "Fatigue",
      "Nausea",
      "Vomiting",
      "Abdominal pain",
      "Dark urine",
      "Loss of appetite",
      "Fever"
    ],
    severity: "Moderate",
    diet: "Low fat, high carbohydrate diet, avoid alcohol",
    precautions: "Hepatitis A vaccine, hygiene, safe food and water"
  },
  {
    name: "Hepatitis B",
    symptoms: [
      "Yellow skin (jaundice)",
      "Fatigue",
      "Abdominal pain",
      "Dark urine",
      "Joint pain",
      "Nausea",
      "Vomiting",
      "Loss of appetite"
    ],
    severity: "Severe",
    diet: "Low sodium, high protein diet, no alcohol",
    precautions: "Hepatitis B vaccine, avoid sharing needles, safe sex"
  },
  {
    name: "Hepatitis C",
    symptoms: [
      "Fatigue",
      "Yellow skin (jaundice)",
      "Dark urine",
      "Abdominal pain",
      "Nausea",
      "Loss of appetite",
      "Joint pain",
      "Gum bleeding"
    ],
    severity: "Severe",
    diet: "Low fat, no alcohol, high antioxidant foods",
    precautions: "Avoid sharing needles, safe sex, regular liver monitoring"
  },
  {
    name: "Diabetes Type 1",
    symptoms: [
      "Excessive thirst",
      "Frequent urination",
      "Weight loss",
      "Fatigue",
      "Blurred vision",
      "Frequent hunger",
      "Slow wound healing",
      "Frequent infections"
    ],
    severity: "Chronic",
    diet: "Low glycemic index foods, controlled carbohydrates, regular meal timing",
    precautions: "Insulin therapy, blood sugar monitoring, regular exercise"
  },
  {
    name: "Diabetes Type 2",
    symptoms: [
      "Excessive thirst",
      "Frequent urination",
      "Fatigue",
      "Blurred vision",
      "Slow wound healing",
      "Frequent infections",
      "Numbness"
    ],
    severity: "Chronic",
    diet: "Low sugar diet, whole grains, vegetables, portion control",
    precautions: "Weight management, exercise, medication adherence, regular checkups"
  },
  {
    name: "Hypertension",
    symptoms: [
      "Headache",
      "Dizziness",
      "Blurred vision",
      "Chest pain",
      "Shortness of breath",
      "Palpitations"
    ],
    severity: "Moderate",
    diet: "DASH diet, low sodium, potassium-rich foods, no alcohol",
    precautions: "Regular BP monitoring, medication, reduce stress, limit salt"
  },
  {
    name: "Coronary Artery Disease",
    symptoms: [
      "Chest pain radiating to arm",
      "Chest tightness",
      "Shortness of breath",
      "Pain spreading to jaw",
      "Fatigue",
      "Palpitations",
      "Sweating"
    ],
    severity: "Severe",
    diet: "Heart-healthy diet, low cholesterol, omega-3 fatty acids",
    precautions: "No smoking, exercise, medication, regular cardiac checkups"
  },
  {
    name: "Heart Failure",
    symptoms: [
      "Shortness of breath",
      "Fatigue",
      "Leg swelling with chest pain",
      "Rapid heartbeat",
      "Persistent cough",
      "Wheezing",
      "Irregular heartbeat"
    ],
    severity: "Severe",
    diet: "Low sodium diet, fluid restriction, small frequent meals",
    precautions: "Medication adherence, daily weight monitoring, limit fluid intake"
  },
  {
    name: "Asthma",
    symptoms: [
      "Wheezing",
      "Shortness of breath",
      "Chest tightness",
      "Dry cough",
      "Difficulty breathing"
    ],
    severity: "Moderate",
    diet: "Anti-inflammatory foods, vitamin D, avoid allergens",
    precautions: "Avoid triggers, use inhaler correctly, avoid smoking"
  },
  {
    name: "COPD",
    symptoms: [
      "Persistent cough",
      "Productive cough",
      "Shortness of breath",
      "Wheezing",
      "Chest tightness",
      "Fatigue",
      "Bluish lips"
    ],
    severity: "Severe",
    diet: "High calorie, high protein, omega-3 rich foods",
    precautions: "Quit smoking, pulmonary rehabilitation, flu vaccine"
  },
  {
    name: "Kidney Disease (CKD)",
    symptoms: [
      "Reduced urine output",
      "Swelling",
      "Fatigue",
      "Shortness of breath",
      "Nausea",
      "Confusion",
      "Itching",
      "Back pain"
    ],
    severity: "Severe",
    diet: "Low protein, low potassium, low phosphorus, fluid restriction",
    precautions: "Control blood pressure and diabetes, avoid NSAIDs"
  },
  {
    name: "Kidney Stones",
    symptoms: [
      "Severe kidney pain",
      "Back pain",
      "Painful urination",
      "Blood in urine",
      "Passing stones",
      "Nausea",
      "Vomiting",
      "Frequent urination"
    ],
    severity: "Moderate",
    diet: "High fluid intake, low sodium, low oxalate foods",
    precautions: "Stay well hydrated, limit calcium supplements"
  },
  {
    name: "Urinary Tract Infection",
    symptoms: [
      "Painful urination",
      "Frequent urination",
      "Burning sensation",
      "Dark urine",
      "Pelvic pain",
      "Fever",
      "Back pain",
      "Nausea"
    ],
    severity: "Mild",
    diet: "Plenty of water, cranberry juice, avoid caffeine",
    precautions: "Good hygiene, urinate after sex, stay hydrated"
  },
  {
    name: "Anemia",
    symptoms: [
      "Fatigue",
      "Pale skin",
      "Shortness of breath",
      "Dizziness",
      "Rapid heartbeat",
      "Headache",
      "Cold hands and feet",
      "Chest pain",
      "Weakness"
    ],
    severity: "Moderate",
    diet: "Iron-rich foods (red meat, spinach, beans), vitamin C, folate",
    precautions: "Iron supplements, treat underlying cause, regular blood tests"
  },
  {
    name: "Hypothyroidism",
    symptoms: [
      "Extreme sensitivity to cold",
      "Weight gain",
      "Fatigue",
      "Constipation",
      "Dry skin",
      "Hair loss",
      "Slow heartbeat",
      "Depression",
      "Memory loss",
      "Goiter (neck swelling)"
    ],
    severity: "Moderate",
    diet: "Iodine-rich foods, selenium, zinc",
    precautions: "Thyroid hormone replacement, regular TSH monitoring"
  },
  {
    name: "Hyperthyroidism",
    symptoms: [
      "Weight loss",
      "Rapid heartbeat",
      "Irregular heartbeat",
      "Sweating",
      "Extreme sensitivity to heat",
      "Anxiety",
      "Tremors at rest",
      "Insomnia",
      "Goiter (neck swelling)",
      "Protruding eyes"
    ],
    severity: "Moderate",
    diet: "High calorie diet, calcium-rich foods, avoid iodine-rich foods",
    precautions: "Antithyroid medications, regular thyroid function tests"
  },
  {
    name: "GERD / Acid Reflux",
    symptoms: [
      "Heartburn",
      "Acid reflux",
      "Difficulty swallowing",
      "Chest pain",
      "Sore throat",
      "Cough",
      "Nausea"
    ],
    severity: "Mild",
    diet: "Avoid spicy, acidic foods, small meals, no eating before bed",
    precautions: "Elevate head of bed, avoid triggers, weight management"
  },
  {
    name: "Peptic Ulcer",
    symptoms: [
      "Abdominal pain",
      "Stomach cramps",
      "Heartburn",
      "Nausea",
      "Vomiting",
      "Bloating",
      "Loss of appetite",
      "Vomiting blood"
    ],
    severity: "Moderate",
    diet: "Bland diet, avoid spicy foods, small frequent meals, no alcohol",
    precautions: "H. pylori treatment, avoid NSAIDs, no smoking"
  },
  {
    name: "Irritable Bowel Syndrome",
    symptoms: [
      "Abdominal pain",
      "Diarrhea",
      "Constipation",
      "Bloating",
      "Gas",
      "Nausea",
      "Stomach cramps"
    ],
    severity: "Mild",
    diet: "Low FODMAP diet, high fiber, adequate hydration",
    precautions: "Stress management, identify food triggers, regular exercise"
  },
  {
    name: "Crohn's Disease",
    symptoms: [
      "Abdominal pain",
      "Diarrhea",
      "Blood in stool",
      "Weight loss",
      "Fatigue",
      "Fever",
      "Nausea",
      "Loss of appetite",
      "Joint pain"
    ],
    severity: "Severe",
    diet: "Low residue diet during flares, adequate nutrition, avoid trigger foods",
    precautions: "Medication adherence, regular colonoscopy, stress management"
  },
  {
    name: "Appendicitis",
    symptoms: [
      "Severe abdominal pain",
      "Nausea",
      "Vomiting",
      "Fever",
      "Loss of appetite",
      "Abdominal pain",
      "Chills"
    ],
    severity: "Severe",
    diet: "Post-surgery: clear liquids then gradual diet progression",
    precautions: "Immediate surgical consultation, do not delay treatment"
  },
  {
    name: "Gallstones",
    symptoms: [
      "Jaundice with abdominal pain",
      "Nausea",
      "Vomiting",
      "Severe abdominal pain",
      "Back pain",
      "Shoulder pain"
    ],
    severity: "Moderate",
    diet: "Low fat diet, high fiber, avoid fried foods",
    precautions: "Weight management, avoid rapid weight loss"
  },
  {
    name: "Pancreatitis",
    symptoms: [
      "Severe abdominal pain",
      "Nausea",
      "Vomiting",
      "Fever",
      "Rapid heartbeat",
      "Yellow skin (jaundice)",
      "Bloating"
    ],
    severity: "Severe",
    diet: "Clear liquids progressing to low fat, no alcohol",
    precautions: "No alcohol, treat gallstones, low fat diet"
  },
  {
    name: "Liver Cirrhosis",
    symptoms: [
      "Yellow skin (jaundice)",
      "Fatigue",
      "Swollen abdomen (ascites)",
      "Leg swelling with chest pain",
      "Bruising easily",
      "Confusion",
      "Vomiting blood",
      "Blood in stool"
    ],
    severity: "Severe",
    diet: "High protein (unless encephalopathy), low sodium, no alcohol",
    precautions: "No alcohol, treat underlying cause, regular liver monitoring"
  },
  {
    name: "Rheumatoid Arthritis",
    symptoms: [
      "Joint pain",
      "Joint swelling",
      "Stiffness in morning",
      "Fatigue",
      "Fever",
      "Weakness",
      "Weight loss"
    ],
    severity: "Moderate",
    diet: "Anti-inflammatory diet, omega-3, turmeric, avoid processed foods",
    precautions: "DMARDs therapy, physical therapy, joint protection strategies"
  },
  {
    name: "Osteoarthritis",
    symptoms: [
      "Joint pain",
      "Stiffness in morning",
      "Bone pain at night",
      "Reduced range of motion",
      "Joint swelling",
      "Knee pain",
      "Hip pain"
    ],
    severity: "Moderate",
    diet: "Anti-inflammatory foods, calcium, vitamin D, maintain healthy weight",
    precautions: "Weight management, low-impact exercise, physical therapy"
  },
  {
    name: "Osteoporosis",
    symptoms: ["Back pain", "Pathological fractures", "Bone pain at night"],
    severity: "Moderate",
    diet: "Calcium-rich diet, vitamin D, magnesium, protein",
    precautions: "Weight-bearing exercise, fall prevention, bisphosphonates if prescribed"
  },
  {
    name: "Gout",
    symptoms: ["Joint pain", "Joint swelling", "Fever", "Burning sensation"],
    severity: "Moderate",
    diet: "Low purine diet, no alcohol, avoid organ meats, hydrate well",
    precautions: "Uric acid lowering medication, avoid triggers, stay hydrated"
  },
  {
    name: "Migraine",
    symptoms: [
      "Headache",
      "Nausea",
      "Vomiting",
      "Sensitivity to light",
      "Aura before headache",
      "Blurred vision",
      "Dizziness",
      "Neck pain"
    ],
    severity: "Moderate",
    diet: "Avoid triggers (caffeine, alcohol, aged cheese), stay hydrated",
    precautions: "Identify and avoid triggers, stress management, migraine medications"
  },
  {
    name: "Epilepsy",
    symptoms: [
      "Seizures",
      "Confusion",
      "Loss of consciousness",
      "Involuntary movements",
      "Anxiety"
    ],
    severity: "Severe",
    diet: "Ketogenic diet may help, regular meals, adequate hydration",
    precautions: "Antiepileptic drugs, avoid seizure triggers, no driving if uncontrolled"
  },
  {
    name: "Parkinson's Disease",
    symptoms: [
      "Tremors at rest",
      "Pill-rolling tremor",
      "Cogwheel rigidity",
      "Slurred speech",
      "Drooling",
      "Constipation",
      "Depression"
    ],
    severity: "Severe",
    diet: "Mediterranean diet, high fiber, protein timing with medication",
    precautions: "Levodopa therapy, physical therapy, fall prevention"
  },
  {
    name: "Alzheimer's Disease",
    symptoms: [
      "Memory loss",
      "Confusion",
      "Disorientation",
      "Mood swings",
      "Depression",
      "Difficulty concentrating"
    ],
    severity: "Severe",
    diet: "MIND diet, omega-3, antioxidants, Mediterranean diet",
    precautions: "Mental stimulation, social engagement, medication management"
  },
  {
    name: "Multiple Sclerosis",
    symptoms: [
      "Numbness",
      "Tingling",
      "Weakness",
      "Blurred vision",
      "Double vision",
      "Fatigue",
      "Muscle weakness"
    ],
    severity: "Severe",
    diet: "Anti-inflammatory diet, vitamin D, omega-3, low saturated fat",
    precautions: "Disease-modifying therapy, physical therapy, temperature management"
  },
  {
    name: "Stroke",
    symptoms: [
      "Sudden arm weakness",
      "Sudden leg weakness",
      "Facial drooping",
      "Sudden speech difficulty",
      "Sudden vision loss",
      "Sudden severe headache",
      "Loss of consciousness",
      "Confusion"
    ],
    severity: "Critical",
    diet: "Low sodium, heart-healthy diet, high antioxidants",
    precautions: "Immediate emergency care, antihypertensives, rehabilitation"
  },
  {
    name: "Meningitis",
    symptoms: [
      "Severe neck stiffness with fever",
      "Light sensitivity with headache",
      "Headache",
      "High fever above 104F",
      "Petechiae (purple spots)",
      "Nausea",
      "Vomiting",
      "Confusion"
    ],
    severity: "Critical",
    diet: "IV fluids initially, then gradual return to normal diet",
    precautions: "Meningococcal vaccine, immediate hospitalization, antibiotics"
  },
  {
    name: "Chickenpox",
    symptoms: [
      "Rash",
      "Itching",
      "Fever",
      "Fatigue",
      "Headache",
      "Loss of appetite",
      "Sore throat"
    ],
    severity: "Mild",
    diet: "Soft foods, cold foods for mouth sores, plenty of fluids",
    precautions: "Varicella vaccine, isolation, calamine lotion"
  },
  {
    name: "Measles",
    symptoms: [
      "High fever above 104F",
      "Rash",
      "Cough",
      "Runny nose",
      "Eye redness",
      "Sensitivity to light"
    ],
    severity: "Moderate",
    diet: "Vitamin A supplementation, fluids, nutritious diet",
    precautions: "MMR vaccination, isolation, vitamin A supplements"
  },
  {
    name: "HIV/AIDS",
    symptoms: [
      "Fatigue",
      "Weight loss",
      "Fever",
      "Night sweats",
      "Swollen lymph nodes",
      "Recurring fever",
      "Diarrhea",
      "Frequent infections"
    ],
    severity: "Severe",
    diet: "High protein, micronutrient-rich diet, food safety practices",
    precautions: "Antiretroviral therapy, safe sex, regular CD4 monitoring"
  },
  {
    name: "Psoriasis",
    symptoms: [
      "Rash",
      "Itching",
      "Dry skin",
      "Skin discoloration",
      "Joint pain",
      "Nail changes"
    ],
    severity: "Moderate",
    diet: "Anti-inflammatory diet, omega-3, avoid alcohol",
    precautions: "Moisturize regularly, avoid triggers, phototherapy"
  },
  {
    name: "Eczema",
    symptoms: ["Itching", "Rash", "Dry skin", "Skin discoloration"],
    severity: "Mild",
    diet: "Identify and avoid food triggers, anti-inflammatory foods, probiotics",
    precautions: "Moisturize frequently, avoid irritants and allergens"
  },
  {
    name: "Lupus (SLE)",
    symptoms: [
      "Rash",
      "Joint pain",
      "Fatigue",
      "Fever",
      "Hair loss",
      "Skin discoloration",
      "Chest pain"
    ],
    severity: "Severe",
    diet: "Anti-inflammatory diet, vitamin D, calcium, low sodium",
    precautions: "Sun protection, antimalarials, immunosuppressants"
  },
  {
    name: "Celiac Disease",
    symptoms: [
      "Diarrhea",
      "Abdominal pain",
      "Bloating",
      "Weight loss",
      "Fatigue",
      "Constipation",
      "Bone pain at night"
    ],
    severity: "Moderate",
    diet: "Strict gluten-free diet for life, calcium, iron, vitamin D supplementation",
    precautions: "Avoid all gluten, read food labels, gluten-free cooking practices"
  },
  {
    name: "Polycystic Ovary Syndrome",
    symptoms: [
      "Menstrual irregularities",
      "Excessive hair growth",
      "Acne",
      "Weight gain",
      "Pelvic pain",
      "Hair loss"
    ],
    severity: "Moderate",
    diet: "Low glycemic index diet, anti-inflammatory foods, high fiber",
    precautions: "Weight management, hormonal therapy, fertility treatment if needed"
  },
  {
    name: "Endometriosis",
    symptoms: [
      "Painful periods",
      "Pelvic pain",
      "Heavy periods",
      "Painful urination",
      "Back pain",
      "Nausea",
      "Fatigue"
    ],
    severity: "Moderate",
    diet: "Anti-inflammatory diet, omega-3, avoid red meat and alcohol",
    precautions: "Hormonal therapy, laparoscopic surgery, pain management"
  },
  {
    name: "Cataracts",
    symptoms: ["Blurred vision", "Double vision", "Sensitivity to light"],
    severity: "Moderate",
    diet: "Antioxidant-rich diet, vitamin C, E, lutein",
    precautions: "UV eye protection, no smoking, regular eye exams"
  },
  {
    name: "Glaucoma",
    symptoms: [
      "Eye pain",
      "Blurred vision",
      "Tunnel vision",
      "Nausea",
      "Eye redness",
      "Headache"
    ],
    severity: "Severe",
    diet: "Low sodium, leafy greens, avoid excessive caffeine",
    precautions: "Eye drops, regular intraocular pressure monitoring"
  },
  {
    name: "Tonsillitis",
    symptoms: [
      "Sore throat",
      "Fever",
      "Difficulty swallowing",
      "Bad breath",
      "Ear pain",
      "Headache",
      "Neck pain"
    ],
    severity: "Mild",
    diet: "Cold liquids, ice cream, soft foods, plenty of fluids",
    precautions: "Antibiotics if bacterial, rest, gargle with salt water"
  },
  {
    name: "Sinusitis",
    symptoms: [
      "Nasal congestion",
      "Headache",
      "Post-nasal drip",
      "Loss of smell",
      "Cough",
      "Fatigue"
    ],
    severity: "Mild",
    diet: "Hot liquids, stay hydrated",
    precautions: "Nasal irrigation, decongestants, antibiotics if bacterial"
  },
  {
    name: "Rheumatic Fever",
    symptoms: [
      "Fever",
      "Joint pain",
      "Joint swelling",
      "Chest pain",
      "Rash",
      "Fatigue",
      "Sore throat"
    ],
    severity: "Severe",
    diet: "Nutritious balanced diet, anti-inflammatory foods",
    precautions: "Complete antibiotic course, benzathine penicillin prophylaxis"
  },
  {
    name: "Fibromyalgia",
    symptoms: [
      "Muscle pain",
      "Fatigue",
      "Insomnia",
      "Memory loss",
      "Headache",
      "Depression",
      "Anxiety",
      "Tingling",
      "Numbness"
    ],
    severity: "Moderate",
    diet: "Anti-inflammatory diet, avoid MSG and artificial sweeteners, magnesium",
    precautions: "Low-impact exercise, stress management, sleep hygiene"
  },
  {
    name: "Chronic Fatigue Syndrome",
    symptoms: [
      "Fatigue",
      "Memory loss",
      "Difficulty concentrating",
      "Insomnia",
      "Muscle pain",
      "Joint pain",
      "Headache"
    ],
    severity: "Moderate",
    diet: "Anti-inflammatory diet, balanced nutrition, avoid alcohol",
    precautions: "Pacing activity, sleep hygiene, cognitive behavioral therapy"
  },
  {
    name: "Depression",
    symptoms: [
      "Depression",
      "Fatigue",
      "Insomnia",
      "Weight loss",
      "Difficulty concentrating",
      "Suicidal thoughts"
    ],
    severity: "Moderate",
    diet: "Omega-3, folate, vitamin D, tryptophan-rich foods, limit alcohol",
    precautions: "Antidepressants, psychotherapy, regular exercise, social support"
  },
  {
    name: "Anxiety Disorder",
    symptoms: [
      "Anxiety",
      "Rapid heartbeat",
      "Sweating",
      "Tremors at rest",
      "Shortness of breath",
      "Insomnia",
      "Irritability",
      "Difficulty concentrating",
      "Nausea"
    ],
    severity: "Moderate",
    diet: "Limit caffeine, magnesium-rich foods, omega-3, chamomile tea",
    precautions: "CBT therapy, mindfulness, medication if needed, regular exercise"
  },
  {
    name: "Schizophrenia",
    symptoms: ["Hallucinations", "Confusion", "Insomnia", "Anxiety"],
    severity: "Severe",
    diet: "Balanced nutrition, omega-3, antioxidants",
    precautions: "Antipsychotic medication, psychotherapy, family support"
  },
  {
    name: "Lung Cancer",
    symptoms: [
      "Persistent cough",
      "Coughing up blood",
      "Shortness of breath",
      "Chest pain",
      "Weight loss",
      "Fatigue"
    ],
    severity: "Severe",
    diet: "High protein, antioxidant-rich foods",
    precautions: "No smoking, regular screening if high risk"
  },
  {
    name: "Breast Cancer",
    symptoms: ["Breast pain", "Nipple discharge", "Lumps under skin"],
    severity: "Severe",
    diet: "Mediterranean diet, limit alcohol, high fiber",
    precautions: "Regular mammograms, self-examination"
  },
  {
    name: "Colon Cancer",
    symptoms: [
      "Blood in stool",
      "Rectal bleeding",
      "Abdominal pain",
      "Weight loss",
      "Fatigue"
    ],
    severity: "Severe",
    diet: "High fiber, low red meat, plenty of vegetables",
    precautions: "Regular colonoscopy after 45, high fiber diet"
  },
  {
    name: "Skin Cancer (Melanoma)",
    symptoms: ["Skin discoloration", "Lumps under skin"],
    severity: "Severe",
    diet: "Antioxidant-rich diet, vitamin D in moderation",
    precautions: "Sun protection, regular skin checks, avoid tanning beds"
  },
  {
    name: "Leukemia",
    symptoms: [
      "Fatigue",
      "Pale skin",
      "Fever",
      "Frequent infections",
      "Bruising easily",
      "Swollen lymph nodes",
      "Bone pain at night",
      "Weight loss",
      "Night sweats"
    ],
    severity: "Severe",
    diet: "High protein, neutropenic diet during treatment",
    precautions: "Chemotherapy, bone marrow transplant, infection prevention"
  },
  {
    name: "Prostate Issues (BPH)",
    symptoms: ["Frequent urination", "Back pain"],
    severity: "Moderate",
    diet: "Low fat diet, lycopene-rich foods, green tea",
    precautions: "Regular PSA tests, limit caffeine and alcohol"
  },
  {
    name: "Varicose Veins",
    symptoms: [
      "Varicose veins",
      "Leg cramps",
      "Swelling",
      "Skin discoloration"
    ],
    severity: "Mild",
    diet: "Anti-inflammatory diet, low salt, high fiber",
    precautions: "Compression stockings, elevate legs, regular walking"
  },
  {
    name: "Hemorrhoids",
    symptoms: ["Rectal bleeding", "Itching", "Abdominal pain", "Constipation"],
    severity: "Mild",
    diet: "High fiber diet, plenty of water, avoid spicy foods",
    precautions: "Sitz baths, topical creams, avoid straining"
  },
  {
    name: "Ankylosing Spondylitis",
    symptoms: [
      "Back pain",
      "Lower back pain",
      "Stiffness in morning",
      "Hip pain",
      "Fatigue",
      "Eye pain",
      "Reduced range of motion"
    ],
    severity: "Moderate",
    diet: "Anti-inflammatory diet, calcium, vitamin D, omega-3",
    precautions: "Regular exercise, physical therapy, NSAIDs"
  }
];
export {
  DISEASES
};

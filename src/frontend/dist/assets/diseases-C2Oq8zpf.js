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
    precautions: "Rest, stay hydrated, avoid contact with others, wash hands frequently",
    medicines: "Paracetamol/Ibuprofen for fever, Cetirizine for runny nose, Dextromethorphan cough syrup, Saline nasal spray",
    whenToSeeDoctor: "If fever exceeds 103°F for more than 3 days, difficulty breathing, symptoms worsen after 10 days, or chest pain develops."
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
    precautions: "Annual flu vaccine, rest, antiviral medication if prescribed",
    medicines: "Oseltamivir (Tamiflu) within 48h of onset, Paracetamol/Ibuprofen for fever and pain, Dextromethorphan for cough",
    whenToSeeDoctor: "If breathing difficulty, persistent chest pain, confusion, severe vomiting, or symptoms improve then worsen — seek urgent care."
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
    precautions: "Isolation, vaccination, mask usage, regular testing",
    medicines: "Paracetamol for fever, Montelukast for inflammation, Anticoagulants if prescribed, Paxlovid (nirmatrelvir/ritonavir) for high-risk patients under doctor supervision",
    whenToSeeDoctor: "If oxygen saturation below 94%, severe breathing difficulty, persistent chest pressure, confusion, or inability to stay awake — emergency care immediately."
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
    precautions: "Vaccination, avoid smoking, complete antibiotic course",
    medicines: "Amoxicillin or Azithromycin (antibiotics), Paracetamol/Ibuprofen, Bronchodilators (Salbutamol), Expectorants (Guaifenesin)",
    whenToSeeDoctor: "See a doctor immediately — pneumonia always requires medical evaluation. Emergency if breathing rate >30/min, O2 <90%, confusion, or bluish lips."
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
    precautions: "BCG vaccination, complete TB treatment, isolation during active disease",
    medicines: "RHEZ regimen: Rifampicin, Isoniazid, Ethambutol, Pyrazinamide (mandatory 6-month course under DOTS)",
    whenToSeeDoctor: "If persistent cough more than 3 weeks, coughing blood, unexplained weight loss, or night sweats — consult a doctor and get TB test immediately."
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
    precautions: "Mosquito nets, repellents, antimalarial medication",
    medicines: "Artemether-Lumefantrine (CoArtem), Chloroquine (if sensitive strain), Primaquine for P. vivax, Paracetamol for fever",
    whenToSeeDoctor: "Immediately — malaria can become cerebral malaria within hours. Seek care for any fever after travel to endemic area."
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
    precautions: "Mosquito control, protective clothing, repellents",
    medicines: "Paracetamol ONLY (avoid aspirin/ibuprofen), IV fluids in hospital, Platelet transfusion if critically low",
    whenToSeeDoctor: "Immediately if platelet count drops, bleeding gums/nose, severe abdominal pain, persistent vomiting, or sudden improvement followed by worsening."
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
    precautions: "Typhoid vaccine, safe water, food hygiene",
    medicines: "Ciprofloxacin or Azithromycin or Ceftriaxone (antibiotics), Paracetamol for fever",
    whenToSeeDoctor: "If fever persists beyond 5 days of treatment, intestinal perforation symptoms (sudden severe abdominal pain), or confusion — emergency care."
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
    precautions: "Safe water, proper sanitation, cholera vaccine",
    medicines: "Oral Rehydration Salts (ORS) — primary treatment, Doxycycline or Azithromycin antibiotics, IV fluids for severe cases",
    whenToSeeDoctor: "Immediately — severe dehydration can be fatal within hours. Any suspected cholera needs urgent medical care."
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
    precautions: "Hepatitis A vaccine, hygiene, safe food and water",
    medicines: "No specific antiviral; supportive care with rest, Paracetamol (low dose), antiemetics for nausea, Vitamin supplements",
    whenToSeeDoctor: "If severe jaundice, confusion (hepatic encephalopathy), inability to keep fluids down, or prolonged clotting time."
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
    precautions: "Hepatitis B vaccine, avoid sharing needles, safe sex",
    medicines: "Tenofovir or Entecavir (antivirals for chronic HBV), Interferon-alpha for acute cases, no alcohol strictly",
    whenToSeeDoctor: "See hepatologist at diagnosis. Immediately if acute liver failure symptoms: jaundice, confusion, prolonged bleeding."
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
    precautions: "Avoid sharing needles, safe sex, regular liver monitoring",
    medicines: "Direct-Acting Antivirals (DAAs): Sofosbuvir/Velpatasvir (Epclusa), Ledipasvir/Sofosbuvir (Harvoni) — 8-12 week curative course",
    whenToSeeDoctor: "At detection — HCV is now curable. Urgently if signs of cirrhosis: ascites, jaundice, confusion, or bleeding varices."
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
    precautions: "Insulin therapy, blood sugar monitoring, regular exercise",
    medicines: "Insulin therapy (Rapid-acting: Aspart/Lispro; Long-acting: Glargine/Detemir), Metformin sometimes added",
    whenToSeeDoctor: "Immediately for DKA symptoms: fruity breath, rapid breathing, extreme thirst, confusion. Regular quarterly HbA1c checks."
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
    precautions: "Weight management, exercise, medication adherence, regular checkups",
    medicines: "Metformin (first-line), SGLT2 inhibitors (Empagliflozin), GLP-1 agonists (Semaglutide), Sulfonylureas, Insulin if advanced",
    whenToSeeDoctor: "If blood sugar persistently >300 mg/dL, signs of hypoglycemia, chest pain, vision changes, or foot wounds that don't heal."
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
    precautions: "Regular BP monitoring, medication, reduce stress, limit salt",
    medicines: "ACE inhibitors (Enalapril/Lisinopril), ARBs (Losartan), Amlodipine (CCB), Hydrochlorothiazide (diuretic) — as prescribed",
    whenToSeeDoctor: "If BP exceeds 180/120 (hypertensive crisis) — emergency. Regular monitoring; see doctor if new headache, vision changes, or chest pain."
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
    precautions: "No smoking, exercise, medication, regular cardiac checkups",
    medicines: "Aspirin, Statins (Atorvastatin/Rosuvastatin), Beta-blockers (Metoprolol), ACE inhibitors, Nitroglycerin for chest pain",
    whenToSeeDoctor: "Emergency (call ambulance) if chest pain at rest lasting >20 min, radiating to arm/jaw — may be heart attack. Regular cardiologist follow-up."
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
    precautions: "Medication adherence, daily weight monitoring, limit fluid intake",
    medicines: "ACE inhibitors/ARBs, Beta-blockers (Carvedilol), Diuretics (Furosemide), Spironolactone, Digoxin",
    whenToSeeDoctor: "Emergency if sudden severe shortness of breath, chest pain, or weight gain >2kg in 2 days. Regular cardiologist appointments."
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
    precautions: "Avoid triggers, use inhaler correctly, avoid smoking",
    medicines: "Reliever: Salbutamol (Ventolin) inhaler; Preventer: Beclomethasone/Fluticasone inhaler; Montelukast tablets; Oral prednisolone for severe attacks",
    whenToSeeDoctor: "Emergency if inhaler has no effect, lips turning blue, unable to speak in full sentences. Regular review if using reliever >2x/week."
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
    precautions: "Quit smoking, pulmonary rehabilitation, flu vaccine",
    medicines: "LABA: Salmeterol/Formoterol; LAMA: Tiotropium; ICS: Fluticasone; Theophylline; Roflumilast for severe COPD; Antibiotics for exacerbations",
    whenToSeeDoctor: "If sudden worsening of breathlessness, change in sputum color/amount, or confusion — seek urgent care. Regular pulmonologist check-ups."
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
    precautions: "Control blood pressure and diabetes, avoid NSAIDs",
    medicines: "ACE inhibitors/ARBs (to slow progression), Erythropoiesis-stimulating agents for anemia, Phosphate binders, Vitamin D supplements, Diuretics",
    whenToSeeDoctor: "Immediately if no urine output, severe swelling, confusion, or extreme breathlessness. Regular nephrology follow-up every 3-6 months."
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
    precautions: "Stay well hydrated, limit calcium supplements",
    medicines: "NSAIDs (Ibuprofen/Ketorolac) for pain, Alpha-blockers (Tamsulosin) to help stone pass, Potassium citrate to prevent recurrence",
    whenToSeeDoctor: "Emergency if severe uncontrolled pain, fever with stones (infection), or single kidney with obstruction. Otherwise see urologist."
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
    precautions: "Good hygiene, urinate after sex, stay hydrated",
    medicines: "Trimethoprim-Sulfamethoxazole, Nitrofurantoin, Ciprofloxacin, Phenazopyridine for pain relief (not antibiotic)",
    whenToSeeDoctor: "If fever, back/flank pain, symptoms not improving after 48h of antibiotics, or recurrent UTIs (>3/year) — see urologist."
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
    precautions: "Iron supplements, treat underlying cause, regular blood tests",
    medicines: "Ferrous sulfate/gluconate (iron supplements), Vitamin B12 injections, Folic acid supplements, Erythropoietin for CKD anemia",
    whenToSeeDoctor: "If severe fatigue, chest pain, shortness of breath at rest, rapid heart rate, or hemoglobin <8 g/dL — seek care promptly."
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
    precautions: "Thyroid hormone replacement, regular TSH monitoring",
    medicines: "Levothyroxine (T4 replacement) — taken daily on empty stomach; dose adjusted by TSH level monitoring",
    whenToSeeDoctor: "At diagnosis and TSH monitoring every 6-12 months. Immediately if myxedema coma symptoms: hypothermia, unconsciousness."
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
    precautions: "Antithyroid medications, regular thyroid function tests",
    medicines: "Carbimazole or Propylthiouracil (antithyroids), Propranolol (for palpitations/tremors), Radioiodine therapy, Surgery (thyroidectomy)",
    whenToSeeDoctor: "If thyroid storm symptoms: very high fever, extreme agitation, rapid heart rate >150 bpm — emergency. Regular endocrinologist follow-up."
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
    precautions: "Elevate head of bed, avoid triggers, weight management",
    medicines: "Omeprazole/Lansoprazole (PPIs), Ranitidine/Famotidine (H2 blockers), Antacids (Gaviscon/Mylanta), Domperidone for nausea",
    whenToSeeDoctor: "If symptoms persist >8 weeks despite treatment, difficulty swallowing, unexplained weight loss, or vomiting blood."
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
    precautions: "H. pylori treatment, avoid NSAIDs, no smoking",
    medicines: "PPIs (Omeprazole/Pantoprazole), H. pylori triple therapy (Amoxicillin + Clarithromycin + PPI), Sucralfate for mucosal protection",
    whenToSeeDoctor: "Immediately if vomiting blood, black tarry stools, sudden severe abdominal pain — may indicate perforation or bleeding."
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
    precautions: "Stress management, identify food triggers, regular exercise",
    medicines: "Antispasmodics (Mebeverine/Hyoscine), Loperamide for diarrhea, Lactulose for constipation, Low-dose antidepressants (amitriptyline) if severe",
    whenToSeeDoctor: "If rectal bleeding, unexplained weight loss, waking at night with symptoms, or over 50 with new symptoms — rule out serious conditions."
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
    precautions: "Medication adherence, regular colonoscopy, stress management",
    medicines: "Mesalazine, Azathioprine, Infliximab/Adalimumab (biologics), Prednisolone for flares, Metronidazole for infections",
    whenToSeeDoctor: "If severe abdominal pain, high fever, significant rectal bleeding, or signs of obstruction — emergency. Regular gastroenterologist follow-up."
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
    precautions: "Immediate surgical consultation, do not delay treatment",
    medicines: "IV antibiotics (Cefoxitin/Metronidazole) as bridge to surgery, Pain management (IV Morphine/Ketorolac)",
    whenToSeeDoctor: "EMERGENCY — go to ER immediately with right lower abdominal pain. Appendicitis can perforate within 24-72 hours."
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
    precautions: "Weight management, avoid rapid weight loss",
    medicines: "Pain: NSAIDs/opioids, Ursodeoxycholic acid (UDCA) to dissolve small stones, Antispasmodics; Definitive treatment: laparoscopic cholecystectomy",
    whenToSeeDoctor: "Immediately if severe upper right abdominal pain after meals, fever with jaundice (cholangitis) — emergency. Elective surgery for symptomatic stones."
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
    precautions: "No alcohol, treat gallstones, low fat diet",
    medicines: "IV fluids and pain management (hospital), Antibiotics if infected necrosis (Meropenem), Enzyme replacement for chronic pancreatitis, Absolute no alcohol",
    whenToSeeDoctor: "EMERGENCY — acute pancreatitis requires hospitalization immediately. Severe abdominal pain radiating to back with vomiting = go to ER."
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
    precautions: "No alcohol, treat underlying cause, regular liver monitoring",
    medicines: "Diuretics (Spironolactone + Furosemide) for ascites, Propranolol for varices prevention, Rifaximin for encephalopathy, Lactulose",
    whenToSeeDoctor: "Immediately if confusion, vomiting blood, large abdomen, or jaundice. Regular hepatologist visits every 3-6 months + liver cancer screening."
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
    precautions: "DMARDs therapy, physical therapy, joint protection strategies",
    medicines: "DMARDs: Methotrexate, Hydroxychloroquine, Sulfasalazine; Biologics: Etanercept/Adalimumab; NSAIDs/Prednisolone for flares",
    whenToSeeDoctor: "At onset of joint swelling — early DMARD therapy prevents joint destruction. Urgently if sudden severe joint swelling, fever, or new nodules."
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
    precautions: "Weight management, low-impact exercise, physical therapy",
    medicines: "Paracetamol, NSAIDs (Ibuprofen/Diclofenac), Topical NSAIDs, Glucosamine/Chondroitin, Intra-articular corticosteroid injections",
    whenToSeeDoctor: "If pain prevents daily activities, sudden severe joint pain or swelling, joint instability, or pain is not responding to OTC medications."
  },
  {
    name: "Osteoporosis",
    symptoms: ["Back pain", "Pathological fractures", "Bone pain at night"],
    severity: "Moderate",
    diet: "Calcium-rich diet, vitamin D, magnesium, protein",
    precautions: "Weight-bearing exercise, fall prevention, bisphosphonates if prescribed",
    medicines: "Bisphosphonates (Alendronate/Risedronate), Calcium + Vitamin D supplements, Denosumab, Teriparatide for severe cases",
    whenToSeeDoctor: "After any fracture from minor trauma, significant height loss, or age >65 for baseline DEXA scan. Follow-up every 1-2 years."
  },
  {
    name: "Gout",
    symptoms: ["Joint pain", "Joint swelling", "Fever", "Burning sensation"],
    severity: "Moderate",
    diet: "Low purine diet, no alcohol, avoid organ meats, hydrate well",
    precautions: "Uric acid lowering medication, avoid triggers, stay hydrated",
    medicines: "Acute: Colchicine, NSAIDs (Indomethacin), Prednisolone; Maintenance: Allopurinol or Febuxostat to lower uric acid",
    whenToSeeDoctor: "If first gout attack — confirm diagnosis. Urgently if joint is extremely swollen, red, warm — rule out septic arthritis. Start long-term therapy after 2nd attack."
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
    precautions: "Identify and avoid triggers, stress management, migraine medications",
    medicines: "Acute: Triptans (Sumatriptan/Rizatriptan), NSAIDs, Antiemetics (Metoclopramide); Prevention: Topiramate, Amitriptyline, Propranolol",
    whenToSeeDoctor: "If 'thunderclap' worst-ever headache (possible subarachnoid hemorrhage — emergency), new headache with fever/neck stiffness, headache after head injury."
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
    precautions: "Antiepileptic drugs, avoid seizure triggers, no driving if uncontrolled",
    medicines: "Levetiracetam, Carbamazepine, Valproate, Lamotrigine, Phenytoin — all require specialist prescription and regular monitoring",
    whenToSeeDoctor: "After first seizure — urgent neurology evaluation. Emergency if seizure lasts >5 minutes (status epilepticus) or multiple seizures without recovery."
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
    precautions: "Levodopa therapy, physical therapy, fall prevention",
    medicines: "Levodopa/Carbidopa (gold standard), Dopamine agonists (Pramipexole), MAO-B inhibitors (Selegiline), Amantadine",
    whenToSeeDoctor: "At onset of tremors, stiffness, or gait changes — early neurology consult. Urgently if falls, confusion, severe off-states, or dysphagia."
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
    precautions: "Mental stimulation, social engagement, medication management",
    medicines: "Cholinesterase inhibitors (Donepezil/Rivastigmine), Memantine for moderate-severe, Antidepressants/antipsychotics for behavioral symptoms",
    whenToSeeDoctor: "At first significant memory concerns — baseline cognitive testing. Urgently if sudden worsening, dangerous behavior, inability to care for self."
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
    precautions: "Disease-modifying therapy, physical therapy, temperature management",
    medicines: "Disease-modifying: Interferon-beta, Glatiramer, Natalizumab, Ocrelizumab; Acute relapse: IV Methylprednisolone; Symptomatic: Baclofen for spasms",
    whenToSeeDoctor: "At first symptoms (numbness, vision changes, weakness) — urgent neurology for MRI. During relapses affecting vision or mobility — immediate care."
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
    precautions: "Immediate emergency care, antihypertensives, rehabilitation",
    medicines: "Thrombolytics (tPA) within 4.5h of ischemic stroke; Antiplatelet (Aspirin+Clopidogrel); Anticoagulants for AF-related stroke; Antihypertensives",
    whenToSeeDoctor: "EMERGENCY — call ambulance immediately. Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 911. Every minute counts."
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
    precautions: "Meningococcal vaccine, immediate hospitalization, antibiotics",
    medicines: "IV antibiotics (Ceftriaxone/Penicillin G), IV Dexamethasone to reduce inflammation, IV fluids, Antivirals (Acyclovir) if viral",
    whenToSeeDoctor: "EMERGENCY — bacterial meningitis can be fatal within hours. Non-blanching rash + fever = call ambulance immediately."
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
    precautions: "Varicella vaccine, isolation, calamine lotion",
    medicines: "Acyclovir antiviral (for immunocompromised/adults), Calamine lotion for itching, Paracetamol for fever (NO Aspirin in children), Antihistamines",
    whenToSeeDoctor: "If immunocompromised, pregnant, high fever persisting, skin infection signs, pneumonia symptoms, or neurological symptoms develop."
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
    precautions: "MMR vaccination, isolation, vitamin A supplements",
    medicines: "Vitamin A supplementation (reduces mortality), Paracetamol for fever, Antibiotics for secondary bacterial infection",
    whenToSeeDoctor: "At suspected measles — public health notification required. Immediately if encephalitis symptoms (confusion, seizures), severe respiratory distress."
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
    precautions: "Antiretroviral therapy, safe sex, regular CD4 monitoring",
    medicines: "Antiretroviral therapy (ART): Tenofovir/Emtricitabine + Dolutegravir or Efavirenz; PrEP for prevention; OI prophylaxis (Cotrimoxazole)",
    whenToSeeDoctor: "Immediately after known exposure (PEP within 72h), at HIV diagnosis, and if opportunistic infections develop. Regular CD4/viral load every 3-6 months."
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
    precautions: "Moisturize regularly, avoid triggers, phototherapy",
    medicines: "Topical: Corticosteroids, Calcipotriol; Phototherapy: UVB; Systemic: Methotrexate, Ciclosporin; Biologics: Adalimumab/Secukinumab for severe",
    whenToSeeDoctor: "If extensive plaques (>10% BSA), joint involvement (psoriatic arthritis), significant quality of life impact, or pustular/erythrodermic psoriasis."
  },
  {
    name: "Eczema",
    symptoms: ["Itching", "Rash", "Dry skin", "Skin discoloration"],
    severity: "Mild",
    diet: "Identify and avoid food triggers, anti-inflammatory foods, probiotics",
    precautions: "Moisturize frequently, avoid irritants and allergens",
    medicines: "Topical corticosteroids (Hydrocortisone/Betamethasone), Tacrolimus ointment, Emollients (Cerave/Eucerin), Antihistamines for itch, Dupilumab for severe",
    whenToSeeDoctor: "If infected (oozing, crusting, fever), widespread flare, or not responding to OTC treatments within 2 weeks."
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
    precautions: "Sun protection, antimalarials, immunosuppressants",
    medicines: "Hydroxychloroquine (baseline), NSAIDs for joint pain, Corticosteroids (Prednisolone), Immunosuppressants (Azathioprine/Mycophenolate), Belimumab biologic",
    whenToSeeDoctor: "At diagnosis — rheumatology required. Immediately if lupus nephritis symptoms (foamy urine, edema), chest pain, or neurological symptoms."
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
    precautions: "Avoid all gluten, read food labels, gluten-free cooking practices",
    medicines: "Strict gluten-free diet is the primary treatment; Iron/Folate/Vitamin D/B12 supplements for deficiencies; Dapsone for dermatitis herpetiformis",
    whenToSeeDoctor: "At diagnosis for endoscopy confirmation and baseline labs. Annual gastroenterology follow-up; immediately if not improving on gluten-free diet."
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
    precautions: "Weight management, hormonal therapy, fertility treatment if needed",
    medicines: "Combined oral contraceptive pill (for menstrual regulation), Metformin (for insulin resistance), Clomifene/Letrozole (for fertility), Anti-androgens (Spironolactone)",
    whenToSeeDoctor: "If irregular periods affecting quality of life, difficulty conceiving, severe acne/hirsutism, or signs of metabolic syndrome."
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
    precautions: "Hormonal therapy, laparoscopic surgery, pain management",
    medicines: "NSAIDs for pain (Ibuprofen/Naproxen), Combined oral contraceptive pill, Progestogens (Norethisterone), GnRH agonists (Leuprolide), Laparoscopic surgery",
    whenToSeeDoctor: "If severe period pain affecting daily life, painful intercourse, difficulty conceiving, or chronic pelvic pain — gynecologist referral."
  },
  {
    name: "Cataracts",
    symptoms: ["Blurred vision", "Double vision", "Sensitivity to light"],
    severity: "Moderate",
    diet: "Antioxidant-rich diet, vitamin C, E, lutein",
    precautions: "UV eye protection, no smoking, regular eye exams",
    medicines: "No effective drops — surgical lens replacement (phacoemulsification) is definitive treatment; Lubricating eye drops for comfort",
    whenToSeeDoctor: "When vision impairment affects driving, reading, or daily activities. Routine eye exam referral to ophthalmologist."
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
    precautions: "Eye drops, regular intraocular pressure monitoring",
    medicines: "Prostaglandin analogues (Latanoprost), Beta-blockers (Timolol), Alpha-agonists (Brimonidine), Carbonic anhydrase inhibitors (Dorzolamide), Laser/surgery if needed",
    whenToSeeDoctor: "Annual eye pressure checks from age 40+. Emergency if sudden severe eye pain, halos around lights, rapid vision loss — acute angle-closure glaucoma."
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
    precautions: "Antibiotics if bacterial, rest, gargle with salt water",
    medicines: "Penicillin V or Amoxicillin (for bacterial), Ibuprofen/Paracetamol for pain/fever, Throat lozenges, Tonsillectomy for recurrent cases",
    whenToSeeDoctor: "If symptoms last >10 days, difficulty breathing/swallowing, drooling, muffled voice (possible abscess), or recurring >4 times/year."
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
    precautions: "Nasal irrigation, decongestants, antibiotics if bacterial",
    medicines: "Nasal corticosteroid sprays (Fluticasone/Mometasone), Saline irrigation, Decongestants (Pseudoephedrine), Antibiotics only if bacterial >10 days (Amoxicillin)",
    whenToSeeDoctor: "If symptoms >10 days without improvement, severe facial pain, vision changes, swelling around eyes, neck stiffness, or recurrent episodes."
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
    precautions: "Complete antibiotic course, benzathine penicillin prophylaxis",
    medicines: "Penicillin/Amoxicillin (to eliminate Streptococcus), Aspirin or Naproxen for arthritis/fever, Prednisolone for carditis, Monthly Benzathine penicillin for 5-10 years prevention",
    whenToSeeDoctor: "Immediately — any suspected rheumatic fever needs urgent cardiac evaluation. Throat swab and strep test if sore throat precedes joint pain."
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
    precautions: "Low-impact exercise, stress management, sleep hygiene",
    medicines: "Duloxetine (SNRI), Pregabalin/Gabapentin, Low-dose Amitriptyline, Tramadol for pain, Cyclobenzaprine for muscle spasms, avoid opioids",
    whenToSeeDoctor: "At diagnosis — rheumatology or pain specialist. Urgently if new symptoms suggest inflammatory arthritis, lupus, or hypothyroidism to rule out."
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
    precautions: "Pacing activity, sleep hygiene, cognitive behavioral therapy",
    medicines: "No specific drugs — supportive: Low-dose antidepressants (Amitriptyline for sleep), NSAIDs for pain, B12 supplements, Melatonin for sleep disturbance",
    whenToSeeDoctor: "If fatigue persists >6 months affecting daily life, to rule out thyroid/anemia/depression/sleep disorders. Specialist referral for ME/CFS management."
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
    precautions: "Antidepressants, psychotherapy, regular exercise, social support",
    medicines: "SSRIs: Sertraline/Fluoxetine/Escitalopram (first-line); SNRIs: Venlafaxine; MAOIs as last resort; Mood stabilizers if bipolar; always with psychotherapy",
    whenToSeeDoctor: "At onset — do not delay. Immediately if suicidal thoughts or self-harm. Regular psychiatry/psychology follow-up every 4-8 weeks during treatment."
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
    precautions: "CBT therapy, mindfulness, medication if needed, regular exercise",
    medicines: "SSRIs/SNRIs (first-line, long-term), Buspirone, Short-term Benzodiazepines (Lorazepam) for acute anxiety only, Beta-blockers (Propranolol) for performance anxiety",
    whenToSeeDoctor: "If anxiety significantly impairs work, relationships, or daily function. Immediately if panic attacks with chest pain (rule out cardiac) or suicidal thoughts."
  },
  {
    name: "Schizophrenia",
    symptoms: ["Hallucinations", "Confusion", "Insomnia", "Anxiety"],
    severity: "Severe",
    diet: "Balanced nutrition, omega-3, antioxidants",
    precautions: "Antipsychotic medication, psychotherapy, family support",
    medicines: "Atypical antipsychotics: Olanzapine, Risperidone, Quetiapine, Aripiprazole, Clozapine for treatment-resistant cases",
    whenToSeeDoctor: "URGENTLY — first episode psychosis needs immediate psychiatric evaluation. Emergency if patient is a danger to self or others."
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
    precautions: "No smoking, regular screening if high risk",
    medicines: "Chemotherapy (Carboplatin+Paclitaxel), Targeted therapy (Erlotinib/Osimertinib for EGFR+), Immunotherapy (Pembrolizumab), Radiation therapy, Surgery (lobectomy)",
    whenToSeeDoctor: "Immediately for persistent cough with blood, unexplained weight loss, or hoarseness. High-risk individuals (heavy smokers 50+) get annual low-dose CT."
  },
  {
    name: "Breast Cancer",
    symptoms: ["Breast pain", "Nipple discharge", "Lumps under skin"],
    severity: "Severe",
    diet: "Mediterranean diet, limit alcohol, high fiber",
    precautions: "Regular mammograms, self-examination",
    medicines: "Surgery (lumpectomy/mastectomy), Chemotherapy, Hormone therapy (Tamoxifen/Aromatase inhibitors), Targeted therapy (Trastuzumab/Herceptin), Radiation",
    whenToSeeDoctor: "Immediately for any new breast lump, skin dimpling, nipple discharge, or change in breast shape. Annual mammograms from age 40."
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
    precautions: "Regular colonoscopy after 45, high fiber diet",
    medicines: "Surgery (colectomy), Chemotherapy (FOLFOX/FOLFIRI regimen), Targeted therapy (Bevacizumab/Cetuximab), Immunotherapy for MSI-H tumors",
    whenToSeeDoctor: "Immediately for rectal bleeding, unexplained change in bowel habits, or iron deficiency anemia. Colonoscopy every 10 years from age 45."
  },
  {
    name: "Skin Cancer (Melanoma)",
    symptoms: ["Skin discoloration", "Lumps under skin"],
    severity: "Severe",
    diet: "Antioxidant-rich diet, vitamin D in moderation",
    precautions: "Sun protection, regular skin checks, avoid tanning beds",
    medicines: "Wide local excision, Targeted therapy (Vemurafenib/Dabrafenib for BRAF+), Immunotherapy (Nivolumab/Pembrolizumab), Radiotherapy",
    whenToSeeDoctor: "Immediately for any mole changing in size/color/shape, irregular borders, bleeding, or new pigmented lesion. Monthly self-exam + annual dermatologist check."
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
    precautions: "Chemotherapy, bone marrow transplant, infection prevention",
    medicines: "Chemotherapy (AML: Cytarabine+Anthracycline; ALL: Vincristine+Prednisolone+Asparaginase), Targeted therapy (Imatinib for CML), Stem cell transplant",
    whenToSeeDoctor: "Immediately for unexplained bruising, persistent fever, bone pain, very high WBC, or severe fatigue with pallor — urgent blood count required."
  },
  {
    name: "Prostate Issues (BPH)",
    symptoms: ["Frequent urination", "Back pain"],
    severity: "Moderate",
    diet: "Low fat diet, lycopene-rich foods, green tea",
    precautions: "Regular PSA tests, limit caffeine and alcohol",
    medicines: "Alpha-blockers (Tamsulosin/Alfuzosin), 5-Alpha reductase inhibitors (Finasteride/Dutasteride), PDE5 inhibitors (Tadalafil), Surgery (TURP) for severe",
    whenToSeeDoctor: "Annual PSA + rectal exam from age 50 (45 if high risk). Immediately if unable to urinate, blood in urine, or PSA rapidly rising."
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
    precautions: "Compression stockings, elevate legs, regular walking",
    medicines: "Compression stockings, Diosmin/Hesperidin (venotonic agents), Sclerotherapy, Laser ablation or surgical stripping for large veins",
    whenToSeeDoctor: "If significant pain, skin ulceration, thrombophlebitis, or bleeding from vein. Vascular specialist referral for extensive disease."
  },
  {
    name: "Hemorrhoids",
    symptoms: ["Rectal bleeding", "Itching", "Abdominal pain", "Constipation"],
    severity: "Mild",
    diet: "High fiber diet, plenty of water, avoid spicy foods",
    precautions: "Sitz baths, topical creams, avoid straining",
    medicines: "Topical creams (Hydrocortisone/Lidocaine), Stool softeners (Lactulose/Docusate), Flavonoids (Diosmin), Rubber band ligation for internal, Surgery for severe",
    whenToSeeDoctor: "If significant rectal bleeding (always rule out colorectal cancer first), prolapsing hemorrhoids not reducible, or severe pain indicating thrombosis."
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
    precautions: "Regular exercise, physical therapy, NSAIDs",
    medicines: "NSAIDs (Indomethacin/Naproxen) first-line, Sulfasalazine, Biologics (TNF inhibitors: Adalimumab/Etanercept; IL-17i: Secukinumab), Physical therapy",
    whenToSeeDoctor: "If morning back stiffness >3 months in young adult, waking at night with back pain, or eye inflammation (uveitis) — urgent rheumatology referral."
  },
  {
    name: "Brain Tumor",
    symptoms: [
      "Severe headache",
      "Persistent headache",
      "Seizures",
      "Memory loss",
      "Confusion",
      "Blurred vision",
      "Nausea",
      "Vomiting",
      "Weakness",
      "Numbness",
      "Difficulty concentrating",
      "Slurred speech",
      "Loss of consciousness",
      "Sudden vision loss",
      "Sudden severe headache"
    ],
    severity: "Critical",
    diet: "Anti-inflammatory diet, high antioxidants, omega-3, avoid processed foods, maintain healthy weight",
    precautions: "Regular MRI scans, avoid radiation exposure, follow oncologist advice",
    medicines: "Dexamethasone (reduce brain swelling), Antiepileptics (levetiracetam, phenytoin), Temozolomide (chemotherapy), Bevacizumab — all under strict specialist supervision",
    whenToSeeDoctor: "IMMEDIATELY if you experience sudden severe headache, new seizures, sudden weakness/numbness, vision changes, speech difficulty, or loss of consciousness. Do not delay — these are neurological emergencies."
  },
  {
    name: "Cancer (General)",
    symptoms: [
      "Unexplained weight loss",
      "Fatigue",
      "Fever",
      "Night sweats",
      "Lumps under skin",
      "Swollen lymph nodes",
      "Persistent cough",
      "Coughing up blood",
      "Blood in stool",
      "Blood in urine",
      "Skin discoloration",
      "Loss of appetite",
      "Bruising easily",
      "Bone pain at night",
      "Rectal bleeding"
    ],
    severity: "Critical",
    diet: "High protein anti-cancer diet, cruciferous vegetables (broccoli, cauliflower), berries, green tea, turmeric, avoid alcohol and processed meats",
    precautions: "Regular cancer screenings, avoid tobacco and carcinogens, maintain healthy weight, limit alcohol",
    medicines: "Depends on cancer type — Chemotherapy agents (e.g. Paclitaxel, Cisplatin), Immunotherapy (Pembrolizumab), Targeted therapy, Hormone therapy — all prescribed by oncologist only",
    whenToSeeDoctor: "See a doctor immediately if you notice unexplained weight loss >10%, persistent lumps, abnormal bleeding from any site, or symptoms lasting more than 2 weeks without improvement."
  }
];
export {
  DISEASES
};

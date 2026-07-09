import pandas as pd
import random

first_names = [
    "Ravi","Suresh","Manoj","Arun","Prakash","Deepak","Vinod","Kiran",
    "Rakesh","Shivakumar","Mahesh","Naveen","Santosh","Lokesh","Harish",
    "Vijay","Darshan","Ganesh","Nikhil","Sunil","Rohit","Ajay","Akash",
    "Pavan","Tejas","Chandan","Abhishek","Aditya","Anand","Anil",
    "Aravind","Ashok","Bharath","Chirag","Dinesh","Girish","Gopal",
    "Harsha","Jagadish","Karthik","Krishna","Madan","Manjunath",
    "Mohan","Mukesh","Nagaraj","Nandakumar","Pradeep","Raghav",
    "Rajesh","Ramesh","Sandeep","Shankar","Sharath","Shashank",
    "Srinivas","Umesh","Varun","Venkatesh","Yash","Yogesh",
    "Akhil","Amith","Anoop","Bhaskar","Chethan","Devraj",
    "Gautham","Hemant","Jagannath","Kishore","Lohith","Mithun",
    "Nithin","Pranav","Ranjith","Sachin","Tarun","Vikas"
]

last_names = [
    "Kumar","Gowda","Naik","Shetty","Reddy","Patil","Hegde",
    "Poojary","Bhat","Kulkarni","Rao","Nayak","Acharya",
    "Joshi","Desai","Shekar","Murthy","Ramesh","Sharma",
    "Verma","Pandit","Shanbhag","Kamath","Pai","Shet",
    "Mallya","Udupa","Kunder","Alva","D'Souza","Fernandes",
    "Pinto","Lobo","Noronha","Mendonca","Devadiga","Kotian",
    "Suvarna","Pujari","Moily","Bangera","Salian","Shettigar",
    "Rai","Adiga","Karkera","Bairy","Kudva","Bollineni"
]

districts = [
    "Bengaluru Urban",
    "Bengaluru Rural",
    "Mysuru",
    "Tumakuru",
    "Belagavi",
    "Kalaburagi",
    "Ballari",
    "Bidar",
    "Raichur",
    "Vijayapura",
    "Shivamogga",
    "Hassan",
    "Kodagu",
    "Koppal",
    "Dharwad"
]

states = (
    ["Karnataka"] * 85 +
    ["Telangana"] * 5 +
    ["Andhra Pradesh"] * 3 +
    ["Tamil Nadu"] * 3 +
    ["Maharashtra"] * 2 +
    ["Kerala"] * 2
)

records = []
used_names = set()

while len(records) < 2500:

    name = f"{random.choice(first_names)} {random.choice(last_names)}"

    if name in used_names:
        continue

    used_names.add(name)

    criminal_id = f"C{len(records)+1:04d}"

    age = random.randint(20, 60)

    district = random.choice(districts)

    home_state = random.choice(states)

    if random.random() < 0.30:
        gang_id = f"Gang_{random.randint(1, 50)}"
    else:
        gang_id = "None"

    

    records.append({
    "criminal_id": criminal_id,
    "name": name,
    "age": age,
    "home_state": home_state,
    "home_district": district,
    "district": district,
    "gang_id": gang_id,
    
})

df = pd.DataFrame(records)

df.to_csv("data/criminals.csv", index=False)

print("2500 unique criminal records generated successfully")
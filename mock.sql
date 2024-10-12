-- Insert mock data into users table
INSERT INTO pillbuddy.users (id, name) VALUES
  ('b7e87d67-4b13-4b45-85e9-6c64a70a4d8e', 'John Doe'),
  ('b91f4fa8-2b94-4e32-95de-5f43b4a875d7', 'Jane Smith');

-- Insert mock data into patients table
INSERT INTO pillbuddy.patients (name, age, contact_info) VALUES
  ('Alice Johnson', 70, 'alice.johnson@example.com'),
  ('Bob Williams', 65, 'bob.williams@example.com');

-- Insert mock data into caregivers table
INSERT INTO pillbuddy.caregivers (name, relationship_to_patient, contact_info) VALUES
  ('Emily Johnson', 'daughter', 'emily.johnson@example.com'),
  ('Michael Williams', 'son', 'michael.williams@example.com');

-- Insert mock data into medicines table
INSERT INTO pillbuddy.medicines (name, dosage, instructions, type, side_effects, created_at) VALUES
  ('Aspirin', '500mg', 'Take one pill every 6 hours', 'painkiller', 'Nausea, dizziness', NOW()),
  ('Metformin', '1000mg', 'Take one pill every morning', 'diabetes', 'Diarrhea, fatigue', NOW());

-- Insert mock data into schedules table
INSERT INTO pillbuddy.scheduels (patient_id, caregivers_id, start_date) VALUES
  (1, 1, '2024-10-01'),
  (2, 2, '2024-10-02');

-- Insert mock data into notifications table
INSERT INTO pillbuddy.notifications (schedule_id, notification_time, notification_status, meal, sent_at) VALUES
  (1, '08:00:00', 'pending', 'morning', NULL),
  (2, '12:00:00', 'pending', 'afternoon', NULL);

-- Insert mock data into notification_medicines table
INSERT INTO pillbuddy.notification_medicines (notification_id, medicines_id, amount, dosage_amount) VALUES
  (1, 1, 2, 1),
  (2, 2, 1, 1);

-- Insert mock data into medication_log table
INSERT INTO pillbuddy.medication_log (id, schedule_id, status) VALUES
  ('59d2e7e1-f007-4af3-985d-607434874f29', 1, 'taken'),
  ('9e1d48f9-5d53-4f78-8725-bb03d8b6b70b', 2, 'not_taken');

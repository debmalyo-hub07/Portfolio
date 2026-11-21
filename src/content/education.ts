import { z } from "zod";
import { educationSchema, type Education } from "@/lib/schema";

export const education: Education[] = z.array(educationSchema).parse([
  {
    id: "btech-cse",
    qualification: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    institution: "Techno Institute of Engineering and Management, Banipur",
    board: "Maulana Abul Kalam Azad University of Technology (MAKAUT), West Bengal",
    start: 2023,
    end: 2026,
    scores: ["CGPA 7.62"],
  },
  {
    id: "diploma-cst",
    qualification: "Diploma",
    field: "Computer Science and Technology",
    institution: "Canning Government Polytechnic",
    board: "West Bengal State Council of Technical & Vocational Education and Skill Development",
    start: 2020,
    end: 2023,
    scores: ["Overall GPA 7.9", "75.7%", "Class I (Distinction)"],
  },
  {
    id: "madhyamik",
    qualification: "Madhyamik (Secondary Examination)",
    institution: "Sanskrit Collegiate School",
    board: "West Bengal Board of Secondary Education",
    end: 2019,
    scores: ["Aggregate 54.71%", "Overall Grade B+"],
  },
]);

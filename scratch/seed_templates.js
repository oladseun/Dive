const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://bltcmcwfcuvzmtrobklp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsdGNtY3dmY3V2em10cm9ia2xwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODg0NjUzNiwiZXhwIjoyMDk0NDIyNTM2fQ.6NndtWZAzQ0L6lhc--qRpoAAfaxXjic13hEw2gYpX38'
)

async function seedTemplates() {
  const templates = [
    {
      title: "Medium of Instruction (MOI) Letter",
      type: "Letter",
      category: "Academic",
      content_outline: {
        sections: [
          "Header (University Name)",
          "Registrar Contact Info",
          "Date",
          "Student Details",
          "Statement of Proficiency",
          "Seal/Signature"
        ]
      },
      is_premium: false,
      credit_cost: 0,
    },
    {
      title: "Personal Statement - STEM Focus",
      type: "Draft",
      category: "Essays",
      content_outline: {
        sections: [
          "Introduction (Hook)",
          "Academic Background",
          "Research Experience",
          "Future Goals",
          "Conclusion"
        ]
      },
      is_premium: true,
      credit_cost: 50,
    },
    {
      title: "Letter of Recommendation Request",
      type: "Email",
      category: "Communication",
      content_outline: {
        sections: [
          "Subject Line",
          "Salutation",
          "Context (Class/Work)",
          "The Request",
          "Supporting Materials",
          "Closing"
        ]
      },
      is_premium: false,
      credit_cost: 0,
    }
  ]

  const { error } = await supabase.from('templates').insert(templates)
  if (error) console.error('Error seeding templates:', error)
  else console.log('Templates seeded successfully!')
}

seedTemplates()

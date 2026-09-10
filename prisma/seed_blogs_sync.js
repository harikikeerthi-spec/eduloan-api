require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const blogsToSeed = [
  {
    title: 'Complete Guide to Collateral vs Non-Collateral Study Loans in 2026',
    slug: 'collateral-vs-non-collateral-loans-2026',
    excerpt: 'Understand key differences between secured loans with property collateral and unsecured education loans from top banks and NBFCs.',
    content: 'Choosing the right education loan model is a critical milestone for study abroad aspirants. Collateral loans (secured) typically offer lower interest rates (starting at 8.55%) with higher loan amounts up to ₹1.5 Crores. Non-collateral loans (unsecured) rely heavily on co-applicant income, GRE scores, and university ranking, offering hassle-free processing without property pledge.\n\nKey Highlights:\n- Government Banks (SBI, Union Bank) require collateral for loans above ₹7.5 Lakhs.\n- Private NBFCs (HDFC Credila, Auxilo, Avanse) offer non-collateral loans up to ₹75 Lakhs for STEM programs.\n- Consider processing fees, margin money, and moratorium repayment structures before deciding.',
    category: 'Education Loans',
    authorName: 'Priya Sharma',
    authorRole: 'Senior Financial Advisor',
    featuredImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
    readTime: 6,
    views: 1240,
    isFeatured: true,
    isPublished: true,
    status: 'published',
    visibility: 'public',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: 'US F-1 Visa Interview Questions & Expert Preparation Tips',
    slug: 'us-f1-visa-interview-tips-2026',
    excerpt: 'Master your F-1 student visa interview with real officer questions, financial proof documentation, and mock interview practice.',
    content: 'The US F-1 visa interview lasts between 2 to 3 minutes, but thorough preparation makes all the difference. Visa officers focus on three primary pillars: Intent to Study, Financial Capability, and Ties to Home Country.\n\nTop Questions Asked:\n1. Why did you choose this specific university in the US?\n2. Who is funding your education and what is their annual income?\n3. How do you plan to repay your education loan after graduation?\n\nTip: Be confident, concise, and ensure your I-20 details match your loan sanction letter exactly.',
    category: 'Study Abroad',
    authorName: 'Vikram Malhotra',
    authorRole: 'Study Abroad Specialist',
    featuredImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    readTime: 8,
    views: 2850,
    isFeatured: true,
    isPublished: true,
    status: 'published',
    visibility: 'public',
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: 'How to Save Up to ₹2 Lakhs on FX Rates & Remittance Fees',
    slug: 'save-fx-rates-remittance-fees',
    excerpt: 'Learn smart international money transfer hacks, forex cards, and zero-markup transfer methods for university tuition deposits.',
    content: 'Paying international tuition fees through traditional wire transfers can incur hidden bank markups ranging from 1.5% to 3.5%. By utilizing pre-negotiated Forex rate locks, Education Loan direct transfers, and GST tax rebates (TCS refund under Section 206C), students can save up to ₹2,00,000 across their entire degree.\n\nSmart Tips:\n- Use VidyaLoan FX partner portals for guaranteed lower exchange rates.\n- Claim Tax Collected at Source (TCS) during annual Income Tax Return filing.\n- Use forex student multi-currency travel cards for initial campus arrival expenses.',
    category: 'Financial Tips',
    authorName: 'Ananya Roy',
    authorRole: 'Forex & Remittance Analyst',
    featuredImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800',
    readTime: 5,
    views: 940,
    isFeatured: false,
    isPublished: true,
    status: 'published',
    visibility: 'public',
    publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: 'From Tier-3 College to MS in Computer Science at UT Dallas',
    slug: 'success-story-ut-dallas-ms-cs',
    excerpt: 'Read Rahul’s journey of securing a ₹45 Lakh 100% non-collateral loan and securing a STEM assistantship in Texas.',
    content: 'Rahul came from a tier-3 engineering college with high ambitions to pursue MS in CS in the United States. Without collateral property, obtaining loan approval seemed challenging. Through VidyaLoan AI profile evaluator, Rahul was matched with an NBFC that recognized his 320 GRE score and offered a ₹45 Lakh loan sanction in just 4 days.\n\n"VidyaLoan simplified the entire process — from loan approval to visa prep. I am now working as a Teaching Assistant at UT Dallas!" says Rahul.',
    category: 'Success Stories',
    authorName: 'Rahul Verma',
    authorRole: 'VidyaLoan Alumni & UT Dallas MS CS',
    featuredImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
    readTime: 7,
    views: 3400,
    isFeatured: true,
    isPublished: true,
    status: 'published',
    visibility: 'public',
    publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: 'Section 80E Tax Deduction: Maximize Education Loan Interest Relief',
    slug: 'section-80e-tax-deduction-guide',
    excerpt: 'Everything you need to know about claiming 100% tax deduction on education loan interest payments under Income Tax Act.',
    content: 'Under Section 80E of the Indian Income Tax Act, education loan borrowers or their parent co-applicants can claim 100% deduction on the interest paid towards higher education loans. There is NO upper ceiling limit on the deductible interest amount, making education loans significantly more tax-efficient than liquidating personal savings.',
    category: 'Education Loans',
    authorName: 'CA Rajesh Nambiar',
    authorRole: 'Tax & Education Loan Consultant',
    featuredImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    readTime: 4,
    views: 1120,
    isFeatured: false,
    isPublished: true,
    status: 'published',
    visibility: 'public',
    publishedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

async function seed() {
  console.log('Seeding blogs into Supabase...');
  for (const b of blogsToSeed) {
    const { data: existing, error: checkError } = await supabase
      .from('Blog')
      .select('id, slug')
      .eq('slug', b.slug)
      .maybeSingle();

    if (checkError) {
      console.error(`Error checking blog ${b.slug}:`, checkError);
      continue;
    }

    if (existing) {
      console.log(`Updating existing blog: ${b.title} (${existing.id})`);
      const { error: updateError } = await supabase
        .from('Blog')
        .update(b)
        .eq('id', existing.id);
      if (updateError) console.error(`Error updating ${b.slug}:`, updateError);
    } else {
      console.log(`Inserting new blog: ${b.title}`);
      const blogData = {
        ...b,
        id: crypto.randomUUID(),
      };
      const { data: inserted, error: insertError } = await supabase
        .from('Blog')
        .insert(blogData)
        .select('id, title, slug')
        .single();
      if (insertError) console.error(`Error inserting ${b.slug}:`, insertError);
      else console.log(`Created blog with ID: ${inserted.id}`);
    }
  }

  const { data: allBlogs, count } = await supabase
    .from('Blog')
    .select('id, title, slug', { count: 'exact' });
  console.log(`Total blogs in database: ${count}`);
  console.log(allBlogs);
}

seed().catch(console.error);

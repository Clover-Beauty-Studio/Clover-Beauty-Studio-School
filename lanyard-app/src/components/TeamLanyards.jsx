import Lanyard from './Lanyard';

const logoUrl = 'https://d375139ucebi94.cloudfront.net/region2/pl/177023/logo/3f59dc8117a04b05a6fcd7481dc490-clover-beauty-studio-school-logo-2f29787aff4c4b878d16d34ae87509-booksy.jpeg';

const profiles = [
  {
    name: 'Yevheniia Kirichok',
    role: 'Founder & Master Brow Artist',
    desc: 'Professional brow styling & training',
    link: 'https://booksy.com/pl-pl/dl/show-business/177023',
    logo: logoUrl
  },
  {
    name: 'Irina',
    role: 'Lash Specialist',
    desc: 'Classic, volume & hybrid lash extensions',
    link: 'https://booksy.com/pl-pl/dl/show-business/177023',
    logo: logoUrl
  },
  {
    name: 'Jana',
    role: 'Beauty Specialist',
    desc: 'Makeup, styling & client care',
    link: 'https://booksy.com/pl-pl/dl/show-business/177023',
    logo: logoUrl
  },
  {
    name: 'Browist',
    role: 'Brow Artist',
    desc: 'Stylizacja brwi, laminacja, henna',
    link: 'https://booksy.com/pl-pl/dl/show-business/177023',
    logo: logoUrl
  },
  {
    name: 'Młodszy specjalista',
    role: 'Junior Specialist',
    desc: 'Usługi beauty pod nadzorem',
    link: 'https://booksy.com/pl-pl/dl/show-business/177023',
    logo: logoUrl
  }
];

export default function TeamLanyards() {
  return (
    <div style={{ 
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '30px',
      maxWidth: '1600px',
      margin: '0 auto',
      padding: '20px'
    }}>
      {profiles.map((p, i) => (
        <div key={p.name} style={{ width: '280px', height: '420px', flexShrink: 0 }}>
          <Lanyard profile={p} position={[0, 0, 20]} gravity={[0, -40, 0]} />
        </div>
      ))}
    </div>
  );
}